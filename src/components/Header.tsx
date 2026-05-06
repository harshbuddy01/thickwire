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
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    if (pathname === '/checkout') return null;

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <>
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
                    <div className="search-container">
                        <select className="search-cat-dropdown">
                            <option>All Categories</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search for products, tools and more..."
                            className="search-main-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                        <button
                            className="search-trigger"
                            onClick={() => {
                                if (searchQuery.trim()) {
                                    router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        >
                            <Search size={18} />
                        </button>
                    </div>

                    <div className="nav-icons-group">
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

                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="header-icon-link user-btn"
                                style={{ border: 'none', cursor: 'pointer' }}
                                aria-label="Account"
                            >
                                <User size={20} />
                            </button>

                            {menuOpen && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }}
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    <div style={dropdownStyles.menu}>
                                        {!loading && !user ? (
                                            <>
                                                <div style={dropdownStyles.menuHeader}>
                                                    <p style={dropdownStyles.menuTitle}>Welcome to StreamKart</p>
                                                    <p style={dropdownStyles.menuSubtitle}>Login for the best experience</p>
                                                </div>
                                                <div style={dropdownStyles.menuDivider} />
                                                <Link href="/login" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>Login</Link>
                                                <Link href="/signup" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>Sign Up</Link>
                                            </>
                                        ) : (
                                            <>
                                                <div style={dropdownStyles.menuHeader}>
                                                    <p style={dropdownStyles.menuTitle}>{user?.name}</p>
                                                    <p style={dropdownStyles.menuSubtitle}>{user?.email}</p>
                                                </div>
                                                <div style={dropdownStyles.menuDivider} />
                                                <Link href="/account" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>My Account</Link>
                                                <div style={dropdownStyles.menuDivider} />
                                                <button
                                                    onClick={() => { setMenuOpen(false); logout(); }}
                                                    style={{ ...dropdownStyles.menuItem, color: '#ef4444', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Outfit, sans-serif' }}
                                                >
                                                    <LogOut size={14} /> Log Out
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile inline search — slides down when open */}
                <div className={`mobile-search-bar ${searchOpen ? 'mobile-search-bar--open' : ''}`}>
                    <div className="container">
                        <div className="mobile-search-inner">
                            <Search size={16} className="mobile-search-icon" />
                            <input
                                type="text"
                                placeholder="Search Netflix, Spotify, ChatGPT..."
                                className="mobile-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
                                        setSearchOpen(false);
                                    }
                                }}
                                autoFocus={searchOpen}
                            />
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
        </>
    );
}

const dropdownStyles: { [key: string]: React.CSSProperties } = {
    menu: {
        position: 'absolute',
        right: 0,
        marginTop: 12,
        width: 240,
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: 18,
        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        padding: '8px 0',
        zIndex: 50,
        overflow: 'hidden',
    },
    menuHeader: { padding: '14px 18px' },
    menuTitle: { fontSize: '0.85rem', fontWeight: 700, color: '#1a1c23', marginBottom: 2 },
    menuSubtitle: { fontSize: '0.75rem', color: '#999' },
    menuDivider: { height: 1, background: '#f3f4f6', margin: '2px 0' },
    menuItem: {
        display: 'block',
        padding: '11px 18px',
        fontSize: '0.85rem',
        color: '#333',
        textDecoration: 'none',
        transition: 'background 0.15s',
        fontWeight: 500,
    },
};
