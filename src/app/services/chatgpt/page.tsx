'use client';

import Link from 'next/link';
import { ChevronRight, ChevronDown, ShieldCheck, Zap, Brain, Monitor, CheckCircle2, Truck, Headphones, Lock, ShoppingCart, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
const HERO_BANNER = `${MINIO}/slider/file_00000000a6587208abda7443e39b8c5d.png`;
const CHATGPT_LOGO = `${MINIO}/logos/chatgpt.png`; // Fallback, or I can use an SVG

export default function ChatGPTProductPage() {
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
                    <span style={{ color: '#111827', fontWeight: 500 }}>ChatGPT</span>
                </nav>
            </div>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* Hero Banner Image */}
                <div style={{
                    width: '100%',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.1)',
                    background: '#131314',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img 
                        src={HERO_BANNER} 
                        alt="ChatGPT Plus - Smarter Answers, Write Better" 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>

                {/* Pricing Plans Section */}
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Choose Your Plan</h2>
                    <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: '0 0 32px 0', fontWeight: 500 }}>Simple plans. Powerful AI.</p>

                    <div className="chatgpt-plans-grid">
                        
                        {/* Plan 1 */}
                        <div style={{ 
                            background: '#131314', 
                            borderRadius: '24px', 
                            padding: '40px 32px', 
                            display: 'flex', 
                            flexDirection: 'column',
                            border: '1px solid #374151',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', border: '1px solid #4b5563', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.5px', marginBottom: '24px' }}>
                                PLUS PLAN
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>1 Month</span>
                                <span style={{ fontSize: '1rem', color: '#9ca3af' }}>(Private)</span>
                            </div>
                            
                            <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '32px' }}>₹499</div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Private Account</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Full Access to GPT-4o & Latest Models</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Priority Response</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Works on All Devices</span>
                                </div>
                            </div>
                            
                            <Link href="/checkout" style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                <button style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: '1px solid #D4AF37',
                                    color: '#D4AF37',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(253, 224, 71, 0.1)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                                >
                                    <ShoppingCart size={18} /> Buy Now
                                </button>
                            </Link>
                        </div>

                        {/* Plan 2 */}
                        <div style={{ 
                            background: '#131314', 
                            borderRadius: '24px', 
                            padding: '40px 32px', 
                            display: 'flex', 
                            flexDirection: 'column',
                            border: '2px solid #D4AF37',
                            boxShadow: '0 20px 40px rgba(253, 224, 71, 0.15)',
                            position: 'relative',
                            transform: 'scale(1.02)'
                        }}>
                            <div style={{ position: 'absolute', top: '-14px', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ background: '#D4AF37', color: '#111827', padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                    Most Popular
                                </div>
                            </div>

                            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', background: '#D4AF37', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, color: '#111827', letterSpacing: '0.5px', marginBottom: '24px' }}>
                                PLUS PLAN
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>3 Months</span>
                                <span style={{ fontSize: '1rem', color: '#9ca3af' }}>(1 Device)</span>
                            </div>
                            
                            <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '32px' }}>₹799</div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>1 Device Access</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Full Access to GPT-4o & Latest Models</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Priority Response</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Regular Updates</span>
                                </div>
                            </div>
                            
                            <Link href="/checkout" style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                <button style={{
                                    width: '100%',
                                    background: 'linear-gradient(to right, #F3E5AB, #D4AF37)',
                                    border: 'none',
                                    color: '#111827',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '1.05rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 8px 24px rgba(253, 224, 71, 0.3)'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    <ShoppingCart size={18} /> Buy Now
                                </button>
                            </Link>
                        </div>

                        {/* Plan 3 */}
                        <div style={{ 
                            background: '#131314', 
                            borderRadius: '24px', 
                            padding: '40px 32px', 
                            display: 'flex', 
                            flexDirection: 'column',
                            border: '1px solid #374151',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '16px', right: '-30px', background: '#D4AF37', color: '#111827', padding: '6px 40px', transform: 'rotate(45deg)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                                BEST VALUE
                            </div>

                            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', border: '1px solid #4b5563', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.5px', marginBottom: '24px' }}>
                                PLUS PLAN
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>6 Months</span>
                                <span style={{ fontSize: '1rem', color: '#9ca3af' }}>(1 Device)</span>
                            </div>
                            
                            <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '32px' }}>₹1499</div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, marginBottom: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>1 Device Access</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Full Access to GPT-4o & Latest Models</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Priority Response</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <CheckCircle2 size={12} color="#111" />
                                    </div>
                                    <span style={{ color: '#e5e7eb', fontSize: '0.95rem' }}>Regular Updates</span>
                                </div>
                            </div>
                            
                            <Link href="/checkout" style={{ textDecoration: 'none', marginTop: 'auto' }}>
                                <button style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: '1px solid #D4AF37',
                                    color: '#D4AF37',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(253, 224, 71, 0.1)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                                >
                                    <ShoppingCart size={18} /> Buy Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Info & FAQ Layout */}
                <div className="chatgpt-info-faq-layout">
                    
                    {/* Left: Why Choose */}
                    <div style={{ flex: 1, background: '#fff', borderRadius: '32px', padding: '40px', border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 32px 0', fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Why Choose ChatGPT Plus?</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Zap size={24} color="#111827" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Smarter & Faster</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Get quicker, more accurate responses with advanced AI.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Brain size={24} color="#111827" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Advanced AI Models</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Access GPT-4o and the latest models for better results.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <ShieldCheck size={24} color="#111827" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Private & Secure</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Your chats and data are private and protected.</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Monitor size={24} color="#111827" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div style={{ color: '#111827', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>Works Everywhere</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5 }}>Use ChatGPT on web, mobile, tablet, and desktop.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: FAQ */}
                    <div style={{ flex: 1.2 }}>
                        <h3 style={{ margin: '0 0 24px 0', fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Frequently Asked Questions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { q: "What is ChatGPT Plus?", a: "ChatGPT Plus is a premium subscription that gives you priority access to OpenAI's most advanced models, including GPT-4o, with faster response times and higher usage limits." },
                                { q: "What models are included in Plus Plan?", a: "You get full access to the latest GPT-4o, GPT-4, and advanced data analysis tools, vision capabilities, and web browsing." },
                                { q: "Can I use my account on multiple devices?", a: "Depending on the plan you choose (Private vs 1 Device), you can use it on your authorized devices like your laptop, phone, and tablet." },
                                { q: "Is my payment information secure?", a: "Yes, all payments are processed through bank-grade 256-bit SSL encryption. We do not store your credit card details." },
                                { q: "Can I upgrade or change my plan later?", a: "Absolutely. You can easily upgrade to a longer duration plan or a fully private account at any time through your dashboard." }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    style={{ 
                                        background: '#ffffff', 
                                        borderRadius: '16px', 
                                        border: '1px solid #e5e7eb', 
                                        padding: '24px 32px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }} 
                                    onClick={() => toggleFaq(i)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{item.q}</div>
                                        <ChevronDown size={20} color="#9ca3af" style={{ transform: faqOpen === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                                    </div>
                                    <div style={{ 
                                        maxHeight: faqOpen === i ? '200px' : '0', 
                                        overflow: 'hidden', 
                                        transition: 'max-height 0.3s ease',
                                        opacity: faqOpen === i ? 1 : 0
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

                {/* Trust Badges */}
                <div className="chatgpt-trust-badges">
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
                            <CheckCircle2 size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>Best Price Guarantee</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>Get the best services at<br/>the lowest prices.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <Zap size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>Instant Delivery</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>Quick activation &<br/>instant access.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                            <Headphones size={28} color="#111827" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem', marginBottom: '4px' }}>24/7 Customer Support</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.4 }}>We're here anytime<br/>you need us.</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Banner CTA */}
                <div className="chatgpt-bottom-cta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 2 }}>
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="#111"/>
                            </svg>
                        </div>
                        <div>
                            <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Ready to experience the power of AI?</h2>
                            <p style={{ color: '#9ca3af', fontSize: '1.05rem', margin: 0, fontWeight: 500 }}>Choose a plan and boost your productivity with ChatGPT.</p>
                        </div>
                    </div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Link href="/checkout" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'linear-gradient(to right, #fdf0ba, #fcd34d)',
                                color: '#111827',
                                border: 'none',
                                padding: '18px 40px',
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                boxShadow: '0 16px 32px rgba(250,204,21,0.2)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                            >
                                Choose Your Plan <ChevronRight size={20} strokeWidth={2.5} />
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
