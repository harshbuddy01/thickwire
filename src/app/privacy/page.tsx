'use client';

import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';
import styles from '../static-page.module.css';

export default function PrivacyPolicyPage() {
    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>Privacy Policy</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>Privacy & Data Protection</h1>
                    <p className={styles['page-subtitle']}>
                        Your privacy is our priority. We are committed to protecting your personal data 
                        and ensuring a transparent shopping experience.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Lock size={26} /></div>
                            <h3>End-to-End Encryption</h3>
                            <p>All your data and transactions are encrypted with SSL.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><EyeOff size={26} /></div>
                            <h3>No Data Selling</h3>
                            <p>We never share or sell your information to third parties.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Database size={26} /></div>
                            <h3>Secure Storage</h3>
                            <p>Your credentials and orders are stored in a secure environment.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Information We Collect</h2>
                        <p>
                            We only collect the minimum information necessary to provide you with our services:
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> Name and Email address for account creation and delivery.</li>
                            <li><strong>Transaction Data:</strong> Payment reference provided by our gateway (we do NOT store card numbers).</li>
                            <li><strong>Device Data:</strong> Basic browser information to prevent fraud and improve site performance.</li>
                        </ul>

                        <h2>2. How We Use Your Data</h2>
                        <p>
                            Your information is used exclusively to:
                        </p>
                        <ul>
                            <li>Deliver your digital credentials instantly.</li>
                            <li>Provide customer support and resolve order issues.</li>
                            <li>Send important updates regarding your active subscriptions.</li>
                            <li>Improve our platform and security measures.</li>
                        </ul>

                        <h2>3. Data Security</h2>
                        <p>
                            We use industry-standard security protocols to protect your data. All communication between your browser and our servers is encrypted using 256-bit SSL. Payments are processed via Razorpay, a PCI-DSS compliant gateway.
                        </p>

                        <h2>4. Third-Party Services</h2>
                        <p>
                            We do not share your personal information with third parties except for:
                        </p>
                        <ul>
                            <li><strong>Payment Gateways:</strong> Necessary to process your transaction safely.</li>
                            <li><strong>Transactional Emails:</strong> To send you your credentials and receipts.</li>
                        </ul>

                        <h2>5. Your Rights</h2>
                        <p>
                            You have the right to access, update, or request the deletion of your personal data at any time. Simply contact us at <strong>privacy@streamkart.store</strong> or open a support ticket.
                        </p>

                        <div style={{ marginTop: '56px', borderTop: '1px solid #f0f0f0', paddingTop: '32px', color: '#94a3b8', fontSize: '0.9rem' }}>
                            Last Updated: May 2026. Your trust is our most valuable asset.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
