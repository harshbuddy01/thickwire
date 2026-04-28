import Link from 'next/link';
import { getServiceBySlug, getServices } from '@/lib/api';
import type { Plan, Service } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 30; // ISR: 30 seconds

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    try {
        const service = await getServiceBySlug(params.slug);
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Service — StreamKart' };
    }
}

export default async function ServicePage({
    params,
}: {
    params: { slug: string };
}) {
    let service: Service;
    try {
        service = await getServiceBySlug(params.slug);
    } catch {
        notFound();
    }

    return (
        <>
            <section className="page-header">
                <h1>{service.name}</h1>
                <p>{service.description || 'Choose a plan and get instant delivery'}</p>
            </section>

            <section className="container" style={{ paddingBottom: '100px' }}>
                {service.plans.length > 0 ? (
                    <div className="plan-grid">
                        {service.plans.map((plan) => (
                            <PlanCard key={plan.id} plan={plan} serviceSlug={service.slug} serviceName={service.name} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px 0' }}>
                        <p style={{ fontSize: '1.2rem' }}>No plans available at the moment</p>
                        <p style={{ marginTop: '8px' }}>Check back soon — we&apos;re restocking!</p>
                    </div>
                )}
            </section>
        </>
    );
}

function PlanCard({ plan, serviceSlug, serviceName }: { plan: Plan; serviceSlug: string; serviceName: string }) {
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
            <Link
                href={`/checkout?planId=${plan.id}&service=${serviceSlug}`}
                className={`btn btn-primary btn-full ${!plan.inStock ? 'btn-disabled' : ''}`}
                style={!plan.inStock ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
                {plan.inStock ? 'Buy Now →' : 'Out of Stock'}
            </Link>
        </div>
    );
}
