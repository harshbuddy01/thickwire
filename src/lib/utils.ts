const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export function formatCdnUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    const base = CDN_URL.endsWith('/') ? CDN_URL.slice(0, -1) : CDN_URL;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
}
