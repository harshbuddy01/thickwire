'use client';

import Link from 'next/link';
import { ChevronRight, ChevronDown, ShieldCheck, Download, Tv, MonitorPlay, CheckCircle2, Truck, Headphones, Lock, CreditCard, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
const LOGO_URL = `${MINIO}/logos/sonyliv.jpg`;
const HERO_BG = `${MINIO}/slider/sonyliv-hero-bg.png`;

export default function SonyLivProductPage() {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        if (faqOpen === index) setFaqOpen(null);
        else setFaqOpen(index);
    };

    return (
        <div style={{ background: '#f8f9fb', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6b7280' }}>
                    <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/streaming" style={{ color: '#6b7280', textDecoration: 'none' }}>OTT Subscriptions</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#111827', fontWeight: 500 }}>SonyLIV 1 Year</span>
                </nav>
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Hero Section */}
                <div className="sonyliv-hero" style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#0d1117',
                    minHeight: '400px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: `url(${HERO_BG})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, bottom: 0, right: '30%',
                        background: 'linear-gradient(90deg, rgba(10,14,23,0.95) 0%, rgba(10,14,23,0.8) 50%, rgba(10,14,23,0) 100%)',
                        zIndex: 1
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(0deg, rgba(10,14,23,0.9) 0%, rgba(10,14,23,0) 100%)',
                        zIndex: 1
                    }} />

                    <div className="sonyliv-hero-content" style={{ position: 'relative', zIndex: 2 }}>
                        
                        {/* Left Content */}
                        <div style={{ maxWidth: '500px' }}>
                            <div className="sonyliv-hero-header" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                                <img src={LOGO_URL} alt="SonyLIV" style={{ width: '120px', height: '120px', borderRadius: '24px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)' }} />
                                <div>
                                    <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.1 }}>SonyLIV</h1>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        <ShieldCheck size={16} color="#fff" />
                                        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>Official Subscription</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p style={{ color: '#d1d5db', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '40px' }}>
                                Watch unlimited Movies, TV Shows, Originals, Sports and Live Events in Full HD.<br/>
                                Enjoy premium entertainment in one place.
                            </p>

                            <div className="sonyliv-hero-features" style={{ display: 'flex', gap: '40px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <MonitorPlay size={32} color="#fff" strokeWidth={1.5} />
                                    <span style={{ color: '#fff', fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Unlimited<br/>Entertainment</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <Tv size={32} color="#fff" strokeWidth={1.5} />
                                    <span style={{ color: '#fff', fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Full HD<br/>Streaming</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <MonitorPlay size={32} color="#fff" strokeWidth={1.5} />
                                    <span style={{ color: '#fff', fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Watch on Multiple<br/>Devices</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <Download size={32} color="#fff" strokeWidth={1.5} />
                                    <span style={{ color: '#fff', fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Download &<br/>Watch Offline</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', paddingTop: '40px' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png" alt="UCL" style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '16px' }} />
                            <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '1px' }}>UEFA CHAMPIONS LEAGUE</h2>
                            <div style={{ color: '#a78bfa', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', marginBottom: '16px' }}>LIVE & EXCLUSIVE</div>
                            <p style={{ color: '#e5e7eb', fontSize: '1rem', textAlign: 'center', marginBottom: '24px', lineHeight: 1.5 }}>
                                Watch Europe&apos;s top football clubs<br/>battle it out for glory!
                            </p>
                            <button style={{
                                background: 'linear-gradient(90deg, #4c1d95 0%, #3b0764 100%)',
                                color: '#fff',
                                border: 'none',
                                padding: '14px 32px',
                                borderRadius: '100px',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(76,29,149,0.5)'
                            }}>
                                Watch Live Now <ChevronRight size={18} />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="sonyliv-main-content" style={{
                    background: '#fff',
                    borderRadius: '24px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
                }}>
                    
                    {/* Left Col - Features */}
                    <div style={{ padding: '40px', flex: 1, borderRight: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                            <img src={LOGO_URL} alt="SonyLIV" style={{ width: '80px', height: '80px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <div>
                                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>SonyLIV</h2>
                                <p style={{ margin: 0, fontSize: '1.1rem', color: '#4b5563', fontWeight: 500 }}>1 Year Plan</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                '1 Year Premium Access',
                                'Watch on Multiple Devices',
                                'Full HD Streaming',
                                'Ad-Free Experience',
                                'Official & Secure Subscription'
                            ].map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CheckCircle2 size={20} color="#6d28d9" fill="#ede9fe" />
                                    <span style={{ color: '#4b5563', fontSize: '0.95rem', fontWeight: 500 }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mid Col - Details */}
                    <div style={{ padding: '40px', flex: 1.2, borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Seamless Entertainment</h3>
                        <p style={{ margin: '0 0 24px 0', fontSize: '1rem', color: '#6b7280', lineHeight: 1.6 }}>
                            Get your SonyLIV Premium access details delivered instantly to your mobile number upon successful payment. Enjoy blockbuster hits and live sports without interruptions.
                        </p>

                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                            <div style={{ background: '#e0e7ff', padding: '10px', borderRadius: '12px', color: '#4f46e5' }}>
                                <MonitorPlay size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.05rem', marginBottom: '4px' }}>Watch Anywhere</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Stream on your Phone, TV, or Web Browser.</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col - Price & CTA */}
                    <div style={{ padding: '40px', flex: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>₹399</span>
                        </div>
                        <div style={{ fontSize: '1rem', color: '#4b5563', fontWeight: 500, marginBottom: '24px' }}>for 1 Year</div>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '32px' }}>
                            <CheckCircle2 size={14} /> One-time payment
                        </div>

                        <Link href="/checkout?planId=plan-sl-1&service=sonyliv" style={{ width: '100%', textDecoration: 'none' }}>
                            <button style={{
                                width: '100%',
                                background: '#0f172a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '18px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                marginBottom: '20px',
                                boxShadow: '0 10px 20px rgba(15,23,42,0.2)'
                            }}>
                                <Lock size={20} /> Buy Now Securely
                            </button>
                        </Link>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={24} color="#9ca3af" />
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.4 }}>
                                256-bit SSL Encrypted<br/>Secure & Safe Payment
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="sonyliv-trust-badges" style={{
                    background: '#fff',
                    borderRadius: '24px',
                    border: '1px solid #e5e7eb',
                    padding: '32px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={24} color="#111827" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: '2px' }}>100% Safe & Secure</div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Your data and payments<br/>are fully protected.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Truck size={24} color="#111827" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: '2px' }}>Instant Delivery</div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Access details delivered<br/>instantly to your number.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShieldCheck size={24} color="#111827" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: '2px' }}>Official Subscription</div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Genuine & official SonyLIV<br/>subscription.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Headphones size={24} color="#111827" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: '2px' }}>24/7 Customer Support</div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>We&apos;re here to help you<br/>anytime you need.</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginTop: '40px', background: '#fff', borderRadius: '24px', padding: '40px', border: '1px solid #e5e7eb', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                        <HelpCircle size={26} color="#6d28d9" />
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="chatgpt-plans-grid">
                        {/* Col 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "What is SonyLIV 1 Year Plan?", a: "It's an official premium subscription giving you access to all content, including live sports, movies, and originals in Full HD." },
                                { q: "Will I get access on all devices?", a: "Yes, you can seamlessly watch on your mobile phone, tablet, smart TV, and web browsers." },
                                { q: "Will I get ad-free streaming?", a: "Absolutely! Enjoy an uninterrupted, completely ad-free entertainment experience on Premium." }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    style={{ 
                                        background: faqOpen === i ? '#f8f9fb' : '#fff', 
                                        borderRadius: '16px', 
                                        border: faqOpen === i ? '1px solid #d1d5db' : '1px solid #e5e7eb', 
                                        padding: '24px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: faqOpen === i ? 'inset 0 2px 4px rgba(0,0,0,0.02)' : 'none'
                                    }} 
                                    onClick={() => toggleFaq(i)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = faqOpen === i ? '#d1d5db' : '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 600, color: faqOpen === i ? '#4c1d95' : '#374151', fontSize: '1.05rem', transition: 'color 0.2s ease' }}>{item.q}</div>
                                        <ChevronDown size={20} color={faqOpen === i ? '#4c1d95' : '#9ca3af'} style={{ transform: faqOpen === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '16px', color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Col 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "How will I receive my SonyLIV access?", a: "Access details will be sent instantly and securely to your registered mobile number upon successful payment." },
                                { q: "Is this an official SonyLIV subscription?", a: "Yes, this is a 100% genuine and official subscription directly linked to your phone number." },
                                { q: "Can I renew after 1 year?", a: "Yes, you can easily renew the plan when your current subscription term expires." }
                            ].map((item, i) => (
                                <div 
                                    key={i + 3} 
                                    style={{ 
                                        background: faqOpen === i + 3 ? '#f8f9fb' : '#fff', 
                                        borderRadius: '16px', 
                                        border: faqOpen === i + 3 ? '1px solid #d1d5db' : '1px solid #e5e7eb', 
                                        padding: '24px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: faqOpen === i + 3 ? 'inset 0 2px 4px rgba(0,0,0,0.02)' : 'none'
                                    }} 
                                    onClick={() => toggleFaq(i + 3)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = faqOpen === i + 3 ? '#d1d5db' : '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 600, color: faqOpen === i + 3 ? '#4c1d95' : '#374151', fontSize: '1.05rem', transition: 'color 0.2s ease' }}>{item.q}</div>
                                        <ChevronDown size={20} color={faqOpen === i + 3 ? '#4c1d95' : '#9ca3af'} style={{ transform: faqOpen === i + 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i + 3 ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i + 3 ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '16px', color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Banner CTA */}
                <div className="sonyliv-bottom-cta" style={{
                    background: '#0d1117',
                    borderRadius: '24px',
                    padding: '40px 60px',
                    marginTop: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <img src={LOGO_URL} alt="SonyLIV" style={{ width: '80px', height: '80px', borderRadius: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)' }} />
                        <div>
                            <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px 0' }}>Unlimited Entertainment. Non-Stop Action.</h2>
                            <p style={{ color: '#9ca3af', fontSize: '1.05rem', margin: 0 }}>Enjoy blockbuster movies, exclusive originals,<br/>live sports & more with SonyLIV 1 Year Plan.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Link href="/checkout?planId=plan-sl-1&service=sonyliv" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: '#fcd34d',
                                color: '#111827',
                                border: 'none',
                                padding: '16px 40px',
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(252,211,77,0.2)'
                            }}>
                                Get SonyLIV 1 Year Now <ChevronRight size={20} />
                            </button>
                        </Link>
                        <div style={{ color: '#d1d5db', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span>1 Year Premium Access</span>
                            <div style={{ width: '4px', height: '4px', background: '#d1d5db', borderRadius: '50%' }}></div>
                            <span>Ad-Free Experience</span>
                        </div>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="sonyliv-footer-badges" style={{ padding: '40px 0', borderTop: '1px solid #e5e7eb', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>We Accept:</span>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="VISA" style={{ height: '16px', objectFit: 'contain' }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" style={{ height: '24px', objectFit: 'contain' }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: '16px', objectFit: 'contain' }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" style={{ height: '20px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '0.85rem', color: '#6b7280', marginLeft: '4px' }}>& more</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '60px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Lock size={24} color="#374151" />
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Secure Checkout</div>
                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Encrypted & protected payments</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex' }}>
                                {/* User icons stand-in */}
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d1d5db', border: '2px solid #fff' }}></div>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#9ca3af', border: '2px solid #fff', marginLeft: '-10px' }}></div>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6b7280', border: '2px solid #fff', marginLeft: '-10px' }}></div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Trusted by Thousands</div>
                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Join thousands of satisfied customers.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
