'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, ChevronDown, HelpCircle, ShieldCheck, Zap, Mail, LayoutTemplate, Star, Crown } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function CapCutPageClient({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    // Group plans
    const month1Plan = service.plans.find(p => p.durationDays === 30 || p.durationDays === 31 || p.name.includes('1 Month'));
    const multiMonthPlans = service.plans.filter(p => p.id !== month1Plan?.id).sort((a, b) => a.durationDays - b.durationDays);

    const handleBuy = (planId: string) => {
        router.push(`/checkout?planId=${planId}&service=${service.slug}`);
    };

    return (
        <div style={{ background: '#fcfcfc', minHeight: '100vh', fontFamily: 'var(--font-poppins), sans-serif', paddingBottom: '80px' }}>
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container">
                <nav style={{ padding: '20px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>All Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#111827' }}>CapCut Pro</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Banner ────────────────────────────────────── */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#080808',
                    marginBottom: '40px'
                }}>
                    <img src={`${MINIO_URL}/slider/IMG_0116.PNG`} alt="CapCut Pro Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'start' }}>
                    
                    {/* ─── Left Column (Main Content) ───────────────────── */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Check size={20} color="#111827" />
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#111827' }}>Choose Your Plan</h2>
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0 0 24px 0' }}>Select the plan that best fits your needs</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                            {/* 1 Month Plan Card */}
                            {month1Plan && (
                                <div style={{
                                    border: '2px solid #3b82f6',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    background: '#fff',
                                    position: 'relative',
                                    boxShadow: '0 8px 30px rgba(59,130,246,0.08)'
                                }}>
                                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#3b82f6', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>CapCut PRO</h3>
                                    <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#4b5563', fontWeight: 500 }}>01 Month Access</p>
                                    
                                    <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                                        On Email
                                    </span>

                                    <div style={{ marginTop: '32px', marginBottom: '16px' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, letterSpacing: '1px' }}>PRICE</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>{parseFloat(month1Plan.price).toLocaleString()}₹</span>
                                            <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 600 }}>/ ${(parseFloat(month1Plan.price) / 84).toFixed(1)}$</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleBuy(month1Plan.id)}
                                        style={{ width: '100%', background: '#111827', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        Buy Now <Lock size={16} />
                                    </button>
                                </div>
                            )}

                            {/* Multi-Month Plan Card */}
                            {multiMonthPlans.length > 0 && (
                                <div style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    background: '#fff',
                                }}>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>CapCut PRO</h3>
                                    <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#4b5563', fontWeight: 500 }}>3 & 12 Month Access</p>
                                    
                                    <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                                        On Email
                                    </span>

                                    <div style={{ marginTop: '32px', marginBottom: '16px' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, letterSpacing: '1px', marginBottom: '8px' }}>PRICE</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {multiMonthPlans.map(plan => (
                                                <div key={plan.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px', cursor: 'pointer' }} onClick={() => handleBuy(plan.id)}>
                                                    <span style={{ fontSize: '0.95rem', color: '#4b5563', fontWeight: 500 }}>{plan.name.split(' ')[0]} Months</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontWeight: 800, color: '#111827' }}>{parseFloat(plan.price).toLocaleString()}₹ <span style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>/ ${(parseFloat(plan.price) / 84).toFixed(0)}$</span></span>
                                                        <ChevronRight size={16} color="#9ca3af" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button style={{ width: '100%', background: '#fff', color: '#111827', border: '1px solid #111827', padding: '12px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                                        View Details <LayoutTemplate size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Why Choose CapCut PRO */}
                        <div style={{ background: 'linear-gradient(90deg, #f5f3ff, #ede9fe)', borderRadius: '16px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: '0 0 20px 0' }}>Why Choose CapCut PRO?</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        Remove Watermark
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        Unlimited Projects
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        Premium Effects & Filters
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        AI Features Access
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        High Quality Export
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>
                                        <div style={{ background: '#8b5cf6', color: '#fff', borderRadius: '50%', padding: '2px' }}><Check size={12} strokeWidth={4} /></div>
                                        Priority Support
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: 'absolute', right: '10%', bottom: '-20px', opacity: 0.5 }}>
                                <Crown size={120} color="#c4b5fd" />
                            </div>
                        </div>

                        {/* Footer Strip */}
                        <div style={{ display: 'flex', gap: '32px', marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>
                                <ShieldCheck size={18} /> Safe & Secure Payment
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>
                                <Check size={18} /> 30-Day Money Back Guarantee
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>
                                <ShieldCheck size={18} /> 100% Genuine & Legal
                            </div>
                        </div>
                    </div>

                    {/* ─── Right Column (Sidebar) ──────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '20px', background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Mail size={24} color="#4b5563" />
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>Delivery</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>On Email</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #e5e7eb', paddingLeft: '16px' }}>
                                <Zap size={24} color="#4b5563" />
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>Delivery Time</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>Instant (5-15 mins)</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <HelpCircle size={18} color="#4b5563" />
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111827' }}>How it works?</h4>
                            </div>
                            <ol style={{ margin: 0, paddingLeft: '20px', color: '#4b5563', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px', fontWeight: 500 }}>
                                <li>Complete the payment</li>
                                <li>You will receive your CapCut PRO access on email</li>
                                <li>Login and enjoy all PRO features</li>
                            </ol>
                        </div>

                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '50%' }}>
                                    <HelpCircle size={20} color="#4b5563" />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Need Help?</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Our support team is always here to help you.</p>
                                </div>
                            </div>
                            <Link href="/support" style={{ border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                                Contact Support
                            </Link>
                        </div>

                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', background: '#fff' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                                    <ShieldCheck size={24} color="#4b5563" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>100% Secure<br/>Transactions</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                                    <Zap size={24} color="#4b5563" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>Instant<br/>Delivery</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                                    <Star size={24} color="#4b5563" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>Trusted by<br/>Thousands</span>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500, marginBottom: '12px' }}>We Accept</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#111827', fontWeight: 800, fontSize: '1rem', fontStyle: 'italic' }}>
                                <span style={{ color: '#1a1f71' }}>VISA</span>
                                <span style={{ color: '#eb001b' }}>Mastercard</span>
                                <span>UPI</span>
                                <span style={{ color: '#002663' }}>RuPay</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#6b7280', fontStyle: 'normal' }}>& more</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
