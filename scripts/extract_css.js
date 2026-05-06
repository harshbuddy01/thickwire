const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'src', 'app', 'globals.css');
let globalsCssLines = fs.readFileSync(globalsPath, 'utf8').split('\n');

const extractBlock = (startRegex, endLineCount) => {
    let startIdx = globalsCssLines.findIndex(line => startRegex.test(line));
    if (startIdx === -1) return [];
    
    // Find the next block comment or end of file
    let endIdx = -1;
    for (let i = startIdx + 1; i < globalsCssLines.length; i++) {
        if (globalsCssLines[i].startsWith('/* ───') || globalsCssLines[i].startsWith('/* ════')) {
            endIdx = i;
            break;
        }
    }
    if (endIdx === -1) endIdx = globalsCssLines.length;
    
    const block = globalsCssLines.slice(startIdx, endIdx);
    
    // Remove from globals
    globalsCssLines.splice(startIdx, endIdx - startIdx);
    return block;
};

// Auth
const authDesktop = extractBlock(/Premium Authentication UI/);
const authMobile = extractBlock(/Auth Pages Mobile/);
const authCss = [...authDesktop, ...authMobile].join('\n');

// Checkout
const checkoutDesktop = extractBlock(/Premium Checkout UI/);
const checkoutMobile = extractBlock(/Checkout Mobile Enhancements/);
const checkoutFields = extractBlock(/Checkout Fields Row/);
const checkoutButton = extractBlock(/Checkout Mobile Button/);
const checkoutCss = [...checkoutDesktop, ...checkoutMobile, ...checkoutFields, ...checkoutButton].join('\n');

// Write CSS Modules
fs.mkdirSync(path.join(__dirname, 'src', 'app', 'auth'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'auth', 'auth.module.css'), authCss);
fs.writeFileSync(path.join(__dirname, 'src', 'app', 'checkout', 'checkout.module.css'), checkoutCss);

fs.writeFileSync(globalsPath, globalsCssLines.join('\n'));

console.log('Extracted auth and checkout CSS!');
