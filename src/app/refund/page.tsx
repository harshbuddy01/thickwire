'use client';

import Link from 'next/link';
import { ChevronRight, RefreshCcw, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import styles from '../static-page.module.css';

export default function RefundPolicyPage() {
    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>Refund Policy</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>Refund Policy</h1>
                    <p className={styles['page-subtitle']}>
                        We want you to be completely satisfied with your purchase. 
                        Please read our refund and replacement policy carefully.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><RefreshCcw size={24} /></div>
                            <h3>Full Refund</h3>
                            <p>If the service is not delivered within 24 hours of purchase.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldCheck size={24} /></div>
                            <h3>Replacement</h3>
                            <p>100% replacement warranty if you face any issues during the validity.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Clock size={24} /></div>
                            <h3>Quick Response</h3>
                            <p>All refund requests are processed within 2-3 business days.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Eligibility for Refund</h2>
                        <p>
                            Refunds are eligible only under the following circumstances:
                        </p>
                        <ul>
                            <li>The service was not delivered within the promised timeframe (usually 24 hours).</li>
                            <li>The credentials provided are invalid and our support team is unable to replace them.</li>
                            <li>The subscription was canceled by the provider before the expiry date and we are unable to provide a replacement.</li>
                        </ul>

                        <h2>2. Non-Refundable Situations</h2>
                        <p>
                            We cannot offer refunds in the following cases:
                        </p>
                        <ul>
                            <li>You changed your mind after the credentials have been delivered and used.</li>
                            <li>You are unable to use the service due to technical issues on your device or ISP (we will try to help, but no refund).</li>
                            <li>The account was banned due to violation of the service provider's terms of use (e.g., sharing password).</li>
                        </ul>

                        <h2>3. Replacement Warranty</h2>
                        <p>
                            Most of our services come with a full-duration replacement warranty. If your account stops working:
                        </p>
                        <ol>
                            <li>Contact our support team immediately via the dashboard or WhatsApp.</li>
                            <li>Provide your Order ID and a screenshot of the issue.</li>
                            <li>We will provide a replacement or fix the issue within 12-24 hours.</li>
                        </ol>

                        <h2>4. How to Request a Refund</h2>
                        <p>
                            To request a refund, please email us at <strong>payments@streamkart.store</strong> or open a support ticket from your dashboard. Please include:
                        </p>
                        <ul>
                            <li>Order ID</li>
                            <li>Reason for refund</li>
                            <li>Screenshot of the issue (if applicable)</li>
                        </ul>

                        <h2>5. Refund Processing</h2>
                        <p>
                            Once approved, the refund will be credited back to your original payment method (UPI, Bank, or Wallet) within 5-7 working days, depending on your bank's processing time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
