import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import ProgressiveImage from '@/components/ProgressiveImage';


const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function HomePage() {
    return (
        <div className="container home-container" style={{ paddingBottom: '80px', paddingTop: '80px' }}>

            {/* ─── Hero Slider ────────────────────────────────────────── */}
            <div className="main-hero-area">
                <HeroSlider />
            </div>

            {/* ─── Trending Now ─────────────────────────────────────── */}
            <div className="home-section-head home-section-head--trending">
                <div className="home-section-copy">
                    <span className="home-section-subtitle">🔥 HOT PICKS THIS WEEK</span>
                    <h2 className="home-section-title">
                        Trending <span className="home-script-text">Now</span>
                    </h2>
                </div>
                <Link href="/services" className="home-section-action">
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

            {/* ─── Browse Categories ─────────────────────────────── */}
            <div className="home-section-head home-section-head--categories">
                <div className="home-section-copy">
                    <span className="home-section-subtitle">🗂️ CHOOSE YOUR LANE</span>
                    <h2 className="home-section-title">
                        Browse <span className="home-script-text">Categories</span>
                    </h2>
                </div>
            </div>

            <div className="blocks-parent-grid category-blocks-grid">
                <Link href="/streaming" style={{ display: 'block', borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2', textDecoration: 'none' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/streaming.png`} alt="Streaming" />
                </Link>
                <Link href="/grossing" style={{ display: 'block', borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2', textDecoration: 'none' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/grossing.png`} alt="Grossing" />
                </Link>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/activation.png`} alt="Activation" />
                </div>
                <Link href="/ai" style={{ display: 'block', borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2', textDecoration: 'none' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/ai.png`} alt="Artificial Intelligence" />
                </Link>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2' }}>
                    <ProgressiveImage src={`${MINIO_URL}/blocks/vpn.png`} alt="VPN Services" />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/2' }}>
                    <ProgressiveImage src="/assets/education.png" alt="New Category" />
                </div>
            </div>

        </div>
    );
}
