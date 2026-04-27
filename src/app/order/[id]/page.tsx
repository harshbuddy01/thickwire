'use client';

import { useOrderPolling } from '@/hooks/useOrderPolling';

export default function OrderStatusPage({
    params,
}: {
    params: { id: string };
}) {
    const { order, loading, error } = useOrderPolling(params.id);

    if (loading) {
        return (
            <div className="status-container">
                <div className="skeleton skeleton-card" style={{ height: 400 }} />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="status-container">
                <div className="status-card">
                    <div className="status-icon failed">❌</div>
                    <h2>Order Not Found</h2>
                    <p className="subtitle">{error || 'We couldn\'t find this order. Please check your order ID.'}</p>
                    <a href="/" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Home</a>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(order.paymentStatus, order.fulfillmentStatus);

    return (
        <div className="status-container">
            <div className="status-card">
                <div className={`status-icon ${statusConfig.iconClass}`}>
                    {statusConfig.icon}
                </div>
                <h2>{statusConfig.title}</h2>
                <p className="subtitle">{statusConfig.message}</p>

                <div style={{ textAlign: 'left', marginTop: 32 }}>
                    <div className="status-detail">
                        <span className="label">Order ID</span>
                        <span style={{ fontFamily: 'monospace' }}>{order.id.slice(0, 8)}...</span>
                    </div>
                    <div className="status-detail">
                        <span className="label">Service</span>
                        <span>{order.service.name}</span>
                    </div>
                    <div className="status-detail">
                        <span className="label">Plan</span>
                        <span>{order.plan.name}</span>
                    </div>
                    <div className="status-detail">
                        <span className="label">Payment</span>
                        <span>{order.paymentStatus}</span>
                    </div>
                    <div className="status-detail">
                        <span className="label">Fulfillment</span>
                        <span>{order.fulfillmentStatus}</span>
                    </div>
                    {order.deliveredAt && (
                        <div className="status-detail">
                            <span className="label">Delivered At</span>
                            <span>{new Date(order.deliveredAt).toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <a href="/" className="btn btn-secondary">Back to Home</a>
                    <a href="/support" className="btn btn-secondary">Need Help?</a>
                </div>
            </div>
        </div>
    );
}

function getStatusConfig(payment: string, fulfillment: string) {
    if (payment === 'FAILED') {
        return {
            icon: '❌',
            iconClass: 'failed',
            title: 'Payment Failed',
            message: 'Your payment could not be processed. Please try again.',
        };
    }

    if (payment === 'PENDING') {
        return {
            icon: '⏳',
            iconClass: 'pending',
            title: 'Awaiting Payment',
            message: 'We\'re waiting for your payment to be confirmed by Razorpay.',
        };
    }

    if (fulfillment === 'FULFILLED' || fulfillment === 'MANUAL_FULFILLED') {
        return {
            icon: '🎉',
            iconClass: 'fulfilled',
            title: 'Order Delivered!',
            message: 'Your credentials have been sent to your email. Check your inbox!',
        };
    }

    if (fulfillment === 'MANUAL_PENDING') {
        return {
            icon: '👨‍💼',
            iconClass: 'confirmed',
            title: 'Under Review',
            message: 'Your payment is confirmed. Our team is preparing your delivery (within 24h).',
        };
    }

    return {
        icon: '🔄',
        iconClass: 'confirmed',
        title: 'Processing',
        message: 'Payment confirmed! We\'re preparing your delivery. This usually takes a few seconds.',
    };
}
