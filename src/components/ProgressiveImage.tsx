'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ProgressiveImage({ src, alt, className, style }: ProgressiveImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Reset when src changes
        setLoaded(false);
        setError(false);

        const img = new window.Image();
        img.src = src;
        img.onload = () => setLoaded(true);
        img.onerror = () => setError(true);

        // If already cached by browser, it fires synchronously
        if (img.complete) setLoaded(true);
    }, [src]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#f0f0f5' }} className={className}>
            {/* Shimmer skeleton — shown while loading */}
            {!loaded && !error && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, #f0f0f5 25%, #e4e4ef 50%, #f0f0f5 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    zIndex: 1,
                }} />
            )}

            {/* Actual image */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    ...(style || {}),
                }}
            />

            {/* Error state */}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#aaa', fontSize: '0.75rem', background: '#f5f5f5'
                }}>
                    Failed to load
                </div>
            )}
        </div>
    );
}
