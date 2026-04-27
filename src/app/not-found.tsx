import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="status-container">
            <div className="status-card">
                <div className="status-icon pending" style={{ fontSize: '3rem' }}>
                    🔍
                </div>
                <h2>Page Not Found</h2>
                <p className="subtitle">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className="btn btn-primary" style={{ marginTop: 24 }}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
