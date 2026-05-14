'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ChevronDown, ShieldCheck, Zap, Mail, Globe, Headset, Star, Search, UserCheck, Play, HelpCircle, Activity } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function LinkedinPageClient({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    const plans = service.plans.sort((a, b) => a.durationDays - b.durationDays);
    const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1] || plans[0]; // default to middle plan (3 months)

    // Ensure state initializes to middle plan
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
                    <span style={{ color: '#6b7280', fontWeight: 500 }}>Business Tools</span>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#111827' }}>LinkedIn Premium</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Banner ────────────────────────────────────── */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#0e2a5f',
                    marginBottom: '24px'
                }}>
                    <img src={`${MINIO_URL}/slider/F77E7AE2-0D15-43E3-A697-0C0C72D45B90.PNG`} alt="LinkedIn Premium Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                {/* ─── Info Strip ─────────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', background: '#fff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '50%' }}><Zap size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Instant Delivery</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Get access within 5-15 minutes</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '50%' }}><ShieldCheck size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Secure Payments</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>100% safe & secure transactions</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '50%' }}><Globe size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Worldwide Access</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Use your account anywhere</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '50%' }}><Headset size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Premium Support</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>24/7 expert support whenever you need</div></div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
                    
                    {/* ─── Left Column (Main Content) ───────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        {/* 1. Choose Your Plan */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', background: '#0a66c2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>1</div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>Choose Your Plan</h2>
                                </div>
                                <span style={{ background: '#eff6ff', color: '#0a66c2', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Save more with longer plans!</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                {plans.map((plan, i) => {
                                    const isSelected = selectedPlanId === plan.id;
                                    const isMostPopular = i === 1;

                                    return (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            style={{
                                                border: `2px solid ${isSelected ? '#0a66c2' : '#e2e8f0'}`,
                                                borderRadius: '16px',
                                                padding: '24px 20px',
                                                background: '#fff',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 10px 25px rgba(10,102,194,0.1)' : 'none'
                                            }}
                                        >
                                            {isMostPopular && (
                                                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#0a66c2', color: '#fff', padding: '4px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                    ★ Most Popular
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', marginTop: isMostPopular ? '8px' : '0' }}>
                                                <div style={{ background: isSelected ? '#eff6ff' : '#f8fafc', color: isSelected ? '#0a66c2' : '#64748b', padding: '10px', borderRadius: '50%' }}>
                                                    <UserCheck size={20} />
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>{plan.name.split(' ')[0]} {plan.name.split(' ')[1]}</h3>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{i === 0 ? 'Private Access' : i === 1 ? 'Best Value' : 'Maximum Benefits'}</p>
                                                </div>
                                            </div>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#475569' }}>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> Full Premium Features</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> InMail Messaging</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> Profile Insights</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> Instant Delivery</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> 30-Day Warranty</li>
                                            </ul>

                                            <div style={{ marginBottom: '16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>₹{parseFloat(plan.price).toLocaleString()}</span>
                                                    <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>/ ${(parseFloat(plan.price) / 84).toFixed(0)}</span>
                                                </div>
                                            </div>

                                            <button style={{ width: '100%', background: isSelected ? '#0a66c2' : '#fff', color: isSelected ? '#fff' : '#0a66c2', border: `1px solid ${isSelected ? '#0a66c2' : '#cbd5e1'}`, padding: '10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
                                                Buy Now
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 2. How It Works? */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#0a66c2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>2</div>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>How It Works?</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '8px' }}><Lock size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>1 Complete Payment</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Choose your plan and complete the payment securely.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '8px' }}><Mail size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>2 Receive Access</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>You will receive your LinkedIn Premium access on your email.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '8px' }}><Play size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>3 Login & Activate</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Login to your LinkedIn account and activate Premium.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '10px', borderRadius: '8px' }}><Activity size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>4 Start Growing</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Enjoy all Premium features and grow your professional network.</div></div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Why Choose LinkedIn Premium? */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#0a66c2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>3</div>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>Why Choose LinkedIn Premium?</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '12px', borderRadius: '50%' }}><Search size={20} /></div>
                                    <div><div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Advanced Search</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Find the right people and opportunities.</div></div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '12px', borderRadius: '50%' }}><Mail size={20} /></div>
                                    <div><div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>InMail Messaging</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Message anyone directly with InMail.</div></div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '12px', borderRadius: '50%' }}><Activity size={20} /></div>
                                    <div><div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Profile Analytics</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>Track your profile views, growth and insights.</div></div>
                                </div>
                            </div>
                        </section>

                        {/* Dark Blue Stats Bar */}
                        <div style={{ background: '#0e2a5f', borderRadius: '16px', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', color: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><UserCheck size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>10K+</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Happy Customers</div></div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><Activity size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>98%</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Success Rate</div></div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><div style={{ opacity: 0.8 }}><Headset size={32} /></div><div><div style={{ fontSize: '1.4rem', fontWeight: 800 }}>24/7</div><div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Live Support</div></div></div>
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
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid #e2e8f0', background: '#0a66c2' }}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>LinkedIn Premium</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedPlan.name}</div>
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
                                <div style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#0a66c2', padding: '8px', borderRadius: '8px' }}><Mail size={18} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Email Delivery</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Access details will be sent to your email</div></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Delivery Time</div>
                                <div style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f8fafc', color: '#475569', padding: '8px', borderRadius: '8px' }}><Zap size={18} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Instant (5-15 mins)</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Usually within 5-15 minutes after payment</div></div>
                                </div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                                <Lock size={16} color="#0a66c2" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Secure Checkout</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>Your payment information is encrypted and securely processed.</div>
                                </div>
                            </div>

                            {selectedPlan && (
                                <button 
                                    onClick={handleBuy}
                                    style={{ width: '100%', background: '#0a66c2', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '12px', boxShadow: '0 4px 14px rgba(10,102,194,0.3)' }}
                                >
                                    Buy Now — ₹{parseFloat(selectedPlan.price).toLocaleString()}
                                </button>
                            )}
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <Lock size={12} /> SSL Secured Checkout
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>We Accept</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* UPI */}
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><path d="M20 12l8 24h6l-8-24h-6z" fill="#097939"/><path d="M30 12l8 24h6l-8-24h-6z" fill="#ED752E"/><text x="52" y="30" fontSize="12" fontWeight="700" fill="#333" fontFamily="sans-serif">UPI</text></svg>
                                    {/* PayPal */}
                                    <svg width="56" height="24" viewBox="0 0 112 48" fill="none"><rect width="112" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="31" fontSize="15" fontWeight="800" fill="#003087" fontFamily="sans-serif">Pay</text><text x="44" y="31" fontSize="15" fontWeight="800" fill="#009cde" fontFamily="sans-serif">Pal</text></svg>
                                    {/* VISA */}
                                    <svg width="48" height="24" viewBox="0 0 96 48" fill="none"><rect width="96" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="33" fontSize="20" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="sans-serif">VISA</text></svg>
                                    {/* Mastercard */}
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><circle cx="32" cy="24" r="14" fill="#eb001b"/><circle cx="48" cy="24" r="14" fill="#f79e1b"/><path d="M40 13.4a14 14 0 010 21.2 14 14 0 000-21.2z" fill="#ff5f00"/></svg>
                                    {/* Apple Pay */}
                                    <svg width="44" height="24" viewBox="0 0 88 48" fill="none"><rect width="88" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="8" y="32" fontSize="13" fontWeight="600" fill="#000" fontFamily="sans-serif"> Pay</text></svg>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
