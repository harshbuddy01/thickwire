'use client';

import Link from 'next/link';
import { ChevronRight, Check, Lock, Mail, Play, Zap, Star, Monitor, ShieldCheck, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, Plan } from '@/lib/types';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function JioHotstarPageClient({ service }: { service: Service }) {
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
        <div style={{
            background: 'linear-gradient(135deg, #020612 0%, #091427 60%, #020612 100%)',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            paddingBottom: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '5%',
                left: '-10%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 114, 239, 0.08) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '-10%',
                width: '45vw',
                height: '45vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(228, 0, 59, 0.06) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                
                {/* Breadcrumbs */}
                <nav style={{ padding: '24px 0', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Home</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Services</Link>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ fontWeight: 700, color: '#00c6ff' }}>JioHotstar</span>
                </nav>

                {/* Hero Banner */}
                <div style={{
                    width: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    marginBottom: '48px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: '#040b16'
                }}>
                    <img 
                        src={service.bannerUrl || `${MINIO_URL}/slider/jiohostar.PNG`} 
                        alt="JioHotstar Banner" 
                        style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                </div>

                <div className="service-layout-grid-custom" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 380px',
                    gap: '40px',
                    alignItems: 'start'
                }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        @media (max-width: 1024px) {
                            .service-layout-grid-custom {
                                grid-template-columns: 1fr !important;
                                gap: 32px !important;
                            }
                        }
                    ` }} />

                    {/* Left side: Plans and Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        
                        {/* Section 1: Choose Your Plan */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                                <div style={{ 
                                    width: '32px', 
                                    height: '32px', 
                                    background: 'linear-gradient(135deg, #0072ef, #00c6ff)', 
                                    color: '#fff', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontWeight: 900, 
                                    fontSize: '0.95rem' 
                                }}>1</div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>Choose Your Plan</h2>
                            </div>

                            <div className="jiohotstar-plans-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {plans.map((plan) => {
                                    const isSelected = selectedPlanId === plan.id;

                                    return (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlanId(plan.id)}
                                            style={{
                                                border: isSelected ? '2px solid #00c6ff' : '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '20px',
                                                padding: '24px 28px',
                                                background: isSelected 
                                                    ? 'radial-gradient(circle at 0% 0%, rgba(0, 114, 239, 0.15), rgba(0, 0, 0, 0))' 
                                                    : 'rgba(255, 255, 255, 0.02)',
                                                backgroundColor: isSelected ? 'rgba(9, 20, 39, 0.6)' : 'rgba(15, 23, 42, 0.4)',
                                                backdropFilter: 'blur(10px)',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s ease',
                                                boxShadow: isSelected ? '0 15px 30px rgba(0, 114, 239, 0.15)' : 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                gap: '16px'
                                            }}
                                            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(0, 198, 255, 0.4)' }}
                                            onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)' }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                <div style={{ 
                                                    background: isSelected ? 'linear-gradient(135deg, #0072ef, #00c6ff)' : 'rgba(255,255,255,0.05)', 
                                                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)', 
                                                    padding: '14px', 
                                                    borderRadius: '16px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Play size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{plan.name}</h3>
                                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                                        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Duration: {plan.durationDays} Days</span>
                                                        <span style={{ fontSize: '0.8rem', color: '#00c6ff', fontWeight: 700 }}>Full Premium Access</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
                                                        {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    border: `2px solid ${isSelected ? '#00c6ff' : 'rgba(255,255,255,0.2)'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: isSelected ? '#00c6ff' : 'transparent',
                                                    color: '#000'
                                                }}>
                                                    {isSelected && <Check size={14} strokeWidth={3} />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Section 2: How It Works */}
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ 
                                    width: '32px', 
                                    height: '32px', 
                                    background: 'linear-gradient(135deg, #0072ef, #00c6ff)', 
                                    color: '#fff', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontWeight: 900, 
                                    fontSize: '0.95rem' 
                                }}>2</div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>How It Works?</h2>
                            </div>

                            <div className="jiohotstar-steps-grid" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                                gap: '20px' 
                            }}>
                                <style dangerouslySetInnerHTML={{ __html: `
                                    @media (max-width: 600px) {
                                        .jiohotstar-steps-grid {
                                            grid-template-columns: 1fr !important;
                                            gap: 16px !important;
                                        }
                                    }
                                ` }} />
                                {[
                                    { icon: Play, title: "1. Choose Plan", desc: "Select the plan duration that fits your streaming needs." },
                                    { icon: Lock, title: "2. Secure Payment", desc: "Complete the checkout safely via UPI or card." },
                                    { icon: Mail, title: "3. Quick Delivery", desc: "Access details sent directly to your registered email." },
                                    { icon: Monitor, title: "4. Enjoy Streaming", desc: "Log in and stream all movies & live sports instantly." }
                                ].map((step, sIdx) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={sIdx} style={{ 
                                            background: 'rgba(255,255,255,0.02)', 
                                            border: '1px solid rgba(255,255,255,0.06)', 
                                            borderRadius: '20px', 
                                            padding: '24px 20px',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ 
                                                width: '48px', 
                                                height: '48px', 
                                                borderRadius: '14px', 
                                                background: 'rgba(0, 114, 239, 0.1)', 
                                                color: '#00c6ff', 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                marginBottom: '16px'
                                            }}>
                                                <Icon size={22} />
                                            </div>
                                            <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{step.title}</h4>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{step.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>

                    {/* Right side: Summary Sticky Card */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        <div style={{ 
                            background: 'rgba(255,255,255,0.02)', 
                            backgroundColor: 'rgba(15, 23, 42, 0.4)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.06)', 
                            borderRadius: '24px', 
                            padding: '32px 28px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                            position: 'sticky',
                            top: '40px'
                        }}>
                            <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Order Summary</h3>
                            
                            {selectedPlan && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                        <div style={{ 
                                            width: '52px', 
                                            height: '52px', 
                                            borderRadius: '14px', 
                                            flexShrink: 0, 
                                            background: 'linear-gradient(135deg, #092ca8 50%, #e4003b 50%)', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                        }}>
                                            <span style={{ color: '#fff', fontSize: '0.62rem', fontWeight: 900, textAlign: 'center', lineHeight: 1.15, letterSpacing: '0.2px' }}>Jio<br/>Hotstar</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>JioHotstar Premium</div>
                                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{selectedPlan.name}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                            <span>Subtotal</span>
                                            <span style={{ color: '#fff', fontWeight: 600 }}>₹{parseFloat(selectedPlan.price).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)' }}>Total Amount</span>
                                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00c6ff' }}>₹{parseFloat(selectedPlan.price).toLocaleString()}</span>
                                    </div>
                                </>
                            )}

                            <div style={{ marginBottom: '28px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Delivery Mode</div>
                                <div style={{ 
                                    border: '1px solid rgba(255,255,255,0.06)', 
                                    background: 'rgba(255,255,255,0.01)', 
                                    padding: '16px', 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '12px' 
                                }}>
                                    <div style={{ background: 'rgba(0, 114, 239, 0.1)', color: '#00c6ff', padding: '8px', borderRadius: '8px' }}><Mail size={18} /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Email Delivery</div>
                                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Sent within minutes of purchase</div>
                                    </div>
                                </div>
                            </div>

                            {selectedPlan && (
                                <button 
                                    onClick={handleBuy}
                                    style={{ 
                                        width: '100%', 
                                        background: 'linear-gradient(135deg, #0072ef, #00c6ff)', 
                                        color: '#fff', 
                                        border: 'none', 
                                        padding: '18px', 
                                        borderRadius: '16px', 
                                        fontSize: '1rem', 
                                        fontWeight: 800, 
                                        cursor: 'pointer', 
                                        marginBottom: '12px', 
                                        boxShadow: '0 8px 24px rgba(0, 114, 239, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    Proceed to Buy — ₹{parseFloat(selectedPlan.price).toLocaleString()}
                                </button>
                            )}
                            
                            <div style={{ marginTop: '28px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supported Payments</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><path d="M20 12l8 24h6l-8-24h-6z" fill="#097939"/><path d="M30 12l8 24h6l-8-24h-6z" fill="#ED752E"/><text x="52" y="30" fontSize="12" fontWeight="700" fill="#333" fontFamily="sans-serif">UPI</text></svg>
                                    <svg width="48" height="24" viewBox="0 0 96 48" fill="none"><rect width="96" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><text x="12" y="33" fontSize="20" fontWeight="800" fontStyle="italic" fill="#1a1f71" fontFamily="sans-serif">VISA</text></svg>
                                    <svg width="40" height="24" viewBox="0 0 80 48" fill="none"><rect width="80" height="48" rx="6" fill="#fff" stroke="#e2e8f0"/><circle cx="32" cy="24" r="14" fill="#eb001b"/><circle cx="48" cy="24" r="14" fill="#f79e1b"/><path d="M40 13.4a14 14 0 010 21.2 14 14 0 000-21.2z" fill="#ff5f00"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Trust section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '24px',
                    marginTop: '64px',
                    padding: '36px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <ShieldCheck size={28} color="#00c6ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>100% Secure Checkout</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Fully encrypted payment gateway</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Zap size={28} color="#00c6ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Instant Access</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Account details delivered instantly</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Headphones size={28} color="#00c6ff" />
                        <div>
                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Guaranteed Support</div>
                            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>24/7 dedicated customer helpline</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
