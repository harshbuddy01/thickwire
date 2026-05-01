'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, Lock, ShieldCheck, Zap, Headphones, HelpCircle, Star, Globe, Navigation } from 'lucide-react';
import { useState } from 'react';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

export default function SpotifyPageClient({ service }: { service: Service }) {
    const [region, setRegion] = useState<'india' | 'global'>('india');
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Attempt to split plans based on name/price, or just show all if we can't tell.
    // In a real app with currencies, we'd filter by currency.
    // For now, we'll put cheaper plans (< 500) in India, and expensive in Global as a heuristic,
    // or just show all if there's only a few.
    // Heuristic to split plans: if price > 100, we treat it as INR (India), otherwise USD (Global)
    const indianPlans = service.plans.filter(p => parseFloat(p.price) > 100);
    const globalPlans = service.plans.filter(p => parseFloat(p.price) <= 100);

    const displayPlans = region === 'india' ? indianPlans : globalPlans;

    return (
        <div className="spotify-page-exact">
            <div className="container">
                <nav className="breadcrumb-nav" style={{ padding: '24px 0', fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111', textDecoration: 'none' }}>Entertainment</Link>
                    <ChevronRight size={14} />
                    <span className="current" style={{ fontWeight: 600 }}>Spotify Premium</span>
                </nav>

                {/* Hero Banner */}
                <div className="hero-image-container" style={{ position: 'relative' }}>
                    <Image
                        src={`${MINIO_URL}/slider/file_000000004fd07208a284a13ce78f69ff.png`}
                        alt="Spotify Premium Hero"
                        fill
                        priority
                        className="hero-banner-image"
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                {/* Plans */}
                <div className="plans-section">
                    <div className="plans-grid" style={{ gap: '24px' }}>
                        {/* Indian Column */}
                        <div className="plan-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="spotify-region-btn active" style={{ cursor: 'default' }}>
                                <img src="https://flagcdn.com/w40/in.png" alt="India" width="20" style={{ borderRadius: '2px' }} /> For Indian Customers
                            </div>
                            
                            {indianPlans.length > 0 ? indianPlans.map((plan, idx) => (
                                <div key={plan.id} className="spotify-plan-card">
                                    {idx === 0 && (
                                        <div className="spotify-plan-tag">
                                            <Star size={12} fill="#1ed760" /> MOST POPULAR
                                        </div>
                                    )}
                                    <div className="spotify-plan-header">
                                        <div className="spotify-plan-title">
                                            <p>Spotify Premium</p>
                                            <h3>{plan.name}</h3>
                                            <div className="spotify-plan-badge">Individual</div>
                                        </div>
                                        <div className="spotify-plan-price">
                                            <h4>₹{parseFloat(plan.price).toLocaleString()}</h4>
                                            <p>for {plan.durationDays} Days</p>
                                        </div>
                                    </div>

                                    <ul className="spotify-plan-features">
                                        <li><Check size={18} className="check-icon" /> Ad-free music listening</li>
                                        <li><Check size={18} className="check-icon" /> Play anywhere – even offline</li>
                                        <li><Check size={18} className="check-icon" /> On-demand playback</li>
                                        <li><Check size={18} className="check-icon" /> High quality audio</li>
                                        <li><Check size={18} className="check-icon" /> Cancel anytime</li>
                                    </ul>

                                    <div style={{ marginTop: 'auto' }}>
                                        {plan.inStock ? (
                                            <Link 
                                                href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <button className="spotify-buy-btn">
                                                    <Lock size={18} /> Buy Now Securely
                                                </button>
                                            </Link>
                                        ) : (
                                            <button className="spotify-buy-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                Out of Stock
                                            </button>
                                        )}
                                        <div className="spotify-secure-text">
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

                        {/* Global Column */}
                        <div className="plan-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="spotify-region-btn" style={{ cursor: 'default' }}>
                                <Globe size={18} /> For Outside India Customers
                            </div>

                            {globalPlans.length > 0 ? globalPlans.map((plan, idx) => (
                                <div key={plan.id} className="spotify-plan-card">
                                    <div className="spotify-plan-header">
                                        <div className="spotify-plan-title">
                                            <p>Spotify Premium</p>
                                            <h3>{plan.name}</h3>
                                            <div className="spotify-plan-badge">Individual</div>
                                        </div>
                                        <div className="spotify-plan-price">
                                            <h4>${parseFloat(plan.price).toLocaleString()}</h4>
                                            <p>for {plan.durationDays} Days</p>
                                        </div>
                                    </div>

                                    <ul className="spotify-plan-features">
                                        <li><Check size={18} className="check-icon" /> Ad-free music listening</li>
                                        <li><Check size={18} className="check-icon" /> Play anywhere – even offline</li>
                                        <li><Check size={18} className="check-icon" /> On-demand playback</li>
                                        <li><Check size={18} className="check-icon" /> High quality audio</li>
                                        <li><Check size={18} className="check-icon" /> Cancel anytime</li>
                                    </ul>

                                    <div style={{ marginTop: 'auto' }}>
                                        {plan.inStock ? (
                                            <Link 
                                                href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <button className="spotify-buy-btn">
                                                    <Lock size={18} /> Buy Now Securely
                                                </button>
                                            </Link>
                                        ) : (
                                            <button className="spotify-buy-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                Out of Stock
                                            </button>
                                        )}
                                        <div className="spotify-secure-text">
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
                            <span>Genuine Spotify subscription with direct access.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Headphones size={28} className="trust-icon" />
                        <div className="trust-text">
                            <strong>24/7 Customer Support</strong>
                            <span>We're here to help you anytime you need.</span>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="faq-section">
                    <h3><HelpCircle size={24} /> Frequently Asked Questions</h3>
                    <div className="spotify-faq-grid">
                        <div className="faq-column">
                            {[
                                { q: "What is Spotify Premium?", a: "Spotify Premium gives you ad-free music listening, offline playback, and high-quality audio." },
                                { q: "Will I receive my account details immediately?", a: "Yes, once your payment is confirmed, the details will be sent to your email instantly." },
                                { q: "Can I use Spotify Premium on multiple devices?", a: "You can log in on multiple devices, but you can only play music on one device at a time with an Individual plan." }
                            ].map((item, idx) => (
                                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} onClick={() => toggleFaq(idx)} style={{ marginBottom: '12px' }}>
                                    <div className="faq-question">
                                        <span>{item.q}</span>
                                        <ChevronRight size={16} className="faq-arrow" style={{ transform: openFaq === idx ? 'rotate(90deg)' : 'rotate(0)' }} />
                                    </div>
                                    <div className="faq-answer">
                                        <div className="faq-answer-inner">{item.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="faq-column">
                            {[
                                { q: "Can I renew after the plan expires?", a: "Yes, you can easily renew your subscription by purchasing a new plan from our store." },
                                { q: "Is this an official Spotify subscription?", a: "Yes, we provide 100% official and genuine Spotify subscriptions." },
                                { q: "What happens after my plan ends?", a: "Your account will revert to the free version of Spotify until you renew your subscription." }
                            ].map((item, idx) => {
                                const offsetIdx = idx + 3;
                                return (
                                <div key={offsetIdx} className={`faq-item ${openFaq === offsetIdx ? 'open' : ''}`} onClick={() => toggleFaq(offsetIdx)} style={{ marginBottom: '12px' }}>
                                    <div className="faq-question">
                                        <span>{item.q}</span>
                                        <ChevronRight size={16} className="faq-arrow" style={{ transform: openFaq === offsetIdx ? 'rotate(90deg)' : 'rotate(0)' }} />
                                    </div>
                                    <div className="faq-answer">
                                        <div className="faq-answer-inner">{item.a}</div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="spotify-bottom-cta">
                    <div className="cta-left">
                        <div style={{ width: '64px', height: '64px', background: '#1ed760', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.3 1.021zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.62.36z"/>
                            </svg>
                        </div>
                        <div>
                            <h3>Upgrade to Premium. Feel the difference.</h3>
                            <p>Enjoy ad-free music, offline listening & unlimited skips with Spotify Premium.</p>
                        </div>
                    </div>
                    <div className="cta-right">
                        <button className="spotify-bottom-cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Get Spotify Premium Now <ChevronRight size={18} />
                        </button>
                        <div className="spotify-cta-trust">
                            Instant Delivery • Secure Payment
                        </div>
                    </div>
                </div>

                {/* Footer Payment Methods (Hardcoded for aesthetics matching the design) */}
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
