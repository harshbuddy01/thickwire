import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 28,
                padding: '60px 40px',
                textAlign: 'center',
                maxWidth: 440,
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0',
            }}>
                <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>🔍</div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a1c23', marginBottom: 10 }}>Page Not Found</h2>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 28, lineHeight: 1.6 }}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        background: '#6c5ce7',
                        color: 'white',
                        padding: '14px 32px',
                        borderRadius: 14,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                    }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
