'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, Lock, ShieldCheck, Zap, Headphones, HelpCircle, Star, Globe, Navigation, Info } from 'lucide-react';
import { useState } from 'react';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

export default function YoutubePageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Heuristic to split plans: if price > 100, we treat it as INR (India), otherwise USD (Global)
    const indianPlans = service.plans.filter(p => parseFloat(p.price) > 100);
    const globalPlans = service.plans.filter(p => parseFloat(p.price) <= 100);

    return (
        <div className="youtube-page-exact">
            <div className="container">
                <nav className="breadcrumb-nav" style={{ padding: '24px 0', fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111', textDecoration: 'none' }}>Entertainment</Link>
                    <ChevronRight size={14} />
                    <span className="current" style={{ fontWeight: 600 }}>YouTube Premium</span>
                </nav>

                {/* Hero Banner */}
                <div className="hero-image-container" style={{ position: 'relative' }}>
                    <Image
                        src={`${MINIO_URL}/slider/file_00000000ab007208a29586bb51529b03.png`}
                        alt="YouTube Premium Hero"
                        fill
                        priority
                        className="hero-banner-image"
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                {/* Plans */}
                <div className="plans-section">
                    <div className="youtube-plans-grid" style={{ gap: '24px' }}>
                        {/* Indian Column */}
                        <div className="plan-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="youtube-region-btn active" style={{ cursor: 'default' }}>
                                <img src="https://flagcdn.com/w40/in.png" alt="India" width="20" style={{ borderRadius: '2px' }} /> For Indian Customers
                            </div>
                            
                            {/* We will map through Indian plans, but render 2 per row if needed? No, vertical list is fine. The screenshot shows side-by-side inside the Indian column. */}
                            <div className="youtube-indian-plans-grid" style={{ gap: '16px' }}>
                                {indianPlans.length > 0 ? indianPlans.map((plan, idx) => (
                                    <div key={plan.id} className="youtube-plan-card">
                                        {idx === 0 && (
                                            <div className="youtube-plan-tag">
                                                <Star size={12} fill="#ff0000" /> MOST POPULAR
                                            </div>
                                        )}
                                        <div className="youtube-plan-header" style={{ flexDirection: 'column', gap: '16px' }}>
                                            <div className="youtube-plan-title">
                                                <p>YouTube Premium</p>
                                                <h3>{plan.name}</h3>
                                                <div className="youtube-plan-badge">Individual</div>
                                            </div>
                                            <div className="youtube-plan-price" style={{ textAlign: 'left' }}>
                                                <h4>₹{parseFloat(plan.price).toLocaleString()}</h4>
                                                <p>for {Math.round(plan.durationDays / 30)} Months</p>
                                            </div>
                                        </div>

                                        <ul className="youtube-plan-features">
                                            <li><Check size={18} className="check-icon" /> Ad-free videos</li>
                                            <li><Check size={18} className="check-icon" /> Background play</li>
                                            <li><Check size={18} className="check-icon" /> Downloads to watch offline</li>
                                            <li><Check size={18} className="check-icon" /> YouTube Originals</li>
                                            <li><Check size={18} className="check-icon" /> Works on mobile, tablet & web</li>
                                        </ul>

                                        <div style={{ marginTop: 'auto' }}>
                                            {plan.inStock ? (
                                                <Link 
                                                    href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <button className="youtube-buy-btn">
                                                        <Lock size={18} /> Buy Now Securely
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button className="youtube-buy-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                    Out of Stock
                                                </button>
                                            )}
                                            <div className="youtube-secure-text">
                                                <ShieldCheck size={14} /> Secure & Safe Payment
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea', gridColumn: 'span 2' }}>
                                        <p style={{ fontSize: '15px', color: '#666' }}>No plans available currently.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Global Column */}
                        <div className="plan-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="youtube-region-btn" style={{ cursor: 'default' }}>
                                <Globe size={18} /> For Outside India Customers
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                                {globalPlans.length > 0 ? globalPlans.map((plan, idx) => (
                                    <div key={plan.id} className="youtube-plan-card">
                                        <div className="youtube-plan-header" style={{ flexDirection: 'column', gap: '16px' }}>
                                            <div className="youtube-plan-title">
                                                <p>YouTube Premium</p>
                                                <h3>{plan.name}</h3>
                                                <div className="youtube-plan-badge youtube-plan-badge-blue">Individual</div>
                                            </div>
                                            <div className="youtube-plan-price" style={{ textAlign: 'left' }}>
                                                <h4>${parseFloat(plan.price).toLocaleString()}</h4>
                                                <p>for 1 Year</p>
                                            </div>
                                        </div>

                                        <ul className="youtube-plan-features">
                                            <li><Check size={18} className="check-icon" style={{ color: '#3b82f6' }} /> Ad-free videos</li>
                                            <li><Check size={18} className="check-icon" style={{ color: '#3b82f6' }} /> Background play</li>
                                            <li><Check size={18} className="check-icon" style={{ color: '#3b82f6' }} /> Downloads to watch offline</li>
                                            <li><Check size={18} className="check-icon" style={{ color: '#3b82f6' }} /> YouTube Originals</li>
                                            <li><Check size={18} className="check-icon" style={{ color: '#3b82f6' }} /> Works on mobile, tablet & web</li>
                                        </ul>

                                        <div className="youtube-info-box">
                                            <Info size={16} /> This plan is for outside India customers only.
                                        </div>

                                        <div style={{ marginTop: 'auto' }}>
                                            {plan.inStock ? (
                                                <Link 
                                                    href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <button className="youtube-buy-btn">
                                                        <Lock size={18} /> Buy Now Securely
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button className="youtube-buy-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                    Out of Stock
                                                </button>
                                            )}
                                            <div className="youtube-secure-text">
                                                <ShieldCheck size={14} /> Secure & Safe Payment
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea' }}>
                                        <p style={{ fontSize: '15px', color: '#666' }}>No plans available currently.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Strip */}
                <div className="trust-strip">
                    <div className="trust-item">
                        <ShieldCheck size={28} className="trust-icon" />
                        <div className="trust-text">
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Navigation size={28} className="trust-icon" style={{ transform: 'rotate(45deg)' }} />
                        <div className="trust-text">
                            <strong>Instant Delivery</strong>
                            <span>Access details delivered instantly to your email.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <ShieldCheck size={28} className="trust-icon" />
                        <div className="trust-text">
                            <strong>Official Subscription</strong>
                            <span>Genuine YouTube Premium subscription.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Headphones size={28} className="trust-icon" />
                        <div className="trust-text">
                            <strong>24/7 Customer Support</strong>
                            <span>We&apos;re here to help you anytime you need.</span>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="faq-section">
                    <h3><HelpCircle size={24} /> Frequently Asked Questions</h3>
                    <div className="youtube-faq-grid">
                        <div className="faq-column">
                            {[
                                { q: "What is YouTube Premium?", a: "YouTube Premium provides ad-free videos, background play, and offline downloads." },
                                { q: "Will I receive my account details immediately?", a: "Yes, once your payment is confirmed, the details will be sent to your email instantly." },
                                { q: "Can I use YouTube Premium on multiple devices?", a: "You can log into your account on multiple devices and enjoy premium benefits across all of them." }
                            ].map((item, idx) => (
                                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} onClick={() => toggleFaq(idx)} style={{ marginBottom: '12px', background: '#fff', padding: '0', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                                    <div className="faq-question" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700 }}>
                                        <span>{item.q}</span>
                                        <ChevronRight size={16} style={{ transform: openFaq === idx ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                                    </div>
                                    <div className="faq-answer" style={{ maxHeight: openFaq === idx ? '150px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
                                        <div style={{ padding: '0 20px 16px 20px', color: '#555', fontSize: '14px' }}>{item.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="faq-column">
                            {[
                                { q: "Is this an official YouTube subscription?", a: "Yes, we provide 100% official and genuine YouTube Premium subscriptions." },
                                { q: "Can I renew after my plan expires?", a: "Yes, you can easily renew your subscription by purchasing a new plan from our store." },
                                { q: "What happens after my plan ends?", a: "Your account will revert to the free version of YouTube with ads until you renew your subscription." }
                            ].map((item, idx) => {
                                const offsetIdx = idx + 3;
                                return (
                                <div key={offsetIdx} className={`faq-item ${openFaq === offsetIdx ? 'open' : ''}`} onClick={() => toggleFaq(offsetIdx)} style={{ marginBottom: '12px', background: '#fff', padding: '0', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                                    <div className="faq-question" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700 }}>
                                        <span>{item.q}</span>
                                        <ChevronRight size={16} style={{ transform: openFaq === offsetIdx ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                                    </div>
                                    <div className="faq-answer" style={{ maxHeight: openFaq === offsetIdx ? '150px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
                                        <div style={{ padding: '0 20px 16px 20px', color: '#555', fontSize: '14px' }}>{item.a}</div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="youtube-bottom-cta">
                    <div className="cta-left">
                        <div style={{ width: '64px', height: '64px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </div>
                        <div>
                            <h3>Enjoy YouTube without interruptions.</h3>
                            <p>Go ad-free and enjoy unlimited entertainment with YouTube Premium.</p>
                        </div>
                    </div>
                    <div className="cta-right">
                        <button className="youtube-bottom-cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Get YouTube Premium Now <ChevronRight size={18} />
                        </button>
                        <div className="youtube-cta-trust">
                            Instant Delivery • Secure Payment
                        </div>
                    </div>
                </div>

                {/* Footer Payment Methods */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', padding: '20px 0', borderTop: '1px solid #eaeaea', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '12px', color: '#666', fontWeight: 600 }}>We Accept</span>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" height="16" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="20" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" height="16" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" height="16" />
                            <span style={{ fontSize: '12px', color: '#888' }}>& more</span>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Lock size={20} color="#666" />
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Secure Checkout</div>
                                <div style={{ fontSize: '11px', color: '#888' }}>Encrypted & protected payments</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>Trusted by Thousands</div>
                                <div style={{ fontSize: '11px', color: '#888' }}>Join thousands of satisfied customers.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
