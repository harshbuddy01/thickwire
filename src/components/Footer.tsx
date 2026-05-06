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
  const [openCol, setOpenCol] = useState<string | null>(null);

  if (pathname === '/checkout') return null;

  const accentColor = '#b87a1d';
  const MINIO = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

  const toggleCol = (col: string) => {
    setOpenCol(prev => prev === col ? null : col);
  };

  return (
    <footer style={{
      background: '#fcfcfc',
      color: '#333',
      fontFamily: "'Outfit', sans-serif",
      paddingTop: '48px',
      paddingBottom: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>

        {/* ─── USP Bar (Homepage only) ─── */}
        {pathname === '/' && (
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
        )}

        {/* ─── Main Footer Grid ─── */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.02)',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr',
          gap: '40px',
          border: '1px solid #f0f0f0',
          marginBottom: '32px'
        }} className="footer-main-grid">

          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <div style={{ position: 'relative', height: '48px', width: '260px', mixBlendMode: 'darken' }}>
                  <Image 
                      src="/streamkart-logo.png" 
                      alt="StreamKart Logo" 
                      fill 
                      style={{ objectFit: 'cover', objectPosition: 'center' }} 
                  />
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
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={36} height={12} style={{ height: 'auto' }} />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" width={26} height={16} style={{ height: 'auto' }} />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" width={36} height={12} style={{ height: 'auto' }} />
              </div>
            </div>
          </div>

          {/* Categories */}
          <FooterCol title="Categories" isOpen={openCol === 'cat'} onToggle={() => toggleCol('cat')}>
            <FooterLink href="/streaming" icon={<PlayCircle size={15} />}>Streaming</FooterLink>
            <FooterLink href="/audiobooks" icon={<BookOpen size={15} />}>Audiobooks</FooterLink>
            <FooterLink href="/news" icon={<Newspaper size={15} />}>News</FooterLink>
            <FooterLink href="/ai" icon={<Cpu size={15} />}>AI Tools</FooterLink>
            <FooterLink href="/vpn" icon={<Lock size={15} />}>VPN</FooterLink>
            <FooterLink href="/activation" icon={<Key size={15} />}>Activation</FooterLink>
          </FooterCol>

          {/* Support */}
          <FooterCol title="Support" isOpen={openCol === 'sup'} onToggle={() => toggleCol('sup')}>
            <FooterLink href="/contact" icon={<Phone size={15} />}>Contact Us</FooterLink>
            <FooterLink href="/faq" icon={<HelpCircle size={15} />}>FAQ</FooterLink>
            <FooterLink href="/refund" icon={<RefreshCcw size={15} />}>Refund Policy</FooterLink>
            <FooterLink href="/terms" icon={<FileText size={15} />}>Terms & Conditions</FooterLink>
            <FooterLink href="/privacy" icon={<ShieldCheck size={15} />}>Privacy Policy</FooterLink>
          </FooterCol>

          {/* Top Picks */}
          <FooterCol title="Top Picks" isOpen={openCol === 'top'} onToggle={() => toggleCol('top')}>
            <FooterLink href="/services/netflix" icon={<Image src={`${MINIO}/logos/netflix.svg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Netflix</FooterLink>
            <FooterLink href="/services/spotify" icon={<Image src={`${MINIO}/logos/spotify.png`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Spotify</FooterLink>
            <FooterLink href="/services/disney" icon={<Image src={`${MINIO}/logos/disney.jpg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Disney+</FooterLink>
            <FooterLink href="/services/youtube" icon={<Image src={`${MINIO}/logos/youtube.png`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>YouTube Premium</FooterLink>
            <FooterLink href="/services/prime" icon={<Image src={`${MINIO}/logos/prime.svg`} alt="" width={16} height={16} style={{ objectFit: 'contain' }} />}>Amazon Prime</FooterLink>
          </FooterCol>

          {/* Newsletter */}
          <div style={{
            background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '50%', background: '#fff9f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, marginBottom: '16px'
            }}>
              <Mail size={22} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Stay Updated!</h4>
            <p style={{ fontSize: '0.82rem', color: '#777', marginBottom: '16px', lineHeight: 1.5 }}>
              Get exclusive offers & updates straight to your inbox.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: '100%', padding: '11px 13px', borderRadius: '10px', border: '1px solid #eee',
                marginBottom: '12px', outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit'
              }}
            />
            <button style={{
              width: '100%', background: accentColor, color: '#fff', border: 'none', borderRadius: '10px',
              padding: '11px', fontWeight: 700, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
            }}>
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ─── Bottom Features Bar ─── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px',
          padding: '24px 0', borderTop: '1px solid #f0f0f0', marginBottom: '16px'
        }} className="footer-features-bar">
          {[
            { icon: <Lock size={18} color="#666" />, title: 'Secure Payments', sub: 'Multiple payment options' },
            { icon: <UserCheck size={18} color="#666" />, title: 'Buyer Protection', sub: '100% money-back guarantee' },
            { icon: <Clock size={18} color="#666" />, title: 'Fast & Reliable', sub: 'Quick delivery you can trust' },
            { icon: <Headphones size={18} color="#666" />, title: '24/7 Customer Care', sub: "We're always here to help" },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {item.icon}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#999' }}>{item.sub}</div>
              </div>
            </div>
          ))}
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
      <style>{`
        @media (max-width: 768px) {
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
            gap: 0 !important;
            margin-bottom: 20px !important;
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
            cursor: pointer !important;
            user-select: none;
          }
          .footer-col-links {
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .footer-features-bar {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
            padding: 16px 0 !important;
          }
          .footer-copyright {
            flex-direction: column !important;
            gap: 6px !important;
            text-align: center !important;
            padding: 14px !important;
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
      `}</style>
    </footer>
  );
}

/* ── Sub-components ── */

function FooterCol({ title, children, isOpen, onToggle }: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="footer-col-mobile-wrap">
      {/* Desktop: always visible title */}
      <h4
        className="footer-col-header"
        style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '20px', position: 'relative', cursor: 'default' }}
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
        <style>{`
          @media (min-width: 769px) {
            .footer-col-header { cursor: default !important; }
            .footer-col-chevron { display: none !important; }
          }
        `}</style>
      </h4>
      <div
        className="footer-col-links"
        style={{
          maxHeight: isOpen ? '300px' : undefined,
          display: 'flex', flexDirection: 'column', gap: '12px'
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .footer-col-links {
              max-height: ${isOpen ? '300px' : '0'} !important;
              padding-bottom: ${isOpen ? '16px' : '0'} !important;
            }
          }
        `}</style>
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
