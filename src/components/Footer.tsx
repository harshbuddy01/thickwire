'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Headphones, 
  MessageCircle, 
  Globe, 
  Mail, 
  ArrowRight,
  PlayCircle,
  BookOpen,
  Newspaper,
  Cpu,
  Lock,
  Key,
  HelpCircle,
  RefreshCcw,
  FileText,
  UserCheck,
  Clock,
  Heart,
  ShoppingBag,
  Music,
  Tv,
  ExternalLink,
  Phone
} from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();
    
    if (pathname === '/checkout') return null;

    const accentColor = '#b87a1d'; // The gold/bronze color from the image
    const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

    return (
        <footer style={{ 
            background: '#fcfcfc', 
            color: '#333', 
            fontFamily: "'Outfit', sans-serif",
            paddingTop: '60px',
            paddingBottom: '20px'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                
                {/* ─── Top USP Bar (Only on Homepage) ────────────────────────── */}
                {pathname === '/' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '20px',
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '30px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        marginBottom: '40px',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, border: '1px solid #ffe8cc' }}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Safe & Secure</div>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>Secure payments & data protection</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, border: '1px solid #ffe8cc' }}>
                                <Zap size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Instant Delivery</div>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>Delivery within 30 minutes</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, border: '1px solid #ffe8cc' }}>
                                <Award size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Premium Quality</div>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>Genuine & reliable accounts</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, border: '1px solid #ffe8cc' }}>
                                <Headphones size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>24/7 Support</div>
                                <div style={{ fontSize: '0.8rem', color: '#777' }}>We&apos;re here to help you anytime</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── Main Footer Content ─────────────────────────────── */}
                <div style={{
                    background: '#fff',
                    borderRadius: '32px',
                    padding: '60px',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.02)',
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr',
                    gap: '40px',
                    border: '1px solid #f0f0f0',
                    marginBottom: '40px'
                }}>
                    
                    {/* Col 1: Brand */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                            <div style={{ width: '40px', height: '40px', position: 'relative' }}>
                                {/* Simplified Shopping Cart Logo from image */}
                                <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    <polygon points="10 9 15 12 10 15 10 9" fill={accentColor} stroke="none" />
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1c23', margin: 0, letterSpacing: '-0.5px' }}>
                                Stream<span style={{ color: accentColor }}>Kart</span>
                            </h2>
                        </Link>
                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                            Your trusted place for premium digital subscriptions — streaming, audiobooks, news, AI tools, VPN and entertainment services.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[MessageCircle, Mail, Globe, Phone].map((Icon, i) => (
                                <a key={i} href="#" style={{ 
                                    width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666',
                                    transition: 'all 0.2s ease', textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = '#666'; }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        <div style={{
                            marginTop: '10px', padding: '15px', borderRadius: '16px', border: '1px solid #f5f5f5', background: '#fafafa'
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginBottom: '10px' }}>We Accept</div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={38} height={12} style={{ height: 'auto' }} />
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" width={28} height={18} style={{ height: 'auto' }} />
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/American_Express_logo_%282018%29.svg" alt="Amex" width={14} height={14} style={{ height: 'auto' }} />
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" width={38} height={12} style={{ height: 'auto' }} />
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Categories */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '24px', position: 'relative' }}>
                            Categories
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', background: accentColor }}></div>
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link href="/streaming" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <PlayCircle size={16} /> Streaming
                            </Link>
                            <Link href="/audiobooks" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <BookOpen size={16} /> Audiobooks
                            </Link>
                            <Link href="/news" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Newspaper size={16} /> News
                            </Link>
                            <Link href="/ai" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Cpu size={16} /> AI Tools
                            </Link>
                            <Link href="/vpn" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Lock size={16} /> VPN
                            </Link>
                            <Link href="/activation" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Key size={16} /> Activation
                            </Link>
                        </div>
                    </div>

                    {/* Col 3: Support */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '24px', position: 'relative' }}>
                            Support
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', background: accentColor }}></div>
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Phone size={16} /> Contact Us
                            </Link>
                            <Link href="/faq" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <HelpCircle size={16} /> FAQ
                            </Link>
                            <Link href="/refund" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <RefreshCcw size={16} /> Refund Policy
                            </Link>
                            <Link href="/terms" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <FileText size={16} /> Terms & Conditions
                            </Link>
                            <Link href="/privacy" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <ShieldCheck size={16} /> Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Col 4: Top Picks */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '24px', position: 'relative' }}>
                            Top Picks
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, width: '24px', height: '2px', background: accentColor }}></div>
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link href="/services/netflix" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Image src={`${MINIO}/logos/netflix.svg`} alt="Netflix" width={20} height={20} style={{ objectFit: 'contain' }} /> Netflix
                            </Link>
                            <Link href="/services/spotify" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Image src={`${MINIO}/logos/spotify.png`} alt="Spotify" width={20} height={20} style={{ objectFit: 'contain' }} /> Spotify
                            </Link>
                            <Link href="/services/disney" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Image src={`${MINIO}/logos/disney.jpg`} alt="Disney+" width={20} height={20} style={{ objectFit: 'contain' }} /> Disney+
                            </Link>
                            <Link href="/services/youtube" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Image src={`${MINIO}/logos/youtube.png`} alt="YouTube Premium" width={20} height={20} style={{ objectFit: 'contain' }} /> YouTube Premium
                            </Link>
                            <Link href="/services/prime" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <Image src={`${MINIO}/logos/prime.svg`} alt="Amazon Prime" width={20} height={20} style={{ objectFit: 'contain' }} /> Amazon Prime
                            </Link>
                        </div>
                    </div>

                    {/* Col 5: Newsletter Card */}
                    <div style={{
                        background: '#fcfcfc',
                        border: '1px solid #f0f0f0',
                        borderRadius: '24px',
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, marginBottom: '20px' }}>
                            <Mail size={24} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 10px 0' }}>Stay Updated!</h4>
                        <p style={{ fontSize: '0.85rem', color: '#777', marginBottom: '20px' }}>
                            Subscribe to get exclusive offers & updates straight to your inbox.
                        </p>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            style={{ 
                                width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '15px', outline: 'none', fontSize: '0.9rem'
                            }}
                        />
                        <button style={{
                            width: '100%', background: accentColor, color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer'
                        }}>
                            Subscribe <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* ─── Bottom Features Bar ─────────────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                    padding: '30px 0',
                    borderTop: '1px solid #f0f0f0',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Lock size={20} color="#666" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Secure Payments</div>
                            <div style={{ fontSize: '0.75rem', color: '#999' }}>Multiple payment options</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <UserCheck size={20} color="#666" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Buyer Protection</div>
                            <div style={{ fontSize: '0.75rem', color: '#999' }}>100% money-back guarantee</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Clock size={20} color="#666" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Fast & Reliable</div>
                            <div style={{ fontSize: '0.75rem', color: '#999' }}>Quick delivery you can trust</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Headphones size={20} color="#666" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>24/7 Customer Care</div>
                            <div style={{ fontSize: '0.75rem', color: '#999' }}>We&apos;re always here to help</div>
                        </div>
                    </div>
                </div>

                {/* ─── Final Copyright Bar ─────────────────────────────── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 30px',
                    background: '#f9f9f9',
                    borderRadius: '16px',
                    fontSize: '0.85rem',
                    color: '#777'
                }}>
                    <div>© 2026 <span style={{ color: accentColor, fontWeight: 700 }}>StreamKart</span>. All rights reserved.</div>
                    <div style={{ width: '24px', height: '24px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Made with <Heart size={14} fill="#e11d48" color="#e11d48" /> for our customers
                    </div>
                </div>
            </div>
        </footer>
    );
}
