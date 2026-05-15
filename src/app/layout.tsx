import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import Script from 'next/script';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'StreamKart — Your Digital World, One Place',
    description:
        'Instantly buy premium digital services. Secure, automated delivery with 24/7 support.',
    openGraph: {
        title: 'StreamKart — Your Digital World, One Place',
        description: 'Instantly buy premium digital services. Secure, automated delivery.',
        type: 'website',
    },
    icons: {
        icon: '/favicon.png',
        apple: '/favicon.png',
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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://assets.streamkart.store" />
            </head>
            <body className={poppins.className}>
                <AuthProvider>
                    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
