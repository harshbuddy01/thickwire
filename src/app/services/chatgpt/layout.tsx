import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ChatGPT Plus Subscription | StreamKart',
    description: 'Get official ChatGPT Plus access with instant delivery.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
