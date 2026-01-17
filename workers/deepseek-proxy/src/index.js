const DEFAULT_SYSTEM_PROMPT =
  "You are Nahida, a gentle and wise guide for a personal blog. Be warm, concise, and helpful.";

function getAllowedOrigins(env) {
  const raw = (env.ALLOWED_ORIGINS || "").trim();
  if (!raw) {
    return ["*"];
  }
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin, allowed) {
  if (!origin) {
    return true;
  }
  if (allowed.includes("*")) {
    return true;
  }
  return allowed.includes(origin);
}

function buildCorsHeaders(request, env) {
  const allowed = getAllowedOrigins(env);
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };

  if (allowed.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (origin && allowed.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }

  return headers;
}

function jsonResponse(data, status, request, env) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  const corsHeaders = buildCorsHeaders(request, env);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    if (value) {
      headers.set(key, value);
    }
  });

  return new Response(JSON.stringify(data), { status, headers });
}

function getEnvNumber(env, key, fallback) {
  const value = Number.parseInt(env[key], 10);
  return Number.isNaN(value) ? fallback : value;
}

function getEnvFloat(env, key, fallback) {
  const value = Number.parseFloat(env[key]);
  return Number.isNaN(value) ? fallback : value;
}

function getClientIp(request) {
  const cfIp = request.headers.get("CF-Connecting-IP");
  if (cfIp) {
    return cfIp;
  }
  const forwarded = request.headers.get("X-Forwarded-For");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "0.0.0.0";
}

function normalizeSessionId(value) {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.slice(0, 64);
}

function sanitizeHistory(history, maxMessages) {
  if (!Array.isArray(history)) {
    return [];
  }
  const filtered = [];
  for (const item of history) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const role = item.role;
    if (role !== "user" && role !== "assistant") {
      continue;
    }
    const content = typeof item.content === "string" ? item.content.trim() : "";
    if (!content) {
      continue;
    }
    filtered.push({ role, content });
  }
  if (filtered.length > maxMessages) {
    return filtered.slice(-maxMessages);
  }
  return filtered;
}

async function checkRateLimit(env, ip, sessionId) {
  if (!env.RATE_LIMIT_KV) {
    return { ok: true, retryAfter: 0 };
  }

  const windowSeconds = getEnvNumber(env, "RATE_LIMIT_WINDOW_SECONDS", 600);
  const maxIp = getEnvNumber(env, "RATE_LIMIT_MAX_IP", 60);
  const maxSession = getEnvNumber(env, "RATE_LIMIT_MAX_SESSION", 20);
  const bucket = Math.floor(Date.now() / (windowSeconds * 1000));

  const ipKey = `rl:ip:${ip}:${bucket}`;
  const sessionKey = sessionId ? `rl:sid:${sessionId}:${bucket}` : null;

  const [ipCountRaw, sessionCountRaw] = await Promise.all([
    env.RATE_LIMIT_KV.get(ipKey),
    sessionKey ? env.RATE_LIMIT_KV.get(sessionKey) : Promise.resolve(null),
  ]);

  const ipCount = Number.parseInt(ipCountRaw || "0", 10);
  const sessionCount = Number.parseInt(sessionCountRaw || "0", 10);

  if (maxIp > 0 && ipCount >= maxIp) {
    return { ok: false, retryAfter: windowSeconds };
  }

  if (sessionKey && maxSession > 0 && sessionCount >= maxSession) {
    return { ok: false, retryAfter: windowSeconds };
  }

  const ttl = windowSeconds + 5;
  const writes = [env.RATE_LIMIT_KV.put(ipKey, String(ipCount + 1), { expirationTtl: ttl })];
  if (sessionKey) {
    writes.push(
      env.RATE_LIMIT_KV.put(sessionKey, String(sessionCount + 1), {
        expirationTtl: ttl,
      }),
    );
  }
  await Promise.all(writes);

  return { ok: true, retryAfter: 0 };
}

function createSessionId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function formatTimeInfo(timestamp, includeTime) {
  if (!includeTime) {
    return "";
  }
  const date = timestamp ? new Date(timestamp) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `Current time (Asia/Shanghai): ${formatter.format(date)}`;
}

async function handleChat(request, env) {
  if (!env.DEEPSEEK_API_KEY) {
    return jsonResponse(
      { success: false, error: "Server missing DEEPSEEK_API_KEY." },
      500,
      request,
      env,
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return jsonResponse(
      { success: false, error: "Invalid JSON body." },
      400,
      request,
      env,
    );
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return jsonResponse(
      { success: false, error: "Message is required." },
      400,
      request,
      env,
    );
  }

  const maxMessageChars = getEnvNumber(env, "MAX_MESSAGE_CHARS", 2000);
  if (maxMessageChars > 0 && message.length > maxMessageChars) {
    return jsonResponse(
      { success: false, error: "Message too long." },
      400,
      request,
      env,
    );
  }

  const sessionId = normalizeSessionId(payload.userId || payload.sessionId);
  const ip = getClientIp(request);

  const rateLimit = await checkRateLimit(env, ip, sessionId);
  if (!rateLimit.ok) {
    return jsonResponse(
      { success: false, error: "Rate limit exceeded." },
      429,
      request,
      env,
    );
  }

  const maxHistoryMessages = getEnvNumber(env, "MAX_HISTORY_MESSAGES", 12);
  const history = sanitizeHistory(payload.history, maxHistoryMessages);

  const includeTime = String(env.INCLUDE_TIME || "").toLowerCase() === "true";
  const timeInfo = formatTimeInfo(payload.timestamp, includeTime);
  const systemPrompt = (env.SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT).trim();
  const systemContent = timeInfo ? `${systemPrompt}\n\n${timeInfo}` : systemPrompt;

  const messages = [{ role: "system", content: systemContent }, ...history];
  messages.push({ role: "user", content: message });

  const model = env.MODEL || "deepseek-chat";
  const maxTokens = getEnvNumber(env, "MAX_TOKENS", 1200);
  const temperature = getEnvFloat(env, "TEMPERATURE", 0.7);
  const apiUrl = env.DEEPSEEK_API_URL || "https://api.deepseek.com/v1/chat/completions";

  const upstream = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!upstream.ok) {
    const errorText = await upstream.text();
    return jsonResponse(
      {
        success: false,
        error: "Upstream request failed.",
        details: errorText.slice(0, 2000),
      },
      502,
      request,
      env,
    );
  }

  const result = await upstream.json();
  const reply = result?.choices?.[0]?.message?.content;

  if (!reply) {
    return jsonResponse(
      { success: false, error: "Empty reply from model." },
      502,
      request,
      env,
    );
  }

  return jsonResponse(
    {
      success: true,
      reply,
      serverTime: new Date().toISOString(),
    },
    200,
    request,
    env,
  );
}

async function handleClear(request, env) {
  return jsonResponse(
    {
      success: true,
      message: "Chat reset.",
      newSessionId: createSessionId(),
    },
    200,
    request,
    env,
  );
}

function handleOptions(request, env) {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request, env),
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = getAllowedOrigins(env);
    const requireOrigin = String(env.REQUIRE_ORIGIN || "").toLowerCase() === "true";
    if (requireOrigin && !origin) {
      return jsonResponse(
        { success: false, error: "Origin required." },
        403,
        request,
        env,
      );
    }
    if (!isOriginAllowed(origin, allowed)) {
      return jsonResponse(
        { success: false, error: "Origin not allowed." },
        403,
        request,
        env,
      );
    }

    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    const url = new URL(request.url);

    if (url.pathname === "/chat" && request.method === "POST") {
      return handleChat(request, env);
    }

    if (url.pathname === "/chat/clear" && request.method === "POST") {
      return handleClear(request, env);
    }

    return jsonResponse(
      { success: false, error: "Not found." },
      404,
      request,
      env,
    );
  },
};
