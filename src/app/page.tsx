import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
    return (
        <div className="container" style={{ paddingBottom: '80px' }}>

            {/* ─── Hero Slider ────────────────────────────────────────── */}
            <HeroSlider />

            {/* ─── Trending Now ─────────────────────────────────────── */}
            <div className="section-title">
                <h2>🔥 Trending Now</h2>
                <Link href="/trending" className="view-all">View All &gt;</Link>
            </div>

            <div className="trending-grid">
                <Link href="/services/netflix" className="trending-card bg-netflix" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="external-icon">↗</div>
                    <img src="https://cdn-icons-png.flaticon.com/512/5977/5977590.png" alt="Netflix" />
                    <h3>Netflix</h3>
                </Link>
                <Link href="/services/chatgpt" className="trending-card bg-chatgpt" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="external-icon" style={{ background: '#10a37f' }}>↗</div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" style={{ filter: 'drop-shadow(0 10px 15px rgba(16,163,127,0.3))' }} />
                    <h3>ChatGPT</h3>
                </Link>
                <Link href="/services/jiohotstar" className="trending-card bg-hotstar" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="external-icon" style={{ background: '#1c3e8f' }}>↗</div>
                    <div style={{ width: '120px', height: '120px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #1c3e8f, #0f2b6e)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(28,62,143,0.3)' }}>
                        JioHotstar
                    </div>
                    <h3>JioHotstar</h3>
                </Link>
                <Link href="/services/sonyliv" className="trending-card bg-sonyliv" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="external-icon" style={{ background: '#ff3366' }}>↗</div>
                    <div style={{ width: '120px', height: '120px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #0f0f0f, #222)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                        <span style={{ color: '#ff3366' }}>Sony</span>LIV
                    </div>
                    <h3>SonyLIV</h3>
                </Link>
            </div>

            {/* ─── Content Blocks Row 1 ─────────────────────────────── */}
            <div className="content-grid">
                <div className="block-card block-streaming">
                    <div className="block-header">
                        <div className="block-icon" style={{ background: 'linear-gradient(135deg, #7b2cbf, #c77dff)' }}>▶</div>
                        <h3>Streaming</h3>
                    </div>
                    <p className="block-desc">Watch unlimited entertainment</p>
                    <div className="brand-icons">
                        <div className="brand-icon" style={{ background: '#00a8e1', color: 'white' }}>Prime</div>
                        <div className="brand-icon" style={{ background: '#e50914', color: 'white' }}>N</div>
                        <div className="brand-icon" style={{ background: '#1c3e8f', color: 'white', fontSize: '0.6rem' }}>Disney+</div>
                    </div>
                </div>

                <div className="block-card block-grosing">
                    <div className="block-header">
                        <div className="block-icon" style={{ background: 'linear-gradient(135deg, #00b4d8, #90e0ef)' }}>🛍️</div>
                        <h3>Grosing</h3>
                    </div>
                    <p className="block-desc">Create. Edit. Inspire.</p>
                    <div className="brand-icons">
                        <div className="brand-icon">CC</div>
                        <div className="brand-icon" style={{ background: '#00c4cc', color: 'white', fontSize: '0.6rem' }}>Canva</div>
                        <div className="brand-icon" style={{ background: '#000', color: 'white' }}>VN</div>
                    </div>
                </div>

                <div className="block-card block-activation">
                    <div className="block-header">
                        <div className="block-icon" style={{ background: 'linear-gradient(135deg, #f94144, #f8961e)' }}>⚡</div>
                        <h3>Activation</h3>
                    </div>
                    <p className="block-desc">Activate your favorite services</p>
                    <div className="brand-icons">
                        <div className="brand-icon" style={{ background: '#000', color: 'white', fontSize: '0.6rem' }}>SonyLIV</div>
                        <div className="brand-icon" style={{ background: '#fff', border: '2px solid #8B2588', color: '#8B2588', fontSize: '0.7rem' }}>ZEE5</div>
                        <div className="brand-icon" style={{ background: '#2E195E', color: 'white', fontSize: '0.6rem' }}>voot</div>
                    </div>
                </div>
            </div>

            {/* ─── Content Blocks Row 2 ─────────────────────────────── */}
            <div className="content-grid-2">
                <div className="block-card block-ai">
                    <div className="block-header">
                        <div className="block-icon" style={{ background: 'linear-gradient(135deg, #4361ee, #4cc9f0)' }}>🧠</div>
                        <h3>Artificial Intelligence</h3>
                    </div>
                    <p className="block-desc">Smart tools for a smarter you</p>
                    <div className="brand-icons">
                        <div className="brand-icon" style={{ background: '#10a37f', color: 'white', fontSize: '0.6rem', padding: '0 4px', textAlign: 'center' }}>ChatGPT</div>
                        <div className="brand-icon" style={{ color: '#1a73e8', fontSize: '0.6rem' }}>✦ Gemini</div>
                        <div className="brand-icon" style={{ background: '#f3f2f1', color: '#0078d4', fontSize: '0.6rem' }}>Copilot</div>
                    </div>
                </div>

                <div className="block-card block-vpn">
                    <div className="block-header">
                        <div className="block-icon" style={{ background: 'linear-gradient(135deg, #3a0ca3, #4361ee)' }}>🛡️</div>
                        <h3>VPN Services</h3>
                    </div>
                    <p className="block-desc">Secure. Private. Stay protected.</p>
                    <div className="brand-icons">
                        <div className="brand-icon" style={{ color: '#0f48bd', fontSize: '0.6rem' }}>NordVPN</div>
                        <div className="brand-icon" style={{ color: '#e50914', fontSize: '0.5rem' }}>ExpressVPN</div>
                        <div className="brand-icon" style={{ color: '#00d2d3', fontSize: '0.6rem' }}>Surfshark</div>
                    </div>
                </div>
            </div>

            {/* ─── Footer USPs ──────────────────────────────────────── */}
            <div className="features-grid">
                <div className="feature-item">
                    <div className="feature-icon">🛡️</div>
                    <div className="feature-text">
                        <h4>100% Safe & Secure</h4>
                        <p>Your data and payments are fully protected</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🏷️</div>
                    <div className="feature-text">
                        <h4>Best Price Guarantee</h4>
                        <p>Get top services at the best possible prices</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🚀</div>
                    <div className="feature-text">
                        <h4>Instant Delivery</h4>
                        <p>Quick activation & instant access</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🎧</div>
                    <div className="feature-text">
                        <h4>24/7 Customer Support</h4>
                        <p>We're here anytime you need us</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
