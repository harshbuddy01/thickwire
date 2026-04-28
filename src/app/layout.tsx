import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'StreamKart — Your Digital World, One Place',
    description:
        'Instantly buy premium digital services. Secure, automated delivery with 24/7 support.',
    openGraph: {
        title: 'StreamKart — Your Digital World, One Place',
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
                </AuthProvider>
            </body>
        </html>
    );
}

