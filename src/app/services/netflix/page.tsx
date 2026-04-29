import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NetflixPageClient from './NetflixPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('netflix');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Netflix — StreamKart' };
    }
}

export default async function NetflixPage() {
    let service: Service;
    try {
        service = await getServiceBySlug('netflix');
    } catch {
        notFound();
    }

    return <NetflixPageClient service={service} />;
}
