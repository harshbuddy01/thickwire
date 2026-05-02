const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
    [/We're/g, "We&apos;re"],
    [/We'll/g, "We&apos;ll"],
    [/Don't/g, "Don&apos;t"],
    [/haven't/g, "haven&apos;t"],
    [/Google's/g, "Google&apos;s"],
    [/Europe's/g, "Europe&apos;s"]
];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    walkDir(dir, filePath => {
        if (filePath.endsWith('.tsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = content;
            replacements.forEach(([regex, replacement]) => {
                modified = modified.replace(regex, replacement);
            });
            if (content !== modified) {
                fs.writeFileSync(filePath, modified, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    });
}

processDir('./src/app');
processDir('./src/components');
