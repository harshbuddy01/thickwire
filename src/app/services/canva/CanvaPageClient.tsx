'use client';

import Link from 'next/link';
import { ChevronRight, Check, ShoppingCart, ChevronDown, ShieldCheck, Zap, Headphones, Palette, Layers, Image as ImageIcon, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { Service } from '@/lib/types';
import styles from '../service-page.module.css';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

export default function CanvaPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

    const colorSchemes = [
        { card: styles['card-success'], badge: styles['badge-success'], text: styles['text-success'], btn: styles['bg-success'] },
        { card: styles['card-accent'], badge: styles['badge-accent'], text: styles['text-accent'], btn: styles['bg-accent'] },
        { card: styles['card-primary'], badge: styles['badge-primary'], text: styles['text-primary'], btn: styles['bg-primary'] },
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
                    <span style={{ fontWeight: 700, color: '#059669' }}>Canva Edu</span>
                </nav>
            </div>

            <div className="container">
                <div className={styles['hero-image-container']} style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '1200 / 400', borderRadius: '24px', overflow: 'hidden' }}>
                    <Image 
                        src={`${MINIO_URL}/slider/canva.PNG`} 
                        alt="Canva Edu Banner" 
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div className={styles['plans-section']}>
                    <h2 className={styles['section-title']}>Choose Your Plan</h2>
                    <p className={styles['section-subtitle']}>Unlock all Canva Pro features with an Education account.</p>

                    <div className={styles['plans-grid']}>
                        {service.plans.map((plan, index) => {
                            const colors = colorSchemes[index % colorSchemes.length];
                            const isBestValue = index === service.plans.length - 1 && service.plans.length > 1;

                            return (
                                <div key={plan.id} className={`${styles['plan-card']} ${colors.card} ${isBestValue ? styles['best-value'] : ''}`}>
                                    {isBestValue && <div className={styles['best-value-ribbon']}>BEST VALUE</div>}
                                    <div className={`${styles['plan-badge']} ${colors.badge}`}>EDU PLAN</div>
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
                                            <li><Check size={16} className={colors.text} /> All Canva Pro Features</li>
                                            <li><Check size={16} className={colors.text} /> 100M+ Premium Templates</li>
                                            <li><Check size={16} className={colors.text} /> Background Remover & AI Tools</li>
                                            <li><Check size={16} className={colors.text} /> Brand Kit & Custom Fonts</li>
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
                        <h3 className={styles['section-title']}>Why Choose Canva Edu?</h3>
                        <div className={styles['why-list']}>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-success']}`}><Palette size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Premium Templates</strong>
                                    <p>Access 100M+ professional templates for any project.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-success']}`}><Wand2 size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>AI Magic Tools</strong>
                                    <p>Background remover, Magic Write, text-to-image, and more.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-success']}`}><Layers size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Brand Kit</strong>
                                    <p>Upload custom logos, fonts, and colors for consistent branding.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={`${styles['why-icon']} ${styles['why-icon-success']}`}><ImageIcon size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Premium Stock</strong>
                                    <p>Access millions of premium photos, videos, and graphics.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className={styles['section-title']}>Frequently Asked Questions</h3>
                        <div className={styles['faq-accordion']}>
                            {[
                                { q: "How will I get Canva Edu access?", a: "After purchase, your access details will be delivered instantly to your email and visible in your StreamKart dashboard." },
                                { q: "Is this the same as Canva Pro?", a: "Canva Edu includes all Canva Pro features plus additional education-specific tools and resources." },
                                { q: "Can I use it on my existing email?", a: "The account is activated on your email. You get full access to all premium features." },
                                { q: "Is there a warranty?", a: "We provide a full replacement warranty for the entire plan duration. Any issues are resolved instantly." },
                                { q: "Can I export in high quality?", a: "Yes! Export in PNG, PDF, SVG, MP4, and more — all in the highest quality without watermarks." }
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
                        <Palette size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>All Pro Features</strong>
                            <span>Full access to every premium tool.</span>
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
                            <Palette size={24} color="#059669" />
                        </div>
                        <div className={styles['cta-text']}>
                            <h3>Ready to design like a pro?</h3>
                            <p>Get Canva Edu and unlock unlimited creative possibilities.</p>
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
