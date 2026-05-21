import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Order Details | StreamKart',
    description: 'View your order status and details on StreamKart.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
