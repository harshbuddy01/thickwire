'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import api, { setAccessToken, setCsrfToken, registerAuthCallbacks } from './api';

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
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('refreshProfile failed:', err);
            }
            setUser(null);
        }
    };

    const setAuth = async (token: string) => {
        isSettingAuth.current = true;
        setAccessToken(token);
        await refreshProfile();
        isSettingAuth.current = false;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err: unknown) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Logout API failed:', err);
            }
        }
        setAccessToken(null);
        setCsrfToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        // Register callbacks so that Axios interceptor failures sync with UI State
        registerAuthCallbacks(
            (token) => {
                setAccessToken(token);
            },
            () => {
                setUser(null);
                setAccessToken(null);
                setCsrfToken(null);
            }
        );

        const init = async () => {
            // If setAuth is currently running (e.g. on /auth/callback),
            // don't interfere — let it finish first.
            if (isSettingAuth.current) {
                setLoading(false);
                return;
            }

            try {
                // Try to refresh credentials on page mount
                const { data } = await api.post('/auth/refresh');
                setAccessToken(data.accessToken);
                if (data.csrfToken) {
                    setCsrfToken(data.csrfToken);
                }
                await refreshProfile();
            } catch (err: unknown) {
                // No active session or session expired
                setUser(null);
                setAccessToken(null);
                setCsrfToken(null);
            } finally {
                setLoading(false);
            }
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
