'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { createOrder, getServiceBySlug, validateCoupon } from '@/lib/api';
import type { Service, Plan, RazorpayOptions } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';

import { ShieldCheck, ArrowLeft, Lock, CheckCircle2, PlayCircle, Loader2, Tag, CreditCard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
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
                            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://thickwire-api-production.up.railway.app/api/v1'}/orders/verify-payment`, {
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
                    theme: { color: '#6366f1' }, // indigo-500
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
            <div className="min-h-screen bg-gray-50 flex flex-col pt-20 px-4">
                <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3 h-96 bg-white animate-pulse rounded-3xl"></div>
                    <div className="w-full lg:w-1/3 h-96 bg-gray-200 animate-pulse rounded-3xl"></div>
                </div>
            </div>
        );
    }

    if (!plan || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50/50">
                        <span className="text-3xl">❌</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-3">Plan Not Found</h2>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                        The plan you're looking for doesn't exist or is currently unavailable.
                    </p>
                    <Link 
                        href="/" 
                        className="block w-full py-4 px-6 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/10"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-500/30">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href={`/services/${service.slug}`} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to {service.name}</span>
                        <span className="sm:hidden">Back</span>
                    </Link>
                    
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <PlayCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-gray-900">StreamKart</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="hidden sm:inline">SSL Secure</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    
                    {/* Left Side: Form */}
                    <div className="w-full lg:w-3/5 order-2 lg:order-1">
                        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="mb-10">
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">Complete purchase</h1>
                                <p className="text-gray-500 font-medium text-lg">Provide your details to receive your credentials instantly.</p>
                            </div>

                            {error && (
                                <div className="mb-8 p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                    <p className="text-sm font-semibold text-red-600">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2" htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={form.customerName}
                                            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                            className="block w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2" htmlFor="email">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                value={form.customerEmail}
                                                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                                className="block w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2" htmlFor="phone">Phone Number</label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                required
                                                value={form.customerPhone}
                                                onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                                                className="block w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Opt-in */}
                                <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${whatsappOptedIn ? 'bg-green-50/50 border-green-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}>
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${whatsappOptedIn ? 'bg-green-500' : 'bg-white border-2 border-gray-300'}`}>
                                        {whatsappOptedIn && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={whatsappOptedIn}
                                        onChange={(e) => setWhatsappOptedIn(e.target.checked)}
                                    />
                                    <span className={`text-sm font-bold ${whatsappOptedIn ? 'text-green-900' : 'text-gray-700'}`}>
                                        Send my credentials & updates via WhatsApp
                                    </span>
                                </label>

                                {/* Gateway Selection */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Payment Method</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${gateway === 'razorpay' ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                            <input type="radio" className="hidden" value="razorpay" checked={gateway === 'razorpay'} onChange={() => setGateway('razorpay')} />
                                            <div className={`w-5 h-5 rounded-full border-4 transition-colors ${gateway === 'razorpay' ? 'border-indigo-500 bg-white' : 'border-gray-200'}`}></div>
                                            <div className="flex flex-col">
                                                <span className={`font-bold ${gateway === 'razorpay' ? 'text-indigo-900' : 'text-gray-700'}`}>Razorpay</span>
                                            </div>
                                        </label>
                                        <label className={`flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${gateway === 'cashfree' ? 'bg-amber-50 border-amber-500' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                            <input type="radio" className="hidden" value="cashfree" checked={gateway === 'cashfree'} onChange={() => setGateway('cashfree')} />
                                            <div className={`w-5 h-5 rounded-full border-4 transition-colors ${gateway === 'cashfree' ? 'border-amber-500 bg-white' : 'border-gray-200'}`}></div>
                                            <div className="flex flex-col">
                                                <span className={`font-bold ${gateway === 'cashfree' ? 'text-amber-900' : 'text-gray-700'}`}>Cashfree</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-gray-900 text-white text-lg font-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/10 transition-all duration-300 shadow-xl shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                <Lock className="w-5 h-5" /> Pay Securely ₹{finalAmount.toLocaleString()}
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs font-bold text-gray-400 mt-6 flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-4 h-4" /> 256-bit SSL encrypted & secured by {gateway === 'razorpay' ? 'Razorpay' : 'Cashfree'}.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="w-full lg:w-2/5 order-1 lg:order-2">
                        <div className="bg-gray-900 rounded-[2rem] p-6 sm:p-8 text-white shadow-2xl sticky top-28 overflow-hidden relative">
                            {/* Decorative background blur */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-50"></div>
                            
                            <h3 className="text-xl font-black flex items-center gap-3 mb-8 relative z-10">
                                <CreditCard className="w-6 h-6 text-indigo-400" /> Order Summary
                            </h3>
                            
                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400 font-medium">Service</span>
                                    <span className="font-bold">{service.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400 font-medium">Selected Plan</span>
                                    <span className="font-bold text-indigo-300">{plan.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-gray-400 font-medium">Duration</span>
                                    <span className="font-bold">{plan.durationDays} days</span>
                                </div>
                            </div>

                            {/* Coupon System */}
                            <div className="mb-8 relative z-10">
                                {couponState === 'applied' ? (
                                    <div className="flex justify-between items-center bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                                            <CheckCircle2 className="w-4 h-4" /> {couponCode.toUpperCase()} applied
                                        </div>
                                        <button onClick={removeCoupon} type="button" className="text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors">
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl focus-within:border-indigo-500/50 focus-within:bg-white/10 transition-all duration-300">
                                            <div className="pl-3 flex items-center text-gray-500 pointer-events-none">
                                                <Tag className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Discount Code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                className="flex-1 bg-transparent border-none text-white text-sm font-bold placeholder-gray-500 outline-none uppercase"
                                            />
                                            <button 
                                                onClick={handleApplyCoupon} 
                                                disabled={!couponCode || couponState === 'loading'} 
                                                type="button" 
                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-black rounded-lg transition-colors"
                                            >
                                                {couponState === 'loading' ? '...' : 'APPLY'}
                                            </button>
                                        </div>
                                        {couponState === 'error' && <div className="text-red-400 text-xs font-bold mt-2 ml-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{couponError}</div>}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center text-gray-400 font-medium">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">₹{parseFloat(plan.price).toLocaleString()}</span>
                                </div>

                                {couponState === 'applied' && (
                                    <div className="flex justify-between items-center text-green-400 font-bold">
                                        <span>Discount</span>
                                        <span>-₹{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="pt-6 mt-6 border-t border-dashed border-white/20 flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-300">Total</span>
                                    <span className="text-3xl font-black text-white">₹{finalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
}
