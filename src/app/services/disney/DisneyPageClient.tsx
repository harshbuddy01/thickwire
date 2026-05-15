'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, Lock, ChevronDown, ShieldCheck, Zap, Mail, Globe, Headset, Star, Search, UserCheck, Play, HelpCircle, Activity, Smartphone, Monitor, Tv } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function DisneyPageClient({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    const plans = service.plans.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1] || plans[0]; // default to middle plan

    // Ensure state initializes
    if (!selectedPlanId && selectedPlan) {
        setSelectedPlanId(selectedPlan.id);
    }

    const handleBuy = () => {
        if (selectedPlanId) {
            router.push(`/checkout?planId=${selectedPlanId}&service=${service.slug}`);
        }
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-poppins), sans-serif', paddingBottom: '80px' }}>
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container">
                <nav style={{ padding: '20px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>All Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: '#6b7280', fontWeight: 500 }}>Streaming Services</span>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#111827' }}>Disney+ Hotstar</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Banner ────────────────────────────────────── */}
                <div className="hero-image-container" style={{ position: 'relative', width: '100%', background: '#040b16', marginBottom: '40px' }}>
                    <Image
                        src={`${MINIO_URL}/slider/diney+.PNG`}
                        alt="Disney+ Hotstar Banner"
                        fill
                        priority
                        className="hero-banner-image"
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                <div className="service-layout-grid">
                    
                    {/* ─── Left Column (Main Content) ───────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        {/* 1. Choose Your Plan */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', background: '#0a3a82', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>1</div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>Choose Your Hotstar Plan</h2>
                                </div>
                                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>All plans are auto-renewable. Cancel anytime.</span>
                            </div>

                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', marginTop: '-12px' }}>All plans include premium content with the best streaming experience.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                                {plans.map((plan, i) => {
                                    const isSelected = selectedPlanId === plan.id;
                                    const isMostPopular = i === 1;

                                    return (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            style={{
                                                border: `2px solid ${isSelected ? '#0a3a82' : '#e2e8f0'}`,
                                                borderRadius: '16px',
                                                padding: '24px 20px',
                                                background: '#fff',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 10px 25px rgba(10,58,130,0.1)' : 'none',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {isMostPopular && (
                                                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#0a3a82', color: '#fff', padding: '4px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                    Most Popular
                                                </div>
                                            )}
                                            
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px', marginTop: isMostPopular ? '8px' : '0' }}>
                                                <div style={{ background: isSelected ? '#eff6ff' : '#f8fafc', color: isSelected ? '#0a3a82' : '#64748b', padding: '12px', borderRadius: '12px' }}>
                                                    {i === 0 ? <Smartphone size={24} /> : i === 1 ? <Monitor size={24} /> : <Tv size={24} />}
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{plan.name}</h3>
                                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{i === 0 ? '1 Device' : i === 1 ? '2 Devices' : '4 Devices'}</p>
                                                </div>
                                            </div>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem', color: '#475569', flex: 1 }}>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" style={{ flexShrink: 0 }} /> {i === 0 ? 'Mobile & Tablet' : i === 1 ? 'Mobile, TV, Laptop' : 'All Devices'}</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" style={{ flexShrink: 0 }} /> {i === 0 ? 'HD Quality' : i === 1 ? 'Full HD (1080p)' : '4K Ultra HD + Dolby'}</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" style={{ flexShrink: 0 }} /> Disney+ Content</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" style={{ flexShrink: 0 }} /> Live Sports</li>
                                                {i > 0 && <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" style={{ flexShrink: 0 }} /> {i === 1 ? 'Ads-Free (Except Live)' : 'Ads-Free (All Content)'}</li>}
                                            </ul>

                                            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>₹{parseFloat(plan.price).toLocaleString()}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>/ 1 Month</div>
                                                <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>Save {i === 0 ? '25%' : i === 1 ? '40%' : '44%'}</div>
                                            </div>

                                            <button style={{ width: '100%', background: isSelected ? '#0a3a82' : '#fff', color: isSelected ? '#fff' : '#0a3a82', border: `1px solid ${isSelected ? '#0a3a82' : '#cbd5e1'}`, padding: '12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
                                                Buy Now
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <HelpCircle size={24} color="#0a3a82" />
                                    <div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Need Help Choosing Plan?</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Our support team is here to help you select the best plan.</div>
                                    </div>
                                </div>
                                <button style={{ background: '#fff', border: '1px solid #0a3a82', color: '#0a3a82', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <Headset size={16} /> Contact Support
                                </button>
                            </div>
                        </section>

                        {/* 2. How It Works? */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#0a3a82', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>2</div>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>How It Works?</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '10px', borderRadius: '8px' }}><Check size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>1. Choose Plan</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Select the plan that suits your needs.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '10px', borderRadius: '8px' }}><Lock size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>2. Complete Payment</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Secure payment through our trusted gateway.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '10px', borderRadius: '8px' }}><Mail size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>3. Get Access</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Receive your Hotstar account details on email.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '10px', borderRadius: '8px' }}><Play size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>4. Start Streaming</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Login and enjoy unlimited entertainment.</div></div>
                                </div>
                            </div>
                        </section>

                        {/* Dark Blue Stats Bar */}
                        <div style={{ background: '#040b16', borderRadius: '16px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', color: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><UserCheck size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>10,000+</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Happy Customers</div></div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><Star size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>99%</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Positive Reviews</div></div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><Zap size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>5-15 Mins</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Instant Delivery</div></div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><Star size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>4.9/5</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Customer Rating</div></div></div>
                        </div>

                    </div>

                    {/* ─── Right Column (Sidebar) ──────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
                        
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px' }}>
                            <h3 style={{ margin: '0 0 24px 0', fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Order Summary</h3>
                            
                            {selectedPlan && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0, background: 'linear-gradient(135deg, #040b16 0%, #1a0533 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1e3a8a' }}>
                                            <span style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 900, textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.5px' }}>Disney+<br/>Hotstar</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Hotstar {selectedPlan.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>1 Month Subscription</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                            <span>Price</span>
                                            <span style={{ color: '#111827', fontWeight: 600 }}>₹{parseFloat(selectedPlan.price).toLocaleString()}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                            <span>Discount</span>
                                            <span style={{ color: '#10b981', fontWeight: 600 }}>- ₹0</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>Total</span>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>₹{parseFloat(selectedPlan.price).toLocaleString()}</span>
                                    </div>
                                </>
                            )}

                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Delivery Method</div>
                                <div style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a3a82', padding: '8px', borderRadius: '8px' }}><Mail size={18} /></div>
                                    <div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Email Delivery</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Access details will be sent to your email</div></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Delivery Time</div>
                                <div style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f8fafc', color: '#475569', padding: '8px', borderRadius: '8px' }}><Zap size={18} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Instant (5-15 mins)</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Usually within 5-15 minutes after payment</div></div>
                                </div>
                            </div>

                            <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                                <Lock size={16} color="#10b981" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Secure Checkout</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>Your payment is encrypted and 100% secure.</div>
                                </div>
                            </div>

                            {selectedPlan && (
                                <button 
                                    onClick={handleBuy}
                                    style={{ width: '100%', background: '#0a3a82', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '12px', boxShadow: '0 4px 14px rgba(10,58,130,0.3)' }}
                                >
                                    Buy Now — ₹{parseFloat(selectedPlan.price).toLocaleString()}
                                </button>
                            )}
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                30-Day Replacement Guarantee
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>We Accept</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* UPI */}
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><path d="M20 12l8 24h6l-8-24h-6z" fill="#097939"/><path d="M30 12l8 24h6l-8-24h-6z" fill="#ED752E"/><text x="52" y="30" fontSize="12" fontWeight="700" fill="#333" fontFamily="sans-serif">UPI</text></svg>
                                    {/* VISA */}
                                    <svg width="48" height="24" viewBox="0 0 96 48" fill="none"><rect width="96" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="33" fontSize="20" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="sans-serif">VISA</text></svg>
                                    {/* Mastercard */}
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><circle cx="32" cy="24" r="14" fill="#eb001b"/><circle cx="48" cy="24" r="14" fill="#f79e1b"/><path d="M40 13.4a14 14 0 010 21.2 14 14 0 000-21.2z" fill="#ff5f00"/></svg>
                                    {/* PayPal */}
                                    <svg width="56" height="24" viewBox="0 0 112 48" fill="none"><rect width="112" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="31" fontSize="15" fontWeight="800" fill="#003087" fontFamily="sans-serif">Pay</text><text x="44" y="31" fontSize="15" fontWeight="800" fill="#009cde" fontFamily="sans-serif">Pal</text></svg>
                                    {/* Apple Pay */}
                                    <svg width="44" height="24" viewBox="0 0 88 48" fill="none"><rect width="88" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="8" y="32" fontSize="13" fontWeight="600" fill="#000" fontFamily="sans-serif"> Pay</text></svg>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', borderTop: '1px solid #e2e8f0', marginTop: '24px', paddingTop: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldCheck size={20} color="#10b981" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>100% Safe</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>Secure Payments</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UserCheck size={20} color="#3b82f6" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>Trusted by</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>10,000+ Customers</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Headset size={20} color="#6366f1" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>24/7 Support</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>We&apos;re Here</div></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
