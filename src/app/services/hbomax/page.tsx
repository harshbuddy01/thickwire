import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import type { Metadata } from 'next';
import HboPageClient from './HboPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('hbomax');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'HBO Max — StreamKart' };
    }
}

import { notFound } from 'next/navigation';

export default async function Page() {
    let service;
    try {
        service = await getServiceBySlug('hbomax');
    } catch (e) {
        // dynamic error handling or logging
    }

    if (!service) {
        notFound();
    }

    return <HboPageClient service={service} />;
}
