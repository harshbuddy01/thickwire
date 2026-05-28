'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/lib/api';

interface WishlistButtonProps {
    service: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
        description?: string | null;
    };
}

export default function WishlistButton({ service }: WishlistButtonProps) {
    const { user } = useAuth();
    const [inWishlist, setInWishlist] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (user) {
            getWishlist()
                .then((list) => {
                    if (Array.isArray(list)) {
                        setInWishlist(list.some((item: any) => item.slug === service.slug));
                    }
                })
                .catch(() => {
                    loadFromLocalStorage();
                });
        } else {
            loadFromLocalStorage();
        }
    }, [service.slug, user]);

    const loadFromLocalStorage = () => {
        const stored = localStorage.getItem('streamkart_wishlist');
        if (stored) {
            try {
                const list = JSON.parse(stored);
                const exists = list.some((item: any) => item.slug === service.slug);
                setInWishlist(exists);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleToggle = async () => {
        if (user) {
            try {
                if (inWishlist) {
                    await removeFromWishlist(service.slug);
                    setInWishlist(false);
                } else {
                    const newItem = {
                        id: service.id,
                        name: service.name,
                        slug: service.slug,
                        logoUrl: service.logoUrl,
                        description: service.description
                    };
                    await addToWishlist(newItem);
                    setInWishlist(true);
                }
                return;
            } catch (err) {
                console.warn('Backend wishlist update failed, falling back to local storage', err);
            }
        }

        const stored = localStorage.getItem('streamkart_wishlist');
        let list = [];
        if (stored) {
            try {
                list = JSON.parse(stored);
            } catch (e) {
                console.error(e);
            }
        }

        let updatedList;
        if (inWishlist) {
            updatedList = list.filter((item: any) => item.slug !== service.slug);
            setInWishlist(false);
        } else {
            const newItem = {
                id: service.id,
                name: service.name,
                slug: service.slug,
                logoUrl: service.logoUrl,
                description: service.description
            };
            updatedList = [...list, newItem];
            setInWishlist(true);
        }
        localStorage.setItem('streamkart_wishlist', JSON.stringify(updatedList));
    };

    if (!mounted) {
        return (
            <button
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Outfit, sans-serif'
                }}
            >
                <Heart size={18} />
                Add to Wishlist
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: inWishlist ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                border: inWishlist ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.25)',
                padding: '10px 24px',
                borderRadius: '30px',
                color: inWishlist ? '#f43f5e' : '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'Outfit, sans-serif',
                boxShadow: inWishlist ? '0 4px 15px rgba(244, 63, 94, 0.1)' : 'none'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.background = inWishlist ? 'rgba(244, 63, 94, 0.3)' : 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = inWishlist ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.15)';
            }}
        >
            <Heart size={18} fill={inWishlist ? '#f43f5e' : 'none'} />
            {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
    );
}
