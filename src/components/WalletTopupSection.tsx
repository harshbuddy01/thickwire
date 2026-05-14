'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { QrCode, Copy, CheckCircle2, Clock, AlertCircle, Globe, Loader2, Send, Download } from 'lucide-react';
import Image from 'next/image';

interface WalletTopupSectionProps {
    walletData: any;
    onSuccess: () => void;
}

export default function WalletTopupSection({ walletData, onSuccess }: WalletTopupSectionProps) {
    const [isIndian, setIsIndian] = useState<boolean | null>(null);
    const [qrDetails, setQrDetails] = useState<any>(null);
    const [utr, setUtr] = useState('');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    // Razorpay top-up states (for international/fallback)
    const [topUpAmount, setTopUpAmount] = useState('');
    const [isToppingUp, setIsToppingUp] = useState(false);

    useEffect(() => {
        // Auto-detect if Indian user
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isIN = tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta');
        setIsIndian(isIN);

        if (isIN) {
            fetchQrDetails();
        }
    }, []);

    const fetchQrDetails = async () => {
        try {
            const { data } = await api.get('/wallet/utr/qr-details');
            setQrDetails(data);
        } catch (err) {
            console.error('Failed to fetch QR details:', err);
        }
    };

    const handleCopyUpi = () => {
        if (qrDetails?.upiId) {
            navigator.clipboard.writeText(qrDetails.upiId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownloadQr = () => {
        if (!qrDetails?.qrImageUrl) return;
        const link = document.createElement('a');
        link.href = qrDetails.qrImageUrl;
        link.download = 'StreamKart_Payment_QR.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmitUtr = async () => {
        if (!utr.trim() || !amount || Number(amount) <= 0) {
            alert('Please enter both UTR and amount');
            return;
        }
        setIsSubmitting(true);
        setResult(null);
        try {
            const { data } = await api.post('/wallet/utr/submit', {
                utr: utr.trim(),
                amount: Number(amount),
            });
            setResult(data);
            if (data.status === 'MATCHED') {
                setUtr('');
                setAmount('');
                onSuccess();
            }
        } catch (err: any) {
            setResult({
                success: false,
                message: err.response?.data?.message || 'Failed to submit UTR. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
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
                {/* QR + UPI Section */}
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                    padding: 24, marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10, background: '#f1eeff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c5ce7',
                        }}>
                            <QrCode size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23', margin: 0 }}>
                            Pay via UPI
                        </h3>
                    </div>

                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {/* QR Code */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{
                                width: 220, minHeight: 220, background: '#f8fafc', borderRadius: 16,
                                border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', overflow: 'hidden', flexShrink: 0, padding: 12
                            }}>
                                {qrDetails?.qrImageUrl ? (
                                    <img
                                        src={qrDetails.qrImageUrl}
                                        alt="UPI QR Code"
                                        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                                    />
                                ) : (
                                    <QrCode size={60} style={{ color: '#cbd5e1' }} />
                                )}
                            </div>
                            
                            {qrDetails?.qrImageUrl && (
                                <button
                                    onClick={handleDownloadQr}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        width: '100%', padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0',
                                        borderRadius: 12, color: '#334155', fontSize: '0.85rem', fontWeight: 700,
                                        cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#334155'; }}
                                >
                                    <Download size={16} /> Save QR Code
                                </button>
                            )}
                        </div>

                        {/* UPI ID + Instructions */}
                        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {qrDetails?.upiId && qrDetails.upiId.includes('@') && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        UPI ID
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        background: '#f1f5f9', borderRadius: 12, padding: '10px 14px',
                                        border: '1px solid #e2e8f0',
                                    }}>
                                        <code style={{ fontWeight: 700, fontSize: '0.95rem', color: '#6c5ce7', flex: 1 }}>
                                            {qrDetails.upiId}
                                        </code>
                                        <button onClick={handleCopyUpi} style={{
                                            background: copied ? '#10b981' : '#6c5ce7', border: 'none',
                                            borderRadius: 8, padding: '6px 12px', color: 'white',
                                            fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: 4, transition: 'background 0.2s',
                                        }}>
                                            {copied ? <><CheckCircle2 size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {qrDetails?.instructions && (
                                <ol style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: '#64748b', lineHeight: 1.8 }}>
                                    {qrDetails.instructions.map((inst: string, i: number) => (
                                        <li key={i}>{inst}</li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    </div>
                </div>

                {/* UTR Submission Form */}
                <div style={{
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
                    padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1c23', marginBottom: 16 }}>
                        Submit UTR Number
                    </h3>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 2, minWidth: 180 }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: 6 }}>
                                UTR Number (12 digits)
                            </label>
                            <input
                                type="text"
                                value={utr}
                                onChange={e => setUtr(e.target.value)}
                                placeholder="e.g. 412345678901"
                                maxLength={20}
                                style={{
                                    width: '100%', padding: '12px 14px', borderRadius: 12,
                                    border: '1px solid #e2e8f0', fontSize: '0.9rem', fontWeight: 600,
                                    fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
                                    transition: 'border 0.2s',
                                }}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: 120 }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: 6 }}>
                                Amount (₹)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="₹500"
                                style={{
                                    width: '100%', padding: '12px 14px', borderRadius: 12,
                                    border: '1px solid #e2e8f0', fontSize: '0.9rem', fontWeight: 600,
                                    outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmitUtr}
                        disabled={isSubmitting || !utr.trim() || !amount}
                        style={{
                            width: '100%', padding: '14px', background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #6c5ce7, #a55eea)',
                            border: 'none', borderRadius: 14, color: 'white', fontSize: '0.95rem',
                            fontWeight: 800, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isSubmitting ? (
                            <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</>
                        ) : (
                            <><Send size={16} /> Submit UTR</>
                        )}
                    </button>

                    {/* Result Message */}
                    {result && (
                        <div style={{
                            marginTop: 16, padding: '14px 16px', borderRadius: 14,
                            display: 'flex', alignItems: 'flex-start', gap: 12,
                            ...(result.status === 'MATCHED' ? {
                                background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534',
                            } : result.status === 'PENDING' ? {
                                background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e',
                            } : {
                                background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b',
                            }),
                        }}>
                            {result.status === 'MATCHED' ? <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 1 }} /> :
                             result.status === 'PENDING' ? <Clock size={20} style={{ flexShrink: 0, marginTop: 1 }} /> :
                             <AlertCircle size={20} style={{ flexShrink: 0, marginTop: 1 }} />}
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                                    {result.status === 'MATCHED' ? 'Wallet Credited!' :
                                     result.status === 'PENDING' ? 'Under Review' : 'Error'}
                                </div>
                                <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{result.message}</div>
                            </div>
                        </div>
                    )}
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ─── International User Flow ──────────────────────────
    return (
        <div>
            {/* Razorpay Top-Up (if supported in their currency) */}
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
                    We support bank transfers, PayPal, and cryptocurrency. Click below to create a support ticket and our team will share payment details.
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
