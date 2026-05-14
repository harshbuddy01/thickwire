'use client';

import Link from 'next/link';
import { ChevronRight, FileText, Scale, ShieldAlert, Gavel } from 'lucide-react';
import styles from '../static-page.module.css';

export default function TermsPage() {
    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>Terms & Conditions</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>Terms & Conditions</h1>
                    <p className={styles['page-subtitle']}>
                        By using StreamKart, you agree to the following terms and conditions. 
                        Please read them carefully before making a purchase.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Scale size={24} /></div>
                            <h3>Agreement</h3>
                            <p>Use of our platform constitutes acceptance of these terms.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldAlert size={24} /></div>
                            <h3>User Conduct</h3>
                            <p>Users must not misuse accounts or share credentials illegally.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Gavel size={24} /></div>
                            <h3>Legal Use</h3>
                            <p>All services are for personal, non-commercial use only.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to StreamKart. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
                        </p>

                        <h2>2. Service Provision</h2>
                        <p>
                            StreamKart acts as a facilitator for digital subscriptions. We provide access to various premium services. While we ensure the validity of the accounts we sell, we are not the owners of the underlying streaming or AI platforms.
                        </p>

                        <h2>3. User Account and Security</h2>
                        <p>
                            When you purchase a service, you may receive credentials (email/password) or an activation link. You are responsible for:
                        </p>
                        <ul>
                            <li>Maintaining the confidentiality of the credentials.</li>
                            <li>Not changing the password or account settings unless explicitly permitted.</li>
                            <li>Not sharing the account with others beyond the specified device limit.</li>
                        </ul>

                        <h2>4. Payment and Pricing</h2>
                        <p>
                            All prices are listed in INR (₹) or USD ($). Payments are processed securely via our payment partners (Razorpay). We reserve the right to change prices at any time without prior notice.
                        </p>

                        <h2>5. Limitations of Liability</h2>
                        <p>
                            StreamKart shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the services. We do not guarantee that the services will be uninterrupted or error-free, as they depend on third-party providers.
                        </p>

                        <h2>6. Termination of Service</h2>
                        <p>
                            We reserve the right to terminate your access to our services without refund if you are found to be in violation of these terms, including but not limited to:
                        </p>
                        <ul>
                            <li>Attempting to change account credentials without permission.</li>
                            <li>Reselling the accounts provided to you.</li>
                            <li>Using the services for any illegal activities.</li>
                        </ul>

                        <h2>7. Changes to Terms</h2>
                        <p>
                            We may update these Terms & Conditions from time to time. Your continued use of the platform after any changes signifies your acceptance of the new terms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
