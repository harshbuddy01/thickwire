'use client';

import Link from 'next/link';
import { ChevronRight, HelpCircle, ChevronDown, Zap, ShieldCheck, Headphones } from 'lucide-react';
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
                    <span className={styles.current}>Frequently Asked Questions</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>FAQ</h1>
                    <p className={styles['page-subtitle']}>
                        Find quick answers to common questions about our services, 
                        payments, and delivery process.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Zap size={24} /></div>
                            <h3>Instant Help</h3>
                            <p>Most answers can be found right here in the FAQ.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldCheck size={24} /></div>
                            <h3>Safe Purchase</h3>
                            <p>Learn about our security and official accounts.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Headphones size={24} /></div>
                            <h3>Still Unsure?</h3>
                            <p>Our support team is available 24/7 to assist you.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '48px' }}>
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`${styles['faq-item']} ${openIndex === index ? styles.open : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className={styles['faq-question']}>
                                    <span>{faq.q}</span>
                                    <ChevronDown size={20} className={styles['faq-arrow']} />
                                </div>
                                <div className={styles['faq-answer']}>
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ 
                        marginTop: '64px', 
                        padding: '32px', 
                        background: '#f8fafc', 
                        borderRadius: '24px', 
                        textAlign: 'center',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
                            Didn't find what you were looking for?
                        </h3>
                        <p style={{ color: '#64748b', marginBottom: '24px' }}>
                            Our dedicated support team is ready to help you with any specific queries.
                        </p>
                        <Link href="/support" style={{
                            background: '#b87a1d',
                            color: '#fff',
                            padding: '12px 32px',
                            borderRadius: '12px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.2s ease'
                        }}>
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
