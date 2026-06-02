'use client';

import { useState, useEffect } from 'react';
import ProgressiveImage from '@/components/ProgressiveImage';

import api from '@/lib/api';

const MINIO_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

const DEFAULT_SLIDES = [
    { id: 'def-1', src: `${MINIO_URL}/slider/slider1.png`, alt: 'Slide 1', link: '/' },
    { id: 'def-2', src: `${MINIO_URL}/slider/slider2.png`, alt: 'Slide 2', link: '/' },
    { id: 'def-3', src: `${MINIO_URL}/slider/slider3.png`, alt: 'Slide 3', link: '/' },
    { id: 'def-4', src: `${MINIO_URL}/slider/slider4.png`, alt: 'Slide 4', link: '/' }
];

export default function HeroSlider() {
    const [slidesList, setSlidesList] = useState<any[]>(DEFAULT_SLIDES);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    useEffect(() => {
        api.get('/home-banners')
            .then(({ data }) => {
                if (data && data.length > 0) {
                    setSlidesList(data.map((b: any) => ({
                        id: b.id,
                        src: b.imageUrl,
                        alt: 'Storefront Slide',
                        link: b.linkUrl || '/'
                    })));
                }
            })
            .catch((err) => {
                console.error('Failed to load dynamic home banners', err);
            });
    }, []);

    useEffect(() => {
        if (slidesList.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => {
                let next = prev + direction;
                
                // If we reach the end, reverse direction
                if (next === slidesList.length - 1) {
                    setDirection(-1);
                } else if (next === 0) {
                    setDirection(1);
                }
                
                return next;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [direction, slidesList]);

    if (slidesList.length === 0) return null;

    return (
        <div className="hero-slider" style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
            backgroundColor: '#111' 
        }}>
            {/* Sliding Container */}
            <div style={{
                display: 'flex',
                width: `${slidesList.length * 100}%`,
                height: 'auto',
                transform: `translateX(-${(current * 100) / slidesList.length}%)`,
                transition: 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)'
            }}>
                {slidesList.map((slide, idx) => (
                    <div 
                        key={slide.id} 
                        style={{ 
                            width: `${100 / slidesList.length}%`, 
                            height: 'auto',
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            if (slide.link && slide.link !== '/') {
                                window.location.href = slide.link;
                            }
                        }}
                    >
                        <img 
                            src={slide.src} 
                            alt={slide.alt} 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                display: 'block' 
                            }} 
                        />
                        
                        {/* Premium Glassy Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.1))',
                            pointerEvents: 'none'
                        }} />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            {slidesList.length > 1 && (
                <div className="slider-dots" style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    gap: '10px', 
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.2)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {slidesList.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            style={{
                                width: current === index ? '20px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                background: current === index ? '#fff' : 'rgba(255,255,255,0.4)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
