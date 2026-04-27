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
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50"></div>
                    <div className="mb-6 flex justify-center">
                        <CheckCircle2 className="text-indigo-500" size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">Reset link sent!</h2>
                    <p className="text-gray-400 mb-8">
                        We've sent a password reset link to <span className="text-white font-medium">{email}</span>.
                        Please check your inbox.
                    </p>
                    <Link href="/login" className="inline-block w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-colors">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>

                <div className="mb-8 relative z-10">
                    <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft size={16} /> Back to login
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset password</h1>
                    <p className="text-gray-400">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-red-200">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center h-12"
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
