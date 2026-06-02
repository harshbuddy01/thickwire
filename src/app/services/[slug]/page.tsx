import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PlanCard from './PlanCard';
import WishlistButton from './WishlistButton';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Navigation, Headphones, HelpCircle } from 'lucide-react';
import { serviceSlugParamSchema } from '@/lib/validators';
import { getFallbackService } from '@/lib/services-data';

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
        const fallback = getFallbackService(params.slug);
        if (fallback) {
            return {
                title: `${fallback.name} — StreamKart`,
                description: fallback.description,
            };
        }
        return { title: 'Service — StreamKart' };
    }
}

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

const DEFAULT_BRAND_COLORS: Record<string, { primary: string; secondary: string }> = {
    crunchyroll: { primary: '#f47521', secondary: '#ff9e59' },
    elevenlabs: { primary: '#8c52ff', secondary: '#a173ff' },
    chatgpt: { primary: '#10a37f', secondary: '#1fa985' },
    gemini: { primary: '#3b82f6', secondary: '#60a5fa' },
    netflix: { primary: '#e50914', secondary: '#ff3333' },
    'netflix-premium': { primary: '#e50914', secondary: '#ff3333' },
    spotify: { primary: '#1db954', secondary: '#1ed760' },
    'spotify-premium': { primary: '#1db954', secondary: '#1ed760' },
    youtube: { primary: '#ff0000', secondary: '#ff4d4d' },
    'youtube-music': { primary: '#ff0000', secondary: '#ff4d4d' },
    prime: { primary: '#00a8e1', secondary: '#33c2f2' },
    'amazon-prime': { primary: '#00a8e1', secondary: '#33c2f2' },
    disney: { primary: '#0063e5', secondary: '#3b8eff' },
    'disney-plus': { primary: '#0063e5', secondary: '#3b8eff' },
    zee5: { primary: '#8230c5', secondary: '#9e59d9' },
    sonyliv: { primary: '#e2a524', secondary: '#f0be4d' },
    canva: { primary: '#00c4cc', secondary: '#33d4db' },
    telegram: { primary: '#24a1de', secondary: '#52bef2' },
    jiohotstar: { primary: '#ffc629', secondary: '#ffe082' },
    claude: { primary: '#ea580c', secondary: '#f97316' },
    adobe: { primary: '#ff0000', secondary: '#ff4d4d' },
    'microsoft-365': { primary: '#d83b01', secondary: '#f35325' },
};

const getServiceTheme = (slug: string): ServiceTheme => {
    const cleanSlug = (slug || '').toLowerCase();
    const brand = DEFAULT_BRAND_COLORS[cleanSlug] || { primary: '#10b981', secondary: '#059669' };
    const primary = brand.primary;
    const secondary = brand.secondary;

    return {
        primaryColor: primary,
        secondaryColor: secondary,
        bgStyle: { 
            background: `linear-gradient(135deg, ${primary}15 0%, #07060b 60%, #030305 100%)`, 
            color: '#ffffff' 
        },
        textColor: '#ffffff',
        textSecondary: 'rgba(255, 255, 255, 0.6)',
        cardBg: 'rgba(255, 255, 255, 0.02)',
        cardBorder: `1px solid ${primary}25`,
        isDark: true
    };
};

export default async function ServicePage({
    params,
}: {
    params: { slug: string };
}) {
    if (!serviceSlugParamSchema.safeParse(params.slug).success) {
        notFound();
    }

    let service: Service | null = null;
    try {
        service = await getServiceBySlug(params.slug);
    } catch {
        service = getFallbackService(params.slug);
    }

    if (!service) {
        notFound();
    }

    const theme = getServiceTheme(service.slug);

    return (
        <div style={{ ...theme.bgStyle, minHeight: '100vh', fontFamily: "'Outfit', sans-serif", transition: 'all 0.3s' }}>
            {/* Breadcrumb */}
            <div className="container">
                <nav style={{ padding: '24px 0', fontSize: '13px', color: theme.textSecondary, display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: theme.isDark ? '#fff' : '#111827', opacity: 0.8, textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: theme.isDark ? '#fff' : '#111827', opacity: 0.8, textDecoration: 'none', fontWeight: 500 }}>Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: theme.primaryColor }}>{service.name}</span>
                </nav>
            </div>

            {/* Premium Hero Banner */}
            {service.bannerUrl ? (
                <div className="container" style={{ padding: '0 24px' }}>
                    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', marginBottom: '32px' }}>
                        <img 
                            src={service.bannerUrl} 
                            alt={`${service.name} Banner`} 
                            style={{ width: '100%', height: 'auto', display: 'block' }} 
                        />
                    </div>
                    {/* Wishlist & Meta bar under banner */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: theme.textColor }}>{service.name}</h1>
                            {service.description && (
                                <p style={{ fontSize: '1rem', color: theme.textSecondary, margin: '4px 0 0 0' }}>{service.description}</p>
                            )}
                        </div>
                        <WishlistButton service={service} />
                    </div>
                </div>
            ) : (
                <div style={{ background: `linear-gradient(135deg, ${theme.primaryColor}22, ${theme.secondaryColor}33)`, padding: '60px 24px', textAlign: 'center', color: theme.textColor, position: 'relative', overflow: 'hidden', borderRadius: '24px', margin: '0 24px 32px' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)' }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 16px 0', letterSpacing: '-0.04em' }}>{service.name}</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
                            {service.description || `Upgrade your experience with premium ${service.name} access. Choose a plan below and get instant activation.`}
                        </p>
                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                            <WishlistButton service={service} />
                        </div>
                    </div>
                </div>
            )}

            {/* Plans Section */}
            <section className="container" style={{ 
                padding: '40px 24px 60px', 
                marginTop: service.bannerUrl ? '0' : '-20px', 
                position: 'relative', 
                zIndex: 10 
            }}>
                {service.plans.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {service.plans.map((plan, index) => (
                            <PlanCard 
                                key={plan.id} 
                                plan={plan} 
                                serviceSlug={service.slug} 
                                serviceName={service.name} 
                                isPopular={index === 0} // Highlight first plan as popular
                                theme={theme}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', background: theme.cardBg, border: theme.cardBorder, padding: '60px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                        <p style={{ fontSize: '1.2rem', color: theme.textColor, fontWeight: 500 }}>No plans available at the moment</p>
                        <p style={{ marginTop: '8px', color: theme.textSecondary }}>Check back soon — we&apos;re restocking!</p>
                    </div>
                )}
            </section>

            {/* Trust Strip */}
            <div className="container" style={{ padding: '0 24px 60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', background: theme.cardBg, border: theme.cardBorder, padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: theme.isDark ? 'rgba(16,185,129,0.1)' : '#f0fdf4', color: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: theme.textColor, marginBottom: '4px' }}>100% Safe & Secure</strong>
                            <span style={{ fontSize: '0.85rem', color: theme.textSecondary, lineHeight: 1.5, display: 'block' }}>Your data and payments are fully protected with 256-bit encryption.</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: theme.isDark ? 'rgba(59,130,246,0.1)' : '#eff6ff', color: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Navigation size={24} style={{ transform: 'rotate(45deg)' }} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: theme.textColor, marginBottom: '4px' }}>Instant Delivery</strong>
                            <span style={{ fontSize: '0.85rem', color: theme.textSecondary, lineHeight: 1.5, display: 'block' }}>Access details and instructions delivered instantly to your email.</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: theme.isDark ? 'rgba(239,68,68,0.1)' : '#fef2f2', color: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Headphones size={24} />
                        </div>
                        <div>
                            <strong style={{ display: 'block', fontSize: '1.05rem', color: theme.textColor, marginBottom: '4px' }}>24/7 Priority Support</strong>
                            <span style={{ fontSize: '0.85rem', color: theme.textSecondary, lineHeight: 1.5, display: 'block' }}>Our dedicated team is here to help you anytime you need assistance.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container" style={{ padding: '0 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: theme.isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6', padding: '8px 16px', borderRadius: '20px', color: theme.textColor, fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
                        <HelpCircle size={16} /> FAQ
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: theme.textColor, margin: 0 }}>Frequently Asked Questions</h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: theme.textColor }}>How quickly will I receive my {service.name} access?</h4>
                        <p style={{ margin: 0, color: theme.textSecondary, fontSize: '0.95rem', lineHeight: 1.6 }}>Delivery is automated. You will receive your credentials or activation link via email and WhatsApp immediately after your payment is confirmed.</p>
                    </div>
                    <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: theme.textColor }}>Is this an official subscription?</h4>
                        <p style={{ margin: 0, color: theme.textSecondary, fontSize: '0.95rem', lineHeight: 1.6 }}>Yes, we provide 100% genuine and official access for {service.name}. You enjoy the full premium experience without any interruptions.</p>
                    </div>
                    <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: theme.textColor }}>What happens if I face issues?</h4>
                        <p style={{ margin: 0, color: theme.textSecondary, fontSize: '0.95rem', lineHeight: 1.6 }}>We offer 24/7 dedicated support. You can open a ticket in your dashboard or reply to your order email, and we will resolve it immediately.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
