'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { createOrder, getServiceBySlug, validateCoupon } from '@/lib/api';
import type { Service, Plan, RazorpayOptions } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';

import { ShieldCheck, ArrowLeft, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
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
        <div className="premium-checkout-wrapper">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <header style={{ background: 'transparent', padding: '0 0 40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
                <Link href={`/services/${service.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                    <ArrowLeft size={16} /> Back to {service.name}
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
                    <div style={{ width: 32, height: 32, background: '#4f46e5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem' }}>▶</div>
                    StreamKart
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: '0.9rem', fontWeight: 600 }}>
                    <ShieldCheck size={18} /> SSL Secure
                </div>
            </header>

            <main className="premium-checkout-container">
                <div className="premium-checkout-card">
                    <div className="premium-checkout-header">
                        <h1 className="premium-checkout-title">Complete your purchase</h1>
                        <p className="premium-checkout-subtitle">Provide your details to receive your credentials instantly.</p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                            <div>
                                <label className="premium-form-label" htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    className="premium-form-input"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label className="premium-form-label" htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={form.customerEmail}
                                        onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                        className="premium-form-input"
                                    />
                                </div>
                                <div>
                                    <label className="premium-form-label" htmlFor="phone">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        required
                                        value={form.customerPhone}
                                        onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                                        className="premium-form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Opt-in */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: whatsappOptedIn ? '#f0fdf4' : '#f9fafb', border: `2px solid ${whatsappOptedIn ? '#10b981' : '#e5e7eb'}`, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '32px' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '8px', background: whatsappOptedIn ? '#10b981' : '#fff', border: whatsappOptedIn ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {whatsappOptedIn && <CheckCircle2 size={16} color="#fff" strokeWidth={3} />}
                            </div>
                            <input
                                type="checkbox"
                                checked={whatsappOptedIn}
                                onChange={(e) => setWhatsappOptedIn(e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            <span style={{ fontSize: '1rem', color: '#111827', fontWeight: 600 }}>
                                Send my credentials & updates via WhatsApp
                            </span>
                        </label>

                        {/* Gateway Selection */}
                        <div style={{ marginBottom: '40px' }}>
                            <label className="premium-form-label">Payment Method</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <label className={`premium-payment-method ${gateway === 'razorpay' ? 'active' : ''}`}>
                                    <input type="radio" value="razorpay" checked={gateway === 'razorpay'} onChange={() => setGateway('razorpay')} style={{ display: 'none' }} />
                                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `6px solid ${gateway === 'razorpay' ? '#4f46e5' : '#e5e7eb'}`, transition: 'all 0.2s' }}></div>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: gateway === 'razorpay' ? '#312e81' : '#4b5563' }}>Razorpay</span>
                                </label>
                                <label className={`premium-payment-method ${gateway === 'cashfree' ? 'active' : ''}`}>
                                    <input type="radio" value="cashfree" checked={gateway === 'cashfree'} onChange={() => setGateway('cashfree')} style={{ display: 'none' }} />
                                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `6px solid ${gateway === 'cashfree' ? '#f59e0b' : '#e5e7eb'}`, transition: 'all 0.2s' }}></div>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: gateway === 'cashfree' ? '#92400e' : '#4b5563' }}>Cashfree</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="premium-btn"
                            style={{ height: '64px', fontSize: '1.2rem' }}
                        >
                            {submitting ? 'Processing securely...' : (
                                <>
                                    <Lock size={20} /> Pay Securely ₹{finalAmount.toLocaleString()}
                                </>
                            )}
                        </button>
                        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <ShieldCheck size={16} /> 256-bit SSL encrypted & secured by {gateway === 'razorpay' ? 'Razorpay' : 'Cashfree'}
                        </p>
                    </form>
                </div>

                <div className="premium-summary-card">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Lock size={20} color="#818cf8" /> Order Summary
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                        <div className="premium-summary-row">
                            <span style={{ color: '#9ca3af' }}>Service</span>
                            <span style={{ fontWeight: 600 }}>{service.name}</span>
                        </div>
                        <div className="premium-summary-row">
                            <span style={{ color: '#9ca3af' }}>Selected Plan</span>
                            <span style={{ fontWeight: 600, color: '#c7d2fe' }}>{plan.name}</span>
                        </div>
                        <div className="premium-summary-row">
                            <span style={{ color: '#9ca3af' }}>Duration</span>
                            <span style={{ fontWeight: 600 }}>{plan.durationDays} days</span>
                        </div>
                    </div>

                    {/* Coupon System */}
                    <div style={{ marginBottom: '24px' }}>
                        {couponState === 'applied' ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '16px' }}>
                                <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle2 size={18} /> {couponCode.toUpperCase()} applied
                                </div>
                                <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                            </div>
                        ) : (
                            <div>
                                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <input
                                        type="text"
                                        placeholder="Discount Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        style={{ flex: 1, padding: '12px 16px', background: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', outline: 'none' }}
                                    />
                                    <button type="button" onClick={handleApplyCoupon} disabled={!couponCode || couponState === 'loading'} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 24px', fontWeight: 700, cursor: !couponCode ? 'not-allowed' : 'pointer', opacity: !couponCode ? 0.5 : 1 }}>
                                        {couponState === 'loading' ? '...' : 'Apply'}
                                    </button>
                                </div>
                                {couponState === 'error' && <div style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '8px', paddingLeft: '8px' }}>{couponError}</div>}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="premium-summary-row">
                            <span style={{ color: '#9ca3af' }}>Subtotal</span>
                            <span style={{ fontWeight: 600 }}>₹{parseFloat(plan.price).toLocaleString()}</span>
                        </div>

                        {couponState === 'applied' && (
                            <div className="premium-summary-row" style={{ color: '#34d399' }}>
                                <span>Discount ({couponCode})</span>
                                <span>-₹{discountAmount.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="premium-summary-row" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Total</span>
                            <span className="premium-summary-total">₹{finalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
