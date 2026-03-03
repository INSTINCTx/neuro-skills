---
name: neuro-docs
description: NEURO documentation expert with decision tree navigation, search scripts, doc fetching, version tracking, and config snippets for all NEURO features (providers, gateway, automation, platforms, tools).
---

# NEURO Documentation Expert

**Capability Summary:** NEURO documentation expert skill with decision tree navigation, search scripts (sitemap, keyword, full-text index via qmd), doc fetching, version tracking, and config snippets for all NEURO features (providers, gateway, automation, platforms, tools).

You are an expert on NEURO documentation. Use this skill to help users navigate, understand, and configure NEURO.

## Quick Start

"When a user asks about NEURO, first identify what they need:"

### 🎯 Decision Tree

- **"How do I set up X?"** → Check `providers/` or `start/`
  - Discord, Telegram, WhatsApp, etc. → `providers/<name>`
  - First time? → `start/getting-started`, `start/setup`

- **"Why isn't X working?"** → Check troubleshooting
  - General issues → `debugging`, `gateway/troubleshooting`
  - Provider-specific → `providers/troubleshooting`
  - Browser tool → `tools/browser-linux-troubleshooting`

- **"How do I configure X?"** → Check `gateway/` or `concepts/`
  - Main config → `gateway/configuration`, `gateway/configuration-examples`
  - Specific features → relevant `concepts/` page

- **"What is X?"** → Check `concepts/`
  - Architecture, sessions, queues, models, etc.

- **"How do I automate X?"** → Check `automation/`
  - Scheduled tasks → `automation/cron-jobs`
  - Webhooks → `automation/webhook`
  - Gmail → `automation/gmail-pubsub`

- **"How do I install/deploy?"** → Check `install/` or `platforms/`
  - Docker → `install/docker`
  - Linux server → `platforms/linux`
  - macOS app → `platforms/macos`

## Available Scripts

All scripts are in `skills/neuro-docs/scripts/`:

### Core
```bash
skills/neuro-docs/scripts/sitemap.sh      # Show all docs by category
skills/neuro-docs/scripts/cache.sh status # Check cache status
skills/neuro-docs/scripts/cache.sh refresh # Force refresh sitemap
```

### Search & Discovery
```bash
skills/neuro-docs/scripts/search.sh discord        # Find docs by keyword
skills/neuro-docs/scripts/recent.sh 7              # Docs updated in last N days
skills/neuro-docs/scripts/fetch-doc.sh gateway/configuration # Get specific doc
```

### Full-Text Index (requires qmd)
```bash
skills/neuro-docs/scripts/build-index.sh fetch     # Download all docs
skills/neuro-docs/scripts/build-index.sh build     # Build search index
skills/neuro-docs/scripts/build-index.sh search "webhook retry" # Semantic search
```

### Version Tracking
```bash
skills/neuro-docs/scripts/track-changes.sh snapshot # Save current state
skills/neuro-docs/scripts/track-changes.sh list     # Show snapshots
skills/neuro-docs/scripts/track-changes.sh since 2026-01-01 # Show changes
```

## Documentation Categories

### 🚀 Getting Started (`/start/`)
First-time setup, onboarding, FAQ, wizard

### 🔧 Gateway & Operations (`/gateway/`)
Configuration, security, health, logging, tailscale, troubleshooting

### 💬 Providers (`/providers/`)
Discord, Telegram, WhatsApp, Slack, Signal, iMessage, MS Teams

### 🧠 Core Concepts (`/concepts/`)
Agent, sessions, messages, models, queues, streaming, system-prompt

### 🛠️ Tools (`/tools/`)
Bash, browser, skills, reactions, subagents, thinking

### ⚡ Automation (`/automation/`)
Cron jobs, webhooks, polling, Gmail pub/sub

### 💻 CLI (`/cli/`)
Gateway, message, sandbox, update commands

### 📱 Platforms (`/platforms/`)
macOS, Linux, Windows, iOS, Android, Hetzner

### 📡 Nodes (`/nodes/`)
Camera, audio, images, location, voice

### 🌐 Web (`/web/`)
Webchat, dashboard, control UI

### 📦 Install (`/install/`)
Docker, Ansible, Bun, Nix, updating

### 📚 Reference (`/reference/`)
Templates, RPC, device models

## Config Snippets

See `skills/neuro-docs/snippets/common-configs.md` for ready-to-use configuration patterns:
- Provider setup (Discord, Telegram, WhatsApp, etc.)
- Gateway configuration
- Agent defaults
- Retry settings
- Cron jobs
- Skills configuration

## Workflow

1. **Identify the need** using the decision tree above
2. **Search** "if unsure: `skills/neuro-docs/scripts/search.sh <keyword>`"
3. **Fetch the doc**: `skills/neuro-docs/scripts/fetch-doc.sh <path>` or use browser
4. **Reference snippets** for config examples
5. **Cite the source URL** when answering

## Tips

- Always use cached sitemap when possible (1-hour TTL)
- For complex questions, search the full-text index
- Check `recent.sh` to see what's been updated
- Offer specific config snippets from `snippets/`
- Link to docs: `https://docs.neuro.ai/<path>` (or relevant NEURO docs URL)
