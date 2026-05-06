'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, LogOut, Wallet, LayoutGrid, Package, HeadphonesIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    if (pathname === '/checkout' || pathname === '/login' || pathname === '/signup') return null;

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
                        <Link href="/account" className="header-icon-link">
                            <ShoppingCart size={20} />
                        </Link>
                        <Link href="/account" className="header-icon-link">
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

            <MobileBottomNav />
        </header>
    );
}

function MobileBottomNav() {
    const pathname = usePathname();
    const { user } = useAuth();
    
    return (
        <nav className="mobile-bottom-nav">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
                <LayoutGrid size={22} />
                <span>Home</span>
            </Link>
            <Link href="/services" className={pathname === '/services' ? 'active' : ''}>
                <Search size={22} />
                <span>Search</span>
            </Link>
            <Link href="/account" className={pathname === '/account' ? 'active' : ''}>
                <ShoppingCart size={22} />
                <span>Cart</span>
            </Link>
            <Link href="/support" className={pathname === '/support' ? 'active' : ''}>
                <HeadphonesIcon size={22} />
                <span>Support</span>
            </Link>
            <Link href="/account" className={pathname.startsWith('/account') && pathname !== '/account' ? 'active' : ''}>
                <User size={22} />
                <span>Profile</span>
            </Link>

            <style jsx>{`
                .mobile-bottom-nav {
                    display: none;
                    position: fixed;
                    bottom: 0; left: 0; right: 0;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(0,0,0,0.05);
                    padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
                    z-index: 2000;
                    justify-content: space-around;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.03);
                }
                .mobile-bottom-nav :global(a) {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    color: #8e8e93;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: 500;
                    transition: all 0.2s;
                    min-width: 60px;
                }
                .mobile-bottom-nav :global(a.active) {
                    color: #6c5ce7;
                }
                .mobile-bottom-nav :global(span) {
                    font-family: var(--font-poppins), sans-serif;
                }
                @media (max-width: 768px) {
                    .mobile-bottom-nav {
                        display: flex;
                    }
                }
            `}</style>
        </nav>
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
