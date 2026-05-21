import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Premium Services & Subscriptions | StreamKart',
    description: 'Browse all premium subscriptions, accounts, and gift cards on StreamKart.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
