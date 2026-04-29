'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { createOrder, getServiceBySlug, validateCoupon } from '@/lib/api';
import type { Service, Plan, RazorpayOptions } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';

import { ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planId = searchParams.get('planId');
    const serviceSlug = searchParams.get('service');

    const [service, setService] = useState<Service | null>(null);
    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
    });

    const [whatsappOptedIn, setWhatsappOptedIn] = useState(true);
    const [gateway, setGateway] = useState<'razorpay' | 'cashfree'>('razorpay');

    const [couponCode, setCouponCode] = useState('');
    const [couponState, setCouponState] = useState<'idle' | 'loading' | 'applied' | 'error'>('idle');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [finalAmount, setFinalAmount] = useState(0);

    const { user } = useAuth();

    // Pre-fill form from Auth Context
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                customerName: prev.customerName || user.name,
                customerEmail: prev.customerEmail || user.email,
                customerPhone: prev.customerPhone || user.phone || '',
            }));
            setWhatsappOptedIn(user.whatsappOptedIn);
        }
    }, [user]);

    // Handle initial plan amount
    useEffect(() => {
        if (plan) {
            setFinalAmount(parseFloat(plan.price));
            setDiscountAmount(0);
            setCouponState('idle');
            setCouponCode('');
        }
    }, [plan]);

    useEffect(() => {
        if (!serviceSlug || !planId) return;
        getServiceBySlug(serviceSlug)
            .then((s) => {
                setService(s);
                const p = s.plans.find((pl) => pl.id === planId);
                setPlan(p || null);
            })
            .catch(() => setError('Failed to load service'))
            .finally(() => setLoading(false));
    }, [serviceSlug, planId]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim() || !plan) return;
        setCouponState('loading');
        setCouponError('');

        try {
            const data = await validateCoupon({
                code: couponCode,
                planId: plan.id,
                amount: parseFloat(plan.price),
                customerId: user?.id,
            });
            setDiscountAmount(data.discountAmount);
            setFinalAmount(data.finalAmount);
            setCouponState('applied');
        } catch (err: any) {
            setCouponError(err.response?.data?.message || 'Invalid coupon code');
            setCouponState('error');
            setDiscountAmount(0);
            setFinalAmount(parseFloat(plan.price));
        }
    };

    const removeCoupon = () => {
        setCouponState('idle');
        setCouponCode('');
        setDiscountAmount(0);
        if (plan) setFinalAmount(parseFloat(plan.price));
    };

    const loadCashfreeScript = () => {
        return new Promise((resolve) => {
            if (window.Cashfree) {
                resolve(window.Cashfree);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
            script.onload = () => {
                const cf = window.Cashfree({ mode: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'production' : 'sandbox' });
                resolve(cf);
            };
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!plan) return;

        setSubmitting(true);
        setError(null);

        try {

            const payload = {
                ...form,
                planId: plan.id,
                gateway,
                whatsappOptedIn,
                ...(couponState === 'applied' ? { couponCode } : {})
            };

            const res = await createOrder(payload);

            if (gateway === 'razorpay' && res.keyId && res.razorpayOrderId) {
                const options: RazorpayOptions = {
                    key: res.keyId,
                    amount: res.amount * 100, // converted back to paise if needed by backend, though backend sends paise/sub-units
                    currency: res.currency,
                    name: 'StreamKart',
                    description: `${service?.name} — ${plan.name}`,
                    order_id: res.razorpayOrderId,
                    handler: async (response: any) => {
                        try {
                            const verifyRes = await fetch('https://thickwire-api-production.up.railway.app/api/v1/orders/verify-payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                })
                            });
                            
                            const verifyData = await verifyRes.json();
                            if (verifyData.success) {
                                router.push(`/order/${res.orderId}?gateway=razorpay`);
                            } else {
                                setError('Payment verification failed. Please contact support.');
                            }
                        } catch (e) {
                            setError('Error verifying payment. Please contact support.');
                        }
                    },
                    prefill: {
                        name: form.customerName,
                        email: form.customerEmail,
                        contact: form.customerPhone,
                    },
                    theme: { color: '#6c5ce7' },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else if (gateway === 'cashfree' && res.cashfreeSessionId) {
                const cf: any = await loadCashfreeScript();
                cf.checkout({
                    paymentSessionId: res.cashfreeSessionId,
                    redirectTarget: '_self'
                });
            } else {
                throw new Error('Invalid gateway response');
            }

        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="checkout-layout">
                <div className="skeleton skeleton-card" style={{ height: 400 }} />
                <div className="skeleton skeleton-card" style={{ height: 300 }} />
            </div>
        );
    }

    if (!plan || !service) {
        return (
            <div className="status-container">
                <div className="status-card">
                    <div className="status-icon failed">❌</div>
                    <h2>Plan Not Found</h2>
                    <p className="subtitle">The plan you&apos;re looking for doesn&apos;t exist or is unavailable.</p>
                    <a href="/" className="btn btn-primary">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            
            {/* Premium Secure Header */}
            <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 0', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href={`/services/${service.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0f172a'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                        <ArrowLeft size={16} /> Back to {service.name}
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
                        <div style={{ width: 28, height: 28, background: '#4f46e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>▶</div>
                        StreamKart
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                        <ShieldCheck size={16} /> SSL Secure
                    </div>
                </div>
            </header>

            <main className="checkout-main">
                
                {/* ─── Left Side: Form ───────────────────────────── */}
                <div className="checkout-left">
                    <div style={{ marginBottom: 32 }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Complete your purchase</h1>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>Provide your details to receive your credentials instantly.</p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: 16, borderRadius: 12, marginBottom: 24, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}>
                            <div style={{ background: '#ef4444', color: '#fff', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>!</div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid" style={{ marginBottom: 32 }}>
                            <div>
                                <label style={s.label} htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    style={s.input}
                                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>

                            <div className="form-row-2">
                                <div>
                                    <label style={s.label} htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={form.customerEmail}
                                        onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                        style={s.input}
                                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                                <div>
                                    <label style={s.label} htmlFor="phone">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        value={form.customerPhone}
                                        onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                                        style={s.input}
                                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Opt-in */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: whatsappOptedIn ? '#f0fdf4' : '#f8fafc', border: `1px solid ${whatsappOptedIn ? '#bbf7d0' : '#e2e8f0'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', marginBottom: 32 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${whatsappOptedIn ? '#10b981' : '#cbd5e1'}`, background: whatsappOptedIn ? '#10b981' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                {whatsappOptedIn && <CheckCircle2 size={14} color="#fff" strokeWidth={3} />}
                            </div>
                            <input
                                type="checkbox"
                                checked={whatsappOptedIn}
                                onChange={(e) => setWhatsappOptedIn(e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
                                Send my credentials & updates via WhatsApp
                            </span>
                        </label>

                        {/* Gateway Selection */}
                        <div style={{ marginBottom: 40 }}>
                            <label style={{ ...s.label, marginBottom: 12 }}>Payment Method</label>
                            <div className="gateway-grid">
                                <label style={{ ...s.gatewayOption, borderColor: gateway === 'razorpay' ? '#4f46e5' : '#e2e8f0', background: gateway === 'razorpay' ? '#eef2ff' : '#fff' }}>
                                    <input type="radio" value="razorpay" checked={gateway === 'razorpay'} onChange={() => setGateway('razorpay')} style={{ display: 'none' }} />
                                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `5px solid ${gateway === 'razorpay' ? '#4f46e5' : '#e2e8f0'}`, transition: 'all 0.2s' }}></div>
                                    <span style={{ fontWeight: 600, color: gateway === 'razorpay' ? '#312e81' : '#64748b' }}>Razorpay</span>
                                </label>
                                <label style={{ ...s.gatewayOption, borderColor: gateway === 'cashfree' ? '#f59e0b' : '#e2e8f0', background: gateway === 'cashfree' ? '#fffbeb' : '#fff' }}>
                                    <input type="radio" value="cashfree" checked={gateway === 'cashfree'} onChange={() => setGateway('cashfree')} style={{ display: 'none' }} />
                                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `5px solid ${gateway === 'cashfree' ? '#f59e0b' : '#e2e8f0'}`, transition: 'all 0.2s' }}></div>
                                    <span style={{ fontWeight: 600, color: gateway === 'cashfree' ? '#92400e' : '#64748b' }}>Cashfree</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                width: '100%', padding: '16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 14,
                                fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.8 : 1, transition: 'all 0.2s',
                                boxShadow: '0 10px 20px -10px rgba(15, 23, 42, 0.5)'
                            }}
                        >
                            {submitting ? 'Processing safely...' : (
                                <>
                                    <Lock size={18} /> Pay Securely ₹{finalAmount.toLocaleString()}
                                </>
                            )}
                        </button>
                        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <ShieldCheck size={14} /> 256-bit SSL encrypted & secured by {gateway === 'razorpay' ? 'Razorpay' : 'Cashfree'}.
                        </p>
                    </form>
                </div>

                {/* ─── Right Side: Order Summary ─────────────────── */}
                <div className="checkout-right">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Lock size={18} color="#818cf8" className="summary-icon" /> Order Summary
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                        <div style={s.summaryRow}>
                            <span className="summary-text-muted" style={{ color: '#94a3b8' }}>Service</span>
                            <span className="summary-text-bold" style={{ fontWeight: 600 }}>{service.name}</span>
                        </div>
                        <div style={s.summaryRow}>
                            <span className="summary-text-muted" style={{ color: '#94a3b8' }}>Selected Plan</span>
                            <span className="summary-text-bold" style={{ fontWeight: 600, color: '#e0e7ff' }}>{plan.name}</span>
                        </div>
                        <div style={s.summaryRow}>
                            <span className="summary-text-muted" style={{ color: '#94a3b8' }}>Duration</span>
                            <span className="summary-text-bold" style={{ fontWeight: 600 }}>{plan.durationDays} days</span>
                        </div>
                    </div>
                    
                    <div className="divider" style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '24px 0' }}></div>

                    {/* Coupon System */}
                    <div style={{ marginBottom: 24 }}>
                        {couponState === 'applied' ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px 16px', borderRadius: 12 }}>
                                <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CheckCircle2 size={16} /> {couponCode.toUpperCase()} applied
                                </div>
                                <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                            </div>
                        ) : (
                            <div>
                                <div className="coupon-container" style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <input
                                        type="text"
                                        placeholder="Discount Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        style={{ flex: 1, padding: '10px 16px', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    <button type="button" onClick={handleApplyCoupon} disabled={!couponCode || couponState === 'loading'} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0 20px', fontWeight: 600, cursor: !couponCode ? 'not-allowed' : 'pointer', opacity: !couponCode ? 0.5 : 1 }}>
                                        {couponState === 'loading' ? '...' : 'Apply'}
                                    </button>
                                </div>
                                {couponState === 'error' && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: 8, paddingLeft: 4 }}>{couponError}</div>}
                            </div>
                        )}
                    </div>

                    <div className="divider" style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '24px 0' }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={s.summaryRow}>
                            <span className="summary-text-muted" style={{ color: '#94a3b8' }}>Subtotal</span>
                            <span className="summary-text-bold">₹{parseFloat(plan.price).toLocaleString()}</span>
                        </div>

                        {couponState === 'applied' && (
                            <div style={{ ...s.summaryRow, color: '#34d399' }}>
                                <span>Discount ({couponCode})</span>
                                <span>-₹{discountAmount.toLocaleString()}</span>
                            </div>
                        )}

                        <div style={{ ...s.summaryRow, fontSize: '1.4rem', fontWeight: 800, marginTop: 12, paddingTop: 16, borderTop: '1px dashed rgba(255,255,255,0.1)' }} className="divider">
                            <span className="summary-text-bold">Total</span>
                            <span className="summary-text-bold">₹{finalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </main>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                input::placeholder { color: #94a3b8; }
                
                .checkout-main {
                    flex: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 40px 24px;
                    width: 100%;
                    display: flex;
                    gap: 40px;
                    align-items: flex-start;
                }
                
                .checkout-left {
                    flex: 1;
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
                    border: 1px solid #f1f5f9;
                }
                
                .checkout-right {
                    flex: 0 0 380px;
                    background: linear-gradient(145deg, #0f172a, #1e293b);
                    color: #fff;
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
                    position: sticky;
                    top: 100px;
                }
                
                .form-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .gateway-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

                /* Mobile View Queries - Premium Vertical Stack */
                @media (max-width: 860px) {
                    .checkout-main {
                        flex-direction: column-reverse; /* Summary on top, Form below */
                        padding: 16px;
                        gap: 24px;
                    }
                    .checkout-left {
                        flex: auto;
                        width: 100%;
                        padding: 24px 20px;
                        border-radius: 20px;
                    }
                    .checkout-right {
                        flex: auto;
                        width: 100%;
                        position: static;
                        padding: 24px 20px;
                        border-radius: 20px;
                        box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.2);
                    }
                    .form-row-2 { grid-template-columns: 1fr; gap: 20px; }
                    .gateway-grid { grid-template-columns: 1fr; gap: 12px; }
                }
                
                @media (max-width: 480px) {
                    .gateway-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: 8 },
    input: { width: '100%', padding: '14px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '0.95rem', color: '#0f172a', transition: 'border-color 0.2s', outline: 'none' },
    gatewayOption: { display: 'flex', alignItems: 'center', gap: 12, padding: '16px', border: '1px solid', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem' }
};
