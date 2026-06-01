/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
        remotePatterns: [
            { protocol: 'https', hostname: '**' },
        ],
    },
    async headers() {
        return [
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        return [
            {
                source: '/api/:path*',
                destination: `${apiUrl}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
