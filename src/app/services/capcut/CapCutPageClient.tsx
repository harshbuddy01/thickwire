'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, ShieldCheck, Zap, Headphones, Scissors, Sparkles, Film, Palette } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function CapCutPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

    const formatDuration = (days: number) => {
        if (days >= 365) {
            const years = Math.floor(days / 365);
            return `${days} Days (${years} Year${years > 1 ? 's' : ''})`;
        }
        if (days >= 30) {
            const months = Math.floor(days / 30);
            return `${days} Days (${months} Month${months > 1 ? 's' : ''})`;
        }
        return `${days} Days`;
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #090b11 0%, #0f131c 50%, #090b11 100%)',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '-10%',
                width: '45vw',
                height: '45vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 245, 255, 0.06) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                top: '35%',
                right: '-10%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                
                {/* Breadcrumbs */}
                <nav style={{ padding: '24px 0', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Services</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ fontWeight: 700, color: '#00f5ff' }}>CapCut Pro</span>
                </nav>

                {/* Hero Banner Image */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: '#040608'
                }}>
                    <img 
                        src={service.bannerUrl || `${MINIO_URL}/slider/IMG_0116.PNG`} 
                        alt="CapCut Pro Banner" 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Plans Heading */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.03em' }}>
                        Supercharge Your <span style={{ background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Video Editing</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0 auto', fontWeight: 500 }}>
                        Get CapCut Pro premium access. Unlock exclusive AI tools, advanced effects, templates, and watermark-free 4K exports.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="capcut-plans-grid-custom" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px',
                    marginBottom: '64px'
                }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 768px) {
                            .capcut-plans-grid-custom {
                                display: flex !important;
                                flex-direction: column !important;
                                gap: 20px !important;
                            }
                            .capcut-plans-grid-custom > div {
                                width: 100% !important;
                                max-width: 100% !important;
                                transform: none !important;
                            }
                        }
                    ` }} />

                    {service.plans.map((plan, index) => {
                        const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;
                        const isHovered = hoveredCard === plan.id;

                        return (
                            <div 
                                key={plan.id}
                                onMouseEnter={() => setHoveredCard(plan.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                    backgroundColor: 'rgba(15, 20, 30, 0.6)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '28px',
                                    padding: '40px 32px',
                                    border: isBestValue
                                        ? `2px solid ${isHovered ? '#00f5ff' : '#8b5cf6'}`
                                        : `1px solid ${isHovered ? '#00f5ff' : 'rgba(255,255,255,0.08)'}`,
                                    boxShadow: isHovered 
                                        ? '0 20px 40px rgba(0, 245, 255, 0.12)'
                                        : '0 10px 30px rgba(0,0,0,0.3)',
                                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}
                            >
                                {isBestValue && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        background: 'linear-gradient(135deg, #8b5cf6, #00f5ff)',
                                        color: '#000',
                                        padding: '6px 14px',
                                        borderRadius: '100px',
                                        fontSize: '0.72rem',
                                        fontWeight: 900,
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Best Value
                                    </div>
                                )}

                                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 14px', background: 'rgba(0, 245, 255, 0.08)', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, color: '#00f5ff', letterSpacing: '0.5px', marginBottom: '24px', textTransform: 'uppercase' }}>
                                    CapCut Pro Pass
                                </div>

                                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>
                                        {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}
                                    </span>
                                    {plan.originalPrice && (
                                        <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', fontWeight: 500 }}>
                                            {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '32px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                    VALID FOR {formatDuration(plan.durationDays)}
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1 }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        <Check size={16} color="#00f5ff" style={{ flexShrink: 0 }} /> No Watermarks on Exports
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        <Check size={16} color="#00f5ff" style={{ flexShrink: 0 }} /> Premium Templates & Effects
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        <Check size={16} color="#00f5ff" style={{ flexShrink: 0 }} /> Full AI Portrait & Smart Tools
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        <Check size={16} color="#00f5ff" style={{ flexShrink: 0 }} /> Cloud Storage Space
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                                        <Check size={16} color="#00f5ff" style={{ flexShrink: 0 }} /> Priority Render Speed
                                    </li>
                                </ul>

                                <Link
                                    href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                    style={{
                                        width: '100%',
                                        background: isBestValue ? 'linear-gradient(135deg, #8b5cf6, #00f5ff)' : 'transparent',
                                        border: isBestValue ? 'none' : '1.5px solid #00f5ff',
                                        color: isBestValue ? '#000' : '#00f5ff',
                                        padding: '16px',
                                        borderRadius: '16px',
                                        fontSize: '1rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        textDecoration: 'none',
                                        boxShadow: isBestValue ? '0 8px 20px rgba(0, 245, 255, 0.15)' : 'none',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        if (!isBestValue) e.currentTarget.style.background = 'rgba(0, 245, 255, 0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        if (!isBestValue) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <ShoppingCart size={18} /> Buy Now
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Features & FAQ Split layout */}
                <div className="capcut-split-layout" style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 768px) {
                            .capcut-split-layout {
                                flex-direction: column !important;
                                gap: 32px !important;
                            }
                        }
                    ` }} />

                    {/* Why Choose Section */}
                    <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', padding: '40px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ margin: '0 0 32px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Why Choose CapCut Pro?</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 245, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Scissors size={22} color="#00f5ff" />
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Professional Editing</div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>Multi-track timeline editing with premium keyframes, chroma key, and mask overlays.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Sparkles size={22} color="#8b5cf6" />
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>AI-Powered Magic</div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>Generate auto-captions, remove backgrounds, and polish audio with advanced smart tools.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 245, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Film size={22} color="#00f5ff" />
                                </div>
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Cinematic Output</div>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>Export ultra HD videos up to 4K / 60FPS with zero streamkart watermark.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Accordion Section */}
                    <div style={{ flex: 1.2 }}>
                        <h3 style={{ margin: '0 0 24px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Frequently Asked Questions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "How will I get CapCut Pro access?", a: "Upon payment, your CapCut Pro premium account details or activation method will be delivered instantly to your email." },
                                { q: "Does this work on both PC/Mac and Mobile?", a: "Yes! CapCut Pro works cross-platform. You can use it on Windows, macOS, iOS, and Android." },
                                { q: "Can I export in 4K without watermark?", a: "Absolutely. CapCut Pro unlocks high-quality exports up to 4K resolution at 60 FPS without any watermarks." },
                                { q: "Is there a replacement warranty?", a: "Yes, we offer full premium support and replacement warranty for the entire duration of your plan." }
                            ].map((item, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => toggleFaq(idx)}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: '16px',
                                        padding: '20px 24px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{item.q}</span>
                                        <ChevronDown size={18} color="rgba(255,255,255,0.4)" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                                    </div>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateRows: openFaq === idx ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 0.3s ease, opacity 0.3s ease',
                                        opacity: openFaq === idx ? 1 : 0
                                    }}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <div style={{ paddingTop: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                                {item.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    marginTop: '64px',
                    padding: '36px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <ShieldCheck size={28} color="#00f5ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>100% Safe & Secure</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Fully verified accounts</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Zap size={28} color="#00f5ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Instant Delivery</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Delivery in few minutes</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Headphones size={28} color="#00f5ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>24/7 Priority Support</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Friendly support team</div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(0, 245, 255, 0.1) 100%)',
                    borderRadius: '24px',
                    padding: '40px 50px',
                    marginTop: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(0, 245, 255, 0.15)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 768px) {
                            .capcut-bottom-cta-new {
                                flex-direction: column !important;
                                text-align: center !important;
                                padding: 32px 20px !important;
                                gap: 24px !important;
                            }
                        }
                    ` }} />
                    <div className="capcut-bottom-cta-new" style={{ display: 'flex', alignItems: 'center', gap: '32px', zIndex: 2, width: '100%' }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', flexShrink: 0 }}>
                            <Scissors size={32} color="#00f5ff" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Start creating pro videos today</h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', margin: 0, fontWeight: 500 }}>Unlock CapCut Pro templates, assets, and premium AI features instantly.</p>
                        </div>
                        <button 
                            onClick={() => document.querySelector('.capcut-plans-grid-custom')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #00f5ff)',
                                color: '#000',
                                border: 'none',
                                padding: '16px 36px',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(0,245,255,0.15)',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            Choose Plan <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
