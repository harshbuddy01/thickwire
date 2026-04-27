import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'ThickWire — Premium Digital Marketplace',
    description:
        'Instantly buy premium digital services. Secure, automated delivery with 24/7 support.',
    openGraph: {
        title: 'ThickWire — Premium Digital Marketplace',
        description: 'Instantly buy premium digital services. Secure, automated delivery.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}

// ─── Footer ─────────────────────────────────────────────

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="/" className="logo">ThickWire</a>
                        <p>
                            Premium digital marketplace with instant automated delivery.
                            Trusted by thousands of customers.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/#services">Services</a></li>
                            <li><a href="/support">Support</a></li>
                            <li><a href="/#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Refund Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="mailto:support@thickwire.com">support@thickwire.com</a></li>
                            <li><a href="/support">Create Ticket</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} ThickWire. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
