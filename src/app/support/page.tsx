'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Headphones, Send, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { createSupportTicket } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import styles from '../static-page.module.css';

export default function SupportPage() {
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        orderId: '',
        subject: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                customerName: prev.customerName || user.name,
                customerEmail: prev.customerEmail || user.email,
            }));
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                ...form,
                orderId: form.orderId || undefined,
            };
            await createSupportTicket(payload);
            setSubmitted(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className={styles['static-page']}>
                <div className="container">
                    <nav className={styles['breadcrumb-nav']}>
                        <Link href="/">Home</Link>
                        <ChevronRight size={14} />
                        <span className={styles.current}>Support</span>
                    </nav>
                    <div className={styles['content-wrapper']} style={{ textAlign: 'center', padding: '80px 40px' }}>
                        <div style={{ 
                            width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 32px auto'
                        }}>
                            <ShieldCheck size={40} />
                        </div>
                        <h1 className={styles['page-title']}>Ticket Submitted!</h1>
                        <p className={styles['page-subtitle']} style={{ maxWidth: '500px', margin: '0 auto 40px auto' }}>
                            We&apos;ve received your support request. A confirmation email has been sent, 
                            and our team will respond within 12-24 hours.
                        </p>
                        <Link href="/" style={{
                            background: '#1a1c23', color: '#fff', padding: '14px 40px', 
                            borderRadius: '12px', fontWeight: 700, textDecoration: 'none',
                            display: 'inline-block', transition: 'all 0.2s ease'
                        }}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['static-page']}>
            <div className="container">
                <nav className={styles['breadcrumb-nav']}>
                    <Link href="/">Home</Link>
                    <ChevronRight size={14} />
                    <span className={styles.current}>Support</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px' }} className="support-split">
                        
                        {/* Left Side: Info */}
                        <div>
                            <h1 className={styles['page-title']}>Support Center</h1>
                            <p className={styles['page-subtitle']} style={{ marginBottom: '40px' }}>
                                Facing an issue? We&apos;re here to help you 24/7. 
                                Fill out the form and our experts will get back to you.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#f0f9ff', color: '#0ea5e9', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: '4px' }}>Quick Resolution</div>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>Our average response time is under 4 hours for all premium members.</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#f0fdf4', color: '#22c55e', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <MessageCircle size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: '4px' }}>Live WhatsApp Chat</div>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>For instant activation issues, chat with us directly on WhatsApp.</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#fff7ed', color: '#f59e0b', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Headphones size={24} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: '4px' }}>Expert Assistance</div>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.5 }}>Our technical team will guide you step-by-step through any setup process.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div style={{ background: '#f8fafc', padding: '48px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                            {error && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600 }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Full Name</label>
                                        <input
                                            className="form-input"
                                            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={form.customerName}
                                            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Email Address</label>
                                        <input
                                            className="form-input"
                                            style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={form.customerEmail}
                                            onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Order ID (optional)</label>
                                    <input
                                        className="form-input"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                                        type="text"
                                        placeholder="e.g. #ORD-12345"
                                        value={form.orderId}
                                        onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Subject</label>
                                    <input
                                        className="form-input"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                                        type="text"
                                        placeholder="How can we help you?"
                                        required
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Message</label>
                                    <textarea
                                        className="form-input"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', minHeight: '120px', resize: 'vertical' }}
                                        placeholder="Please describe your issue in detail..."
                                        required
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={submitting}
                                    style={{
                                        width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                                        background: '#b87a1d', color: '#fff', fontWeight: 700, fontSize: '1rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                                        opacity: submitting ? 0.7 : 1, marginTop: '10px'
                                    }}
                                >
                                    {submitting ? 'Submitting...' : <><Send size={18} /> Submit Ticket</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .support-split {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                }
                @media (max-width: 480px) {
                    .form-row {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
