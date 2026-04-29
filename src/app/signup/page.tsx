'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Mail, Lock, User, AlertCircle, Loader2, CheckCircle2, PlayCircle } from 'lucide-react';

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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50/50">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-3">Check your email</h2>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                        We've sent a verification link to <span className="text-gray-900 font-bold">{email}</span>.
                        Please click the link to activate your account.
                    </p>
                    <Link 
                        href="/login" 
                        className="block w-full py-4 px-6 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/10"
                    >
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side: Brand Story (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black z-10" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20"></div>
                    {/* Glowing Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
                </div>

                <div className="relative z-30 p-16 max-w-2xl text-white">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                            <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">StreamKart</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        <span className="text-sm font-semibold tracking-wide uppercase text-gray-200">Welcome</span>
                    </div>

                    <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-6">
                        Join the<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Digital Elite.</span>
                    </h1>
                    
                    <p className="text-lg text-gray-400 font-medium max-w-md leading-relaxed mb-12">
                        Create your account to unlock exclusive access to the world's finest digital assets and tools.
                    </p>

                    {/* Partner logos */}
                    <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="/images/netflix_3d.png" alt="Netflix" width={64} height={32} className="h-8 w-auto object-contain" />
                        <img src="/images/chatgpt_3d.png" alt="ChatGPT" width={64} height={32} className="h-8 w-auto object-contain" />
                        <img src="/images/sonyliv_3d.png" alt="SonyLIV" width={64} height={32} className="h-8 w-auto object-contain" />
                        <img src="/images/jiohotstar_3d.png" alt="Hotstar" width={64} height={32} className="h-8 w-auto object-contain" />
                    </div>
                </div>
            </div>

            {/* Right Side: Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                            <PlayCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight">StreamKart</span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Create account</h2>
                        <p className="text-gray-500 font-medium">Start your journey with StreamKart today</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                            <p className="text-sm font-semibold text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 font-medium outline-none"
                                    placeholder="Create a password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <p className="mt-2 text-xs font-medium text-gray-400">Min. 8 characters with numbers & symbols</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-base font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Create My Account'}
                        </button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-xs font-bold text-gray-400 uppercase tracking-widest">
                                or
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleGoogleSignup}
                            type="button"
                            className="w-full flex justify-center items-center gap-3 py-4 px-4 border border-gray-200 rounded-2xl shadow-sm bg-white text-base font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Join with Google
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm font-medium text-gray-500">
                        Already have an account?{' '}
                        <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}
