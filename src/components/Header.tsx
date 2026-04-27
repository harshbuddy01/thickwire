'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { Search, ShoppingCart, Heart, User, LogOut, Wallet, LayoutGrid, Package, HeadphonesIcon } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            {/* Top Bar */}
            <div className="header-top">
                <div className="container">
                    <Link href="/" className="logo-block">
                        <div className="logo-icon">▶</div>
                        <div className="logo-text">
                            <h1>StreamKart</h1>
                            <span>Your Digital World, One Place.</span>
                        </div>
                    </Link>

                    <div className="search-bar">
                        <select className="category-dropdown">
                            <option>All Categories</option>
                            <option>Streaming</option>
                            <option>VPN</option>
                        </select>
                        <input type="text" placeholder="Search for products, tools and more..." className="search-input" />
                        <button className="search-btn"><Search size={18} /></button>
                    </div>

                    <div className="header-icons">
                        <Link href="/cart" className="icon-btn">
                            <ShoppingCart size={22} />
                            <span className="badge">3</span>
                        </Link>
                        <Link href="/wishlist" className="icon-btn">
                            <Heart size={22} />
                        </Link>

                        <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="icon-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                <User size={22} />
                            </button>
                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                                    <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                                        {!loading && !user ? (
                                            <>
                                                <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Login</Link>
                                                <Link href="/signup" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign Up</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/account" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Account</Link>
                                                <button onClick={() => { setMenuOpen(false); logout(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
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

            {/* Secondary Nav */}
            <div className="header-nav">
                <div className="container">
                    <Link href="/wallet" className="nav-item">
                        <Wallet className="nav-icon" />
                        <div className="nav-text">
                            <strong>My Wallet</strong>
                            <span>₹ 1.93</span>
                        </div>
                    </Link>
                    <Link href="/account" className="nav-item border-l border-gray-100">
                        <LayoutGrid className="nav-icon" />
                        <div className="nav-text">
                            <strong>Dashboard</strong>
                            <span>My Account</span>
                        </div>
                    </Link>
                    <Link href="/orders" className="nav-item border-l border-gray-100">
                        <Package className="nav-icon" />
                        <div className="nav-text">
                            <strong>Orders</strong>
                            <span>Track & View</span>
                        </div>
                    </Link>
                    <Link href="/wishlist" className="nav-item border-l border-gray-100">
                        <Heart className="nav-icon" />
                        <div className="nav-text">
                            <strong>Wishlist</strong>
                            <span>Saved Items</span>
                        </div>
                    </Link>
                    <Link href="/support" className="nav-item border-l border-gray-100">
                        <HeadphonesIcon className="nav-icon" />
                        <div className="nav-text">
                            <strong>Support</strong>
                            <span>24/7 Help</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
