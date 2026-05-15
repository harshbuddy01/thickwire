'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';
import {
    Search, ShoppingCart, Heart, User, LogOut,
    Wallet, LayoutGrid, Package, HeadphonesIcon,
    Home, Grid, X
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { getServices, getAbandonedCart } from '@/lib/api';
import type { Service } from '@/lib/types';
import SupplierModal from './SupplierModal';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [supplierModalOpen, setSupplierModalOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [suggestions, setSuggestions] = useState<Service[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [abandonedCart, setAbandonedCart] = useState<any>(null);

    useEffect(() => {
        getServices().then(setServices).catch(console.error);
        
        if (user) {
            getAbandonedCart().then(data => setAbandonedCart(data)).catch(() => setAbandonedCart(null));
        } else {
            setAbandonedCart(null);
        }
        
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fuse = useMemo(() => new Fuse(services, {
        keys: ['name', 'description'],
        threshold: 0.4,
    }), [services]);

    const handleSearchInput = (query: string) => {
        setSearchQuery(query);
        if (query.trim().length > 1) {
            const results = fuse.search(query);
            setSuggestions(results.slice(0, 5).map(r => r.item));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    if (pathname === '/checkout') return null;

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <>
            {/* ─── Abandoned Cart Banner ───────────────────────────────── */}
            {abandonedCart && (
                <div style={{ background: '#b87a1d', color: '#fff', padding: '12px 16px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 1000, position: 'relative' }}>
                    <ShoppingCart size={16} />
                    <span>You left <strong>{abandonedCart.serviceName} — {abandonedCart.planName}</strong> in your cart!</span>
                    <Link href={`/order/${abandonedCart.id}`} style={{ background: '#fff', color: '#b87a1d', padding: '4px 12px', borderRadius: '20px', textDecoration: 'none', marginLeft: '12px', fontSize: '0.85rem' }}>
                        Complete Purchase
                    </Link>
                </div>
            )}

            {/* ─── Top Bar ─────────────────────────────────────────── */}
            <div className="header-top">
                <div className="container">
                    <Link href="/" className="nav-logo-group" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', position: 'relative', flexShrink: 0 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#b87a1d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                                <circle cx="9" cy="21" r="1.5" stroke="none" fill="#b87a1d" />
                                <circle cx="20" cy="21" r="1.5" stroke="none" fill="#b87a1d" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                <polygon points="10 9 15 12 10 15 10 9" fill="#b87a1d" stroke="none" />
                            </svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                margin: 0,
                                lineHeight: 1,
                                letterSpacing: '-0.8px',
                                color: '#1a1c23',
                                display: 'block'
                            }}>
                                Stream<span style={{ color: '#b87a1d' }}>Kart</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop search */}
                    <div className="search-container relative" ref={searchRef}>
                        <select className="search-cat-dropdown">
                            <option>All Categories</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search for products, tools and more..."
                            className="search-main-input"
                            value={searchQuery}
                            onChange={(e) => handleSearchInput(e.target.value)}
                            onFocus={() => { if (searchQuery.length > 1) setShowSuggestions(true); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    setShowSuggestions(false);
                                    router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                        <button
                            className="search-trigger"
                            onClick={() => {
                                if (searchQuery.trim()) {
                                    setShowSuggestions(false);
                                    router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        >
                            <Search size={18} />
                        </button>

                        {/* Desktop Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="search-suggestions-dropdown">
                                {suggestions.map(item => (
                                    <div 
                                        key={item.id} 
                                        className="search-suggestion-item"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setShowSuggestions(false);
                                            router.push(`/services/${item.slug}`);
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {item.logoUrl ? (
                                                <div style={{ position: 'relative', width: 24, height: 24, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                                                    <Image 
                                                        src={item.logoUrl} 
                                                        alt={item.name} 
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </div>
                                            ) : (
                                                <Search size={16} color="#999" />
                                            )}
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>{item.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="nav-icons-group">
                        <button 
                            className="mobile-hide"
                            onClick={() => setSupplierModalOpen(true)}
                            style={{
                                background: 'linear-gradient(135deg, #b87a1d, #d4af37)',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                marginRight: '16px',
                                transition: 'transform 0.2s',
                                fontFamily: "'Outfit', sans-serif"
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Become a Supplier
                        </button>

                        {/* Mobile: search toggle */}
                        <button
                            className="header-icon-link mobile-search-toggle"
                            onClick={() => setSearchOpen(!searchOpen)}
                            style={{ border: 'none', cursor: 'pointer', background: 'none' }}
                            aria-label="Search"
                        >
                            {searchOpen ? <X size={18} /> : <Search size={18} />}
                        </button>

                        <Link href="/account" className="header-icon-link" aria-label="Cart">
                            <ShoppingCart size={20} />
                        </Link>

                        {/* Heart: hidden on mobile via CSS */}
                        <Link href="/account" className="header-icon-link mobile-hide" aria-label="Wishlist">
                            <Heart size={20} />
                        </Link>

                        <div style={{ position: 'relative' }} ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`header-icon-link user-btn ${menuOpen ? 'active' : ''}`}
                                style={{ 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    background: menuOpen ? '#f1f5f9' : 'transparent',
                                    borderRadius: '12px',
                                    transition: 'all 0.2s'
                                }}
                                aria-label="Account"
                            >
                                <User size={20} />
                            </button>

                            {menuOpen && (
                                <div className="user-dropdown-premium" style={dropdownStyles.menu}>
                                    {!loading && !user ? (
                                        <>
                                            <div style={dropdownStyles.menuHeader}>
                                                <div style={{ width: 40, height: 40, background: '#fff9f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, color: '#b87a1d' }}>
                                                    <User size={20} />
                                                </div>
                                                <p style={dropdownStyles.menuTitle}>Welcome to StreamKart</p>
                                                <p style={dropdownStyles.menuSubtitle}>Join our premium community</p>
                                            </div>
                                            <div style={{ padding: '8px 16px 16px' }}>
                                                <Link href="/login" onClick={() => setMenuOpen(false)} style={{
                                                    ...dropdownStyles.primaryBtn,
                                                    background: '#1a1c23',
                                                    marginBottom: 8
                                                }}>
                                                    Login
                                                </Link>
                                                <Link href="/signup" onClick={() => setMenuOpen(false)} style={{
                                                    ...dropdownStyles.primaryBtn,
                                                    background: '#b87a1d',
                                                }}>
                                                    Sign Up
                                                </Link>
                                            </div>
                                            <div style={dropdownStyles.menuDivider} />
                                            <Link href="/support" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                <HeadphonesIcon size={16} style={{ opacity: 0.6 }} /> Help Center
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div style={dropdownStyles.menuHeader}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                                    <div style={{ width: 36, height: 36, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#1a1c23' }}>
                                                        {user?.name?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p style={dropdownStyles.menuTitle}>{user?.name}</p>
                                                        <p style={dropdownStyles.menuSubtitle}>{user?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={dropdownStyles.menuDivider} />
                                            <Link href="/account" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                <Package size={16} style={{ opacity: 0.6 }} /> My Account
                                            </Link>
                                            <Link href="/account" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                <Wallet size={16} style={{ opacity: 0.6 }} /> Wallet Balance
                                            </Link>
                                            <div style={dropdownStyles.menuDivider} />
                                            <button
                                                onClick={() => { setMenuOpen(false); logout(); }}
                                                style={{ ...dropdownStyles.menuItem, color: '#ef4444', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
                                            >
                                                <LogOut size={16} /> Log Out
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile inline search — slides down when open */}
                <div className={`mobile-search-bar ${searchOpen ? 'mobile-search-bar--open' : ''}`}>
                    <div className="container">
                        <div className="mobile-search-inner relative">
                            <Search size={16} className="mobile-search-icon" />
                            <input
                                type="text"
                                placeholder="Search Netflix, Spotify, ChatGPT..."
                                className="mobile-search-input"
                                value={searchQuery}
                                onChange={(e) => handleSearchInput(e.target.value)}
                                onFocus={() => { if (searchQuery.length > 1) setShowSuggestions(true); }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        setSearchOpen(false);
                                        setShowSuggestions(false);
                                        router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                    }
                                }}
                                autoFocus={searchOpen}
                            />
                            {/* Mobile Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && searchOpen && (
                                <div className="search-suggestions-dropdown mobile-suggestions">
                                    {suggestions.map(item => (
                                        <div 
                                            key={item.id} 
                                            className="search-suggestion-item"
                                            onClick={() => {
                                                setSearchQuery('');
                                                setShowSuggestions(false);
                                                setSearchOpen(false);
                                                router.push(`/services/${item.slug}`);
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                {item.logoUrl ? (
                                                    <div style={{ position: 'relative', width: 24, height: 24, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                                                        <Image 
                                                            src={item.logoUrl} 
                                                            alt={item.name} 
                                                            fill
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Search size={16} color="#999" />
                                                )}
                                                <div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>{item.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Desktop Sub-nav (logged-in only) ───────────────── */}
            {user && (
                <div className="sub-nav-wrapper">
                    <div className="container">
                        <div className="sub-nav-bar">
                            <Link href="/account" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-wallet"><Wallet size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>My Wallet</strong>
                                    <span>—</span>
                                </div>
                            </Link>
                            <Link href="/account" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-dashboard"><LayoutGrid size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Dashboard</strong>
                                    <span>My Account</span>
                                </div>
                            </Link>
                            <Link href="/account" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-orders"><Package size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Orders</strong>
                                    <span>Track & View</span>
                                </div>
                            </Link>
                            <Link href="/account" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-wishlist"><Heart size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Wishlist</strong>
                                    <span>Saved Items</span>
                                </div>
                            </Link>
                            <Link href="/support" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-support"><HeadphonesIcon size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Support</strong>
                                    <span>24/7 Help</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Mobile Bottom Tab Nav ───────────────────────────── */}
            <nav className="mobile-bottom-nav" aria-label="Main navigation">
                <Link href="/" className={`mobile-nav-item ${isActive('/') && pathname === '/' ? 'mobile-nav-item--active' : ''}`}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>Home</span>
                </Link>

                <Link href="/streaming" className={`mobile-nav-item ${isActive('/streaming') ? 'mobile-nav-item--active' : ''}`}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="7" width="20" height="15" rx="2" />
                        <polyline points="17 2 12 7 7 2" />
                    </svg>
                    <span>Browse</span>
                </Link>

                <Link href="/account" className={`mobile-nav-item ${isActive('/account') ? 'mobile-nav-item--active' : ''}`}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <span>Orders</span>
                </Link>

                <Link href="/support" className={`mobile-nav-item ${isActive('/support') ? 'mobile-nav-item--active' : ''}`}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Support</span>
                </Link>

                <Link href={user ? '/account' : '/login'} className={`mobile-nav-item ${isActive('/login') || isActive('/signup') ? 'mobile-nav-item--active' : ''}`}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>{user ? 'Account' : 'Login'}</span>
                </Link>
            </nav>

            {supplierModalOpen && (
                <SupplierModal onClose={() => setSupplierModalOpen(false)} />
            )}
        </>
    );
}

const dropdownStyles: { [key: string]: React.CSSProperties } = {
    menu: {
        position: 'absolute',
        right: 0,
        top: 'calc(100% + 15px)',
        width: 280,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: 24,
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
        padding: '8px 0',
        zIndex: 100,
        overflow: 'hidden',
        animation: 'dropdownAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    menuHeader: { padding: '20px 24px 12px' },
    menuTitle: { fontSize: '1rem', fontWeight: 800, color: '#1a1c23', marginBottom: 2, fontFamily: 'Outfit, sans-serif' },
    menuSubtitle: { fontSize: '0.8rem', color: '#64748b', fontFamily: 'Outfit, sans-serif' },
    menuDivider: { height: 1, background: '#f1f5f9', margin: '8px 0' },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 24px',
        fontSize: '0.9rem',
        color: '#334155',
        textDecoration: 'none',
        transition: 'all 0.2s',
        fontWeight: 600,
        fontFamily: 'Outfit, sans-serif',
    },
    primaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        borderRadius: '14px',
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.9rem',
        textDecoration: 'none',
        transition: 'transform 0.2s, opacity 0.2s',
        fontFamily: 'Outfit, sans-serif',
    }
};
