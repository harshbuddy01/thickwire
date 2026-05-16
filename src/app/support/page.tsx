'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Headphones, Send, MessageCircle, Clock, ShieldCheck, ArrowRight, Image as ImageIcon, X } from 'lucide-react';
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
    const [ticketAttachment, setTicketAttachment] = useState<string | null>(null);
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
                attachmentUrl: ticketAttachment || undefined,
            };
            await createSupportTicket(payload);
            setSubmitted(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("File size must be under 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTicketAttachment(reader.result as string);
            };
            reader.readAsDataURL(file);
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
                    <div className={styles['content-wrapper']} style={{ textAlign: 'center', padding: '100px 40px' }}>
                        <div style={{ 
                            width: '90px', height: '90px', background: '#f0fdf4', color: '#10b981', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 32px auto', border: '1px solid #d1fae5'
                        }}>
                            <ShieldCheck size={48} />
                        </div>
                        <h1 className={styles['page-title']}>Ticket Submitted!</h1>
                        <p className={styles['page-subtitle']} style={{ maxWidth: '600px', margin: '0 auto 48px auto' }}>
                            We&apos;ve received your request. Our support team has been notified and 
                            will get back to you within 12-24 hours. A confirmation has been sent to your email.
                        </p>
                        <Link href="/" style={{
                            background: '#1a1c23', color: '#fff', padding: '18px 48px', 
                            borderRadius: '16px', fontWeight: 800, textDecoration: 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            transition: 'all 0.3s ease', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}>
                            Back to Storefront <ArrowRight size={18} />
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
                    <span className={styles.current}>Support Center</span>
                </nav>

                <div className={styles['content-wrapper']}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px' }} className="support-split">
                        
                        {/* Left Side: Info */}
                        <div>
                            <h1 className={styles['page-title']}>Help & Support</h1>
                            <p className={styles['page-subtitle']}>
                                Facing an issue with your account or payment? 
                                Our experts are standing by 24/7 to help you.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div style={{ display: 'flex', gap: '24px' }}>
                                    <div style={{ width: '56px', height: '56px', background: '#f0f9ff', color: '#0ea5e9', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e0f2fe' }}>
                                        <Clock size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>Fast Response</div>
                                        <div style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>We typically resolve all support tickets in less than 4 hours.</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '24px' }}>
                                    <div style={{ width: '56px', height: '56px', background: '#f0fdf4', color: '#22c55e', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #dcfce7' }}>
                                        <MessageCircle size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>Direct Support</div>
                                        <div style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>Get direct assistance for activation or account issues instantly.</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '24px' }}>
                                    <div style={{ width: '56px', height: '56px', background: '#fff7ed', color: '#f59e0b', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #ffedd5' }}>
                                        <Headphones size={28} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>24/7 Availability</div>
                                        <div style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6 }}>Our global team is always awake to help you, no matter the time.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div style={{ background: '#f8fafc', padding: '56px', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            {error && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '20px', borderRadius: '14px', marginBottom: '32px', fontSize: '0.95rem', fontWeight: 600 }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-row">
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Your Name</label>
                                        <input
                                            className="form-input"
                                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '1rem' }}
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={form.customerName}
                                            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Email Address</label>
                                        <input
                                            className="form-input"
                                            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '1rem' }}
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={form.customerEmail}
                                            onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Order Reference (optional)</label>
                                    <input
                                        className="form-input"
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '1rem' }}
                                        type="text"
                                        placeholder="e.g. #ORD-123456"
                                        value={form.orderId}
                                        onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Subject</label>
                                    <input
                                        className="form-input"
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '1rem' }}
                                        type="text"
                                        placeholder="e.g. Cannot log into Netflix"
                                        required
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Message Details</label>
                                    <textarea
                                        className="form-input"
                                        style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff', minHeight: '140px', resize: 'vertical', fontSize: '1rem' }}
                                        placeholder="Tell us more about the issue..."
                                        required
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '10px' }}>Attachment (optional)</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <label style={{ cursor: 'pointer', padding: '12px 24px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontWeight: 600, fontSize: '0.9rem', transition: 'background 0.2s' }}>
                                            <input type="file" accept="image/*,video/*" onChange={handleAttachmentChange} style={{ display: 'none' }} />
                                            <ImageIcon size={18} /> Upload Image/Video
                                        </label>
                                        {ticketAttachment && (
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                {ticketAttachment.startsWith('data:video') ? (
                                                    <video src={ticketAttachment} style={{ height: '48px', borderRadius: '8px' }} />
                                                ) : (
                                                    <img src={ticketAttachment} alt="Preview" style={{ height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                                                )}
                                                <button type="button" onClick={() => setTicketAttachment(null)} style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={12} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={submitting}
                                    style={{
                                        width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
                                        background: '#b87a1d', color: '#fff', fontWeight: 800, fontSize: '1.1rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                        cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease',
                                        opacity: submitting ? 0.7 : 1, marginTop: '8px',
                                        boxShadow: '0 10px 25px rgba(184, 122, 29, 0.2)'
                                    }}
                                >
                                    {submitting ? 'Sending...' : <><Send size={20} /> Open Support Ticket</>}
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
                        gap: 48px !important;
                    }
                }
                @media (max-width: 480px) {
                    .form-row {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
}
