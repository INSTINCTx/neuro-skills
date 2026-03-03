# 🧩 neuro-skills

<div align="center">

**The official skill registry for [NEURO — The NEURAL-SYNC Agent](https://github.com/INSTINCTx/NEURO)**

[![Skills](https://img.shields.io/badge/Skills-79%2B-8b5cf6?style=for-the-badge)](./skills)
[![Windows](https://img.shields.io/badge/Windows-63_Skills-0078d4?style=for-the-badge&logo=windows&logoColor=white)](./skills)
[![macOS](https://img.shields.io/badge/macOS-All_79-06b6d4?style=for-the-badge&logo=apple&logoColor=white)](./skills)
[![License](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)

</div>

---

## What is this?

This is the **official public skills monorepo** for NEURO. Each folder under [`skills/`](./skills) is a standalone skill — a `SKILL.md` file (and optional scripts/references) that extends what NEURO knows and can do.

Skills are automatically loaded by the NEURO gateway from your workspace `~/.neuro/workspace/skills/`.

## Installing a Skill

```bash
# Copy any skill folder into your NEURO workspace
cp -r skills/duckduckgo-search ~/.neuro/workspace/skills/

# Or on Windows (PowerShell)
Copy-Item skills\duckduckgo-search ~\.neuro\workspace\skills\ -Recurse
```

Then restart your NEURO gateway — the skill is immediately active.

---

## 🪟 Windows-Compatible Skills (63)

These skills work fully on Windows:

| Skill | Description |
|-------|-------------|
| `1password` | 1Password CLI integration |
| `api-gateway` | 100+ APIs via Maton OAuth |
| `automation-workflows` | Zapier/Make/n8n strategy guide |
| `blogwatcher` | Monitor and summarize blog feeds |
| `blucli` | Bluetooth device management |
| `bluebubbles` | BlueBubbles iMessage server |
| `byterover` | Project knowledge management (`brv`) |
| `camsnap` | Camera snapshot capture |
| `canvas` | Agent-driven visual workspace |
| `coding-agent` | Autonomous code generation |
| `discord` | Discord guild + channel management |
| `duckduckgo-search` | Free privacy-first web search |
| `eightctl` | Autonomous multi-step task execution |
| `find-skills` | Discover and install skills |
| `food-order` | Food ordering workflow |
| `free-ride` | Best free OpenRouter models |
| `frontend-design-v2` | Production-grade UI design |
| `gemini` | Google Gemini API integration |
| `gh-issues` | GitHub Issues management |
| `gifgrep` | Search and retrieve GIFs |
| `github` | Full GitHub integration |
| `gog` | Goal-oriented agent guidance |
| `goplaces` | Location-aware navigation |
| `healthcheck` | System and gateway health monitoring |
| `humanize-ai-text` | Detect + transform AI-generated text |
| `humanizer` | 24-pattern AI writing de-teller |
| `local-places` | Nearby places lookup |
| `markdown-converter` | Convert PDF/Word/PPT → Markdown |
| `mcporter` | MCP tool integration |
| `microsoft-todo` | Microsoft To Do tasks |
| `model-usage` | Per-model cost analytics |
| `n8n-workflow-automation` | Design n8n workflow JSON |
| `nano-banana-pro` | Nano text editor integration |
| `nano-pdf` | PDF reading and annotation |
| `neuro-docs` | NEURO documentation expert |
| `news-summary` | Live news via RSS |
| `notion` | Read/write Notion databases |
| `obsidian` | Read/write Obsidian vault |
| `onenote` | OneNote notebook integration |
| `openai-image-gen` | DALL-E image generation |
| `openai-whisper` | Audio transcription |
| `openai-whisper-api` | Whisper API integration |
| `oracle` | Database query and management |
| `ordercli` | Order management CLI |
| `perplexity` | Deep research with `/deepresearch` |
| `powershell-automation` | Windows PowerShell automation |
| `proactive-agent` | WAL protocol for autonomous tasks |
| `sag` | Sub-agent spawning |
| `self-improvement` | NEURO self-learning hooks |
| `session-logs` | Access conversation history |
| `skill-creator` | Scaffold new skills |
| `slack` | Slack workspace integration |
| `songsee` | Music discovery and song lookup |
| `summarize` | Condense long text |
| `superdesign` | oklch color system and design |
| `tavily` | Deep web search + extraction |
| `trello` | Trello board and card ops |
| `video-frames` | Extract frames from video |
| `voice-call` | Voice call handling |
| `wacli` | WhatsApp CLI messaging |
| `weather` | Current conditions and forecasts |
| `xurl` | Advanced URL fetching |
| `youtube` | YouTube Data API |
| `youtube-watcher` | YouTube transcript extraction |

---

## 🍎 macOS-Only Skills

These require macOS tools and are automatically filtered during `neuro onboard` on Windows:

| Skill | Requires | Windows Alternative |
|-------|----------|---------------------|
| `apple-notes` | Notes.app / AppleScript | `onenote` |
| `apple-reminders` | Reminders.app / AppleScript | `microsoft-todo` |
| `bear-notes` | Bear app (macOS/iOS) | `obsidian` |
| `bird` | `t` CLI (Homebrew) | `api-gateway` (Twitter/X) |
| `imsg` | Messages.app / imsg CLI | `wacli`, `discord` |
| `peekaboo` | Peekaboo macOS app | `camsnap` (partial) |
| `sherpa-onnx-tts` | ONNX runtime (macOS) | `openai-whisper` |
| `things-mac` | Things 3 (macOS) | `microsoft-todo` |

## 🐧 macOS + Linux Skills (no Windows)

| Skill | Requires |
|-------|----------|
| `himalaya` | himalaya CLI (brew/cargo) |
| `openhue` | openhue CLI (brew) |
| `sonoscli` | sonoscli (go, SSDP networking) |
| `spotify-player` | spogo / spotify_player (brew) |
| `tmux` | tmux (macOS/Linux only) |

---

## Skill Structure

Each skill follows this structure:

```
skills/
└── skill-name/
    ├── SKILL.md          # Required — loaded into agent context
    ├── scripts/          # Optional — helper scripts
    └── references/       # Optional — reference docs
```

### SKILL.md Frontmatter

```yaml
---
name: skill-name
description: One-line description for skill discovery
homepage: https://...
metadata:
  {
    "neuro": {
      "emoji": "🧩",
      "os": ["darwin", "linux", "win32"],  # omit for all platforms
      "requires": { "bins": ["tool-name"] },
      "requires": { "env": ["API_KEY_NAME"] },
      "install": [
        {
          "id": "brew",
          "kind": "brew",
          "formula": "formula-name",
          "bins": ["tool-name"],
          "label": "Install via Homebrew"
        }
      ]
    }
  }
---
```

---

## Contributing

1. Fork this repo
2. Create your skill folder under `skills/your-skill-name/`
3. Write a `SKILL.md` following the structure above
4. Submit a PR

**NEURO** — Built to be the last AI interface you ever need to configure.
