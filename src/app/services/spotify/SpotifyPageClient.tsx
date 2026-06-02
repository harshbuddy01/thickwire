'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ShieldCheck, Zap, Headphones, HelpCircle, Star, Globe, Navigation, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function SpotifyPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const indianPlans = service.plans.filter(p => p.currency === 'INR' || !p.currency);
    const globalPlans = service.plans.filter(p => p.currency === 'USD');

    return (
        <div style={{
            background: '#09090b',
            backgroundColor: '#040405',
            color: '#ffffff',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            paddingBottom: '100px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Spotify Neon Green Glow */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '45vw',
                height: '45vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(29, 215, 96, 0.07) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(29, 215, 96, 0.05) 0%, transparent 70%)',
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
                    <span style={{ fontWeight: 700, color: '#1db954' }}>Spotify Premium</span>
                </nav>

                {/* Hero Banner */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <img
                        src={service.bannerUrl || `${MINIO_URL}/slider/file_000000004fd07208a284a13ce78f69ff.png`}
                        alt="Spotify Premium Hero"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.03em' }}>
                        Ready for <span style={{ color: '#1db954' }}>Unlimited</span> Music?
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
                        Stream millions of tracks ad-free, offline, and in high fidelity. Pick your premium region below.
                    </p>
                </div>

                {/* Plans Grid split by Region Columns */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', 
                    gap: '40px',
                    marginBottom: '64px'
                }}>
                    {/* Indian Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ 
                            padding: '16px 24px', 
                            borderRadius: '16px', 
                            background: 'rgba(29, 215, 96, 0.08)', 
                            border: '1px solid rgba(29, 215, 96, 0.25)', 
                            color: '#1db954',
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
                                        background: 'rgba(18, 18, 20, 0.6)',
                                        border: isPopular 
                                            ? `2px solid ${isHovered ? '#1db954' : 'rgba(29, 215, 96, 0.4)'}` 
                                            : `1px solid ${isHovered ? '#1db954' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: '24px',
                                        padding: '36px',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                        boxShadow: isHovered 
                                            ? '0 20px 40px rgba(29, 215, 96, 0.12)' 
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
                                            background: '#1db954',
                                            color: '#000',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            boxShadow: '0 4px 10px rgba(29, 215, 96, 0.3)'
                                        }}>
                                            <Star size={12} fill="#000" /> MOST POPULAR
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px' }}>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#1db954', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Spotify Premium</p>
                                            <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>
                                            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Individual</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>₹{parseFloat(plan.price).toLocaleString()}</h4>
                                            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>for {plan.durationDays} Days</p>
                                        </div>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> Ad-free music listening</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> Play anywhere – even offline</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> On-demand playback</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> High quality audio included</li>
                                    </ul>

                                    <div>
                                        <Link href={`/checkout?planId=${plan.id}&service=${service.slug}`} style={{ textDecoration: 'none' }}>
                                            <button 
                                                onMouseEnter={() => setHoveredBtn(cardId)}
                                                onMouseLeave={() => setHoveredBtn(null)}
                                                style={{
                                                    background: isPopular ? '#1db954' : 'rgba(255,255,255,0.08)',
                                                    color: isPopular ? '#000' : '#fff',
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
                                                    boxShadow: hoveredBtn === cardId && isPopular ? '0 10px 20px rgba(29, 215, 96, 0.3)' : 'none'
                                                }}
                                            >
                                                <Lock size={18} /> Buy Now Securely
                                            </button>
                                        </Link>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                                            <ShieldCheck size={14} style={{ color: '#1db954' }} /> Secure & Encrypted Payment
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

                    {/* Global Column */}
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
                            <Globe size={20} style={{ color: '#1db954' }} />
                            FOR OUTSIDE INDIA CUSTOMERS
                        </div>

                        {globalPlans.length > 0 ? globalPlans.map((plan, idx) => {
                            const cardId = plan.id;
                            const isHovered = hoveredCard === cardId;

                            return (
                                <div 
                                    key={plan.id} 
                                    onMouseEnter={() => setHoveredCard(cardId)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        background: 'rgba(18, 18, 20, 0.6)',
                                        border: `1px solid ${isHovered ? '#1db954' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: '24px',
                                        padding: '36px',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                        boxShadow: isHovered 
                                            ? '0 20px 40px rgba(29, 215, 96, 0.12)' 
                                            : '0 10px 30px rgba(0,0,0,0.2)',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backdropFilter: 'blur(12px)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '16px' }}>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#1db954', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Spotify Premium</p>
                                            <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>
                                            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Individual</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>${parseFloat(plan.price).toLocaleString()}</h4>
                                            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>for {plan.durationDays} Days</p>
                                        </div>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> Ad-free music listening</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> Play anywhere – even offline</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> On-demand playback</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)' }}><Check size={18} style={{ color: '#1db954', flexShrink: 0 }} /> High quality audio included</li>
                                    </ul>

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
                                            <ShieldCheck size={14} style={{ color: '#1db954' }} /> Secure & Encrypted Payment
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
                            <div style={{ color: '#1db954' }}>{item.icon}</div>
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
                        <HelpCircle size={24} style={{ color: '#1db954' }} /> Frequently Asked Questions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { q: "What is Spotify Premium?", a: "Spotify Premium gives you ad-free music listening, offline playback, and high-quality audio." },
                            { q: "Will I receive my account details immediately?", a: "Yes, once your payment is confirmed, the details will be sent to your email instantly." },
                            { q: "Can I use Spotify Premium on multiple devices?", a: "You can log in on multiple devices, but you can only play music on one device at a time with an Individual plan." },
                            { q: "Can I renew after the plan expires?", a: "Yes, you can easily renew your subscription by purchasing a new plan from our store." },
                            { q: "Is this an official Spotify subscription?", a: "Yes, we provide 100% official and genuine Spotify subscriptions." }
                        ].map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div 
                                    key={idx} 
                                    style={{ 
                                        background: 'rgba(255,255,255,0.02)', 
                                        border: `1px solid ${isOpen ? 'rgba(29, 215, 96, 0.3)' : 'rgba(255,255,255,0.06)'}`,
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
                                            color: isOpen ? '#1db954' : '#fff',
                                            userSelect: 'none'
                                        }}
                                    >
                                        <span>{item.q}</span>
                                        <ChevronRight size={18} style={{ 
                                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', 
                                            transition: 'transform 0.3s ease',
                                            color: isOpen ? '#1db954' : 'rgba(255,255,255,0.4)'
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

                {/* Custom Spotify-Player Bottom CTA */}
                <div style={{
                    background: '#18181c',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '24px',
                    padding: '28px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Mock CD/Artwork Cover */}
                        <div style={{ 
                            width: '64px', 
                            height: '64px', 
                            background: '#1db954', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(29, 215, 96, 0.25)',
                            flexShrink: 0,
                            animation: isPlaying ? 'spin 12s linear infinite' : 'none'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.3 1.021zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.62.36z"/>
                            </svg>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Spotify Premium Access</h4>
                                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(29, 215, 96, 0.15)', color: '#1db954', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>Now Playing</span>
                            </div>
                            <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Choose your plan and start listening ad-free.</p>
                        </div>
                    </div>

                    {/* Audio Player Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '380px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'not-allowed' }} disabled><SkipForward size={18} style={{ transform: 'rotate(180deg)' }} /></button>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                style={{ 
                                    background: '#fff', 
                                    border: 'none', 
                                    width: '36px', 
                                    height: '36px', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    color: '#000'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" style={{ marginLeft: '2px' }} />}
                            </button>
                            <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'not-allowed' }} disabled><SkipForward size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                            <span>1:28</span>
                            <div style={{ height: '4px', flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '42%', background: '#1db954', borderRadius: '2px' }}></div>
                            </div>
                            <span>3:45</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)' }}>
                            <Volume2 size={18} />
                            <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '80%', background: '#1db954', borderRadius: '2px' }}></div>
                            </div>
                        </div>
                        <button 
                            onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}
                            style={{
                                background: '#1db954',
                                color: '#000',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Select Plan
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Spinning disk style rules */}
            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
