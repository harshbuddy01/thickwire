'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ShieldCheck, Headphones, HelpCircle, Navigation, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

export default function HboPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="hbo-page-exact">
            <div className="container">
                <nav className="breadcrumb-nav" style={{ padding: '24px 0', fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111', textDecoration: 'none' }}>Entertainment</Link>
                    <ChevronRight size={14} />
                    <span className="current" style={{ fontWeight: 600 }}>HBO Max</span>
                </nav>

                {/* Hero Banner */}
                <div className="hero-image-container">
                    <img
                        src={`${MINIO_URL}/slider/file_00000000b5047208a3d5ea069a7996df.png`}
                        alt="HBO Max Hero"
                        className="hero-banner-image"
                    />
                </div>

                {/* Plans Grid */}
                <div className="plans-section">
                    <div className="hbo-plans-grid">
                        {service.plans.map((plan) => (
                            <div key={plan.id} className="hbo-plan-card">
                                <div className="hbo-plan-header">
                                    <div className="hbo-plan-icon-wrapper">
                                        <CalendarDays size={24} className="hbo-calendar-icon" />
                                    </div>
                                    <div className="hbo-plan-title-wrapper">
                                        <h3>{plan.name}</h3>
                                        <div className="hbo-plan-price">
                                            <h4>${parseFloat(plan.price).toLocaleString()}</h4>
                                            <p>for {Math.round(plan.durationDays / 30)} Months</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="hbo-plan-features">
                                    <li><Check size={18} className="check-icon" /> Top Movies & TV Shows</li>
                                    <li><Check size={18} className="check-icon" /> Exclusive Max Originals</li>
                                    <li><Check size={18} className="check-icon" /> Stream on Any Device</li>
                                    <li><Check size={18} className="check-icon" /> Download & Watch Offline</li>
                                    <li><Check size={18} className="check-icon" /> Personalized Profiles</li>
                                </ul>

                                <div style={{ marginTop: 'auto' }}>
                                    {plan.inStock ? (
                                        <Link 
                                            href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <button className="hbo-buy-btn">
                                                <Lock size={18} /> Buy Now Securely
                                            </button>
                                        </Link>
                                    ) : (
                                        <button className="hbo-buy-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                            Out of Stock
                                        </button>
                                    )}
                                    <div className="hbo-secure-text">
                                        <ShieldCheck size={14} /> Secure & Safe Payment
                                    </div>
                                </div>
                            </div>
                        ))}
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
                            <span>Genuine HBO Max subscription.</span>
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
                    <div className="hbo-faq-grid">
                        <div className="faq-column">
                            {[
                                { q: "What is HBO Max?", a: "HBO Max is a premium streaming platform that combines all of HBO with even more blockbuster movies and exclusive series." },
                                { q: "Will I receive my account details immediately?", a: "Yes, once your payment is confirmed, the details will be sent to your email instantly." },
                                { q: "Can I watch HBO Max on multiple devices?", a: "Yes, you can stream HBO Max on your TV, computer, phone, or tablet." }
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
                                { q: "Is this an official HBO Max subscription?", a: "Yes, we provide 100% official and genuine HBO Max subscriptions." },
                                { q: "Can I renew after my plan expires?", a: "Yes, you can easily renew your subscription by purchasing a new plan from our store." },
                                { q: "What happens after my plan ends?", a: "Your access to HBO Max content will be suspended until you renew your subscription." }
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
                <div className="hbo-bottom-cta">
                    <div className="cta-left">
                        <div style={{ width: '80px', height: '80px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg" alt="HBO Max" style={{ width: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3>Stream the best stories.</h3>
                            <p>Enjoy blockbuster movies, iconic series, and exclusive originals with HBO Max.</p>
                        </div>
                    </div>
                    <div className="cta-right">
                        <button className="hbo-bottom-cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            Get HBO Max Now <ChevronRight size={18} />
                        </button>
                        <div className="hbo-cta-trust">
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
