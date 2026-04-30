'use client';

import { useState, useEffect } from 'react';
import { createSupportTicket } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

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

    // Pre-fill form when user is logged in
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
            <>
                <section className="page-header">
                    <h1>Support</h1>
                    <p>We&apos;re here to help!</p>
                </section>
                <div className="support-layout">
                    <div className="status-card" style={{ textAlign: 'center' }}>
                        <div className="status-icon fulfilled">✅</div>
                        <h2>Ticket Submitted!</h2>
                        <p className="subtitle">
                            We&apos;ve sent a confirmation email. Our team will respond within 24 hours.
                        </p>
                        <a href="/" className="btn btn-primary" style={{ marginTop: 24 }}>
                            Back to Home
                        </a>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <section className="page-header">
                <h1>Support</h1>
                <p>Have a question or issue? We&apos;ll get back to you within 24 hours</p>
            </section>

            <div className="support-layout">
                <div className="checkout-form-card">
                    {error && (
                        <div className="toast error" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 20 }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="support-name">Full Name</label>
                            <input
                                id="support-name"
                                className="form-input"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={form.customerName}
                                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="support-email">Email Address</label>
                            <input
                                id="support-email"
                                className="form-input"
                                type="email"
                                placeholder="john@example.com"
                                required
                                value={form.customerEmail}
                                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="support-order">Order ID (optional)</label>
                            <input
                                id="support-order"
                                className="form-input"
                                type="text"
                                placeholder="If this is about a specific order"
                                value={form.orderId}
                                onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="support-subject">Subject</label>
                            <input
                                id="support-subject"
                                className="form-input"
                                type="text"
                                placeholder="Brief description of your issue"
                                required
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="support-message">Message</label>
                            <textarea
                                id="support-message"
                                className="form-input"
                                placeholder="Describe your issue in detail..."
                                required
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Ticket'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
