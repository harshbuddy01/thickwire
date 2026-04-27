'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { user, loading, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    ThickWire
                </Link>
                <nav>
                    <ul className="nav-links">
                        <li><Link href="/#services">Services</Link></li>
                        <li><Link href="/#trust">Why Us</Link></li>
                        <li><Link href="/support">Support</Link></li>

                        {!loading && !user && (
                            <>
                                <li><Link href="/login" className="login-btn">Login</Link></li>
                                <li><Link href="/signup" className="signup-btn">Sign Up</Link></li>
                            </>
                        )}

                        {!loading && user && (
                            <li className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-[#333]"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[#333] flex items-center justify-center overflow-hidden">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={14} className="text-gray-400" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{user.name.split(' ')[0]}</span>
                                </button>

                                {menuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-[#0f0f0f] border border-[#222] rounded-xl shadow-2xl py-1 z-50">
                                            <Link href="/account" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                                                My Account
                                            </Link>
                                            <div className="h-px bg-[#222] my-1"></div>
                                            <button
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                    logout();
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#1a1a1a] hover:text-red-300 transition-colors flex items-center gap-2"
                                            >
                                                <LogOut size={14} />
                                                Log Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
