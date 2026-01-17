# DeepSeek chat proxy (Cloudflare Workers)

This worker exposes `/chat` and `/chat/clear` endpoints compatible with the existing `NahidaChat` component.
It keeps the API key on the server side and applies simple rate limits using Workers KV.

## Setup

1) Login to Cloudflare (once per machine)
```bash
npx wrangler login
```

2) Create KV namespaces
```bash
npx wrangler kv namespace create RATE_LIMIT_KV
npx wrangler kv namespace create RATE_LIMIT_KV --preview
```
Update `wrangler.toml` with the returned `id` and `preview_id`.

3) Add secrets
```bash
npx wrangler secret put DEEPSEEK_API_KEY
```
Optional (persona prompt):
```bash
npx wrangler secret put SYSTEM_PROMPT
```
You can copy the content from `chat-live2d/routes/Nahida.txt` if you want the same persona.

4) Sync CNAME into allowed origins (optional)
```bash
node workers/deepseek-proxy/scripts/sync-cname.cjs
```

5) Deploy
```bash
npx wrangler deploy
```

## Use from frontend

Set the chat API to:
```
https://<worker-name>.<account>.workers.dev/chat
```

The current frontend default is in `docs/.vitepress/theme/components/NahidaChat.vue`.

## Config

Edit `wrangler.toml` `[vars]` to tune limits and model behavior:
- `ALLOWED_ORIGINS`: comma-separated list or `*`
- `RATE_LIMIT_*`: per-IP and per-session limits
- `MODEL`, `TEMPERATURE`, `MAX_TOKENS`
- `MAX_MESSAGE_CHARS`, `MAX_HISTORY_MESSAGES`
- `INCLUDE_TIME`: add a time hint into the system prompt
