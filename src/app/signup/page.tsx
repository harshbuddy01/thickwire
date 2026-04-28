'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Mail, Lock, User, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

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
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/auth/google`;
    };

    if (isSuccess) {
        return (
            <div style={styles.pageWrapper}>
                <div style={styles.card}>
                    <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <CheckCircle2 size={32} style={{ color: '#22c55e' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1c23', textAlign: 'center', marginBottom: 12 }}>Check your email</h2>
                    <p style={{ color: '#888', textAlign: 'center', marginBottom: 28, fontSize: '0.9rem', lineHeight: 1.6 }}>
                        We&apos;ve sent a verification link to <span style={{ color: '#1a1c23', fontWeight: 600 }}>{email}</span>.
                        Please click the link to activate your account.
                    </p>
                    <Link href="/login" style={{ ...styles.submitBtn, textDecoration: 'none', textAlign: 'center' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-luxury-wrapper">
            <div className="auth-mesh-bg"></div>
            
            <div className="auth-luxury-card">
                {/* Left Side: Brand Story */}
                <div className="auth-luxury-brand">
                    <div className="auth-brand-inner">
                        <div className="auth-logo-badge">Welcome</div>
                        <h1 className="auth-luxury-title">Join the<br/>Digital<br/>Elite.</h1>
                        <p className="auth-luxury-subtitle">Create your account to unlock exclusive access to the world&apos;s finest digital assets and tools.</p>
                        
                        <div className="auth-partners-grid">
                            <div className="auth-partner-item"><img src="/images/netflix_3d.png" alt="Netflix" /></div>
                            <div className="auth-partner-item"><img src="/images/chatgpt_3d.png" alt="ChatGPT" /></div>
                            <div className="auth-partner-item"><img src="/images/sonyliv_3d.png" alt="SonyLIV" /></div>
                            <div className="auth-partner-item"><img src="/images/jiohotstar_3d.png" alt="Hotstar" /></div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Authentication */}
                <div className="auth-luxury-form-side">
                    <div className="auth-form-container">
                        <div style={styles.headerSection}>
                            <h2 style={styles.title}>Create account</h2>
                            <p style={styles.subtitle}>Start your journey with StreamKart today</p>
                        </div>

                        {error && (
                            <div style={styles.errorBox}>
                                <AlertCircle size={18} style={{ color: '#e84393', flexShrink: 0 }} />
                                <p style={styles.errorText}>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSignup}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Full Name</label>
                                <div style={styles.inputWrapper}>
                                    <User size={18} style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={styles.input}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Email Address</label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={18} style={styles.inputIcon} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={styles.input}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={18} style={styles.inputIcon} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={styles.input}
                                        placeholder="Create a password"
                                        minLength={8}
                                        required
                                    />
                                </div>
                                <p style={{ marginTop: 8, fontSize: '0.75rem', color: '#aaa', fontWeight: 500 }}>Min. 8 characters with numbers & symbols</p>
                            </div>

                            <button type="submit" disabled={isLoading} style={styles.submitBtn}>
                                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Create My Account'}
                            </button>
                        </form>

                        <div style={styles.divider}>
                            <div style={styles.dividerLine}></div>
                            <span style={styles.dividerText}>or</span>
                            <div style={styles.dividerLine}></div>
                        </div>

                        <button onClick={handleGoogleSignup} type="button" style={styles.googleBtn}>
                            <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 12 }}>
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Join with Google
                        </button>

                        <p style={styles.bottomText}>
                            Already have an account?{' '}
                            <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} style={styles.bottomLink}>
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div style={styles.pageWrapper}>
                <div style={{ width: 40, height: 40, border: '4px solid #eee', borderTop: '4px solid #6c5ce7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    headerSection: {
        textAlign: 'left',
        marginBottom: 40,
    },
    title: {
        fontSize: '2.4rem',
        fontWeight: 900,
        color: '#111',
        marginBottom: 8,
        letterSpacing: '-1.5px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#666',
        fontWeight: 500,
    },
    errorBox: {
        marginBottom: 24,
        padding: '14px 16px',
        background: '#fff0f2',
        border: '1px solid #ffccd5',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    errorText: {
        fontSize: '0.85rem',
        color: '#e84393',
        fontWeight: 600,
    },
    fieldGroup: {
        marginBottom: 28,
    },
    label: {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 800,
        color: '#111',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    inputWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#aaa',
    },
    input: {
        width: '100%',
        background: '#fff',
        border: '1.5px solid #eaeaea',
        color: '#111',
        borderRadius: 18,
        padding: '18px 20px 18px 54px',
        fontSize: '1rem',
        outline: 'none',
        fontFamily: 'Outfit, sans-serif',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
    },
    submitBtn: {
        width: '100%',
        background: '#111',
        color: 'white',
        fontWeight: 900,
        borderRadius: 18,
        padding: '18px',
        fontSize: '1.05rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginTop: 12,
        fontFamily: 'Outfit, sans-serif',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    },
    divider: {
        margin: '32px 0',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    dividerLine: {
        height: 1,
        background: '#eee',
        flex: 1,
    },
    dividerText: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#bbb',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    googleBtn: {
        width: '100%',
        background: '#fff',
        border: '1.5px solid #eaeaea',
        color: '#111',
        fontWeight: 700,
        borderRadius: 18,
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        height: 60,
        fontSize: '1rem',
        fontFamily: 'Outfit, sans-serif',
        transition: 'all 0.3s ease',
    },
    bottomText: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: '0.95rem',
        color: '#666',
    },
    bottomLink: {
        color: '#0070f3',
        fontWeight: 900,
        textDecoration: 'none',
    },
};
