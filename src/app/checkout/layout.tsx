import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Secure Checkout | StreamKart',
    description: 'Complete your payment securely and get instant access to your premium subscription.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
