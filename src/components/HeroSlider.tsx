'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import ProgressiveImage from '@/components/ProgressiveImage';

import Link from 'next/link';

const MINIO_URL = 'https://bucket-production-6fef.up.railway.app/streamkart-assets';

const slides = [
    { id: 1, src: `${MINIO_URL}/slider/slider1.png`, alt: 'Slide 1', link: '/' },
    { id: 2, src: `${MINIO_URL}/slider/slider2.png`, alt: 'Slide 2', link: '/' },
    { id: 3, src: `${MINIO_URL}/slider/slider3.png`, alt: 'Slide 3', link: '/' },
    { id: 4, src: `${MINIO_URL}/slider/slider4.png`, alt: 'Slide 4', link: '/' }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-slider" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', aspectRatio: '2/1', backgroundColor: '#111' }}>
            {slides.map((slide, index) => (
                <div 
                    key={slide.id} 
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        opacity: current === index ? 1 : 0, 
                        transition: 'opacity 0.8s ease-in-out',
                        zIndex: current === index ? 1 : 0
                    }}
                >
                    {current === index && (
                        <ProgressiveImage src={slide.src} alt={slide.alt} priority={index === 0} />
                    )}
                </div>
            ))}

            <div className="slider-dots" style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        style={{
                            width: current === index ? '20px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            background: current === index ? '#6c5ce7' : 'rgba(255,255,255,0.4)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
