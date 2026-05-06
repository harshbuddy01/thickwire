'use client';

import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            background: '#ffffff',
            fontFamily: '"Times New Roman", Times, serif'
        }}>
            <div style={{
                background: '#f3f4f6',
                borderRadius: '32px',
                padding: '80px 40px',
                textAlign: 'center',
                maxWidth: '600px',
                width: '100%',
                border: 'none',
            }}>
                <div style={{ marginBottom: '32px' }}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1a1c23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                </div>
                
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1c23', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                    Service Coming Soon
                </h1>
                
                <p style={{ color: '#4b5563', fontSize: '1.2rem', marginBottom: '40px', lineHeight: 1.6 }}>
                    We are currently working with our elite suppliers to secure official and stable access for this service. Our team is ensuring that when it arrives, it meets our strict quality and best-price standards.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-block',
                            background: '#1a1c23',
                            color: 'white',
                            padding: '18px 48px',
                            borderRadius: '100px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        Return to Marketplace
                    </Link>
                    
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=support@streamkart.store&su=Service Availability Inquiry&body=I am interested in this service. Please let me know as soon as it becomes available on StreamKart.store."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '1rem',
                            color: '#1a1c23',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                    >
                        Contact our 24/7 Support Team
                    </a>
                </div>
            </div>
        </div>
    );
}
