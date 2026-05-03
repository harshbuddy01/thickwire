'use client';

import { useOrderPolling } from '@/hooks/useOrderPolling';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { CheckCircle2, XCircle, Clock, Headphones, ArrowRight, Package, Mail, ShieldCheck } from 'lucide-react';

export default function OrderStatusPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        }>
            <OrderContent orderId={params.id} />
        </Suspense>
    );
}

function OrderContent({ orderId }: { orderId: string }) {
    const { order, loading, error } = useOrderPolling(orderId);
    const searchParams = useSearchParams();

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)' }}>
                <div style={{ width: 48, height: 48, border: '3px solid #e2e8f0', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: 24, fontFamily: 'var(--font-poppins), sans-serif' }}>
                <div style={{ maxWidth: 480, width: '100%', background: '#fff', borderRadius: 24, padding: '48px 40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <XCircle size={40} color="#ef4444" />
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>Order Not Found</h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0 0 32px' }}>{error || 'We couldn\'t find this order. Please check your order ID.'}</p>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111827', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                        Back to Home <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(order.paymentStatus, order.fulfillmentStatus, order.service.name);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)', padding: 24, fontFamily: 'var(--font-poppins), sans-serif' }}>
            <style>{`
                @keyframes successPulse {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes checkDraw {
                    0% { stroke-dashoffset: 60; }
                    100% { stroke-dashoffset: 0; }
                }
                .success-icon-wrap { animation: successPulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .fade-up-1 { animation: fadeInUp 0.5s ease 0.3s both; }
                .fade-up-2 { animation: fadeInUp 0.5s ease 0.45s both; }
                .fade-up-3 { animation: fadeInUp 0.5s ease 0.6s both; }
                .fade-up-4 { animation: fadeInUp 0.5s ease 0.75s both; }
            `}</style>

            <div style={{ maxWidth: 520, width: '100%', background: '#fff', borderRadius: 28, padding: '56px 40px 40px', textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative top gradient bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${statusConfig.color}, ${statusConfig.colorLight})` }}></div>

                {/* Animated success icon */}
                <div className="success-icon-wrap" style={{ width: 96, height: 96, borderRadius: '50%', background: statusConfig.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: `0 12px 32px ${statusConfig.shadow}` }}>
                    {statusConfig.icon}
                </div>

                {/* Title */}
                <h1 className="fade-up-1" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                    {statusConfig.title}
                </h1>

                {/* Sub-message */}
                <p className="fade-up-2" style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 32px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                    {statusConfig.message}
                </p>

                {/* Order Details Card */}
                <div className="fade-up-3" style={{ background: '#f8fafc', borderRadius: 16, padding: '24px', textAlign: 'left', marginBottom: 32, border: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <Package size={18} color="#6b7280" />
                        <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Order Details</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Order ID</span>
                            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem', fontFamily: 'monospace', background: '#f0f0f0', padding: '4px 10px', borderRadius: 6 }}>#{order.id.slice(0, 8)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Service</span>
                            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>{order.service.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Plan</span>
                            <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>{order.plan.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #e5e7eb' }}>
                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Payment</span>
                            <span style={{ fontWeight: 800, color: statusConfig.color, fontSize: '0.9rem' }}>{order.paymentStatus === 'CONFIRMED' ? '✓ Paid' : order.paymentStatus}</span>
                        </div>
                        {order.deliveredAt && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Delivered</span>
                                <span style={{ fontWeight: 600, color: '#10b981', fontSize: '0.9rem' }}>{new Date(order.deliveredAt).toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="fade-up-4" style={{ display: 'flex', gap: 12 }}>
                    <Link href="/account" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#111827', color: '#fff', padding: '16px 24px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 8px 24px rgba(17,24,39,0.15)', transition: 'all 0.2s' }}>
                        <Package size={18} /> Track Order
                    </Link>
                    <Link href="/support" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#f8fafc', color: '#111827', padding: '16px 24px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', border: '1px solid #e5e7eb', transition: 'all 0.2s' }}>
                        <Headphones size={18} /> Contact Support
                    </Link>
                </div>

                {/* Security badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, color: '#9ca3af', fontSize: '0.8rem' }}>
                    <ShieldCheck size={14} /> Secured by StreamKart
                </div>
            </div>
        </div>
    );
}

function getStatusConfig(payment: string, fulfillment: string, serviceName: string) {
    if (payment === 'FAILED') {
        return {
            icon: <XCircle size={48} color="#fff" />,
            color: '#ef4444',
            colorLight: '#f87171',
            bgColor: '#ef4444',
            shadow: 'rgba(239,68,68,0.3)',
            title: 'Payment Failed',
            message: 'Your payment could not be processed. Please try again or contact support if the issue persists.',
        };
    }

    if (payment === 'PENDING') {
        return {
            icon: <Clock size={48} color="#fff" />,
            color: '#f59e0b',
            colorLight: '#fbbf24',
            bgColor: '#f59e0b',
            shadow: 'rgba(245,158,11,0.3)',
            title: 'Awaiting Payment',
            message: 'We\'re waiting for your payment to be confirmed. This usually takes a few seconds.',
        };
    }

    if (fulfillment === 'FULFILLED' || fulfillment === 'MANUAL_FULFILLED') {
        return {
            icon: <CheckCircle2 size={48} color="#fff" strokeWidth={2.5} />,
            color: '#10b981',
            colorLight: '#34d399',
            bgColor: '#10b981',
            shadow: 'rgba(16,185,129,0.3)',
            title: 'Thank you for your payment!',
            message: 'Your credentials have been sent to your registered email. Check your inbox!',
        };
    }

    if (fulfillment === 'MANUAL_PENDING') {
        // Determine the right message based on service name
        const sName = serviceName.toLowerCase();
        let message = `Your ${serviceName} will be activated within 30 minutes. If not, please contact us through the Help section.`;

        if (sName.includes('youtube') || sName.includes('yt')) {
            // Could be YouTube Global - check later with more context
            message = `Your ${serviceName} will be activated within 30 minutes. If not, please contact us through the Help section.`;
        }

        return {
            icon: <Mail size={48} color="#fff" />,
            color: '#6366f1',
            colorLight: '#818cf8',
            bgColor: '#6366f1',
            shadow: 'rgba(99,102,241,0.3)',
            title: 'Thank you for your payment!',
            message,
        };
    }

    return {
        icon: <CheckCircle2 size={48} color="#fff" strokeWidth={2.5} />,
        color: '#10b981',
        colorLight: '#34d399',
        bgColor: '#10b981',
        shadow: 'rgba(16,185,129,0.3)',
        title: 'Thank you for your payment!',
        message: 'Your credentials have been sent to your registered email. Check your inbox!',
    };
}
