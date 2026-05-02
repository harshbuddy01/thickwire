'use client';

import Link from 'next/link';
import { ChevronRight, ChevronDown, ShieldCheck, Cloud, Zap, Monitor, CheckCircle2, Truck, Headphones, Lock, Sparkles, HelpCircle, User } from 'lucide-react';
import { useState } from 'react';

const GEMINI_LOGO = 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg';

export default function GeminiProductPage() {
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
                    <Link href="/streaming" style={{ color: '#6b7280', textDecoration: 'none' }}>AI Tools</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#111827', fontWeight: 500 }}>Google Gemini Pro</span>
                </nav>
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Top Section - Hero */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '32px',
                    border: '1px solid #f3f4f6',
                    padding: '50px',
                    display: 'flex',
                    gap: '60px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.03)'
                }}>
                    
                    {/* Left & Middle Wrapper */}
                    <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        
                        {/* Top: Image + Content */}
                        <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
                            {/* Gemini Image Block */}
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <div style={{ 
                                    width: '280px', 
                                    height: '280px', 
                                    background: 'linear-gradient(145deg, #131314 0%, #1e1e20 100%)',
                                    borderRadius: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 24px 48px rgba(19,19,20,0.15)'
                                }}>
                                    <img src={GEMINI_LOGO} alt="Gemini" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    left: '30px',
                                    background: '#1f2937',
                                    padding: '12px 24px',
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 600 }}>Gemini</span>
                                    </div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '-2px' }}>
                                        by <span style={{ color: '#4285f4', fontWeight: 700 }}>G</span><span style={{ color: '#ea4335', fontWeight: 700 }}>o</span><span style={{ color: '#fbbc05', fontWeight: 700 }}>o</span><span style={{ color: '#4285f4', fontWeight: 700 }}>g</span><span style={{ color: '#34a853', fontWeight: 700 }}>l</span><span style={{ color: '#ea4335', fontWeight: 700 }}>e</span>
                                    </div>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div style={{ paddingTop: '10px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f8f9fa', padding: '8px 16px', borderRadius: '100px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
                                    <ShieldCheck size={16} color="#4b5563" />
                                    <span style={{ color: '#4b5563', fontSize: '0.9rem', fontWeight: 600 }}>Official Google AI</span>
                                </div>
                                <h1 style={{ color: '#111827', fontSize: '3.2rem', fontWeight: 800, margin: '0 0 24px 0', lineHeight: 1.1, letterSpacing: '-1px' }}>
                                    Google <span style={{ background: 'linear-gradient(90deg, #4285f4 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gemini</span> Pro
                                </h1>
                                <p style={{ color: '#4b5563', fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                                    Supercharge your productivity with Gemini Pro. Get advanced AI capabilities, priority access to the latest models, and 5 TB of storage across Google Drive, Gmail & Google Photos.
                                </p>
                            </div>
                        </div>

                        {/* 5 Icons Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '60px', paddingRight: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Sparkles size={32} color="#3b82f6" strokeWidth={1.5} />
                                <span style={{ color: '#4b5563', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>Advanced<br/>AI Models</span>
                            </div>
                            <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Cloud size={32} color="#3b82f6" strokeWidth={1.5} />
                                <span style={{ color: '#4b5563', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>5 TB<br/>Storage</span>
                            </div>
                            <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <ShieldCheck size={32} color="#3b82f6" strokeWidth={1.5} />
                                <span style={{ color: '#4b5563', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>Secure &<br/>Reliable</span>
                            </div>
                            <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Zap size={32} color="#3b82f6" strokeWidth={1.5} />
                                <span style={{ color: '#4b5563', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>Priority<br/>Access</span>
                            </div>
                            <div style={{ width: '1px', height: '40px', background: '#e5e7eb' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Monitor size={32} color="#3b82f6" strokeWidth={1.5} />
                                <span style={{ color: '#4b5563', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600, lineHeight: 1.3 }}>Works on All<br/>Your Devices</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Why Choose Card */}
                    <div style={{ flex: 1, background: '#fafafb', border: '1px solid #f3f4f6', borderRadius: '32px', padding: '40px' }}>
                        <h3 style={{ margin: '0 0 32px 0', fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>Why Choose Gemini Pro?</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Sparkles size={24} color="#3b82f6" />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Access to Gemini 1.5 Pro</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>Our most capable model for complex tasks</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Cloud size={24} color="#3b82f6" />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>5 TB of Storage</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>Across Drive, Gmail & Google Photos</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Zap size={24} color="#3b82f6" />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Enhanced Productivity</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>Write, research, analyze & create with AI</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Sparkles size={24} color="#3b82f6" />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Priority Access</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5 }}>Get early access to new features & updates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content / Checkout Section */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '32px',
                    border: '1px solid #fde047',
                    display: 'flex',
                    boxShadow: '0 12px 32px rgba(250,204,21,0.08)'
                }}>
                    
                    {/* Left Col - Features */}
                    <div style={{ padding: '50px', flex: 1.3, borderRight: '1px solid #fef08a' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '40px' }}>
                            <div style={{ 
                                width: '120px', 
                                height: '120px', 
                                background: 'linear-gradient(145deg, #131314 0%, #1e1e20 100%)',
                                borderRadius: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: '0 16px 32px rgba(19,19,20,0.15)'
                            }}>
                                <img src={GEMINI_LOGO} alt="Gemini" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                            </div>
                            <div style={{ paddingTop: '8px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef08a', color: '#854d0e', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                    <Sparkles size={14} /> BEST VALUE
                                </div>
                                <h2 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>Gemini Pro</h2>
                                <p style={{ margin: '0 0 20px 0', fontSize: '1.2rem', color: '#4b5563', fontWeight: 600 }}>18 Months Plan</p>
                                
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #bfdbfe', background: '#eff6ff', color: '#2563eb', padding: '8px 16px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600 }}>
                                    <Cloud size={16} /> 5 TB Storage
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginLeft: '10px' }}>
                            {[
                                'Access to Gemini 1.5 Pro',
                                '5 TB Storage (Drive, Gmail & Photos)',
                                'Priority Access to New Features',
                                'Works on Web, Mobile & Desktop',
                                'Official & Secure Subscription'
                            ].map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircle2 size={16} color="#16a34a" />
                                    </div>
                                    <span style={{ color: '#374151', fontSize: '1.05rem', fontWeight: 500 }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col - Price & CTA */}
                    <div style={{ padding: '50px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafb', borderTopRightRadius: '32px', borderBottomRightRadius: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '4.5rem', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-2px' }}>₹550</span>
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#4b5563', fontWeight: 500, marginBottom: '32px' }}>for 18 Months</div>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', color: '#4b5563', padding: '10px 20px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '40px', border: '1px solid #e5e7eb' }}>
                            One-time payment
                        </div>

                        <Link href="/checkout" style={{ width: '100%', textDecoration: 'none' }}>
                            <button style={{
                                width: '100%',
                                background: '#111827',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '20px',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                marginBottom: '24px',
                                boxShadow: '0 16px 32px rgba(17,24,39,0.2)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(17,24,39,0.25)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(17,24,39,0.2)' }}
                            >
                                <Lock size={20} /> Buy Now Securely
                            </button>
                        </Link>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={28} color="#9ca3af" strokeWidth={1.5} />
                            <div style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                                256-bit SSL Encrypted<br/>Secure & Safe Payment
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '32px',
                    border: '1px solid #e5e7eb',
                    padding: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <ShieldCheck size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>100% Safe & Secure</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>Your data and payments<br/>are fully protected.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <Truck size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>Instant Delivery</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>Access details delivered<br/>instantly to your email.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <ShieldCheck size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>Official Subscription</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>Genuine Google subscription<br/>with direct access.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <Headphones size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>24/7 Customer Support</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>We&apos;re here to help you<br/>anytime you need.</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <HelpCircle size={28} color="#111827" strokeWidth={2} />
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="chatgpt-plans-grid">
                        {/* Col 1 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { q: "What is Gemini Pro?", a: "Gemini Pro is Google&apos;s highly capable AI model. This subscription gives you priority access to Gemini Advanced capabilities, directly integrated into Google Workspace apps." },
                                { q: "What's included in the 5 TB storage?", a: "You get 5 TB of unified cloud storage that is shared across Google Drive, Gmail, and Google Photos for all your files and memories." },
                                { q: "Can I use Gemini Pro on multiple devices?", a: "Yes, your subscription is linked to your Google Account, allowing you to access Gemini Pro across all your web browsers, mobile phones, and tablets seamlessly." }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    style={{ 
                                        background: '#ffffff', 
                                        borderRadius: '20px', 
                                        border: '1px solid #e5e7eb', 
                                        padding: '32px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                    }} 
                                    onClick={() => toggleFaq(i)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>{item.q}</div>
                                        <ChevronDown size={24} color="#9ca3af" style={{ transform: faqOpen === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '20px', color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Col 2 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { q: "Will I get access to the latest features?", a: "Yes! Subscribers get priority access to new AI features, faster response times, and the latest model updates released by Google." },
                                { q: "Is this an official Google subscription?", a: "Yes, this is an official and 100% genuine Google subscription plan provisioned securely." },
                                { q: "What happens after 18 months?", a: "After your 18-month plan concludes, you will have the option to easily renew the subscription to maintain your Gemini access and 5 TB storage." }
                            ].map((item, i) => (
                                <div 
                                    key={i + 3} 
                                    style={{ 
                                        background: '#ffffff', 
                                        borderRadius: '20px', 
                                        border: '1px solid #e5e7eb', 
                                        padding: '32px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                    }} 
                                    onClick={() => toggleFaq(i + 3)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>{item.q}</div>
                                        <ChevronDown size={24} color="#9ca3af" style={{ transform: faqOpen === i + 3 ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i + 3 ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                                        opacity: faqOpen === i + 3 ? 1 : 0
                                    }}>
                                        <div style={{ paddingTop: '20px', color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Banner CTA */}
                <div style={{
                    background: 'linear-gradient(145deg, #131314 0%, #1e1e20 100%)',
                    borderRadius: '32px',
                    padding: '40px 50px',
                    marginTop: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <div style={{ width: '90px', height: '90px', background: '#1f2937', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img src={GEMINI_LOGO} alt="Gemini" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h2 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>Unlock the power of Google&apos;s most advanced AI</h2>
                            <p style={{ color: '#9ca3af', fontSize: '1.05rem', margin: 0, fontWeight: 500 }}>Get Gemini Pro + 5 TB Storage and experience<br/>next-generation productivity.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                        <Link href="/checkout" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'linear-gradient(to right, #fdf0ba, #fcd34d)',
                                color: '#111827',
                                border: 'none',
                                padding: '20px 40px',
                                borderRadius: '100px',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                boxShadow: '0 16px 32px rgba(250,204,21,0.25)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                            >
                                Get Gemini Pro Now <ChevronRight size={20} strokeWidth={2.5} />
                            </button>
                        </Link>
                        <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span>18 Months Access</span>
                            <div style={{ width: '5px', height: '5px', background: '#6b7280', borderRadius: '50%' }}></div>
                            <span>5 TB Storage</span>
                        </div>
                    </div>
                </div>

                {/* Footer Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '50px 20px', marginTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>We Accept:</span>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="VISA" style={{ height: '18px', objectFit: 'contain', opacity: 0.8 }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" style={{ height: '26px', objectFit: 'contain', opacity: 0.8 }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: '18px', objectFit: 'contain', opacity: 0.8 }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" style={{ height: '22px', objectFit: 'contain', opacity: 0.8 }} />
                            <span style={{ fontSize: '0.85rem', color: '#9ca3af', marginLeft: '4px', fontWeight: 500 }}>& more</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '80px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '12px' }}>
                                <Lock size={24} color="#374151" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Secure Checkout</div>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>Encrypted & protected payments</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e5e7eb', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16} color="#6b7280" /></div>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#d1d5db', border: '2px solid #fff', marginLeft: '-12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16} color="#4b5563" /></div>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#9ca3af', border: '2px solid #fff', marginLeft: '-12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16} color="#374151" /></div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Trusted by Thousands</div>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>Join thousands of satisfied customers.</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
