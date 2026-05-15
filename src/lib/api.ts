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

// ─── Interceptors ───────────────────────────────────

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post(
                    `${api.defaults.baseURL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                localStorage.setItem('accessToken', data.accessToken);
                if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
                    originalRequest.headers.set('Authorization', `Bearer ${data.accessToken}`);
                } else {
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                }
                return api(originalRequest);
            } catch (err) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    // Don't force redirect — let AuthContext handle it gracefully.
                    // Only redirect if user is on a protected page (e.g. /account).
                    const protectedPaths = ['/account', '/checkout'];
                    const currentPath = window.location.pathname;
                    if (protectedPaths.some(p => currentPath.startsWith(p))) {
                        window.location.href = '/login';
                    }
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
