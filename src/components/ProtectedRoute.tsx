'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            // Double-check localStorage before redirecting — prevents race condition
            // where AuthContext hasn't finished hydrating yet
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            if (!token) {
                router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            }
            // If token exists but user is null, AuthContext init() is likely still processing.
            // Don't redirect — wait for the next render cycle.
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    if (!user) {
        // Check localStorage one more time — if token exists, show loading instead of blank
        const hasToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
        if (hasToken) {
            return (
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                    <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
            );
        }
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}
