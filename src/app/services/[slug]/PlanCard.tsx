'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import type { Plan } from '@/lib/types';
import { Check, Lock, ShieldCheck, Star } from 'lucide-react';

interface ServiceTheme {
    primaryColor: string;
    secondaryColor: string;
    bgStyle: React.CSSProperties;
    textColor: string;
    textSecondary: string;
    cardBg: string;
    cardBorder: string;
    isDark: boolean;
}

interface PlanCardProps {
    plan: Plan;
    serviceSlug: string;
    serviceName: string;
    isPopular?: boolean;
    theme?: ServiceTheme;
}

export default function PlanCard({ plan, serviceSlug, serviceName, isPopular, theme }: PlanCardProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isBtnHovered, setIsBtnHovered] = useState(false);

    // Fallback theme if not provided
    const activeTheme: ServiceTheme = theme || {
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        bgStyle: { background: '#f8fafc', color: '#111827' },
        textColor: '#111827',
        textSecondary: '#6b7280',
        cardBg: '#ffffff',
        cardBorder: '1px solid #e5e7eb',
        isDark: false
    };

    const stockStatus = plan.stockCount <= 5 ? 'low-stock' : 'in-stock';
    const stockLabel = plan.stockCount <= 5 ? `Only ${plan.stockCount} left` : 'In Stock';

    const handleBuy = () => {
        const dest = `/checkout?planId=${plan.id}&service=${serviceSlug}`;
        router.push(dest);
    };

    const cardBackground = activeTheme.isDark 
        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)' 
        : '#ffffff';

    const cardBorderColor = isPopular 
        ? activeTheme.primaryColor 
        : (activeTheme.isDark ? 'rgba(255, 255, 255, 0.08)' : '#e5e7eb');

    const popularShadow = activeTheme.isDark
        ? `0 20px 40px ${activeTheme.primaryColor}20, inset 0 1px 0 rgba(255,255,255,0.15)`
        : `0 20px 40px ${activeTheme.primaryColor}15`;

    const normalShadow = activeTheme.isDark
        ? '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
        : '0 10px 30px rgba(0,0,0,0.03)';

    return (
        <div 
            style={{
                background: cardBackground,
                backgroundColor: activeTheme.isDark ? 'rgba(20, 20, 25, 0.5)' : '#ffffff',
                backdropFilter: activeTheme.isDark ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: activeTheme.isDark ? 'blur(16px)' : 'none',
                borderRadius: '24px',
                padding: '0',
                boxShadow: isHovered 
                    ? (isPopular ? `0 25px 50px ${activeTheme.primaryColor}30` : `0 20px 40px ${activeTheme.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'}`)
                    : (isPopular ? popularShadow : normalShadow),
                border: `2px solid ${cardBorderColor}`,
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div style={{
                    background: `linear-gradient(135deg, ${activeTheme.primaryColor}, ${activeTheme.secondaryColor})`,
                    color: '#fff',
                    padding: '12px 0',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: `0 4px 12px ${activeTheme.primaryColor}30`,
                }}>
                    <Star size={14} fill="#fff" /> MOST POPULAR
                </div>
            )}

            <div style={{ padding: '36px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Plan Name & Duration */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h3 style={{ 
                            fontSize: '1.4rem', 
                            fontWeight: 800, 
                            color: activeTheme.textColor, 
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}>{plan.name}</h3>
                        <div style={{
                            padding: '4px 12px',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: activeTheme.isDark ? 'rgba(255, 255, 255, 0.08)' : '#f3f4f6',
                            color: activeTheme.isDark ? '#e5e7eb' : '#4b5563',
                            border: activeTheme.isDark ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        }}>
                            Auto
                        </div>
                    </div>
                    <p style={{ color: activeTheme.textSecondary, fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                        {plan.description || `${serviceName} — ${plan.durationDays} day access`}
                    </p>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ 
                            fontSize: '2.8rem', 
                            fontWeight: 900, 
                            color: activeTheme.textColor, 
                            letterSpacing: '-2px', 
                            lineHeight: 1 
                        }}>
                            {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.price).toLocaleString()}
                            {plan.currency === 'INR' && (
                                <span style={{ 
                                    fontSize: '1.3rem', 
                                    color: activeTheme.textSecondary, 
                                    fontWeight: 600, 
                                    marginLeft: '12px',
                                    letterSpacing: 'normal'
                                }}>
                                    | ${(parseFloat(plan.price) / 84).toFixed(2)}
                                </span>
                            )}
                        </span>
                        {plan.originalPrice && (
                            <span style={{ 
                                fontSize: '1.1rem', 
                                color: activeTheme.isDark ? 'rgba(255,255,255,0.3)' : '#9ca3af', 
                                textDecoration: 'line-through', 
                                fontWeight: 500 
                            }}>
                                {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div style={{ 
                        fontSize: '0.85rem', 
                        color: activeTheme.textSecondary, 
                        marginTop: '6px', 
                        fontWeight: 500 
                    }}>
                        for {plan.durationDays} days validity
                    </div>
                </div>

                {/* Features */}
                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 32px 0', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px' 
                }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: activeTheme.textColor }}>
                        <Check size={18} style={{ color: activeTheme.primaryColor, flexShrink: 0 }} /> Premium access included
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: activeTheme.textColor }}>
                        <Check size={18} style={{ color: activeTheme.primaryColor, flexShrink: 0 }} /> Instant delivery via email
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: activeTheme.textColor }}>
                        <Check size={18} style={{ color: activeTheme.primaryColor, flexShrink: 0 }} /> 24/7 support included
                    </li>
                </ul>

                {/* Buy Button */}
                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={handleBuy}
                        style={{
                            width: '100%',
                            padding: '18px',
                            background: `linear-gradient(135deg, ${activeTheme.primaryColor}, ${activeTheme.secondaryColor})`,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: isBtnHovered ? 'scale(1.02)' : 'scale(1)',
                            boxShadow: isBtnHovered 
                                ? `0 12px 30px ${activeTheme.primaryColor}40` 
                                : `0 4px 15px ${activeTheme.primaryColor}20`,
                        }}
                        onMouseEnter={() => setIsBtnHovered(true)}
                        onMouseLeave={() => setIsBtnHovered(false)}
                    >
                        <Lock size={18} /> Buy Now Securely
                    </button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        marginTop: '16px',
                        fontSize: '0.75rem',
                        color: activeTheme.textSecondary,
                        fontWeight: 500,
                    }}>
                        <ShieldCheck size={14} style={{ color: activeTheme.primaryColor }} /> Secure & Encrypted Payment
                    </div>
                </div>
            </div>
        </div>
    );
}
