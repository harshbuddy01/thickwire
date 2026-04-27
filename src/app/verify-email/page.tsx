'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

    return (
        <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
            {/* Decorative glows depending on status */}
            {status === 'loading' && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50"></div>}
            {status === 'success' && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-50"></div>}
            {status === 'error' && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600 opacity-50"></div>}

            <div className="mb-6 flex justify-center">
                {status === 'loading' && <Loader2 className="animate-spin text-indigo-500" size={48} />}
                {status === 'success' && <CheckCircle2 className="text-emerald-500" size={48} />}
                {status === 'error' && <AlertCircle className="text-rose-500" size={48} />}
            </div>

            <h1 className="text-2xl font-bold text-white mb-3">
                {status === 'loading' && 'Verifying Email'}
                {status === 'success' && 'Verified!'}
                {status === 'error' && 'Verification Failed'}
            </h1>

            <p className="text-gray-400 mb-8">{message}</p>

            {status === 'error' && (
                <Link href="/login" className="inline-block w-full bg-white text-black font-semibold rounded-xl py-3 hover:bg-gray-200 transition-colors">
                    Return to Login
                </Link>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-white"><Loader2 className="animate-spin" /></div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
