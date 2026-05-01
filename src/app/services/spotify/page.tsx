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

export default async function SpotifyPage() {
    let service: Service;
    try {
        service = await getServiceBySlug('spotify');
    } catch {
        // Fallback mock data if API fails or service doesn't exist
        service = {
            id: 'mock-spotify',
            name: 'Spotify Premium',
            slug: 'spotify',
            logoUrl: null,
            description: 'Listen without limits. Anytime, anywhere.',
            displayOrder: 1,
            plans: [
                {
                    id: 'plan-1',
                    name: '3 Months Plan',
                    slug: '3-months',
                    description: null,
                    price: '149',
                    originalPrice: null,
                    durationDays: 90,
                    displayOrder: 1,
                    inStock: true,
                    stockCount: 100
                },
                {
                    id: 'plan-2',
                    name: '12 Months Plan',
                    slug: '12-months',
                    description: null,
                    price: '26',
                    originalPrice: null,
                    durationDays: 365,
                    displayOrder: 2,
                    inStock: true,
                    stockCount: 100
                }
            ]
        };
    }

    return <SpotifyPageClient service={service} />;
}
