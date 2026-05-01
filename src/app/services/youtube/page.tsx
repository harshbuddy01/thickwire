import { getServiceBySlug } from '@/lib/api';
import type { Service } from '@/lib/types';
import type { Metadata } from 'next';
import YoutubePageClient from './YoutubePageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('youtube');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'YouTube Premium — StreamKart' };
    }
}

export default async function YoutubePage() {
    let service: Service;
    try {
        service = await getServiceBySlug('youtube');
    } catch {
        // Fallback mock data if API fails or service doesn't exist
        service = {
            id: 'mock-youtube',
            name: 'YouTube Premium',
            slug: 'youtube',
            logoUrl: null,
            description: 'Watch more. Ad-free. Background play and downloads.',
            displayOrder: 1,
            plans: [
                {
                    id: 'plan-yt-1',
                    name: '6 Months Plan',
                    slug: '6-months',
                    description: null,
                    price: '499',
                    originalPrice: null,
                    durationDays: 180,
                    displayOrder: 1,
                    inStock: true,
                    stockCount: 100
                },
                {
                    id: 'plan-yt-2',
                    name: '12 Months Plan',
                    slug: '12-months',
                    description: null,
                    price: '899',
                    originalPrice: null,
                    durationDays: 365,
                    displayOrder: 2,
                    inStock: true,
                    stockCount: 100
                },
                {
                    id: 'plan-yt-3',
                    name: '1 Year Plan',
                    slug: '1-year',
                    description: null,
                    price: '17',
                    originalPrice: null,
                    durationDays: 365,
                    displayOrder: 3,
                    inStock: true,
                    stockCount: 100
                }
            ]
        };
    }

    return <YoutubePageClient service={service} />;
}
