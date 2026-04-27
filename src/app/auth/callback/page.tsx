'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function AuthCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuth } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setAuth(token);
            router.push('/account');
        } else {
            router.push('/login?error=Google_Auth_Failed');
        }
    }, [searchParams, router, setAuth]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#333] border-t-white rounded-full animate-spin"></div>
        </div>
    );
}
