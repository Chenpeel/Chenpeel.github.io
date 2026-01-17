import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentBase = path.resolve("./docs");
const outputPath = path.join(contentBase, "skills-cloud.json");
const publicOutputPath = path.join(contentBase, "public", "skills-cloud.json");
const distOutputPath = path.join(contentBase, ".vitepress", "dist", "skills-cloud.json");
const maxTags = 40;
const stopwords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "if",
  "then",
  "else",
  "for",
  "to",
  "of",
  "in",
  "on",
  "with",
  "as",
  "by",
  "from",
  "into",
  "about",
  "is",
  "are",
  "be",
  "been",
  "being",
  "was",
  "were",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "can",
  "will",
  "may",
  "not",
  "we",
  "you",
  "they",
  "he",
  "she",
  "our",
  "your",
  "their",
  "http",
  "https",
  "www",
  "com",
  "org",
  "net",
  "io",
  "cn",
  "md",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "all",
  "basic",
  "chapter",
  "codes",
  "guide",
  "intro",
  "introduce",
  "introduction",
  "overview",
  "man",
  "notes",
  "programing",
  "programming",
  "quick",
  "summary",
  "tutorial",
  "guidebook",
  "的",
  "了",
  "是",
  "在",
  "和",
  "与",
  "或",
  "而",
  "及",
  "也",
  "都",
  "要",
  "为",
  "于",
  "以",
  "有",
  "无",
  "就",
  "从",
  "对",
  "把",
  "被",
  "这",
  "那",
  "我",
  "你",
  "他",
  "她",
  "它",
  "我们",
  "他们",
  "她们",
  "它们",
  "一个",
  "一些",
  "自己",
  "初入",
  "首次",
  "尝试",
  "入门",
  "基础",
  "简介",
  "介绍",
  "概论",
  "教程",
  "指南",
  "总结",
  "笔记",
  "记录",
  "系列",
]);
const displayMap = new Map([
  ["ai", "AI"],
  ["c++", "C++"],
  ["c#", "C#"],
  ["c/c++", "C/C++"],
  ["css", "CSS"],
  ["docker", "Docker"],
  ["html", "HTML"],
  ["javascript", "JavaScript"],
  ["linux", "Linux"],
  ["matrix", "Matrix"],
  ["ml", "ML"],
  ["os", "OS"],
  ["typescript", "TypeScript"],
  ["node.js", "Node.js"],
  ["vitepress", "VitePress"],
  ["vue", "Vue"],
  ["vue.js", "Vue"],
  ["markdown", "Markdown"],
  ["cmake", "CMake"],
  ["makefile", "Makefile"],
]);
const skipDirs = new Set([".vitepress", "public", "node_modules", ".git"]);

const tokenStore = new Map();
const segmenter = new Intl.Segmenter("zh", { granularity: "word" });

function parseSkillsCloud(data) {
  const value =
    data?.skills_cloud !== undefined ? data.skills_cloud : data?.skillsCloud;
  if (value === false) {
    return { include: false, terms: null };
  }
  if (value === true) {
    return { include: true, terms: null };
  }
  if (Array.isArray(value)) {
    return { include: true, terms: value };
  }
  if (typeof value === "string") {
    const terms = value
      .split(/[,\uFF0C]/)
      .map((item) => item.trim())
      .filter(Boolean);
    return { include: terms.length > 0, terms };
  }
  return { include: false, terms: null };
}

function formatToken(text) {
  const lower = text.toLowerCase();
  if (displayMap.has(lower)) {
    return displayMap.get(lower);
  }
  return text;
}

function tokenPriority(text) {
  const lower = text.toLowerCase();
  if (displayMap.has(lower)) {
    return 2;
  }
  if (/^[A-Z0-9]{2,5}$/.test(text)) {
    return 1;
  }
  if (/^[A-Za-z0-9+/#.-]+$/.test(text) && /[+#/.-]/.test(text)) {
    return 1;
  }
  return 0;
}

function addToken(rawToken, sourcePath, isAscii = false) {
  const token = rawToken.trim();
  if (!token) {
    return;
  }
  const key = isAscii ? token.toLowerCase() : token;
  const normalized = isAscii ? formatToken(token) : token;
  if (!tokenStore.has(key)) {
    tokenStore.set(key, {
      text: normalized,
      count: 0,
      sources: new Map(),
    });
  }
  const entry = tokenStore.get(key);
  entry.count += 1;
  entry.sources.set(sourcePath, (entry.sources.get(sourcePath) || 0) + 1);
}

function addManualTerms(terms, sourcePath) {
  const unique = new Set();
  terms.forEach((term) => {
    const cleaned = String(term || "").trim();
    if (!cleaned || unique.has(cleaned)) {
      return;
    }
    unique.add(cleaned);
    const isAscii = /^[A-Za-z0-9+/#.-]+$/.test(cleaned);
    addToken(cleaned, sourcePath, isAscii);
  });
}

function normalizeAsciiToken(token) {
  const cleaned = token.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9+/#.-]+$/g, "");
  if (!cleaned) {
    return null;
  }
  const lower = cleaned.toLowerCase();
  if (stopwords.has(lower)) {
    return null;
  }
  if (/^\d+$/.test(cleaned)) {
    return null;
  }
  if (/^0x[0-9a-f]+$/i.test(cleaned)) {
    return null;
  }
  if (cleaned.length < 2 || cleaned.length > 20) {
    return null;
  }
  return cleaned;
}

function normalizeHanToken(token) {
  if (stopwords.has(token)) {
    return null;
  }
  if (token.length < 2 || token.length > 6) {
    return null;
  }
  return token;
}

function stripMarkdown(raw) {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[^\p{L}\p{N}+/#.-]+/gu, " ");
}

function extractTitle(content) {
  const match = content.match(/^#{1,3}\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function buildUrlPath(filePath) {
  const relativePath = path.relative(contentBase, filePath);
  let urlPath = `/${relativePath.replace(/\\/g, "/").replace(/\.md$/, "")}`;
  if (urlPath.endsWith("/index")) {
    urlPath = urlPath.slice(0, -"/index".length) || "/";
  }
  return urlPath;
}

function collectTokens(text, sourcePath) {
  const asciiTokens =
    text.match(/[A-Za-z][A-Za-z0-9+/#.-]{1,}/g) || [];
  asciiTokens.forEach((token) => {
    const normalized = normalizeAsciiToken(token);
    if (normalized) {
      addToken(normalized, sourcePath, true);
    }
  });

  const segments = segmenter.segment(text);
  for (const { segment, isWordLike } of segments) {
    if (!isWordLike) {
      continue;
    }
    if (/^[A-Za-z0-9+/#.-]+$/.test(segment)) {
      continue;
    }
    const hanMatch = segment.match(/\p{Script=Han}+/gu);
    if (!hanMatch) {
      continue;
    }
    hanMatch.forEach((token) => {
      const normalized = normalizeHanToken(token);
      if (normalized) {
        addToken(normalized, sourcePath, false);
      }
    });
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (skipDirs.has(entry)) {
        return;
      }
      walkDir(fullPath);
      return;
    }
    if (!fullPath.endsWith(".md")) {
      return;
    }
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const { include, terms } = parseSkillsCloud(data);
    if (!include) {
      return;
    }
    const sourcePath = buildUrlPath(fullPath);
    if (terms && terms.length > 0) {
      addManualTerms(terms, sourcePath);
      return;
    }
    const title = data?.title || extractTitle(content);
    const combined = title ? `${title}` : "";
    if (!combined) {
      return;
    }
    collectTokens(stripMarkdown(combined), sourcePath);
  });
}

function buildOutput() {
  const entries = Array.from(tokenStore.values()).map((entry) => {
    let bestSource = null;
    let bestCount = 0;
    entry.sources.forEach((count, source) => {
      if (count > bestCount) {
        bestSource = source;
        bestCount = count;
      }
    });
    return {
      text: entry.text,
      count: entry.count,
      docCount: entry.sources.size,
      href: bestSource,
    };
  });

  entries.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    if (b.docCount !== a.docCount) {
      return b.docCount - a.docCount;
    }
    const aPriority = tokenPriority(a.text);
    const bPriority = tokenPriority(b.text);
    if (bPriority !== aPriority) {
      return bPriority - aPriority;
    }
    const aAscii = /^[A-Za-z0-9+/#.-]+$/.test(a.text);
    const bAscii = /^[A-Za-z0-9+/#.-]+$/.test(b.text);
    if (aAscii !== bAscii) {
      return aAscii ? 1 : -1;
    }
    return a.text.localeCompare(b.text, "zh");
  });

  return entries.slice(0, maxTags).map(({ docCount, ...rest }) => rest);
}

function writeOutput(targetPath, data) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
}

walkDir(contentBase);
const output = buildOutput();
writeOutput(outputPath, output);
writeOutput(publicOutputPath, output);
if (fs.existsSync(path.dirname(distOutputPath))) {
  writeOutput(distOutputPath, output);
}
