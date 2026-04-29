import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import { ChevronRight, ShieldCheck, Tag, Zap, Headphones } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="container" style={{ paddingBottom: '80px' }}>

            {/* ─── Hero Slider ────────────────────────────────────────── */}
            <div className="main-hero-area">
                <HeroSlider />
            </div>

            {/* ─── Trending Now ─────────────────────────────────────── */}
            <div className="content-section-head" style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.6rem' }}>🔥 Trending Now</h2>
                <Link href="/services" className="section-link-more">
                    View All <ChevronRight size={18} />
                </Link>
            </div>

            <div className="trending-cards-grid" style={{ gap: '24px' }}>
                <Link href="/services/netflix" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none' }}>
                    <Image src="/images/netflix_3d.png" alt="Netflix" width={600} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
                </Link>

                <Link href="/services/chatgpt" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none' }}>
                    <Image src="/images/chatgpt_3d.png" alt="ChatGPT" width={600} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
                </Link>

                <Link href="/services/jiohotstar" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none' }}>
                    <Image src="/images/jiohotstar_3d.png" alt="JioHotstar" width={600} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
                </Link>

                <Link href="/services/sonyliv" style={{ display: 'block', borderRadius: '28px', overflow: 'hidden', textDecoration: 'none' }}>
                    <Image src="/images/sonyliv_3d.png" alt="SonyLIV" width={600} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
                </Link>
            </div>

            {/* ─── Content Blocks Grid ─────────────────────────────── */}
            <div className="blocks-parent-grid" style={{ marginTop: '56px' }}>
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src="/images/blocks/streaming.png" alt="Streaming" width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src="/images/blocks/grossing.png" alt="Grosing" width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src="/images/blocks/activation.png" alt="Activation" width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            </div>

            <div className="blocks-parent-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '24px' }}>
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src="/images/blocks/ai.png" alt="Artificial Intelligence" width={1200} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <Image src="/images/blocks/vpn.png" alt="VPN Services" width={1200} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
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
