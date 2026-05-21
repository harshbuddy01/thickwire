import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In & Login | StreamKart',
    description: 'Log in to your StreamKart account to manage subscriptions and view orders.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
