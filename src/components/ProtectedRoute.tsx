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
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="w-8 h-8 border-4 border-[#333] border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}
