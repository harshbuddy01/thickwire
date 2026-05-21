'use client';

import Link from 'next/link';
import { Headphones, LockKeyhole, ShieldCheck, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

type AuthExperienceProps = {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  compact?: boolean;
};

export default function AuthExperience({ title, subtitle, children, compact = false }: AuthExperienceProps) {
  return (
    <div className={`auth-container auth-luxe-page ${compact ? 'auth-luxe-page--compact' : ''}`}>
      <div className="fluid-bg" aria-hidden="true">
        <div className="auth-bg-glow auth-bg-glow-one" />
        <div className="auth-bg-glow auth-bg-glow-two" />
        <div className="auth-bg-lines auth-bg-lines-top" />
        <div className="auth-bg-lines auth-bg-lines-bottom" />
        <div className="auth-bg-dots auth-bg-dots-left" />
        <div className="auth-bg-dots auth-bg-dots-right" />
      </div>

      <section className="auth-luxe-shell">
        <Link href="/" className="auth-brand-lockup">
          <span className="auth-brand-cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1.5" stroke="none" fill="currentColor" />
              <circle cx="20" cy="21" r="1.5" stroke="none" fill="currentColor" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              <polygon points="10 9 15 12 10 15 10 9" fill="#d39a2a" stroke="none" />
            </svg>
          </span>
          <span className="auth-brand-word">Stream<span>Kart</span></span>
        </Link>

        <div className="auth-top-trust" aria-label="StreamKart benefits">
          <span><ShieldCheck size={19} /> Secure login</span>
          <i />
          <span><Zap size={20} fill="currentColor" /> Instant delivery</span>
          <i />
          <span><Headphones size={20} /> 24/7 Support</span>
        </div>

        <div className="glass-card auth-luxe-card">
          <div className="auth-lock-orb">
            <div className="auth-lock-inner">
              <ShieldCheck size={48} />
              <LockKeyhole size={20} />
            </div>
          </div>

          <div className="auth-header">
            <h1 className="auth-title">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
          </div>

          <div className="auth-card-trust">
            <div>
              <span><ShieldCheck size={26} /></span>
              <strong>100% Secure</strong>
              <small>Your data is safe</small>
            </div>
            <div>
              <span><Zap size={26} fill="currentColor" /></span>
              <strong>Instant Access</strong>
              <small>Get it right away</small>
            </div>
            <div>
              <span><Headphones size={26} /></span>
              <strong>24/7 Support</strong>
              <small>We&apos;re here for you</small>
            </div>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}
