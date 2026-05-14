'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import type { Plan } from '@/lib/types';
import { Check, Lock, ShieldCheck, Star, Mail, Smartphone } from 'lucide-react';

interface PlanCardProps {
    plan: Plan;
    serviceSlug: string;
    serviceName: string;
    isPopular?: boolean;
}

export default function PlanCard({ plan, serviceSlug, serviceName, isPopular }: PlanCardProps) {
    const { user } = useAuth();
    const router = useRouter();

    const stockStatus = plan.stockCount <= 5 ? 'low-stock' : 'in-stock';
    const stockLabel = plan.stockCount <= 5 ? `Only ${plan.stockCount} left` : 'In Stock';
    const planNameLower = plan.name.toLowerCase();
    const isEmailBased = planNameLower.includes('email');
    const isMobileBased = planNameLower.includes('mobile');

    const handleBuy = () => {
        const dest = `/checkout?planId=${plan.id}&service=${serviceSlug}`;
        if (!user) {
            router.push(`/login?redirect=${encodeURIComponent(dest)}`);
        } else {
            router.push(dest);
        }
    };

    return (
        <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '0',
            boxShadow: isPopular ? '0 20px 60px rgba(16,185,129,0.15)' : '0 10px 40px rgba(0,0,0,0.04)',
            border: isPopular ? '2px solid #10b981' : '1px solid #e5e7eb',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Popular Badge */}
            {isPopular && (
                <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    padding: '10px 0',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                }}>
                    <Star size={14} fill="#fff" /> MOST POPULAR
                </div>
            )}

            <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Plan Name & Duration */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: 0 }}>{plan.name}</h3>
                        <div style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: '#f3f4f6',
                            color: '#4b5563',
                        }}>
                            Auto
                        </div>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                        {plan.description || `${serviceName} — ${plan.durationDays} day access`}
                    </p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111827', letterSpacing: '-2px', lineHeight: 1 }}>
                            {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}
                            {plan.currency === 'INR' && (
                                <span style={{ fontSize: '1.4rem', color: '#6b7280', fontWeight: 600, marginLeft: '12px' }}>
                                    | ${(parseFloat(plan.price) / 84).toFixed(2)}
                                </span>
                            )}
                        </span>
                        {plan.originalPrice && (
                            <span style={{ fontSize: '1.1rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 500 }}>
                                {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px', fontWeight: 500 }}>
                        for {plan.durationDays} days validity
                    </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#374151' }}>
                        <Check size={16} style={{ color: '#10b981', flexShrink: 0 }} /> Premium access included
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#374151' }}>
                        <Check size={16} style={{ color: '#10b981', flexShrink: 0 }} /> Instant delivery via email
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#374151' }}>
                        <Check size={16} style={{ color: '#10b981', flexShrink: 0 }} /> 24/7 support included
                    </li>
                </ul>

                {/* Buy Button */}
                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={handleBuy}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: isPopular ? 'linear-gradient(135deg, #10b981, #059669)' : '#111827',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <Lock size={18} /> Buy Now Securely
                    </button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        marginTop: '12px',
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        fontWeight: 500,
                    }}>
                        <ShieldCheck size={14} /> Secure & Encrypted Payment
                    </div>
                </div>
            </div>
        </div>
    );
}
