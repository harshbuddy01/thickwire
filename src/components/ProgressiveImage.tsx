'use client';

import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ProgressiveImage({ src, alt, className, style, ...props }: ProgressiveImageProps) {
    const [progress, setProgress] = useState(0);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const xhr = new XMLHttpRequest();

        xhr.open('GET', src, true);
        xhr.responseType = 'blob';

        xhr.onprogress = (event) => {
            if (event.lengthComputable && isMounted) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200 && isMounted) {
                const url = URL.createObjectURL(xhr.response);
                setBlobUrl(url);
                setProgress(100);
            } else if (isMounted) {
                setError(true);
            }
        };

        xhr.onerror = () => {
            if (isMounted) setError(true);
        };

        xhr.send();

        return () => {
            isMounted = false;
            xhr.abort();
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [src]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...style }} className={className}>
            {/* The Image */}
            {blobUrl && (
                <img
                    src={blobUrl}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: blobUrl ? 1 : 0,
                        ...style
                    }}
                    {...props}
                />
            )}

            {/* Circular Progress Loader */}
            {!blobUrl && !error && (
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="60" height="60" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background Circle */}
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        {/* Progress Circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#6c5ce7"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray="251.2" /* 2 * pi * 40 */
                            strokeDashoffset={251.2 - (251.2 * progress) / 100}
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div style={{ position: 'absolute', fontSize: '0.8rem', fontWeight: 800, color: '#6c5ce7', fontFamily: 'Outfit, sans-serif' }}>
                        {progress}%
                    </div>
                </div>
            )}

            {/* Error Fallback */}
            {error && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>Failed to load</div>
            )}
        </div>
    );
}
