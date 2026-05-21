import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up & Create Account | StreamKart',
    description: 'Join StreamKart to buy premium streaming accounts and subscriptions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
