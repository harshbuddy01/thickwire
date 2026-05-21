import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SonyLIV Premium Subscription | StreamKart',
    description: 'Get official SonyLIV Premium access with instant delivery.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
