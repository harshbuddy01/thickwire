import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NordVpnPageClient from './NordVpnPageClient';

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
    try {
        const service = await getServiceBySlug('nord-vpn');
        return {
            title: `${service.name} — StreamKart`,
            description: service.description || `Buy ${service.name} from StreamKart with instant delivery`,
        };
    } catch {
        return { title: 'NordVPN — StreamKart' };
    }
}

export default async function NordVpnServicePage() {
    let service;
    try {
        service = await getServiceBySlug('nord-vpn');
    } catch {
        notFound();
    }

    return <NordVpnPageClient service={service} />;
}
