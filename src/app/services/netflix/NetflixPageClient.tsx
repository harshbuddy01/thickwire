'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Check, ShoppingCart, ChevronDown, Play, Zap, Monitor, ShieldCheck, Tag, Headphones } from 'lucide-react';
import { useState } from 'react';
import type { Service } from '@/lib/types';
import ProgressiveImage from '@/components/ProgressiveImage';
import styles from './netflix.module.css';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';
export default function NetflixPageClient({ service }: { service: Service }) {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Color schemes per plan index for visual variety
    const colorSchemes = [
        { card: styles['card-red'], badge: styles['badge-red'], text: styles['text-red'], btn: styles['bg-red'] },
        { card: styles['card-purple'], badge: styles['badge-purple'], text: styles['text-purple'], btn: styles['bg-purple'] },
        { card: styles['card-blue'], badge: styles['badge-blue'], text: styles['text-blue'], btn: styles['bg-blue'] },
    ];

    return (
        <div className={styles['netflix-page-exact']}>
            {/* ─── Breadcrumbs ────────────────────────────────────── */}
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/streaming">Streaming</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>{service.name}</span>
                </nav>
            </div>

            <div className="container">
                {/* ─── Hero Section (Exact Image) ────────────────────── */}
                <div className={styles['hero-image-container']} style={{ position: 'relative' }}>
                    <Image
                        src={`${MINIO_URL}/slider/netflix-banner-new.png`}
                        alt="Netflix Premium"
                        fill
                        priority
                        className={styles['hero-banner-image']}
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                {/* ─── Plan Selection ────────────────────────────────── */}
                <div className={styles['plans-section']}>
                    <h2 className={styles['section-title']}>Choose Your Plan</h2>
                    <p className={styles['section-subtitle']}>All plans include Premium benefits.</p>

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
                                            <span className={styles.currency}>₹</span>
                                            <span className={styles.amount}>{parseFloat(plan.price).toLocaleString()}</span>
                                        </div>
                                        <ul className={styles['plan-features']}>
                                            <li><Check size={16} className={colors.text} /> Full HD / 4K Ultra HD Quality</li>
                                            <li><Check size={16} className={colors.text} /> Watch on 1 Device</li>
                                            <li><Check size={16} className={colors.text} /> All Netflix Content Access</li>
                                            <li><Check size={16} className={colors.text} /> Ad-free Experience</li>
                                            <li><Check size={16} className={colors.text} /> Works on TV, Mobile, Laptop</li>
                                        </ul>
                                        {plan.inStock ? (
                                            <Link
                                                href={`/checkout?planId=${plan.id}&service=${service.slug}`}
                                                className={`${styles['plan-btn']} ${colors.btn}`}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                                            >
                                                <ShoppingCart size={18} /> Buy Now →
                                            </Link>
                                        ) : (
                                            <button className={`${styles['plan-btn']} ${colors.btn}`} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                                                Out of Stock
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Why Choose & FAQ ─────────────────────────────── */}
                <div className={styles['info-split']}>
                    <div className={styles['why-section']}>
                        <h3 className={styles['section-title']}>Why Choose {service.name}?</h3>
                        <div className={styles['why-list']}>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Play fill="white" size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Unlimited Entertainment</strong>
                                    <p>Watch all your favorite movies and TV shows.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Zap fill="white" size={16} /></div>
                                <div className={styles['why-text']}>
                                    <strong>No Ads</strong>
                                    <p>Enjoy uninterrupted streaming experience.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Check size={18} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Download & Watch</strong>
                                    <p>Download your favorite content and watch offline.</p>
                                </div>
                            </div>
                            <div className={styles['why-item']}>
                                <div className={styles['why-icon']}><Monitor size={18} /></div>
                                <div className={styles['why-text']}>
                                    <strong>Works Everywhere</strong>
                                    <p>Stream on Smart TVs, mobiles, tablets, laptops and more.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['faq-section']}>
                        <h3 className={styles['section-title']}>Frequently Asked Questions</h3>
                        <div className={styles['faq-accordion']}>
                            {[
                                { q: "How will I get my Netflix account?", a: "After your successful purchase, your login credentials will be instantly visible in your dashboard and sent to your registered email address." },
                                { q: "Can I change my plan later?", a: "Yes, you can upgrade to a higher duration plan at any time. The remaining balance of your current plan will be adjusted." },
                                { q: "Will this account work on my device?", a: "Absolutely! Our premium accounts work on all Netflix-supported devices including Android, iOS, Windows, and Smart TVs." },
                                { q: "Is there any warranty?", a: "We provide 100% replacement warranty for the entire duration of your plan. If you face any issues, we replace the account instantly." },
                                { q: "What if I face any issue?", a: "Our dedicated support team is available 24/7. You can reach out via the Support tab or live chat for immediate assistance." }
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

                {/* ─── Trust Elements ─────────────────────────────────── */}
                <div className={styles['trust-strip']}>
                    <div className={styles['trust-item']}>
                        <ShieldCheck size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>100% Safe & Secure</strong>
                            <span>Your data and payments are fully protected.</span>
                        </div>
                    </div>
                    <div className={styles['trust-item']}>
                        <Tag size={24} className={styles['trust-icon']} />
                        <div className={styles['trust-text']}>
                            <strong>Best Price Guarantee</strong>
                            <span>Get the best services at the lowest prices.</span>
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
                            <strong>24/7 Customer Support</strong>
                            <span>We&apos;re here anytime you need us.</span>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom CTA ───────────────────────────────────── */}
                <div className={styles['bottom-cta']}>
                    <div className={styles['cta-content']}>
                        <div className={styles['cta-icon-box']}>
                            <div style={{ width: '32px', height: '32px' }}>
                                <ProgressiveImage src={`${MINIO_URL}/netflix_3d.png`} alt="N" />
                            </div>
                        </div>
                        <div className={styles['cta-text']}>
                            <h3>Ready to start watching?</h3>
                            <p>Choose a plan and enjoy unlimited entertainment.</p>
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
