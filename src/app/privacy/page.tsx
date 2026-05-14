'use client';

import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, EyeOff, UserCheck } from 'lucide-react';
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
                    <h1 className={styles['page-title']}>Privacy Policy</h1>
                    <p className={styles['page-subtitle']}>
                        Your privacy is our top priority. Learn how we collect, use, 
                        and protect your personal information at StreamKart.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Lock size={24} /></div>
                            <h3>Data Encryption</h3>
                            <p>All your personal data and payment info is 256-bit encrypted.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><EyeOff size={24} /></div>
                            <h3>No Data Sharing</h3>
                            <p>We never sell or share your personal data with third parties.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><UserCheck size={24} /></div>
                            <h3>Secure Login</h3>
                            <p>Multi-factor authentication and secure token-based sessions.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect information necessary to provide you with our services, including:
                        </p>
                        <ul>
                            <li><strong>Personal Info:</strong> Name, email address, and phone number.</li>
                            <li><strong>Transaction Info:</strong> Order details, payment method, and UTR numbers.</li>
                            <li><strong>Device Info:</strong> IP address, browser type, and usage patterns to improve our platform.</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>
                            We use the collected data to:
                        </p>
                        <ul>
                            <li>Process your orders and deliver account credentials.</li>
                            <li>Provide customer support and respond to your inquiries.</li>
                            <li>Send transactional emails and important service updates.</li>
                            <li>Improve our website performance and user experience.</li>
                        </ul>

                        <h2>3. Payment Security</h2>
                        <p>
                            We do not store your credit card or bank details on our servers. All payments are processed through <strong>Razorpay</strong>, which complies with PCI-DSS standards for secure transactions.
                        </p>

                        <h2>4. Cookies and Tracking</h2>
                        <p>
                            We use cookies to enhance your experience, remember your login state, and analyze site traffic. You can choose to disable cookies in your browser settings, though some features of the site may not function correctly.
                        </p>

                        <h2>5. Data Retention</h2>
                        <p>
                            We retain your personal information for as long as your account is active or as needed to provide you services. We also retain data as necessary to comply with legal obligations and resolve disputes.
                        </p>

                        <h2>6. Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete your personal information. If you wish to close your account or remove your data from our systems, please contact our support team.
                        </p>

                        <h2>7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please reach out to us at <strong>privacy@streamkart.store</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
