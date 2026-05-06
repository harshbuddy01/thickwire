'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Mail, Lock, User, AlertCircle, Loader2, Play } from 'lucide-react';
import '../auth-styles.css';
import styles from '../auth/auth.module.css';

function SignupContent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/account';

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/auth/signup', { name, email, password });
            setIsSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const state = encodeURIComponent(redirectUrl);
        window.location.href = `${apiBase}/auth/google?state=${state}`;
    };

    if (isSuccess) {
        return (
            <div className="auth-container">
                <div className="fluid-bg">
                    <div className="fluid-blob1"></div>
                    <div className="fluid-blob2"></div>
                    <div className="fluid-blob3"></div>
                    <div className="fluid-blob4"></div>
                </div>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: '#fff', boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)' }}>
                        <Mail size={40} />
                    </div>
                    <h2 className="auth-title">Check your email</h2>
                    <p className="auth-subtitle" style={{ marginBottom: 32, lineHeight: 1.6 }}>
                        We&apos;ve sent a verification link to <span style={{ color: '#0f172a', fontWeight: 800 }}>{email}</span>.
                        Please click the link to activate your account.
                    </p>
                    <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="auth-btn-primary" style={{ textDecoration: 'none' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="fluid-bg">
                <div className="fluid-blob1"></div>
                <div className="fluid-blob2"></div>
                <div className="fluid-blob3"></div>
                <div className="fluid-blob4"></div>
            </div>
            
            <div className="glass-card">
                <div className="auth-header">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className="auth-logo">
                            <Play fill="#0f172a" size={28} />
                        </div>
                    </Link>
                    <h1 className="auth-title">Create an account</h1>
                    <p className="auth-subtitle">Join StreamKart today.</p>
                </div>

                {error && (
                    <div style={{ padding: '16px', background: 'rgba(254, 226, 226, 0.9)', border: '1px solid rgba(248, 113, 113, 0.5)', borderRadius: '16px', color: '#b91c1c', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 600, boxShadow: '0 10px 20px rgba(220, 38, 38, 0.1)' }}>
                        <AlertCircle size={22} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="auth-input-group">
                        <label className="auth-label">Full Name</label>
                        <div className="auth-input-wrap">
                            <User size={22} className="auth-icon" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Richard Hendricks"
                                required
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label className="auth-label">Email Address</label>
                        <div className="auth-input-wrap">
                            <Mail size={22} className="auth-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <div className="auth-input-group" style={{ marginBottom: 36 }}>
                        <label className="auth-label">Password</label>
                        <div className="auth-input-wrap">
                            <Lock size={22} className="auth-icon" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                                className="auth-input"
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn-primary" disabled={isLoading}>
                        {isLoading ? <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} /> : 'Create My Account'}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="auth-divider-line"></div>
                    <span className="auth-divider-text">or continue with</span>
                    <div className="auth-divider-line"></div>
                </div>

                <button type="button" onClick={handleGoogleSignup} className="auth-btn-google">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Sign up with Google
                </button>

                <p className="auth-footer-text">
                    Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc' }}>
                <div style={{ width: 50, height: 50, border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}
