import axios from 'axios';
import type {
    Service,
    CreateOrderRequest,
    CreateOrderResponse,
    OrderStatus,
    SupportTicketRequest,
    SupportTicket,
} from './types';

const api = axios.create({
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
            config.headers.Authorization = `Bearer ${token}`;
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
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
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

// ─── Coupons ────────────────────────────────────────

export async function validateCoupon(payload: {
    code: string;
    planId: string;
    amount: number;
    customerId?: string;
}) {
    const { data } = await api.post('/orders/validate-coupon', payload);
    return data;
}

// ─── Support ────────────────────────────────────────

export async function createSupportTicket(
    payload: SupportTicketRequest,
): Promise<SupportTicket> {
    const { data } = await api.post('/support', payload);
    return data;
}

export default api;
