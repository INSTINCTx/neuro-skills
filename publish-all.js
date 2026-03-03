// publish-all.js — Publish all @instinctx-dev/neuro-skill-* packages to npm
// Usage: NPM_TOKEN=npm_xxx node publish-all.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.NPM_TOKEN;
if (!TOKEN) {
    console.error('ERROR: Set NPM_TOKEN env variable first:');
    console.error('  $env:NPM_TOKEN="npm_xxxx"; node publish-all.js');
    process.exit(1);
}

// Set the token for this session
execSync(`npm config set //registry.npmjs.org/:_authToken ${TOKEN}`, { stdio: 'pipe' });
console.log('Token configured.\n');

const SKILLS_DIR = path.join(__dirname, 'skills');
const skills = fs.readdirSync(SKILLS_DIR)
    .filter(f => fs.statSync(path.join(SKILLS_DIR, f)).isDirectory()
        && fs.existsSync(path.join(SKILLS_DIR, f, 'package.json')))
    .sort();

let published = 0, skipped = 0, failed = 0;

for (const skill of skills) {
    const skillPath = path.join(SKILLS_DIR, skill);
    const pkg = JSON.parse(fs.readFileSync(path.join(skillPath, 'package.json'), 'utf8'));

    try {
        try {
            execSync(`npm view ${pkg.name} version`, { stdio: 'pipe' });
            console.log(`  skip  ${pkg.name}`);
            skipped++;
            continue;
        } catch { /* not published yet */ }

        execSync('npm publish --access public', { cwd: skillPath, stdio: 'inherit' });
        console.log(`  ok    ${pkg.name}`);
        published++;
    } catch (err) {
        const msg = (err.stderr || err.message || '').toString().slice(0, 100);
        console.error(`  fail  ${pkg.name}: ${msg}`);
        failed++;
    }
}

console.log(`\nDone: ${published} published, ${skipped} skipped, ${failed} failed`);
