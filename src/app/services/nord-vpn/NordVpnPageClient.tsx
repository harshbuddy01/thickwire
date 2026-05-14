'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ChevronDown, ShieldCheck, Zap, Mail, Globe, Headset, Star, Search, UserCheck, Play, HelpCircle, Activity, Smartphone, Server, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function NordVpnPageClient({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    // Group plans exactly as they appear in the DB order
    const plans = service.plans.sort((a, b) => a.id.localeCompare(b.id)); // Keeping creation order or sort by some logic
    const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1] || plans[0]; // default to 1 Year plan

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
                    <span style={{ color: '#6b7280', fontWeight: 500 }}>VPN & Security</span>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#111827' }}>NordVPN</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Banner ────────────────────────────────────── */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#09152b', // Dark blue matching NordVPN
                    marginBottom: '24px'
                }}>
                    <img src={`${MINIO_URL}/slider/9F224C95-172A-4D32-A4FD-CB37A31E7AB3.PNG`} alt="NordVPN Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                {/* ─── Info Strip ─────────────────────────────────────── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', background: '#fff', padding: '20px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '50%' }}><Zap size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Instant Delivery</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Get access instantly</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '50%' }}><ShieldCheck size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Secure & Safe</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>100% secure payments</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '50%' }}><UserCheck size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Trusted by Thousands</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>10,000+ happy customers</div></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '50%' }}><RefreshCcw size={20} /></div>
                        <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Refund Policy</div><div style={{ fontSize: '0.75rem', color: '#6b7280' }}>30-day money back</div></div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
                    
                    {/* ─── Left Column (Main Content) ───────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        {/* 1. Choose Your Plan */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>1</div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>Choose Your Plan</h2>
                                </div>
                                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Save more with longer plans!</span>
                            </div>

                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>All plans are delivered instantly after purchase.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                {plans.map((plan, i) => {
                                    const isSelected = selectedPlanId === plan.id;
                                    const isMostPopular = i === 1;

                                    // Parse plan name to match mockup styling
                                    let durationTitle = '1 Month';
                                    let subTitle = 'Standard Plan';
                                    if (plan.name.includes('1 Year Best Value')) { durationTitle = '1 Year'; subTitle = 'Best Value'; }
                                    if (plan.name.includes('2 Years')) { durationTitle = '2 Years'; subTitle = 'Maximum Savings'; }
                                    if (plan.name.includes('Family')) { durationTitle = '1 Year'; subTitle = 'Family Plan'; }

                                    const priceUsd = (parseFloat(plan.price) / 84).toFixed(2);

                                    return (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            style={{
                                                border: `2px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                                                borderRadius: '16px',
                                                padding: '24px 16px',
                                                background: isSelected ? '#f8fafc' : '#fff',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 10px 25px rgba(37,99,235,0.1)' : 'none',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            {isMostPopular && (
                                                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#fff', padding: '4px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                                    Most Popular
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px', marginTop: isMostPopular ? '8px' : '0' }}>
                                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2563eb' }} />}
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{durationTitle}</h3>
                                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>{subTitle}</p>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>₹{parseFloat(plan.price).toLocaleString()}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>/ ${priceUsd} total</div>
                                            </div>

                                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#475569', flex: 1 }}>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> {i === 3 ? '10 Devices' : i === 0 ? '1 Device' : '6 Devices'}</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> 30-Day Warranty</li>
                                                <li style={{ display: 'flex', gap: '8px' }}><Check size={14} color="#10b981" /> Instant Delivery</li>
                                            </ul>

                                            <div style={{ width: '100%', background: isSelected ? '#2563eb' : '#fff', color: isSelected ? '#fff' : '#2563eb', border: `1px solid ${isSelected ? '#2563eb' : '#cbd5e1'}`, padding: '10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, textAlign: 'center' }}>
                                                ₹{parseFloat(plan.price).toLocaleString()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 2. How It Works? */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#2563eb', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>2</div>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>How It Works?</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '8px' }}><Lock size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>1 Complete Payment</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Choose your plan and complete the payment.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '8px' }}><Mail size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>2 Receive Access</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>You will receive your NordVPN access details.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '8px' }}><Play size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>3 Login & Connect</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Login to NordVPN and connect to any server.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '10px', borderRadius: '8px' }}><ShieldCheck size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>4 Enjoy Secure Browsing</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>Your connection is secure and your privacy is protected.</div></div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose NordVPN? */}
                        <section>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 20px 0', color: '#111827' }}>Why Choose NordVPN?</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><Lock size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Military-Grade Encryption</div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><ShieldCheck size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Strict No-Logs Policy</div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><Server size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>6,000+ Servers in 111 Countries</div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><Smartphone size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Protect up to 6 Devices</div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><Globe size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Works on All Platforms</div>
                                </div>
                                <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ background: '#eff6ff', color: '#2563eb', padding: '12px', borderRadius: '50%' }}><RefreshCcw size={20} /></div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>30-Day Money Back Guarantee</div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* ─── Right Column (Sidebar) ──────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
                        
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#e2e8f0', color: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>3</div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Order Summary</h3>
                            </div>
                            
                            {selectedPlan && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid #e2e8f0', background: '#2563eb' }}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/dd/NordVPN_logo.png" alt="NordVPN Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                                        </div>
                                            <div>
                                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>NordVPN</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedPlan.name}</div>
                                            </div>
                                        </div>
                                        {selectedPlanId === plans[1]?.id && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>Save 62%</div>}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                            <span>Plan Price</span>
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
                                <div style={{ border: '1px solid #2563eb', background: '#eff6ff', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: '#2563eb' }}><Mail size={20} /></div>
                                    <div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Email Delivery</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Access details will be sent to your email</div></div>
                                    <div style={{ color: '#2563eb' }}><Check size={18} /></div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Delivery Time</div>
                                <div style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: '#475569' }}><Zap size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Instant (5-15 mins)</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>Usually within 5-15 minutes after payment</div></div>
                                </div>
                            </div>

                            <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                                <Lock size={16} color="#8b5cf6" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>100% Secure Checkout</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>Your payment information is encrypted and securely processed.</div>
                                </div>
                            </div>

                            {selectedPlan && (
                                <button 
                                    onClick={handleBuy}
                                    style={{ width: '100%', background: '#2563eb', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '12px', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' }}
                                >
                                    Buy Now — ₹{parseFloat(selectedPlan.price).toLocaleString()}
                                </button>
                            )}
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <Lock size={12} /> Secure checkout + SSL Encrypted
                            </div>

                            <div style={{ marginTop: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                    {/* VISA */}
                                    <svg width="48" height="24" viewBox="0 0 96 48" fill="none"><rect width="96" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="33" fontSize="20" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="sans-serif">VISA</text></svg>
                                    {/* Mastercard */}
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><circle cx="32" cy="24" r="14" fill="#eb001b"/><circle cx="48" cy="24" r="14" fill="#f79e1b"/><path d="M40 13.4a14 14 0 010 21.2 14 14 0 000-21.2z" fill="#ff5f00"/></svg>
                                    {/* PayPal */}
                                    <svg width="56" height="24" viewBox="0 0 112 48" fill="none"><rect width="112" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="31" fontSize="15" fontWeight="800" fill="#003087" fontFamily="sans-serif">Pay</text><text x="44" y="31" fontSize="15" fontWeight="800" fill="#009cde" fontFamily="sans-serif">Pal</text></svg>
                                    {/* Apple Pay */}
                                    <svg width="44" height="24" viewBox="0 0 88 48" fill="none"><rect width="88" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="8" y="32" fontSize="13" fontWeight="600" fill="#000" fontFamily="sans-serif"> Pay</text></svg>
                                    {/* Google Pay */}
                                    <svg width="50" height="24" viewBox="0 0 100 48" fill="none"><rect width="100" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="10" y="32" fontSize="14" fontWeight="600" fill="#EA4335" fontFamily="sans-serif">G</text><text x="24" y="32" fontSize="14" fontWeight="600" fill="#5F6368" fontFamily="sans-serif"> Pay</text></svg>
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', borderTop: '1px solid #e2e8f0', marginTop: '24px', paddingTop: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldCheck size={20} color="#10b981" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>Trusted by</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>10,000+ Customers</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Star size={20} color="#f59e0b" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>4.9/5</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>Customer Rating</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Headset size={20} color="#6366f1" />
                                    <div><div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111827' }}>24/7</div><div style={{ fontSize: '0.65rem', color: '#64748b' }}>Live Support</div></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
