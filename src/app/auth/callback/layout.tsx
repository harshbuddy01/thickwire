import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authenticating | StreamKart',
    description: 'Verifying credentials and logging in.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
