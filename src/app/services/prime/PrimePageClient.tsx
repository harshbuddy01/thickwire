'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, Play, Zap, Monitor, ShieldCheck, Tag, Headphones, Crown } from 'lucide-react';
import type { Service } from '@/lib/types';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
export default function PrimePageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Color schemes per plan index for visual variety (matching original Prime design)
    const colorSchemes = [
        { card: 'card-dark', badge: 'badge-gold', text: 'text-gold', btn: 'btn-outline-gold', features: '' },
        { card: 'card-blue solid-blue', badge: 'badge-blue', text: 'text-blue-light', btn: 'btn-gradient-blue', features: 'text-white' },
        { card: 'card-dark', badge: 'badge-gold', text: 'text-gold', btn: 'btn-outline-gold', features: '' },
    ];

    return (
        <div className="prime-page-exact">
            <div className="container">
                {/* ─── Hero Section (Exact Image) ────────────────────── */}
                <div className="hero-image-container">
                    <img
                        src={`${MINIO_URL}/slider/prime-banner.png`}
                        alt="Prime Video"
                        className="hero-banner-image"
                    />
                </div>

                {/* ─── Plan Selection ────────────────────────────────── */}
                <div className="plans-section">
                    <div className="plans-header">
                        <h2>Choose Your Plan</h2>
                        <p>All plans include Prime benefits.</p>
                    </div>

                    <div className="plans-grid">
                        {service.plans.map((plan, index) => {
                            const colors = colorSchemes[index % colorSchemes.length];
                            const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;

                            return (
                                <div key={plan.id} className={`plan-card ${colors.card} ${isBestValue ? 'best-value' : ''}`}>
                                    <div className={`plan-badge ${colors.badge}`}>
                                        <Crown size={12} fill="currentColor" /> PREMIUM PLAN
                                    </div>
                                    {isBestValue ? (
                                        <div className="plan-card-inner">
                                            <div className="best-value-ribbon">BEST<br/>VALUE</div>
                                            <div className="plan-content">
                                                <h3 className="plan-name">{plan.name}</h3>
                                                <div className={`plan-price ${colors.card.includes('blue') ? 'text-blue-light' : ''}`}>
                                                    <span className="currency">₹</span>
                                                    <span className="amount">{parseFloat(plan.price).toLocaleString()}</span>
                                                </div>
                                                <ul className={`plan-features ${colors.features}`}>
                                                    <li><Check size={16} className={colors.text} /> Full HD / 4K Ultra HD Quality</li>
                                                    <li><Check size={16} className={colors.text} /> Watch on 1 Device</li>
                                                    <li><Check size={16} className={colors.text} /> All Prime Video Content</li>
                                                    <li><Check size={16} className={colors.text} /> {plan.name.toLowerCase().includes('ads free') || plan.name.toLowerCase().includes('ad free') ? 'Ads Free Experience' : 'Ads Supported'}</li>
                                                    <li><Check size={16} className={colors.text} /> Download & Watch</li>
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
                                    ) : (
                                        <div className="plan-content">
                                            <h3 className="plan-name">{plan.name}</h3>
                                            <div className={`plan-price ${colors.card.includes('blue') ? 'text-blue-light' : ''}`}>
                                                <span className="currency">₹</span>
                                                <span className="amount">{parseFloat(plan.price).toLocaleString()}</span>
                                            </div>
                                            <ul className={`plan-features ${colors.features}`}>
                                                <li><Check size={16} className={colors.text} /> {colors.card.includes('blue') ? 'Full HD Quality' : 'HD Quality'}</li>
                                                <li><Check size={16} className={colors.text} /> Watch on 1 Device</li>
                                                <li><Check size={16} className={colors.text} /> All Prime Video Content</li>
                                                <li><Check size={16} className={colors.text} /> {plan.name.toLowerCase().includes('ads free') || plan.name.toLowerCase().includes('ad free') ? 'Ads Free Experience' : 'Ads Supported'}</li>
                                                <li><Check size={16} className={colors.text} /> Download & Watch</li>
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
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Why Choose & FAQ ─────────────────────────────── */}
                <div className="info-split">
                    <div className="why-section dark-panel">
                        <h3 className="section-title text-white">Why Choose {service.name}?</h3>
                        <div className="why-list">
                            <div className="why-item">
                                <div className="why-icon icon-gold"><Play fill="transparent" size={16} /></div>
                                <div className="why-text text-white">
                                    <strong>Exclusive Originals</strong>
                                    <p>Watch award-winning Amazon Originals.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon icon-gold"><Zap fill="transparent" size={16} /></div>
                                <div className="why-text text-white">
                                    <strong>Latest Movies & TV Shows</strong>
                                    <p>New releases and trending shows, all in one place.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon icon-gold"><Check size={18} /></div>
                                <div className="why-text text-white">
                                    <strong>Live Sports</strong>
                                    <p>Watch live cricket, football and more.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-icon icon-gold"><Monitor size={18} /></div>
                                <div className="why-text text-white">
                                    <strong>Download & Watch</strong>
                                    <p>Download your favorite content and watch offline.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq-section dark-panel">
                        <h3 className="section-title text-white">Frequently Asked Questions</h3>
                        <div className="faq-accordion dark-accordion">
                            {[
                                { q: "How will I get my Prime Video account?", a: "After your successful purchase, your login credentials will be instantly visible in your dashboard and sent to your registered email address." },
                                { q: "Can I change my plan later?", a: "Yes, you can upgrade to a higher duration plan at any time. The remaining balance of your current plan will be adjusted." },
                                { q: "Will this account work on my device?", a: "Absolutely! Our premium accounts work on all Prime Video-supported devices including Android, iOS, Windows, and Smart TVs." },
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
                <div className="trust-strip dark-strip">
                    <div className="trust-item">
                        <ShieldCheck size={24} className="trust-icon text-gold" />
                        <div className="trust-text text-white">
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Tag size={24} className="trust-icon text-gold" />
                        <div className="trust-text text-white">
                            <strong>Best Price Guarantee</strong>
                            <span>Get the best services at the lowest prices.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Zap size={24} className="trust-icon text-gold" />
                        <div className="trust-text text-white">
                            <strong>Instant Delivery</strong>
                            <span>Quick activation & instant access.</span>
                        </div>
                    </div>
                    <div className="trust-item">
                        <Headphones size={24} className="trust-icon text-gold" />
                        <div className="trust-text text-white">
                            <strong>24/7 Customer Support</strong>
                            <span>We're here anytime you need us.</span>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom CTA ───────────────────────────────────── */}
                <div className="bottom-cta prime-cta">
                    <div className="cta-content">
                        <div className="cta-icon-box" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="Prime Video" style={{ height: '32px' }} />
                        </div>
                        <div className="cta-text">
                            <h3>Ready to start streaming?</h3>
                            <p>Choose a plan and enjoy unlimited entertainment.</p>
                        </div>
                    </div>
                    <button className="cta-button btn-gold" onClick={() => document.querySelector('.plans-section')?.scrollIntoView({ behavior: 'smooth' })}>
                        Choose Your Plan <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
