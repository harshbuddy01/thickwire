import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Google Gemini Pro Subscription | StreamKart',
    description: 'Get official Google Gemini Pro access with instant delivery.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
