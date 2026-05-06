'use client';

import Link from 'next/link';
import { 
    ChevronRight, 
    ShieldCheck, 
    Zap, 
    Tag, 
    Headphones, 
    MessageCircle,
    ArrowRight,
    Search,
    ChevronDown,
    Play
} from 'lucide-react';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

const AI_SERVICES = [
    { id: 'chatgpt', name: 'ChatGPT Plus', desc: 'Smarter conversations, infinite possibilities.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/chatgpt.png` },
    { id: 'gemini', name: 'Gemini Advanced', desc: "Google's most powerful AI model.", price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/gemini.png` },
    { id: 'claude', name: 'Claude Pro', desc: 'Advanced AI assistant by Anthropic.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/claude.png` },
    { id: 'perplexity', name: 'Perplexity Pro', desc: 'Search smarter, not harder.', price: '₹199', tag: 'Popular', logo: `${MINIO}/logos/perplexity.png` },
    { id: 'midjourney', name: 'Midjourney', desc: 'Create stunning AI artwork.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/midjourney.png` },
    { id: 'copilot', name: 'Microsoft Copilot', desc: 'Your everyday AI companion.', price: '₹249', tag: 'Popular', logo: `${MINIO}/logos/copilot.png` },
    { id: 'notion', name: 'Notion AI', desc: 'Write, plan, organize. All in one place.', price: '₹249', tag: 'Popular', logo: `${MINIO}/logos/notion.png` },
    { id: 'elevenlabs', name: 'ElevenLabs', desc: 'AI voice generation that sounds real.', price: '₹199', tag: 'Popular', logo: `${MINIO}/logos/elevenlabs.png` },
];

export default function AICategoryPage() {
    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '80px', fontFamily: '"Times New Roman", Times, serif' }}>
            
            {/* Breadcrumbs */}
            <div className="container" style={{ padding: '24px 0', fontSize: '1rem', color: '#666' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 12px' }}>›</span>
                <span style={{ color: '#1a1c23', fontWeight: 'bold' }}>Artificial Intelligence</span>
            </div>

            {/* Hero Banner Section */}
            <div className="container" style={{ marginBottom: '40px' }}>
                <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    background: '#0a0a0f'
                }}>
                    <img 
                        src={`${MINIO}/slider/ChatGPT%20Image%20May%201,%202026,%2005_42_45%20AM.png`} 
                        alt="AI Banner" 
                        style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                </div>
            </div>

            {/* Header */}
            <div className="container" style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1c23', margin: '0 0 10px 0' }}>Pro AI Subscriptions</h1>
                <p style={{ fontSize: '1.1rem', color: '#666', margin: 0 }}>Unlock the power of artificial intelligence today.</p>
            </div>

            {/* Service Grid - Clean Roman Bold Style */}
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px' }}>
                    {AI_SERVICES.map((service) => (
                        <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: '#f3f4f6',
                                borderRadius: '24px',
                                padding: '32px',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                    <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={service.logo} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ background: '#1a1c23', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 14px', borderRadius: '100px', textTransform: 'uppercase' }}>
                                        {service.tag}
                                    </div>
                                </div>
                                
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1a1c23', margin: '0 0 12px 0' }}>{service.name}</h3>
                                <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0 0 24px 0', lineHeight: 1.5 }}>
                                    {service.desc}
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: 'auto' }}>
                                    <div>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1c23' }}>{service.price}</span>
                                        <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}> /mo</span>
                                    </div>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1c23', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                        <ArrowRight size={22} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom USP Bar */}
            <div className="container">
                <div style={{
                    background: '#1a1c23',
                    borderRadius: '24px',
                    padding: '40px 60px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '40px',
                    color: '#fff'
                }}>
                    {[
                        { icon: <ShieldCheck size={32} />, title: 'Safe & Secure' },
                        { icon: <Zap size={32} />, title: 'Instant Delivery' },
                        { icon: <ShieldCheck size={32} />, title: 'Official Access' },
                        { icon: <Headphones size={32} />, title: '24/7 Support' }
                    ].map((usp, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ color: '#fff' }}>{usp.icon}</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{usp.title}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
