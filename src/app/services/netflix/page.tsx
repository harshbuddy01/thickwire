import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
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

import { notFound } from 'next/navigation';

export default async function Page() {
    try {
        const service = await getServiceBySlug('netflix');
        if (!service) return notFound();
        return <NetflixPageClient service={service} />;
    } catch (e) {
        return notFound();
    }
}
