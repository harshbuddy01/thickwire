const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'src', 'app', 'globals.css');
let globalsCssLines = fs.readFileSync(globalsPath, 'utf8').split('\n');

const extractBlock = (startRegex) => {
    let startIdx = globalsCssLines.findIndex(line => startRegex.test(line));
    if (startIdx === -1) return [];
    
    let endIdx = -1;
    for (let i = startIdx + 1; i < globalsCssLines.length; i++) {
        if (globalsCssLines[i].startsWith('/* ───') || globalsCssLines[i].startsWith('/* ════')) {
            endIdx = i;
            break;
        }
    }
    if (endIdx === -1) endIdx = globalsCssLines.length;
    
    const block = globalsCssLines.slice(startIdx, endIdx);
    globalsCssLines.splice(startIdx, endIdx - startIdx);
    return block;
};

// Extract additional ones to their modules
const mappings = {
    'auth': [/AUTH PAGES.*MOBILE/],
    'checkout': [/CHECKOUT PAGE MOBILE/, /CHECKOUT PAGE FORM GRID MOBILE/],
    'chatgpt': [/CHATGPT PAGE CLASSES/, /CHATGPT.*SERVICE PAGES MOBILE/, /AI PAGE TRUST STRIP MOBILE/],
    'zee5': [/ZEE5 PAGE MOBILE/, /SONYLIV \/ ZEE5 \/ GEMINI INLINE GRID OVERRIDES/],
};

Object.entries(mappings).forEach(([name, regexes]) => {
    let lines = [];
    regexes.forEach(regex => {
        let block;
        while ((block = extractBlock(regex)).length > 0) {
            lines.push(...block);
        }
    });
    
    if (lines.length > 0) {
        let modulePath;
        if (name === 'auth' || name === 'checkout') {
            modulePath = path.join(__dirname, 'src', 'app', name, `${name}.module.css`);
        } else {
            modulePath = path.join(__dirname, 'src', 'app', 'services', name, `${name}.module.css`);
        }
        
        if (fs.existsSync(modulePath)) {
            fs.appendFileSync(modulePath, '\n' + lines.join('\n'));
        } else {
            fs.mkdirSync(path.dirname(modulePath), { recursive: true });
            fs.writeFileSync(modulePath, lines.join('\n'));
        }
    }
});

fs.writeFileSync(globalsPath, globalsCssLines.join('\n'));
console.log('Extracted remaining service blocks!');
