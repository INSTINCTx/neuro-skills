---
name: perplexity
description: Deep research with Perplexity AI - Advanced models with citations
homepage: https://www.perplexity.ai/
metadata: { "neuro": { "emoji": "🔍", "requires": { "env": ["PERPLEXITY_API_KEY"] } } }
---

# Perplexity Deep Research

Use Perplexity AI for comprehensive research with AI-powered reasoning and real-time web search. The `/deepresearch` command provides researcher-quality answers with proper citations.

## Quick Commands

### `/deepresearch`

Perform deep research on any topic using Perplexity's best models.

```
/deepresearch What are the latest breakthroughs in quantum computing?
```

The command:

- Automatically selects the best model based on query complexity
- Returns comprehensive, well-structured answers
- Includes citations from credible sources
- Shows execution time, token count, and estimated cost

## Model Selection

The system intelligently selects models based on your query:

**Complex Queries** → `sonar-deep-research`

- Multi-step reasoning required
- Philosophical or theoretical questions
- Comparative analysis
- "Why" and "how does" questions
- Comprehensive research needs
- Long queries with multiple questions

**Simple Queries** → `sonar-reasoning-pro`

- Quick facts, definitions
- Current events
- Single straightforward questions
- Faster and more cost-effective

> [!NOTE]
> Claude Sonnet 4.5, GPT, and Gemini models are **not available** through the Perplexity API. They are only accessible in the Perplexity app for Pro/Max subscribers. The API provides Perplexity's own Sonar models, which are optimized for web-grounded research.

## Configuration

### API Key Setup

**Option 1: Environment Variable (Recommended)**

```bash
export PERPLEXITY_API_KEY="pplx-..."
```

**Option 2: NEURO Config**

```json5
{
  tools: {
    web: {
      search: {
        provider: "perplexity",
        perplexity: {
          apiKey: "pplx-...",
          baseUrl: "https://api.perplexity.ai",
        },
      },
    },
  },
}
```

**Option 3: OpenRouter**

```bash
export OPENROUTER_API_KEY="sk-or-..."
```

### Advanced Configuration

```json5
{
  tools: {
    web: {
      search: {
        provider: "perplexity",
        perplexity: {
          apiKey: "pplx-...",
          baseUrl: "https://api.perplexity.ai",
          model: "sonar-pro", // Override default model
        },
      },
    },
  },
}
```

## Usage Limits

**Rate Limiting:**

- 10 requests per minute per user
- Automatic reset after 60 seconds

**Timeouts:**

- 30-second timeout per request
- Automatic retry on recoverable errors

## Cost Tracking

Each response shows estimated costs:

- **sonar-deep-research**: ~$5 per 1M tokens
- **sonar-reasoning-pro**: ~$4 per 1M tokens
- **sonar-pro**: ~$3 per 1M tokens
- **sonar**: ~$1 per 1M tokens

Actual costs may vary based on Perplexity's pricing.

## Examples

### Current Events

```
/deepresearch What happened in the 2026 tech industry this week?
```

### Research

```
/deepresearch Explain the implications of quantum entanglement on determinism
```

### Comparison

```
/deepresearch Compare Python vs Rust for systems programming
```

### How-To

```
/deepresearch How does transformer attention mechanism work?
```

## Features

✅ **Intelligent Model Selection** - Automatically chooses the best model  
✅ **Real-time Citations** - All answers include source URLs  
✅ **Cost Transparency** - See token usage and estimated cost  
✅ **Rate Limiting** - Prevents excessive API usage  
✅ **Error Handling** - Graceful failures with helpful messages  
✅ **Multi-platform** - Works on Telegram, Discord, and Slack

## Default web_search Provider

Perplexity is now the **default provider** for the `web_search` agent tool. This means agents will use Perplexity automatically when searching the web.

To use Brave instead, configure:

```json5
{
  tools: {
    web: {
      search: {
        provider: "brave",
      },
    },
  },
}
```

## Troubleshooting

**"API key not configured"**
→ Set `PERPLEXITY_API_KEY` or `OPENROUTER_API_KEY` environment variable

**"Rate limit exceeded"**
→ Wait 60 seconds, you've hit the 10 requests/minute limit

**"Request timed out"**
→ Query may be too complex, try breaking it into smaller questions

**"Invalid API credentials"**
→ Check your API key is correct and active

## Notes

- All queries are sanitized for security
- Long responses are automatically split for Telegram (4000 char limit)
- Cache not implemented yet (each query hits the API)
- Results are formatted in markdown for readability
