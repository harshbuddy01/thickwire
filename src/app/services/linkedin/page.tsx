import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LinkedinPageClient from './LinkedinPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('linkedin');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'LinkedIn Premium — StreamKart' };
    }
}

export default async function LinkedinServicePage() {
    let service;
    try {
        service = await getServiceBySlug('linkedin');
    } catch {
        notFound();
    }

    return <LinkedinPageClient service={service} />;
}
