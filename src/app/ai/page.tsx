'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShieldCheck, Truck, BadgePercent, Headphones } from 'lucide-react';

const MINIO = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';
const BANNER_IMG = `${MINIO}/slider/ChatGPT%20Image%20May%201,%202026,%2005_42_45%20AM.png`;

const AI_SERVICES = [
    { id: 'chatgpt', name: 'ChatGPT Plus', slug: 'chatgpt', plan: 'AI Assistant Premium', logo: 'logos/chatgpt.png', bg: '#0B3026' },
    { id: 'gemini', name: 'Gemini Advanced', slug: 'gemini', plan: "Google's Powerful AI", logo: 'logos/gemini.png', bg: '#101E36' },
    { id: 'claude', name: 'Claude Pro', slug: 'claude', plan: 'Advanced AI Assistant', logo: 'logos/claude.png', bg: '#291711' },
    { id: 'perplexity', name: 'Perplexity Pro', slug: 'perplexity', plan: 'Smart Search Engine', logo: 'logos/perplexity.png', bg: '#1A1A1A' },
    { id: 'midjourney', name: 'Midjourney', slug: 'midjourney', plan: 'AI Image Generation', logo: 'logos/midjourney.png', bg: '#1A1D24' },
    { id: 'copilot', name: 'Microsoft Copilot', slug: 'copilot', plan: 'AI Coding & Office', logo: 'logos/copilot.png', bg: '#0A234A' },
    { id: 'notion', name: 'Notion AI', slug: 'notion', plan: 'Workspace AI', logo: 'logos/notion.png', bg: '#1E1E1E' },
    { id: 'elevenlabs', name: 'ElevenLabs', slug: 'elevenlabs', plan: 'AI Voice Generation', logo: 'logos/elevenlabs.png', bg: '#121212' },
];

export default function AICategoryPage() {
    return (
        <div style={{ background: '#0a0a0f', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Outfit', sans-serif" }}>

            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '20px', color: '#fff' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#fff', fontWeight: 500 }}>Artificial Intelligence</span>
                </nav>
            </div>

            <div className="container">

                {/* Banner */}
                <div className="category-banner-container">
                    <Image
                        src={BANNER_IMG}
                        alt="AI Tools"
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
                            Pro AI Subscriptions
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#6c757d', margin: 0, fontWeight: 500 }}>
                            Unlock the power of artificial intelligence today.
                        </p>
                    </div>

                    {/* 6-column Grid */}
                    <div className="streaming-services-grid" style={{ 
                        gap: '20px', 
                        marginBottom: '40px' 
                    }}>
                        {AI_SERVICES.map(s => (
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
                    grid-template-columns: repeat(4, 1fr);
                }
                @media (max-width: 1200px) {
                    .streaming-services-grid {
                        grid-template-columns: repeat(3, 1fr);
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
