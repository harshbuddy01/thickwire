'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, ShieldCheck, Zap, Globe, Headphones, Search, UserCheck, Briefcase } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';
import styles from '../service-page.module.css';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function LinkedinPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

    const colorSchemes = [
        { card: styles['card-primary'], badge: styles['badge-primary'], text: styles['text-primary'], btn: styles['bg-primary'] },
        { card: styles['card-accent'], badge: styles['badge-accent'], text: styles['text-accent'], btn: styles['bg-accent'] },
        { card: styles['card-success'], badge: styles['badge-success'], text: styles['text-success'], btn: styles['bg-success'] },
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
            <div className="container">
                <nav style={{ padding: '20px 0', fontSize: '13px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" style={{ color: '#111827', textDecoration: 'none', fontWeight: 500 }}>Services</Link>
                    <ChevronRight size={14} />
                    <span style={{ fontWeight: 700, color: '#0a66c2' }}>LinkedIn Premium</span>
                </nav>
            </div>

            <div className="container">
                <div className={styles['hero-image-container']}>
                    <img src={`${MINIO_URL}/slider/F77E7AE2-0D15-43E3-A697-0C0C72D45B90.PNG`} alt="LinkedIn Premium Banner" className={styles['hero-banner-image']} />
                </div>

                <div className={styles['plans-section']}>
                    <h2 className={styles['section-title']}>Choose Your Plan</h2>
                    <p className={styles['section-subtitle']}>Unlock LinkedIn Premium features. Delivered to your email instantly.</p>

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
                                            <li><Check size={16} className={colors.text} /> InMail Messages & Premium Badge</li>
                                            <li><Check size={16} className={colors.text} /> See Who Viewed Your Profile</li>
                                            <li><Check size={16} className={colors.text} /> LinkedIn Learning Access</li>
                                            <li><Check size={16} className={colors.text} /> Advanced Search Filters</li>
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

                <div className={styles['info-split']}>
                    <div>
                        <h3 className={styles['section-title']}>Why Choose LinkedIn Premium?</h3>
                        <div className={styles['why-list']}>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Search size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Advanced Search</strong>
                                    <p>Find the right people with advanced filters and unlimited search results.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><UserCheck size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Profile Viewers</strong>
                                    <p>See exactly who viewed your profile in the last 90 days.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Briefcase size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>InMail Messages</strong>
                                    <p>Reach anyone on LinkedIn directly, even if you&apos;re not connected.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-primary']}`}><Globe size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>LinkedIn Learning</strong>
                                    <p>Access 16,000+ expert-led courses to boost your skills and career.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={styles['section-title']}>Frequently Asked Questions</h3>
                        <div className={styles['faq-accordion']}>
                            {[
                                { q: "How will I get LinkedIn Premium?", a: "After purchase, your Premium access details will be delivered instantly to your email and visible in your StreamKart dashboard." },
                                { q: "Will this work on my existing account?", a: "Yes! Premium is activated on your existing LinkedIn email. You keep all your connections and data." },
                                { q: "Can I use LinkedIn Learning?", a: "Absolutely! Full LinkedIn Learning access is included with all Premium plans — 16,000+ courses at your fingertips." },
                                { q: "Is there a warranty?", a: "We provide a full replacement warranty for the entire duration of your plan. If you face any issues, we resolve them instantly." },
                                { q: "What payment methods do you accept?", a: "We accept UPI, all major cards, wallet payments, and international cards for customers worldwide." }
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

                <div className={styles['trust-strip']}>
                    <div className={styles['trust-item']}>
                        <ShieldCheck size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Globe size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>Works Worldwide</strong>
                            <span>Use your account from anywhere.</span>
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

                <div className={styles['bottom-cta']}>
                    <div className={styles['cta-content']}>
                        <div className={styles['cta-icon-box']}>
                            <Briefcase size={24} color="#0a66c2" />
                        </div>
                        <div className={styles['cta-text']}>
                            <h3>Ready to supercharge your career?</h3>
                            <p>Get LinkedIn Premium and stand out to recruiters.</p>
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
