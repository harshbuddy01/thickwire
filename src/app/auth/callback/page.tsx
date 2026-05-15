'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuth } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const redirectTo = searchParams.get('redirect') || '/';

            if (!token) {
                router.push('/login?error=Google_Auth_Failed');
                return;
            }

            try {
                // Save token and fetch profile
                await setAuth(token);
            } catch (err) {
                // setAuth should NOT throw anymore, but just in case
                console.error('setAuth failed in callback:', err);
            }

            // ALWAYS navigate regardless of whether profile fetch succeeded.
            // The token is saved in localStorage, so the destination page
            // will pick it up via AuthContext init().
            router.push(redirectTo);
        };
        handleCallback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: 16 }}>
                <p>{error}</p>
                <a href="/login" style={{ color: '#6366f1' }}>Go to Login</a>
            </div>
        );
    }

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
