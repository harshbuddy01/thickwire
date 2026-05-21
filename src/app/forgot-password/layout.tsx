import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Forgot Password | StreamKart',
    description: 'Reset your account password securely.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
