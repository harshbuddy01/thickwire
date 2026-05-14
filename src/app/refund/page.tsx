'use client';

import Link from 'next/link';
import { ChevronRight, RefreshCcw, ShieldCheck, Clock, CreditCard, ArrowRight } from 'lucide-react';
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
                    <h1 className={styles['page-title']}>Refund & Replacement</h1>
                    <p className={styles['page-subtitle']}>
                        We stand by the quality of our services. If something isn&apos;t right, 
                        we&apos;re committed to making it fair for you.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><RefreshCcw size={26} /></div>
                            <h3>Full Refund</h3>
                            <p>Eligible if service is not delivered within 24 hours.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldCheck size={26} /></div>
                            <h3>100% Warranty</h3>
                            <p>Full-duration replacement if you face any issues.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Clock size={26} /></div>
                            <h3>Quick Action</h3>
                            <p>Replacement provided within 12-24 hours.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Eligibility for Refund</h2>
                        <p>
                            At StreamKart, customer satisfaction is our priority. Refunds are generally eligible under the following specific conditions:
                        </p>
                        <ul>
                            <li><strong>Delivery Failure:</strong> If we fail to deliver your credentials within 24 hours of successful payment.</li>
                            <li><strong>Invalid Credentials:</strong> If the provided login details are invalid and we are unable to replace them within 48 hours.</li>
                            <li><strong>Service Termination:</strong> If a subscription is terminated by the provider prematurely and no replacement is available.</li>
                        </ul>

                        <h2>2. Non-Refundable Situations</h2>
                        <p>
                            To maintain our competitive pricing, we cannot offer refunds in these cases:
                        </p>
                        <ul>
                            <li>Change of mind after the digital product (credentials) has been delivered and viewed.</li>
                            <li>Technical issues at the user&apos;s end (e.g., VPN issues, device compatibility, or ISP blocks).</li>
                            <li>Account bans caused by violating the service provider&apos;s Terms of Service (e.g., password sharing or illegal activity).</li>
                        </ul>

                        <h2>3. The Replacement Warranty</h2>
                        <p>
                            Every premium plan sold on StreamKart comes with a <strong>Full-Duration Replacement Warranty</strong>. If your account stops working:
                        </p>
                        <ol>
                            <li>Open a support ticket or message us on WhatsApp with your Order ID.</li>
                            <li>Provide a clear screenshot of the error message you are seeing.</li>
                            <li>Our automated system or support team will provide a fresh replacement within 12-24 hours.</li>
                        </ol>

                        <h2>4. Processing Your Refund</h2>
                        <p>
                            Once a refund is approved by our billing team, it will be initiated immediately.
                        </p>
                        <ul>
                            <li><strong>UPI/Wallets:</strong> Usually reflects within 24-48 hours.</li>
                            <li><strong>Credit/Debit Cards:</strong> May take 5-7 business days depending on your bank.</li>
                        </ul>
                        
                        <div style={{ 
                            marginTop: '64px', 
                            padding: '40px', 
                            background: '#fafafa', 
                            borderRadius: '24px', 
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '24px'
                        }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontWeight: 900 }}>Need to request a refund?</h3>
                                <p style={{ margin: 0, color: '#64748b' }}>Our billing team handles all requests with the highest priority.</p>
                            </div>
                            <Link href="/support" style={{
                                background: '#1a1c23',
                                color: '#fff',
                                padding: '14px 32px',
                                borderRadius: '14px',
                                fontWeight: 800,
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                Contact Billing <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
