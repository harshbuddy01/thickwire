'use client';

import { useState, useEffect } from 'react';
import ProgressiveImage from '@/components/ProgressiveImage';

const MINIO_URL = 'https://assets.streamkart.store/streamkart-assets';

const slides = [
    { id: 1, src: `${MINIO_URL}/slider/slider1.png`, alt: 'Slide 1', link: '/' },
    { id: 2, src: `${MINIO_URL}/slider/slider2.png`, alt: 'Slide 2', link: '/' },
    { id: 3, src: `${MINIO_URL}/slider/slider3.png`, alt: 'Slide 3', link: '/' },
    { id: 4, src: `${MINIO_URL}/slider/slider4.png`, alt: 'Slide 4', link: '/' }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => {
                let next = prev + direction;
                
                // If we reach the end, reverse direction
                if (next === slides.length - 1) {
                    setDirection(-1);
                } else if (next === 0) {
                    setDirection(1);
                }
                
                return next;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [direction]);

    return (
        <div className="hero-slider" style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
            aspectRatio: '2/1', 
            backgroundColor: '#111' 
        }}>
            {/* Sliding Container */}
            <div style={{
                display: 'flex',
                width: `${slides.length * 100}%`,
                height: '100%',
                transform: `translateX(-${(current * 100) / slides.length}%)`,
                transition: 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)'
            }}>
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        style={{ 
                            width: `${100 / slides.length}%`, 
                            height: '100%',
                            position: 'relative'
                        }}
                    >
                        <ProgressiveImage src={slide.src} alt={slide.alt} priority={slide.id === 1} />
                        
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
                {slides.map((_, index) => (
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
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
