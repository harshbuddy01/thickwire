const fs = require('fs');
const path = require('path');

const globalsPath = 'src/app/globals.css';
const modulePath = 'src/app/services/netflix/netflix.module.css';
const tsxPath = 'src/app/services/netflix/NetflixPageClient.tsx';

// 1. Extract CSS block
const cssLines = fs.readFileSync(globalsPath, 'utf-8').split('\n');

const startMarker = '/* ─── NETFLIX PAGE (EXACT IMAGE 4 MATCH)';
const endMarker = '/* ─── PRIME VIDEO PAGE EXACT'; // Next block

let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < cssLines.length; i++) {
    if (cssLines[i].includes(startMarker)) startIdx = i;
    if (startIdx !== -1 && i > startIdx && cssLines[i].includes(endMarker)) {
        endIdx = i - 1;
        break;
    }
}

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find CSS blocks for Netflix');
    process.exit(1);
}

// Extract block
const netflixCssLines = cssLines.slice(startIdx, endIdx + 1);

// Remove block from globals
const newGlobalsCss = [
    ...cssLines.slice(0, startIdx),
    ...cssLines.slice(endIdx + 1)
];

// 2. Identify all class names defined in the extracted block
const classSet = new Set();
const classRegex = /\.([a-zA-Z0-9_-]+)/g;
netflixCssLines.forEach(line => {
    // Only look at lines that define a class (basic heuristic)
    if (line.includes('{') || line.includes(',') || line.startsWith('.')) {
        let match;
        while ((match = classRegex.exec(line)) !== null) {
            classSet.add(match[1]);
        }
    }
});

// We should NOT scope global classes like 'container', 'hero-image-container', 'hero-banner-image'
const globalClasses = new Set(['container', 'hero-image-container', 'hero-banner-image']);
globalClasses.forEach(c => classSet.delete(c));

console.log('Classes to module scope:', Array.from(classSet));

// 3. Update TSX file
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

// Add import
if (!tsxContent.includes('import styles from')) {
    tsxContent = tsxContent.replace(
        "import { Check, Play, Zap, Monitor, ChevronDown, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';",
        "import { Check, Play, Zap, Monitor, ChevronDown, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';\nimport styles from './netflix.module.css';"
    );
}

// Helper to replace classes in a string
function scopeClasses(classString) {
    return classString.split(' ').map(c => {
        if (classSet.has(c)) {
            return `\${styles['${c}']}`;
        }
        return c;
    }).join(' ');
}

// Replace className="..."
tsxContent = tsxContent.replace(/className="([^"]+)"/g, (match, p1) => {
    const hasModuleClass = p1.split(' ').some(c => classSet.has(c));
    if (!hasModuleClass) return match;
    
    return `className={\`${scopeClasses(p1)}\`}`;
});

// Replace className={`...`}
tsxContent = tsxContent.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    let newStr = p1;
    classSet.forEach(c => {
        // Regex to replace word exactly, not preceded/followed by hyphen/word char
        const r = new RegExp(`(?<![a-zA-Z0-9_-])${c}(?![a-zA-Z0-9_-])`, 'g');
        newStr = newStr.replace(r, `\${styles['${c}']}`);
    });
    return `className={\`${newStr}\`}`;
});

// 4. Save files
fs.writeFileSync(modulePath, netflixCssLines.join('\n'));
fs.writeFileSync(globalsPath, newGlobalsCss.join('\n'));
fs.writeFileSync(tsxPath, tsxContent);

console.log('Netflix CSS Module split complete!');
