import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CapCutPageClient from './CapCutPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('capcut');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'CapCut PRO — StreamKart' };
    }
}

export default async function CapCutServicePage() {
    let service;
    try {
        service = await getServiceBySlug('capcut');
    } catch {
        // dynamic error handling or logging
    }

    if (!service) {
        notFound();
    }

    return <CapCutPageClient service={service} />;
}
