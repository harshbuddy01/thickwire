import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import type { Metadata } from 'next';
import SpotifyPageClient from './SpotifyPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('spotify');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'Spotify Premium — StreamKart' };
    }
}

import { notFound } from 'next/navigation';

export default async function Page() {
    try {
        const service = await getServiceBySlug('spotify');
        if (!service) return notFound();
        return <SpotifyPageClient service={service} />;
    } catch (e) {
        return notFound();
    }
}
