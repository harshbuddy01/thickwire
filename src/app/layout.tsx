import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import '@fontsource-variable/mona-sans';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import Script from 'next/script';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-outfit',
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
                <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap" rel="stylesheet" />
            </head>
            <body className={`${outfit.className} ${GeistSans.variable}`}>
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
