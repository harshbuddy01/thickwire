import type { Service } from './types';

const MINIO_BASE = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

const svgLogo = (label: string, bg: string, fg: string) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <rect width="96" height="96" rx="20" fill="${bg}"/>
            <text x="48" y="55" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${label.length > 3 ? 21 : 28}" font-weight="800" fill="${fg}">${label}</text>
        </svg>
    `)}`;

const logoSvg = (body: string, bg = '#fffaf2') =>
    `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
            <rect width="96" height="96" rx="20" fill="${bg}"/>
            ${body}
        </svg>
    `)}`;

const wordMark = (label: string, bg: string, fg: string, size = 18, weight = 900) =>
    logoSvg(`<text x="48" y="55" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fg}">${label}</text>`, bg);

export const FALLBACK_SERVICES = [
    { id: '1', name: 'ChatGPT', slug: 'chatgpt', description: 'AI Assistant' },
    { id: '2', name: 'Amazon Prime', slug: 'prime', description: 'Streaming' },
    { id: '3', name: 'Netflix', slug: 'netflix', description: 'Streaming' },
    { id: '4', name: 'YouTube', slug: 'youtube', description: 'Premium' },
    { id: '5', name: 'SonyLIV', slug: 'sonyliv', description: 'Streaming' },
    { id: '6', name: 'Zee5', slug: 'zee5', description: 'Streaming' },
    { id: '7', name: 'Spotify', slug: 'spotify', description: 'Music' },
    { id: '8', name: 'Disney+', slug: 'disney', description: 'Streaming' },
];

export const SITE_SERVICES = [
    ...FALLBACK_SERVICES,
    { id: 'site-9', name: 'Gemini', slug: 'gemini', description: 'AI Assistant' },
    { id: 'site-10', name: 'JioHotstar', slug: 'jiohotstar', description: 'Streaming' },
    { id: 'site-11', name: 'Canva', slug: 'canva', description: 'Design' },
    { id: 'site-12', name: 'CapCut', slug: 'capcut', description: 'Video Editor' },
    { id: 'site-13', name: 'NordVPN', slug: 'nord-vpn', description: 'Security' },
    { id: 'site-14', name: 'LinkedIn', slug: 'linkedin', description: 'Professional' },
    { id: 'site-15', name: 'HBO Max', slug: 'hbomax', description: 'Streaming' },
    { id: 'site-16', name: 'Claude', slug: 'claude', description: 'AI Assistant' },
    { id: 'site-17', name: 'Adobe', slug: 'adobe', description: 'All Apps' },
    { id: 'site-18', name: 'Microsoft 365', slug: 'microsoft-365', description: 'Productivity' },
    { id: 'site-19', name: 'Apple Music', slug: 'apple-music', description: 'Music' },
    { id: 'site-20', name: 'Crunchyroll', slug: 'crunchyroll', description: 'Streaming' },
    { id: 'site-21', name: 'Tidal', slug: 'tidal', description: 'Music' },
    { id: 'site-22', name: 'Zoom', slug: 'zoom', description: 'Communication' },
    { id: 'site-23', name: 'Notion', slug: 'notion', description: 'Productivity' },
    { id: 'site-24', name: 'Poe', slug: 'poe', description: 'AI Assistant' },
    { id: 'site-25', name: 'Perplexity', slug: 'perplexity', description: 'AI Assistant' },
    { id: 'site-26', name: 'Midjourney', slug: 'midjourney', description: 'AI Image' },
    { id: 'site-27', name: 'Figma', slug: 'figma', description: 'Design' },
    { id: 'site-28', name: 'Grammarly', slug: 'grammarly', description: 'Writing' },
    { id: 'site-29', name: 'Duolingo', slug: 'duolingo', description: 'Education' },
    { id: 'site-30', name: 'Udemy', slug: 'udemy', description: 'Learning' },
    { id: 'site-31', name: '4K YouTube', slug: '4k-youtube', description: 'Video Tools' },
    { id: 'site-32', name: 'Descript', slug: 'descript', description: 'Audio & Video' },
    { id: 'site-33', name: 'Surfshark', slug: 'surfshark', description: 'Security' },
    { id: 'site-34', name: 'ProtonVPN', slug: 'protonvpn', description: 'Security' },
    { id: 'site-35', name: 'Bitdefender', slug: 'bitdefender', description: 'Security' },
    { id: 'site-36', name: 'MEGA', slug: 'mega', description: 'Cloud Storage' },
    { id: 'site-37', name: 'Telegram', slug: 'telegram', description: 'Premium' },
    { id: 'site-38', name: 'Twitch', slug: 'twitch', description: 'Streaming' },
    { id: 'site-39', name: 'SoundCloud', slug: 'soundcloud', description: 'Music' },
    { id: 'site-40', name: 'Vimeo', slug: 'vimeo', description: 'Video' },
    { id: 'site-41', name: 'Coursera', slug: 'coursera', description: 'Education' },
    { id: 'site-42', name: 'Photoshop', slug: 'photoshop', description: 'Design' },
    { id: 'site-43', name: 'Illustrator', slug: 'illustrator', description: 'Design' },
    { id: 'site-44', name: 'WordPress', slug: 'wordpress', description: 'Website' },
    { id: 'site-45', name: 'DeepL', slug: 'deepl', description: 'AI Translator' },
    { id: 'site-46', name: 'Envato', slug: 'envato', description: 'Design Assets' },
    { id: 'site-47', name: 'Skillshare', slug: 'skillshare', description: 'Learning' },
    { id: 'site-48', name: 'Spotify Premium', slug: 'spotify-premium', description: 'Music' },
    { id: 'site-49', name: 'YouTube Music', slug: 'youtube-music', description: 'Music' },
    { id: 'site-50', name: 'PremiumBeat', slug: 'premiumbeat', description: 'Music' },
    { id: 'site-51', name: 'Office 2021', slug: 'office-2021', description: 'Productivity' },
    { id: 'site-52', name: 'Kaspersky', slug: 'kaspersky', description: 'Security' },
    { id: 'site-53', name: 'Brave VPN', slug: 'brave-vpn', description: 'Security' },
    { id: 'site-54', name: 'pCloud', slug: 'pcloud', description: 'Cloud Storage' },
    { id: 'site-55', name: 'Airtable', slug: 'airtable', description: 'Productivity' },
    { id: 'site-56', name: 'Todoist', slug: 'todoist', description: 'Productivity' },
    { id: 'site-57', name: 'Evernote', slug: 'evernote', description: 'Productivity' },
    { id: 'site-58', name: '+ 20+ More', slug: 'more', description: 'Explore more' },
];

export const LOGO_MAP: Record<string, string> = {
    netflix: `${MINIO_BASE}/logos/netflix.png`,
    spotify: `${MINIO_BASE}/logos/spotify.png`,
    chatgpt: `${MINIO_BASE}/logos/chatgpt.png`,
    youtube: `${MINIO_BASE}/logos/youtube.png`,
    disney: `${MINIO_BASE}/logos/disney.png`,
    prime: `${MINIO_BASE}/logos/prime.svg`,
    sonyliv: `${MINIO_BASE}/logos/sonyliv.png`,
    zee5: `${MINIO_BASE}/logos/zee5.png`,
    hotstar: `${MINIO_BASE}/jiohotstar_3d.png`,
    jiohotstar: `${MINIO_BASE}/jiohotstar_3d.png`,
    gemini: `${MINIO_BASE}/logos/gemini.png`,
    canva: `${MINIO_BASE}/logos/canva.png`,
    capcut: `${MINIO_BASE}/logos/capcut.png`,
    'nord-vpn': logoSvg('<path d="M14 66l22-36 12 18 8-12 26 30H14z" fill="#356dff"/><path d="M36 30l8 28 4-10 8 18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>', '#eef4ff'),
    linkedin: `${MINIO_BASE}/logos/linkedin.png`,
    hbomax: `${MINIO_BASE}/logos/hbomax.png`,
    claude: `${MINIO_BASE}/logos/claude.png`,
    adobe: `${MINIO_BASE}/logos/adobe.png`,
    'microsoft-365': logoSvg('<rect x="17" y="17" width="28" height="28" fill="#f25022"/><rect x="51" y="17" width="28" height="28" fill="#7fba00"/><rect x="17" y="51" width="28" height="28" fill="#00a4ef"/><rect x="51" y="51" width="28" height="28" fill="#ffb900"/>', '#f4fbff'),
    'apple-music': logoSvg('<rect x="21" y="18" width="54" height="60" rx="16" fill="#fa365d"/><path d="M58 30v30a10 10 0 1 1-7-9.5V36l-21 4v26a10 10 0 1 1-7-9.5V34l35-6z" fill="#fff"/>', '#fff0f4'),
    crunchyroll: `${MINIO_BASE}/logos/crunchyroll.png`,
    tidal: logoSvg('<path d="M48 17l14 14-14 14-14-14 14-14zm-21 21l14 14-14 14-14-14 14-14zm42 0l14 14-14 14-14-14 14-14zm-21 21l14 14-14 14-14-14 14-14z" fill="#00a6b4"/>', '#eefcff'),
    zoom: logoSvg('<rect x="16" y="28" width="46" height="40" rx="10" fill="#2d8cff"/><path d="M62 42l18-11v34L62 54V42z" fill="#2d8cff"/>', '#eef5ff'),
    notion: `${MINIO_BASE}/logos/notion.png`,
    poe: wordMark('Poe', '#f2eaff', '#8757ff', 21),
    perplexity: `${MINIO_BASE}/logos/perplexity.png`,
    midjourney: `${MINIO_BASE}/logos/midjourney.png`,
    figma: logoSvg('<circle cx="37" cy="26" r="12" fill="#f24e1e"/><circle cx="59" cy="26" r="12" fill="#ff7262"/><circle cx="37" cy="48" r="12" fill="#a259ff"/><circle cx="59" cy="48" r="12" fill="#1abcfe"/><circle cx="37" cy="70" r="12" fill="#0acf83"/>', '#fff2ef'),
    grammarly: logoSvg('<circle cx="48" cy="48" r="30" fill="#12a182"/><path d="M62 40c-4-8-22-8-28 3-7 14 10 31 25 18M41 47h22v18" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>', '#eafff8'),
    duolingo: `${MINIO_BASE}/logos/duolingo.png`,
    udemy: logoSvg('<path d="M28 41l20-16 20 16" fill="none" stroke="#a435f0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><text x="48" y="69" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#111">U</text>', '#f7edff'),
    '4k-youtube': wordMark('4K', '#fff0f0', '#ff1d1d', 25),
    descript: logoSvg('<path d="M26 22h26c14 0 24 10 24 26S66 74 52 74H26V22zm18 15v22h8c7 0 12-4 12-11s-5-11-12-11h-8z" fill="#2b6edc"/>', '#eef6ff'),
    surfshark: logoSvg('<path d="M21 50c16-20 36-28 54-22-1 23-17 39-43 44 9-9 8-17-11-22z" fill="#14b8c8"/>', '#eaffff'),
    protonvpn: logoSvg('<path d="M19 69l28-48 30 48H19z" fill="#6d5cff"/><path d="M47 21v48" stroke="#fff" stroke-width="5"/><path d="M31 69l16-24 16 24" fill="#9b8cff"/>', '#f0ecff'),
    bitdefender: wordMark('B', '#fff0f0', '#ed1c24', 34),
    mega: wordMark('M', '#fff0f0', '#d9272e', 34),
    telegram: logoSvg('<circle cx="48" cy="48" r="31" fill="#26a5e4"/><path d="M26 47l43-17-8 39-13-11-8 8 2-14 23-17-30 20-9-8z" fill="#fff"/>', '#eaf7ff'),
    twitch: wordMark('Twitch', '#f3eaff', '#9146ff', 15),
    soundcloud: logoSvg('<path d="M26 58h44a12 12 0 0 0 0-24 18 18 0 0 0-34 8 13 13 0 0 0-10 16z" fill="#ff5500"/><g stroke="#fff2e8" stroke-width="3"><path d="M25 43v15M31 38v20M37 34v24"/></g>', '#fff2e8'),
    vimeo: wordMark('v', '#e9f8ff', '#1ab7ea', 38),
    coursera: wordMark('C', '#edf4ff', '#2a73cc', 34),
    photoshop: wordMark('Ps', '#001e36', '#31a8ff', 26),
    illustrator: wordMark('Ai', '#330000', '#ff9a00', 27),
    wordpress: logoSvg('<circle cx="48" cy="48" r="31" fill="#21759b"/><text x="48" y="62" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="900" fill="#fff">W</text>', '#eef7ff'),
    deepl: logoSvg('<path d="M23 26h50v32H44L30 72V58h-7V26z" fill="#0f2b46"/><circle cx="38" cy="42" r="4" fill="#fff"/><circle cx="52" cy="42" r="4" fill="#fff"/><circle cx="66" cy="42" r="4" fill="#fff"/>', '#eef4fb'),
    envato: logoSvg('<path d="M62 17c4 26-6 49-30 62-13-22 2-49 30-62z" fill="#82b541"/>', '#effbe8'),
    skillshare: wordMark('SK', '#effdf5', '#00cc6a', 25),
    'spotify-premium': `${MINIO_BASE}/logos/spotify.png`,
    'youtube-music': logoSvg('<circle cx="48" cy="48" r="30" fill="#ff0000"/><path d="M42 34l23 14-23 14V34z" fill="#fff"/>', '#fff0f0'),
    premiumbeat: logoSvg('<rect x="22" y="50" width="8" height="24" fill="#d69b2d"/><rect x="38" y="34" width="8" height="40" fill="#d69b2d"/><rect x="54" y="42" width="8" height="32" fill="#d69b2d"/><rect x="70" y="26" width="8" height="48" fill="#d69b2d"/>', '#fff9e8'),
    'office-2021': logoSvg('<path d="M30 24l25-10 20 12v44L55 82 30 72V24zm25-10v68" fill="none" stroke="#d83b01" stroke-width="7" stroke-linejoin="round"/>', '#fff0ea'),
    kaspersky: wordMark('K', '#eafff6', '#00a88e', 34),
    'brave-vpn': logoSvg('<path d="M48 14l27 11-4 35-23 22-23-22-4-35 27-11z" fill="#fb542b"/><path d="M34 38h28M37 53h22" stroke="#fff" stroke-width="6" stroke-linecap="round"/>', '#fff0e8'),
    pcloud: logoSvg('<path d="M26 60h43a12 12 0 0 0 0-24 19 19 0 0 0-36 6 12 12 0 0 0-7 18z" fill="#17bed2"/><text x="49" y="57" text-anchor="middle" font-family="Arial" font-size="23" font-weight="900" fill="#fff">p</text>', '#e9fbff'),
    airtable: logoSvg('<path d="M17 33l31-15 31 15-31 15-31-15z" fill="#f6b342"/><path d="M17 44l31 15v20L17 63V44z" fill="#ef5b5b"/><path d="M79 44L48 59v20l31-16V44z" fill="#35a7ff"/>', '#fff8e8'),
    todoist: logoSvg('<g stroke="#e44332" stroke-width="7" stroke-linecap="round"><path d="M24 32h48M24 48h48M24 64h48"/></g><g fill="#e44332"><circle cx="17" cy="32" r="4"/><circle cx="17" cy="48" r="4"/><circle cx="17" cy="64" r="4"/></g>', '#fff0ee'),
    evernote: logoSvg('<path d="M28 22h28l14 14v38H28V22z" fill="#00a82d"/><path d="M56 22v16h16" fill="#effbe9"/><circle cx="47" cy="54" r="9" fill="#effbe9"/>', '#effbe9'),
    more: wordMark('+', '#fffaf2', '#17130f', 36),
};

const CATEGORY_MAP: Record<string, string> = {
    chatgpt: 'AI Assistant',
    gemini: 'AI Assistant',
    claude: 'AI Assistant',
    youtube: 'Premium',
    netflix: 'Streaming',
    disney: 'Streaming',
    jiohotstar: 'Streaming',
    hotstar: 'Streaming',
    prime: 'Streaming',
    spotify: 'Music',
    sonyliv: 'Streaming',
    zee5: 'Streaming',
    canva: 'Design',
    capcut: 'Video Editor',
    linkedin: 'Professional',
    'nord-vpn': 'Security',
    nordvpn: 'Security',
};

const DOMAIN_MAP: Record<string, string> = {
    chatgpt: 'chatgpt.com',
    claude: 'claude.ai',
    gemini: 'gemini.google.com',
    youtube: 'youtube.com',
    netflix: 'netflix.com',
    disney: 'disneyplus.com',
    jiohotstar: 'hotstar.com',
    hotstar: 'hotstar.com',
    prime: 'primevideo.com',
    spotify: 'spotify.com',
    capcut: 'capcut.com',
    'nord-vpn': 'nordvpn.com',
    nordvpn: 'nordvpn.com',
    canva: 'canva.com',
    adobe: 'adobe.com',
    linkedin: 'linkedin.com',
    'microsoft-365': 'office.com',
    'apple-music': 'music.apple.com',
    crunchyroll: 'crunchyroll.com',
    tidal: 'tidal.com',
    zoom: 'zoom.us',
    notion: 'notion.so',
    poe: 'poe.com',
    perplexity: 'perplexity.ai',
    midjourney: 'midjourney.com',
    figma: 'figma.com',
    grammarly: 'grammarly.com',
    duolingo: 'duolingo.com',
    udemy: 'udemy.com',
    '4k-youtube': 'youtube.com',
    descript: 'descript.com',
    surfshark: 'surfshark.com',
    protonvpn: 'protonvpn.com',
    bitdefender: 'bitdefender.com',
    mega: 'mega.io',
    telegram: 'telegram.org',
    twitch: 'twitch.tv',
    soundcloud: 'soundcloud.com',
    vimeo: 'vimeo.com',
    coursera: 'coursera.org',
    photoshop: 'adobe.com',
    illustrator: 'adobe.com',
    wordpress: 'wordpress.org',
    deepl: 'deepl.com',
    envato: 'envato.com',
    skillshare: 'skillshare.com',
    'spotify-premium': 'spotify.com',
    'youtube-music': 'music.youtube.com',
    premiumbeat: 'premiumbeat.com',
    'office-2021': 'office.com',
    kaspersky: 'kaspersky.com',
    'brave-vpn': 'brave.com',
    pcloud: 'pcloud.com',
    airtable: 'airtable.com',
    todoist: 'todoist.com',
    evernote: 'evernote.com',
    zee5: 'zee5.com',
    sonyliv: 'sonyliv.com',
};

export function getLogo(service: any) {
    const slug = (service.slug || '').toLowerCase();
    const aliasMap: Record<string, string> = {
        'amazon-prime': 'prime',
        'amazon-prime-video': 'prime',
        'prime-video': 'prime',
        'disney-plus': 'disney',
        'hotstar': 'jiohotstar',
        'hbo-max': 'hbomax',
        'chatgpt-plus': 'chatgpt',
        'youtube-premium': 'youtube',
        'netflix-premium': 'netflix',
        'spotify-plus': 'spotify',
        'sony-liv': 'sonyliv',
        'zee-5': 'zee5',
        'microsoft365': 'microsoft-365',
    };
    
    const mappedSlug = aliasMap[slug] || slug;

    // Use Google's high-resolution, adblock-immune Favicon CDN for modern brand logos
    if (DOMAIN_MAP[mappedSlug]) {
        return `https://www.google.com/s2/favicons?sz=128&domain=${DOMAIN_MAP[mappedSlug]}`;
    }

    return LOGO_MAP[mappedSlug] || service.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=f8f1e7&color=9c6b2f&bold=true&size=128`;
}

export function getCategory(service: any) {
    return service.category || CATEGORY_MAP[(service.slug || '').toLowerCase()] || service.description || 'Premium';
}

export function getFallbackService(slug: string): Service | null {
    const siteService = SITE_SERVICES.find((s) => s.slug === slug);
    if (!siteService && slug !== 'more') return null;

    const name = siteService?.name || (slug.charAt(0).toUpperCase() + slug.slice(1));

    return {
        id: `fallback-${slug}`,
        name: name,
        slug: slug,
        description: `Get instant, official premium access to ${name}. Fully verified and secure accounts.`,
        logoUrl: null,
        displayOrder: 99,
        plans: [
            {
                id: `fallback-${slug}-1m`,
                name: '1 Month Premium Access',
                slug: `fallback-${slug}-1m`,
                description: 'Super fast delivery. 100% stable private login.',
                price: '149',
                originalPrice: '299',
                currency: 'INR',
                durationDays: 30,
                displayOrder: 1,
                stockCount: 999,
                inStock: true,
            },
            {
                id: `fallback-${slug}-3m`,
                name: '3 Months Premium Access',
                slug: `fallback-${slug}-3m`,
                description: 'Best value subscription. Priority support.',
                price: '399',
                originalPrice: '799',
                currency: 'INR',
                durationDays: 90,
                displayOrder: 2,
                stockCount: 999,
                inStock: true,
            },
            {
                id: `fallback-${slug}-6m`,
                name: '6 Months Premium Access',
                slug: `fallback-${slug}-6m`,
                description: 'Long-term access. Priority support and discounts.',
                price: '699',
                originalPrice: '1399',
                currency: 'INR',
                durationDays: 180,
                displayOrder: 3,
                stockCount: 999,
                inStock: true,
            },
        ],
    };
}
