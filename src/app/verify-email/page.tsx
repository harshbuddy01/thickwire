'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { setAuth } = useAuth();

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }

        const verify = async () => {
            try {
                const { data } = await api.post('/auth/verify-email', { token });
                setAuth(data.accessToken);
                setStatus('success');
                setMessage('Email verified successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/account';
                }, 2000);
            } catch (err: any) {
                setStatus('error');
                setMessage(err.response?.data?.message || 'Verification failed. The link may be expired.');
            }
        };

        verify();
    }, [token, setAuth]);

    const iconColor = status === 'loading' ? '#6c5ce7' : status === 'success' ? '#22c55e' : '#ef4444';
    const accentBg = status === 'loading' ? 'linear-gradient(90deg, #6c5ce7, #a55eea)' : status === 'success' ? 'linear-gradient(90deg, #22c55e, #10b981)' : 'linear-gradient(90deg, #ef4444, #f87171)';

    return (
        <div style={styles.card}>
            <div style={{ ...styles.accentBar, background: accentBg }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                {status === 'loading' && <Loader2 size={48} style={{ color: iconColor, animation: 'spin 1s linear infinite' }} />}
                {status === 'success' && <CheckCircle2 size={48} style={{ color: iconColor }} />}
                {status === 'error' && <AlertCircle size={48} style={{ color: iconColor }} />}
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23', textAlign: 'center', marginBottom: 12 }}>
                {status === 'loading' && 'Verifying Email'}
                {status === 'success' && 'Verified!'}
                {status === 'error' && 'Verification Failed'}
            </h1>
            <p style={{ color: '#888', textAlign: 'center', marginBottom: 28, fontSize: '0.9rem' }}>{message}</p>
            {status === 'error' && (
                <Link href="/login" style={styles.btn}>Return to Login</Link>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div style={styles.pageWrapper}>
            <Suspense fallback={
                <div style={{ width: 40, height: 40, border: '4px solid #eee', borderTop: '4px solid #6c5ce7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            }>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}

const styles: { [k: string]: React.CSSProperties } = {
    pageWrapper: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' },
    card: { width: '100%', maxWidth: 440, background: '#fff', border: '1px solid #eee', borderRadius: 24, padding: '40px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' },
    accentBar: { position: 'absolute', top: 0, left: 0, width: '100%', height: 4, opacity: 0.8 },
    btn: { display: 'block', width: '100%', background: '#6c5ce7', color: 'white', fontWeight: 700, borderRadius: 14, padding: '14px', fontSize: '0.95rem', textDecoration: 'none', textAlign: 'center' },
};
