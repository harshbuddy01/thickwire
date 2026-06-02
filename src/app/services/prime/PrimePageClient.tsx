'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, Play, Zap, Monitor, ShieldCheck, Tag, Headphones, Crown } from 'lucide-react';
import type { Service } from '@/lib/types';
import styles from './prime.module.css';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function PrimePageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

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
        <div className={styles['prime-page-exact']}>
            <div className="container">
                
                {/* Breadcrumbs */}
                <nav style={{ padding: '24px 0', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Services</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ fontWeight: 700, color: '#00a8e1' }}>Prime Video</span>
                </nav>

                {/* Hero Section */}
                <div className={styles['hero-image-container']}>
                    <img
                        src={service.bannerUrl || `${MINIO_URL}/slider/prime-banner.png`}
                        alt="Prime Video Banner"
                        className={styles['hero-banner-image']}
                    />
                </div>

                {/* Plan Selection */}
                <div className={styles['plans-section']}>
                    <div className={styles['plans-header']}>
                        <h2>Choose Your Plan</h2>
                        <p>Stream premium movies, award-winning Amazon Originals, and live sports instantly.</p>
                    </div>

                    <div className={styles['plans-grid']}>
                        {service.plans.map((plan, index) => {
                            const hasExplicitBestValue = service.plans.some(p => p.isBestValue);
                            const isBestValue = hasExplicitBestValue
                                ? !!plan.isBestValue
                                : (index === service.plans.length - 1 && service.plans.length > 1);
                            
                            const isHovered = hoveredCard === plan.id;

                            return (
                                <div 
                                    key={plan.id} 
                                    className={`${styles['plan-card']} ${isBestValue ? styles['best-value'] : ''}`}
                                    onMouseEnter={() => setHoveredCard(plan.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        border: isBestValue 
                                            ? `2px solid ${isHovered ? '#00c6ff' : '#00a8e1'}` 
                                            : `1px solid ${isHovered ? '#00a8e1' : 'rgba(255,255,255,0.08)'}`,
                                        boxShadow: isHovered 
                                            ? '0 20px 40px rgba(0, 168, 225, 0.15)' 
                                            : '0 10px 30px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    <div className={styles['plan-card-inner']}>
                                        {isBestValue && (
                                            <div className={styles['best-value-ribbon']}>BEST VALUE</div>
                                        )}
                                        <div className={styles['plan-badge']}>
                                            <Crown size={12} fill="currentColor" /> Premium Pass
                                        </div>
                                        <div className={styles['plan-content']}>
                                            <h3 className={styles['plan-name']}>{plan.name}</h3>
                                            
                                            <div className={styles['plan-price']}>
                                                <span className={styles['currency']}>{plan.currency === 'USD' ? '$' : '₹'}</span>
                                                <span className={styles['amount']}>{parseFloat(plan.price).toLocaleString()}</span>
                                                {plan.originalPrice && (
                                                    <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', fontWeight: 500, marginLeft: '8px' }}>
                                                        {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <div style={{ fontSize: '0.82rem', color: '#00a8e1', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                                VALIDITY: {formatDuration(plan.durationDays)}
                                            </div>

                                            <ul className={styles['plan-features']}>
                                                <li><Check size={16} color="#00a8e1" style={{ flexShrink: 0 }} /> Ultra HD / 4K Video Quality</li>
                                                <li><Check size={16} color="#00a8e1" style={{ flexShrink: 0 }} /> All Prime Originals & Shows</li>
                                                <li><Check size={16} color="#00a8e1" style={{ flexShrink: 0 }} /> Live Sports Streaming Included</li>
                                                <li><Check size={16} color="#00a8e1" style={{ flexShrink: 0 }} /> {plan.name.toLowerCase().includes('ad free') || plan.name.toLowerCase().includes('ads free') ? 'Ads Free Stream' : 'Ads Supported'}</li>
                                                <li><Check size={16} color="#00a8e1" style={{ flexShrink: 0 }} /> Support Mobile, TV, & Laptop</li>
                                            </ul>

                                            <Link
                                                href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                className={`${styles['plan-btn']} ${isBestValue ? styles['btn-gradient-blue'] : styles['btn-outline-gold']}`}
                                            >
                                                <ShoppingCart size={18} /> Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Why Choose & FAQ Section */}
                <div className={styles['info-split']}>
                    
                    {/* Left: Why Choose Section */}
                    <div style={{ flex: 1 }} className={styles['dark-panel']}>
                        <h3 className={styles['section-title']}>Why Choose {service.name}?</h3>
                        <div className={styles['why-list']}>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Play size={18} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Exclusive Amazon Originals</strong>
                                    <p>Access critically acclaimed series like The Boys, Reacher, and Citadel.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Zap size={18} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Offline Downloads</strong>
                                    <p>Download titles to the Prime Video app to watch offline anywhere, anytime.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Monitor size={18} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Multiple Devices</strong>
                                    <p>Watch smoothly on your phone, tablet, computer, and Smart TV.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: FAQ Section */}
                    <div style={{ flex: 1.2 }}>
                        <h3 className={styles['section-title']}>Frequently Asked Questions</h3>
                        <div className={styles['faq-accordion']}>
                            {[
                                { q: "How will I get my Prime Video account details?", a: "Your login credentials will be delivered instantly to your email address and visible on your StreamKart dashboard upon payment completion." },
                                { q: "Which devices are supported?", a: "You can watch on Smart TVs, Android/iOS devices, laptops, gaming consoles, and streaming media devices." },
                                { q: "Is the account shared or private?", a: "We offer both options depending on the plan. Our plans guarantee full access for your device without screen limits." },
                                { q: "Do you offer a replacement warranty?", a: "Yes, we provide full support and 100% replacement warranty for the entire duration of your plan." }
                            ].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className={`${styles['faq-item']} ${openFaq === idx ? styles.open : ''}`} 
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div className={styles['faq-question']}>
                                        <span>{item.q}</span>
                                        <ChevronDown size={18} className={styles['faq-arrow']} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                                    </div>
                                    <div className={styles['faq-answer']}>
                                        <div className={styles['faq-answer-inner']}>{item.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges Strip */}
                <div className={styles['dark-strip']}>
                    <div className={styles['trust-item']}>
                        <ShieldCheck size={28} color="#00a8e1" />
                        <div className={styles['trust-text']}>
                            <strong>100% Safe Payments</strong>
                            <span>Your transaction is fully encrypted and secure.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Zap size={28} color="#00a8e1" />
                        <div className={styles['trust-text']}>
                            <strong>Instant Delivery</strong>
                            <span>Login details sent automatically within seconds.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Headphones size={28} color="#00a8e1" />
                        <div className={styles['trust-text']}>
                            <strong>24/7 Helpline Support</strong>
                            <span>Get quick assistance whenever you run into issues.</span>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className={styles['prime-cta']}>
                    <div className={styles['cta-content']}>
                        <div className={styles['cta-icon-box']}>
                            <Crown size={32} color="#00a8e1" />
                        </div>
                        <div className={styles['cta-text']}>
                            <h3>Ready to dive into premium entertainment?</h3>
                            <p>Choose your plan and activate Prime Video instantly.</p>
                        </div>
                    </div>
                    <button 
                        className={styles['btn-gold']} 
                        onClick={() => document.querySelector(`.${styles['plans-section']}`)?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Choose Plan <ChevronRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
