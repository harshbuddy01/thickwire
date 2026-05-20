import axios from 'axios';
import type {
    Service,
    CreateOrderRequest,
    CreateOrderResponse,
    OrderStatus,
    SupportTicketRequest,
    SupportTicket,
} from './types';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // Need this for HttpOnly refresh cookies
});

// ─── Token State & Callbacks ────────────────────────

let accessToken: string | null = null;
let csrfToken: string | null = null;

let onAuthFailureCallback: (() => void) | null = null;
let onAuthSuccessCallback: ((token: string) => void) | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const setCsrfToken = (token: string | null) => {
    csrfToken = token;
};

export const registerAuthCallbacks = (
    onSuccess: (token: string) => void,
    onFailure: () => void
) => {
    onAuthSuccessCallback = onSuccess;
    onAuthFailureCallback = onFailure;
};

function getCsrfToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // 1. Check in-memory state
    if (csrfToken) return csrfToken;
    
    // 2. Check meta tag
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        return meta.getAttribute('content');
    }
    
    // 3. Check cookie (fallback)
    const match = document.cookie.match(/csrf-token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

// ─── Interceptors ───────────────────────────────────

api.interceptors.request.use((config) => {
    if (accessToken && config.headers) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
        const token = getCsrfToken();
        if (token && config.headers) {
            config.headers.set('X-CSRF-Token', token);
        }
    }
    return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
    const { data } = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
    );
    
    const newToken = data.accessToken;
    setAccessToken(newToken);
    
    if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
    }
    
    if (onAuthSuccessCallback) {
        onAuthSuccessCallback(newToken);
    }
    
    return newToken;
};

api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }
        
        const originalRequest = error.config as any;
        if (!originalRequest) {
            return Promise.reject(error);
        }
        
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
            originalRequest._retry = true;
            
            if (!refreshPromise) {
                refreshPromise = refreshAccessToken().finally(() => {
                    refreshPromise = null;
                });
            }
            
            try {
                const newToken = await refreshPromise;
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                }
                return api(originalRequest);
            } catch (err: unknown) {
                setAccessToken(null);
                setCsrfToken(null);
                
                if (onAuthFailureCallback) {
                    onAuthFailureCallback();
                }
                
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

// ─── Services ───────────────────────────────────────

export async function getServices(): Promise<Service[]> {
    const { data } = await api.get('/services');
    return data;
}

export async function getServiceBySlug(slug: string): Promise<Service> {
    const { data } = await api.get(`/services/${slug}`);
    return data;
}

// ─── Orders ─────────────────────────────────────────

export async function createOrder(
    payload: CreateOrderRequest,
): Promise<CreateOrderResponse> {
    const { data } = await api.post('/orders/create', payload);
    return data;
}

export async function getOrderStatus(orderId: string): Promise<OrderStatus> {
    const { data } = await api.get(`/orders/status/${orderId}`);
    return data;
}

export async function getAbandonedCart() {
    const { data } = await api.get('/orders/abandoned-cart');
    return data;
}

// ─── Coupons ────────────────────────────────────────

export async function validateCoupon(payload: {
    code: string;
    planId: string;
    amount: number;
    customerId?: string;
}) {
    const { data } = await api.post('/coupons/validate', payload);
    return data;
}

// ─── Support ────────────────────────────────────────

export async function createSupportTicket(
    payload: SupportTicketRequest,
): Promise<SupportTicket> {
    const { data } = await api.post('/support', payload);
    return data;
}

// ─── Reviews ────────────────────────────────────────

export async function getServiceReviews(serviceId: string) {
    const { data } = await api.get(`/reviews/service/${serviceId}`);
    return data;
}

export async function submitReview(payload: { serviceId: string; orderId?: string; rating: number; comment?: string }) {
    const { data } = await api.post('/reviews', payload);
    return data;
}

// ─── Wallet & Referral ──────────────────────────────

export async function getWalletBalance() {
    const { data } = await api.get('/wallet/balance');
    return data;
}

export async function getWalletTransactions(page = 1) {
    const { data } = await api.get(`/wallet/transactions?page=${page}`);
    return data;
}

export async function getReferralStats() {
    const { data } = await api.get('/wallet/referral');
    return data;
}

export async function applyReferralCode(code: string) {
    const { data } = await api.post('/wallet/referral/apply', { code });
    return data;
}

// ─── Flash Sales ────────────────────────────────────

export async function getActiveFlashSales() {
    const { data } = await api.get('/flash-sales');
    return data;
}

// ─── Supplier ───────────────────────────────────────

export async function sendSupplierOtp(email: string) {
    const { data } = await api.post('/supplier/send-otp', { email });
    return data;
}

export async function submitSupplierApplication(payload: { email: string; phone: string; description: string; otp: string }) {
    const { data } = await api.post('/supplier/submit', payload);
    return data;
}

export default api;
