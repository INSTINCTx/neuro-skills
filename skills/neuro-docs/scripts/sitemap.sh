#!/bin/bash
# Sitemap generator - shows all docs by category
echo "Fetching NEURO documentation sitemap..."

# Categories structure based on docs.neuro.ai
CATEGORIES=(
  "start"
  "gateway"
  "providers"
  "concepts"
  "tools"
  "automation"
  "cli"
  "platforms"
  "nodes"
  "web"
  "install"
  "reference"
)

for cat in "${CATEGORIES[@]}"; do
  echo "📁 /$cat/"
done
