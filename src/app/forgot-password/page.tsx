'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Mail, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatus('loading');

        try {
            await api.post('/auth/forgot-password', { email });
            setStatus('success');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send reset link.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div style={styles.pageWrapper}>
                <div style={styles.card}>
                    <div style={styles.accentBar}></div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                        <CheckCircle2 size={48} style={{ color: '#6c5ce7' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23', textAlign: 'center', marginBottom: 12 }}>Reset link sent!</h2>
                    <p style={{ color: '#888', textAlign: 'center', marginBottom: 28, fontSize: '0.9rem', lineHeight: 1.6 }}>
                        We&apos;ve sent a password reset link to <span style={{ color: '#1a1c23', fontWeight: 600 }}>{email}</span>.
                        Please check your inbox.
                    </p>
                    <Link href="/login" style={{ ...styles.submitBtn, textDecoration: 'none', textAlign: 'center' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.card}>
                <div style={styles.accentBar}></div>
                <div style={styles.glowOrb}></div>

                <div style={{ marginBottom: 28, position: 'relative', zIndex: 10 }}>
                    <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#888', textDecoration: 'none', marginBottom: 20 }}>
                        <ArrowLeft size={16} /> Back to login
                    </Link>
                    <h1 style={styles.title}>Reset password</h1>
                    <p style={styles.subtitle}>Enter your email and we&apos;ll send you a link to reset your password.</p>
                </div>

                {error && (
                    <div style={styles.errorBox}>
                        <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0, marginTop: 2 }} />
                        <p style={styles.errorText}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10 }}>
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={status === 'loading'} style={styles.submitBtn}>
                        {status === 'loading' ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    pageWrapper: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
    },
    card: {
        width: '100%',
        maxWidth: 440,
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 24,
        padding: '40px 36px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden',
    },
    accentBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 4,
        background: 'linear-gradient(90deg, #6c5ce7, #a55eea, #6c5ce7)',
        opacity: 0.8,
    },
    glowOrb: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 200,
        height: 200,
        background: 'rgba(108,92,231,0.08)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#1a1c23',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: '0.9rem',
        color: '#888',
    },
    errorBox: {
        marginBottom: 24,
        padding: '14px 16px',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
    },
    errorText: {
        fontSize: '0.85rem',
        color: '#dc2626',
    },
    fieldGroup: {
        marginBottom: 20,
    },
    label: {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#999',
    },
    input: {
        width: '100%',
        background: '#f8f9fc',
        border: '1.5px solid #e8e8e8',
        color: '#1a1c23',
        borderRadius: 14,
        padding: '14px 16px 14px 42px',
        fontSize: '0.9rem',
        outline: 'none',
        fontFamily: 'Outfit, sans-serif',
        transition: 'border-color 0.2s',
    },
    submitBtn: {
        width: '100%',
        background: '#6c5ce7',
        color: 'white',
        fontWeight: 700,
        borderRadius: 14,
        padding: '14px',
        fontSize: '0.95rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 8,
        fontFamily: 'Outfit, sans-serif',
        transition: 'background 0.2s',
    },
};
