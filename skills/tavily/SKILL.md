---
name: tavily
description: AI-optimized web search via Tavily API. Returns concise, relevant results for AI agents. Use when searching the web, researching topics, fetching current news, or extracting content from URLs. Requires TAVILY_API_KEY environment variable.
homepage: https://tavily.com
metadata: {"neuro":{"emoji":"🔍","requires":{"bins":["node"],"env":["TAVILY_API_KEY"]},"primaryEnv":"TAVILY_API_KEY"}}
---

# Tavily Search

AI-optimized web search using Tavily API. Designed for AI agents - returns clean, relevant content.

## Search

```bash
node skills/tavily/scripts/search.mjs "query"
node skills/tavily/scripts/search.mjs "query" -n 10
node skills/tavily/scripts/search.mjs "query" --deep
node skills/tavily/scripts/search.mjs "query" --topic news
```

## Options

- `-n <count>`: Number of results (default: 5, max: 20)
- `--deep`: Use advanced search for deeper research (slower, more comprehensive)
- `--topic <topic>`: Search topic - `general` (default) or `news`
- `--days <n>`: For news topic, limit to last n days

## Extract content from URL

```bash
node skills/tavily/scripts/extract.mjs "https://example.com/article"
node skills/tavily/scripts/extract.mjs "https://url1.com" "https://url2.com"
```

Notes:
- Needs `TAVILY_API_KEY` from https://tavily.com
- Tavily is optimized for AI - returns clean, relevant snippets
- Use `--deep` for complex research questions
- Use `--topic news` for current events
