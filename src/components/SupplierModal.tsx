'use client';

import { useState } from 'react';
import { sendSupplierOtp, submitSupplierApplication } from '@/lib/api';
import { X, CheckCircle, Loader2 } from 'lucide-react';

export default function SupplierModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: form, 2: otp, 3: success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        description: '', // description + rates
    });
    const [otp, setOtp] = useState('');

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.phone || !formData.description) {
            setError('Please fill out all fields');
            return;
        }

        setLoading(true);
        try {
            await sendSupplierOtp(formData.email);
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!otp) {
            setError('Please enter the OTP');
            return;
        }

        setLoading(true);
        try {
            await submitSupplierApplication({
                ...formData,
                otp,
            });
            setStep(3);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="supplier-modal-overlay">
            <div className="supplier-modal-content">
                <button className="supplier-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                {step === 1 && (
                    <div className="supplier-step">
                        <h2>Become a Supplier</h2>
                        <p>Partner with StreamKart to sell your digital goods. Please provide your details and the rates you can offer.</p>
                        
                        {error && <div className="supplier-error">{error}</div>}

                        <form onSubmit={handleSendOtp}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                                    placeholder="your@email.com"
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    value={formData.phone} 
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                                    placeholder="+91..."
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>What do you want to supply? (Include your rates)</label>
                                <textarea 
                                    value={formData.description} 
                                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                                    placeholder="E.g., I can supply Netflix profiles for 150 INR per month..."
                                    rows={4}
                                    required 
                                />
                            </div>
                            <button type="submit" disabled={loading} className="supplier-submit-btn">
                                {loading ? <Loader2 size={18} className="spin" /> : 'Continue to Verify Email'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="supplier-step">
                        <h2>Verify Your Email</h2>
                        <p>We've sent an OTP to <strong>{formData.email}</strong>. Enter it below to submit your application.</p>
                        
                        {error && <div className="supplier-error">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Enter OTP</label>
                                <input 
                                    type="text" 
                                    value={otp} 
                                    onChange={e => setOtp(e.target.value)} 
                                    placeholder="123456"
                                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '4px' }}
                                    required 
                                />
                            </div>
                            <button type="submit" disabled={loading} className="supplier-submit-btn">
                                {loading ? <Loader2 size={18} className="spin" /> : 'Submit Application'}
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="supplier-back-btn">
                                Back
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="supplier-step success-step">
                        <CheckCircle size={64} color="#10b981" />
                        <h2>Application Submitted!</h2>
                        <p>Thank you for your interest. We have received your application and will contact you shortly if we see a fit.</p>
                        <button onClick={onClose} className="supplier-submit-btn" style={{ marginTop: '24px' }}>
                            Close
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .supplier-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 20px;
                }
                .supplier-modal-content {
                    background: #fff;
                    width: 100%;
                    max-width: 500px;
                    border-radius: 24px;
                    padding: 32px;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                    animation: slideUp 0.3s ease-out;
                }
                .supplier-close-btn {
                    position: absolute;
                    top: 24px; right: 24px;
                    background: #f1f5f9;
                    border: none;
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #64748b;
                }
                .supplier-close-btn:hover { background: #e2e8f0; color: #0f172a; }
                
                .supplier-step h2 {
                    margin: 0 0 12px 0;
                    color: #0f172a;
                    font-size: 1.5rem;
                    font-family: 'Outfit', sans-serif;
                }
                .supplier-step p {
                    margin: 0 0 24px 0;
                    color: #64748b;
                    line-height: 1.5;
                    font-size: 0.95rem;
                }
                
                .form-group {
                    margin-bottom: 16px;
                }
                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #334155;
                    margin-bottom: 8px;
                }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-family: inherit;
                    font-size: 0.95rem;
                    background: #f8fafc;
                    transition: all 0.2s;
                }
                .form-group input:focus, .form-group textarea:focus {
                    outline: none;
                    border-color: #6366f1;
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
                }

                .supplier-submit-btn {
                    width: 100%;
                    background: linear-gradient(135deg, #1a1c23 0%, #333 100%);
                    color: white;
                    border: none;
                    padding: 14px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 16px;
                }
                .supplier-submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .supplier-submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .supplier-back-btn {
                    width: 100%;
                    background: transparent;
                    color: #64748b;
                    border: none;
                    padding: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 8px;
                }
                .supplier-back-btn:hover { color: #0f172a; }

                .supplier-error {
                    background: #fef2f2;
                    color: #b91c1c;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                    font-size: 0.9rem;
                    border: 1px solid #fecaca;
                }

                .success-step {
                    text-align: center;
                    padding: 24px 0;
                }
                .success-step h2 {
                    margin-top: 24px;
                }

                .spin {
                    animation: spin 1s linear infinite;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
