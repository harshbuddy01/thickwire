import Link from 'next/link';
import { getServices } from '@/lib/api';
import type { Service } from '@/lib/types';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function HomePage() {
    let services: Service[] = [];
    try {
        services = await getServices();
    } catch {
        // Will show empty state
    }

    return (
        <>
            {/* ─── Hero ──────────────────────────────────── */}
            <section className="hero">
                <div className="hero-badge">
                    ⚡ Instant Automated Delivery
                </div>
                <h1>
                    Premium Digital Services,{' '}
                    <span className="gradient-text">Delivered Instantly</span>
                </h1>
                <p>
                    Browse our curated marketplace of digital products. Pay securely,
                    receive your credentials automatically — no waiting.
                </p>
                <a href="#services" className="hero-cta">
                    Browse Services →
                </a>
            </section>

            {/* ─── Services Grid ─────────────────────────── */}
            <section className="section" id="services">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Choose from our range of premium digital products with instant delivery</p>
                    </div>

                    {services.length > 0 ? (
                        <div className="service-grid">
                            {services.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    ) : (
                        <div className="service-grid">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="skeleton skeleton-card" />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Trust Signals ─────────────────────────── */}
            <section className="section" id="trust">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose ThickWire?</h2>
                        <p>Trusted by thousands for reliable digital service delivery</p>
                    </div>
                    <div className="trust-grid">
                        <div className="trust-card">
                            <div className="trust-icon">⚡</div>
                            <h3>Instant Delivery</h3>
                            <p>Automated credential delivery within seconds of payment confirmation</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">🔒</div>
                            <h3>Bank-Grade Security</h3>
                            <p>AES-256 encryption for all credentials. Your data stays protected</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">💳</div>
                            <h3>Secure Payments</h3>
                            <p>Razorpay-powered checkout with UPI, cards, wallets, and net banking</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">🛟</div>
                            <h3>24/7 Support</h3>
                            <p>Dedicated support team ready to help with any queries or issues</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ───────────────────────────────────── */}
            <section className="section" id="faq">
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Everything you need to know about our services</p>
                    </div>
                    <FAQSection />
                </div>
            </section>
        </>
    );
}

// ─── Service Card ───────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
    const lowestPrice = service.plans.length
        ? Math.min(...service.plans.map((p) => parseFloat(p.price)))
        : 0;
    const totalPlans = service.plans.length;

    const icons = ['🌐', '📱', '🎮', '☁️', '💎', '🎧', '🔥', '🚀'];
    const icon = icons[service.displayOrder % icons.length];

    return (
        <Link href={`/${service.slug}`} className="service-card">
            <div className="service-card-icon">{icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description || 'Premium digital service with instant delivery'}</p>
            <div className="service-card-meta">
                <span className="service-card-price">From ₹{lowestPrice}</span>
                <span className="service-card-plans">{totalPlans} plan{totalPlans !== 1 ? 's' : ''}</span>
            </div>
        </Link>
    );
}

// ─── FAQ (Client Component) ─────────────────────────────

function FAQSection() {
    const faqs = [
        {
            q: 'How does instant delivery work?',
            a: 'Once your payment is confirmed via Razorpay, our automated system assigns a credential from our inventory and delivers it to your email within seconds.',
        },
        {
            q: 'What payment methods do you accept?',
            a: 'We accept all major payment methods through Razorpay — UPI, credit/debit cards, net banking, wallets (Paytm, PhonePe, etc.), and EMI options.',
        },
        {
            q: 'What if I don\'t receive my order?',
            a: 'If for any reason the automated delivery fails, your order is flagged for manual fulfillment and our team delivers within 24 hours. You can also contact support.',
        },
        {
            q: 'How do I track my order?',
            a: 'After placing an order, you\'ll receive an order ID. Visit the order status page or check your email for real-time updates on your delivery.',
        },
        {
            q: 'Do you offer refunds?',
            a: 'Yes, if we are unable to fulfill your order, you will receive a full refund. Please read our refund policy for detailed terms.',
        },
    ];

    return (
        <div className="faq-list">
            {faqs.map((faq, i) => (
                <details key={i} className="faq-item">
                    <summary className="faq-question">
                        <span>{faq.q}</span>
                        <span>+</span>
                    </summary>
                    <div className="faq-answer">{faq.a}</div>
                </details>
            ))}
        </div>
    );
}
