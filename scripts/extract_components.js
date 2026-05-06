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

// Components mapping
const components = {
    'Header': {
        regexes: [/Glassmorphism Header/, /Secondary Nav/, /Dropdown Styles/, /HEADER MOBILE/],
        module: 'src/components/header.module.css',
        tsx: 'src/components/Header.tsx'
    },
    'Footer': {
        regexes: [/Footer/, /FOOTER MOBILE/],
        module: 'src/components/footer.module.css',
        tsx: 'src/components/Footer.tsx'
    },
    'HeroSlider': {
        regexes: [/Hero Slider/],
        module: 'src/components/heroslider.module.css',
        tsx: 'src/components/HeroSlider.tsx'
    },
    'Account': {
        regexes: [/Account Page Responsive/, /ACCOUNT PAGE MOBILE/],
        module: 'src/app/account/account.module.css',
        tsx: 'src/app/account/page.tsx'
    },
    'Support': {
        regexes: [/Support \/ Form Layout/],
        module: 'src/app/support/support.module.css',
        tsx: 'src/app/support/page.tsx'
    },
    'Streaming': {
        regexes: [/Streaming Category Page/, /Categories Header/, /STREAMING PAGE MOBILE/, /STREAMING PAGE WHITE WRAPPER MOBILE/],
        module: 'src/app/streaming/streaming.module.css',
        tsx: 'src/app/streaming/page.tsx'
    },
    'Page': {
        regexes: [/Trending Now 3D Cards/, /Content Section Head/, /Section Blocks/, /Bottom Features Row/, /Animated Floating Feature/, /HOMEPAGE MOBILE/, /GLOBAL HERO IMAGE CONTAINER/],
        module: 'src/app/home.module.css',
        tsx: 'src/app/page.tsx'
    }
};

Object.entries(components).forEach(([name, config]) => {
    let cssLines = [];
    config.regexes.forEach(regex => {
        let block;
        while ((block = extractBlock(regex)).length > 0) {
            cssLines.push(...block);
        }
    });
    
    if (cssLines.length > 0) {
        fs.writeFileSync(path.join(__dirname, config.module), cssLines.join('\n'));
        console.log(`Extracted ${name} to ${config.module}`);
    }
});

fs.writeFileSync(globalsPath, globalsCssLines.join('\n'));
console.log('Done extracting component blocks');
