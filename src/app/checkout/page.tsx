'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { createOrder, getServiceBySlug, validateCoupon } from '@/lib/api';
import type { Service, Plan, RazorpayOptions } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="checkout-layout">
                <div className="skeleton skeleton-card" style={{ height: 400 }} />
                <div className="skeleton skeleton-card" style={{ height: 300 }} />
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
            // If amount > 0, show maintenance message instead of opening payment gateway
            if (finalAmount > 0) {
                setError('MAINTENANCE');
                setSubmitting(false);
                return;
            }

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
                    handler: () => {
                        router.push(`/order/${res.orderId}?gateway=razorpay`);
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
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="checkout-layout">
                {/* ─── Form ───────────────────────────── */}
                <div className="checkout-form-card">
                    <h2>Complete Your Purchase</h2>

                    {error && error === 'MAINTENANCE' ? (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(251, 191, 36, 0.08))',
                            border: '1px solid rgba(245, 158, 11, 0.4)',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f59e0b' }}>Payment Gateway Under Maintenance</h3>
                            </div>
                            <p style={{ margin: '0 0 14px 0', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                Online payment is temporarily unavailable. To complete your purchase:
                            </p>
                            <ol style={{ margin: '0 0 16px 0', paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.8 }}>
                                <li>Pay the amount to our UPI ID or QR code (contact support for details)</li>
                                <li>Send your payment screenshot to our WhatsApp / support</li>
                                <li>We will send you a coupon code within minutes</li>
                                <li>Apply the coupon in the <strong>Discount Code</strong> box on this page and click <strong>Pay</strong></li>
                            </ol>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(245, 158, 11, 0.1)',
                                borderRadius: '8px',
                                padding: '10px 14px',
                            }}>
                                <span style={{ fontSize: '1.1rem' }}>📞</span>
                                <span style={{ fontSize: '0.88rem', color: '#f59e0b', fontWeight: 600 }}>Contact Support: WhatsApp us for instant help</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="toast error" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 20 }}>
                            {error}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                className="form-input"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={form.customerName}
                                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                className="form-input"
                                type="email"
                                placeholder="john@example.com"
                                required
                                value={form.customerEmail}
                                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                className="form-input"
                                type="tel"
                                placeholder="+91 98765 43210"
                                required
                                value={form.customerPhone}
                                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                            />
                        </div>

                        {/* WhatsApp Opt-in */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <input
                                type="checkbox"
                                id="whatsapp"
                                checked={whatsappOptedIn}
                                onChange={(e) => setWhatsappOptedIn(e.target.checked)}
                                style={{ width: '16px', height: '16px', accentColor: '#10b981' }}
                            />
                            <label htmlFor="whatsapp" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                Get order updates and renewal reminders securely via WhatsApp
                            </label>
                        </div>

                        {/* Gateway Selection */}
                        <div style={{ marginBottom: '24px' }}>
                            <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Payment Gateway</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <label style={{
                                    border: `1px solid ${gateway === 'razorpay' ? '#6c5ce7' : 'var(--border-strong)'}`,
                                    backgroundColor: gateway === 'razorpay' ? 'rgba(108, 92, 231, 0.05)' : 'transparent',
                                    padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    <input type="radio" value="razorpay" checked={gateway === 'razorpay'} onChange={() => setGateway('razorpay')} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Razorpay</span>
                                </label>
                                <label style={{
                                    border: `1px solid ${gateway === 'cashfree' ? '#f59e0b' : 'var(--border-strong)'}`,
                                    backgroundColor: gateway === 'cashfree' ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                                    padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    <input type="radio" value="cashfree" checked={gateway === 'cashfree'} onChange={() => setGateway('cashfree')} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Cashfree</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={submitting}
                            style={{ marginTop: 12 }}
                        >
                            {submitting ? 'Processing...' : `Pay ₹${finalAmount.toLocaleString()}`}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 16 }}>
                        🔒 Secured by {gateway === 'razorpay' ? 'Razorpay' : 'Cashfree'}. Your credentials are delivered instantly after payment.
                    </p>
                </div>

                {/* ─── Order Summary ─────────────────── */}
                <div className="order-summary-card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span className="label">Service</span>
                        <span>{service.name}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Plan</span>
                        <span>{plan.name}</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Duration</span>
                        <span>{plan.durationDays} days</span>
                    </div>
                    <hr className="summary-divider" />

                    {/* Coupon System */}
                    <div style={{ marginBottom: '20px' }}>
                        {couponState === 'applied' ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed #10b981', padding: '10px 12px', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 500 }}>
                                    ✓ {couponCode.toUpperCase()} applied
                                </div>
                                <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', padding: '4px' }}>Remove</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Discount Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    style={{ flex: 1, padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.9rem' }}
                                />
                                <button type="button" onClick={handleApplyCoupon} disabled={!couponCode || couponState === 'loading'} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                    {couponState === 'loading' ? '...' : 'Apply'}
                                </button>
                            </div>
                        )}
                        {couponState === 'error' && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{couponError}</div>}
                    </div>

                    <hr className="summary-divider" />

                    <div className="summary-row">
                        <span className="label">Subtotal</span>
                        <span>₹{parseFloat(plan.price).toLocaleString()}</span>
                    </div>

                    {couponState === 'applied' && (
                        <div className="summary-row" style={{ color: '#10b981' }}>
                            <span className="label">Discount</span>
                            <span>-₹{discountAmount.toLocaleString()}</span>
                        </div>
                    )}

                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>₹{finalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
