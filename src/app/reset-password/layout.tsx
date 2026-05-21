import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password | StreamKart',
    description: 'Set a new password for your StreamKart account.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
