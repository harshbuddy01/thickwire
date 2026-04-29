'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import api from '@/lib/api';
import { Package, Clock, Settings, LogOut, ChevronRight, AlertCircle, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const s: { [k: string]: React.CSSProperties } = {
    page: { minHeight: '80vh', padding: '40px 0 60px' },
    profileCard: {
        background: '#fff', border: '1px solid #eee', borderRadius: 24,
        padding: '28px 32px', display: 'flex', alignItems: 'center',
        gap: 24, marginBottom: 32, position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
    },
    profileAccent: { position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #6c5ce7, #a55eea, #6c5ce7)' },
    avatar: {
        width: 72, height: 72, borderRadius: '50%', background: '#f1eeff',
        border: '2px solid #e8e0ff', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#6c5ce7', flexShrink: 0, overflow: 'hidden',
    },
    profileName: { fontSize: '1.3rem', fontWeight: 800, color: '#1a1c23', marginBottom: 4 },
    profileEmail: { fontSize: '0.85rem', color: '#888' },
    unverified: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '4px 12px', background: '#fff7ed', border: '1px solid #fed7aa', color: '#ea580c', fontSize: '0.75rem', fontWeight: 600, borderRadius: 20 },
    logoutBtn: {
        marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', background: '#fef2f2', border: '1px solid #fecaca',
        color: '#dc2626', borderRadius: 14, cursor: 'pointer', fontSize: '0.85rem',
        fontWeight: 600, fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
    },
    layout: { display: 'flex', gap: 28 },
    sidebar: { width: 240, flexShrink: 0 },
    sidebarCard: { background: '#fff', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden', position: 'sticky', top: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' },
    tabBtn: {
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 20px', fontSize: '0.85rem', fontWeight: 600,
        border: 'none', cursor: 'pointer', borderBottom: '1px solid #f0f0f0',
        fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s',
    },
    content: { flex: 1, minWidth: 0 },
    sectionTitle: { fontSize: '1.4rem', fontWeight: 800, color: '#1a1c23', marginBottom: 24 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 },
    statCard: { background: '#fff', border: '1px solid #eee', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
    statLabel: { fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: 4 },
    statValue: { fontSize: '2rem', fontWeight: 800, color: '#1a1c23' },
    listCard: { background: '#fff', border: '1px solid #eee', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
    orderRow: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', background: '#f8f9fc', borderRadius: 14,
        marginBottom: 8, textDecoration: 'none', color: 'inherit',
        transition: 'background 0.15s',
    },
    badge: { display: 'inline-block', padding: '4px 10px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: 0.8, borderRadius: 8 },
    emptyState: { textAlign: 'center', padding: '48px 20px', color: '#888' },
    settingsCard: { background: '#fff', border: '1px solid #eee', borderRadius: 20, padding: 24, marginBottom: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.02)' },
    fieldDisplay: { background: '#f8f9fc', border: '1px solid #e8e8e8', borderRadius: 14, padding: '12px 16px', color: '#1a1c23', fontSize: '0.9rem' },
    spinner: { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

export default function AccountPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'orders' | 'settings'>('overview');

    const [orders, setOrders] = useState<any[]>([]);
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [tickets, setTickets] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [selectedCredential, setSelectedCredential] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    
    // Support Ticket State
    const [selectedSupportTicket, setSelectedSupportTicket] = useState<any>(null);
    const [ticketReplyText, setTicketReplyText] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            fetchData();
        }
    }, [user, loading, router]);

    const fetchData = async () => {
        try {
            const [ordersRes, subsRes, ticketsRes] = await Promise.all([
                api.get('/account/orders'),
                api.get('/account/subscriptions'),
                api.get('/support/my-tickets')
            ]);
            setOrders(ordersRes.data);
            setSubscriptions(subsRes.data);
            setTickets(ticketsRes.data);
        } catch (err) {
            console.error('Failed to fetch account data:', err);
        } finally {
            setIsFetching(false);
        }
    };

    const handleSendTicketReply = async () => {
        if (!selectedSupportTicket || !ticketReplyText.trim()) return;
        setIsSubmittingReply(true);
        try {
            const { data } = await api.post(`/support/${selectedSupportTicket.id}/reply`, { replyText: ticketReplyText });
            setSelectedSupportTicket(data);
            setTickets(tickets.map(t => t.id === data.id ? data : t));
            setTicketReplyText('');
        } catch (err) {
            console.error('Failed to send reply:', err);
        } finally {
            setIsSubmittingReply(false);
        }
    };

    const handleViewCredentials = async (orderId: string) => {
        setModalOpen(true);
        setLoadingModal(true);
        setShowPassword(false);
        setSelectedCredential(null);
        try {
            const { data } = await api.get(`/account/orders/${orderId}/credential`);
            setSelectedCredential(data);
        } catch (err: any) {
            console.error('Failed to load credential:', err);
            setSelectedCredential({ error: err.response?.data?.message || 'Failed to load credentials.' });
        } finally {
            setLoadingModal(false);
        }
    };

    const daysUntil = (date: string) => {
        if (!date) return 0;
        const diff = new Date(date).getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    if (loading || isFetching || !user) {
        return (
            <div style={s.spinner}>
                <div style={{ width: 36, height: 36, border: '4px solid #eee', borderTop: '4px solid #6c5ce7', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Package size={18} /> },
        { id: 'subscriptions', label: 'Subscriptions', icon: <Clock size={18} /> },
        { id: 'orders', label: 'Order History', icon: <ShieldCheck size={18} /> },
        { id: 'tickets', label: 'Support Tickets', icon: <HelpCircle size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
    ];

    return (
        <div className="container" style={s.page}>
            {/* Profile Header */}
            <div style={s.profileCard}>
                <div style={s.profileAccent}></div>
                <div style={s.avatar}>
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        user.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <div style={s.profileName}>{user.name}</div>
                    <div style={s.profileEmail}>{user.email}</div>
                    {!user.isVerified && (
                        <div style={s.unverified}><AlertCircle size={14} /> Email not verified</div>
                    )}
                </div>
                <button onClick={logout} style={s.logoutBtn}>
                    <LogOut size={16} /> Log Out
                </button>
            </div>

            <div style={s.layout}>
                {/* Sidebar */}
                <div style={s.sidebar}>
                    <div style={s.sidebarCard}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    ...s.tabBtn,
                                    background: activeTab === tab.id ? '#f1eeff' : '#fff',
                                    color: activeTab === tab.id ? '#6c5ce7' : '#666',
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div style={s.content}>
                    {/* Overview */}
                    {activeTab === 'overview' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <h2 style={s.sectionTitle}>Overview</h2>
                            <div style={s.statsGrid}>
                                <div style={s.statCard}>
                                    <div style={s.statLabel}>Active Subscriptions</div>
                                    <div style={s.statValue}>{subscriptions.filter(sub => sub.status === 'ACTIVE').length}</div>
                                </div>
                                <div style={s.statCard}>
                                    <div style={s.statLabel}>Total Orders</div>
                                    <div style={s.statValue}>{orders.length}</div>
                                </div>
                            </div>
                            <div style={s.listCard}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23' }}>Recent Orders</h3>
                                    <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: '#6c5ce7', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>View all</button>
                                </div>
                                {orders.length === 0 ? (
                                    <div style={s.emptyState}>No orders yet.</div>
                                ) : (
                                    orders.slice(0, 3).map(order => (
                                        <Link href={`/order/${order.id}`} key={order.id} style={s.orderRow}>
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#1a1c23', marginBottom: 4 }}>{order.service?.name} — {order.plan?.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#999' }}>Order #{order.id.substring(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <span style={{ ...s.badge, background: order.status === 'FULFILLED' ? '#f0fdf4' : '#eff6ff', color: order.status === 'FULFILLED' ? '#16a34a' : '#2563eb' }}>{order.status}</span>
                                                <ChevronRight size={16} style={{ color: '#ccc' }} />
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Subscriptions */}
                    {activeTab === 'subscriptions' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <h2 style={s.sectionTitle}>Subscriptions</h2>
                            {subscriptions.length === 0 ? (
                                <div style={{ ...s.listCard, ...s.emptyState }}>
                                    <Package size={48} style={{ margin: '0 auto 16px', color: '#ccc' }} />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23', marginBottom: 8 }}>No active subscriptions</h3>
                                    <p style={{ color: '#888', marginBottom: 24 }}>You don&apos;t have any subscription plans yet.</p>
                                    <Link href="/" style={{ display: 'inline-block', padding: '12px 24px', background: '#6c5ce7', color: 'white', borderRadius: 14, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>Browse Services</Link>
                                </div>
                            ) : (
                                subscriptions.map(sub => {
                                    const stColor = sub.status === 'ACTIVE' ? '#16a34a' : sub.status === 'EXPIRING_SOON' ? '#ea580c' : '#dc2626';
                                    const stBg = sub.status === 'ACTIVE' ? '#f0fdf4' : sub.status === 'EXPIRING_SOON' ? '#fff7ed' : '#fef2f2';
                                    const daysLeft = daysUntil(sub.expiresAt);

                                    return (
                                        <div key={sub.id} style={{ ...s.listCard, marginBottom: 12, borderLeft: `4px solid ${stColor}` }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1c23' }}>{sub.serviceName}</h3>
                                                        <span style={{ ...s.badge, background: stBg, color: stColor }}>{sub.status.replace('_', ' ')}</span>
                                                    </div>
                                                    <div style={{ fontWeight: 600, color: '#4b5563', fontSize: '0.9rem', marginBottom: '8px' }}>
                                                        {sub.planName}
                                                        {sub.status !== 'EXPIRED' && daysLeft > 0 && (
                                                            <span style={{ color: '#8b5cf6', marginLeft: '12px', fontSize: '0.85rem' }}>• {daysLeft} days remaining</span>
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: '#888' }}>
                                                        <span>Activated: {new Date(sub.activatedAt).toLocaleDateString()}</span>
                                                        <span>Expires: {new Date(sub.expiresAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>

                                                {sub.status === 'EXPIRED' ? (
                                                    <Link href={`/order/${sub.orderId}`} style={{ padding: '10px 18px', background: '#f8f9fc', border: '1px solid #e8e8e8', borderRadius: 14, color: '#333', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
                                                        Renew Plan
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => handleViewCredentials(sub.orderId)}
                                                        style={{
                                                            padding: '10px 18px', background: '#4f46e5', border: 'none', borderRadius: 14,
                                                            color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                                            fontFamily: 'Outfit, sans-serif', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)'
                                                        }}
                                                    >
                                                        View Credentials
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {/* Orders */}
                    {activeTab === 'orders' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <h2 style={s.sectionTitle}>Order History</h2>
                            {orders.map(order => (
                                <div key={order.id} style={{ ...s.listCard, marginBottom: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#1a1c23', marginBottom: 4 }}>{order.service?.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#888' }}>{order.plan?.name} • ₹{order.amount}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ ...s.badge, background: order.status === 'FULFILLED' ? '#f0fdf4' : '#eff6ff', color: order.status === 'FULFILLED' ? '#16a34a' : '#2563eb', marginBottom: 6, display: 'inline-block' }}>{order.status}</span>
                                            <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{new Date(order.createdAt).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div style={{ height: 1, background: '#f0f0f0', margin: '12px 0' }}></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#aaa', fontFamily: 'monospace' }}>ID: {order.id}</span>
                                        <Link href={`/order/${order.id}`} style={{ fontSize: '0.85rem', color: '#6c5ce7', fontWeight: 600, textDecoration: 'none' }}>View Receipt →</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Tickets */}
                    {activeTab === 'tickets' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <h2 style={{ ...s.sectionTitle, marginBottom: 0 }}>Support Tickets</h2>
                                <Link href="/support" style={{ padding: '10px 18px', background: '#6c5ce7', color: 'white', borderRadius: 14, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
                                    New Ticket
                                </Link>
                            </div>
                            
                            {tickets.length === 0 ? (
                                <div style={{ ...s.listCard, ...s.emptyState }}>
                                    <HelpCircle size={48} style={{ margin: '0 auto 16px', color: '#ccc' }} />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23', marginBottom: 8 }}>No support tickets</h3>
                                    <p style={{ color: '#888', marginBottom: 24 }}>You haven't opened any support tickets yet.</p>
                                </div>
                            ) : (
                                tickets.map(ticket => (
                                    <div key={ticket.id} style={{ ...s.listCard, marginBottom: 12, borderLeft: ticket.status === 'RESOLVED' ? '4px solid #10b981' : '4px solid #f59e0b', cursor: 'pointer', transition: 'transform 0.1s' }} onClick={() => setSelectedSupportTicket(ticket)}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23', margin: 0 }}>{ticket.subject}</h3>
                                                    <span style={{ ...s.badge, background: ticket.status === 'RESOLVED' ? '#ecfdf5' : '#fffbeb', color: ticket.status === 'RESOLVED' ? '#10b981' : '#f59e0b' }}>
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 12px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {ticket.message}
                                                </p>
                                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                    Created: {new Date(ticket.createdAt).toLocaleString()} • {ticket.messages?.length || 1} messages
                                                </div>
                                            </div>
                                            <ChevronRight size={20} style={{ color: '#cbd5e1', flexShrink: 0, marginTop: '4px' }} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Settings */}
                    {activeTab === 'settings' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <h2 style={s.sectionTitle}>Account Settings</h2>
                            <div style={s.settingsCard}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23', marginBottom: 16 }}>Profile Details</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: 6 }}>Full Name</label>
                                        <div style={s.fieldDisplay}>{user.name}</div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: 6 }}>Email Address</label>
                                        <div style={{ ...s.fieldDisplay, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {user.email}
                                            {user.isVerified && <CheckCircle2 size={16} style={{ color: '#22c55e' }} />}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 16, fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <AlertCircle size={16} /> To change your primary email or name, please contact support.
                                </div>
                            </div>
                            <div style={s.settingsCard}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1c23', marginBottom: 16 }}>Security</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#f8f9fc', borderRadius: 14, border: '1px solid #e8e8e8' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#1a1c23', marginBottom: 4 }}>Password</div>
                                        <div style={{ fontSize: '0.85rem', color: '#888' }}>{user.hasPassword ? 'You have a password set.' : 'You logged in with Google.'}</div>
                                    </div>
                                    <Link href="/forgot-password" style={{ padding: '10px 18px', background: '#6c5ce7', color: 'white', borderRadius: 12, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
                                        {user.hasPassword ? 'Change' : 'Set Password'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* View Credentials Modal */}
            {modalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
                    zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }}>
                    <div style={{
                        background: 'white', width: '100%', maxWidth: '420px', borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ShieldCheck size={20} style={{ color: '#4f46e5' }} /> Your Credentials
                            </h2>
                            <button onClick={() => setModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>&times;</button>
                        </div>

                        <div style={{ padding: '24px' }}>
                            {loadingModal ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '16px' }}>
                                    <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTop: '3px solid #4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Decrypting credentials...</p>
                                </div>
                            ) : selectedCredential?.error ? (
                                <div style={{ textAlign: 'center', padding: '20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px' }}>
                                    <AlertCircle size={32} style={{ color: '#ef4444', margin: '0 auto 12px' }} />
                                    <p style={{ color: '#b91c1c', fontWeight: 600, margin: 0 }}>{selectedCredential.error}</p>
                                </div>
                            ) : selectedCredential ? (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activated</div>
                                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>{new Date(selectedCredential.activatedAt).toLocaleDateString()}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expires</div>
                                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>{new Date(selectedCredential.expiresAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>

                                    {selectedCredential.credential.includes(':') ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '6px', marginLeft: '4px' }}>EMAIL OR USERNAME</div>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ flex: 1, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px 0 0 12px', padding: '12px 16px', color: '#0ea5e9', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.95rem' }}>
                                                        {selectedCredential.credential.split(':')[0]}
                                                    </div>
                                                    <button onClick={() => navigator.clipboard.writeText(selectedCredential.credential.split(':')[0])} style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: '0 12px 12px 0', padding: '0 16px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s' }}>Copy</button>
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '6px', marginLeft: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>PASSWORD</span>
                                                    <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>{showPassword ? 'Hide' : 'Show'}</button>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ flex: 1, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px 0 0 12px', padding: '12px 16px', color: '#0f172a', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.95rem', letterSpacing: showPassword ? 'normal' : '3px' }}>
                                                        {showPassword ? selectedCredential.credential.substring(selectedCredential.credential.indexOf(':') + 1) : '••••••••••••'}
                                                    </div>
                                                    <button onClick={() => navigator.clipboard.writeText(selectedCredential.credential.substring(selectedCredential.credential.indexOf(':') + 1))} style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: '0 12px 12px 0', padding: '0 16px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s' }}>Copy</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '6px', marginLeft: '4px' }}>CREDENTIAL CONTENT</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ width: '100%', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', color: '#0ea5e9', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                                                    {selectedCredential.credential}
                                                </div>
                                                <button onClick={() => navigator.clipboard.writeText(selectedCredential.credential)} style={{ width: '100%', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }}>Copy to Clipboard</button>
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ marginTop: '24px', padding: '12px 16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <AlertCircle size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#92400e', fontWeight: 500, lineHeight: 1.4 }}>
                                                <strong>Security Note:</strong> Do not share these credentials with anyone. If you lose access, you can view them here again anytime before the token expires.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
            
            {/* View Support Ticket Modal (Live Chat) */}
            {selectedSupportTicket && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
                    zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }}>
                    <div style={{
                        background: 'white', width: '100%', maxWidth: '600px', height: '80vh', borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <div>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <HelpCircle size={20} style={{ color: '#4f46e5' }} /> {selectedSupportTicket.subject}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
                                    Ticket #{selectedSupportTicket.id.substring(0, 8)} • 
                                    <span style={{ color: selectedSupportTicket.status === 'RESOLVED' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                                        {selectedSupportTicket.status}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedSupportTicket(null)} style={{ background: '#fff', border: '1px solid #e2e8f0', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>&times;</button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
                            {selectedSupportTicket.messages && selectedSupportTicket.messages.map((msg: any) => (
                                <div key={msg.id} style={{
                                    display: 'flex',
                                    flexDirection: msg.sender === 'CUSTOMER' ? 'row-reverse' : 'row',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                                        background: msg.sender === 'CUSTOMER' ? '#f1eeff' : '#1e293b',
                                        color: msg.sender === 'CUSTOMER' ? '#6c5ce7' : '#fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem'
                                    }}>
                                        {msg.sender === 'CUSTOMER' ? 'Me' : 'A'}
                                    </div>
                                    <div style={{
                                        background: msg.sender === 'CUSTOMER' ? '#6c5ce7' : '#f1f5f9',
                                        color: msg.sender === 'CUSTOMER' ? '#fff' : '#334155',
                                        padding: '12px 16px', borderRadius: '16px', fontSize: '0.9rem', whiteSpace: 'pre-wrap', lineHeight: 1.5,
                                        maxWidth: '80%',
                                        borderTopRightRadius: msg.sender === 'CUSTOMER' ? '4px' : '16px',
                                        borderTopLeftRadius: msg.sender === 'ADMIN' ? '4px' : '16px',
                                    }}>
                                        {msg.text}
                                        <div style={{ fontSize: '0.65rem', marginTop: '6px', color: msg.sender === 'CUSTOMER' ? '#e0d4ff' : '#94a3b8', textAlign: msg.sender === 'CUSTOMER' ? 'right' : 'left' }}>
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {selectedSupportTicket.status === 'RESOLVED' && (
                                <div style={{ textAlign: 'center', padding: '12px', background: '#ecfdf5', color: '#10b981', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, marginTop: '8px' }}>
                                    This ticket has been resolved.
                                </div>
                            )}
                        </div>

                        {selectedSupportTicket.status !== 'RESOLVED' && (
                            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', gap: '12px' }}>
                                <textarea
                                    value={ticketReplyText}
                                    onChange={(e) => setTicketReplyText(e.target.value)}
                                    placeholder="Type your reply here..."
                                    style={{
                                        flex: 1, height: '80px', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1',
                                        resize: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    disabled={!ticketReplyText.trim() || isSubmittingReply}
                                    onClick={handleSendTicketReply}
                                    style={{
                                        background: !ticketReplyText.trim() ? '#cbd5e1' : '#6c5ce7',
                                        color: 'white', border: 'none', borderRadius: '12px', padding: '0 20px',
                                        fontWeight: 600, cursor: !ticketReplyText.trim() ? 'not-allowed' : 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {isSubmittingReply ? 'Sending...' : 'Reply'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
