'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { createOrder, getServiceBySlug, validateCoupon, api } from '@/lib/api';
import type { Service, Plan, RazorpayOptions } from '@/lib/types';
import { useAuth } from '@/lib/AuthContext';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ShoppingBag, User, CreditCard, Ticket, Zap, Award, Headphones, ChevronRight, Play, Eye, EyeOff, Globe, Smartphone } from 'lucide-react';
import Link from 'next/link';
import styles from './checkout.module.css';

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
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
    const [gateway, setGateway] = useState<'wallet' | 'upi-direct'>('wallet');
    const [walletBalance, setWalletBalance] = useState<number | null>(null);
    const [walletCurrency, setWalletCurrency] = useState<string>('INR');
    const [walletBaseCurrency, setWalletBaseCurrency] = useState<string>('INR');
    const [walletExchangeRate, setWalletExchangeRate] = useState<number>(1);

    const [couponCode, setCouponCode] = useState('');
    const [couponState, setCouponState] = useState<'idle' | 'loading' | 'applied' | 'error'>('idle');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [finalAmount, setFinalAmount] = useState(0);

    // ─── Service Credentials State ─────────────────────
    const [spotifyEmail, setSpotifyEmail] = useState('');
    const [spotifyPassword, setSpotifyPassword] = useState('');
    const [spotifyConfirmPassword, setSpotifyConfirmPassword] = useState('');
    const [spotifyCountry, setSpotifyCountry] = useState('');
    const [showSpotifyPassword, setShowSpotifyPassword] = useState(false);
    const [youtubeEmail, setYoutubeEmail] = useState('');
    const [serviceEmail, setServiceEmail] = useState('');
    const [serviceMobile, setServiceMobile] = useState('');

    // UPI Direct state
    const [isIndianUser, setIsIndianUser] = useState(false);
    const [upiDetails, setUpiDetails] = useState<any>(null);
    const [utrNumber, setUtrNumber] = useState('');
    const [upiCopied, setUpiCopied] = useState(false);
    const [utrResult, setUtrResult] = useState<any>(null);
    const [requestingCredit, setRequestingCredit] = useState(false);
    const [creditRequestSuccess, setCreditRequestSuccess] = useState(false);

    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            if (!token) {
                const dest = `/checkout?planId=${planId}&service=${serviceSlug}`;
                router.push(`/login?redirect=${encodeURIComponent(dest)}`);
            }
        }
    }, [authLoading, user, planId, serviceSlug, router]);

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                customerName: prev.customerName || user.name,
                customerEmail: prev.customerEmail || user.email,
                customerPhone: prev.customerPhone || user.phone || '',
            }));
            setWhatsappOptedIn(user.whatsappOptedIn);
            // Fetch wallet balance
            api.get('/wallet/balance/local').then(({ data }) => {
                setWalletBalance(data.balanceLocal);
                setWalletCurrency(data.symbol);
                setWalletBaseCurrency(data.baseCurrency || 'INR');
                setWalletExchangeRate(data.exchangeRate || 1);
            }).catch(console.error);
        }
    }, [user]);

    // Detect Indian user via timezone
    useEffect(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isIN = tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta');
        setIsIndianUser(isIN);
        if (isIN) {
            setGateway('upi-direct');
            api.get('/wallet/utr/qr-details').then(({ data }) => setUpiDetails(data)).catch(console.error);
        } else {
            setGateway('wallet');
        }
    }, []);

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
            .catch(() => {
                // Fallback for services not yet added to the production DB
                setError('Unable to load plan details. Please go back and try again.');
            })
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

    const handleRequestWalletCredit = async () => {
        setRequestingCredit(true);
        try {
            await api.post('/support', {
                subject: 'Manual Wallet Credit Request',
                message: `Hi, I want to purchase ${service?.name} - ${plan?.name} but my wallet balance is insufficient. I need ${plan?.currency === 'USD' ? '$' : '₹'}${finalAmount} to proceed. Please provide payment instructions or credit my wallet.`,
                priority: 'HIGH',
                category: 'PAYMENT'
            });
            setCreditRequestSuccess(true);
            setTimeout(() => setCreditRequestSuccess(false), 5000);
        } catch (err) {
            alert('Failed to request credit. Please contact support manually.');
        } finally {
            setRequestingCredit(false);
        }
    };

    // ─── Service Type Detection ────────────────────────
    const slug = service?.slug || '';
    const planCurrency = plan?.currency || 'INR';
    const planNameLower = (plan?.name || '').toLowerCase();

    const isSpotifyGlobal = slug === 'spotify' && planCurrency === 'USD';
    const isYouTubeIndia = slug === 'youtube' && planCurrency === 'INR';
    const isYouTubeGlobal = slug === 'youtube' && planCurrency === 'USD';
    
    const needsServiceEmail = planNameLower.includes('email') || slug === 'elevenlabs' || slug === 'canva-edu' || slug === 'linkedin-business' || slug === 'nord-vpn' || isYouTubeIndia;
    const needsPhone = slug === 'sonyliv' || slug === 'zee5' || slug === 'jiohotstar' || slug === 'disney-plus' || planNameLower.includes('mobile');
    const isManualService = isSpotifyGlobal || isYouTubeGlobal || needsServiceEmail || needsPhone;

    // ─── Convert plan price to wallet currency for comparison ────
    // Wallet balance is in user's local currency (e.g. ₹245.28).
    // If plan is in USD ($17), we need to convert $17 to INR for accurate comparison.
    // The walletExchangeRate is INR→userCurrency, so USD→INR ≈ $1 = ₹85 (approx).
    // For USD plans: multiply by an approximate USD→INR rate.
    const planPriceInWalletCurrency = (() => {
        if (planCurrency === walletBaseCurrency) return finalAmount;
        
        // If plan is in USD, approximate it to INR first (1 USD ≈ 85 INR)
        // Then convert to user's wallet currency using their exchange rate
        if (planCurrency === 'USD') {
            const approximateInr = finalAmount * 85;
            return approximateInr * walletExchangeRate;
        }
        
        // If plan is in INR, just multiply by their exchange rate
        if (planCurrency === 'INR') {
            return finalAmount * walletExchangeRate;
        }

        return finalAmount;
    })();

    // Check if credential fields are valid
    const credentialsValid = (() => {
        if (isSpotifyGlobal) return spotifyEmail && spotifyPassword && spotifyConfirmPassword && spotifyCountry && spotifyPassword === spotifyConfirmPassword;
        if (needsServiceEmail) return serviceEmail.includes('@');
        if (needsPhone) return serviceMobile.length >= 10;
        return true; 
    })();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!plan) return;



        if (gateway !== 'wallet' && gateway !== 'upi-direct') {
            setError('Please select a payment method.');
            return;
        }

        if (gateway === 'wallet' && (walletBalance === null || walletBalance < planPriceInWalletCurrency)) {
            setError('Insufficient wallet balance. Please top up your wallet or use another payment method.');
            return;
        }

        // Validate credentials for manual services
        if (isSpotifyGlobal && spotifyPassword !== spotifyConfirmPassword) {
            setError('Spotify passwords do not match.');
            return;
        }
        if (isSpotifyGlobal && (!spotifyEmail || !spotifyPassword || !spotifyCountry)) {
            setError('Please fill in all Spotify account details.');
            return;
        }
        if (needsServiceEmail && !isSpotifyGlobal && !serviceEmail) {
            setError(`Please enter your ${service?.name} account email.`);
            return;
        }
        if (needsPhone && !serviceMobile) {
            setError(`Please enter your mobile number for ${service?.name} activation.`);
            return;
        }

        // Validate UPI Direct early
        if (gateway === 'upi-direct') {
            if (!utrNumber.trim() || utrNumber.trim().length < 10) {
                setError('Please enter a valid UTR number (at least 10 digits).');
                return;
            }
        }

        setSubmitting(true);
        setError(null);
        setUtrResult(null);

        try {
            let serviceCredentials: Record<string, any> | undefined;
            if (isSpotifyGlobal) {
                serviceCredentials = { spotifyEmail, spotifyPassword, spotifyCountry };
            } else if (needsServiceEmail) {
                serviceCredentials = { activationEmail: serviceEmail };
            } else if (needsPhone) {
                serviceCredentials = { mobileNumber: serviceMobile.replace(/\D/g, '') };
            }

            const payload = {
                ...form,
                planId: plan.id,
                gateway,
                whatsappOptedIn,
                ...(couponState === 'applied' ? { couponCode } : {}),
                ...(serviceCredentials ? { serviceCredentials } : {})
            };

            if (gateway === 'upi-direct') {
                const { data: utrData } = await api.post('/wallet/utr/submit', {
                    utr: utrNumber.trim(),
                    amount: finalAmount,
                });
                setUtrResult(utrData);
                
                if (utrData.status === 'MATCHED') {
                    // Wallet credited — now create order and pay from wallet
                    try {
                        const resOrder = await createOrder(payload);
                        const res = await api.post('/wallet/pay', { orderId: resOrder.orderId });
                        if (res.data?.success) {
                            router.push(`/order/${res.data.orderId}?gateway=wallet`);
                            return;
                        }
                    } catch (walletErr: any) {
                        setError(walletErr?.response?.data?.message || 'UTR matched and wallet credited, but purchase failed. Please go to Wallet and try again.');
                    }
                }
                // If PENDING, we still create the order so admin can fulfill it later when they approve UTR
                if (utrData.status === 'PENDING') {
                    await createOrder(payload);
                }
                setSubmitting(false);
                return;
            }

            // Wallet Flow
            if (gateway === 'wallet') {
                try {
                    const resOrder = await createOrder(payload);
                    const res = await api.post('/wallet/pay', { orderId: resOrder.orderId });
                    if (res.data && res.data.success) {
                        router.push(`/order/${res.data.orderId}?gateway=wallet`);
                        return;
                    } else {
                        setError('Wallet payment failed. Please try again.');
                        setSubmitting(false);
                        return;
                    }
                } catch (walletErr: any) {
                    console.error('Wallet payment error:', walletErr);
                    setError(walletErr?.response?.data?.message || 'Wallet payment failed. Please try again.');
                    setSubmitting(false);
                    return;
                }
            }

            // Other Gateways
            await createOrder(payload);
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }
    if (!user) return null;

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    if (!plan || !service) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ background: '#fff', padding: 40, borderRadius: 24, textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <h2>Plan Not Found</h2>
                    <p style={{ color: '#666', marginTop: 8, marginBottom: 24 }}>The plan you&apos;re looking for doesn&apos;t exist or is unavailable.</p>
                    <Link href="/" style={{ background: '#10b981', color: '#fff', padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60, fontFamily: 'var(--font-poppins), sans-serif' }}>
            
            {/* Header */}
            <header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #e2e8f0' }}>
                <div className="checkout-header-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <div style={{ width: 40, height: 40, background: '#111827', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <Play fill="#fff" size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.2rem', lineHeight: 1.2 }}>StreamKart</div>
                            <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500 }}>Your Digital World, One Place.</div>
                        </div>
                    </Link>

                    {/* Stepper */}
                    <div className="checkout-stepper" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, background: '#111827', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>1</div>
                            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Checkout</span>
                        </div>
                        <div className="checkout-stepper-line" style={{ width: 40, height: 1, background: '#e2e8f0' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, border: '1px solid #e2e8f0', color: '#9ca3af', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600 }}>2</div>
                            <span style={{ fontWeight: 500, color: '#9ca3af', fontSize: '0.95rem' }}>Payment</span>
                        </div>
                        <div className="checkout-stepper-line" style={{ width: 40, height: 1, background: '#e2e8f0' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, border: '1px solid #e2e8f0', color: '#9ca3af', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600 }}>3</div>
                            <span style={{ fontWeight: 500, color: '#9ca3af', fontSize: '0.95rem' }}>Confirmation</span>
                        </div>
                    </div>

                    {/* Trust */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <ShieldCheck size={28} color="#111827" />
                        <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>100% Secure Checkout</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>256-bit SSL Encrypted</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="checkout-main-layout" style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 24px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                
                {/* Left Column */}
                <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                        <div style={{ width: 56, height: 56, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                            <ShoppingBag size={28} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>
                                Complete your <span style={{ color: '#10b981' }}>purchase</span>
                            </h1>
                            <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '0.95rem' }}>Provide your details to receive your credentials instantly.</p>
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        
                        {/* Contact Info */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{ width: 40, height: 40, background: '#f3f4f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>Contact Information</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>We&apos;ll use this information to send your order details.</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                            <User size={18} />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Richard" 
                                            required
                                            value={form.customerName}
                                            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                            style={{ width: '100%', padding: '14px 16px 14px 44px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s' }} 
                                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        </div>
                                        <input 
                                            type="email" 
                                            required
                                            readOnly
                                            disabled
                                            value={form.customerEmail}
                                            style={{ width: '100%', padding: '14px 16px 14px 44px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', background: '#f9fafb', color: '#6b7280' }} 
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: '0.75rem', color: '#6b7280' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                        <span>Credentials will be sent to this email. You can change this in <Link href="/account" style={{ color: '#10b981', textDecoration: 'none' }}>settings</Link>.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─── Conditional Service Credential Fields ─── */}

                        {isSpotifyGlobal && (
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 40, height: 40, background: '#f0fdf4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB954' }}>
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>Spotify Account Details</div>
                                        <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Required for upgrading your Spotify Premium</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Enter your Spotify email or username</label>
                                        <input type="text" placeholder="you@spotify.com" required value={spotifyEmail} onChange={(e) => setSpotifyEmail(e.target.value)}
                                            style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                                            onFocus={(e) => e.target.style.borderColor = '#1DB954'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                        />
                                    </div>
                                    <div className="checkout-split-row" style={{ display: 'flex', gap: 16 }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Spotify Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showSpotifyPassword ? 'text' : 'password'} placeholder="••••••••" required value={spotifyPassword} onChange={(e) => setSpotifyPassword(e.target.value)}
                                                    style={{ width: '100%', padding: '14px 44px 14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                                                    onFocus={(e) => e.target.style.borderColor = '#1DB954'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                                />
                                                <button type="button" onClick={() => setShowSpotifyPassword(!showSpotifyPassword)}
                                                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
                                                    {showSpotifyPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Confirm Password</label>
                                            <input type="password" placeholder="••••••••" required value={spotifyConfirmPassword} onChange={(e) => setSpotifyConfirmPassword(e.target.value)}
                                                style={{ width: '100%', padding: '14px 16px', border: `1px solid ${spotifyConfirmPassword && spotifyPassword !== spotifyConfirmPassword ? '#ef4444' : '#e5e7eb'}`, borderRadius: 12, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                                            />
                                            {spotifyConfirmPassword && spotifyPassword !== spotifyConfirmPassword && (
                                                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 4, fontWeight: 600 }}>Passwords do not match</div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Country / Region of your Spotify account</label>
                                        <select value={spotifyCountry} onChange={(e) => setSpotifyCountry(e.target.value)} required
                                            style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', background: '#fff', color: spotifyCountry ? '#111827' : '#9ca3af', cursor: 'pointer', boxSizing: 'border-box' }}>
                                            <option value="">Select your country</option>
                                            <option value="US">United States</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="DE">Germany</option>
                                            <option value="FR">France</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="SE">Sweden</option>
                                            <option value="BR">Brazil</option>
                                            <option value="MX">Mexico</option>
                                            <option value="JP">Japan</option>
                                            <option value="KR">South Korea</option>
                                            <option value="SG">Singapore</option>
                                            <option value="PH">Philippines</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, padding: '14px 16px', background: '#fefce8', border: '1px solid #fef08a', borderRadius: 12 }}>
                                    <ShieldCheck size={18} style={{ color: '#ca8a04', flexShrink: 0, marginTop: 2 }} />
                                    <div style={{ fontSize: '0.8rem', color: '#854d0e', lineHeight: 1.5 }}>
                                        <strong>Your Privacy is Our Priority</strong> — We use your account details only to upgrade your Spotify Premium. We do not share or store your password. All data is encrypted and secure.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── Generic Service Email Field ─── */}
                        {needsServiceEmail && !isSpotifyGlobal && (
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 40, height: 40, background: '#fef2f2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>{service?.name} Account Details</div>
                                        <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Enter the email address you want to activate</div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Activation Email</label>
                                    <input type="email" placeholder="you@gmail.com" required value={serviceEmail} onChange={(e) => setServiceEmail(e.target.value)}
                                        style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                                        onFocus={(e) => e.target.style.borderColor = '#dc2626'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, padding: '14px 16px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12 }}>
                                    <ShieldCheck size={18} style={{ color: '#0284c7', flexShrink: 0, marginTop: 2 }} />
                                    <div style={{ fontSize: '0.8rem', color: '#0369a1', lineHeight: 1.5 }}>
                                        You will need an active account to continue. <strong>We do not ask for your password.</strong> We will never access your account.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─── Generic Service Mobile Field ─── */}
                        {needsPhone && (
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 40, height: 40, background: '#fef2f2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                                        <Smartphone size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>{service?.name} Account Details</div>
                                        <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Enter the mobile number you want to activate</div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Activation Mobile Number</label>
                                    <input type="tel" placeholder="+91 98765 43210" required value={serviceMobile} onChange={(e) => setServiceMobile(e.target.value)}
                                        style={{ width: '100%', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                                        onFocus={(e) => e.target.style.borderColor = '#dc2626'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                    />
                                </div>
                            </div>
                        )}


                        {/* WhatsApp Checkbox */}
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: whatsappOptedIn ? '#f0fdf4' : '#f9fafb', border: `1px solid ${whatsappOptedIn ? '#10b981' : '#e5e7eb'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ color: '#25D366' }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Send my credentials & updates via WhatsApp</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Get order updates & credentials on WhatsApp</div>
                                </div>
                            </div>
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: whatsappOptedIn ? '#10b981' : '#fff', border: whatsappOptedIn ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {whatsappOptedIn && <CheckCircle2 size={16} color="#fff" strokeWidth={3} />}
                            </div>
                            <input
                                type="checkbox"
                                checked={whatsappOptedIn}
                                onChange={(e) => setWhatsappOptedIn(e.target.checked)}
                                style={{ display: 'none' }}
                            />
                        </label>

                        {/* Payment Method */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{ width: 40, height: 40, background: '#f0fdfa', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d9488' }}>
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>Payment Method</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Choose a secure payment option</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {/* UPI Direct (for Indian users) */}
                                {isIndianUser && (
                                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: gateway === 'upi-direct' ? '#f0fdf4' : '#fff', border: `1px solid ${gateway === 'upi-direct' ? '#10b981' : '#e5e7eb'}`, borderRadius: 16, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                                        {gateway === 'upi-direct' && <div style={{ position: 'absolute', top: 0, right: 0, background: '#6c5ce7', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderBottomLeftRadius: 8 }}>SELECTED</div>}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #6c5ce7, #a55eea)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                                <Smartphone size={22} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: '#111827', fontSize: '1rem' }}>UPI Direct</div>
                                                <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Pay via GPay, PhonePe, Paytm</div>
                                            </div>
                                        </div>
                                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: gateway === 'upi-direct' ? '#10b981' : 'transparent', border: gateway === 'upi-direct' ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {gateway === 'upi-direct' && <CheckCircle2 size={14} color="#fff" strokeWidth={3} />}
                                        </div>
                                        <input type="radio" value="upi-direct" checked={gateway === 'upi-direct'} onChange={() => setGateway('upi-direct')} style={{ display: 'none' }} />
                                    </label>
                                )}

                                {/* UPI Direct Inline Flow */}
                                {gateway === 'upi-direct' && (
                                    <div style={{ padding: 20, background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 16 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                                            {/* QR Code */}
                                            <div style={{ width: '100%', maxWidth: 300, background: '#fff', borderRadius: 16, border: '2px dashed #d8b4fe', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 12 }}>
                                                {upiDetails?.qrImageUrl ? (
                                                    <img src={upiDetails.qrImageUrl} alt="UPI QR" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                                                ) : (
                                                    <div style={{ padding: 40 }}><Smartphone size={40} style={{ color: '#d8b4fe' }} /></div>
                                                )}
                                            </div>
                                            <div style={{ width: '100%', marginTop: 16, fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.6, background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e9d5ff' }}>
                                                <div style={{ fontWeight: 700, color: '#6c5ce7', marginBottom: 8, fontSize: '0.9rem' }}>Payment Instructions:</div>
                                                1. Scan the QR code above using any UPI app (GPay, PhonePe, Paytm)<br/>
                                                2. Pay exactly <strong>{plan?.currency === 'USD' ? '$' : '₹'}{finalAmount}</strong><br/>
                                                3. Copy the 12-digit UTR from your payment app<br/>
                                                4. Submit below — your wallet will be credited instantly
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <input type="text" placeholder="Enter 12-digit UTR number" value={utrNumber} onChange={e => setUtrNumber(e.target.value)} maxLength={20}
                                                style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #e9d5ff', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
                                        </div>
                                        {utrResult && (
                                            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: utrResult.status === 'MATCHED' ? '#f0fdf4' : utrResult.status === 'PENDING' ? '#fffbeb' : '#fef2f2', border: `1px solid ${utrResult.status === 'MATCHED' ? '#bbf7d0' : utrResult.status === 'PENDING' ? '#fde68a' : '#fecaca'}`, fontSize: '0.85rem', fontWeight: 600, color: utrResult.status === 'MATCHED' ? '#166534' : utrResult.status === 'PENDING' ? '#92400e' : '#991b1b' }}>
                                                {utrResult.message}
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {/* Wallet Option */}
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: gateway === 'wallet' ? '#f0fdf4' : '#fff', border: `1px solid ${gateway === 'wallet' ? '#10b981' : '#e5e7eb'}`, borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 44, height: 44, background: '#111827', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: '#111827', fontSize: '1rem' }}>StreamKart Wallet</div>
                                                <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                                                    Available Balance: <span style={{ fontWeight: 700, color: (walletBalance !== null && walletBalance >= planPriceInWalletCurrency) ? '#10b981' : '#ef4444' }}>{walletBalance !== null ? `${walletCurrency}${walletBalance.toFixed(2)}` : 'Loading...'}</span>
                                                    {plan?.currency === 'USD' && walletBaseCurrency === 'INR' && <span style={{ display: 'block', fontSize: '0.7rem', color: '#6b7280', marginTop: 2 }}>≈ ₹{planPriceInWalletCurrency.toFixed(0)} required for ${finalAmount} USD</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: gateway === 'wallet' ? '#10b981' : 'transparent', border: gateway === 'wallet' ? 'none' : '2px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {gateway === 'wallet' && <CheckCircle2 size={14} color="#fff" strokeWidth={3} />}
                                        </div>
                                        <input type="radio" value="wallet" checked={gateway === 'wallet'} onChange={() => setGateway('wallet')} style={{ display: 'none' }} />
                                    </label>
                                    
                                    {gateway === 'wallet' && walletBalance !== null && walletBalance < planPriceInWalletCurrency && (
                                        <div style={{ marginTop: 12, padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12, color: '#92400e', fontSize: '0.9rem', fontWeight: 500 }}>
                                                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                                                Please contact the admin for adding the payment in the wallet before proceeding to buy.
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={handleRequestWalletCredit}
                                                disabled={requestingCredit}
                                                style={{ background: '#d97706', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: requestingCredit ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#b45309'}
                                                onMouseOut={(e) => e.currentTarget.style.background = '#d97706'}
                                            >
                                                {requestingCredit ? 'Requesting...' : 'Request Wallet Credit'}
                                            </button>
                                            {creditRequestSuccess && <div style={{ color: '#16a34a', fontSize: '0.8rem', marginTop: 8, fontWeight: 600 }}>Request submitted! Admin will contact you shortly.</div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Discount */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, border: '1px solid #e5e7eb', borderRadius: 12, marginBottom: 32 }}>
                            <div style={{ paddingLeft: 12, color: '#6b7280' }}>
                                <Ticket size={20} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Have a discount code?" 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.95rem' }}
                            />
                            <button 
                                type="button" 
                                onClick={handleApplyCoupon}
                                disabled={!couponCode || couponState === 'loading'}
                                style={{ background: '#111827', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 700, cursor: !couponCode ? 'not-allowed' : 'pointer', opacity: !couponCode ? 0.5 : 1 }}
                            >
                                {couponState === 'loading' ? '...' : 'Apply'}
                            </button>
                        </div>

                        {/* Pay Button */}
                        <button
                            type="submit"
                            disabled={submitting || !credentialsValid}
                            style={{ width: '100%', height: 64, background: (submitting || !credentialsValid) ? '#9ca3af' : 'linear-gradient(90deg, #111827 0%, #1f2937 100%)', color: '#fff', border: 'none', borderRadius: 12, fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: (submitting || !credentialsValid) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: (submitting || !credentialsValid) ? 'none' : '0 8px 24px rgba(17, 24, 39, 0.2)' }}
                        >
                            {submitting ? 'Processing securely...' : (
                                <>
                                    <Lock size={20} /> {gateway === 'upi-direct' ? 'Submit UTR & Pay' : `Pay Securely ${plan.currency === 'USD' ? '$' : '₹'}${finalAmount.toLocaleString()}`}
                                </>
                            )}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, color: '#6b7280', fontSize: '0.85rem' }}>
                            <ShieldCheck size={16} /> 256-bit SSL encrypted & secured by Razorpay
                        </div>

                    </form>
                </div>

                {/* Right Column - Order Summary */}
                <div className="checkout-summary-column" style={{ width: '380px', flexShrink: 0, background: '#111827', borderRadius: 24, color: '#fff', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(17,24,39,0.2)' }}>
                    
                    {/* Decorative waves top right */}
                    <svg width="200" height="150" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 200 150">
                        <path d="M0 0C50 50 100 0 200 50L200 0L0 0Z" fill="#10b981" />
                        <path d="M0 50C50 100 100 50 200 100" stroke="#10b981" strokeWidth="2" fill="none" />
                        <path d="M0 80C50 130 100 80 200 130" stroke="#10b981" strokeWidth="2" fill="none" />
                    </svg>

                    <div style={{ padding: 32 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                            <div style={{ width: 44, height: 44, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></svg>
                            </div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Order Summary</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                                <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Service</span>
                                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{service.name.toUpperCase()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                                <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Selected Plan</span>
                                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{plan.name.toLowerCase()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 16 }}>
                                <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Duration</span>
                                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{plan.durationDays} days</span>
                            </div>
                        </div>

                        {couponState === 'applied' ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px 16px', borderRadius: 12, marginBottom: 24 }}>
                                <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle2 size={16} /> {couponCode}
                                </div>
                                <button type="button" onClick={removeCoupon} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, marginBottom: 24 }}>
                                <div style={{ paddingLeft: 10, color: '#9ca3af' }}>
                                    <Ticket size={18} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Discount Code" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    style={{ flex: 1, border: 'none', background: 'transparent', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                                />
                                <button 
                                    type="button" 
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode || couponState === 'loading'}
                                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: '0.85rem', cursor: !couponCode ? 'not-allowed' : 'pointer', opacity: !couponCode ? 0.5 : 1 }}
                                >
                                    Apply
                                </button>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <span style={{ color: '#9ca3af', fontSize: '0.95rem' }}>Subtotal</span>
                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}</span>
                        </div>

                        {couponState === 'applied' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, color: '#34d399' }}>
                                <span style={{ fontSize: '0.95rem' }}>Discount ({couponCode})</span>
                                <span style={{ fontWeight: 700, fontSize: '1rem' }}>-{plan.currency === 'USD' ? '$' : '₹'}{discountAmount.toLocaleString()}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: 12, marginTop: 16 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: 800 }}>{plan.currency === 'USD' ? '$' : '₹'}{finalAmount.toLocaleString()}</span>
                        </div>

                        {/* Features */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>Instant Delivery</div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Get access instantly after payment</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>100% Safe & Secure</div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Your payments are fully protected</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Award size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>Official Accounts</div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>100% genuine and official subscriptions</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Headphones size={18} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>24/7 Customer Support</div>
                                    <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>We&apos;re here to help you anytime</div>
                                </div>
                            </div>
                        </div>

                        {/* We Accept */}
                        <div style={{ marginTop: 32 }}>
                            <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 12 }}>We Accept</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: '0.8rem', fontWeight: 700, fontStyle: 'italic' }}>VISA</div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: -2 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eb001b' }}></div>
                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f79e1b', marginLeft: -4 }}></div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: '0.8rem', fontWeight: 700, fontStyle: 'italic' }}>UPI</div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: '0.8rem', fontWeight: 700, fontStyle: 'italic' }}>RuPay</div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>&amp; More</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Info Cards */}
            <div className="checkout-info-cards" style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#10b981', background: '#f0fdf4', padding: 8, borderRadius: 12 }}>
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>100% Secure Payments</div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Your payments are safe and encrypted.</div>
                    </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#10b981', background: '#f0fdf4', padding: 8, borderRadius: 12 }}>
                        <Zap size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>Instant Delivery</div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Get access instantly after purchase.</div>
                    </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#10b981', background: '#f0fdf4', padding: 8, borderRadius: 12 }}>
                        <Award size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>Official Accounts</div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>100% genuine and official subscriptions.</div>
                    </div>
                </div>
                <div style={{ background: '#fff', borderRadius: 16, padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#10b981', background: '#f0fdf4', padding: 8, borderRadius: 12 }}>
                        <Headphones size={24} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>24/7 Customer Support</div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>We&apos;re here to help you anytime.</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
