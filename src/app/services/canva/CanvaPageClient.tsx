'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, Mail, Play, Palette } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function CanvaPageClient({ service }: { service: Service }) {
    const router = useRouter();
    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

    const plans = service.plans;
    const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

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
            <div className="container">
                <nav style={{ padding: '20px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>All Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#111827' }}>Canva Edu</span>
                </nav>
            </div>

            <div className="container">
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#f8fafc',
                    marginBottom: '40px'
                }}>
                    <img src={`${MINIO_URL}/slider/canva.PNG`} alt="Canva Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '28px', height: '28px', background: '#7b1fa2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>1</div>
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>Choose Your Plan</h2>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                {plans.map((plan) => {
                                    const isSelected = selectedPlanId === plan.id;

                                    return (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            style={{
                                                border: `2px solid ${isSelected ? '#7b1fa2' : '#e2e8f0'}`,
                                                borderRadius: '16px',
                                                padding: '24px 20px',
                                                background: '#fff',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 10px 25px rgba(123,31,162,0.1)' : 'none',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                                                <div style={{ background: isSelected ? '#f3e5f5' : '#f8fafc', color: isSelected ? '#7b1fa2' : '#64748b', padding: '12px', borderRadius: '12px' }}>
                                                    <Palette size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{plan.name}</h3>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>₹{parseFloat(plan.price).toLocaleString()}</div>
                                            </div>

                                            <button style={{ width: '100%', background: isSelected ? '#7b1fa2' : '#fff', color: isSelected ? '#fff' : '#7b1fa2', border: `1px solid ${isSelected ? '#7b1fa2' : '#cbd5e1'}`, padding: '12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
                                                Buy Now
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ width: '28px', height: '28px', background: '#7b1fa2', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>2</div>
                                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#111827' }}>How It Works?</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '10px', borderRadius: '8px' }}><Check size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>1. Choose Plan</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Select the plan that suits your needs.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '10px', borderRadius: '8px' }}><Lock size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>2. Complete Payment</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Secure payment through our trusted gateway.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '10px', borderRadius: '8px' }}><Mail size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>3. Get Access</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Receive your account details on email.</div></div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '10px', borderRadius: '8px' }}><Play size={20} /></div>
                                    <div><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>4. Start Streaming</div><div style={{ fontSize: '0.7rem', color: '#64748b' }}>Login and enjoy unlimited entertainment.</div></div>
                                </div>
                            </div>
                        </section>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>
                        
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px' }}>
                            <h3 style={{ margin: '0 0 24px 0', fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Order Summary</h3>
                            
                            {selectedPlan && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0, background: '#7b1fa2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg viewBox="0 0 100 100" width="32" height="32"><circle cx="50" cy="50" r="45" fill="#fff" opacity="0.15"/><text x="50" y="66" fontSize="52" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="sans-serif">C</text></svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>Canva Edu</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedPlan.name}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                            <span>Price</span>
                                            <span style={{ color: '#111827', fontWeight: 600 }}>₹{parseFloat(selectedPlan.price).toLocaleString()}</span>
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
                                    <div style={{ background: '#f3e5f5', color: '#7b1fa2', padding: '8px', borderRadius: '8px' }}><Mail size={18} /></div>
                                    <div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Email Delivery</div></div>
                                </div>
                            </div>

                            {selectedPlan && (
                                <button 
                                    onClick={handleBuy}
                                    style={{ width: '100%', background: '#7b1fa2', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '12px', boxShadow: '0 4px 14px rgba(123,31,162,0.3)' }}
                                >
                                    Buy Now — ₹{parseFloat(selectedPlan.price).toLocaleString()}
                                </button>
                            )}
                            
                            <div style={{ marginTop: '32px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>We Accept</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><path d="M20 12l8 24h6l-8-24h-6z" fill="#097939"/><path d="M30 12l8 24h6l-8-24h-6z" fill="#ED752E"/><text x="52" y="30" fontSize="12" fontWeight="700" fill="#333" fontFamily="sans-serif">UPI</text></svg>
                                    <svg width="48" height="24" viewBox="0 0 96 48" fill="none"><rect width="96" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="33" fontSize="20" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="sans-serif">VISA</text></svg>
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><circle cx="32" cy="24" r="14" fill="#eb001b"/><circle cx="48" cy="24" r="14" fill="#f79e1b"/><path d="M40 13.4a14 14 0 010 21.2 14 14 0 000-21.2z" fill="#ff5f00"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
