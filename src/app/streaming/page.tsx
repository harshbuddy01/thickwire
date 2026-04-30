'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, ShieldCheck, Tag, Zap, Headphones } from 'lucide-react';
import ProgressiveImage from '@/components/ProgressiveImage';
import { getServices } from '@/lib/api';
import type { Service } from '@/lib/types';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

export default function StreamingCategoryPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getServices()
            .then((data) => setServices(data))
            .catch((err) => console.error('Failed to load services:', err))
            .finally(() => setLoading(false));
    }, []);

    // Helper to get right image for each service based on slug
    const getLogoForSlug = (slug: string) => {
        const mapping: Record<string, string> = {
            'netflix': 'netflix_3d.png',
            'prime-video': 'prime_3d.png',
            'prime': 'prime_3d.png',
            'chatgpt': 'chatgpt_3d.png',
            'sonyliv': 'sonyliv_3d.png',
            'jiohotstar': 'jiohotstar_3d.png',
            'zee5': 'zee5_3d.png',
        };
        return mapping[slug] || `${slug}_3d.png`;
    };

    return (
        <div className="streaming-category-page" style={{ background: '#0a0a0f', minHeight: '100vh', paddingBottom: '80px', color: '#fff' }}>
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container" style={{ paddingTop: '20px' }}>
                <nav className="breadcrumb-nav" style={{ marginBottom: '24px' }}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className="current">Streaming</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Top Banner ────────────────────────────────────── */}
                <div style={{
                    background: 'linear-gradient(90deg, #110e14 0%, #2a080c 50%, #520006 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {/* Background abstract lines overlay (optional simulation) */}
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', background: 'radial-gradient(circle at right, rgba(255,0,0,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {/* Red Icon Box */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #ff0f47 0%, #a2001d 100%)',
                        borderRadius: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 20px 40px rgba(255,0,0,0.2)',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <Play size={48} fill="white" color="white" />
                    </div>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-1px' }}>Streaming</h1>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 24px 0', maxWidth: '400px', lineHeight: 1.4 }}>
                            Watch unlimited entertainment
                        </p>

                        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Play size={14} color="#fff" />
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>Premium<br />Entertainment</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShieldCheck size={14} color="#fff" />
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>Official<br />Subscriptions</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Tag size={14} color="#fff" />
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>Best Prices<br />Guaranteed</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Headphones size={14} color="#fff" />
                                </div>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>24/7<br />Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Grid Title ──────────────────────────────────────── */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Choose Your Streaming Service</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.95rem' }}>Official subscriptions at best prices.</p>
                </div>

                {/* ─── Services Grid ───────────────────────────────────── */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} style={{ background: '#13131a', borderRadius: '20px', height: '140px', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, #13131a 25%, #1a1a24 50%, #13131a 75%)' }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {services.map(service => (
                            <div key={service.id} style={{
                                background: '#16161e',
                                borderRadius: '20px',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(255,255,255,0.03)',
                                transition: 'transform 0.2s, background 0.2s',
                                cursor: 'pointer'
                            }}
                                className="streaming-card-hover"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ width: '48px', height: '48px', position: 'relative' }}>
                                        <ProgressiveImage
                                            src={`${MINIO_URL}/${getLogoForSlug(service.slug)}`}
                                            alt={service.name}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0' }}>{service.name}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                                            {service.plans.length > 0 ? (service.plans[0].name.includes('Premium') ? 'Premium Plan' : 'All Plans') : 'Premium Subscription'}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/services/${service.slug}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        marginTop: 'auto',
                                        transition: 'background 0.2s'
                                    }}
                                    className="streaming-btn-hover"
                                >
                                    View Plans <ChevronRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* ─── Trust Elements ─────────────────────────────────── */}
                <div style={{
                    marginTop: '60px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '24px',
                    background: '#eef2f6',
                    padding: '32px 40px',
                    borderRadius: '24px',
                    color: '#1a1c23'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 200px' }}>
                        <ShieldCheck size={28} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>100% Secure Payments</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Your payments are safe and encrypted.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 200px' }}>
                        <Zap size={28} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>Instant Delivery</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>Get access instantly after purchase.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 200px' }}>
                        <Tag size={28} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>Best Price Guarantee</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>We offer the best prices in the market.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 200px' }}>
                        <Headphones size={28} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>24/7 Customer Support</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>We're here to help you anytime.</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
