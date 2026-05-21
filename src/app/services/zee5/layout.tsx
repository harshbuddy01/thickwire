import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zee5 Premium Subscription | StreamKart',
    description: 'Get official Zee5 Premium access with instant delivery.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
