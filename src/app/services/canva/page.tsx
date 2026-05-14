import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CanvaPageClient from './CanvaPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('canva');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Canva Edu — StreamKart' };
    }
}

export default async function CanvaServicePage() {
    let service;
    try {
        service = await getServiceBySlug('canva');
    } catch {
        notFound();
    }

    return <CanvaPageClient service={service} />;
}
