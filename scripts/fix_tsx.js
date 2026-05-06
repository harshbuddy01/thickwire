const fs = require('fs');

const tsxPath = 'src/app/services/netflix/NetflixPageClient.tsx';
let content = fs.readFileSync(tsxPath, 'utf-8');

if (!content.includes('import styles from')) {
    content = content.replace(
        "import { Check, Play, Zap, Monitor, ChevronDown, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';",
        "import { Check, Play, Zap, Monitor, ChevronDown, ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';\nimport styles from './netflix.module.css';"
    );
}

const classes = [
  'netflix-page-exact', 'plans-section',
  'section-title',      'section-subtitle', 'plans-grid',
  'plan-card',          'card-red',         'card-purple',
  'card-blue',          'plan-badge',       'badge-red',
  'badge-purple',       'badge-blue',       'best-value-ribbon',
  'best-value',         'plan-content',     'plan-name',
  'plan-price',         'currency',         'amount',
  'plan-features',      'text-red',         'text-purple',
  'text-blue',          'plan-btn',         'info-split',
  'why-list',           'why-item',         'why-icon',
  'why-text',           'faq-accordion',    'faq-item',
  'faq-question',       'faq-arrow',        'open',
  'faq-answer',         'faq-answer-inner', 'trust-strip',
  'trust-item',         'trust-icon',       'trust-text',
  'bottom-cta',         'cta-content',      'cta-icon-box',
  'cta-text',           'cta-button'
];
const classSet = new Set(classes);

function mapClassString(str) {
    return str.split(' ').map(c => classSet.has(c) ? `\${styles['${c}']}` : c).join(' ');
}

content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    const hasModuleClass = p1.split(' ').some(c => classSet.has(c));
    if (!hasModuleClass) return match;
    return `className={\`${mapClassString(p1)}\`}`;
});

content = content.replace(/className=\{`([^`]+)`\}/g, (match, p1) => {
    let res = p1;
    classSet.forEach(c => {
        // Safe replacement for word boundaries
        const r = new RegExp(`(?<=(?:^|\\s))${c}(?=(?:\\s|$))`, 'g');
        res = res.replace(r, `\${styles['${c}']}`);
    });
    return `className={\`${res}\`}`;
});

fs.writeFileSync(tsxPath, content);
console.log('Fixed TSX');
