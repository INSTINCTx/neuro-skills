const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'skills');
const registry = [];

const dirs = fs.readdirSync(root).sort();

for (const dir of dirs) {
    const pkgPath = path.join(root, dir, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const osList = pkg.os || ['win32', 'darwin', 'linux'];

    const name = dir;
    const desc = (pkg.description || '').replace('NEURO skill: ', '');

    registry.push({
        name,
        description: desc,
        os: osList,
        package: pkg.name
    });
}

const outPath = path.join(__dirname, 'registry.json');
fs.writeFileSync(outPath, JSON.stringify({ skills: registry }, null, 2));

console.log(`Wrote ${registry.length} skills to registry.json`);
