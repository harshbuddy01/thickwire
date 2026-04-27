'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        if (!token) {
            setError('Missing reset token. Please use the link from your email.');
            return;
        }

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
            <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-50"></div>
                <div className="mb-6 flex justify-center">
                    <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Password updated!</h2>
                <p className="text-gray-400 mb-8">
                    Your password has been successfully reset. You can now use your new password to log in.
                </p>
                <Link href="/login" className="inline-block w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-colors">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50"></div>

            <div className="mb-8 relative z-10">
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Set new password</h1>
                <p className="text-gray-400 text-sm">Please choose a strong password with at least 8 characters.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-red-200">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">New Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                            placeholder="••••••••"
                            minLength={8}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-all active:scale-[0.98] mt-2 disabled:opacity-70 flex justify-center items-center h-12"
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-white"><Loader2 className="animate-spin" /></div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    );
}
