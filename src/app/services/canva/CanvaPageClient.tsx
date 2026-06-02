'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, ShieldCheck, Zap, Headphones, Palette, Layers, Image as ImageIcon, Wand2 } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function CanvaPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

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
            background: 'linear-gradient(135deg, #0d061f 0%, #05020c 60%, #020105 100%)',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '-10%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 196, 204, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                top: '40%',
                right: '-10%',
                width: '45vw',
                height: '45vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(125, 42, 232, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Breadcrumbs */}
                <nav style={{ padding: '24px 0', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Services</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <span style={{ fontWeight: 700, color: '#00c4cc' }}>Canva Edu</span>
                </nav>

                {/* Premium Hero Banner */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: '#000'
                }}>
                    <img 
                        src={service.bannerUrl || `${MINIO_URL}/slider/canva.PNG`} 
                        alt="Canva Edu Banner" 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Plans Section */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.03em' }}>
                        Unlock Creative <span style={{ background: 'linear-gradient(135deg, #00c4cc, #7d2ae8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Superpowers</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                        Choose a premium Canva Education plan. Unlock all Pro templates, background remover, brand kits, and magical AI tools instantly.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="canva-plans-grid-new" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '32px',
                    marginBottom: '64px'
                }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 768px) {
                            .canva-plans-grid-new {
                                display: flex !important;
                                flex-direction: column !important;
                                gap: 20px !important;
                            }
                            .canva-plans-grid-new > div {
                                width: 100% !important;
                                max-width: 100% !important;
                                transform: none !important;
                                padding: 24px 20px !important;
                            }
                        }
                    ` }} />
                    {service.plans.map((plan, index) => {
                        const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;
                        const cardId = plan.id;
                        const isHovered = hoveredCard === cardId;

                        return (
                            <div 
                                key={plan.id} 
                                onMouseEnter={() => setHoveredCard(cardId)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                                    backgroundColor: 'rgba(20, 10, 35, 0.4)',
                                    backdropFilter: 'blur(16px)',
                                    borderRadius: '28px',
                                    padding: '36px',
                                    border: isBestValue
                                        ? `2px solid ${isHovered ? '#00c4cc' : '#7d2ae8'}`
                                        : `1px solid ${isHovered ? '#00c4cc' : 'rgba(255, 255, 255, 0.08)'}`,
                                    boxShadow: isHovered 
                                        ? `0 25px 50px rgba(0, 196, 204, 0.15)`
                                        : `0 15px 35px rgba(0,0,0,0.2)`,
                                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {isBestValue && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        background: 'linear-gradient(135deg, #7d2ae8, #00c4cc)',
                                        color: '#fff',
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Best Value
                                    </div>
                                )}

                                <div style={{
                                    display: 'inline-flex',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    background: 'rgba(0, 196, 204, 0.12)',
                                    color: '#00c4cc',
                                    border: '1px solid rgba(0, 196, 204, 0.2)',
                                    width: 'fit-content',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '20px'
                                }}>
                                    EDU Plan
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>{plan.name}</h3>

                                <div style={{ marginBottom: '28px' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
                                            {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}
                                        </span>
                                        {plan.originalPrice && (
                                            <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', fontWeight: 500 }}>
                                                {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontWeight: 600 }}>
                                        for {formatDuration(plan.durationDays)} validity
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                                        <Check size={18} style={{ color: '#00c4cc' }} /> All Canva Pro Features
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                                        <Check size={18} style={{ color: '#00c4cc' }} /> 100M+ Premium Templates
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                                        <Check size={18} style={{ color: '#00c4cc' }} /> Background Remover & AI Tools
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                                        <Check size={18} style={{ color: '#00c4cc' }} /> Brand Kit & Custom Fonts
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                                        <Check size={18} style={{ color: '#00c4cc' }} /> 24/7 Priority Support
                                    </li>
                                </ul>

                                <Link
                                    href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                    onMouseEnter={() => setHoveredBtn(cardId)}
                                    onMouseLeave={() => setHoveredBtn(null)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        background: isBestValue 
                                            ? 'linear-gradient(135deg, #7d2ae8, #00c4cc)' 
                                            : 'linear-gradient(135deg, #00c4cc, #00999e)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '16px',
                                        padding: '18px',
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        boxShadow: hoveredBtn === cardId 
                                            ? '0 10px 25px rgba(0, 196, 204, 0.3)' 
                                            : '0 4px 15px rgba(0,0,0,0.15)',
                                        transform: hoveredBtn === cardId ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <ShoppingCart size={18} /> Buy Now Securely
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Features & FAQs section */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: '48px',
                    marginBottom: '64px'
                }}>
                    {/* Why list */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.02em' }}>Why Choose Canva Edu?</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {[
                                { icon: <Palette size={20} />, title: "Premium Templates", desc: "Access 100M+ professional templates for any project style." },
                                { icon: <Wand2 size={20} />, title: "AI Magic Tools", desc: "Magic Eraser, Background Remover, Magic Write, and text-to-image." },
                                { icon: <Layers size={20} />, title: "Brand Kit Compatibility", desc: "Setup logos, brand colors, and custom fonts for consistency." },
                                { icon: <ImageIcon size={20} />, title: "Premium Stocks", desc: "Millions of high-res premium stock photos, illustrations, and videos." }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: 'linear-gradient(135deg, rgba(0,196,204,0.15), rgba(125,42,232,0.15))',
                                        border: '1px solid rgba(0,196,204,0.2)',
                                        color: '#00c4cc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px 0', color: '#fff' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "How will I get Canva Edu access?", a: "After purchase, your access details will be delivered instantly to your email and visible in your StreamKart dashboard." },
                                { q: "Is this the same as Canva Pro?", a: "Canva Edu includes all Canva Pro features plus additional education-specific tools and resources." },
                                { q: "Can I use it on my existing email?", a: "The account is activated on your email. You get full access to all premium features." },
                                { q: "Is there a warranty?", a: "We provide a full replacement warranty for the entire plan duration. Any issues are resolved instantly." },
                                { q: "Can I export in high quality?", a: "Yes! Export in PNG, PDF, SVG, MP4, and more — all in the highest quality without watermarks." }
                            ].map((item, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div 
                                        key={idx} 
                                        style={{ 
                                            background: 'rgba(255,255,255,0.02)', 
                                            border: `1px solid ${isOpen ? 'rgba(0,196,204,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <div 
                                            onClick={() => toggleFaq(idx)}
                                            style={{
                                                padding: '20px 24px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                fontWeight: 700,
                                                color: isOpen ? '#00c4cc' : '#fff',
                                                userSelect: 'none'
                                            }}
                                        >
                                            <span>{item.q}</span>
                                            <ChevronDown size={18} style={{ 
                                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', 
                                                transition: 'transform 0.3s ease',
                                                color: isOpen ? '#00c4cc' : 'rgba(255,255,255,0.4)'
                                            }} />
                                        </div>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateRows: isOpen ? '1fr' : '0fr',
                                            transition: 'grid-template-rows 0.3s ease-in-out',
                                        }}>
                                            <div style={{ overflow: 'hidden' }}>
                                                <p style={{ 
                                                    margin: 0, 
                                                    padding: '0 24px 20px 24px', 
                                                    color: 'rgba(255,255,255,0.6)', 
                                                    fontSize: '0.95rem',
                                                    lineHeight: 1.6
                                                }}>{item.a}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Trust Strip */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                    gap: '24px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '36px',
                    borderRadius: '24px',
                    marginBottom: '64px'
                }}>
                    {[
                        { icon: <ShieldCheck size={24} />, title: "100% Safe & Secure", desc: "Encrypted checkout." },
                        { icon: <Palette size={24} />, title: "All Pro Features", desc: "No feature locks." },
                        { icon: <Zap size={24} />, title: "Instant Delivery", desc: "Details sent instantly." },
                        { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Priority assistance." }
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ color: '#00c4cc' }}>{item.icon}</div>
                            <div>
                                <strong style={{ display: 'block', fontSize: '1rem', color: '#fff' }}>{item.title}</strong>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    background: 'linear-gradient(135deg, #7d2ae8 0%, #00c4cc 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '28px',
                    boxShadow: '0 20px 40px rgba(0, 196, 204, 0.15)'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>Ready to design like a pro?</h3>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Get Canva Edu and unlock unlimited creative possibilities today.</p>
                    </div>
                    <button 
                        onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
                        style={{
                            background: '#fff',
                            color: '#7d2ae8',
                            border: 'none',
                            padding: '16px 32px',
                            borderRadius: '16px',
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                    >
                        Choose Plan <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
