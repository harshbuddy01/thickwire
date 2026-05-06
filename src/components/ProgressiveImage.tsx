'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    priority?: boolean;
    fill?: boolean;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function ProgressiveImage({ src, alt, className, style, priority, fill = true, objectFit = 'cover' }: ProgressiveImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div 
            style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden', 
                background: '#f0f0f5',
                ...(style || {})
            }} 
            className={className}
        >
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

            <Image
                src={src}
                alt={alt}
                fill={fill}
                priority={priority}
                className={className}
                style={{
                    objectFit: objectFit,
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    ...(style || {}),
                }}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
