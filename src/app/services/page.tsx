'use client';

import { useState, useEffect, useMemo } from 'react';
import { getServices } from '@/lib/api';
import Link from 'next/link';
import { ChevronRight, Search, Zap, ShieldCheck, Sparkles, ArrowRight, Star, X } from 'lucide-react';

const MINIO_BASE = 'https://assets.streamkart.store/streamkart-assets';
const ACCENT = '#b87a1d';

// Fallback Data
const FALLBACK_SERVICES = [
    { id: '1', name: 'Netflix', slug: 'netflix', description: 'Watch Netflix in 4K UHD with official premium access.' },
    { id: '2', name: 'Spotify', slug: 'spotify', description: 'Stream your favorite music without any ads.' },
    { id: '3', name: 'YouTube', slug: 'youtube', description: 'Premium ad-free experience with background play.' },
    { id: '4', name: 'ChatGPT', slug: 'chatgpt', description: 'Unlock the power of GPT-4 and advanced AI tools.' },
    { id: '5', name: 'Disney+', slug: 'disney', description: 'Stream the latest movies and series from Disney.' },
    { id: '6', name: 'Amazon Prime', slug: 'prime', description: 'Amazon Prime membership with video and faster delivery.' },
    { id: '7', name: 'SonyLIV', slug: 'sonyliv', description: 'Official premium access to SonyLIV originals and sports.' },
    { id: '8', name: 'Zee5', slug: 'zee5', description: 'Latest Bollywood movies and regional content.' },
];

const LOGO_MAP: Record<string, string> = {
    'netflix': `${MINIO_BASE}/logos/netflix.svg`,
    'spotify': `${MINIO_BASE}/logos/spotify.png`,
    'chatgpt': `${MINIO_BASE}/chatgpt_3d.png`,
    'youtube': `${MINIO_BASE}/logos/youtube.png`,
    'disney': `${MINIO_BASE}/logos/disney.jpg`,
    'prime': `${MINIO_BASE}/logos/prime.svg`,
    'sonyliv': `${MINIO_BASE}/logos/sonyliv.png`,
    'zee5': `${MINIO_BASE}/logos/zee5.png`,
    'jiohotstar': `${MINIO_BASE}/jiohotstar_3d.png`
};

export default function ServicesDirectoryPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getServices().then(data => {
            if (data && data.length > 0) setServices(data);
            else setServices(FALLBACK_SERVICES);
        }).catch(() => setServices(FALLBACK_SERVICES))
        .finally(() => setLoading(false));
    }, []);

    const filteredServices = useMemo(() => {
        return services.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [services, searchQuery]);

    return (
        <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: '120px', fontFamily: "'Outfit', sans-serif", color: '#1a1c23' }}>
            <div className="container">
                {/* Breadcrumb */}
                <nav style={{ padding: '32px 0 10px 0', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: ACCENT }}>All Services</span>
                </nav>

                {/* Page Header & Search */}
                <div style={{ marginBottom: '60px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-0.04em', color: '#1a1c23' }}>
                            Our Premium <span style={{ color: ACCENT }}>Services</span>
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0, maxWidth: '600px' }}>
                            Explore the world&apos;s best digital tools and streaming platforms.
                        </p>
                    </div>

                    {/* Integrated Search Bar */}
                    <div style={{ position: 'relative', maxWidth: '600px' }}>
                        <div style={{
                            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                            color: '#94a3b8'
                        }}>
                            <Search size={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for Netflix, Spotify, ChatGPT..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', padding: '18px 24px 18px 56px', borderRadius: '18px',
                                border: '1px solid #e2e8f0', background: '#fff', fontSize: '1rem',
                                outline: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                transition: 'all 0.2s', fontFamily: 'inherit'
                            }}
                            className="search-input-focus"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} style={{ height: '320px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }} className="skeleton-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {filteredServices.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#64748b' }}>
                                <div style={{ marginBottom: '20px', opacity: 0.2 }}><Search size={64} /></div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23' }}>No services found</h3>
                                <p>Try searching for something else.</p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '32px',
                            }}>
                                {filteredServices.map((service) => {
                                    const slug = (service.slug || '').toLowerCase();
                                    const logoUrl = LOGO_MAP[slug] || service.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.name)}&background=1a1c23&color=fff&bold=true&size=128&font-size=0.4`;
                                    
                                    return (
                                        <Link 
                                            key={service.id} 
                                            href={`/services/${service.slug}`}
                                            className="service-card-new"
                                            style={{
                                                textDecoration: 'none',
                                                background: '#fff',
                                                borderRadius: '24px',
                                                padding: '32px',
                                                border: '1px solid #f1f5f9',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                                minHeight: '340px'
                                            }}
                                        >
                                            <div style={{
                                                width: '64px', height: '64px', borderRadius: '18px',
                                                background: '#fff', padding: '12px', marginBottom: '24px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9'
                                            }}>
                                                <img src={logoUrl} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px' }}>
                                                    <Zap size={12} fill="#16a34a" /> INSTANT DELIVERY
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1c23', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
                                                    {service.name}
                                                </h3>
                                                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: 1.6, flex: 1, marginBottom: '24px' }}>
                                                    {service.description || 'Access premium features with our official verified accounts.'}
                                                </p>
                                            </div>

                                            <div style={{ 
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                paddingTop: '20px', borderTop: '1px solid #f8fafc'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb800' }}>
                                                    <Star size={14} fill="#ffb800" />
                                                    <Star size={14} fill="#ffb800" />
                                                    <Star size={14} fill="#ffb800" />
                                                    <Star size={14} fill="#ffb800" />
                                                    <Star size={14} fill="#ffb800" />
                                                </div>
                                                <div style={{ color: ACCENT, fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    View Plans <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            <style jsx>{`
                .service-card-new:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(184, 122, 29, 0.08) !important;
                    border-color: ${ACCENT}44 !important;
                }
                .search-input-focus:focus {
                    border-color: ${ACCENT} !important;
                    box-shadow: 0 8px 30px rgba(184, 122, 29, 0.1) !important;
                }
                .skeleton-pulse {
                    animation: pulse 1.5s infinite ease-in-out;
                    background: linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%);
                    background-size: 200% 100%;
                }
                @keyframes pulse {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
