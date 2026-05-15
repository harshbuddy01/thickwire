'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

export interface CustomerProfile {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    avatarUrl: string | null;
    whatsappOptedIn: boolean;
    isVerified: boolean;
    hasPassword?: boolean;
}

interface AuthContextType {
    user: CustomerProfile | null;
    loading: boolean;
    setAuth: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setAuth: async () => { },
    logout: async () => { },
    refreshProfile: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<CustomerProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data);
        } catch (err: any) {
            console.error('Failed to refresh profile:', err?.response?.data || err.message);
            setUser(null);
            throw err;
        }
    };

    const setAuth = async (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        await refreshProfile();
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout API failed:', err);
        }
        localStorage.removeItem('accessToken');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    await refreshProfile();
                } catch (err: any) {
                    // Only clear token on explicit 401 (invalid/expired token).
                    // Network errors on mobile should NOT log user out.
                    if (err?.response?.status === 401) {
                        localStorage.removeItem('accessToken');
                        // Try refresh token implicitly via cookie
                        try {
                            const { data } = await api.post('/auth/refresh');
                            localStorage.setItem('accessToken', data.accessToken);
                            await refreshProfile();
                        } catch (refreshErr) {
                            console.error('Refresh token failed:', refreshErr);
                            // No valid session — user genuinely needs to log in
                        }
                    }
                    // For network errors, keep the token and let user retry
                }
            } else {
                // No access token — try refresh token implicitly via cookie
                try {
                    const { data } = await api.post('/auth/refresh');
                    localStorage.setItem('accessToken', data.accessToken);
                    await refreshProfile();
                } catch (refreshErr) {
                    console.error('Initial refresh token failed:', refreshErr);
                    // No valid session
                }
            }
            setLoading(false);
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setAuth, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
