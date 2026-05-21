import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | StreamKart',
    description: 'Find answers to common questions about StreamKart subscriptions, delivery, and payments.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
