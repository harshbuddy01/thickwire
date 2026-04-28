'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import Link from 'next/link';

const slides = [
    { id: 1, src: '/images/slider/slider1.png', alt: 'Slide 1', link: '/' },
    { id: 2, src: '/images/slider/slider2.png', alt: 'Slide 2', link: '/' },
    { id: 3, src: '/images/slider/slider3.png', alt: 'Slide 3', link: '/' },
    { id: 4, src: '/images/slider/slider4.png', alt: 'Slide 4', link: '/' }
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
        <div className="hero-slider" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', aspectRatio: '2/1', backgroundColor: '#000' }}>
            <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${current * 100}%)`, width: `${slides.length * 100}%`, height: '100%' }}>
                {slides.map((slide) => (
                    <div key={slide.id} style={{ position: 'relative', width: `${100 / slides.length}%`, height: '100%', flexShrink: 0 }}>
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <div className="slider-dots" style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        style={{
                            width: current === index ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: current === index ? '#6c5ce7' : 'rgba(255,255,255,0.5)',
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
