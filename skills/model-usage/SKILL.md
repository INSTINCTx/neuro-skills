---
name: model-usage
description: Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.
metadata: {"neuro":{"emoji":"📊","os":["darwin"],"requires":{"bins":["codexbar"]}}}
---

# Model usage

## Overview
Get per-model usage cost from CodexBar's local cost logs. Supports "current model" (most recent daily entry) or "all models" summaries for Codex or Claude.

Install CodexBar: https://codexbar.steipete.com

TODO: add Linux/Windows CLI support guidance once CodexBar CLI install path is documented for those platforms.

## Quick start
1) Fetch cost JSON via CodexBar CLI or pass a JSON file.
2) Use the bundled script to summarize by model.

```bash
python skills/model-usage/scripts/model_usage.py --provider codex --mode current
python skills/model-usage/scripts/model_usage.py --provider codex --mode all
python skills/model-usage/scripts/model_usage.py --provider claude --mode all --format json --pretty
```

## Current model logic
- Uses the most recent daily row with `modelBreakdowns`.
- Picks the model with the highest cost in that row.
- Falls back to the last entry in `modelsUsed` when breakdowns are missing.
- Override with `--model <name>` when you need a specific model.

## Inputs
- Default: runs `codexbar cost --format json --provider <codex|claude>`.
- File or stdin:

```bash
codexbar cost --provider codex --format json > /tmp/cost.json
python skills/model-usage/scripts/model_usage.py --input /tmp/cost.json --mode all
cat /tmp/cost.json | python skills/model-usage/scripts/model_usage.py --input - --mode current
```

## Output
- Text (default) or JSON (`--format json --pretty`).
- Values are cost-only per model; tokens are not split by model in CodexBar output.

## References
- Read `skills/model-usage/references/codexbar-cli.md` for CLI flags and cost JSON fields.
