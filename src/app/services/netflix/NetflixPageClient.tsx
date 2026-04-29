'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, Play, Zap, Monitor, ShieldCheck, Tag, Headphones } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

export default function NetflixPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Color schemes per plan index for visual variety
    const colorSchemes = [
        { card: 'card-red', badge: 'badge-red', text: 'text-red', btn: 'bg-red' },
        { card: 'card-purple', badge: 'badge-purple', text: 'text-purple', btn: 'bg-purple' },
        { card: 'card-blue', badge: 'badge-blue', text: 'text-blue', btn: 'bg-blue' },
    ];

    return (
        <div className="netflix-page-exact">
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container">
                <nav className="breadcrumb-nav">
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/streaming">Streaming</Link>
                    <ChevronRight size={14} />
                    <span className="current">{service.name}</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Section (Exact Image) ────────────────────── */}
                <div className="hero-image-container">
                    <img src="/images/slider/netflix-banner-new.png" alt="Netflix Premium" className="hero-banner-image" />
                </div>

                {/* ─── Plan Selection ────────────────────────────────── */}
                <div className="plans-section">
                    <h2 className="section-title">Choose Your Plan</h2>
                    <p className="section-subtitle">All plans include Premium benefits.</p>

                    <div className="plans-grid">
                        {service.plans.map((plan, index) => {
                            const colors = colorSchemes[index % colorSchemes.length];
                            const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;

                            return (
                                <div key={plan.id} className={`plan-card ${colors.card} ${isBestValue ? 'best-value' : ''}`}>
                                    {isBestValue && <div className="best-value-ribbon">BEST VALUE</div>}
                                    <div className={`plan-badge ${colors.badge}`}>PREMIUM PLAN</div>
                                    <div className="plan-content">
                                        <h3 className="plan-name">{plan.name}</h3>
                                        <div className="plan-price">
                                            <span className="currency">₹</span>
                                            <span className="amount">{parseFloat(plan.price).toLocaleString()}</span>
                                        </div>
                                        <ul className="plan-features">
                                            <li><Check size={16} className={colors.text} /> Full HD / 4K Ultra HD Quality</li>
                                            <li><Check size={16} className={colors.text} /> Watch on 1 Device</li>
                                            <li><Check size={16} className={colors.text} /> All Netflix Content Access</li>
                                            <li><Check size={16} className={colors.text} /> Ad-free Experience</li>
                                            <li><Check size={16} className={colors.text} /> Works on TV, Mobile, Laptop</li>
                                        </ul>
                                        {plan.inStock ? (
                                            <Link
                                                href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                className={`plan-btn ${colors.btn}`}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                                            >
                                                <ShoppingCart size={18} /> Buy Now →
                                            </Link>
                                        ) : (
                                            <button className={`plan-btn ${colors.btn}`} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                Out of Stock
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Why Choose & FAQ ─────────────────────────────── */}
                <div className="info-split">
                    <div className="why-section">
                        <h3 className="section-title">Why Choose {service.name}?</h3>
                        <div className="why-list">
                            <div className="why-item">
                                <div className="why-icon"><Play fill="white" size={16} /></div>
                                <div className="why-text">
                                    <strong>Unlimited Entertainment</strong>
                                    <p>Watch all your favorite movies and TV shows.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon"><Zap fill="white" size={16} /></div>
                                <div className="why-text">
                                    <strong>No Ads</strong>
                                    <p>Enjoy uninterrupted streaming experience.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon"><Check size={18} /></div>
                                <div className="why-text">
                                    <strong>Download & Watch</strong>
                                    <p>Download your favorite content and watch offline.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon"><Monitor size={18} /></div>
                                <div className="why-text">
                                    <strong>Works Everywhere</strong>
                                    <p>Stream on Smart TVs, mobiles, tablets, laptops and more.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq-section">
                        <h3 className="section-title">Frequently Asked Questions</h3>
                        <div className="faq-accordion">
                            {[
                                { q: "How will I get my Netflix account?", a: "After your successful purchase, your login credentials will be instantly visible in your dashboard and sent to your registered email address." },
                                { q: "Can I change my plan later?", a: "Yes, you can upgrade to a higher duration plan at any time. The remaining balance of your current plan will be adjusted." },
                                { q: "Will this account work on my device?", a: "Absolutely! Our premium accounts work on all Netflix-supported devices including Android, iOS, Windows, and Smart TVs." },
                                { q: "Is there any warranty?", a: "We provide 100% replacement warranty for the entire duration of your plan. If you face any issues, we replace the account instantly." },
                                { q: "What if I face any issue?", a: "Our dedicated support team is available 24/7. You can reach out via the Support tab or live chat for immediate assistance." }
                            ].map((item, idx) => (
                                <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`} onClick={() => toggleFaq(idx)}>
                                    <div className="faq-question">
                                        <span>{item.q}</span>
                                        <ChevronDown size={16} className="faq-arrow" />
                                    </div>
                                    <div className="faq-answer">
                                        <div className="faq-answer-inner">{item.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Trust Elements ─────────────────────────────────── */}
                <div className="trust-strip">
                    <div className="trust-item">
                        <ShieldCheck size={24} className="trust-icon" />
                        <div className="trust-text">
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Tag size={24} className="trust-icon" />
                        <div className="trust-text">
                            <strong>Best Price Guarantee</strong>
                            <span>Get the best services at the lowest prices.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Zap size={24} className="trust-icon" />
                        <div className="trust-text">
                            <strong>Instant Delivery</strong>
                            <span>Quick activation & instant access.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Headphones size={24} className="trust-icon" />
                        <div className="trust-text">
                            <strong>24/7 Customer Support</strong>
                            <span>We're here anytime you need us.</span>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom CTA ───────────────────────────────────── */}
                <div className="bottom-cta">
                    <div className="cta-content">
                        <div className="cta-icon-box">
                            <img src="/images/netflix_3d.png" alt="N" />
                        </div>
                        <div className="cta-text">
                            <h3>Ready to start watching?</h3>
                            <p>Choose a plan and enjoy unlimited entertainment.</p>
                        </div>
                    </div>
                    <button className="cta-button" onClick={() => document.querySelector('.plans-section')?.scrollIntoView({ behavior: 'smooth' })}>
                        Choose Your Plan <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
