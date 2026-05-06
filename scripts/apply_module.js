const fs = require('fs');
const path = require('path');

const modulePath = process.argv[2]; // e.g. 'src/app/auth/auth.module.css'
const componentPath = process.argv[3]; // e.g. 'src/app/login/page.tsx'
const relativeCssPath = process.argv[4]; // e.g. '../auth/auth.module.css'

if (!modulePath || !componentPath || !relativeCssPath) {
    console.error('Missing args');
    process.exit(1);
}

const moduleCss = fs.readFileSync(path.join(__dirname, modulePath), 'utf8');

const classRegex = /\.([a-zA-Z0-9_-]+)/g;
let match;
const moduleClasses = new Set();
while ((match = classRegex.exec(moduleCss)) !== null) {
    moduleClasses.add(match[1]);
}

let componentTsx = fs.readFileSync(path.join(__dirname, componentPath), 'utf8');

if (!componentTsx.includes(`import styles from '${relativeCssPath}';`)) {
    // Just inject the import after the first import statement
    const importMatch = componentTsx.match(/import .*?;/);
    if (importMatch) {
        componentTsx = componentTsx.replace(importMatch[0], `${importMatch[0]}\nimport styles from '${relativeCssPath}';`);
    } else {
        componentTsx = `import styles from '${relativeCssPath}';\n${componentTsx}`;
    }
}

const clsStringRegex = /className=(["'])(.*?)\1/g;
componentTsx = componentTsx.replace(clsStringRegex, (match, quote, classesStr) => {
    const classes = classesStr.split(/\s+/).filter(Boolean);
    if (classes.length === 0) return match;
    
    // Only append styles if the class exists in the module
    const styleInjections = classes.map(c => moduleClasses.has(c) ? `\${styles['${c}'] || ''}` : '').filter(Boolean).join(' ');
    if (styleInjections) {
        return `className={\`${classesStr} ${styleInjections}\`.trim()}`;
    }
    return match;
});

fs.writeFileSync(path.join(__dirname, componentPath), componentTsx);
console.log(`Applied module to ${componentPath}`);
