'use client';

import Link from 'next/link';
import { 
    ChevronRight, 
    ShieldCheck, 
    Zap, 
    Tag, 
    Headphones, 
    ArrowRight
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
const BANNER_IMG = `${MINIO}/slider/WhatsApp%20Image%202026-05-06%20at%2008.50.27.jpeg`;

const GROSSING_SERVICES = [
    { id: 'capcut', name: 'CapCut Pro', desc: 'Video Editing Premium', price: '₹149', logo: `${MINIO}/logos/capcut.png` },
    { id: 'canva', name: 'Canva Pro', desc: 'Graphic Design Premium', price: '₹99', logo: `${MINIO}/logos/canva.png` },
    { id: 'duolingo', name: 'Duolingo Super', desc: 'Language Learning Premium', price: '₹149', logo: `${MINIO}/logos/duolingo.png` },
    { id: 'edx', name: 'edX Subscription', desc: 'Learning Platform Premium', price: '₹299', logo: `${MINIO}/logos/edx.png` },
    { id: 'chatgpt', name: 'ChatGPT Plus', desc: 'AI Assistant Premium', price: '₹299', logo: `${MINIO}/logos/chatgpt.png` },
    { id: 'perplexity', name: 'Perplexity AI', desc: 'AI Search Premium', price: '₹199', logo: `${MINIO}/logos/perplexity.png` },
    { id: 'tradingview', name: 'TradingView', desc: 'Pro Trading Tools', price: '₹349', logo: `${MINIO}/logos/tradingview.png` },
    { id: 'adobe', name: 'Adobe Suite', desc: 'Creative Professional Suite', price: '₹399', logo: `${MINIO}/logos/adobe.png` },
    { id: 'linkedin', name: 'LinkedIn Prem.', desc: 'Career & Business Advanced', price: '₹249', logo: `${MINIO}/logos/linkedin.png` },
    { id: 'windows', name: 'Windows Pro', desc: 'Official OS Activation', price: '₹499', logo: `${MINIO}/logos/windows.png` },
    { id: 'office', name: 'Office 365', desc: 'Productivity Suit License', price: '₹399', logo: `${MINIO}/logos/office.png` },
    { id: 'gcp', name: 'Google Cloud', desc: 'Enterprise Cloud & AI Tools', price: '₹599', logo: `${MINIO}/logos/gcp.png` },
];

export default function GrossingCategoryPage() {
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderRef.current) {
                const slider = sliderRef.current;
                const cardWidth = 374; // card width (350) + gap (24)
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                
                if (slider.scrollLeft >= maxScroll - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }, 5000); // Every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', paddingBottom: '80px', fontFamily: '"Times New Roman", Times, serif' }}>
            
            {/* Mobile Responsive Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes floatAnimation {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }
                .slider-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    padding: 20px 0 60px 0;
                }
                .service-slider {
                    display: flex;
                    gap: 24px;
                    overflow-x: auto;
                    scroll-behavior: smooth;
                    padding-bottom: 20px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .service-slider::-webkit-scrollbar {
                    display: none;
                }
                .service-card {
                    flex: 0 0 350px;
                    background: #f3f4f6;
                    border-radius: 24px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.5s ease;
                    border: none;
                    animation: floatAnimation 6s ease-in-out infinite;
                }
                .service-card:nth-child(even) {
                    animation-delay: 1s;
                }
                .service-card:hover {
                    animation-play-state: paused;
                    transform: translateY(-15px) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
                }
                .service-logo-container {
                    width: 100px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }
                .usp-bar {
                    background: #1a1c23;
                    border-radius: 24px;
                    padding: 32px 60px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px;
                    color: #fff;
                }

                @media (max-width: 768px) {
                    .service-slider {
                        gap: 16px;
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                    .service-card {
                        flex: 0 0 280px;
                        padding: 20px;
                        border-radius: 20px;
                    }
                    .service-logo-container {
                        width: 80px;
                        height: 80px;
                        margin-bottom: 16px;
                    }
                    .service-name {
                        font-size: 1.25rem !important;
                    }
                    .usp-bar {
                        grid-template-columns: 1fr 1fr;
                        padding: 24px;
                        gap: 20px;
                    }
                }
            `}} />
            
            {/* Breadcrumbs */}
            <div className="container" style={{ padding: '24px 0', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 12px' }}>›</span>
                <span style={{ color: '#1a1c23', fontWeight: 'bold' }}>Grossing</span>
            </div>

            {/* Banner Section */}
            <div className="container" style={{ marginBottom: '40px' }}>
                <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    background: '#fff'
                }}>
                    <img 
                        src={BANNER_IMG} 
                        alt="Banner" 
                        style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                </div>
            </div>

            {/* Header */}
            <div className="container" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a1c23', margin: '0 0 4px 0' }}>Trending Digital Services</h1>
                    <p style={{ fontSize: '1rem', color: '#666', margin: 0 }}>Slide to discover our best-selling subscriptions.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => document.getElementById('service-slider')!.scrollBy({left: -350, behavior: 'smooth'})}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff', border: '1px solid #ddd', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button 
                        onClick={() => document.getElementById('service-slider')!.scrollBy({left: 350, behavior: 'smooth'})}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1a1c23', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Service Slider Section */}
            <div className="container" style={{ padding: 0, maxWidth: '100%', overflow: 'hidden' }}>
                <div className="slider-container">
                    <div id="service-slider" ref={sliderRef} className="service-slider" style={{ paddingLeft: 'calc((100vw - 1200px) / 2)', paddingRight: 'calc((100vw - 1200px) / 2)' }}>
                        {GROSSING_SERVICES.map((service) => (
                            <Link href={`/services/${service.id}`} key={service.id} style={{ textDecoration: 'none' }}>
                                <div className="service-card"
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '20px' }}>
                                        <div className="service-logo-container">
                                            <img 
                                                src={service.logo} 
                                                alt={service.name} 
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerHTML = `<div style="background:#fff;width:100%;height:100%;border-radius:20px;display:flex;align-items:center;justify-content:center;color:#1a1c23;font-weight:bold;font-size:1.5rem;">${service.name.substring(0,1)}</div>`;
                                                }}
                                            />
                                        </div>
                                        <div style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.75rem', fontWeight: 'bold', padding: '5px 12px', borderRadius: '100px', textTransform: 'uppercase' }}>
                                            Popular
                                        </div>
                                    </div>

                                    <h3 className="service-name" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1c23', margin: '0 0 10px 0' }}>{service.name}</h3>
                                    <p className="service-desc" style={{ fontSize: '0.95rem', color: '#6b7280', margin: '0 0 24px 0', lineHeight: 1.5, height: '44px', overflow: 'hidden' }}>
                                        {service.desc}
                                    </p>
                                    
                                    <div className="service-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px', marginTop: 'auto' }}>
                                        <div>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1c23' }}>From {service.price}</span>
                                            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}> /mo</span>
                                        </div>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1c23', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom USP Bar */}
            <div className="container">
                <div className="usp-bar">
                    {[
                        { icon: <ShieldCheck size={28} />, title: '100% Safe & Secure' },
                        { icon: <Zap size={28} />, title: 'Instant Delivery' },
                        { icon: <ShieldCheck size={28} />, title: 'Official Access' },
                        { icon: <Headphones size={28} />, title: '24/7 Support' }
                    ].map((usp, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ color: '#fff' }}>{usp.icon}</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{usp.title}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
