const fs = require('fs');
const file = 'src/app/globals.css';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

const newLines = [];
let deleted = 0;
for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    if (lineNum >= 951 && lineNum <= 1239) {
        deleted++;
        continue;
    }
    if (lineNum >= 1722 && lineNum <= 3041) {
        deleted++;
        continue;
    }
    newLines.push(lines[i]);
}

fs.writeFileSync(file, newLines.join('\n'));
console.log(`Successfully deleted ${deleted} lines. Remaining lines: ${newLines.length}`);
