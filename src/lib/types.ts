// ─── Service ────────────────────────────────────────

export interface Service {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    description: string | null;
    displayOrder: number;
    plans: Plan[];
}

export interface Plan {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    originalPrice: string | null;
    durationDays: number;
    displayOrder: number;
    stockCount: number;
    inStock: boolean;
}

// ─── Order ──────────────────────────────────────────

export interface CreateOrderRequest {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    planId: string;
    couponCode?: string;
    gateway?: 'razorpay' | 'cashfree';
    whatsappOptedIn?: boolean;
}

export interface CreateOrderResponse {
    orderId: string;
    amount: number;
    currency: string;

    // Razorpay properties
    razorpayOrderId?: string;
    keyId?: string;

    // Cashfree properties
    cashfreeSessionId?: string;
    cashfreeOrderId?: string;
}

export interface OrderStatus {
    id: string;
    paymentStatus: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'REFUNDED';
    fulfillmentStatus: 'PENDING' | 'FULFILLED' | 'MANUAL_PENDING' | 'MANUAL_FULFILLED';
    deliveredAt: string | null;
    createdAt: string;
    service: { name: string };
    plan: { name: string };
}

// ─── Support ────────────────────────────────────────

export interface SupportTicketRequest {
    customerName: string;
    customerEmail: string;
    orderId?: string;
    subject: string;
    message: string;
}

export interface SupportTicket {
    id: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    createdAt: string;
}

// ─── Razorpay ───────────────────────────────────────

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill: { name: string; email: string; contact: string };
    theme: { color: string };
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => { open: () => void };
        Cashfree: (options: { mode: 'sandbox' | 'production' }) => any;
    }
}
