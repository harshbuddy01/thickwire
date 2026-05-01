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
const BANNER_IMG = `${MINIO}/slider/ChatGPT%20Image%20May%201,%202026,%2005_42_45%20AM.png`;

const CATEGORIES = [
    "All AI Tools", "Chatbots", "Image Generation", "Writing Assistant", 
    "Video Tools", "Productivity", "Code Assistant", "Voice & Audio", "Research"
];

const AI_SERVICES = [
    { id: 'chatgpt', name: 'ChatGPT Plus', desc: 'Smarter conversations, infinite possibilities.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/chatgpt.svg` },
    { id: 'gemini', name: 'Gemini Advanced', desc: "Google's most powerful AI model.", price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/gemini.svg` },
    { id: 'copilot', name: 'Microsoft Copilot', desc: 'Your everyday AI companion.', price: '₹249', tag: 'Popular', logo: `${MINIO}/logos/copilot.svg` },
    { id: 'midjourney', name: 'Midjourney', desc: 'Create stunning AI artwork.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/midjourney.svg` },
    { id: 'notion', name: 'Notion AI', desc: 'Write, plan, organize. All in one place.', price: '₹249', tag: 'Popular', logo: `${MINIO}/logos/notion.svg` },
    { id: 'claude', name: 'Claude Pro', desc: 'AI assistant by Anthropic.', price: '₹299', tag: 'Popular', logo: `${MINIO}/logos/claude.svg` },
    { id: 'perplexity', name: 'Perplexity Pro', desc: 'Search smarter, not harder.', price: '₹199', tag: 'Popular', logo: `${MINIO}/logos/perplexity.svg` },
    { id: 'elevenlabs', name: 'ElevenLabs', desc: 'AI voice generation that sounds real.', price: '₹199', tag: 'Popular', logo: `${MINIO}/logos/elevenlabs.png` },
];

export default function AICategoryPage() {
    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Breadcrumbs */}
            <div className="container" style={{ padding: '20px 0', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 10px' }}>›</span>
                <Link href="/categories" style={{ color: 'inherit', textDecoration: 'none' }}>Categories</Link>
                <span style={{ margin: '0 10px' }}>›</span>
                <span style={{ color: '#1a1c23', fontWeight: 600 }}>Artificial Intelligence</span>
            </div>

            {/* ─── Hero Banner ────────────────────────────────────────── */}
            <div className="container">
                <div style={{
                    position: 'relative',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    background: '#0a0a0f'
                }}>
                    <img 
                        src={BANNER_IMG} 
                        alt="AI Banner" 
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            display: 'block' 
                        }} 
                    />
                </div>
            </div>


            {/* ─── Service Grid ───────────────────────────────────────── */}
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {AI_SERVICES.map((service) => (
                        <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: '#fff',
                                borderRadius: '24px',
                                padding: '24px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                                border: '1px solid #f0f0f0',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: '#fff', border: '1px solid #f0f0f0', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                                        <img src={service.logo} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png'} />
                                    </div>
                                    <div style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.7rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>
                                        {service.tag}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a1c23', margin: '0 0 8px 0' }}>{service.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 20px 0', lineHeight: 1.5, height: '40px', overflow: 'hidden' }}>
                                    {service.desc}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23' }}>From {service.price}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#999' }}> /mo</span>
                                    </div>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1c23' }}>
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ─── Bottom Dark USP Bar ───────────────────────────────── */}
            <div className="container">
                <div style={{
                    background: '#1a1c23',
                    borderRadius: '24px',
                    padding: '32px 60px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '40px',
                    color: '#fff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ color: '#3b82f6' }}><ShieldCheck size={28} /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>100% Safe & Secure</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Your data and payments are protected</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ color: '#10b981' }}><Zap size={28} /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Instant Delivery</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Get access in seconds after payment</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ color: '#f59e0b' }}><Tag size={28} /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Best Price Guarantee</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Unbeatable prices on all AI tools</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ color: '#60a5fa' }}><Headphones size={28} /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>24/7 Customer Support</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>We're here to help you anytime</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
