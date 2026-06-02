'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ShieldCheck, Zap, Headphones, HelpCircle, Star, Globe, Navigation, Info } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function YoutubePageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const indianPlans = service.plans.filter(p => p.currency === 'INR' || !p.currency);
    const globalPlans = service.plans.filter(p => p.currency === 'USD');

    return (
        <div style={{
            background: '#0a0a0a',
            backgroundColor: '#0c0c0e',
            color: '#ffffff',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            paddingBottom: '100px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient YouTube Red Glow */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '10%',
                width: '45vw',
                height: '45vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 0, 0, 0.05) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '-5%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 0, 0, 0.04) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Breadcrumbs */}
                <nav style={{ padding: '24px 0', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}>Entertainment</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ fontWeight: 700, color: '#ff0000' }}>YouTube Premium</span>
                </nav>

                {/* Hero Banner */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <img
                        src={service.bannerUrl || `${MINIO_URL}/slider/file_00000000ab007208a29586bb51529b03.png`}
                        alt="YouTube Premium Hero"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Section Title */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.03em' }}>
                        YouTube. <span style={{ color: '#ff0000' }}>Ad-Free</span>. Non-Stop.
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                        Enjoy background play, offline downloads, and YouTube Music Premium. Choose a regional plan below.
                    </p>
                </div>

                {/* Plans Columns */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', 
                    gap: '40px',
                    marginBottom: '64px'
                }}>
                    {/* Indian Region Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ 
                            padding: '16px 24px', 
                            borderRadius: '16px', 
                            background: 'rgba(255, 0, 0, 0.08)', 
                            border: '1px solid rgba(255, 0, 0, 0.25)', 
                            color: '#ff0000',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1rem',
                            letterSpacing: '0.5px'
                        }}>
                            <img src="https://flagcdn.com/w40/in.png" alt="India" width="22" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} /> 
                            FOR INDIAN CUSTOMERS
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {indianPlans.length > 0 ? indianPlans.map((plan, idx) => {
                                const isPopular = idx === 0;
                                const cardId = plan.id;
                                const isHovered = hoveredCard === cardId;

                                return (
                                    <div 
                                        key={plan.id} 
                                        onMouseEnter={() => setHoveredCard(cardId)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            background: 'rgba(22, 22, 26, 0.6)',
                                            border: isPopular 
                                                ? `2px solid ${isHovered ? '#ff0000' : 'rgba(255, 0, 0, 0.4)'}` 
                                                : `1px solid ${isHovered ? '#ff0000' : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '24px',
                                            padding: '36px',
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                            boxShadow: isHovered 
                                                ? '0 20px 40px rgba(255, 0, 0, 0.12)' 
                                                : '0 10px 30px rgba(0,0,0,0.2)',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backdropFilter: 'blur(12px)'
                                        }}
                                    >
                                        {isPopular && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-12px',
                                                left: '32px',
                                                background: '#ff0000',
                                                color: '#fff',
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                letterSpacing: '1.5px',
                                                textTransform: 'uppercase',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)'
                                            }}>
                                                <Star size={12} fill="#fff" /> MOST POPULAR
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px' }}>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#ff0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>YouTube Premium</p>
                                                <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>
                                                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Individual</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>₹{parseFloat(plan.price).toLocaleString()}</h4>
                                                <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>for {plan.durationDays} Days</p>
                                            </div>
                                        </div>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> Ad-free videos & music</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> Background play & PiP</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> High-res offline downloads</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> YouTube Music Premium access</li>
                                        </ul>

                                        <div>
                                            <Link href={`/checkout?planId=${plan.id}&service=${service.slug}`} style={{ textDecoration: 'none' }}>
                                                <button 
                                                    onMouseEnter={() => setHoveredBtn(cardId)}
                                                    onMouseLeave={() => setHoveredBtn(null)}
                                                    style={{
                                                        background: isPopular ? '#ff0000' : 'rgba(255,255,255,0.08)',
                                                        color: '#fff',
                                                        border: isPopular ? 'none' : '1px solid rgba(255,255,255,0.15)',
                                                        width: '100%',
                                                        padding: '16px',
                                                        borderRadius: '30px',
                                                        fontSize: '1rem',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '10px',
                                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                        transform: hoveredBtn === cardId ? 'scale(1.02)' : 'scale(1)',
                                                        boxShadow: hoveredBtn === cardId && isPopular ? '0 10px 20px rgba(255, 0, 0, 0.3)' : 'none'
                                                    }}
                                                >
                                                    <Lock size={18} /> Buy Now Securely
                                                </button>
                                            </Link>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                                                <ShieldCheck size={14} style={{ color: '#ff0000' }} /> Secure & Encrypted Payment
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}>No plans available currently.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Global Region Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ 
                            padding: '16px 24px', 
                            borderRadius: '16px', 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            color: '#ffffff',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1rem',
                            letterSpacing: '0.5px'
                        }}>
                            <Globe size={20} style={{ color: '#ff0000' }} />
                            FOR OUTSIDE INDIA CUSTOMERS
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {globalPlans.length > 0 ? globalPlans.map((plan, idx) => {
                                const cardId = plan.id;
                                const isHovered = hoveredCard === cardId;

                                return (
                                    <div 
                                        key={plan.id} 
                                        onMouseEnter={() => setHoveredCard(cardId)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            background: 'rgba(22, 22, 26, 0.6)',
                                            border: `1px solid ${isHovered ? '#ff0000' : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '24px',
                                            padding: '36px',
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                            boxShadow: isHovered 
                                                ? '0 20px 40px rgba(255, 0, 0, 0.12)' 
                                                : '0 10px 30px rgba(0,0,0,0.2)',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backdropFilter: 'blur(12px)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px' }}>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#ff0000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>YouTube Premium</p>
                                                <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>
                                                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Individual</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>${parseFloat(plan.price).toLocaleString()}</h4>
                                                <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>for {plan.durationDays} Days</p>
                                            </div>
                                        </div>

                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> Ad-free videos & music</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> Background play & PiP</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> High-res offline downloads</li>
                                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#ff0000', flexShrink: 0 }} /> YouTube Music Premium access</li>
                                        </ul>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            color: 'rgba(255,255,255,0.5)',
                                            marginBottom: '20px'
                                        }}>
                                            <Info size={16} style={{ color: '#ff0000', flexShrink: 0 }} /> This plan is for outside India customers only.
                                        </div>

                                        <div>
                                            <Link href={`/checkout?planId=${plan.id}&service=${service.slug}`} style={{ textDecoration: 'none' }}>
                                                <button 
                                                    onMouseEnter={() => setHoveredBtn(cardId)}
                                                    onMouseLeave={() => setHoveredBtn(null)}
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.08)',
                                                        color: '#fff',
                                                        border: '1px solid rgba(255,255,255,0.15)',
                                                        width: '100%',
                                                        padding: '16px',
                                                        borderRadius: '30px',
                                                        fontSize: '1rem',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '10px',
                                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                        transform: hoveredBtn === cardId ? 'scale(1.02)' : 'scale(1)'
                                                    }}
                                                >
                                                    <Lock size={18} /> Buy Now Securely
                                                </button>
                                            </Link>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                                                <ShieldCheck size={14} style={{ color: '#ff0000' }} /> Secure & Encrypted Payment
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}>No plans available currently.</p>
                                </div>
                            )}
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
                        { icon: <ShieldCheck size={26} />, title: "100% Safe Checkout", desc: "Your details are fully protected." },
                        { icon: <Navigation size={26} style={{ transform: 'rotate(45deg)' }} />, title: "Instant Access Delivery", desc: "Automated credentials delivery." },
                        { icon: <ShieldCheck size={26} />, title: "Official Subscriptions", desc: "Stable private account access." },
                        { icon: <Headphones size={26} />, title: "24/7 Premium Support", desc: "Dedicated support team." }
                    ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ color: '#ff0000' }}>{item.icon}</div>
                            <div>
                                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#fff', marginBottom: '2px' }}>{item.title}</strong>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div style={{ maxWidth: '800px', margin: '0 auto 64px auto' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                        <HelpCircle size={24} style={{ color: '#ff0000' }} /> Frequently Asked Questions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { q: "What is YouTube Premium?", a: "YouTube Premium provides ad-free videos, background play, and offline downloads." },
                            { q: "Will I receive my account details immediately?", a: "Yes, once your payment is confirmed, the details will be sent to your email instantly." },
                            { q: "Can I use YouTube Premium on multiple devices?", a: "You can log into your account on multiple devices and enjoy premium benefits across all of them." },
                            { q: "Is this an official YouTube subscription?", a: "Yes, we provide 100% official and genuine YouTube Premium subscriptions." },
                            { q: "Can I renew after my plan expires?", a: "Yes, you can easily renew your subscription by purchasing a new plan from our store." }
                        ].map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div 
                                    key={idx} 
                                    style={{ 
                                        background: 'rgba(255,255,255,0.02)', 
                                        border: `1px solid ${isOpen ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255,255,255,0.06)'}`,
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
                                            color: isOpen ? '#ff0000' : '#fff',
                                            userSelect: 'none'
                                        }}
                                    >
                                        <span>{item.q}</span>
                                        <ChevronRight size={18} style={{ 
                                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', 
                                            transition: 'transform 0.3s ease',
                                            color: isOpen ? '#ff0000' : 'rgba(255,255,255,0.4)'
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

                {/* Bottom CTA */}
                <div style={{
                    background: '#161619',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '24px',
                    padding: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '28px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#ff0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(255,0,0,0.2)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>Enjoy YouTube without interruptions.</h3>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Go ad-free and enjoy unlimited entertainment with YouTube Premium.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
                        style={{
                            background: '#ff0000',
                            color: '#fff',
                            border: 'none',
                            padding: '16px 32px',
                            borderRadius: '30px',
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: '0 8px 20px rgba(255,0,0,0.2)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 25px rgba(255,0,0,0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,0,0,0.2)';
                        }}
                    >
                        Get Premium Now <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
