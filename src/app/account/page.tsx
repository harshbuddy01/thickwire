'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import api from '@/lib/api';
import { Package, Clock, Settings, LogOut, ChevronRight, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'orders' | 'settings'>('overview');

    const [orders, setOrders] = useState<any[]>([]);
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            fetchData();
        }
    }, [user, loading, router]);

    const fetchData = async () => {
        try {
            const [ordersRes, subsRes] = await Promise.all([
                api.get('/account/orders'),
                api.get('/account/subscriptions')
            ]);
            setOrders(ordersRes.data);
            setSubscriptions(subsRes.data);
        } catch (err) {
            console.error('Failed to fetch account data:', err);
        } finally {
            setIsFetching(false);
        }
    };

    if (loading || isFetching || !user) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#333] border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Package size={18} /> },
        { id: 'subscriptions', label: 'Subscriptions', icon: <Clock size={18} /> },
        { id: 'orders', label: 'Order History', icon: <ShieldCheck size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 md:px-6">

                {/* Header Profile Section */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden shrink-0">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-medium text-gray-500">{user.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{user.name}</h1>
                        <p className="text-gray-400">{user.email}</p>

                        {!user.isVerified && (
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                                <AlertCircle size={14} />
                                Email not verified
                            </div>
                        )}
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-red-500/10 border border-[#333] hover:border-red-500/30 text-gray-300 hover:text-red-400 rounded-xl transition-all font-medium text-sm"
                    >
                        <LogOut size={16} />
                        Log Out
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden sticky top-24">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors border-b border-[#222] last:border-0
                                        ${activeTab === tab.id ? 'bg-[#1a1a1a] text-indigo-400' : 'text-gray-400 hover:bg-[#151515] hover:text-gray-200'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">

                        {/* ── Overview Tab ── */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                                        <div className="text-sm font-medium text-gray-400 mb-1">Active Subscriptions</div>
                                        <div className="text-3xl font-bold text-white">
                                            {subscriptions.filter(s => s.status === 'ACTIVE').length}
                                        </div>
                                    </div>
                                    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                                        <div className="text-sm font-medium text-gray-400 mb-1">Total Orders</div>
                                        <div className="text-3xl font-bold text-white">{orders.length}</div>
                                    </div>
                                </div>

                                <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-sm text-indigo-400 hover:text-indigo-300">View all</button>
                                    </div>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">No orders yet.</div>
                                    ) : (
                                        <div className="space-y-3">
                                            {orders.slice(0, 3).map(order => (
                                                <Link href={`/order/${order.id}`} key={order.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-xl transition-colors group">
                                                    <div>
                                                        <div className="font-medium text-white mb-1">{order.service?.name} — {order.plan?.name}</div>
                                                        <div className="text-xs text-gray-400">Order #{order.id.substring(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md
                                                            ${order.status === 'FULFILLED' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                            {order.status}
                                                        </div>
                                                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Subscriptions Tab ── */}
                        {activeTab === 'subscriptions' && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Subscriptions</h2>

                                {subscriptions.length === 0 ? (
                                    <div className="bg-[#111] border border-[#222] rounded-2xl p-12 text-center">
                                        <Package size={48} className="mx-auto mb-4 text-gray-600" />
                                        <h3 className="text-lg font-medium text-white mb-2">No active subscriptions</h3>
                                        <p className="text-gray-400 mb-6">You don't have any subscription plans yet.</p>
                                        <Link href="/#services" className="inline-block px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition-colors">
                                            Browse Services
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {subscriptions.map(sub => {
                                            const isExpiring = sub.status === 'EXPIRING_SOON';
                                            const isExpired = sub.status === 'EXPIRED';
                                            const isActive = sub.status === 'ACTIVE';

                                            return (
                                                <div key={sub.id} className="bg-[#111] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
                                                    {isExpiring && <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>}
                                                    {isExpired && <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>}
                                                    {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>}

                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h3 className="text-lg font-bold text-white">Subscription for Order #{sub.orderId.substring(0, 8)}</h3>
                                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md
                                                                    ${isActive ? 'bg-green-500/10 text-green-400' :
                                                                        isExpiring ? 'bg-orange-500/10 text-orange-400' :
                                                                            'bg-red-500/10 text-red-400'}`}>
                                                                    {sub.status.replace('_', ' ')}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-gray-400 flex items-center gap-4">
                                                                <span>Activates: {new Date(sub.activatedAt).toLocaleDateString()}</span>
                                                                <span>Expires: {new Date(sub.expiresAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>

                                                        {!isExpired && (
                                                            <Link href={`/order/${sub.orderId}`} className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] text-white text-sm font-medium rounded-xl transition-colors">
                                                                View Credentials
                                                            </Link>
                                                        )}
                                                        {isExpired && (
                                                            <Link href="/#services" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors">
                                                                Renew Plan
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Orders Tab ── */}
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>

                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="bg-[#111] border border-[#222] rounded-2xl p-6">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                                <div>
                                                    <div className="font-bold text-white mb-1">{order.service?.name}</div>
                                                    <div className="text-sm text-gray-400">{order.plan?.name} • ₹{order.amount}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2
                                                        ${order.status === 'FULFILLED' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                        {order.status}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                                                </div>
                                            </div>
                                            <hr className="border-[#222] my-4" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-400 font-mono">ID: {order.id}</span>
                                                <Link href={`/order/${order.id}`} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View Receipt →</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Settings Tab ── */}
                        {activeTab === 'settings' && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>

                                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 mb-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Profile Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
                                            <div className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-2.5 px-4 opacity-70">
                                                {user.name}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                                            <div className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl py-2.5 px-4 opacity-70 flex justify-between items-center">
                                                {user.email}
                                                {user.isVerified && <CheckCircle2 size={16} className="text-emerald-500" />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
                                        <AlertCircle size={16} />
                                        To change your primary email or name, please contact support.
                                    </div>
                                </div>

                                <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Security</h3>
                                    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded-xl">
                                        <div>
                                            <div className="font-medium text-white mb-1">Password</div>
                                            <div className="text-sm text-gray-400">
                                                {user.hasPassword ? 'You have a password set for this account.' : 'You logged in with a Google Account.'}
                                            </div>
                                        </div>
                                        <Link href="/forgot-password" className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                                            {user.hasPassword ? 'Change Password' : 'Set Password'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
