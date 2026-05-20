import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PlanCard from './PlanCard';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Navigation, Headphones, HelpCircle } from 'lucide-react';
import { serviceSlugParamSchema } from '@/lib/validators';

export const revalidate = 30; // ISR: 30 seconds

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    if (!serviceSlugParamSchema.safeParse(params.slug).success) {
        return { title: 'Service Not Found — StreamKart' };
    }
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
    if (!serviceSlugParamSchema.safeParse(params.slug).success) {
        notFound();
    }

    let service: Service;
    try {
        service = await getServiceBySlug(params.slug);
    } catch {
        notFound();
    }

    // Dynamic gradient colors based on service name length (deterministic but varied)
    const hue = (service.name.length * 25) % 360;
    const gradient = `linear-gradient(135deg, hsl(${hue}, 80%, 15%), hsl(${(hue + 40) % 360}, 100%, 25%))`;

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', fontWeight: 'bold' }}>
            {/* Breadcrumb */}
            <div className="container">
                <nav style={{ padding: '24px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#10b981' }}>{service.name}</span>
                </nav>
            </div>

            {/* Premium Hero Banner */}
            <div style={{ background: gradient, padding: '60px 24px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 700, margin: '0 0 16px 0', letterSpacing: '-1px', fontFamily: '"Times New Roman", Times, serif' }}>{service.name}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
                        {service.description || `Upgrade your experience with premium ${service.name} access. Choose a plan below and get instant activation.`}
                    </p>
                </div>
            </div>

            {/* Plans Section */}
            <section className="container" style={{ padding: '60px 24px', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                {service.plans.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {service.plans.map((plan, index) => (
                            <PlanCard 
                                key={plan.id} 
                                plan={plan} 
                                serviceSlug={service.slug} 
                                serviceName={service.name} 
                                isPopular={index === 0} // Highlight first plan as popular
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', background: '#fff', padding: '60px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: '1.2rem', color: '#4b5563', fontWeight: 500 }}>No plans available at the moment</p>
                        <p style={{ marginTop: '8px', color: '#9ca3af' }}>Check back soon — we&apos;re restocking!</p>
                    </div>
                )}
            </section>

            {/* Trust Strip */}
            <div className="container" style={{ padding: '0 24px 60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#f0fdf4', color: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: '#111827', marginBottom: '4px' }}>100% Safe & Secure</strong>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, display: 'block' }}>Your data and payments are fully protected with 256-bit encryption.</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Navigation size={24} style={{ transform: 'rotate(45deg)' }} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: '#111827', marginBottom: '4px' }}>Instant Delivery</strong>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, display: 'block' }}>Access details and instructions delivered instantly to your email.</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#fef2f2', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Headphones size={24} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: '#111827', marginBottom: '4px' }}>24/7 Priority Support</strong>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, display: 'block' }}>Our dedicated team is here to help you anytime you need assistance.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container" style={{ padding: '0 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f3f4f6', padding: '8px 16px', borderRadius: '20px', color: '#4b5563', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
                        <HelpCircle size={16} /> FAQ
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: 0 }}>Frequently Asked Questions</h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#111827' }}>How quickly will I receive my {service.name} access?</h4>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>Delivery is automated. You will receive your credentials or activation link via email and WhatsApp immediately after your payment is confirmed.</p>
                    </div>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#111827' }}>Is this an official subscription?</h4>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>Yes, we provide 100% genuine and official access for {service.name}. You enjoy the full premium experience without any interruptions.</p>
                    </div>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#111827' }}>What happens if I face issues?</h4>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.6 }}>We offer 24/7 dedicated support. You can open a ticket in your dashboard or reply to your order email, and we will resolve it immediately.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
