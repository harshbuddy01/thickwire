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
    setAuth: (accessToken: string) => void;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setAuth: () => { },
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
        } catch {
            setUser(null);
        }
    };

    const setAuth = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        refreshProfile();
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // ignore
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
                } catch {
                    localStorage.removeItem('accessToken');
                }
            } else {
                // Try refresh token implicitly via cookie
                try {
                    const { data } = await api.post('/auth/refresh');
                    localStorage.setItem('accessToken', data.accessToken);
                    await refreshProfile();
                } catch {
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
