'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Lock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirm) { setError('Passwords do not match'); return; }
        if (!token) { setError('Missing reset token. Please use the link from your email.'); return; }
        setStatus('loading');
        try {
            await api.post('/auth/reset-password', { token, password });
            setStatus('success');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. The link may be expired.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div style={styles.card}>
                <div style={{ ...styles.accentBar, background: 'linear-gradient(90deg, #22c55e, #10b981)' }}></div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <CheckCircle2 size={48} style={{ color: '#22c55e' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23', textAlign: 'center', marginBottom: 12 }}>Password updated!</h2>
                <p style={{ color: '#888', textAlign: 'center', marginBottom: 28, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Your password has been successfully reset. You can now use your new password to log in.
                </p>
                <Link href="/login" style={styles.btn}>Go to Login</Link>
            </div>
        );
    }

    return (
        <div style={styles.card}>
            <div style={styles.accentBar}></div>
            <div style={styles.glowOrb}></div>
            <div style={{ marginBottom: 28, position: 'relative', zIndex: 10 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23', marginBottom: 8 }}>Set new password</h1>
                <p style={{ fontSize: '0.85rem', color: '#888' }}>Please choose a strong password with at least 8 characters.</p>
            </div>

            {error && (
                <div style={styles.errorBox}>
                    <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: '0.85rem', color: '#dc2626' }}>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ marginBottom: 20 }}>
                    <label style={styles.label}>New Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={styles.inputIcon} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="••••••••" minLength={8} required />
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={styles.label}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={styles.inputIcon} />
                        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={styles.input} placeholder="••••••••" required />
                    </div>
                </div>
                <button type="submit" disabled={status === 'loading'} style={styles.submitBtn}>
                    {status === 'loading' ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div style={styles.pageWrapper}>
            <Suspense fallback={<div style={{ width: 40, height: 40, border: '4px solid #eee', borderTop: '4px solid #6c5ce7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}

const styles: { [k: string]: React.CSSProperties } = {
    pageWrapper: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' },
    card: { width: '100%', maxWidth: 440, background: '#fff', border: '1px solid #eee', borderRadius: 24, padding: '40px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' },
    accentBar: { position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #6c5ce7, #a55eea)', opacity: 0.8 },
    glowOrb: { position: 'absolute', top: -80, right: -80, width: 200, height: 200, background: 'rgba(108,92,231,0.08)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' },
    errorBox: { marginBottom: 24, padding: '14px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 12 },
    label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333', marginBottom: 8, marginLeft: 4 },
    inputIcon: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999' },
    input: { width: '100%', background: '#f8f9fc', border: '1.5px solid #e8e8e8', color: '#1a1c23', borderRadius: 14, padding: '14px 16px 14px 42px', fontSize: '0.9rem', outline: 'none', fontFamily: 'Outfit, sans-serif' },
    submitBtn: { width: '100%', background: '#6c5ce7', color: 'white', fontWeight: 700, borderRadius: 14, padding: '14px', fontSize: '0.95rem', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, marginTop: 8, fontFamily: 'Outfit, sans-serif' },
    btn: { display: 'block', width: '100%', background: '#6c5ce7', color: 'white', fontWeight: 700, borderRadius: 14, padding: '14px', fontSize: '0.95rem', textDecoration: 'none', textAlign: 'center' },
};
