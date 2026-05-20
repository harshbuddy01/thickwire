import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 1. Clickjacking Protection
    response.headers.set('X-Frame-Options', 'DENY');

    // 2. MIME type sniffing mitigation
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // 3. Referrer control
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 4. XSS Protection for older browsers
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // 5. Content Security Policy (CSP)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const apiHost = apiUrl.startsWith('http') ? new URL(apiUrl).origin : '';

    const cspRules = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
        `img-src 'self' data: blob: https://assets.streamkart.store https://*.streamkart.store https://*.googleusercontent.com`,
        `media-src 'self' data: blob: https://assets.streamkart.store https://*.streamkart.store`,
        "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com",
        `connect-src 'self' ${apiHost} http://localhost:3001 https://api.streamkart.store https://api.razorpay.com`,
        "frame-src 'self' https://checkout.razorpay.com https://api.razorpay.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
    ];

    response.headers.set('Content-Security-Policy', cspRules.join('; '));

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
