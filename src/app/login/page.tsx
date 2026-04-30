'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Mail, Lock, AlertCircle, Loader2, PlayCircle } from 'lucide-react';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuth } = useAuth();
    const redirectUrl = searchParams.get('redirect') || '/account';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data } = await api.post('/auth/login', { email, password });
            setAuth(data.accessToken);
            router.push(redirectUrl);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const state = encodeURIComponent(redirectUrl);
        window.location.href = `${apiBase}/auth/google?state=${state}`;
    };

    return (
        <div className="premium-auth-wrapper">
            {/* Animated background blobs */}
            <div className="premium-auth-bg-blob1"></div>
            <div className="premium-auth-bg-blob2"></div>

            <div className="premium-auth-left">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', width: 'fit-content', marginBottom: '24px', backdropFilter: 'blur(10px)' }}>
                    <PlayCircle size={16} color="#4ade80" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>STREAMKART PREMIUM</span>
                </div>
                <h1 className="premium-auth-title">
                    Experience<br />
                    <span>Digital Excellence</span>
                </h1>
                <p className="premium-auth-subtitle">
                    Access your elite collection of streaming and professional tools in one unified, secure space. Join thousands of creators and entertainment lovers.
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '40px', opacity: 0.6 }}>
                    <div style={{ height: '40px', aspectRatio: '1' }}>
                        <ProgressiveImage src={`${MINIO_URL}/netflix_3d.png`} alt="Netflix" style={{ objectFit: 'contain' }} />
                    </div>
                    <div style={{ height: '40px', aspectRatio: '1' }}>
                        <ProgressiveImage src={`${MINIO_URL}/chatgpt_3d.png`} alt="ChatGPT" style={{ objectFit: 'contain' }} />
                    </div>
                    <div style={{ height: '40px', aspectRatio: '1' }}>
                        <ProgressiveImage src={`${MINIO_URL}/sonyliv_3d.png`} alt="SonyLIV" style={{ objectFit: 'contain' }} />
                    </div>
                </div>
            </div>

            <div className="premium-auth-right">
                <div className="premium-auth-form-card">
                    <h2 className="premium-form-title">Welcome back</h2>
                    <p className="premium-form-subtitle">Sign in to your StreamKart account</p>

                    {error && (
                        <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="premium-form-group">
                            <label className="premium-form-label">Email Address</label>
                            <div className="premium-form-input-wrap">
                                <Mail size={20} className="premium-form-icon" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="premium-form-input"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="premium-form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label className="premium-form-label" style={{ margin: 0 }}>Password</label>
                                <Link href="/forgot-password" style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
                            </div>
                            <div className="premium-form-input-wrap">
                                <Lock size={20} className="premium-form-icon" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="premium-form-input"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="premium-btn" disabled={isLoading}>
                            {isLoading ? <Loader2 size={24} className="spin-anim" /> : 'Sign In to Account'}
                        </button>
                    </form>

                    <div className="premium-divider">or continue with</div>

                    <button type="button" onClick={handleGoogleLogin} className="premium-social-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Sign in with Google
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: '#6b7280', fontSize: '0.95rem' }}>
                        Don't have an account? <Link href={`/signup?redirect=${encodeURIComponent(redirectUrl)}`} style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>Create one now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#050505' }}>
                <div style={{ width: 40, height: 40, border: '4px solid #333', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
