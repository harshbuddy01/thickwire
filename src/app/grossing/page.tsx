'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, Truck, BadgePercent, Headphones } from 'lucide-react';

const MINIO = 'https://assets.streamkart.store/streamkart-assets';
const BANNER_IMG = `${MINIO}/slider/WhatsApp%20Image%202026-05-06%20at%2008.50.27.jpeg`;

const GROSSING_SERVICES = [
    { id: 'capcut', name: 'CapCut Pro', slug: 'capcut', plan: 'Video Editing Premium', logo: 'logos/capcut.png', bg: '#000000' },
    { id: 'canva', name: 'Canva Pro', slug: 'canva', plan: 'Graphic Design Premium', logo: 'logos/canva.png', bg: '#003B46' },
    { id: 'duolingo', name: 'Duolingo Super', slug: 'duolingo', plan: 'Language Learning Premium', logo: 'logos/duolingo.png', bg: '#1E3A08' },
    { id: 'edx', name: 'edX Subscription', slug: 'edx', plan: 'Learning Platform Premium', logo: 'logos/edx.png', bg: '#00262B' },
    { id: 'chatgpt', name: 'ChatGPT Plus', slug: 'chatgpt', plan: 'AI Assistant Premium', logo: 'logos/chatgpt.png', bg: '#0B3026' },
    { id: 'perplexity', name: 'Perplexity AI', slug: 'perplexity', plan: 'AI Search Premium', logo: 'logos/perplexity.png', bg: '#1A1A1A' },
    { id: 'tradingview', name: 'TradingView', slug: 'tradingview', plan: 'Pro Trading Tools', logo: 'logos/tradingview.png', bg: '#131722' },
    { id: 'adobe', name: 'Adobe Suite', slug: 'adobe', plan: 'Creative Professional Suite', logo: 'logos/adobe.png', bg: '#330000' },
    { id: 'linkedin', name: 'LinkedIn Prem.', slug: 'linkedin', plan: 'Career & Business Advanced', logo: 'logos/linkedin.png', bg: '#03244D' },
    { id: 'windows', name: 'Windows Pro', slug: 'windows', plan: 'Official OS Activation', logo: 'logos/windows.png', bg: '#00204A' },
    { id: 'office', name: 'Office 365', slug: 'office', plan: 'Productivity Suite License', logo: 'logos/office.png', bg: '#3B1000' },
    { id: 'gcp', name: 'Google Cloud', slug: 'gcp', plan: 'Enterprise Cloud & AI Tools', logo: 'logos/gcp.png', bg: '#0A234A' },
];

export default function GrossingCategoryPage() {
    return (
        <div style={{ background: '#0a0a0f', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Outfit', sans-serif" }}>

            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '20px', color: '#fff' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#fff', fontWeight: 500 }}>Grossing</span>
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
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: '#1a1c23'
                }}>
                    <Image
                        src={BANNER_IMG}
                        alt="Top Grossing"
                        width={1440}
                        height={360}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        priority
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
                            Trending Digital Services
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#6c757d', margin: 0, fontWeight: 500 }}>
                            Discover our best-selling premium subscriptions.
                        </p>
                    </div>

                    {/* 6-column Grid */}
                    <div className="streaming-services-grid" style={{ 
                        gap: '20px', 
                        marginBottom: '40px' 
                    }}>
                        {GROSSING_SERVICES.map(s => (
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
                                        justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '8px'
                                    }}>
                                        <Image
                                            src={`${MINIO}/${s.logo}`}
                                            alt={s.name}
                                            width={80}
                                            height={80}
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'contain', 
                                                display: 'block',
                                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
                                            }}
                                            onError={(e) => {
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
