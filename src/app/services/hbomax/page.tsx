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

export default async function HboPage() {
    let service: Service;
    try {
        service = await getServiceBySlug('hbomax');
    } catch {
        // Fallback mock data if API fails or service doesn't exist
        service = {
            id: 'mock-hbo',
            name: 'HBO Max',
            slug: 'hbo',
            logoUrl: null,
            description: 'Iconic stories. Unforgettable entertainment.',
            displayOrder: 1,
            plans: [
                {
                    id: 'plan-hbo-1',
                    name: '3 Months Plan',
                    slug: '3-months',
                    description: null,
                    price: '5',
                    originalPrice: null,
                    durationDays: 90,
                    displayOrder: 1,
                    inStock: true,
                    stockCount: 100
                },
                {
                    id: 'plan-hbo-2',
                    name: '6 Months Plan',
                    slug: '6-months',
                    description: null,
                    price: '10',
                    originalPrice: null,
                    durationDays: 180,
                    displayOrder: 2,
                    inStock: true,
                    stockCount: 100
                },
                {
                    id: 'plan-hbo-3',
                    name: '12 Months Plan',
                    slug: '12-months',
                    description: null,
                    price: '18',
                    originalPrice: null,
                    durationDays: 365,
                    displayOrder: 3,
                    inStock: true,
                    stockCount: 100
                }
            ]
        };
    }

    return <HboPageClient service={service} />;
}
