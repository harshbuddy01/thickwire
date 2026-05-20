'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ShieldCheck, Zap, Award, Headphones, MessageCircle, Globe, Mail,
  ArrowRight, PlayCircle, BookOpen, Newspaper, Cpu, Lock, Key,
  HelpCircle, RefreshCcw, FileText, UserCheck, Clock, Heart, Phone,
  ChevronDown
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [openCols, setOpenCols] = useState<string[]>([]);
  
  const toggleCol = (col: string) => {
    setOpenCols(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  const accentColor = '#b87a1d';
  const MINIO = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

  if (pathname === '/checkout') return null;

  return (
    <footer className="site-footer" style={{
      background: '#fcfcfc',
      color: '#333',
      fontFamily: "'Outfit', sans-serif",
      paddingTop: '48px',
      paddingBottom: '24px'
    }}>
      <div className="footer-mobile-crafted">
        <div className="foot-hero">
          <div className="foot-hero-grain" />
          <div className="foot-hero-lines">
            <svg viewBox="0 0 390 160" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <line x1="0" y1="40" x2="390" y2="40" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="0" y1="80" x2="390" y2="80" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="0" y1="120" x2="390" y2="120" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="60" y1="0" x2="60" y2="160" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="160" y1="0" x2="160" y2="160" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="300" y1="0" x2="300" y2="160" stroke="#3A2D1A" strokeWidth="0.5" strokeDasharray="4 8" />
            </svg>
          </div>

          <div className="foot-stamp" aria-hidden="true">
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="31" stroke="#3A2D1A" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="34" cy="34" r="25" stroke="#C47F1A" strokeWidth="0.75" />
              <text x="34" y="29" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="7" fill="#7A6A52" fontWeight="600" letterSpacing="4">EST</text>
              <text x="34" y="41" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#C47F1A" fontWeight="700">2026</text>
              <text x="34" y="51" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="6.5" fill="#5A4A35" fontWeight="500" letterSpacing="2.5">DIGITAL</text>
            </svg>
          </div>

          <Link href="/" className="foot-logo-row">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M4 6h3L11 22h14l3-10H9.5" stroke="#C47F1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12.5" cy="25.5" r="1.8" fill="#C47F1A" />
              <circle cx="21" cy="25.5" r="1.8" fill="#C47F1A" />
            </svg>
            <div className="foot-logotype">Stream<span>Kart</span></div>
          </Link>

          <p className="foot-tagline">
            Your trusted place for premium digital subscriptions — streaming, AI tools, VPN & entertainment.
          </p>

          <div className="foot-badge-row">
            <div className="foot-badge active">Verified Store</div>
            <div className="foot-badge">Secure Payments</div>
            <div className="foot-badge">24/7 Support</div>
          </div>
        </div>

        <svg className="foot-divider-svg" height="28" viewBox="0 0 390 28" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0 0 L390 0 L390 28 Q195 4 0 28 Z" fill="#FFFDF8" />
        </svg>

        <div className="foot-nl">
          <div className="foot-nl-card">
            <p className="foot-nl-eyebrow">Newsletter</p>
            <h2 className="foot-nl-title">Stay Updated!</h2>
            <p className="foot-nl-sub">Exclusive deals & offers straight to your inbox.</p>
            <div className="foot-nl-input-wrap">
              <input className="foot-nl-input" type="email" placeholder="your@email.com" />
              <button className="foot-nl-btn">Subscribe →</button>
            </div>
          </div>
        </div>

        <div className="foot-contact">
          {[
            { href: '/support', Icon: MessageCircle, label: 'Chat', active: true },
            { href: '/contact', Icon: Mail, label: 'Email' },
            { href: '/', Icon: Globe, label: 'Web' },
            { href: '/support', Icon: Phone, label: 'Call' },
          ].map(({ href, Icon, label, active }) => (
            <Link key={label} href={href} className="foot-contact-tile">
              <div className={`foot-contact-tile-icon ${active ? 'active' : ''}`}>
                <Icon size={18} />
              </div>
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <div className="foot-pay">
          <span className="foot-pay-label">We Accept</span>
          <div className="foot-pay-list">
            {[
              { type: 'gpay', label: 'Google Pay' },
              { type: 'phonepe', label: 'PhonePe' },
              { type: 'paytm', label: 'Paytm' },
              { type: 'upi', label: 'UPI' },
              { type: 'crypto', label: 'Crypto' },
            ].map(({ type, label }) => (
              <div key={type} className="foot-pay-chip" aria-label={label} title={label}>
                <PaymentLogo type={type as PaymentLogoType} />
              </div>
            ))}
          </div>
        </div>

        <div className="foot-links">
          <div className="foot-links-col">
            <h4>Categories</h4>
            <Link href="/streaming">Streaming</Link>
            <Link href="/ai">AI Tools</Link>
            <Link href="/vpn">VPN & Security</Link>
            <Link href="/activation">Activation</Link>
            <Link href="/audiobooks">Audiobooks</Link>
          </div>
          <div className="foot-links-col">
            <h4>Quick Links</h4>
            <Link href="/account">My Orders</Link>
            <Link href="/support">Support Center</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Refund Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="foot-bottom-logo">Stream<span>Kart</span></div>
          <p className="foot-bottom-copy">© 2026 <Link href="/">StreamKart</Link>. All rights reserved.</p>
          <div className="foot-bottom-heart">
            Made with <Heart size={12} fill="#C47F1A" color="#C47F1A" /> for our customers
          </div>
        </div>
      </div>

      <div className="footer-desktop-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>

        {/* ─── Top USP Bar ─── */}
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            background: '#fff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '32px',
            border: '1px solid #f0f0f0'
          }} className="footer-usp-bar">
            {[
              { icon: <ShieldCheck size={22} />, title: '100% Safe & Secure', sub: 'Secure payments & data protection' },
              { icon: <Zap size={22} />, title: 'Instant Delivery', sub: 'Delivery within 30 minutes' },
              { icon: <Award size={22} />, title: 'Premium Quality', sub: 'Genuine & reliable accounts' },
              { icon: <Headphones size={22} />, title: '24/7 Support', sub: "We're here to help you anytime" },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%',
                  background: '#fff9f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: accentColor, border: '1px solid #ffe8cc'
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#777' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

        {/* ─── Main Footer Grid ─── */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.02)',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '40px',
          border: '1px solid #f0f0f0',
          marginBottom: '32px'
        }} className="footer-main-grid">

          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="footer-brand-col">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <div style={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#b87a1d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                        <circle cx="9" cy="21" r="1.5" stroke="none" fill="#b87a1d" />
                        <circle cx="20" cy="21" r="1.5" stroke="none" fill="#b87a1d" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        <polygon points="10 9 15 12 10 15 10 9" fill="#b87a1d" stroke="none" />
                    </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: '-0.8px',
                        color: '#1a1c23',
                        display: 'block'
                    }}>
                        Stream<span style={{ color: '#b87a1d' }}>Kart</span>
                    </h2>
                </div>
            </Link>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              Your trusted place for premium digital subscriptions — streaming, AI tools, VPN and entertainment services.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[MessageCircle, Mail, Globe, Phone].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #eee',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666',
                  transition: 'all 0.2s', textDecoration: 'none'
                }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div style={{ padding: '14px', borderRadius: '14px', border: '1px solid #f5f5f5', background: '#fafafa' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#999', marginBottom: '8px' }}>We Accept</div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Image src="https://razorpay.com/favicon.png" alt="Razorpay" width={20} height={20} style={{ height: 'auto' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#333' }}>Razorpay</span>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" width={28} height={18} style={{ height: 'auto' }} />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" width={40} height={14} style={{ height: 'auto' }} />
              </div>
            </div>
          </div>

          {/* Categories */}
          <FooterCol title="Categories" isOpen={openCols.includes('cat')} onToggle={() => toggleCol('cat')}>
            <FooterLink href="/streaming" icon={<PlayCircle size={15} />}>Streaming</FooterLink>
            <FooterLink href="/audiobooks" icon={<BookOpen size={15} />}>Audiobooks</FooterLink>
            <FooterLink href="/news" icon={<Newspaper size={15} />}>News</FooterLink>
            <FooterLink href="/ai" icon={<Cpu size={15} />}>AI Tools</FooterLink>
            <FooterLink href="/vpn" icon={<Lock size={15} />}>VPN</FooterLink>
            <FooterLink href="/activation" icon={<Key size={15} />}>Activation</FooterLink>
          </FooterCol>

          {/* Support & Legal */}
          <FooterCol title="Quick Links" isOpen={openCols.includes('quick')} onToggle={() => toggleCol('quick')}>
            <FooterLink href="/support" icon={<Headphones size={15} />}>Support</FooterLink>
            <FooterLink href="/contact" icon={<MessageCircle size={15} />}>Contact Us</FooterLink>
            <FooterLink href="/faq" icon={<HelpCircle size={15} />}>FAQ</FooterLink>
            <FooterLink href="/refund" icon={<RefreshCcw size={15} />}>Refund Policy</FooterLink>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f5f5f5' }}>
              <FooterLink href="/terms" icon={<FileText size={15} />}>Terms & Conditions</FooterLink>
              <FooterLink href="/privacy" icon={<ShieldCheck size={15} />}>Privacy Policy</FooterLink>
            </div>
          </FooterCol>

          {/* Top Picks */}
          <FooterCol title="Top Picks" isOpen={openCols.includes('top')} onToggle={() => toggleCol('top')}>
            <FooterLink href="/services/netflix" icon={<Image src={`${MINIO}/logos/netflix.svg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Netflix</FooterLink>
            <FooterLink href="/services/spotify" icon={<Image src={`${MINIO}/logos/spotify.png`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Spotify</FooterLink>
            <FooterLink href="/services/disney" icon={<Image src={`${MINIO}/logos/disney.jpg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Disney+</FooterLink>
            <FooterLink href="/services/youtube" icon={<Image src={`${MINIO}/logos/youtube.png`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>YouTube Premium</FooterLink>
            <FooterLink href="/services/prime" icon={<Image src={`${MINIO}/logos/prime.svg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Amazon Prime</FooterLink>
          </FooterCol>

        </div>
        
        {/* ─── Horizontal Newsletter ─── */}
        <div style={{
          background: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: '24px',
          padding: '32px 48px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          boxShadow: '0 4px 25px rgba(0,0,0,0.02)'
        }} className="footer-newsletter-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%', background: '#fff9f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, flexShrink: 0
            }}>
              <Mail size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0' }}>Stay Updated!</h4>
              <p style={{ fontSize: '0.88rem', color: '#777', margin: 0 }}>Get exclusive offers & updates straight to your inbox.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flex: 1.2, maxWidth: '600px' }} className="newsletter-form-wrap">
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1, padding: '14px 20px', borderRadius: '14px', border: '1px solid #eee',
                outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit', background: '#fafafa'
              }}
            />
            <button style={{
              background: accentColor, color: '#fff', border: 'none', borderRadius: '14px',
              padding: '0 32px', fontWeight: 700, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.2s'
            }}>
              Subscribe <ArrowRight size={18} />
            </button>
          </div>
        </div>


        {/* ─── Copyright ─── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px', background: '#f9f9f9', borderRadius: '14px',
          fontSize: '0.82rem', color: '#777'
        }} className="footer-copyright">
          <div>© 2026 <span style={{ color: accentColor, fontWeight: 700 }}>StreamKart</span>. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Made with <Heart size={13} fill="#e11d48" color="#e11d48" /> for our customers
          </div>
        </div>
      </div>

      {/* ─── Mobile Footer CSS ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-mobile-crafted {
          display: none;
        }
        @media (min-width: 769px) {
          .footer-desktop-content { display: block !important; }
          .footer-mobile-crafted { display: none !important; }
          .footer-col-header { cursor: default !important; }
          .footer-col-chevron { display: none !important; }
          .footer-col-links { max-height: none !important; opacity: 1 !important; visibility: visible !important; }
        }
        @media (max-width: 768px) {
          .site-footer {
            background: #FFFDF8 !important;
            padding: 0 0 90px !important;
            margin-top: 32px !important;
            overflow: hidden !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .footer-desktop-content {
            display: none !important;
          }
          .footer-mobile-crafted {
            display: block !important;
            background: #FFFDF8;
            color: #1C1208;
            overflow: hidden;
            width: 100vw;
            max-width: 100vw;
          }
          .footer-mobile-crafted a {
            text-decoration: none;
          }
          .foot-hero {
            background: #1C1208;
            padding: 32px 24px 28px;
            position: relative;
            overflow: hidden;
          }
          .foot-hero-grain {
            position: absolute;
            inset: 0;
            background-image:
              radial-gradient(circle at 20% 50%, rgba(196,127,26,0.12) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(196,127,26,0.08) 0%, transparent 50%);
          }
          .foot-hero-lines {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          .foot-hero-lines svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .foot-logo-row {
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
            z-index: 1;
            margin-bottom: 10px;
            color: inherit;
          }
          .foot-logotype {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 26px;
            font-weight: 900;
            color: #F5EDD8;
            letter-spacing: -0.5px;
            line-height: 1;
          }
          .foot-logotype span {
            color: #C47F1A;
          }
          .foot-tagline {
            font-size: 12px;
            color: #7A6A52;
            line-height: 1.65;
            position: relative;
            z-index: 1;
            font-weight: 400;
            letter-spacing: 0.01em;
            max-width: 230px;
            margin: 0;
          }
          .foot-stamp {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 1;
          }
          .foot-badge-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 20px;
            position: relative;
            z-index: 1;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .foot-badge-row::-webkit-scrollbar {
            display: none;
          }
          .foot-badge {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            border: 1px solid #3A2D1A;
            border-radius: 100px;
            padding: 5px 12px;
            color: #7A6A52;
            white-space: nowrap;
          }
          .foot-badge.active {
            background: #C47F1A;
            color: #1C1208;
            border-color: #C47F1A;
          }
          .foot-divider-svg {
            width: 100%;
            display: block;
            background: #1C1208;
          }
          .foot-nl {
            background: #FFFDF8;
            padding: 24px 20px 0;
          }
          .foot-nl-card {
            background: #FFF8EC;
            border: 1.5px solid #EDD9A3;
            border-radius: 20px;
            padding: 20px;
            position: relative;
            overflow: hidden;
          }
          .foot-nl-card::before {
            content: '';
            position: absolute;
            top: -24px;
            right: -24px;
            width: 96px;
            height: 96px;
            border-radius: 50%;
            background: #F5DFA0;
            opacity: 0.4;
          }
          .foot-nl-eyebrow {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #C47F1A;
            margin: 0 0 6px;
            position: relative;
            z-index: 1;
          }
          .foot-nl-title {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 20px;
            font-weight: 700;
            color: #1C1208;
            line-height: 1.2;
            margin: 0 0 4px;
            position: relative;
            z-index: 1;
          }
          .foot-nl-sub {
            font-size: 12px;
            color: #A08060;
            margin: 0 0 16px;
            line-height: 1.5;
            position: relative;
            z-index: 1;
          }
          .foot-nl-input-wrap {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            position: relative;
            z-index: 1;
            width: 100%;
          }
          .foot-nl-input {
            width: 100%;
            min-width: 0;
            background: #fff;
            border: 1.5px solid #E8D9BA;
            border-radius: 12px;
            padding: 11px 14px;
            font-size: 13px;
            color: #1C1208;
            font-family: inherit;
            outline: none;
          }
          .foot-nl-input::placeholder {
            color: #C8B898;
          }
          .foot-nl-input:focus {
            border-color: #C47F1A;
          }
          .foot-nl-btn {
            background: #1C1208;
            border: none;
            border-radius: 12px;
            padding: 11px 14px;
            font-size: 13px;
            font-weight: 700;
            color: #F5EDD8;
            cursor: pointer;
            font-family: inherit;
            white-space: nowrap;
            min-width: 0;
            width: 100%;
          }
          .foot-contact {
            padding: 20px 20px 0;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 8px;
          }
          .foot-contact-tile {
            background: #fff;
            border: 1.5px solid #EDE4D5;
            border-radius: 14px;
            padding: 12px 6px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }
          .foot-contact-tile-icon {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F2F0EC;
            color: #8A7A65;
          }
          .foot-contact-tile-icon.active {
            background: #FFF3D6;
            color: #C47F1A;
          }
          .foot-contact-tile span {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #A08060;
          }
          .foot-pay {
            margin: 20px 20px 0;
            padding: 16px;
            background: #fff;
            border: 1.5px solid #EDE4D5;
            border-radius: 16px;
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            align-items: center;
            gap: 12px;
          }
          .foot-pay-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #C8B898;
            white-space: nowrap;
          }
          .foot-pay-list {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
          }
          .foot-pay-chip {
            background: #FAF5EC;
            border: 1.5px solid #EDD9A3;
            border-radius: 10px;
            width: 44px;
            height: 34px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .foot-pay-chip svg {
            display: block;
          }
          .foot-links {
            margin: 20px 20px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 20px;
          }
          .foot-links-col h4 {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 14px;
            font-weight: 700;
            color: #1C1208;
            margin: 0 0 14px;
            padding-bottom: 8px;
            border-bottom: 1.5px solid #EDE4D5;
          }
          .foot-links-col a {
            display: flex;
            align-items: center;
            gap: 7px;
            font-size: 13px;
            color: #A08060;
            margin-bottom: 10px;
            font-weight: 500;
            line-height: 1.25;
          }
          .foot-links-col a::before {
            content: '';
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #C47F1A;
            flex-shrink: 0;
          }
          .foot-bottom {
            margin: 24px 0 0;
            background: #1C1208;
            padding: 20px 20px 16px;
            text-align: center;
          }
          .foot-bottom-logo {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 18px;
            font-weight: 700;
            color: #F5EDD8;
            letter-spacing: -0.3px;
            margin-bottom: 8px;
          }
          .foot-bottom-logo span {
            color: #C47F1A;
          }
          .foot-bottom-copy {
            font-size: 11px;
            color: #5A4A35;
            line-height: 1.7;
            margin: 0;
          }
          .foot-bottom-copy a {
            color: #C47F1A;
            font-weight: 700;
          }
          .foot-bottom-heart {
            font-size: 11px;
            color: #3A2D1A;
            margin-top: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }
          .footer-usp-bar {
            grid-template-columns: 1fr 1fr !important;
            padding: 16px !important;
            gap: 12px !important;
            border-radius: 16px !important;
            margin-bottom: 20px !important;
          }
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            border-radius: 16px !important;
            gap: 32px !important;
            margin-bottom: 20px !important;
          }
          .footer-brand-col {
            margin-bottom: 12px;
          }
          .footer-col-mobile-wrap {
            border-bottom: 1px solid #f0f0f0;
          }
          .footer-col-mobile-wrap:last-child {
            border-bottom: none;
          }
          .footer-col-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 14px 0 !important;
            margin-bottom: 0 !important;
            cursor: pointer !important;
            user-select: none;
          }
          .footer-col-links {
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
          }
          .footer-col-mobile-wrap.is-open .footer-col-links {
            max-height: 500px;
            opacity: 1;
            visibility: visible;
            padding-bottom: 20px;
          }
          .footer-newsletter-row {
            flex-direction: column !important;
            padding: 24px !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .footer-newsletter-row > div:first-child {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .newsletter-form-wrap {
            width: 100% !important;
            flex-direction: column !important;
          }
          .newsletter-form-wrap button {
            padding: 14px !important;
          }
          .footer-copyright {
            flex-direction: column !important;
            gap: 6px !important;
            text-align: center !important;
            padding: 14px !important;
          }
        }
        @media (max-width: 430px) {
          .foot-nl-input-wrap {
            grid-template-columns: 1fr;
          }
          .foot-nl-btn {
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .footer-usp-bar {
            grid-template-columns: 1fr !important;
          }
          .footer-features-bar {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
    </footer>
  );
}

type PaymentLogoType = 'gpay' | 'phonepe' | 'paytm' | 'upi' | 'crypto';

function PaymentLogo({ type }: { type: PaymentLogoType }) {
  if (type === 'gpay') {
    return (
      <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true">
        <path d="M13.7 10.7c0-.8-.1-1.4-.2-2H7.4v3.8h3.5c-.1.9-.9 2.1-2.4 2.9v2.5h3.1c1.8-1.7 2.1-4.1 2.1-7.2z" fill="#4285F4" />
        <path d="M7.4 18.1c2.2 0 4-.7 5.3-2l-3.1-2.4c-.6.4-1.3.7-2.2.7-1.7 0-3.1-1.1-3.6-2.7H.6v2.5c1.3 2.3 3.8 3.9 6.8 3.9z" fill="#34A853" />
        <path d="M3.8 11.7c-.1-.4-.2-.8-.2-1.3s.1-.9.2-1.3V6.6H.6C.2 7.8 0 9 0 10.4s.2 2.6.6 3.8l3.2-2.5z" fill="#FBBC04" />
        <path d="M7.4 6.4c1.2 0 2 .5 2.5 1l2.8-2.7C11.4 3.4 9.6 2.7 7.4 2.7c-3 0-5.5 1.6-6.8 3.9l3.2 2.5c.5-1.6 1.9-2.7 3.6-2.7z" fill="#EA4335" />
        <path d="M18 7h7.4c2.5 0 4.6 1.8 4.6 4.1s-2.1 4.1-4.6 4.1H18V7z" fill="#fff" stroke="#dbe6f6" strokeWidth="1.2" />
        <path d="M21 10h4.2M21 12.3h3.1" stroke="#4285F4" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'phonepe') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="13" fill="#5F259F" />
        <path d="M9 7h9.2c2.3 0 4 1.5 4 3.7s-1.7 3.8-4 3.8H13v6.2H9V7zm4 3.5v2.8h4.4c.8 0 1.3-.6 1.3-1.4 0-.9-.5-1.4-1.3-1.4H13z" fill="#fff" />
        <path d="M6.3 9.2h4.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'paytm') {
    return (
      <svg width="36" height="16" viewBox="0 0 72 32" aria-hidden="true">
        <text x="0" y="23" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#003D79">pay</text>
        <text x="38" y="23" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="#00BAF2">tm</text>
      </svg>
    );
  }

  if (type === 'upi') {
    return (
      <svg width="32" height="24" viewBox="0 0 32 24" aria-hidden="true">
        <path d="M10 4l9 8-9 8V4z" fill="#097939" />
        <path d="M17 4l9 8-9 8V4z" fill="#F36F21" />
      </svg>
    );
  }

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="#f5a623" />
      <circle cx="14" cy="14" r="10" fill="#fff4d9" opacity="0.45" />
      <path d="M11 7v14M15 7v14M10 9h5.6c1.7 0 3 1 3 2.5 0 1.1-.7 2-1.7 2.3 1.3.3 2.2 1.3 2.2 2.6 0 1.6-1.3 2.7-3.2 2.7H10" stroke="#7a4b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function FooterCol({ title, children, isOpen, onToggle }: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`footer-col-mobile-wrap ${isOpen ? 'is-open' : ''}`}>
      <h4
        className="footer-col-header"
        style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '20px', position: 'relative' }}
        onClick={onToggle}
      >
        {title}
        <span
          className="footer-col-chevron"
          style={{
            transition: 'transform 0.3s',
            display: 'inline-flex',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <ChevronDown size={16} color="#999" />
        </span>
      </h4>
      <div
        className="footer-col-links"
        style={{
          display: 'flex', flexDirection: 'column', gap: '12px'
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      color: '#666', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s'
    }}>
      {icon}
      {children}
    </Link>
  );
}
