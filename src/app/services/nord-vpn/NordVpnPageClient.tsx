'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, ShieldCheck, Zap, Lock, Globe, Headphones, Server, RefreshCcw, Smartphone } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';
import styles from '../service-page.module.css';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export default function NordVpnPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

    const colorSchemes = [
        { card: styles['card-primary'], badge: styles['badge-primary'], text: styles['text-primary'], btn: styles['bg-primary'] },
        { card: styles['card-accent'], badge: styles['badge-accent'], text: styles['text-accent'], btn: styles['bg-accent'] },
        { card: styles['card-success'], badge: styles['badge-success'], text: styles['text-success'], btn: styles['bg-success'] },
        { card: styles['card-warm'], badge: styles['badge-warm'], text: styles['text-warm'], btn: styles['bg-warm'] },
    ];

    const formatDuration = (days: number) => {
        if (days >= 365) {
            const years = Math.floor(days / 365);
            return `${days} Days (${years} Year${years > 1 ? 's' : ''})`;
        }
        if (days >= 30) {
            const months = Math.floor(days / 30);
            return `${days} Days (${months} Month${months > 1 ? 's' : ''})`;
        }
        return `${days} Days`;
    };

    return (
        <div className={styles['service-page']}>
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container">
                <nav style={{ padding: '20px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#2563eb' }}>NordVPN</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Banner ────────────────────────────────────── */}
                <div className={styles['hero-image-container']}>
                    <img src={`${MINIO_URL}/slider/9F224C95-172A-4D32-A4FD-CB37A31E7AB3.PNG`} alt="NordVPN Banner" className={styles['hero-banner-image']} />
                </div>

                {/* ─── Plan Selection ────────────────────────────────── */}
                <div className={styles['plans-section']}>
                    <h2 className={styles['section-title']}>Choose Your Plan</h2>
                    <p className={styles['section-subtitle']}>All plans include premium VPN protection. Save more with longer plans!</p>

                    <div className={styles['plans-grid']}>
                        {service.plans.map((plan, index) => {
                            const colors = colorSchemes[index % colorSchemes.length];
                            const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;

                            return (
                                <div key={plan.id} className={`${styles['plan-card']} ${colors.card} ${isBestValue ? styles['best-value'] : ''}`}>
                                    {isBestValue && <div className={styles['best-value-ribbon']}>BEST VALUE</div>}
                                    <div className={`${styles['plan-badge']} ${colors.badge}`}>PREMIUM PLAN</div>
                                    <div className={styles['plan-content']}>
                                        <h3 className={styles['plan-name']}>{plan.name}</h3>
                                        <div className={styles['plan-price']}>
                                            <span className={styles.currency}>{plan.currency === 'USD' ? '$' : '₹'}</span>
                                            <span className={styles.amount}>{parseFloat(plan.price).toLocaleString()}</span>
                                            {plan.originalPrice && (
                                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '16px', marginLeft: '8px', fontWeight: 500 }}>
                                                    {plan.currency === 'USD' ? '$' : '₹'}{parseFloat(plan.originalPrice).toLocaleString()}
                                                </span>
                                            )}
                                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                                {formatDuration(plan.durationDays)}
                                            </div>
                                        </div>
                                        <ul className={styles['plan-features']}>
                                            <li><Check size={16} className={colors.text} /> Military-Grade Encryption</li>
                                            <li><Check size={16} className={colors.text} /> 6,000+ Servers in 111 Countries</li>
                                            <li><Check size={16} className={colors.text} /> Works on All Devices</li>
                                            <li><Check size={16} className={colors.text} /> Strict No-Logs Policy</li>
                                            <li><Check size={16} className={colors.text} /> 24/7 Priority Support</li>
                                        </ul>
                                        <Link
                                            href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                            className={`${styles['plan-btn']} ${colors.btn}`}
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                                        >
                                            <ShoppingCart size={18} /> Buy Now →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Why Choose & FAQ ─────────────────────────────── */}
                <div className={styles['info-split']}>
                    <div>
                        <h3 className={styles['section-title']}>Why Choose NordVPN?</h3>
                        <div className={styles['why-list']}>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Lock size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Military-Grade Encryption</strong>
                                    <p>AES-256-bit encryption keeps your data safe from hackers and surveillance.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Globe size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>6,000+ Global Servers</strong>
                                    <p>Connect to servers in 111 countries for unrestricted, fast browsing.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Smartphone size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Works on All Devices</strong>
                                    <p>Protect Windows, Mac, Android, iOS, Linux, and routers simultaneously.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><ShieldCheck size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Strict No-Logs Policy</strong>
                                    <p>Your online activity is never tracked, stored, or shared. Period.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={styles['section-title']}>Frequently Asked Questions</h3>
                        <div className={styles['faq-accordion']}>
                            {[
                                { q: "How will I receive my NordVPN access?", a: "After successful purchase, your login credentials will be delivered instantly to your email and visible in your StreamKart dashboard." },
                                { q: "How many devices can I use?", a: "Depending on your plan, you can protect up to 6–10 devices simultaneously with a single account." },
                                { q: "Will this work in my country?", a: "Absolutely! NordVPN works in 111+ countries with 6,000+ servers. It bypasses geo-restrictions and censorship globally." },
                                { q: "Is there a warranty?", a: "We provide a 30-day replacement warranty. If you face any issues, we replace the account instantly." },
                                { q: "What if I need help?", a: "Our dedicated support team is available 24/7. Reach out via the Support tab or live chat for immediate assistance." }
                            ].map((item, idx) => (
                                <div key={idx} className={`${styles['faq-item']} ${openFaq === idx ? styles.open : ''}`} onClick={() => toggleFaq(idx)}>
                                    <div className={styles['faq-question']}>
                                        <span>{item.q}</span>
                                        <ChevronDown size={16} className={styles['faq-arrow']} />
                                    </div>
                                    <div className={styles['faq-answer']}>
                                        <div className={styles['faq-answer-inner']}>{item.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Trust Strip ─────────────────────────────────── */}
                <div className={styles['trust-strip']}>
                    <div className={styles['trust-item']}>
                        <ShieldCheck size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <RefreshCcw size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>30-Day Warranty</strong>
                            <span>Full replacement guarantee for peace of mind.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Zap size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>Instant Delivery</strong>
                            <span>Quick activation & instant access.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Headphones size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>24/7 Support</strong>
                            <span>We&apos;re here anytime you need us.</span>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom CTA ───────────────────────────────────── */}
                <div className={styles['bottom-cta']}>
                    <div className={styles['cta-content']}>
                        <div className={styles['cta-icon-box']}>
                            <Server size={24} color="#2563eb" />
                        </div>
                        <div className={styles['cta-text']}>
                            <h3>Ready to browse securely?</h3>
                            <p>Choose a plan and protect your online privacy today.</p>
                        </div>
                    </div>
                    <button className={styles['cta-button']} onClick={() => document.querySelector(`.${styles['plans-section']}`)?.scrollIntoView({ behavior: 'smooth' })}>
                        Choose Your Plan <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
