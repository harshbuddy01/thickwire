'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, Play, Zap, Monitor, ShieldCheck, Tag, Headphones, Crown } from 'lucide-react';

export default function PrimePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="prime-page-exact">
            <div className="container">
                {/* ─── Hero Section (Exact Image) ────────────────────── */}
                <div className="hero-image-container">
                    <img src="/images/slider/prime-banner.png" alt="Prime Video" className="hero-banner-image" />
                </div>

                {/* ─── Plan Selection ────────────────────────────────── */}
                <div className="plans-section">
                    <div className="plans-header">
                        <h2>Choose Your Plan</h2>
                        <p>All plans include Prime benefits.</p>
                    </div>

                    <div className="plans-grid">
                        {/* 1 Month Plan */}
                        <div className="plan-card card-dark">
                            <div className="plan-badge badge-gold">
                                <Crown size={12} fill="currentColor" /> PREMIUM PLAN
                            </div>
                            <div className="plan-content">
                                <h3 className="plan-name">1 Month</h3>
                                <div className="plan-price">
                                    <span className="currency">₹</span>
                                    <span className="amount">59</span>
                                </div>
                                <ul className="plan-features">
                                    <li><Check size={16} className="text-gold" /> HD Quality</li>
                                    <li><Check size={16} className="text-gold" /> Watch on 1 Device</li>
                                    <li><Check size={16} className="text-gold" /> All Prime Video Content</li>
                                    <li><Check size={16} className="text-gold" /> Ads Supported</li>
                                    <li><Check size={16} className="text-gold" /> Download & Watch</li>
                                </ul>
                                <button className="plan-btn btn-outline-gold">
                                    <ShoppingCart size={18} /> Buy Now
                                </button>
                            </div>
                        </div>

                        {/* 6 Months (With Ads) */}
                        <div className="plan-card card-blue solid-blue">
                            <div className="plan-badge badge-blue">
                                <Crown size={12} fill="currentColor" /> PREMIUM PLAN
                            </div>
                            <div className="plan-content">
                                <h3 className="plan-name">6 Months <span className="sub-name">(With Ads)</span></h3>
                                <div className="plan-price text-blue-light">
                                    <span className="currency">₹</span>
                                    <span className="amount">220</span>
                                </div>
                                <ul className="plan-features text-white">
                                    <li><Check size={16} className="text-blue-light" /> Full HD Quality</li>
                                    <li><Check size={16} className="text-blue-light" /> Watch on 1 Device</li>
                                    <li><Check size={16} className="text-blue-light" /> All Prime Video Content</li>
                                    <li><Check size={16} className="text-blue-light" /> With Ads</li>
                                    <li><Check size={16} className="text-blue-light" /> Download & Watch</li>
                                </ul>
                                <button className="plan-btn btn-gradient-blue">
                                    <ShoppingCart size={18} /> Buy Now
                                </button>
                            </div>
                        </div>

                        {/* 6 Months (Ads Free) */}
                        <div className="plan-card card-dark best-value">
                            <div className="plan-badge badge-gold">
                                <Crown size={12} fill="currentColor" /> PREMIUM PLAN
                            </div>
                            <div className="plan-card-inner">
                                <div className="best-value-ribbon">BEST<br/>VALUE</div>
                                <div className="plan-content">
                                    <h3 className="plan-name">6 Months <span className="sub-name">(Ads Free)</span></h3>
                                    <div className="plan-price">
                                        <span className="currency">₹</span>
                                        <span className="amount">279</span>
                                    </div>
                                    <ul className="plan-features">
                                        <li><Check size={16} className="text-gold" /> Full HD / 4K Ultra HD Quality</li>
                                        <li><Check size={16} className="text-gold" /> Watch on 1 Device</li>
                                        <li><Check size={16} className="text-gold" /> All Prime Video Content</li>
                                        <li><Check size={16} className="text-gold" /> Ads Free Experience</li>
                                        <li><Check size={16} className="text-gold" /> Download & Watch</li>
                                    </ul>
                                    <button className="plan-btn btn-outline-gold">
                                        <ShoppingCart size={18} /> Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Why Choose & FAQ ─────────────────────────────── */}
                <div className="info-split">
                    <div className="why-section dark-panel">
                        <h3 className="section-title text-white">Why Choose Prime Video?</h3>
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
                    <button className="cta-button btn-gold">
                        Choose Your Plan <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
