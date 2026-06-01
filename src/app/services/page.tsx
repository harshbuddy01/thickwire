'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    ChevronRight, Headphones, Search, ShieldCheck, X, Zap,
    Menu, User, LayoutGrid, Tag, ShoppingBag, Home, Sparkles
} from 'lucide-react';
import Fuse from 'fuse.js';
import { getServices } from '@/lib/api';
import styles from './services-directory.module.css';

const MINIO_BASE = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

import { SITE_SERVICES, getLogo, getCategory } from '@/lib/services-data';

const trustItems = [
    { icon: Zap, title: 'Instant Delivery', text: 'Access in seconds' },
    { icon: ShieldCheck, title: '100% Secure', text: 'Trusted & verified accounts' },
    { icon: Headphones, title: '24/7 Support', text: "We're here for you anytime" },
];

function ServiceTile({ service, dark = false, index = 0, className = '' }: { service: any; dark?: boolean; index?: number; className?: string }) {
    if (service.slug === 'more') {
        return (
            <div className={className}>
                <button
                    type="button"
                    onClick={() => {
                        const btn = document.querySelector('#service-collection .showMoreButton button');
                        if (btn) (btn as HTMLButtonElement).click();
                    }}
                    style={{ border: 'none', background: 'none', padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer', display: 'block' }}
                >
                    <div className={styles.moreCard}>
                        <div className={styles.morePlus}>+</div>
                        <span>
                            <strong style={{ color: 'var(--ink)' }}>{service.name}</strong>
                            <small>{service.description}</small>
                        </span>
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            <Link href={`/services/${service.slug}`} className={dark ? styles.darkTile : styles.logoTile}>
                <Image src={getLogo(service)} alt={service.name} width={48} height={48} unoptimized />
                <span>
                    <strong>{service.name}</strong>
                    <small>{getCategory(service)}</small>
                </span>
            </Link>
        </div>
    );
}

export default function ServicesDirectoryPage() {
    const [services, setServices] = useState<any[]>(SITE_SERVICES);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [correctedQuery, setCorrectedQuery] = useState<string | null>(null);
    const [originalQuery, setOriginalQuery] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 720);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Add active services page body class
        document.body.classList.add('services-page-active');

        const params = new URLSearchParams(window.location.search);
        const initialQuery = params.get('q');
        if (initialQuery) {
            setSearchQuery(initialQuery);
            setIsSearchExpanded(true);
        }

        setLoading(false);
        getServices()
            .then((data) => {
                const merged: any[] = data && data.length > 0 ? [...data] : [];
                SITE_SERVICES.forEach((siteService) => {
                    if (!merged.some((service) => service.slug?.toLowerCase() === siteService.slug)) {
                        merged.push(siteService);
                    }
                });
                setServices(merged);
            })
            .catch(() => setServices(SITE_SERVICES))
            .finally(() => setLoading(false));

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('services-page-active');
        };
    }, []);

    // ✨ Autocorrect Spelling Effect (Fuse.js Spell Check)
    useEffect(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            setCorrectedQuery(null);
            setOriginalQuery('');
            return;
        }

        // 1. Check if there are direct matches
        const hasDirectMatch = services.some((service) => {
            if ((service.slug || '').toLowerCase() === 'more') return false;
            return service.name.toLowerCase().includes(query) || service.description?.toLowerCase().includes(query);
        });

        if (hasDirectMatch) {
            setCorrectedQuery(null);
            setOriginalQuery('');
            return;
        }

        // 2. No direct match found! Execute fuzzy search for spell-correction
        try {
            const fuse = new Fuse(services.filter(s => (s.slug || '').toLowerCase() !== 'more'), {
                keys: ['name', 'slug', 'description'],
                threshold: 0.45,
                includeScore: true
            });
            const results = fuse.search(query);
            if (results.length > 0 && results[0].score !== undefined && results[0].score <= 0.45) {
                setCorrectedQuery(results[0].item.name);
                setOriginalQuery(searchQuery);
            } else {
                setCorrectedQuery(null);
            }
        } catch (e) {
            console.error("Fuse spell check error:", e);
        }
    }, [searchQuery, services]);

    const displayedServices = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        const preferredOrder = [
            'chatgpt', 'claude', 'gemini', 'youtube', 'netflix', 'disney', 'jiohotstar', 'prime',
            'spotify', 'capcut', 'nord-vpn', 'canva', 'adobe', 'linkedin', 'microsoft-365', 'apple-music',
            'hbomax', 'crunchyroll', 'tidal', 'zoom', 'notion', 'poe', 'perplexity', 'midjourney',
            'figma', 'grammarly', 'duolingo', 'udemy', '4k-youtube', 'descript', 'surfshark', 'protonvpn',
            'bitdefender', 'mega', 'telegram', 'twitch', 'soundcloud', 'vimeo', 'coursera', 'photoshop',
            'illustrator', 'wordpress', 'deepl', 'envato', 'skillshare', 'spotify-premium', 'youtube-music',
            'premiumbeat', 'office-2021', 'kaspersky', 'brave-vpn', 'pcloud', 'airtable', 'todoist', 'evernote',
            'zee5', 'sonyliv', 'more',
        ];

        // If autocorrect has found a better query, override the query used for displaying cards!
        const finalQuery = (correctedQuery && originalQuery === searchQuery) 
            ? correctedQuery.toLowerCase() 
            : query;

        return services
            .filter((service) => {
                // Exclude the 'more' placeholder service since we have a hardcoded card
                if ((service.slug || '').toLowerCase() === 'more') return false;
                if (!finalQuery) return true;
                return service.name.toLowerCase().includes(finalQuery) || service.description?.toLowerCase().includes(finalQuery);
            })
            .sort((a, b) => {
                const aIndex = preferredOrder.indexOf((a.slug || '').toLowerCase());
                const bIndex = preferredOrder.indexOf((b.slug || '').toLowerCase());
                // Fallback safe sort
                const normA = aIndex === -1 ? 999 : aIndex;
                const normB = bIndex === -1 ? 999 : bIndex;
                return normA - normB;
            });
    }, [services, searchQuery, correctedQuery, originalQuery]);

    const { topServices, darkServices, lightServices } = useMemo(() => {
        const preferredOrder = [
            'chatgpt', 'claude', 'gemini', 'youtube', 'netflix', 'disney', 'jiohotstar', 'prime',
            'spotify', 'capcut', 'nord-vpn', 'canva', 'adobe', 'linkedin', 'microsoft-365', 'apple-music',
            'hbomax', 'crunchyroll', 'tidal', 'zoom', 'notion', 'poe', 'perplexity', 'midjourney',
            'figma', 'grammarly', 'duolingo', 'udemy', '4k-youtube', 'descript', 'surfshark', 'protonvpn',
            'bitdefender', 'mega', 'telegram', 'twitch', 'soundcloud', 'vimeo', 'coursera', 'photoshop',
            'illustrator', 'wordpress', 'deepl', 'envato', 'skillshare', 'spotify-premium', 'youtube-music',
            'premiumbeat', 'office-2021', 'kaspersky', 'brave-vpn', 'pcloud', 'airtable', 'todoist', 'evernote',
            'zee5', 'sonyliv', 'more',
        ];

        // 1. Sort the entire unfiltered services list according to preferredOrder
        const sortedAll = [...services]
            .filter((s) => (s.slug || '').toLowerCase() !== 'more')
            .sort((a, b) => {
                const aIndex = preferredOrder.indexOf((a.slug || '').toLowerCase());
                const bIndex = preferredOrder.indexOf((b.slug || '').toLowerCase());
                const normA = aIndex === -1 ? 999 : aIndex;
                const normB = bIndex === -1 ? 999 : bIndex;
                return normA - normB;
            });

        // 2. Define the active search query to filter with
        const query = searchQuery.toLowerCase().trim();
        const finalQuery = (correctedQuery && originalQuery === searchQuery) 
            ? correctedQuery.toLowerCase() 
            : query;

        const matchesQuery = (service: any) => {
            if (!finalQuery) return true;
            return service.name.toLowerCase().includes(finalQuery) || service.description?.toLowerCase().includes(finalQuery);
        };

        const moreService = {
            id: 'site-more-card',
            name: isMobile ? '+ 30+ More' : '+ 20+ More',
            slug: 'more',
            description: isMobile ? 'Explore all' : 'Explore more',
        };

        if (isMobile) {
            // Mobile partitioning:
            // Unfiltered:
            // - Top grid gets first 14 services (indices 0 to 13)
            // - Bottom dark list gets remaining services (14+)
            const unfilteredTop = sortedAll.slice(0, 14);
            const unfilteredDark = sortedAll.slice(14);

            // Filter each partition
            const filteredTop = unfilteredTop.filter(matchesQuery);
            const filteredDark = unfilteredDark.filter(matchesQuery);

            // Do not append the redundant "more" card in mobile view
            const darkWithMore = filteredDark;

            return {
                topServices: filteredTop,
                darkServices: darkWithMore,
                lightServices: [],
            };
        }

        // Desktop modes
        if (isExpanded) {
            // Desktop Expanded partitioning:
            // - Left Dark Panel (indices 16 to 47)
            // - Right Light Panel (indices 0 to 15, and 36+)
            const unfilteredDark = sortedAll.filter((s) => {
                const idx = preferredOrder.indexOf((s.slug || '').toLowerCase());
                return idx >= 16 && idx <= 47;
            });

            const unfilteredLight = sortedAll.filter((s) => {
                const idx = preferredOrder.indexOf((s.slug || '').toLowerCase());
                return (idx >= 0 && idx < 16) || idx >= 36;
            });

            const filteredDark = unfilteredDark.filter(matchesQuery);
            const filteredLight = unfilteredLight.filter(matchesQuery);

            const lightWithMore = finalQuery ? filteredLight : [...filteredLight, moreService];

            return {
                topServices: [],
                darkServices: filteredDark,
                lightServices: lightWithMore,
            };
        } else {
            // Desktop Collapsed partitioning:
            // - Top grid shows 16 popular services (indices 0-15)
            // - Left Dark Panel shows 20 services (indices 16-35)
            // - Right Light Panel shows 19 services (indices 36-54)
            const unfilteredTop = sortedAll.slice(0, 16);
            
            const unfilteredDark = sortedAll.filter((s) => {
                const idx = preferredOrder.indexOf((s.slug || '').toLowerCase());
                return idx >= 16 && idx < 36;
            });

            const unfilteredLight = sortedAll.filter((s) => {
                const idx = preferredOrder.indexOf((s.slug || '').toLowerCase());
                return idx >= 36 && idx <= 54;
            });

            const filteredTop = unfilteredTop.filter(matchesQuery);
            const filteredDark = unfilteredDark.filter(matchesQuery);
            const filteredLight = unfilteredLight.filter(matchesQuery);

            const lightWithMore = finalQuery ? filteredLight : [...filteredLight, moreService];

            return {
                topServices: filteredTop,
                darkServices: filteredDark,
                lightServices: lightWithMore,
            };
        }
    }, [services, searchQuery, correctedQuery, originalQuery, isMobile, isExpanded]);

    return (
        <div className={styles.pageShell}>

            <div className={styles.container}>
                {/* Breadcrumbs Navigation - Hidden on mobile in css */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={12} />
                    <span>All Services</span>
                </div>

                {/* Wide Premium Banner Section - Hidden on mobile in css */}
                <div className={styles.heroBanner}>
                    <Image 
                        src="/assets/streamkart-premium-access-banner.jpg" 
                        alt="StreamKart Premium Digital Access Banner" 
                        width={1400} 
                        height={450} 
                        className={styles.bannerImage} 
                        priority
                        unoptimized
                    />
                </div>

                <section id="service-collection" className={`${styles.allServicesSection} ${isExpanded ? styles.expandedMode : ''}`} aria-label="All premium services">
                    <div className={styles.servicesHeader}>
                        <div className={styles.headerTitleRow}>
                            <h1>
                                All <span className={styles.desktopOnly}><span>Premium</span> </span>
                                <span className={styles.goldTextMobileOnly}>Services</span>
                            </h1>

                            <div className={styles.mobileControls}>
                                <button 
                                    type="button" 
                                    className={styles.mobileSearchButton}
                                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                                >
                                    <Search size={14} />
                                    <span>Search</span>
                                </button>
                                
                                <div className={styles.mobileSortWrapper}>
                                    <select aria-label="Sort services" className={styles.mobileSortSelect}>
                                        <option>Sort</option>
                                        <option>Sort A-Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <p className={styles.headerSubtitle}>
                            100+ trusted services. One platform.<br className={styles.desktopOnly} />Instant access. Premium experience.
                        </p>

                        {/* Mobile search input field */}
                        {isSearchExpanded && (
                            <div className={styles.mobileSearchOverlay}>
                                <div className={styles.searchFieldMobile}>
                                    <Search size={18} />
                                    <input 
                                        value={searchQuery} 
                                        onChange={(event) => setSearchQuery(event.target.value)} 
                                        placeholder="Search services..." 
                                        autoFocus
                                    />
                                    <button type="button" onClick={() => { setSearchQuery(''); setIsSearchExpanded(false); }}>
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ✨ Intelligent Fuzzy Autocorrect Spelling Warning Banner */}
                        {correctedQuery && originalQuery === searchQuery && (
                            <div className={styles.autocorrectBanner}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Sparkles size={14} className={styles.sparkleIcon} />
                                    <span>
                                        Showing results for <strong style={{ color: 'var(--gold-dark)' }}>{correctedQuery}</strong>{" "}
                                        <span style={{ fontSize: '0.74rem', opacity: 0.85 }}>(corrected from &quot;{originalQuery}&quot;)</span>
                                    </span>
                                </div>
                                <button 
                                    type="button" 
                                    className={styles.undoBtn}
                                    onClick={() => {
                                        setSearchQuery(originalQuery);
                                        setCorrectedQuery(null);
                                    }}
                                >
                                    Undo
                                </button>
                            </div>
                        )}

                        {/* Desktop controls, hidden on mobile */}
                        <div className={styles.servicesControls}>
                            <div className={styles.searchField}>
                                <Search size={19} />
                                <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search services..." aria-label="Search services" />
                                {searchQuery && (
                                    <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                        <X size={17} />
                                    </button>
                                )}
                            </div>
                            <select aria-label="Sort services">
                                <option>Sort by Popularity</option>
                                <option>Sort A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* 🔥 Mobile only section title */}
                    <div className={styles.popularHeader}>
                        <span>🔥 Most Popular</span>
                        <span className={styles.viewAll}>View All →</span>
                    </div>

                    {loading ? (
                        <div className={styles.logoTileGrid}>
                            {Array.from({ length: 14 }).map((_, index) => <div key={index} className={styles.skeletonTile} />)}
                        </div>
                    ) : displayedServices.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Search size={48} />
                            <h3>No services found</h3>
                            <p>Try another product or category name.</p>
                        </div>
                    ) : (
                        <>
                            {topServices.length > 0 && (
                                <div className={styles.logoTileGrid}>
                                    {topServices.map((service, index) => (
                                        <ServiceTile 
                                            key={service.id} 
                                            service={service} 
                                            index={index} 
                                        />
                                    ))}
                                </div>
                            )}

                            {(darkServices.length > 0 || lightServices.length > 0) && (
                                <div className={styles.splitServices}>
                                    <div className={styles.splitBackground}>
                                        <div className={styles.darkBg} />
                                        <div className={styles.lightBg} />
                                        <div className={styles.dividerLine}>
                                            <div className={styles.dividerCircle}>{isExpanded ? '⇆' : '⇅'}</div>
                                        </div>
                                    </div>

                                    {!isMobile && displayedServices.length > 16 && (
                                        <div className={styles.showMoreButton}>
                                            <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
                                                {isExpanded ? 'Show Less' : 'Show More'}
                                                <ChevronRight 
                                                    size={16} 
                                                    style={{ 
                                                        transform: isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)',
                                                        transition: 'transform 0.22s ease'
                                                    }} 
                                                />
                                            </button>
                                        </div>
                                    )}
                                    {darkServices.length > 0 && (
                                        <div className={styles.darkPanel}>
                                            {darkServices.map((service, index) => (
                                                <ServiceTile key={service.id} service={service} dark index={index} />
                                            ))}
                                        </div>
                                    )}
                                    {lightServices.length > 0 && (
                                        <div className={styles.lightPanel}>
                                            {lightServices.map((service, index) => (
                                                <ServiceTile key={service.id} service={service} index={index} />
                                            ))}
                                        </div>
                                    )}

                                    <div className={styles.trustStrip} aria-label="StreamKart benefits">
                                        {trustItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <div className={styles.trustItem} key={item.title}>
                                                    <Icon size={31} strokeWidth={1.25} />
                                                    <div>
                                                        <strong>{item.title}</strong>
                                                        <span>{item.text}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

