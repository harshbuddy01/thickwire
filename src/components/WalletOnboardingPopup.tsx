'use client';

import { useState, useEffect } from 'react';
import { X, Wallet, QrCode, Globe, ArrowRight, Sparkles } from 'lucide-react';

interface WalletOnboardingPopupProps {
    onClose: () => void;
}

export default function WalletOnboardingPopup({ onClose }: WalletOnboardingPopupProps) {
    const [isIndian, setIsIndian] = useState<boolean>(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Auto-detect country via timezone or locale
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isIN = tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta');
        setIsIndian(isIN);
    }, []);

    const indianSteps = [
        {
            icon: <Wallet size={32} />,
            title: 'Your StreamKart Wallet',
            desc: 'All purchases on StreamKart are made from your wallet balance. Top up your wallet to start buying services.',
        },
        {
            icon: <QrCode size={32} />,
            title: 'Pay via UPI — Instant!',
            desc: 'Scan our QR code or pay to our UPI ID using GPay, PhonePe, Paytm, or any UPI app. Then submit your 12-digit UTR number.',
        },
        {
            icon: <Sparkles size={32} />,
            title: 'Auto-Credit in Seconds',
            desc: 'Once you submit the UTR, your wallet is credited instantly. If the payment takes a moment to verify, it\u2019ll be credited within 30 minutes.',
        },
    ];

    const internationalSteps = [
        {
            icon: <Wallet size={32} />,
            title: 'Your StreamKart Wallet',
            desc: 'All purchases on StreamKart are made from your wallet balance. Top up your wallet to start buying services.',
        },
        {
            icon: <Globe size={32} />,
            title: 'Request Credit',
            desc: 'Click "Request Credit" on the wallet page. This creates a support ticket with our team.',
        },
        {
            icon: <Sparkles size={32} />,
            title: 'We\u2019ll Credit You',
            desc: 'Our team will share payment details (bank transfer, PayPal, crypto). Once confirmed, your wallet is credited in your local currency.',
        },
    ];

    const steps = isIndian ? indianSteps : internationalSteps;



    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
            animation: 'fadeIn 0.3s ease-out',
        }}>
            <div style={{
                background: 'white', width: '100%', maxWidth: '480px', borderRadius: '28px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)', overflow: 'hidden',
                animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #6c5ce7, #a55eea)',
                    padding: '32px 28px 28px', color: 'white', position: 'relative',
                }}>
                    <button onClick={onClose} style={{
                        position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)',
                        border: 'none', borderRadius: '50%', width: 32, height: 32,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', cursor: 'pointer', transition: 'background 0.2s',
                    }}>
                        <X size={18} />
                    </button>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    }}>
                        {steps[step].icon}
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px' }}>
                        {steps[step].title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9, margin: 0, lineHeight: 1.5 }}>
                        {steps[step].desc}
                    </p>
                </div>

                {/* Progress + Navigation */}
                <div style={{ padding: '24px 28px' }}>
                    {/* Progress dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                        {steps.map((_, i) => (
                            <div key={i} style={{
                                width: i === step ? 24 : 8, height: 8, borderRadius: 4,
                                background: i === step ? '#6c5ce7' : '#e2e8f0',
                                transition: 'all 0.3s ease',
                            }} />
                        ))}
                    </div>

                    {/* Country badge */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 8, marginBottom: 20, fontSize: '0.8rem', color: '#64748b',
                    }}>
                        <span>{isIndian ? '🇮🇳' : '🌍'}</span>
                        <span>{isIndian ? 'Indian user — UPI payment available' : 'International user — admin-assisted credit'}</span>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 12 }}>
                        {step > 0 && (
                            <button onClick={() => setStep(step - 1)} style={{
                                flex: 1, padding: '14px', background: '#f1f5f9', border: 'none',
                                borderRadius: 14, fontSize: '0.9rem', fontWeight: 700,
                                color: '#475569', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                            }}>
                                Back
                            </button>
                        )}
                        <button onClick={() => {
                            if (step < steps.length - 1) {
                                setStep(step + 1);
                            } else {
                                onClose();
                            }
                        }} style={{
                            flex: 1, padding: '14px', background: 'linear-gradient(135deg, #6c5ce7, #a55eea)',
                            border: 'none', borderRadius: 14, fontSize: '0.9rem', fontWeight: 700,
                            color: 'white', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            boxShadow: '0 4px 12px rgba(108, 92, 231, 0.3)',
                        }}>
                            {step < steps.length - 1 ? (
                                <>Next <ArrowRight size={16} /></>
                            ) : (
                                'Got it! →'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
}
