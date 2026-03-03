#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const skillInfo = require('./package.json');
const skillName = skillInfo.name.replace('@instinctx/neuro-skill-', '');
const destDir = path.join(os.homedir(), '.neuro', 'workspace', 'skills', skillName);

try {
  fs.mkdirSync(destDir, { recursive: true });
  // Copy all skill files (SKILL.md, scripts/, references/, etc.)
  const items = fs.readdirSync(__dirname);
  for (const item of items) {
    if (item === 'node_modules' || item === 'install.js') continue;
    const src = path.join(__dirname, item);
    const dst = path.join(destDir, item);
    fs.cpSync(src, dst, { recursive: true, force: true });
  }
  console.log(`\n\u2705 NEURO Skill '${skillName}' installed → ${destDir}`);
  console.log('   Restart your NEURO gateway to activate.\n');
} catch (err) {
  console.error(`\u274c Install failed: ${err.message}`);
  process.exit(1);
}
