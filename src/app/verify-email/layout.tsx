import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Verify Email | StreamKart',
    description: 'Verify your email address to activate your StreamKart account.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
