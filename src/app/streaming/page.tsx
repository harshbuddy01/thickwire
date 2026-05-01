'use client';

import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, BadgePercent, Headphones } from 'lucide-react';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

const SERVICES = [
    { id: 'netflix',     name: 'Netflix',           slug: 'netflix',     plan: 'Premium Plan',       logo: 'logos/netflix.svg',     bg: '#141414' },
    { id: 'prime',       name: 'Prime Video',        slug: 'prime',       plan: 'All Plans',          logo: 'logos/prime.svg',       bg: '#0F2535' },
    { id: 'hotstar',     name: 'Disney+ Hotstar',    slug: 'hotstar',     plan: 'Premium Plans',      logo: 'logos/hotstar.svg',     bg: '#0E1A3C' },
    { id: 'zee5',        name: 'ZEE5',               slug: 'zee5',        plan: 'Premium Plans',      logo: 'logos/zee5.jpg',        bg: '#1A0A2E' },
    { id: 'sonyliv',     name: 'Sony LIV',           slug: 'sonyliv',     plan: 'Premium Plans',      logo: 'logos/sonyliv.jpg',     bg: '#1A1A1A' },
    { id: 'chaupal',     name: 'Chaupal',            slug: 'chaupal',     plan: 'Premium Plans',      logo: 'logos/chaupal.svg',     bg: '#120E00' },
    { id: 'youtube',     name: 'YouTube Premium',    slug: 'youtube',     plan: 'Ad-free Experience', logo: 'logos/youtube.png',     bg: '#1A0000' },
    { id: 'disney',      name: 'Disney+',            slug: 'disney',      plan: 'Premium Plans',      logo: 'logos/disney.jpg',      bg: '#040D2E' },
    { id: 'crunchyroll', name: 'Crunchyroll',        slug: 'crunchyroll', plan: 'Premium Plans',      logo: 'logos/crunchyroll.png', bg: '#1A0D00' },
    { id: 'hbomax',      name: 'HBO Max',            slug: 'hbomax',      plan: 'Premium Plans',      logo: 'logos/hbomax.jpg',      bg: '#0F0520' },
    { id: 'jiosaavn',    name: 'JioSaavn',           slug: 'jiosaavn',    plan: 'Music & Podcasts',   logo: 'logos/jiosaavn.png',    bg: '#001A19' },
    { id: 'spotify',     name: 'Spotify',            slug: 'spotify',     plan: 'Premium Plans',      logo: 'logos/spotify.png',     bg: '#001A0A' },
];

export default function StreamingCategoryPage() {
    return (
        <div style={{ background: '#0a0a0f', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Outfit', sans-serif" }}>

            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '20px', color: '#fff' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#fff', fontWeight: 500 }}>Streaming</span>
                </nav>
            </div>

            <div className="container">

                {/* Banner */}
                <div style={{ 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    marginBottom: '32px', 
                    width: '100%', 
                    aspectRatio: '1440 / 360', 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <img
                        src={`${MINIO}/slider/file_00000000b220720cb2fb31789491ad9f.png`}
                        alt="Streaming"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                </div>

                {/* Light Wrapper */}
                <div className="streaming-white-wrapper" style={{ 
                    background: '#ffffff', 
                    borderRadius: '32px', 
                    padding: '48px', 
                    border: '1px solid #e9ecef',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.02)'
                }}>

                    {/* Section heading */}
                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1c23', margin: '0 0 8px 0', letterSpacing: '-0.03em' }}>
                            Choose Your Streaming Service
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#6c757d', margin: 0, fontWeight: 500 }}>
                            Official subscriptions at the best prices.
                        </p>
                    </div>

                    {/* 6-column Grid */}
                    <div className="streaming-services-grid" style={{ 
                        gap: '20px', 
                        marginBottom: '40px' 
                    }}>
                        {SERVICES.map(s => (
                            <div key={s.id} style={{
                                background: s.bg,
                                borderRadius: '24px',
                                padding: '24px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }} className="streaming-card-hover">

                                {/* Logo Area */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={`${MINIO}/${s.logo}`}
                                            alt={s.name}
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'contain', 
                                                display: 'block',
                                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
                                            }}
                                            onError={(e) => {
                                                // Fallback if image fails
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `<span style="font-size: 28px; font-weight: 800; color: #fff">${s.name.charAt(0)}</span>`;
                                            }}
                                        />
                                    </div>

                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{
                                            fontSize: '1rem',
                                            fontWeight: 800,
                                            color: '#ffffff',
                                            lineHeight: 1.2,
                                            marginBottom: '2px'
                                        }}>
                                            {s.name}
                                        </div>
                                        <div style={{ 
                                            fontSize: '0.75rem', 
                                            color: 'rgba(255,255,255,0.5)', 
                                            fontWeight: 500 
                                        }}>
                                            {s.plan}
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <Link href={`/services/${s.slug}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '12px',
                                    borderRadius: '14px',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    marginTop: 'auto',
                                    transition: 'all 0.2s ease',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }} className="streaming-btn-hover">
                                    <span>View Plans</span>
                                    <ChevronRight size={16} strokeWidth={3} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Features Strip */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#f8f9fa',
                        borderRadius: '24px',
                        padding: '32px 48px',
                        border: '1px solid #e9ecef',
                        gap: '24px',
                        flexWrap: 'wrap'
                    }}>
                        {[
                            { Icon: ShieldCheck, title: 'Secure', sub: 'Encrypted.' },
                            { Icon: Truck, title: 'Instant', sub: 'Delivery.' },
                            { Icon: BadgePercent, title: 'Official', sub: 'Genuine.' },
                            { Icon: BadgePercent, title: 'Best Price', sub: 'Guaranteed.' },
                            { Icon: Headphones, title: 'Support', sub: '24/7 Care.' },
                        ].map(({ Icon, title, sub }, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 0', minWidth: '150px' }}>
                                <div style={{ color: '#1a1c23' }}>
                                    <Icon size={28} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#1a1c23', fontSize: '0.95rem' }}>{title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d', fontWeight: 500 }}>{sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <style jsx global>{`
                .streaming-card-hover:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    border-color: rgba(255,255,255,0.2);
                }
                .streaming-btn-hover:hover {
                    background: rgba(255,255,255,0.2);
                }
                .streaming-services-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                }
                @media (max-width: 1400px) {
                    .streaming-services-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                @media (max-width: 1024px) {
                    .streaming-services-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .streaming-services-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 480px) {
                    .streaming-services-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
