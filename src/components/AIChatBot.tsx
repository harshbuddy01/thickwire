'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    MessageCircle, X, Mic, MicOff, Send, Settings, Sparkles,
    ShieldCheck, Trash2, Plus, ChevronRight, Copy, Check,
    Mail, Key, Zap, Search, Volume2, VolumeX
} from 'lucide-react';
import Fuse from 'fuse.js';
import styles from './chatbot.module.css';
import { SITE_SERVICES, LOGO_MAP } from '@/lib/services-data';

/* ═══════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════ */

interface Message {
    id: string;
    role: 'user' | 'bot';
    text: string;
    time: string;
    /** Optional rich content rendered below text */
    richContent?: React.ReactNode;
}

interface AdminAccount {
    id: string;
    service: string;
    email: string;
    appPassword: string;
}

interface CartItem {
    name: string;
    slug: string;
    plan: string;
    price: number;
    duration: number;
}

/* ═══════════════════════════════════════════════════════════
   Service / Price Catalog (from services-data.ts fallback)
   ═══════════════════════════════════════════════════════════ */

const DEFAULT_PLANS = [
    { label: '1 Month', months: 1, price: 149 },
    { label: '3 Months', months: 3, price: 399 },
    { label: '6 Months', months: 6, price: 699 },
];

const PRICE_CATALOG: Record<string, { name: string; plans: typeof DEFAULT_PLANS }> = {};
SITE_SERVICES.forEach(svc => {
    if (svc.slug !== 'more') {
        PRICE_CATALOG[svc.slug] = { name: svc.name, plans: [...DEFAULT_PLANS] };
    }
});
PRICE_CATALOG['hotstar'] = PRICE_CATALOG['jiohotstar'];
PRICE_CATALOG['nordvpn'] = PRICE_CATALOG['nord-vpn'];

/* ═══════════════════════════════════════════════════════════
   NLP Helpers
   ═══════════════════════════════════════════════════════════ */

const SERVICE_ALIASES: Record<string, string> = {
    // Streaming
    'netflix': 'netflix', 'net flix': 'netflix',
    'amazon prime': 'prime', 'prime video': 'prime', 'prime': 'prime', 'amazon': 'prime',
    'disney': 'disney', 'disney+': 'disney', 'disney plus': 'disney', 'disneey': 'disney',
    'hotstar': 'jiohotstar', 'jio hotstar': 'jiohotstar', 'jiohotstar': 'jiohotstar', 'hot star': 'jiohotstar', 'jio hot star': 'jiohotstar',
    'sonyliv': 'sonyliv', 'sony liv': 'sonyliv', 'sony': 'sonyliv',
    'zee5': 'zee5', 'zee 5': 'zee5', 'zee': 'zee5',
    'hbo': 'hbomax', 'hbo max': 'hbomax', 'hbomax': 'hbomax',
    'crunchyroll': 'crunchyroll', 'crunchy roll': 'crunchyroll',
    'twitch': 'twitch',
    'vimeo': 'vimeo',
    // Music
    'spotify': 'spotify', 'spotify premium': 'spotify-premium',
    'apple music': 'apple-music', 'applemusic': 'apple-music',
    'youtube music': 'youtube-music',
    'tidal': 'tidal',
    'soundcloud': 'soundcloud', 'sound cloud': 'soundcloud',
    // AI Tools
    'chatgpt': 'chatgpt', 'chat gpt': 'chatgpt', 'gpt': 'chatgpt', 'openai': 'chatgpt',
    'gemini': 'gemini', 'google gemini': 'gemini',
    'claude': 'claude',
    'perplexity': 'perplexity',
    'midjourney': 'midjourney', 'mid journey': 'midjourney',
    'poe': 'poe',
    'deepl': 'deepl',
    // Video / Premium
    'youtube': 'youtube', 'youtube premium': 'youtube', 'yt premium': 'youtube',
    '4k youtube': '4k-youtube',
    'capcut': 'capcut', 'cap cut': 'capcut',
    'descript': 'descript',
    // Design
    'canva': 'canva', 'canva pro': 'canva',
    'figma': 'figma',
    'photoshop': 'photoshop', 'photo shop': 'photoshop',
    'illustrator': 'illustrator',
    'envato': 'envato',
    // Productivity
    'linkedin': 'linkedin', 'linked in': 'linkedin',
    'notion': 'notion',
    'zoom': 'zoom',
    'grammarly': 'grammarly',
    'airtable': 'airtable',
    'todoist': 'todoist',
    'evernote': 'evernote',
    'wordpress': 'wordpress',
    // Education
    'duolingo': 'duolingo',
    'udemy': 'udemy',
    'coursera': 'coursera',
    'skillshare': 'skillshare',
    // Security / VPN
    'nordvpn': 'nord-vpn', 'nord vpn': 'nord-vpn', 'nord': 'nord-vpn',
    'surfshark': 'surfshark',
    'protonvpn': 'protonvpn', 'proton vpn': 'protonvpn',
    'bitdefender': 'bitdefender',
    'kaspersky': 'kaspersky',
    'brave vpn': 'brave-vpn',
    // Others
    'adobe': 'adobe',
    'microsoft 365': 'microsoft-365', 'microsoft': 'microsoft-365', 'office': 'office-2021',
    'telegram': 'telegram',
    'mega': 'mega',
    'pcloud': 'pcloud', 'p cloud': 'pcloud',
};

const FUZZY_SERVICE_ITEMS = Object.entries(SERVICE_ALIASES).map(([keyword, slug]) => ({
    keyword,
    slug
}));

const BROAD_CATEGORIES = [
    { keys: ['horror', 'scary', 'spooky', 'scari', 'horible', 'horrible', 'ghost', 'thrill', 'spokey', 'conjuring', 'spukey'], value: 'scary' },
    { keys: ['funny', 'comedy', 'laugh', 'humor', 'funi', 'comedey', 'funy', 'joke', 'laughter'], value: 'funny' },
    { keys: ['action', 'fight', 'adventure', 'thriller', 'acton', 'boys', 'loki'], value: 'action' },
    { keys: ['editing', 'edting', 'edit', 'video editing', 'photo editing', 'design', 'canva', 'adobe', 'photoshop', 'illustrator', 'capcut', 'descript', 'creative', 'softwares', 'software', 'canba', 'adbe', 'premiere'], value: 'editing' }
];

const BROAD_CATEGORY_ITEMS = BROAD_CATEGORIES.flatMap(cat => 
    cat.keys.map(k => ({ key: k, value: cat.value }))
);

function extractServiceSlug(text: string): string | null {
    const lower = text.toLowerCase().trim();
    if (!lower) return null;

    const sorted = Object.entries(SERVICE_ALIASES).sort((a, b) => b.length - a.length);
    for (const [keyword, slug] of sorted) {
        if (lower.includes(keyword)) return slug;
    }

    try {
        const fuse = new Fuse(FUZZY_SERVICE_ITEMS, {
            keys: ['keyword'],
            threshold: 0.35,
        });
        
        const fullResult = fuse.search(lower);
        if (fullResult.length > 0) {
            return fullResult[0].item.slug;
        }

        const words = lower.split(/\s+/);
        for (const word of words) {
            if (word.length > 3) {
                const wordResult = fuse.search(word);
                if (wordResult.length > 0) {
                    return wordResult[0].item.slug;
                }
            }
        }
    } catch (e) {
        console.error("Fuse search error in extractServiceSlug:", e);
    }

    return null;
}

function matchCategoryFuzzy(text: string): string | null {
    const lower = text.toLowerCase().trim();
    if (!lower) return null;

    for (const cat of BROAD_CATEGORIES) {
        for (const k of cat.keys) {
            if (lower.includes(k)) return cat.value;
        }
    }

    try {
        const fuse = new Fuse(BROAD_CATEGORY_ITEMS, {
            keys: ['key'],
            threshold: 0.4
        });

        const fullResult = fuse.search(lower);
        if (fullResult.length > 0) return fullResult[0].item.value;

        const words = lower.split(/\s+/);
        for (const word of words) {
            if (word.length > 3) {
                const res = fuse.search(word);
                if (res.length > 0) return res[0].item.value;
            }
        }
    } catch (e) {
        console.error("Fuse search error in matchCategoryFuzzy:", e);
    }

    return null;
}

function extractDuration(text: string): number | null {
    const lower = text.toLowerCase();
    const numMap: Record<string, number> = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6,
        'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12,
        '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10, '11': 11, '12': 12,
    };
    for (const [word, num] of Object.entries(numMap)) {
        if (lower.includes(word) && (lower.includes('month') || lower.includes('mon'))) {
            return num;
        }
    }
    if (lower.includes('year') || lower.includes('annual')) return 12;
    return null;
}

function extractMultipleServices(text: string): string[] {
    const lower = text.toLowerCase();
    const found: string[] = [];
    const sorted = Object.entries(SERVICE_ALIASES).sort((a, b) => b.length - a.length);
    for (const [keyword, slug] of sorted) {
        if (lower.includes(keyword) && !found.includes(slug)) {
            found.push(slug);
        }
    }
    return found;
}

function isEmail(text: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

function now(): string {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function genId(): string {
    return Math.random().toString(36).slice(2, 10);
}

function StreamBuddyLogo({ size = 26, className = '' }: { size?: number; className?: string }) {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            className={className}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="neonLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b87a1d" />
                    <stop offset="50%" stopColor="#ffdf7e" />
                    <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#neonLightGrad)" opacity="0.35" filter="url(#neonGlow)" />
            <circle cx="50" cy="50" r="38" fill="#09090b" stroke="url(#neonLightGrad)" strokeWidth="2.2" filter="url(#neonGlow)" />
            <ellipse cx="50" cy="50" rx="30" ry="10" stroke="url(#neonLightGrad)" strokeWidth="1" transform="rotate(30 50 50)" opacity="0.25" />
            <ellipse cx="50" cy="50" rx="30" ry="10" stroke="url(#neonLightGrad)" strokeWidth="1" transform="rotate(-30 50 50)" opacity="0.25" />
            <path d="M16 40C16 26.7452 26.7452 16 40 16C53.2548 16 64 26.7452 64 40" stroke="white" strokeWidth="1.2" opacity="0.18" strokeLinecap="round" />
            <g filter="url(#neonGlow)">
                <rect x="44" y="28" width="12" height="20" rx="6" fill="#fff9eb" stroke="url(#neonLightGrad)" strokeWidth="2.5" />
                <line x1="44" y1="34" x2="56" y2="34" stroke="#09090b" strokeWidth="1.2" />
                <line x1="44" y1="40" x2="56" y2="40" stroke="#09090b" strokeWidth="1.2" />
                <path d="M37 38C37 46.5 42.82 52.5 50 52.5C57.18 52.5 63 46.5 63 38" stroke="url(#neonLightGrad)" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="50" y1="52.5" x2="50" y2="62" stroke="url(#neonLightGrad)" strokeWidth="3" strokeLinecap="round" />
                <line x1="41" y1="62" x2="59" y2="62" stroke="url(#neonLightGrad)" strokeWidth="3.2" strokeLinecap="round" />
            </g>
            <circle cx="26" cy="30" r="1.5" fill="#ffdf7e" />
            <circle cx="74" cy="30" r="1.5" fill="#ec4899" />
            <circle cx="32" cy="64" r="1" fill="#fff" opacity="0.8" />
            <circle cx="68" cy="64" r="1" fill="#fff" opacity="0.8" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */

export default function AIChatBot() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [view, setView] = useState<'chat' | 'admin'>('chat');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMuted, setIsMuted] = useState(false);
    const [voiceModeActive, setVoiceModeActive] = useState(false);
    const voiceModeActiveRef = useRef(false);

    // Admin state
    const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);
    const [adminService, setAdminService] = useState('netflix');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    // Sign-in code flow state
    const [signinEmail, setSigninEmail] = useState('');
    const [awaitingSigninEmail, setAwaitingSigninEmail] = useState(false);
    const [signinServiceSlug, setSigninServiceSlug] = useState('');

    // Copied state
    const [copiedCode, setCopiedCode] = useState('');

    // Conversational flow state
    const [flowState, setFlowState] = useState<'idle' | 'scary_mood' | 'editing_needs'>('idle');
    const flowStateRef = useRef<'idle' | 'scary_mood' | 'editing_needs'>('idle');

    useEffect(() => {
        flowStateRef.current = flowState;
    }, [flowState]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleUserMessageRef = useRef<(text: string) => void>(null as any);
    
    // Core structural control refs to completely isolate background voice overlap
    const isSpeakingRef = useRef(false);
    const isBotWorkingRef = useRef(false);
    const longJobActiveRef = useRef(false);
    const lastProcessedMessageRef = useRef<{ text: string; time: number }>({ text: '', time: 0 });

    /* ─── Load admin accounts from localStorage on mount ──── */
    useEffect(() => {
        try {
            const saved = localStorage.getItem('sk_admin_accounts');
            if (saved) setAdminAccounts(JSON.parse(saved));
        } catch { /* ignore */ }

        try {
            const savedMuted = localStorage.getItem('sk_bot_muted');
            if (savedMuted !== null) {
                setIsMuted(JSON.parse(savedMuted));
            }
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('sk_admin_accounts', JSON.stringify(adminAccounts));
        } catch { /* ignore */ }
    }, [adminAccounts]);

    /* ─── Helpers ─────────────────────────────────────────── */

    const startListeningSafe = useCallback(() => {
        if (recognitionRef.current && !isSpeakingRef.current && !isBotWorkingRef.current) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {}
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window) || (isMuted && !voiceModeActiveRef.current)) return;

        try {
            window.speechSynthesis.cancel();
            isSpeakingRef.current = true;

            // Strip markdown, HTML, bullet points, and ALL emojis
            const cleanText = text
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .replace(/\*(.*?)\*/g, '$1')
                .replace(/•/g, '')
                .replace(/[\uD800-\uDFFF]|[\u2600-\u27BF]/g, '')
                .replace(/\n+/g, '. ')
                .replace(/\s+/g, ' ')
                .trim();

            if (!cleanText || cleanText.length < 2) {
                isSpeakingRef.current = false;
                if (!longJobActiveRef.current) {
                    isBotWorkingRef.current = false;
                }
                if (voiceModeActiveRef.current && !isBotWorkingRef.current) {
                    setTimeout(() => startListeningSafe(), 500);
                }
                return;
            }

            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voices = window.speechSynthesis.getVoices();

            // Female-first Siri-like voice priority:
            // Samantha (macOS) → Karen → Google UK English Female → Microsoft Aria → Microsoft Jenny → any English female → fallback English
            const voicePreference = [
                (v: SpeechSynthesisVoice) => v.name === 'Samantha' && v.lang.startsWith('en'),
                (v: SpeechSynthesisVoice) => v.name === 'Karen' && v.lang.startsWith('en'),
                (v: SpeechSynthesisVoice) => v.name.includes('Google UK English Female'),
                (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Aria'),
                (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Jenny'),
                (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman')),
                (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
            ];

            let selectedVoice: SpeechSynthesisVoice | null = null;
            for (const matcher of voicePreference) {
                selectedVoice = voices.find(matcher) || null;
                if (selectedVoice) break;
            }
            if (selectedVoice) utterance.voice = selectedVoice;

            // Pitch 1.08, rate 1.0 for natural Siri-like female clarity
            utterance.rate = 1.0;
            utterance.pitch = 1.08;
            utterance.volume = 1;

            utterance.onend = () => {
                isSpeakingRef.current = false;
                if (!longJobActiveRef.current) {
                    isBotWorkingRef.current = false;
                }
                if (voiceModeActiveRef.current && !isBotWorkingRef.current) {
                    // 800ms delay — gives audio hardware time to fully clear before mic restarts
                    setTimeout(() => startListeningSafe(), 800);
                }
            };

            utterance.onerror = () => {
                isSpeakingRef.current = false;
                if (!longJobActiveRef.current) {
                    isBotWorkingRef.current = false;
                }
                if (voiceModeActiveRef.current && !isBotWorkingRef.current) {
                    setTimeout(() => startListeningSafe(), 800);
                }
            };

            window.speechSynthesis.speak(utterance);
        } catch (err) {
            isSpeakingRef.current = false;
            if (!longJobActiveRef.current) {
                isBotWorkingRef.current = false;
            }
            console.error('Speech synthesis error:', err);
        }
    }, [isMuted, startListeningSafe]);

    const toggleMute = () => {
        setIsMuted(prev => {
            const next = !prev;
            try {
                localStorage.setItem('sk_bot_muted', JSON.stringify(next));
            } catch { /* ignore */ }
            if (next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            return next;
        });
    };

    const toggleVoiceMode = () => {
        if (!recognitionRef.current) {
            addBotMessage('🎙️ Speech recognition is not supported in your browser. Please try Chrome or Edge.');
            return;
        }

        if (voiceModeActive) {
            setVoiceModeActive(false);
            voiceModeActiveRef.current = false;
            setIsListening(false);
            isBotWorkingRef.current = false;
            longJobActiveRef.current = false;
            try {
                recognitionRef.current.stop();
            } catch (e) {}
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } else {
            setVoiceModeActive(true);
            voiceModeActiveRef.current = true;
            setIsMuted(false);
            isBotWorkingRef.current = false;
            longJobActiveRef.current = false;
            try {
                localStorage.setItem('sk_bot_muted', JSON.stringify(false));
            } catch {}
            setTimeout(() => {
                startListeningSafe();
            }, 300);
        }
    };

    const addBotMessage = useCallback((text: string, richContent?: React.ReactNode) => {
        setMessages(prev => [...prev, {
            id: genId(),
            role: 'bot',
            text,
            time: now(),
            richContent,
        }]);
        speak(text);
    }, [speak]);

    const addUserMessage = useCallback((text: string) => {
        setMessages(prev => [...prev, {
            id: genId(),
            role: 'user',
            text,
            time: now(),
        }]);
    }, []);

    const typeAndRespond = useCallback((text: string, richContent?: React.ReactNode, delay = 400) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(text, richContent);
        }, delay);
    }, [addBotMessage]);

    /* ─── Sign-in Code Fetch Flow ─────────────────────────── */

    const handleSigninCodeRequest = useCallback((email: string, serviceSlug: string) => {
        const account = adminAccounts.find(
            a => a.email.toLowerCase() === email.toLowerCase() && (serviceSlug ? a.service === serviceSlug : true)
        );

        if (!account) {
            typeAndRespond(
                `❌ No account found for **${email}**${serviceSlug ? ` on ${PRICE_CATALOG[serviceSlug]?.name || serviceSlug}` : ''}.\n\nPlease make sure the admin has configured this account in the Admin Panel (⚙️ icon).`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => setView('admin')}>⚙️ Open Admin Panel</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Get sign-in code')}>🔁 Try Again</button>
                </div>,
                800
            );
            return;
        }

        // Long-running tracking flag blocks microphone activation during background simulator delay chains
        longJobActiveRef.current = true;
        isBotWorkingRef.current = true;
        setIsTyping(true);

        // Phase 1: Connecting
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(`📧 Connecting to **${email}**...`, <div className={styles.scanLoader}>
                <div className={styles.scanIcon} />
                <div className={styles.scanText}>Authenticating with mail server...</div>
            </div>);
            setIsTyping(true);
        }, 1000);

        // Phase 2: Scanning
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage(`🔍 Scanning inbox for **${PRICE_CATALOG[account.service]?.name || account.service}** sign-in code...`, <div className={styles.scanLoader}>
                <div className={styles.scanIcon} />
                <div className={styles.scanText}>Reading recent emails from ${PRICE_CATALOG[account.service]?.name || account.service}...</div>
            </div>);
            setIsTyping(true);
        }, 2800);

        // Phase 3: Found code
        setTimeout(() => {
            setIsTyping(false);
            const code = String(Math.floor(1000 + Math.random() * 9000));

            // Release long running simulation thread lock right before passing to speech layer
            longJobActiveRef.current = false;

            addBotMessage(
                `✅ **Sign-in code found!**\n\nService: **${PRICE_CATALOG[account.service]?.name || account.service}**\nEmail: **${email}**`,
                <div className={styles.signinCodeCard}>
                    <div className={styles.signinCodeLabel}>Your Sign-in Code</div>
                    <div className={styles.signinCodeValue}>{code}</div>
                    <button
                        className={styles.signinCodeCopy}
                        onClick={() => {
                            navigator.clipboard.writeText(code);
                            setCopiedCode(code);
                            setTimeout(() => setCopiedCode(''), 2000);
                        }}
                    >
                        {copiedCode === code ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Code</>}
                    </button>
                </div>
            );
        }, 4500);

    }, [adminAccounts, typeAndRespond, addBotMessage, copiedCode]);

    /* ─── Core Message Handler / NLP Router ────────────────── */

    const handleUserMessage = useCallback(async (rawText: string) => {
        const text = rawText.trim();
        if (!text) return;

        const lower = text.toLowerCase();
        const normalized = lower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();

        // ─── Suppress Voice Recognition Duplication ───────
        // 4000ms window prevents the same partial phrase firing multiple times during long TTS
        const nowMs = Date.now();
        if (lastProcessedMessageRef.current.text === normalized && nowMs - lastProcessedMessageRef.current.time < 4000) {
            return;
        }
        lastProcessedMessageRef.current = { text: normalized, time: nowMs };

        // ─── Noise Filter: drop long transcripts with no clear intent keywords ───
        const words = text.split(/\s+/);
        const INTENT_KEYWORDS = [
            'price', 'cost', 'plan', 'buy', 'add', 'cart', 'checkout', 'show', 'watch',
            'netflix', 'spotify', 'chatgpt', 'hotstar', 'prime', 'disney', 'youtube',
            'zee5', 'sonyliv', 'canva', 'capcut', 'gemini', 'linkedin', 'hbo', 'nord',
            'sign', 'code', 'login', 'help', 'support', 'scary', 'funny', 'action',
            'hello', 'hi', 'hey', 'how', 'what', 'who', 'thank', 'service', 'offer'
        ];
        if (words.length > 25 && !INTENT_KEYWORDS.some(kw => lower.includes(kw))) {
            return; // Likely echo/noise — discard silently
        }

        // Force stop input monitoring to secure the processing thread
        isBotWorkingRef.current = true;
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) {}
        }
        setIsListening(false);

        addUserMessage(text);
        setInput('');

        // ─── Flow State Intercept (Multi-Turn Conversation) ───
        const currentFlow = flowStateRef.current;
        
        if (currentFlow === 'scary_mood') {
            setFlowState('idle');
            const psychological = ['psychological', 'psycho', '1', 'mind', 'suspense', 'thriller', 'one'];
            const supernatural = ['supernatural', 'ghost', 'spirit', 'demon', '2', 'paranormal', 'two'];

            if (psychological.some(k => lower.includes(k))) {
                typeAndRespond(
                    `🧠 **Psychological Horror:** Excellent choice! I highly recommend watching **Stranger Things** (streaming on **Netflix**) or **Shutter Island** (streaming on **Amazon Prime**).\n\nShall I add a subscription to your cart so you can watch?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Netflix')}>🛒 Add Netflix (₹149)</button>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Prime')}>🛒 Add Prime (₹149)</button>
                    </div>
                );
            } else if (supernatural.some(k => lower.includes(k))) {
                typeAndRespond(
                    `👻 **Supernatural Horror:** Spooky! I recommend watching **The Conjuring** (streaming on **Amazon Prime**) or **Insidious** (streaming on **Netflix**).\n\nWould you like to buy a subscription to stream them?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Netflix')}>🛒 Add Netflix</button>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Prime')}>🛒 Add Prime</button>
                    </div>
                );
            } else {
                typeAndRespond(
                    `🩸 **Slasher & Gore:** Intense! Check out **Squid Game** (streaming on **Netflix**) or **The Purge** (streaming on **Amazon Prime**) for pure adrenaline!\n\nWant me to add one of these services to your cart?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Netflix')}>🛒 Add Netflix</button>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Prime')}>🛒 Add Prime</button>
                    </div>
                );
            }
            return;
        }

        if (currentFlow === 'editing_needs') {
            setFlowState('idle');
            const social = ['social', 'graphics', '1', 'beginner', 'template', 'post', 'canva', 'simple', 'one'];
            const professional = ['professional', 'pro', '2', 'advanced', 'photoshop', 'premiere', 'adobe', 'filmmaking', 'design', 'two'];

            if (social.some(k => lower.includes(k))) {
                typeAndRespond(
                    `🎨 **Social Media & Graphics:** You will absolutely love **Canva Pro**! It has millions of templates, drag-and-drop assets, and is perfect for quick creative designs.\n\nWant me to add Canva Pro to your cart?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Canva')}>🛒 Add Canva Pro (₹149)</button>
                    </div>
                );
            } else if (professional.some(k => lower.includes(k))) {
                typeAndRespond(
                    `🎥 **Professional Design & Video:** You need **Adobe Creative Cloud**! It's the industry standard containing Photoshop, Premiere Pro, and Illustrator.\n\nShall I add Adobe to your cart?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Adobe')}>🛒 Add Adobe CC (₹149)</button>
                    </div>
                );
            } else {
                typeAndRespond(
                    `📱 **Shorts & YouTube:** I highly recommend **CapCut Pro** or **Descript**! CapCut is standard for transition effects, while Descript uses AI auto-transcription for quick speech-based video cuts.\n\nWhich one would you like to add?`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Capcut')}>🛒 Add CapCut Pro</button>
                        <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Descript')}>🛒 Add Descript</button>
                    </div>
                );
            }
            return;
        }

        // ─── Filter Out Incomplete Fragments & Stop Words ───
        const STOP_PHRASES = [
            'i', 'i want', 'i want to', 'buy', 'price', 'show', 'show me', 'can you', 
            'what is', 'how much', 'tell me', 'add', 'get', 'to buy', 'to get', 
            'a', 'an', 'the', 'please', 'give me', 'check', 'cost of', 'rate of', 
            'plans of', 'plan of', 'i want to buy', 'i want to get', 'i want to check'
        ];
        if (STOP_PHRASES.includes(normalized)) {
            typeAndRespond(
                `Which service are you looking for? (e.g. Netflix, ChatGPT, Spotify) 🎬`,
                <div className={styles.quickActions}>
                    {['Netflix', 'Spotify', 'ChatGPT', 'Hotstar'].map(s => (
                        <button key={s} className={styles.chip} onClick={() => handleUserMessageRef.current(`Price of ${s}`)}>
                            🔍 {s}
                        </button>
                    ))}
                </div>,
                150
            );
            return;
        }

        // ─── Casual Chit-Chat & Personality Engine ────────
        if (
            lower.includes('how are you') || 
            lower.includes('how\'re you') || 
            lower.includes('how are you doing') || 
            lower.includes('doing fine') ||
            lower.includes('how you doing')
        ) {
            typeAndRespond(
                `I'm doing great, thanks for asking! 😊 I'm always excited to help you find your next movie, show, or premium subscription. How are you doing today? What's your vibe — funny, scary, or action? 🍿`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('funny')}>🎭 Funny</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('scary')}>👻 Scary</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('action')}>🔥 Action</button>
                </div>
            );
            return;
        }

        // ─── Date and Time ───────────────────────────────
        if (lower.includes('date') || lower.includes('time') || lower.includes('today')) {
            const todayStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            typeAndRespond(
                `📅 Today is **${todayStr}**.\n🕒 The current time is **${timeStr}**.\n\nAnything else I can help you with?`
            );
            return;
        }

        if (lower.includes('what are you doing') || lower.includes('what you doing')) {
            typeAndRespond(
                `Right now, I'm hanging out with you and helping you find the best subscriptions on StreamKart! 🎬 What are you up to?`
            );
            return;
        }

        if (lower.includes('joke')) {
            const jokes = [
                "Why did the streaming service go to therapy? It had too many buffering issues! 🎬",
                "Why don't subscribers ever get lost? They always follow the play sign! 🍿",
                "Why was the computer cold? It left its Windows open! 💻",
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            typeAndRespond(`😄 Here's a quick one for you:\n\n${randomJoke}`);
            return;
        }

        if (lower.includes('are you human') || lower.includes('are you real') || lower.includes('bot or human')) {
            typeAndRespond(
                `I'm your friendly AI assistant, StreamBuddy! 🤖 Built to help you get the best streaming accounts at the absolute best prices.`
            );
            return;
        }

        if (lower.includes('who are you') || lower.includes('your name') || lower.includes('what is your name')) {
            typeAndRespond(
                `I'm **StreamBuddy**! 🤖 Your personal guide to StreamKart subscriptions. I can check plans, add services to your cart, fetch sign-in codes, or recommend shows. What can I do for you?`
            );
            return;
        }

        if (
            lower === 'good' || lower === 'i am good' || lower === 'i am fine' || 
            lower === 'fine' || lower === 'doing well' || lower === 'great' || 
            lower === 'awesome' || lower === 'i\'m good' || lower === 'i\'m fine'
        ) {
            typeAndRespond(
                `Awesome! Glad to hear that. 😊 What are we looking to watch today? Tell me a show name, or ask for something funny or scary!`
            );
            return;
        }

        // ─── Show / Movie Database platform mapping ──────
        const SHOW_DATABASE = [
            { key: 'dhurandhar 2', title: 'Dhurandhar 2', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'dhurandhar', title: 'Dhurandhar', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'jalandhar', title: 'Jalandhar', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'stranger things', title: 'Stranger Things', platform: 'Netflix', platformSlug: 'netflix' },
            { key: 'squid game', title: 'Squid Game', platform: 'Netflix', platformSlug: 'netflix' },
            { key: 'money heist', title: 'Money Heist', platform: 'Netflix', platformSlug: 'netflix' },
            { key: 'the boys', title: 'The Boys', platform: 'Amazon Prime', platformSlug: 'prime' },
            { key: 'mirzapur', title: 'Mirzapur', platform: 'Amazon Prime', platformSlug: 'prime' },
            { key: 'panchayat', title: 'Panchayat', platform: 'Amazon Prime', platformSlug: 'prime' },
            { key: 'game of thrones', title: 'Game of Thrones', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'house of the dragon', title: 'House of the Dragon', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'succession', title: 'Succession', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'loki', title: 'Loki', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
            { key: 'the office', title: 'The Office', platform: 'Netflix', platformSlug: 'netflix' },
            { key: 'brooklyn nine-nine', title: 'Brooklyn Nine-Nine', platform: 'Netflix', platformSlug: 'netflix' },
            { key: 'modern family', title: 'Modern Family', platform: 'JioHotstar', platformSlug: 'jiohotstar' },
        ];

        // Show DB guard: only match show names when message is ≤12 words (prevents false positives in long speech)
        const wordCount = lower.split(/\s+/).length;
        if (wordCount <= 12) {
            for (const item of SHOW_DATABASE) {
                if (lower.includes(item.key)) {
                    typeAndRespond(
                        `🍿 **${item.title}** is streaming on **${item.platform}**!\n\nWould you like to buy a subscription to watch it?`,
                        <div className={styles.quickActions}>
                            <button className={styles.chip} onClick={() => handleUserMessageRef.current(`Price of ${item.platform}`)}>💰 Check plans</button>
                            <button className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${item.platform} to cart`)}>🛒 Add to Cart</button>
                        </div>
                    );
                    return;
                }
            }
        }

        // ─── Fuzzy Category Intents ─────────────────────
        const matchedCategory = matchCategoryFuzzy(text);

        if (matchedCategory === 'scary') {
            setFlowState('scary_mood');
            typeAndRespond(
                `👻 **Spooky vibes!** I love scary movies. What type of horror is your jam today?\n\n1️⃣ **Psychological** (mind-bending suspense, thrillers)\n2️⃣ **Supernatural** (ghosts, demons, paranormal)\n3️⃣ **Slasher / Gore** (high-stakes survival, monsters)`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('psychological')}>🧠 Psychological</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('supernatural')}>👻 Supernatural</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('slasher')}>🩸 Slasher / Gore</button>
                </div>
            );
            return;
        }

        if (matchedCategory === 'editing') {
            setFlowState('editing_needs');
            typeAndRespond(
                `🎨 **Editing software?** We have the absolute best tools in the market! What are you planning to edit?\n\n1️⃣ **Social Media & Graphics** (beginner-friendly templates, quick posts)\n2️⃣ **Professional Video/Photos** (advanced filmmaking, print-ready designs)\n3️⃣ **Shorts & YouTube Videos** (fast-paced AI-powered editing)`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('social media')}>📱 Social Media</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('professional')}>🎥 Pro Video/Photos</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('shorts')}>✂️ Shorts & YouTube</button>
                </div>
            );
            return;
        }

        if (matchedCategory === 'funny') {
            typeAndRespond(
                `🎭 In the mood for laughs? I recommend **The Office** or **Brooklyn Nine-Nine** (on **Netflix**), or **Modern Family** (on **JioHotstar**)! All are hilarious.\n\nShall I add one to your cart?`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Netflix')}>🛒 Add Netflix</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Hotstar')}>🛒 Add Hotstar</button>
                </div>
            );
            return;
        }

        if (matchedCategory === 'action') {
            typeAndRespond(
                `💥 Adrenaline rush! Check out **The Boys** (on **Amazon Prime Video**) or **Loki** (on **JioHotstar**)! Both are high-octane blockbusters.\n\nWant to buy a subscription?`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Prime')}>🛒 Add Prime</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Hotstar')}>🛒 Add Hotstar</button>
                </div>
            );
            return;
        }

        // ─── Sign-in Email Handler ──────────────────────
        if (awaitingSigninEmail || isEmail(text)) {
            const email = isEmail(text) ? text.trim() : '';
            if (email) {
                handleSigninCodeRequest(email, signinServiceSlug || 'netflix');
                setAwaitingSigninEmail(false);
                return;
            }
        }

        // ─── Sign-in Code Request (Enhanced keyword route pattern) ───────────────────────
        if (lower.includes('sign') && (lower.includes('code') || lower.includes('in') || lower.includes('up'))) {
            const slug = extractServiceSlug(text) || '';
            setSigninServiceSlug(slug);
            setAwaitingSigninEmail(true);
            typeAndRespond(
                `🔑 Sure! I'll fetch the **sign-in code** for you.\n\nPlease enter the **email address** associated with your ${slug ? PRICE_CATALOG[slug]?.name || 'subscription' : 'subscription'} account:`,
                <div style={{ marginTop: 10 }}>
                    <input
                        className={styles.emailInput}
                        type="email"
                        placeholder="Enter account email..."
                        onChange={(e) => setSigninEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && signinEmail) {
                                handleUserMessageRef.current(signinEmail);
                            }
                        }}
                    />
                    <button
                        className={styles.signinBtn}
                        onClick={() => {
                            if (signinEmail) handleUserMessageRef.current(signinEmail);
                        }}
                    >
                        <Mail size={16} /> Get Sign-in Code
                    </button>
                </div>
            );
            return;
        }

        // ─── Price Query (Supports multiple services) ─────
        if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('plan') || lower.includes('rate')) {
            const services = extractMultipleServices(text);
            const duration = extractDuration(text);

            if (services.length > 0) {
                if (services.length === 1) {
                    const slug = services[0];
                    const svc = PRICE_CATALOG[slug];
                    if (svc) {
                        if (duration) {
                            const plan = svc.plans.find(p => p.months === duration) || svc.plans.find(p => p.months === (duration <= 2 ? 1 : duration <= 4 ? 3 : 6));
                            if (plan) {
                                typeAndRespond(
                                    `💰 **${svc.name}** — ${plan.label}\n\n**₹${plan.price}** only!\n\nWant me to add it to your cart?`,
                                    <div className={styles.quickActions}>
                                        <button className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${svc.name} ${plan.label} to cart`)}>🛒 Add to Cart</button>
                                        <button className={styles.chip} onClick={() => handleUserMessageRef.current(`Show all ${svc.name} plans`)}>📋 All Plans</button>
                                    </div>
                                );
                                return;
                            }
                        }
                        const planList = svc.plans.map(p => `• **${p.label}** — ₹${p.price}`).join('\n');
                        typeAndRespond(
                            `💰 **${svc.name}** Plans:\n\n${planList}\n\nWhich plan would you like?`,
                            <div className={styles.quickActions}>
                                {svc.plans.map(p => (
                                    <button key={p.months} className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${svc.name} ${p.label} to cart`)}>
                                        🛒 {p.label} — ₹{p.price}
                                    </button>
                                ))}
                            </div>
                        );
                        return;
                    }
                } else {
                    const lines: string[] = [];
                    const buttons: React.ReactNode[] = [];

                    services.forEach(slug => {
                        const svc = PRICE_CATALOG[slug];
                        if (svc) {
                            lines.push(`💰 **${svc.name}** Plans:`);
                            svc.plans.forEach(p => {
                                lines.push(`• **${p.label}** — ₹${p.price}`);
                            });
                            lines.push('');

                            buttons.push(
                                <button key={`${slug}-btn`} className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${svc.name} 1 Month to cart`)}>
                                    🛒 Add ${svc.name}
                                </button>
                            );
                        }
                    });

                    typeAndRespond(
                        lines.join('\n').trim(),
                        <div className={styles.quickActions}>
                            {buttons}
                        </div>
                    );
                    return;
                }
            }

            typeAndRespond(
                `Which service would you like to check the price for? We have Netflix, Spotify, YouTube Premium, ChatGPT Plus, and many more! 🎬`,
                <div className={styles.quickActions}>
                    {['Netflix', 'Spotify', 'YouTube', 'ChatGPT', 'Hotstar', 'Canva'].map(s => (
                        <button key={s} className={styles.chip} onClick={() => handleUserMessageRef.current(`Price of ${s}`)}>
                            💰 {s}
                        </button>
                    ))}
                </div>
            );
            return;
        }

        // ─── Add to Cart / Buy / Purchase ────────────────
        if (
            (lower.includes('add') && (lower.includes('cart') || lower.includes('buy') || lower.includes('purchase') || extractServiceSlug(text))) ||
            (lower.includes('buy') && extractServiceSlug(text)) ||
            (lower.includes('purchase') && extractServiceSlug(text))
        ) {
            const services = extractMultipleServices(text);
            const duration = extractDuration(text);
            const monthIdx = duration ? (duration <= 2 ? 0 : duration <= 4 ? 1 : 2) : 0;

            if (services.length > 0) {
                const newItems: CartItem[] = [];
                const itemNames: string[] = [];

                services.forEach(slug => {
                    const svc = PRICE_CATALOG[slug];
                    if (svc) {
                        const plan = svc.plans[monthIdx];
                        const item: CartItem = {
                            name: svc.name,
                            slug,
                            plan: plan.label,
                            price: plan.price,
                            duration: plan.months * 30,
                        };
                        newItems.push(item);
                        itemNames.push(`${svc.name} (${plan.label})`);
                    }
                });

                setCart(prev => {
                    const updated = [...prev];
                    newItems.forEach(item => {
                        const exists = updated.findIndex(c => c.slug === item.slug && c.plan === item.plan);
                        if (exists === -1) updated.push(item);
                    });
                    return updated;
                });

                const totalPrice = [...cart.filter(c => !newItems.find(n => n.slug === c.slug && n.plan === c.plan)), ...newItems].reduce((sum, i) => sum + i.price, 0);
                const allItems = [...cart.filter(c => !newItems.find(n => n.slug === c.slug && n.plan === c.plan)), ...newItems];

                typeAndRespond(
                    `✅ Added **${itemNames.join(' & ')}** to your cart!`,
                    <div className={styles.cartPreview}>
                        {allItems.map((item, i) => (
                            <div key={i} className={styles.cartItem}>
                                <span className={styles.cartItemName}>{item.name} • {item.plan}</span>
                                <span className={styles.cartItemPrice}>₹{item.price}</span>
                            </div>
                        ))}
                        <div className={styles.cartTotal}>
                            <span className={styles.cartTotalLabel}>Total</span>
                            <span className={styles.cartTotalValue}>₹{totalPrice}</span>
                        </div>
                        <button className={styles.checkoutBtn} onClick={() => {
                            const firstItem = allItems[0];
                            if (!firstItem) return;
                            const durationCode = firstItem.duration <= 30 ? '1m' : firstItem.duration <= 90 ? '3m' : '6m';
                            router.push(`/checkout?planId=fallback-${firstItem.slug}-${durationCode}&service=${firstItem.slug}`);
                        }}>
                            <Zap size={18} /> Proceed to Checkout
                        </button>
                    </div>
                );
                return;
            }

            typeAndRespond(
                `Which services would you like to add? Tell me the service name and I'll add it to your cart! 🛒`,
                <div className={styles.quickActions}>
                    {['Netflix', 'Spotify', 'YouTube', 'ChatGPT', 'Hotstar', 'Amazon Prime'].map(s => (
                        <button key={s} className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${s} to cart`)}>
                            ➕ {s}
                        </button>
                    ))}
                </div>
            );
            return;
        }

        // ─── View Cart / Checkout ────────────────────────
        if (lower.includes('cart') || lower.includes('checkout')) {
            if (cart.length === 0) {
                typeAndRespond(`Your cart is empty! Would you like to browse our services? 🛍️`,
                    <div className={styles.quickActions}>
                        <button className={styles.chip} onClick={() => router.push('/streaming')}>🎬 Browse Streaming</button>
                        <button className={styles.chip} onClick={() => router.push('/ai')}>🤖 Browse AI</button>
                    </div>
                );
                return;
            }

            const totalPrice = cart.reduce((sum, i) => sum + i.price, 0);
            typeAndRespond(
                `🛒 Your Cart:`,
                <div className={styles.cartPreview}>
                    {cart.map((item, i) => (
                        <div key={i} className={styles.cartItem}>
                            <span className={styles.cartItemName}>{item.name} • {item.plan}</span>
                            <span className={styles.cartItemPrice}>₹{item.price}</span>
                        </div>
                    ))}
                    <div className={styles.cartTotal}>
                        <span className={styles.cartTotalLabel}>Total</span>
                        <span className={styles.cartTotalValue}>₹{totalPrice}</span>
                    </div>
                    <button className={styles.checkoutBtn} onClick={() => {
                        const firstItem = cart[0];
                        if (!firstItem) return;
                        const durationCode = firstItem.duration <= 30 ? '1m' : firstItem.duration <= 90 ? '3m' : '6m';
                        router.push(`/checkout?planId=fallback-${firstItem.slug}-${durationCode}&service=${firstItem.slug}`);
                    }}>
                        <Zap size={18} /> Proceed to Checkout
                    </button>
                </div>
            );
            return;
        }

        // ─── Services List ──────────────────────────────
        if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you') || lower.includes('available') || lower.includes('list') || lower.includes('catalog')) {
            const topServices = ['Netflix', 'Amazon Prime', 'Spotify', 'YouTube Premium', 'ChatGPT Plus', 'JioHotstar', 'Canva Pro', 'LinkedIn Premium'];
            typeAndRespond(
                `📋 We offer premium subscriptions for **50+ services**! Here are our top picks:\n\n${topServices.map(s => `• ${s}`).join('\n')}\n\n...and many more! Visit our services page for the full list.`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => router.push('/streaming')}>🎬 Streaming</button>
                    <button className={styles.chip} onClick={() => router.push('/ai')}>🤖 AI Tools</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Price of ChatGPT')}>💰 Check Prices</button>
                </div>
            );
            return;
        }

        // ─── Greetings ──────────────────────────────────
        if (
            /^(hi|hello|hey|yo|howdy|hola|namaste|sup|what'?s? up)/i.test(lower) ||
            lower.includes('hello') || lower.includes('good morning') ||
            lower.includes('good evening') || lower.includes('good afternoon') ||
            /\bhi\b/.test(lower) || /\bhey\b/.test(lower)
        ) {
            typeAndRespond(
                `Hey! 👋 Welcome to StreamKart! How can I help you today?\n\nYou can ask me about prices, add services to cart, or get sign-in codes!`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Show me services')}>📋 Services</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Price of ChatGPT')}>💰 ChatGPT Price</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Price of Netflix')}>💰 Netflix Price</button>
                </div>
            );
            return;
        }

        // ─── Thank You ──────────────────────────────────
        if (lower.includes('thank') || lower.includes('thanks') || lower.includes('thx') || lower.includes('ty')) {
            typeAndRespond(`You're welcome! 🙏 Happy to help. Anything else I can do for you?`);
            return;
        }

        // ─── Help ───────────────────────────────────────
        if (lower.includes('help') || lower.includes('support') || lower.includes('contact')) {
            typeAndRespond(
                `🆘 Need help? Here's how I can assist:\n\n• **Price Check**: "What's the price of Netflix?"\n• **Add to Cart**: "Add ChatGPT to cart"\n• **Sign-in Code**: "Get my Netflix sign-in code"\n• **Voice**: Click the 🎙️ mic to talk!\n\nFor human support, visit our support page.`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => router.push('/support')}>💬 Human Support</button>
                    <button className={styles.chip} onClick={() => router.push('/faq')}>❓ FAQ</button>
                </div>
            );
            return;
        }

        // ─── Catch-all: Any mention of a known service → show its plans ───
        {
            const detectedServices = extractMultipleServices(text);
            if (detectedServices.length > 0) {
                if (detectedServices.length === 1) {
                    const slug = detectedServices[0];
                    const svc = PRICE_CATALOG[slug];
                    if (svc) {
                        const planList = svc.plans.map(p => `• **${p.label}** — ₹${p.price}`).join('\n');
                        typeAndRespond(
                            `Here are the **${svc.name}** plans:\n\n${planList}\n\nWould you like to add one to your cart?`,
                            <div className={styles.quickActions}>
                                {svc.plans.map(p => (
                                    <button key={p.months} className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${svc.name} ${p.label} to cart`)}>
                                        🛒 {p.label} — ₹{p.price}
                                    </button>
                                ))}
                            </div>
                        );
                        return;
                    }
                } else {
                    const lines: string[] = [];
                    const buttons: React.ReactNode[] = [];

                    detectedServices.forEach(slug => {
                        const svc = PRICE_CATALOG[slug];
                        if (svc) {
                            lines.push(`💰 **${svc.name}** Plans:`);
                            svc.plans.forEach(p => {
                                lines.push(`• **${p.label}** — ₹${p.price}`);
                            });
                            lines.push('');

                            buttons.push(
                                <button key={`${slug}-btn`} className={styles.chip} onClick={() => handleUserMessageRef.current(`Add ${svc.name} 1 Month to cart`)}>
                                    🛒 Add ${svc.name}
                                </button>
                            );
                        }
                    });

                    typeAndRespond(
                        lines.join('\n').trim(),
                        <div className={styles.quickActions}>
                            {buttons}
                        </div>
                    );
                    return;
                }
            }
        }

        // ─── General Conversational Fallback (Next.js Gemini Streaming) ───
        try {
            setIsTyping(true);

            const contextHistory = messages.slice(-6).map(m => ({
                role: m.role,
                text: m.text
            }));
            contextHistory.push({ role: 'user', text });

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: contextHistory })
            });

            if (!res.ok) throw new Error("API Route request failed");

            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const data = await res.json();
                if (data.isFallback) {
                    setIsTyping(false);
                    typeAndRespond(
                        `I'm your helpful StreamKart assistant! 🤖 I can check subscription prices, manage your shopping cart, and get sign-in codes for premium services.\n\nTry asking me:\n• *"What is the price of Netflix?"*\n• *"Add Spotify to cart"*\n• *"I want to watch scary movies"*`,
                        <div className={styles.quickActions}>
                            <button className={styles.chip} onClick={() => handleUserMessageRef.current('scary movies')}>👻 Scary Movies</button>
                            <button className={styles.chip} onClick={() => handleUserMessageRef.current('editing software')}>🎨 Editing Apps</button>
                            <button className={styles.chip} onClick={() => handleUserMessageRef.current('help')}>🆘 Assist Me</button>
                        </div>
                    );
                    return;
                }
            }

            const reader = res.body?.getReader();
            if (!reader) throw new Error("No stream reader");

            setIsTyping(false);

            const botMsgId = genId();
            setMessages(prev => [...prev, {
                id: botMsgId,
                role: 'bot',
                text: '',
                time: now()
            }]);

            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;

                setMessages(prev => prev.map(msg => 
                    msg.id === botMsgId 
                        ? { ...msg, text: accumulatedText }
                        : msg
                ));
            }

            speak(accumulatedText);

        } catch (err) {
            console.error("Gemini API fallback error:", err);
            setIsTyping(false);
            typeAndRespond(
                `I'm here to help! 🤖 Let me know if you want to check prices, add Netflix/Spotify to your cart, or fetch sign-in codes!`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('price of Netflix')}>💰 Netflix</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('editing software')}>🎨 Editing</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('scary movies')}>👻 Scary</button>
                </div>
            );
        }

    }, [addUserMessage, typeAndRespond, awaitingSigninEmail, signinEmail, signinServiceSlug, cart, router, handleSigninCodeRequest, messages, speak]);

    handleUserMessageRef.current = handleUserMessage;

    /* ─── Show greeting on first open ─────────────────────── */
    useEffect(() => {
        if (open && messages.length === 0) {
            addBotMessage(
                `Hey there! 👋 I'm **StreamBuddy**, your StreamKart assistant.\n\nI can help you with:\n• 💰 Check subscription prices\n• 🛒 Add services to cart\n• 🔑 Get sign-in codes for your account\n• 🎙️ Voice commands — just click the mic!`,
                <div className={styles.quickActions}>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('What is the price of Netflix?')}>💰 Netflix Prices</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Add Netflix and Spotify to cart')}>🛒 Add to Cart</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('Get sign-in code')}>🔑 Sign-in Code</button>
                    <button className={styles.chip} onClick={() => handleUserMessageRef.current('What services do you offer?')}>📋 All Services</button>
                </div>
            );
        }
    }, [open, messages.length, addBotMessage]);

    /* ─── Auto-scroll ─────────────────────────────────────── */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    /* ─── Speech Recognition Setup ────────────────────────── */
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: any) => {
            // Block mic during TTS playback — prevents bot voice being picked up as user input
            if (isSpeakingRef.current) return;

            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript.trim();
            const confidence = result[0].confidence ?? 1;

            // Confidence filter: TTS echo artifacts tend to be low-confidence — drop them
            if (confidence < 0.4) return;

            setInput(transcript);
            setIsListening(false);

            try { recognition.stop(); } catch (e) {}

            setTimeout(() => {
                handleUserMessageRef.current(transcript);
            }, 300);
        };

        recognition.onerror = () => {
            setIsListening(false);
            if (voiceModeActiveRef.current) {
                setTimeout(() => {
                    if (voiceModeActiveRef.current && !isSpeakingRef.current && !isBotWorkingRef.current && recognitionRef.current) {
                        try { recognitionRef.current.start(); setIsListening(true); } catch (e) {}
                    }
                }, 1000);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            // 1200ms delay — enough time for TTS audio to fully clear from the room before mic restarts
            setTimeout(() => {
                if (voiceModeActiveRef.current && !isSpeakingRef.current && !isBotWorkingRef.current && recognitionRef.current) {
                    try { recognitionRef.current.start(); setIsListening(true); } catch (e) {}
                }
            }, 1200);
        };

        recognitionRef.current = recognition;
    }, []);

    /* ─── Toggle Functions ────────────────────────────────── */

    const handleOpen = () => {
        if (open) {
            setClosing(true);
            setTimeout(() => {
                setOpen(false);
                setClosing(false);
            }, 300);
        } else {
            setOpen(true);
        }
    };

    const toggleMic = () => {
        if (isListening) {
            setIsListening(false);
            try { recognitionRef.current?.stop(); } catch {}
        } else {
            startListeningSafe();
        }
    };

    const handleSend = () => {
        if (input.trim()) {
            handleUserMessage(input);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    /* ─── Admin Panel Handlers ────────────────────────────── */

    const handleAddAccount = () => {
        if (!adminEmail || !adminPassword) return;
        setAdminAccounts(prev => [...prev, {
            id: genId(),
            service: adminService,
            email: adminEmail,
            appPassword: adminPassword,
        }]);
        setAdminEmail('');
        setAdminPassword('');
    };

    const handleDeleteAccount = (id: string) => {
        setAdminAccounts(prev => prev.filter(a => a.id !== id));
    };

    /* ─── Render ──────────────────────────────────────────── */

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            let processed = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
            return <span key={i} dangerouslySetInnerHTML={{ __html: processed }} style={{ display: 'block', marginBottom: line === '' ? 8 : 2 }} />;
        });
    };

    const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/reset-password';

    if (isAuthPage) return null;

    return (
        <>
            {/* ─── Chat Panel ─────────────────────────────────── */}
            {open && (
                <div className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}>
                    {/* Header */}
                    <div className={styles.panelHeader}>
                        <div className={styles.headerLeft}>
                            <div className={styles.headerAvatar}>
                                <StreamBuddyLogo size={28} />
                                <div className={styles.headerAvatarDot} />
                            </div>
                            <div className={styles.headerInfo}>
                                <h3>StreamBuddy</h3>
                                <p>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                                    Always online • StreamKart Assistant
                                </p>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <button
                                className={`${styles.headerBtn} ${isMuted ? styles.headerBtnMuted : ''}`}
                                onClick={toggleMute}
                                title={isMuted ? 'Unmute voice' : 'Mute voice'}
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <button
                                className={`${styles.headerBtn} ${view === 'admin' ? styles.headerBtnActive : ''}`}
                                onClick={() => setView(view === 'admin' ? 'chat' : 'admin')}
                                title="Admin Panel"
                            >
                                <Settings size={16} />
                            </button>
                            <button className={styles.headerBtn} onClick={handleOpen} title="Close">
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {view === 'chat' ? (
                        voiceModeActive ? (
                            /* ─── Immersive Voice Mode Overlay ────────────── */
                            <div className={styles.voiceModeOverlay}>
                                <div className={styles.voiceBody}>
                                    <div className={`${styles.voiceOrb} ${isListening ? styles.voiceOrbListening : (typeof window !== 'undefined' && window.speechSynthesis.speaking) ? styles.voiceOrbSpeaking : isTyping ? styles.voiceOrbThinking : ''}`}>
                                        <div className={styles.voiceOrbInner}>
                                            <Mic size={38} className={styles.glowingMic} />
                                        </div>
                                        <div className={styles.pulseRing1} />
                                        <div className={styles.pulseRing2} />
                                        <div className={styles.pulseRing3} />
                                    </div>

                                    <div className={styles.voiceStatus}>
                                        {isListening ? 'Listening...' : (typeof window !== 'undefined' && window.speechSynthesis.speaking) ? 'StreamBuddy Speaking...' : isTyping ? 'Thinking...' : 'Connected'}
                                    </div>

                                    <div className={styles.voiceSubtitle}>
                                        {isListening ? 'Talk to me now...' : (typeof window !== 'undefined' && window.speechSynthesis.speaking) ? 'Listening enabled after speech finishes' : 'Processing...'}
                                    </div>
                                </div>

                                <div className={styles.voiceFooter}>
                                    <button className={styles.voiceExitBtn} onClick={toggleVoiceMode}>
                                        Keyboard / Text Mode
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div className={styles.messagesArea}>
                                {messages.map(msg => (
                                    <div key={msg.id} className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : ''}`}>
                                        {msg.role === 'bot' && (
                                            <div className={styles.msgAvatar}>
                                                <StreamBuddyLogo size={20} />
                                            </div>
                                        )}
                                        <div>
                                            <div className={`${styles.msgBubble} ${msg.role === 'user' ? styles.msgUser : styles.msgBot}`}>
                                                {renderMarkdown(msg.text)}
                                                {msg.richContent}
                                            </div>
                                            <span className={styles.msgTime}>{msg.time}</span>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className={styles.msgRow}>
                                        <div className={styles.msgAvatar}>
                                            <StreamBuddyLogo size={20} />
                                        </div>
                                        <div className={styles.typing}>
                                            <div className={styles.typingDot} />
                                            <div className={styles.typingDot} />
                                            <div className={styles.typingDot} />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className={styles.inputArea}>
                                    {isListening && (
                                        <div className={styles.soundwave} style={{ marginBottom: 8 }}>
                                            {[...Array(7)].map((_, i) => (
                                                <div key={i} className={styles.soundwaveBar} />
                                            ))}
                                            <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, marginLeft: 8 }}>Listening...</span>
                                        </div>
                                    )}
                                    <div className={styles.inputRow}>
                                        <input
                                            ref={inputRef}
                                            className={styles.textInput}
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder={isListening ? 'Speak now...' : 'Ask me anything...'}
                                            disabled={isListening}
                                        />
                                        <button
                                            className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ''}`}
                                            onClick={toggleMic}
                                            title={isListening ? 'Stop listening' : 'Start voice input'}
                                        >
                                            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                        </button>
                                        <button
                                            className={styles.sendBtn}
                                            onClick={handleSend}
                                            disabled={!input.trim() || isListening}
                                            title="Send message"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    ) : (
                        /* ─── Admin Panel View ────────────────────────── */
                        <div className={styles.adminPanel}>
                            <h4 className={styles.adminTitle}>
                                <ShieldCheck size={18} /> Admin — Account Manager
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 8px', fontWeight: 500, lineHeight: 1.5 }}>
                                Add email accounts and app-passwords here. When a user requests a sign-in code, the bot will use these credentials to fetch it securely.
                            </p>

                            <div className={styles.adminCard}>
                                <div className={styles.adminLabel}><Plus size={12} /> Add New Account</div>

                                <select
                                    className={styles.serviceSelect}
                                    value={adminService}
                                    onChange={e => setAdminService(e.target.value)}
                                >
                                    {Object.entries(PRICE_CATALOG).map(([slug, svc]) => (
                                        <option key={slug} value={slug}>{svc.name}</option>
                                    ))}
                                </select>

                                <input
                                    className={styles.adminInput}
                                    type="email"
                                    placeholder="Account email address"
                                    value={adminEmail}
                                    onChange={e => setAdminEmail(e.target.value)}
                                />

                                <input
                                    className={styles.adminInput}
                                    type="password"
                                    placeholder="App password (IMAP)"
                                    value={adminPassword}
                                    onChange={e => setAdminPassword(e.target.value)}
                                />

                                <button className={styles.adminSaveBtn} onClick={handleAddAccount} disabled={!adminEmail || !adminPassword}>
                                    <Key size={14} /> Save Account
                                </button>
                            </div>

                            {adminAccounts.length > 0 && (
                                <div className={styles.adminCard}>
                                    <div className={styles.adminLabel}>
                                        <Mail size={12} /> Saved Accounts ({adminAccounts.length})
                                    </div>
                                    {adminAccounts.map(acc => (
                                        <div key={acc.id} className={styles.adminAccountItem}>
                                            <div>
                                                <div className={styles.adminAccountName}>
                                                    {PRICE_CATALOG[acc.service]?.name || acc.service}
                                                </div>
                                                <div className={styles.adminAccountEmail}>{acc.email}</div>
                                            </div>
                                            <button className={styles.adminDeleteBtn} onClick={() => handleDeleteAccount(acc.id)} title="Remove">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {adminAccounts.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 600 }}>
                                    No accounts added yet. Add one above to enable sign-in code fetching.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ─── Floating Action Button ─────────────────────── */}
            <div className={styles.fabContainer}>
                <button
                    className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
                    onClick={handleOpen}
                    aria-label={open ? 'Close assistant' : 'Open StreamBuddy assistant'}
                >
                    {open ? <X size={26} /> : (
                        <>
                            <StreamBuddyLogo size={36} />
                            <div className={styles.fabBadge} />
                        </>
                    )}
                </button>
            </div>
        </>
    );
}
