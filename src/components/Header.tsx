'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, LogOut, Wallet, LayoutGrid, Package, HeadphonesIcon } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    if (pathname === '/checkout') return null;

    return (
        <header>
            {/* ─── Top Bar ────────────────────────────────────────── */}
            <div className="header-top">
                <div className="container">
                    <Link href="/" className="nav-logo-group">
                        <div className="nav-logo-icon">▶</div>
                        <div className="nav-logo-text">
                            <h1>StreamKart</h1>
                            <span>Your Digital World, One Place.</span>
                        </div>
                    </Link>

                    <div className="search-container">
                        <select className="search-cat-dropdown">
                            <option>All Categories</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search for products, tools and more..."
                            className="search-main-input"
                        />
                        <button className="search-trigger">
                            <Search size={18} />
                        </button>
                    </div>

                    <div className="nav-icons-group">
                        <Link href="/" className="header-icon-link">
                            <ShoppingCart size={20} />
                            <span className="badge-num">5</span>
                        </Link>
                        <Link href="/" className="header-icon-link">
                            <Heart size={20} />
                        </Link>

                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="header-icon-link user-btn"
                                style={{ border: 'none', cursor: 'pointer' }}
                            >
                                <User size={20} />
                            </button>

                            {menuOpen && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }}
                                        onClick={() => setMenuOpen(false)}
                                    ></div>
                                    <div style={dropdownStyles.menu}>
                                        {!loading && !user ? (
                                            <>
                                                <div style={dropdownStyles.menuHeader}>
                                                    <p style={dropdownStyles.menuTitle}>Welcome to StreamKart</p>
                                                    <p style={dropdownStyles.menuSubtitle}>Login for the best experience</p>
                                                </div>
                                                <div style={dropdownStyles.menuDivider}></div>
                                                <Link href="/login" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                    Login
                                                </Link>
                                                <Link href="/signup" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                    Sign Up
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <div style={dropdownStyles.menuHeader}>
                                                    <p style={dropdownStyles.menuTitle}>{user?.name}</p>
                                                    <p style={dropdownStyles.menuSubtitle}>{user?.email}</p>
                                                </div>
                                                <div style={dropdownStyles.menuDivider}></div>
                                                <Link href="/account" onClick={() => setMenuOpen(false)} style={dropdownStyles.menuItem}>
                                                    My Account
                                                </Link>
                                                <div style={dropdownStyles.menuDivider}></div>
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
            </div>

            {/* ─── Secondary Sub-nav ──────────────────────────────── */}
            {user && (
                <div className="sub-nav-wrapper">
                    <div className="container">
                        <div className="sub-nav-bar">
                            <Link href="/" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-wallet"><Wallet size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>My Wallet</strong>
                                    <span>₹ 1.93</span>
                                </div>
                            </Link>
                            <Link href="/account" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-dashboard"><LayoutGrid size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Dashboard</strong>
                                    <span>My Account</span>
                                </div>
                            </Link>
                            <Link href="/" className="sub-nav-item">
                                <div className="sub-nav-icon-box icon-orders"><Package size={20} /></div>
                                <div className="sub-nav-meta">
                                    <strong>Orders</strong>
                                    <span>Track & View</span>
                                </div>
                            </Link>
                            <Link href="/" className="sub-nav-item">
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
        </header>
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
    menuHeader: {
        padding: '14px 18px',
    },
    menuTitle: {
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#1a1c23',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: '0.75rem',
        color: '#999',
    },
    menuDivider: {
        height: 1,
        background: '#f3f4f6',
        margin: '2px 0',
    },
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
