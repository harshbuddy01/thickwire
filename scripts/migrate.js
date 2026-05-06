const fs = require('fs');
const path = require('path');

const service = process.argv[2]; // e.g., 'spotify', 'youtube', 'prime', 'hbo'
if (!service) {
    console.error('Provide a service name');
    process.exit(1);
}

const serviceDir = path.join(__dirname, 'src', 'app', 'services', service);
const componentPaths = [
    path.join(serviceDir, `${service.charAt(0).toUpperCase() + service.slice(1)}PageClient.tsx`),
    path.join(serviceDir, 'page.tsx')
];

let componentPath = componentPaths.find(p => fs.existsSync(p));

if (!componentPath) {
    console.error(`Component not found for ${service}`);
    process.exit(1);
}

const moduleCssPath = path.join(serviceDir, `${service}.module.css`);

// Update Component
let componentTsx = fs.readFileSync(componentPath, 'utf8');

// Add import if not exists
if (!componentTsx.includes(`import styles from './${service}.module.css';`)) {
    const importMatch = componentTsx.match(/import .*?;/);
    if (importMatch) {
        componentTsx = componentTsx.replace(importMatch[0], `${importMatch[0]}\nimport styles from './${service}.module.css';`);
    } else {
        componentTsx = `import styles from './${service}.module.css';\n${componentTsx}`;
    }
}

// Replace className="a b" with className={`a b ${styles['a'] || ''} ${styles['b'] || ''}`}
// To be safe, we only do this for standard string classNames
const clsStringRegex = /className=(["'])(.*?)\1/g;
componentTsx = componentTsx.replace(clsStringRegex, (match, quote, classesStr) => {
    const classes = classesStr.split(/\s+/).filter(Boolean);
    if (classes.length === 0) return match;
    
    const styleInjections = classes.map(c => `\${styles['${c}'] || ''}`).join(' ');
    return `className={\`${classesStr} ${styleInjections}\`.trim()}`;
});

fs.writeFileSync(componentPath, componentTsx);

console.log(`Migrated ${service} to CSS modules!`);
