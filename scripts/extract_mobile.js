const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'src', 'app', 'globals.css');
let globalsCssLines = fs.readFileSync(globalsPath, 'utf8').split('\n');

const extractBlock = (startRegex) => {
    let startIdx = globalsCssLines.findIndex(line => startRegex.test(line));
    if (startIdx === -1) return [];
    
    let endIdx = -1;
    // Find the end by looking for the next /* ─── or the end of file
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

const services = ['netflix', 'spotify', 'youtube', 'prime', 'hbo'];

services.forEach(service => {
    const regex = new RegExp(`${service.toUpperCase()} PAGE MOBILE`, 'i');
    let mobileBlock = extractBlock(regex);
    if (mobileBlock.length > 0) {
        console.log(`Extracted mobile block for ${service}`);
        const modulePath = path.join(__dirname, 'src', 'app', 'services', service, `${service}.module.css`);
        if (fs.existsSync(modulePath)) {
            let css = mobileBlock.join('\n');
            const pageExactClass = new RegExp(`\\.${service}-page-exact\\s+\\.`, 'g');
            css = css.replace(pageExactClass, '.');
            fs.appendFileSync(modulePath, '\n' + css);
        }
    }
});

fs.writeFileSync(globalsPath, globalsCssLines.join('\n'));
console.log('Mobile styles appended to modules!');
