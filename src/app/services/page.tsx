import { getServices } from '@/lib/api';
import Link from 'next/link';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Services — StreamKart',
    description: 'Browse all premium digital services and subscriptions available on StreamKart.',
};

export const revalidate = 60;

export default async function ServicesDirectoryPage() {
    let services = [];
    try {
        services = await getServices();
    } catch (e) {
        console.error('Failed to load services directory:', e);
    }

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', fontWeight: 'bold' }}>
            <div className="container">
                <nav style={{ padding: '24px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#10b981' }}>All Services</span>
                </nav>

                <div style={{ marginBottom: '40px', marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: '#10b981', color: '#fff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LayoutGrid size={24} />
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#111827' }}>Our Premium Services</h1>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0, maxWidth: '600px' }}>
                        Browse our complete catalog of premium subscriptions, tools, and digital services available for instant delivery.
                    </p>
                </div>

                {services.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '24px' }}>
                        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Loading services...</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px',
                        paddingBottom: '80px'
                    }}>
                        {services.map((service) => {
                            const hue = (service.name.length * 25) % 360;
                            return (
                                <Link 
                                    key={service.id} 
                                    href={`/services/${service.slug}`}
                                    style={{
                                        textDecoration: 'none',
                                        background: '#fff',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                        border: '1px solid #f1f5f9',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '16px',
                                        background: `linear-gradient(135deg, hsl(${hue}, 80%, 30%), hsl(${(hue + 40) % 360}, 100%, 45%))`,
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        fontWeight: 900,
                                        marginBottom: '16px',
                                        fontFamily: 'sans-serif'
                                    }}>
                                        {service.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>{service.name}</h3>
                                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0, lineHeight: 1.5, flex: 1 }}>
                                        {service.description || 'Premium subscription access'}
                                    </p>
                                    <div style={{ marginTop: '20px', color: '#10b981', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        View Plans <ChevronRight size={16} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
