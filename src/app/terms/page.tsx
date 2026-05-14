'use client';

import Link from 'next/link';
import { ChevronRight, FileText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
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
                    <h1 className={styles['page-title']}>Terms of Service</h1>
                    <p className={styles['page-subtitle']}>
                        Welcome to StreamKart. By using our platform, you agree to the following terms. 
                        Please read them carefully to ensure a smooth experience.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><ShieldCheck size={26} /></div>
                            <h3>Safe Usage</h3>
                            <p>Guidelines on how to use your premium accounts safely.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Scale size={26} /></div>
                            <h3>Legal Use</h3>
                            <p>Our commitment to providing official digital services.</p>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><AlertCircle size={26} /></div>
                            <h3>Restrictions</h3>
                            <p>Important rules regarding account sharing and modifications.</p>
                        </div>
                    </div>

                    <div className={styles['rich-text']}>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using StreamKart (streamkart.store), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
                        </p>

                        <h2>2. Service Description</h2>
                        <p>
                            StreamKart provides premium digital subscriptions and activation services for various entertainment and AI platforms. We act as a facilitator to provide you with official premium access at competitive prices.
                        </p>

                        <h2>3. User Responsibilities</h2>
                        <ul>
                            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of the credentials provided to you.</li>
                            <li><strong>Prohibited Actions:</strong> You may not change the email, password, or profile settings of shared accounts unless explicitly stated in the product description.</li>
                            <li><strong>No Reselling:</strong> The services purchased are for personal use only. Reselling credentials without prior authorization is strictly prohibited.</li>
                        </ul>

                        <h2>4. Delivery & Payments</h2>
                        <p>
                            All payments are processed securely through Razorpay. Digital products are delivered via your dashboard and registered email. We aim for instant delivery but reserve up to 24 hours for manual verification if required.
                        </p>

                        <h2>5. Termination</h2>
                        <p>
                            We reserve the right to terminate your access to our services if you are found violating any of these terms, including but not limited to attempted fraud, harassment of support staff, or unauthorized account modifications.
                        </p>

                        <h2>6. Limitation of Liability</h2>
                        <p>
                            StreamKart is not responsible for any downtime or changes in policy made by the third-party service providers (e.g., Netflix, Spotify, OpenAI). However, we will always strive to provide replacements or alternatives as per our warranty policy.
                        </p>

                        <div style={{ marginTop: '56px', borderTop: '1px solid #f0f0f0', paddingTop: '32px', color: '#94a3b8', fontSize: '0.9rem' }}>
                            Last Updated: May 2026. StreamKart reserves the right to update these terms at any time.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
