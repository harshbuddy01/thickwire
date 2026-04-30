'use client';

import Link from 'next/link';
import { ChevronRight, Play, ShieldCheck, Tag, Headphones, CheckCircle2 } from 'lucide-react';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

// Hardcoded matching the user's exact screenshot
const SERVICES = [
    { id: 'netflix', name: 'Netflix', slug: 'netflix', planText: 'Premium Plan', logo: 'logos/netflix.svg', fallbackColor: '#E50914' },
    { id: 'prime', name: 'Prime Video', slug: 'prime', planText: 'All Plans', logo: 'logos/prime.svg', fallbackColor: '#00A8E1' },
    { id: 'hotstar', name: 'Disney+ Hotstar', slug: 'hotstar', planText: 'Premium Plans', logo: 'logos/hotstar.svg', fallbackColor: '#1F3C73' },
    { id: 'zee5', name: 'ZEE5', slug: 'zee5', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Zee5_Official_logo.svg', fallbackColor: '#8230C6' },
    { id: 'sonyliv', name: 'Sony LIV', slug: 'sonyliv', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Sony_LIV_logo.svg', fallbackColor: '#F48220' },
    { id: 'chaupal', name: 'Chaupal', slug: 'chaupal', planText: 'Premium Plans', logo: null, fallbackColor: '#F5B041' },
    { id: 'youtube', name: 'YouTube Premium', slug: 'youtube', planText: 'Ad-free Experience', logo: 'logos/youtube.svg', fallbackColor: '#FF0000' },
    { id: 'disney', name: 'Disney+', slug: 'disney', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg', fallbackColor: '#113CCF' },
    { id: 'crunchyroll', name: 'Crunchyroll', slug: 'crunchyroll', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png', fallbackColor: '#F47521' },
    { id: 'hbomax', name: 'HBO Max', slug: 'hbomax', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg', fallbackColor: '#5822B4' },
    { id: 'jiosaavn', name: 'JioSaavn', slug: 'jiosaavn', planText: 'Music & Podcasts', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Jiosaavn-logo-300x300.png', fallbackColor: '#2BC5B4' },
    { id: 'spotify', name: 'Spotify', slug: 'spotify', planText: 'Premium Plans', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg', fallbackColor: '#1DB954' },
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
                {/* ─── Top Banner ────────────────────────────────────── */}
                <div style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    marginBottom: '48px',
                    aspectRatio: '1440 / 320', // Wide banner ratio exactly matching the uploaded image
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    position: 'relative'
                }}>
                    <ProgressiveImage src={`${MINIO_URL}/slider/streaming-banner.png`} alt="Streaming Banner" />
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
                                            src={service.logo.startsWith('http') ? service.logo : `${MINIO_URL}/${service.logo}`}
                                            alt={service.name}
                                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
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
