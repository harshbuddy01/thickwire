'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { QrCode, Copy, CheckCircle2, Clock, AlertCircle, Globe, Loader2, Send, Download } from 'lucide-react';
import Image from 'next/image';

interface WalletTopupSectionProps {
    walletData: any;
    onSuccess: () => void;
}

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (typeof window !== 'undefined' && (window as any).Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function WalletTopupSection({ walletData, onSuccess }: WalletTopupSectionProps) {
    const [isIndian, setIsIndian] = useState<boolean | null>(null);
    const [amount, setAmount] = useState('');
    const [qrCodeId, setQrCodeId] = useState<string | null>(null);
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const [qrAmount, setQrAmount] = useState<number | null>(null);
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'GENERATED' | 'SUCCESS' | 'EXPIRED'>('IDLE');
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileQr, setShowMobileQr] = useState(false);
    const [copied, setCopied] = useState(false);

    // Razorpay top-up states (for international/fallback)
    const [topUpAmount, setTopUpAmount] = useState('');
    const [isToppingUp, setIsToppingUp] = useState(false);

    // Crypto top-up states
    const [cryptoAmount, setCryptoAmount] = useState('');
    const [isCryptoLoading, setIsCryptoLoading] = useState(false);

    useEffect(() => {
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        
        // Auto-detect if Indian user via IP geolocation
        const detectCountry = async () => {
            try {
                const res = await fetch('https://get.geojs.io/v1/ip/country.json');
                const data = await res.json();
                const isIN = data.country === 'IN';
                setIsIndian(isIN);
            } catch {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const isIN = tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta');
                setIsIndian(isIN);
            }
        };
        detectCountry();
    }, []);

    // Polling and Timer Hook
    useEffect(() => {
        let pollInterval: any;
        let timerInterval: any;

        if (status === 'GENERATED' && qrCodeId) {
            // Poll for approval status
            pollInterval = setInterval(async () => {
                try {
                    const { data } = await api.get(`/wallet/utr/status/${qrCodeId}`);
                    if (data.status === 'APPROVED') {
                        setStatus('SUCCESS');
                        onSuccess();
                    }
                } catch (err) {
                    console.error('Polling status check failed:', err);
                }
            }, 3000);

            // Timer countdown
            timerInterval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setStatus('EXPIRED');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (pollInterval) clearInterval(pollInterval);
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [status, qrCodeId, onSuccess]);

    const handleGenerateDynamicQr = async () => {
        if (!amount || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        setStatus('LOADING');
        try {
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                alert('Failed to load secure UPI checkout. Please check your internet connection.');
                setStatus('IDLE');
                return;
            }

            const { data } = await api.post('/wallet/topup', {
                amount: Number(amount),
                currency: walletData?.currency || 'INR',
            });

            const options = {
                key: data.keyId,
                amount: Math.round(data.amount * 100),
                currency: data.currency,
                name: 'StreamKart Wallet',
                description: 'Wallet Top-Up',
                order_id: data.razorpayOrderId,
                method: {
                    upi: true,
                    card: false,
                    netbanking: false,
                    wallet: false,
                    emi: false,
                    paylater: false
                },
                handler: async function (response: any) {
                    setStatus('LOADING');
                    try {
                        await api.post('/wallet/topup/confirm', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        alert('Wallet topped up successfully!');
                        setStatus('SUCCESS');
                        setQrAmount(Number(amount));
                        onSuccess();
                    } catch (err: any) {
                        alert(err.response?.data?.message || 'Failed to confirm top-up. Please contact support.');
                        setStatus('IDLE');
                    }
                },
                theme: { color: '#6c5ce7' },
                modal: {
                    ondismiss: function () {
                        setStatus('IDLE');
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to initiate wallet top-up. Please try again.');
            setStatus('IDLE');
        }
    };

    const handleCopyPaymentUrl = () => {
        if (paymentUrl) {
            navigator.clipboard.writeText(paymentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRazorpayTopUp = async () => {
        if (!topUpAmount || Number(topUpAmount) <= 0) return alert('Enter a valid amount');
        setIsToppingUp(true);
        try {
            const { data } = await api.post('/wallet/topup', {
                amount: Number(topUpAmount),
                currency: walletData?.currency || 'INR',
            });

            const options = {
                key: data.keyId,
                amount: Math.round(data.amount * 100),
                currency: data.currency,
                name: 'StreamKart Wallet',
                description: 'Wallet Top-Up',
                order_id: data.razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        await api.post('/wallet/topup/confirm', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        alert('Wallet topped up successfully!');
                        setTopUpAmount('');
                        onSuccess();
                    } catch {
                        alert('Failed to confirm top-up. Please contact support.');
                    }
                },
                theme: { color: '#6c5ce7' },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function () { alert('Payment failed'); });
            rzp.open();
        } catch {
            alert('Top-up failed to initiate');
        } finally {
            setIsToppingUp(false);
        }
    };

    const handleRequestCredit = async () => {
        try {
            await api.post('/support', {
                customerName: 'Auto',
                customerEmail: 'auto',
                subject: 'Wallet Credit Request',
                message: `I would like to add funds to my wallet. My preferred currency is ${walletData?.currency || 'USD'}. Please share payment details.`,
            });
            alert('Support ticket created! Our team will reach out with payment details shortly.');
        } catch {
            alert('Failed to create support ticket. Please try again or contact us directly.');
        }
    };

    // ─── Indian User Flow ──────────────────────────────────
    if (isIndian) {
        return (
            <div>
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: .6; transform: scale(1.05); }
                    }
                    @keyframes success-scale {
                        0% { transform: scale(0.6); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>

                {status === 'IDLE' && (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24,
                        padding: 28, boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{
                                width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #6c5ce7, #a55eea)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                                boxShadow: '0 4px 10px rgba(108, 92, 231, 0.2)',
                            }}>
                                <QrCode size={22} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a1c23', margin: 0 }}>
                                    Instant UPI Wallet Top-Up
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
                                    Generate a dynamic single-use QR for instant credit
                                </p>
                            </div>
                        </div>

                        {/* Amount Preset Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                            {[100, 200, 500, 1000, 2000].map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => setAmount(String(preset))}
                                    style={{
                                        padding: '10px 20px', borderRadius: 14,
                                        background: amount === String(preset) ? 'linear-gradient(135deg, #6c5ce7, #a55eea)' : '#f8fafc',
                                        border: `1px solid ${amount === String(preset) ? 'transparent' : '#e2e8f0'}`,
                                        color: amount === String(preset) ? '#fff' : '#475569',
                                        fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: amount === String(preset) ? '0 4px 12px rgba(108, 92, 231, 0.2)' : 'none',
                                    }}
                                >
                                    ₹{preset}
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount Input */}
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Enter Custom Amount (₹)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 16, top: 14, fontWeight: 800, fontSize: '1.2rem', color: '#64748b' }}>₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    style={{
                                        width: '100%', padding: '14px 16px 14px 36px', borderRadius: 16,
                                        border: '2px solid #e2e8f0', fontSize: '1.2rem', fontWeight: 800,
                                        outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                                        color: '#1e293b',
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#6c5ce7'}
                                    onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateDynamicQr}
                            disabled={!amount || Number(amount) <= 0}
                            style={{
                                width: '100%', padding: '16px', background: 'linear-gradient(135deg, #6c5ce7, #a55eea)',
                                border: 'none', borderRadius: 16, color: 'white', fontSize: '1rem',
                                fontWeight: 800, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                fontFamily: 'Outfit, sans-serif', boxShadow: '0 6px 16px rgba(108, 92, 231, 0.3)',
                                transition: 'all 0.2s',
                            }}
                        >
                            Generate Dynamic QR
                        </button>
                    </div>
                )}

                {status === 'LOADING' && (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24,
                        padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', minHeight: 300, boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
                    }}>
                        <Loader2 size={40} style={{ color: '#6c5ce7', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23', margin: 0 }}>
                            Generating Secure UPI QR...
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 6, textAlign: 'center' }}>
                            Creating a single-use payment link for ₹{amount}
                        </p>
                    </div>
                )}

                {status === 'GENERATED' && (
                    <div style={{
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: 24,
                        padding: 28, boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 16 }}>
                            <span style={{ fontSize: '0.75rem', background: '#f1eeff', color: '#6c5ce7', padding: '6px 12px', borderRadius: 20, fontWeight: 800, textTransform: 'uppercase' }}>
                                Dynamic UPI QR
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 700, color: '#ef4444' }}>
                                <Clock size={14} /> Expires in: {formatTime(timeLeft)}
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Amount to Pay</div>
                            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e293b', marginTop: 4 }}>₹{qrAmount}</div>
                        </div>

                        {/* Mobile view Intent CTA */}
                        {isMobile ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                <a
                                    href={paymentUrl || ''}
                                    style={{
                                        width: '100%', padding: '16px', background: 'linear-gradient(135deg, #10b981, #059669)',
                                        borderRadius: 16, color: 'white', fontSize: '1.05rem', textDecoration: 'none',
                                        fontWeight: 800, textAlign: 'center', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', gap: 8, boxShadow: '0 6px 16px rgba(16, 185, 129, 0.25)',
                                        fontFamily: 'Outfit, sans-serif'
                                    }}
                                >
                                    📱 Tap to Pay on Mobile
                                </a>
                                
                                <button
                                    onClick={() => setShowMobileQr(!showMobileQr)}
                                    style={{
                                        background: 'none', border: 'none', color: '#6c5ce7', fontWeight: 700,
                                        fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline'
                                    }}
                                >
                                    {showMobileQr ? 'Hide QR Code' : 'Show QR Code to Scan'}
                                </button>

                                {showMobileQr && qrImageUrl && (
                                    <div style={{
                                        padding: 16, background: '#f8fafc', borderRadius: 20,
                                        border: '2px dashed #e2e8f0', display: 'flex', justifyContent: 'center',
                                        marginTop: 10, width: 220, height: 220, boxSizing: 'border-box'
                                    }}>
                                        <img src={qrImageUrl} alt="UPI QR" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Desktop QR View */
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
                                <div style={{
                                    padding: 16, background: '#f8fafc', borderRadius: 20,
                                    border: '2px dashed #e2e8f0', display: 'flex', justifyContent: 'center',
                                    width: 220, height: 220, boxSizing: 'border-box'
                                }}>
                                    {qrImageUrl ? (
                                        <img src={qrImageUrl} alt="UPI QR" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    ) : (
                                        <QrCode size={60} style={{ color: '#cbd5e1' }} />
                                    )}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: 0, padding: '0 20px', lineHeight: 1.5 }}>
                                    Scan this single-use QR using any UPI app (GPay, PhonePe, Paytm, BHIM) to complete your payment.
                                </p>
                            </div>
                        )}

                        {/* Polling Pulsing dot */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, marginTop: 24,
                            background: '#f8fafc', padding: '10px 18px', borderRadius: 30,
                            border: '1px solid #f1f5f9',
                        }}>
                            <span style={{
                                width: 8, height: 8, borderRadius: '50%', background: '#10b981',
                                animation: 'pulse 1.5s infinite', display: 'inline-block'
                            }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
                                Waiting for your payment...
                            </span>
                        </div>

                        {/* Cancel/Reset */}
                        <button
                            onClick={() => {
                                setStatus('IDLE');
                                setQrCodeId(null);
                                setQrImageUrl(null);
                                setPaymentUrl(null);
                            }}
                            style={{
                                background: 'none', border: 'none', color: '#94a3b8',
                                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                marginTop: 20, transition: 'color 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
                            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                        >
                            Cancel and Change Amount
                        </button>
                    </div>
                )}

                {status === 'SUCCESS' && (
                    <div style={{
                        background: '#fff', border: '1px solid #bbf7d0', borderRadius: 24,
                        padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.05)',
                        animation: 'success-scale 0.4s ease-out', textAlign: 'center'
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#10b981', marginBottom: 18, border: '2px solid #bbf7d0',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
                        }}>
                            <CheckCircle2 size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534', margin: 0 }}>
                            Payment Successful!
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#15803d', marginTop: 6, lineHeight: 1.5 }}>
                            ₹{qrAmount} has been credited to your wallet balance.
                        </p>

                        <button
                            onClick={() => {
                                setStatus('IDLE');
                                setAmount('');
                                setQrCodeId(null);
                                setQrImageUrl(null);
                                setPaymentUrl(null);
                            }}
                            style={{
                                marginTop: 24, padding: '12px 28px', background: '#10b981',
                                border: 'none', borderRadius: 12, color: 'white', fontWeight: 800,
                                cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                            }}
                        >
                            Back to Wallet
                        </button>
                    </div>
                )}

                {status === 'EXPIRED' && (
                    <div style={{
                        background: '#fff', border: '1px solid #fecaca', borderRadius: 24,
                        padding: 36, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.05)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%', background: '#fef2f2',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#ef4444', marginBottom: 18, border: '2px solid #fecaca'
                        }}>
                            <AlertCircle size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#991b1b', margin: 0 }}>
                            Payment Link Expired
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: '#b91c1c', marginTop: 6, lineHeight: 1.5 }}>
                            The dynamic payment session has expired. No charges were made.
                        </p>

                        <button
                            onClick={() => {
                                setStatus('IDLE');
                                setQrCodeId(null);
                                setQrImageUrl(null);
                                setPaymentUrl(null);
                            }}
                            style={{
                                marginTop: 24, padding: '12px 28px', background: '#ef4444',
                                border: 'none', borderRadius: 12, color: 'white', fontWeight: 800,
                                cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)', transition: 'all 0.2s'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Divider space */}
                <div style={{ height: 20 }} />
            </div>
        );
    }

    // ─── International User Flow ──────────────────────────

    const handleCryptoTopUp = async () => {
        if (!cryptoAmount || Number(cryptoAmount) <= 0) return alert('Please enter a valid amount');
        setIsCryptoLoading(true);
        try {
            const { data } = await api.post('/wallet/topup/crypto', {
                amount: Number(cryptoAmount),
            });
            if (data.invoiceUrl) {
                window.location.href = data.invoiceUrl;
            } else {
                alert('Failed to create crypto payment. Please try again.');
            }
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to initiate crypto top-up. Please try again.');
        } finally {
            setIsCryptoLoading(false);
        }
    };

    return (
        <div>
            {/* Crypto Top-Up */}
            <div style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                padding: 24, marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #f7931a, #f3ba2f, #f7931a)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'linear-gradient(135deg, #f7931a, #f3ba2f)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 4.6-4.6a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 0 2.8 0l1.4-1.4a4 4 0 0 0 0-5.65l-1.4-1.4"/><path d="M12 2v2"/></svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23', margin: 0 }}>
                        Top Up with Crypto
                    </h3>
                    <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>RECOMMENDED</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>
                    Pay with USDT, BTC, ETH, SOL, BNB, and 100+ cryptocurrencies. Funds are credited to your wallet automatically.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: 12, top: 11, fontWeight: 700, opacity: 0.6 }}>$</span>
                        <input
                            type="number"
                            value={cryptoAmount}
                            onChange={e => setCryptoAmount(e.target.value)}
                            placeholder="Amount in USD"
                            min={0.01}
                            step={0.01}
                            style={{
                                width: '100%', padding: '12px 12px 12px 28px', borderRadius: 12,
                                border: '1px solid #e2e8f0', fontSize: '0.95rem', fontWeight: 600,
                                outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <button
                        onClick={handleCryptoTopUp}
                        disabled={isCryptoLoading || !cryptoAmount || Number(cryptoAmount) <= 0}
                        style={{
                            padding: '12px 24px',
                            background: isCryptoLoading ? '#94a3b8' : 'linear-gradient(135deg, #f7931a, #f3ba2f)',
                            color: 'white', border: 'none', borderRadius: 12, fontWeight: 800,
                            cursor: (isCryptoLoading || !cryptoAmount || Number(cryptoAmount) <= 0) ? 'not-allowed' : 'pointer',
                            fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 12px rgba(247,147,26,0.3)',
                            minWidth: 80,
                        }}
                    >
                        {isCryptoLoading ? '...' : 'Pay'}
                    </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {[1, 5, 10, 20, 50].map((amt) => (
                        <button
                            key={amt}
                            type="button"
                            onClick={() => setCryptoAmount(String(amt))}
                            style={{
                                padding: '6px 14px', borderRadius: 8,
                                background: cryptoAmount === String(amt) ? '#f7931a' : '#f8fafc',
                                border: `1px solid ${cryptoAmount === String(amt) ? '#f7931a' : '#e2e8f0'}`,
                                color: cryptoAmount === String(amt) ? '#fff' : '#64748b',
                                fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            ${amt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Razorpay Top-Up (Card payment) */}
            <div style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                padding: 24, marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <Globe size={20} style={{ color: '#6c5ce7' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23', margin: 0 }}>
                        Top Up via Card
                    </h3>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: 12, top: 11, fontWeight: 700, opacity: 0.6 }}>{walletData?.symbol || '$'}</span>
                        <input
                            type="number"
                            value={topUpAmount}
                            onChange={e => setTopUpAmount(e.target.value)}
                            placeholder="Amount"
                            style={{
                                width: '100%', padding: '12px 12px 12px 28px', borderRadius: 12,
                                border: '1px solid #e2e8f0', fontSize: '0.95rem', fontWeight: 600,
                                outline: 'none', boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <button
                        onClick={handleRazorpayTopUp}
                        disabled={isToppingUp}
                        style={{
                            padding: '12px 24px', background: '#6c5ce7', color: 'white',
                            border: 'none', borderRadius: 12, fontWeight: 800, cursor: isToppingUp ? 'not-allowed' : 'pointer',
                            fontFamily: 'Outfit, sans-serif',
                        }}
                    >
                        {isToppingUp ? '...' : 'Add'}
                    </button>
                </div>
            </div>

            {/* Request Credit */}
            <div style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
            }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1c23', marginBottom: 8 }}>
                    Need another payment method?
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>
                    We also support bank transfers and PayPal. Click below to create a support ticket and our team will share payment details.
                </p>
                <button
                    onClick={handleRequestCredit}
                    style={{
                        width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                        border: 'none', borderRadius: 14, color: 'white', fontSize: '0.95rem',
                        fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    }}
                >
                    <Send size={16} /> Request Credit
                </button>
            </div>
        </div>
    );
}
