'use client';

import Link from 'next/link';
import { ChevronRight, ChevronDown, ShieldCheck, Download, Tv, MonitorPlay, CheckCircle2, Truck, Headphones, Lock, PlayCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
const LOGO_URL = `${MINIO}/logos/zee5.jpg`;
const HERO_BG = `${MINIO}/slider/ChatGPT%20Image%20May%201%2C%202026%2C%2003_22_47%20AM.png`;

export default function Zee5ProductPage() {
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
                    <span style={{ color: '#111827', fontWeight: 500 }}>ZEE5 1 Year</span>
                </nav>
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Hero Section */}
                <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#0a0a0f',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                    <img 
                        src={HERO_BG} 
                        alt="ZEE5 - Blockbuster Entertainment Unlimited" 
                        style={{ width: '100%', height: 'auto', display: 'block', minHeight: '300px', objectFit: 'cover' }}
                    />
                    {/* Slider dots */}
                    <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fff' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="zee5-main-content" style={{
                    background: '#fff',
                    borderRadius: '24px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.02)'
                }}>
                    
                    {/* Left Col - Features */}
                    <div style={{ padding: '40px', flex: 1, borderRight: '1px solid #e5e7eb' }}>
                        <div className="zee5-main-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                            <img src={`${MINIO}/logos/zee5.png`} alt="ZEE5" style={{ width: '60px', height: '60px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
                            <div>
                                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>ZEE5</h2>
                                <p style={{ margin: 0, fontSize: '1.1rem', color: '#4b5563', fontWeight: 500 }}>1 Year Plan</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                'Access to 150,000+ Movies & Shows',
                                '100+ Live TV Channels',
                                'ZEE5 Originals',
                                'Download & Watch Offline',
                                'Watch on Multiple Devices',
                                'Full HD Streaming',
                                'Official & Secure Subscription'
                            ].map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CheckCircle2 size={20} color="#6d28d9" fill="#ede9fe" />
                                    <span style={{ color: '#4b5563', fontSize: '0.95rem', fontWeight: 500 }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mid Col - Input */}
                    <div style={{ padding: '40px', flex: 1.2, borderRight: '1px solid #e5e7eb' }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Enter Your Mobile Number</h3>
                        <p style={{ margin: '0 0 24px 0', fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.5 }}>
                            We&apos;ll send your ZEE5 premium access details on this number.
                        </p>

                        <div style={{ display: 'flex', marginBottom: '24px' }}>
                            <div style={{
                                background: '#f9fafb',
                                border: '1px solid #d1d5db',
                                borderRight: 'none',
                                borderRadius: '12px 0 0 12px',
                                padding: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#374151',
                                fontWeight: 500
                            }}>
                                +91 <ChevronDown size={14} color="#6b7280" />
                            </div>
                            <input 
                                type="tel" 
                                placeholder="Enter your mobile number" 
                                style={{
                                    flex: 1,
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0 12px 12px 0',
                                    padding: '16px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    color: '#111827'
                                }} 
                            />
                        </div>

                        <div style={{ background: '#f3f4f6', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <Lock size={20} color="#6b7280" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.5 }}>
                                Please double-check your mobile number. Access details will be sent on this number.
                            </p>
                        </div>
                    </div>

                    {/* Right Col - Price & CTA */}
                    <div style={{ padding: '40px', flex: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>₹399</span>
                        </div>
                        <div style={{ fontSize: '1rem', color: '#4b5563', fontWeight: 500, marginBottom: '24px' }}>for 1 Year</div>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', color: '#4b5563', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '32px' }}>
                            <CheckCircle2 size={14} /> One-time payment
                        </div>

                        <button style={{
                            width: '100%',
                            background: '#0a0a0f',
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
                            boxShadow: '0 10px 20px rgba(10,10,15,0.2)'
                        }}>
                            <Lock size={20} /> Buy Now Securely
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={24} color="#9ca3af" />
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.4 }}>
                                256-bit SSL Encrypted<br/>Secure & Safe Payment
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="zee5-trust-badges" style={{
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
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Genuine & official ZEE5<br/>subscription.</div>
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
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <HelpCircle size={22} color="#111827" />
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="chatgpt-plans-grid">
                        {/* Col 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "What is ZEE5 1 Year Plan?", a: "It's an official premium subscription giving you access to 150,000+ Movies & Shows, Live TV, and ZEE5 Originals." },
                                { q: "Will I get access on all devices?", a: "Yes, you can seamlessly watch on your mobile phone, tablet, smart TV, and web browsers." },
                                { q: "Can I download and watch offline?", a: "Yes, you can download content directly within the ZEE5 app to watch offline anytime." }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    style={{ 
                                        background: '#fff', 
                                        borderRadius: '12px', 
                                        border: '1px solid #e5e7eb', 
                                        padding: '24px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                    }} 
                                    onClick={() => toggleFaq(i)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '1.05rem' }}>{item.q}</div>
                                        <ChevronDown size={20} color="#9ca3af" style={{ transform: faqOpen === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '16px', color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Col 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "Is this an official ZEE5 subscription?", a: "Yes, this is a 100% genuine and official subscription directly linked to your phone number." },
                                { q: "How will I receive my ZEE5 access?", a: "Access details will be sent instantly and securely to your registered mobile number upon successful payment." },
                                { q: "Can I renew after 1 year?", a: "Yes, you can easily renew the plan when your current subscription term expires." }
                            ].map((item, i) => (
                                <div 
                                    key={i + 3} 
                                    style={{ 
                                        background: '#fff', 
                                        borderRadius: '12px', 
                                        border: '1px solid #e5e7eb', 
                                        padding: '24px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                    }} 
                                    onClick={() => toggleFaq(i + 3)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '1.05rem' }}>{item.q}</div>
                                        <ChevronDown size={20} color="#9ca3af" style={{ transform: faqOpen === i + 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i + 3 ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i + 3 ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '16px', color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Banner CTA */}
                <div className="zee5-bottom-cta" style={{
                    background: '#0a0a0f',
                    borderRadius: '20px',
                    padding: '30px 40px',
                    marginTop: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={`${MINIO}/logos/zee5.png`} alt="ZEE5" style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0' }}>Unlimited Entertainment. One Destination.</h2>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>Enjoy the best of Movies, Web Series, Originals,<br/>Live TV and more with ZEE5 1 Year Plan.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                        <button style={{
                            background: '#facc15',
                            color: '#111827',
                            border: 'none',
                            padding: '16px 32px',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px rgba(250,204,21,0.2)'
                        }}>
                            Get ZEE5 1 Year Now <ChevronRight size={18} />
                        </button>
                        <div style={{ color: '#d1d5db', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span>1 Year Access</span>
                            <div style={{ width: '4px', height: '4px', background: '#facc15', borderRadius: '50%' }}></div>
                            <span>100+ Live Channels</span>
                            <div style={{ width: '4px', height: '4px', background: '#facc15', borderRadius: '50%' }}></div>
                            <span>150000+ Titles</span>
                        </div>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="zee5-footer-badges" style={{ padding: '40px 0', marginTop: '10px' }}>
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
