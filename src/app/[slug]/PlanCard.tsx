'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import type { Plan } from '@/lib/types';

interface PlanCardProps {
    plan: Plan;
    serviceSlug: string;
    serviceName: string;
}

export default function PlanCard({ plan, serviceSlug, serviceName }: PlanCardProps) {
    const { user } = useAuth();
    const router = useRouter();

    const stockStatus = !plan.inStock
        ? 'out-of-stock'
        : plan.stockCount <= 5
            ? 'low-stock'
            : 'in-stock';

    const stockLabel = !plan.inStock
        ? 'Out of Stock'
        : plan.stockCount <= 5
            ? `Only ${plan.stockCount} left`
            : 'In Stock';

    const handleBuy = () => {
        if (!plan.inStock) return;
        const dest = `/checkout?planId=${plan.id}&service=${serviceSlug}`;
        if (!user) {
            router.push(`/login?redirect=${encodeURIComponent(dest)}`);
        } else {
            router.push(dest);
        }
    };

    return (
        <div className="plan-card">
            <div className={`stock-badge ${stockStatus}`}>
                <span className="stock-dot" />
                {stockLabel}
            </div>
            <div className="plan-card-name">{plan.name}</div>
            <div className="plan-card-desc">
                {plan.description || `${serviceName} — ${plan.durationDays} day access`}
            </div>
            <div className="plan-card-price">
                <span className="current">₹{parseFloat(plan.price).toLocaleString()}</span>
                {plan.originalPrice && (
                    <span className="original">₹{parseFloat(plan.originalPrice).toLocaleString()}</span>
                )}
            </div>
            <div className="plan-card-duration">{plan.durationDays} days validity</div>
            <button
                onClick={handleBuy}
                disabled={!plan.inStock}
                className={`btn btn-primary btn-full ${!plan.inStock ? 'btn-disabled' : ''}`}
                style={!plan.inStock ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
                {plan.inStock ? 'Buy Now →' : 'Out of Stock'}
            </button>
        </div>
    );
}
