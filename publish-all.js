#!/usr/bin/env node
/**
 * publish-all.js â€” Publish all 79 @instinctx-dev/neuro-skill-* packages to npm
 * 
 * Usage:
 *   npm login --scope=@instinctx   (run once first)
 *   node publish-all.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');
const skills = fs.readdirSync(SKILLS_DIR).filter(f =>
    fs.statSync(path.join(SKILLS_DIR, f)).isDirectory() &&
    fs.existsSync(path.join(SKILLS_DIR, f, 'package.json'))
);

let published = 0, skipped = 0, failed = 0;

for (const skill of skills.sort()) {
    const skillPath = path.join(SKILLS_DIR, skill);
    const pkg = JSON.parse(fs.readFileSync(path.join(skillPath, 'package.json'), 'utf8'));

    try {
        // Check if already published
        try {
            execSync(`npm view ${pkg.name} version`, { stdio: 'pipe' });
            console.log(`  â­  ${pkg.name} â€” already published, skipping`);
            skipped++;
            continue;
        } catch {
            // Not published yet â€” proceed
        }

        execSync(`npm publish --access public`, {
            cwd: skillPath,
            stdio: 'inherit'
        });
        console.log(`  âœ… ${pkg.name}`);
        published++;
    } catch (err) {
        console.error(`  âŒ ${pkg.name} â€” ${err.message}`);
        failed++;
    }
}

console.log(`\nðŸ“¦ Done: ${published} published, ${skipped} skipped, ${failed} failed`);

