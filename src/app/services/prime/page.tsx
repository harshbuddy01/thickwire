import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PrimePageClient from './PrimePageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('prime');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Prime Video — StreamKart' };
    }
}

export default async function PrimePage() {
    let service: Service;
    try {
        service = await getServiceBySlug('prime');
    } catch {
        notFound();
    }

    return <PrimePageClient service={service} />;
}
