'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { redirectUrlSchema } from '@/lib/validators';
import { captureSecurityEvent } from '@/lib/sentry';

function AuthCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuth } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            let redirectTo = searchParams.get('redirect') || '/';

            // Validate redirect URL to prevent open redirect attacks
            const validation = redirectUrlSchema.safeParse(redirectTo);
            if (!validation.success) {
                captureSecurityEvent({
                    type: 'open_redirect_attempt',
                    details: { attemptedUrl: redirectTo },
                    severity: 'medium',
                });
                redirectTo = '/';
            }

            if (!token) {
                router.push('/login?error=Google_Auth_Failed');
                return;
            }

            try {
                // Save token and fetch profile
                await setAuth(token);
            } catch (err: unknown) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error('setAuth failed in callback:', err);
                }
            }

            const isNewUser = searchParams.get('isNewUser') === 'true';

            if (isNewUser) {
                router.push(`/signup?onboarding=true&redirect=${encodeURIComponent(redirectTo)}`);
            } else {
                router.push(redirectTo);
            }
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
