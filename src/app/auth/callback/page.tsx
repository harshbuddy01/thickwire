'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuth } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const redirectTo = searchParams.get('redirect') || '/account';
        if (token) {
            setAuth(token);
            router.push(redirectTo);
        } else {
            router.push('/login?error=Google_Auth_Failed');
        }
    }, [searchParams, router, setAuth]);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, border: '4px solid #333', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
    );
}

export default function AuthCallback() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 40, height: 40, border: '4px solid #333', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
