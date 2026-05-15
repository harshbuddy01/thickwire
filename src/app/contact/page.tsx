'use client';

import Link from 'next/link';
import { ChevronRight, Mail, MessageCircle, Phone, Globe, Clock, MapPin, ArrowRight, Headphones } from 'lucide-react';
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
                        Have a question, feedback, or need assistance? Our global team is 
                        dedicated to providing you with the most premium support experience.
                    </p>

                    <div className={styles['contact-grid']}>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><MessageCircle size={26} /></div>
                            <h3>WhatsApp</h3>
                            <p>Get instant help with your orders directly on WhatsApp.</p>
                            <a href="https://wa.me/918904791599" target="_blank" rel="noopener noreferrer" className={styles['contact-link']}>Chat with us <ArrowRight size={16} /></a>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Mail size={26} /></div>
                            <h3>Email Support</h3>
                            <p>For business inquiries, partnerships, or general support.</p>
                            <a href="mailto:support@streamkart.store" className={styles['contact-link']}>Send an email <ArrowRight size={16} /></a>
                        </div>
                        <div className={styles['contact-card']}>
                            <div className={styles['contact-icon']}><Phone size={26} /></div>
                            <h3>Voice Support</h3>
                            <p>Talk to our experts. Available Mon-Sat, 10 AM - 6 PM IST.</p>
                            <a href="tel:+918904791599" className={styles['contact-link']}>Call our team <ArrowRight size={16} /></a>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginTop: '48px' }} className="contact-info-split">
                        <div className={styles['rich-text']}>
                            <h2>How can we help?</h2>
                            <p>
                                Whether you&apos;re looking for answers, would like to solve a problem, or just want to let us know how we did, you&apos;ll find many ways to contact us right here. We pride ourselves on our transparency and speed.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '40px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#fafafa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0', color: '#b87a1d' }}>
                                        <Clock size={22} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem', marginBottom: '4px' }}>Working Hours</div>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>24/7 Support (WhatsApp & Tickets)<br/>Voice: 10:00 AM - 6:00 PM (IST)</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#fafafa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0', color: '#b87a1d' }}>
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem', marginBottom: '4px' }}>Our Office</div>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>StreamKart Digital Services HQ<br/>Bengaluru, Karnataka, India</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ 
                            background: '#fafafa', 
                            padding: '56px', 
                            borderRadius: '32px', 
                            border: '1px solid #f0f0f0',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{ 
                                width: '64px', height: '64px', background: '#fff', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.04)', color: '#b87a1d'
                            }}>
                                <Headphones size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>
                                Need Technical Support?
                            </h3>
                            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1rem', lineHeight: 1.6 }}>
                                For order verification, plan changes, or replacement issues, please open a dedicated support ticket.
                            </p>
                            <Link href="/support" style={{
                                background: '#1a1c23',
                                color: '#fff',
                                padding: '16px 40px',
                                borderRadius: '16px',
                                fontWeight: 800,
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}>
                                Open Support Ticket <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .contact-info-split {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                }
            `}</style>
        </div>
    );
}
