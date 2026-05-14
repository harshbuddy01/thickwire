import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JioHotstarPageClient from './JioHotstarPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('jiohotstar');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'JioHotstar Premium — StreamKart' };
    }
}

export default async function JioHotstarServicePage() {
    let service;
    try {
        service = await getServiceBySlug('jiohotstar');
    } catch {
        notFound();
    }

    return <JioHotstarPageClient service={service} />;
}
