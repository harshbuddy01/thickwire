'use client';

import Link from 'next/link';
import { ChevronRight, HelpCircle, ChevronDown, Zap, ShieldCheck, Headphones, ArrowRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import styles from '../static-page.module.css';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "How will I receive my account credentials?",
            a: "After your payment is successful, your account details (Email & Password) will be instantly visible in your dashboard under the 'Orders' section. We also send a copy to your registered email address."
        },
        {
            q: "How long does the delivery take?",
            a: "Most orders are delivered instantly. However, in some cases, it may take 5-15 minutes for our system to verify the payment and generate your credentials. If you don't receive it within 30 minutes, please contact support."
        },
        {
            q: "Are these official accounts?",
            a: "Yes, all accounts provided by StreamKart are 100% official and premium. We do not provide cracked or illegal accounts. You will get the full premium experience as promised."
        },
        {
            q: "Can I use the account on multiple devices?",
            a: "This depends on the plan you purchase. Some plans are for a single device, while others (like Netflix Premium 4-Device) allow multiple logins. Please check the plan description before buying."
        },
        {
            q: "What if the account stops working?",
            a: "Don't worry! We provide a full replacement warranty for the entire duration of your plan. If you face any issues, simply open a support ticket or message us on WhatsApp, and we'll provide a replacement within 12-24 hours."
        },
        {
            q: "Which payment methods do you accept?",
            a: "We accept all major UPI apps (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and various digital wallets through our secure payment gateway."
        },
        {
            q: "Can I renew my existing account?",
            a: "For most services, we provide a new account for each subscription. However, for some services like YouTube Premium or Spotify, we can upgrade your existing account. Please check the specific service page for details."
        },
        {
            q: "Is my payment information secure?",
            a: "Absolutely. We use industry-standard encryption and process all payments through Razorpay, a highly secure and regulated payment gateway. We never store your card or bank details."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>FAQ</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>Frequently Asked Questions</h1>
                    <p className={styles['page-subtitle']}>
                        Find quick answers to common questions about our services, 
                        payments, and instant delivery process.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Zap size={26} /></div>
                            <h3>Instant Help</h3>
                            <p>Most answers can be found right here in the FAQ.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldCheck size={26} /></div>
                            <h3>Safe Purchase</h3>
                            <p>Learn about our security and official accounts.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Headphones size={26} /></div>
                            <h3>24/7 Support</h3>
                            <p>Our support team is available anytime to assist you.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '64px' }}>
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`${styles['faq-item']} ${openIndex === index ? styles.open : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className={styles['faq-question']}>
                                    <span>{faq.q}</span>
                                    <ChevronDown size={22} className={styles['faq-arrow']} />
                                </div>
                                <div className={styles['faq-answer']}>
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ 
                        marginTop: '80px', 
                        padding: '48px', 
                        background: '#fafafa', 
                        borderRadius: '32px', 
                        textAlign: 'center',
                        border: '1px solid #f0f0f0'
                    }}>
                        <div style={{ 
                            width: '56px', height: '56px', background: '#fff', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', color: '#b87a1d'
                        }}>
                            <MessageCircle size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>
                            Still have questions?
                        </h3>
                        <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                            If you didn&apos;t find your answer here, our team is ready to provide personal assistance.
                        </p>
                        <Link href="/support" style={{
                            background: '#b87a1d',
                            color: '#fff',
                            padding: '16px 48px',
                            borderRadius: '16px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 25px rgba(184, 122, 29, 0.2)'
                        }}>
                            Get in Touch <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
