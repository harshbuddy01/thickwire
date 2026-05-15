'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
    // Prevents init() from racing with setAuth() during Google OAuth callback
    const isSettingAuth = useRef(false);

    const refreshProfile = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data);
        } catch (err: any) {
            console.error('refreshProfile failed:', err?.response?.status, err?.response?.data || err.message);
            setUser(null);
            // Do NOT throw — callers (callback page, setAuth) must not break on failure
        }
    };

    const setAuth = async (accessToken: string) => {
        isSettingAuth.current = true;
        localStorage.setItem('accessToken', accessToken);
        await refreshProfile();
        isSettingAuth.current = false;
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
            // If setAuth is currently running (e.g. on /auth/callback),
            // don't interfere — let it finish first.
            if (isSettingAuth.current) {
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    await refreshProfile();
                } catch (err: any) {
                    if (err?.response?.status === 401) {
                        localStorage.removeItem('accessToken');
                        // Try refresh token via cookie
                        try {
                            const { data } = await api.post('/auth/refresh');
                            localStorage.setItem('accessToken', data.accessToken);
                            await refreshProfile();
                        } catch {
                            // No valid session
                        }
                    }
                }
            } else {
                // No access token — try refresh token via cookie
                try {
                    const { data } = await api.post('/auth/refresh');
                    localStorage.setItem('accessToken', data.accessToken);
                    await refreshProfile();
                } catch {
                    // No valid session — user is genuinely logged out
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
