const fs = require('fs');

const tsxContent = fs.readFileSync('src/app/services/netflix/NetflixPageClient.tsx', 'utf-8');
const classNames = new Set();

// Match className="abc xyz"
const doubleQuoteRegex = /className="([^"]+)"/g;
let match;
while ((match = doubleQuoteRegex.exec(tsxContent)) !== null) {
    match[1].split(' ').forEach(c => classNames.add(c.trim()));
}

// Match className={`abc xyz ${dynamic}`}
const backtickRegex = /className=\{`([^`]+)`\}/g;
while ((match = backtickRegex.exec(tsxContent)) !== null) {
    const raw = match[1];
    // remove ${...} parts
    const clean = raw.replace(/\$\{[^}]+\}/g, ' ');
    clean.split(' ').forEach(c => {
        if (c.trim()) classNames.add(c.trim());
    });
}

console.log(Array.from(classNames).sort());
