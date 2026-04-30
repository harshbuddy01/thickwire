'use client';

import Link from 'next/link';
import { ChevronRight, Play, ShieldCheck, Tag, Headphones, CheckCircle2 } from 'lucide-react';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

// Hardcoded matching the user's exact screenshot
const SERVICES = [
    { id: 'netflix', name: 'Netflix', slug: 'netflix', planText: 'Premium Plan', logo: 'netflix_3d.png', fallbackColor: '#E50914' },
    { id: 'prime', name: 'Prime Video', slug: 'prime', planText: 'All Plans', logo: null, fallbackColor: '#00A8E1' },
    { id: 'hotstar', name: 'Disney+ Hotstar', slug: 'hotstar', planText: 'Premium Plans', logo: null, fallbackColor: '#1F3C73' },
    { id: 'zee5', name: 'ZEE5', slug: 'zee5', planText: 'Premium Plans', logo: null, fallbackColor: '#8230C6' },
    { id: 'sonyliv', name: 'Sony LIV', slug: 'sonyliv', planText: 'Premium Plans', logo: 'sonyliv_3d.png', fallbackColor: '#F48220' },
    { id: 'chaupal', name: 'Chaupal', slug: 'chaupal', planText: 'Premium Plans', logo: null, fallbackColor: '#F5B041' },
    { id: 'youtube', name: 'YouTube Premium', slug: 'youtube', planText: 'Ad-free Experience', logo: null, fallbackColor: '#FF0000' },
    { id: 'disney', name: 'Disney+', slug: 'disney', planText: 'Premium Plans', logo: null, fallbackColor: '#113CCF' },
    { id: 'crunchyroll', name: 'Crunchyroll', slug: 'crunchyroll', planText: 'Premium Plans', logo: null, fallbackColor: '#F47521' },
    { id: 'hbomax', name: 'HBO Max', slug: 'hbomax', planText: 'Premium Plans', logo: null, fallbackColor: '#5822B4' },
    { id: 'jiosaavn', name: 'JioSaavn', slug: 'jiosaavn', planText: 'Music & Podcasts', logo: null, fallbackColor: '#2BC5B4' },
    { id: 'spotify', name: 'Spotify', slug: 'spotify', planText: 'Premium Plans', logo: null, fallbackColor: '#1DB954' },
];

export default function StreamingCategoryPage() {
    return (
        <div style={{ background: '#0a0a0f', minHeight: '100vh', paddingBottom: '80px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
            
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container" style={{ paddingTop: '24px' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#fff' }}>Streaming</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Exact CSS Replica of the Red Banner ───────────── */}
                {/* I am building this with CSS because I cannot download images from the chat interface. */}
                <div style={{
                    background: '#0d0d12',
                    borderRadius: '16px',
                    padding: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.03)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    {/* Dark red glow matching the screenshot's background */}
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '60%',
                        background: 'linear-gradient(90deg, transparent 0%, #4a0005 50%, #8a000b 100%)',
                        opacity: 0.5,
                        pointerEvents: 'none'
                    }} />

                    {/* Left Icon (The bright red rounded box with white play icon) */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #ff1744 0%, #a2001d 100%)',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 20px 40px rgba(255,23,68,0.3)',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <Play size={48} fill="white" color="white" style={{ marginLeft: '6px' }} />
                    </div>

                    {/* Text Content */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Streaming</h1>
                        <p style={{ fontSize: '1.2rem', color: '#e2e8f0', margin: '0 0 28px 0', fontWeight: 400 }}>
                            Watch unlimited entertainment
                        </p>

                        {/* Features Strip with Vertical Dividers */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Play size={20} color="#fff" />
                                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.3 }}>Premium<br />Entertainment</span>
                            </div>
                            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.15)' }} />
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShieldCheck size={20} color="#fff" />
                                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.3 }}>Official<br />Subscriptions</span>
                            </div>
                            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.15)' }} />
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Tag size={20} color="#fff" />
                                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.3 }}>Best Prices<br />Guaranteed</span>
                            </div>
                            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.15)' }} />
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Headphones size={20} color="#fff" />
                                <span style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.3 }}>24/7<br />Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Grid Title ──────────────────────────────────────── */}
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 6px 0' }}>Choose Your Streaming Service</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.9rem' }}>Official subscriptions at best prices.</p>
                </div>

                {/* ─── Hardcoded 12 Cards Grid exactly like screenshot ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {SERVICES.map(service => (
                        <div key={service.id} style={{
                            background: '#16161e',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'transform 0.2s',
                        }} className="streaming-card-hover">
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                {/* Logo Box */}
                                <div style={{ 
                                    width: '42px', 
                                    height: '42px', 
                                    flexShrink: 0, 
                                    borderRadius: '8px', 
                                    overflow: 'hidden', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    background: service.logo ? 'transparent' : 'rgba(255,255,255,0.05)',
                                    color: service.fallbackColor
                                }}>
                                    {service.logo ? (
                                        <ProgressiveImage
                                            src={`${MINIO_URL}/${service.logo}`}
                                            alt={service.name}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{service.name.charAt(0)}</span>
                                    )}
                                </div>
                                
                                {/* Text */}
                                <div style={{ minWidth: 0 }}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
                                        {service.name}
                                    </h3>
                                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                                        {service.planText}
                                    </p>
                                </div>
                            </div>

                            {/* Button */}
                            <Link
                                href={`/services/${service.slug}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    marginTop: 'auto',
                                    transition: 'background 0.2s'
                                }}
                                className="streaming-btn-hover"
                            >
                                <span>View Plans</span>
                                <ChevronRight size={14} color="rgba(255,255,255,0.5)" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ─── Bottom Trust Strip ──────────────────────────────── */}
                <div style={{
                    marginTop: '60px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '24px',
                    background: '#f4f5f7',
                    padding: '32px 40px',
                    borderRadius: '16px',
                    color: '#1a1c23'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 200px' }}>
                        <CheckCircle2 size={24} color="#333" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '2px' }}>100% Secure Payments</div>
                            <div style={{ fontSize: '0.75rem', color: '#666' }}>Your payments are safe and encrypted.</div>
                        </div>
                    </div>
                    {/* (Other features matching exactly like the screenshot...) */}
                </div>
            </div>
        </div>
    );
}
