import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DisneyPageClient from './DisneyPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('disney');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Disney+ Hotstar — StreamKart' };
    }
}

export default async function DisneyServicePage() {
    let service;
    try {
        service = await getServiceBySlug('disney');
    } catch {
        notFound();
    }

    return <DisneyPageClient service={service} />;
}
