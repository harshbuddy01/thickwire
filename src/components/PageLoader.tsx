'use client';

import { useState, useEffect } from 'react';

const CRITICAL_IMAGES = [
    'https://bucket-production-6fef.up.railway.app/streamkart-assets/netflix_3d.png',
    'https://bucket-production-6fef.up.railway.app/streamkart-assets/chatgpt_3d.png',
    'https://bucket-production-6fef.up.railway.app/streamkart-assets/jiohotstar_3d.png',
    'https://bucket-production-6fef.up.railway.app/streamkart-assets/sonyliv_3d.png',
    'https://bucket-production-6fef.up.railway.app/streamkart-assets/slider/slider1.png',
];

export default function PageLoader() {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let loaded = 0;
        const total = CRITICAL_IMAGES.length;

        // Animate progress smoothly from 0 → 85% while images load
        const tick = setInterval(() => {
            setProgress(p => {
                if (p < 85) return p + 1;
                clearInterval(tick);
                return p;
            });
        }, 20);

        // Load all critical images
        CRITICAL_IMAGES.forEach(src => {
            const img = new window.Image();
            img.onload = img.onerror = () => {
                loaded++;
                const pct = Math.round((loaded / total) * 100);
                setProgress(pct);
                if (loaded === total) {
                    clearInterval(tick);
                    setProgress(100);
                    // Small delay so user sees 100%, then fade out
                    setTimeout(() => {
                        setDone(true);
                        setTimeout(() => setHidden(true), 500);
                    }, 300);
                }
            };
            img.src = src;
        });

        return () => clearInterval(tick);
    }, []);

    if (hidden) return null;

    const circumference = 2 * Math.PI * 45; // r=45

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0d0d1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            opacity: done ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: done ? 'none' : 'all',
        }}>
            {/* Logo / Brand */}
            <div style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#fff',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.5px',
                marginBottom: '8px',
            }}>
                Stream<span style={{ color: '#6c5ce7' }}>Kart</span>
            </div>

            {/* Circular progress */}
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Track */}
                    <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    {/* Progress */}
                    <circle
                        cx="60" cy="60" r="45"
                        fill="none"
                        stroke="url(#grad)"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * progress) / 100}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                    />
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6c5ce7" />
                            <stop offset="100%" stopColor="#a29bfe" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Percentage text */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#fff',
                    fontFamily: 'Outfit, sans-serif',
                }}>
                    {progress}%
                </div>
            </div>

            {/* Status text */}
            <div style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.8rem',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '0.5px',
            }}>
                {progress < 100 ? 'Loading your experience...' : 'Ready!'}
            </div>
        </div>
    );
}
