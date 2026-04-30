import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProgressiveImage from '@/components/ProgressiveImage';
import { ChevronRight, ShieldCheck, Tag, Zap, Headphones } from 'lucide-react';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

export default function HomePage() {
    return (
        <div className="container" style={{ paddingBottom: '80px', paddingTop: '100px' }}>

            {/* ─── Hero Slider ────────────────────────────────────────── */}
            <div className="main-hero-area">
                <HeroSlider />
            </div>

            {/* ─── Trending Now ─────────────────────────────────────── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px', flexWrap: 'nowrap' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a1c23', margin: 0, whiteSpace: 'nowrap' }}>🔥 Trending <span style={{ color: '#6c5ce7' }}>Now</span></h2>
                <Link href="/services" style={{ flexShrink: 0, padding: '8px 18px', background: '#f1f5f9', color: '#0f172a', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    View All
                </Link>
            </div>

            <div className="trending-cards-grid" style={{ gap: '24px' }}>
                <Link href="/services/netflix" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none', aspectRatio: '1/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/netflix_3d.png`} alt="Netflix" />
                </Link>

                <Link href="/services/chatgpt" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none', aspectRatio: '1/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/chatgpt_3d.png`} alt="ChatGPT" />
                </Link>

                <Link href="/services/jiohotstar" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none', aspectRatio: '1/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/jiohotstar_3d.png`} alt="JioHotstar" />
                </Link>

                <Link href="/services/sonyliv" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none', aspectRatio: '1/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/sonyliv_3d.png`} alt="SonyLIV" />
                </Link>
            </div>

            {/* ─── Content Blocks Grid ─────────────────────────────── */}
            <div className="blocks-parent-grid" style={{ marginTop: '56px' }}>
                <Link href="/streaming" style={{ display: 'block', borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', textDecoration: 'none' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/streaming.png`} alt="Streaming" />
                </Link>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/grossing.png`} alt="Grosing" />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/activation.png`} alt="Activation" />
                </div>
            </div>

            <div className="blocks-parent-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '24px' }}>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '2/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/ai.png`} alt="Artificial Intelligence" />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '2/1' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/vpn.png`} alt="VPN Services" />
                </div>
            </div>

            {/* ─── Bottom Features Row ───────────────────────────────── */}
            <div className="bottom-features-row" style={{ marginTop: '64px' }}>
                <div className="usp-card float-anim">
                    <div className="usp-rounded-icon"><ShieldCheck size={24} /></div>
                    <div className="usp-content">
                        <h4>100% Safe &amp; Secure</h4>
                        <p>Your data and payments are fully protected</p>
                    </div>
                </div>
                <div className="usp-card float-anim" style={{ animationDelay: '0.5s' }}>
                    <div className="usp-rounded-icon"><Tag size={24} /></div>
                    <div className="usp-content">
                        <h4>Best Price Guarantee</h4>
                        <p>Get top services at the best possible prices</p>
                    </div>
                </div>
                <div className="usp-card float-anim" style={{ animationDelay: '1s' }}>
                    <div className="usp-rounded-icon"><Zap size={24} /></div>
                    <div className="usp-content">
                        <h4>Instant Delivery</h4>
                        <p>Quick activation &amp; instant access</p>
                    </div>
                </div>
                <div className="usp-card float-anim" style={{ animationDelay: '1.5s' }}>
                    <div className="usp-rounded-icon"><Headphones size={24} /></div>
                    <div className="usp-content">
                        <h4>24/7 Customer Support</h4>
                        <p>We&apos;re here anytime you need us</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
