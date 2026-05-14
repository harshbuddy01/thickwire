'use client';

import Link from 'next/link';
import { ChevronRight, Mail, MessageCircle, Phone, Globe, Clock, MapPin } from 'lucide-react';
import styles from '../static-page.module.css';

export default function ContactPage() {
    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>Contact Us</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <h1 className={styles['page-title']}>Get in Touch</h1>
                    <p className={styles['page-subtitle']}>
                        Have a question, feedback, or need assistance? Our team is 
                        dedicated to providing you with the best support experience.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><MessageCircle size={24} /></div>
                            <h3>WhatsApp Support</h3>
                            <p>Fastest way to get help with your orders.</p>
                            <a href="https://wa.me/your_number" className={styles['contact-link']}>Chat Now →</a>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Mail size={24} /></div>
                            <h3>Email Us</h3>
                            <p>For business inquiries and general questions.</p>
                            <a href="mailto:support@streamkart.store" className={styles['contact-link']}>Send Email →</a>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Phone size={24} /></div>
                            <h3>Call Us</h3>
                            <p>Available Mon-Sat, 10 AM - 6 PM IST.</p>
                            <a href="tel:+91XXXXXXXXXX" className={styles['contact-link']}>Call Support →</a>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px' }} className="contact-info-split">
                        <div className={styles['rich-text']}>
                            <h2>How can we help?</h2>
                            <p>
                                Whether you&apos;re looking for answers, would like to solve a problem, or just want to let us know how we did, you&apos;ll find many ways to contact us right here.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '32px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ color: '#b87a1d' }}><Clock size={20} /></div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>Working Hours</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>24/7 Support (WhatsApp/Tickets)<br/>Phone: 10:00 AM - 6:00 PM (IST)</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ color: '#b87a1d' }}><MapPin size={20} /></div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#1e293b' }}>Our Office</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>StreamKart Digital Services<br/>Bengaluru, Karnataka, India</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '40px', 
                            borderRadius: '24px', 
                            border: '1px solid #e2e8f0',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>
                                Need Technical Support?
                            </h3>
                            <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.95rem' }}>
                                If you&apos;re facing an issue with a specific order, please open a support ticket for faster resolution.
                            </p>
                            <Link href="/support" style={{
                                background: '#1a1c23',
                                color: '#fff',
                                padding: '14px 32px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                textDecoration: 'none',
                                display: 'inline-block',
                                transition: 'all 0.2s ease'
                            }}>
                                Open Support Ticket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .contact-info-split {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
