import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Support & Help Center | StreamKart',
    description: 'Get help with your subscriptions, payments, and orders. Create a support ticket and our team will get back to you shortly.',
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
