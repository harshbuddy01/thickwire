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
            'chatgpt': 'chatgpt_3d.png',
            'sonyliv': 'sonyliv_3d.png',
            'jiohotstar': 'jiohotstar_3d.png',
        };
        return mapping[slug] || null; // Return null if not explicitly in MinIO
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
                    borderRadius: '24px',
                    overflow: 'hidden',
                    marginBottom: '48px',
                    aspectRatio: '1000 / 300', // Wide banner ratio
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    position: 'relative'
                }}>
                    <ProgressiveImage src={`${MINIO_URL}/slider/slider1.png`} alt="Streaming Banner" />
                </div>

                {/* ─── Grid Title ──────────────────────────────────────── */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Choose Your Streaming Service</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.95rem' }}>Official subscriptions at best prices.</p>
                </div>

                {/* ─── Services Grid ───────────────────────────────────── */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} style={{ background: '#13131a', borderRadius: '16px', height: '140px', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, #13131a 25%, #1a1a24 50%, #13131a 75%)' }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {services.map(service => {
                            const logoFile = getLogoForSlug(service.slug);
                            return (
                            <div key={service.id} style={{
                                background: '#16161e',
                                borderRadius: '16px',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(255,255,255,0.03)',
                                transition: 'transform 0.2s, background 0.2s',
                                cursor: 'pointer'
                            }}
                                className="streaming-card-hover"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {logoFile ? (
                                            <ProgressiveImage
                                                src={`${MINIO_URL}/${logoFile}`}
                                                alt={service.name}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{service.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service.name}</h3>
                                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {service.plans.length > 0 ? (service.plans[0].name.includes('Premium') ? 'Premium Plan' : 'All Plans') : 'Premium'}
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
                        );
                        })}
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
