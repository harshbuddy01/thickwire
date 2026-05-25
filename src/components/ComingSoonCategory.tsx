import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bell, Search, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

type ComingSoonCategoryProps = {
  title: string;
  label: string;
  description: string;
  visualSrc: string;
  accent: string;
  notes: string[];
};

export default function ComingSoonCategory({
  title,
  label,
  description,
  visualSrc,
  accent,
  notes,
}: ComingSoonCategoryProps) {
  return (
    <main className="soon-page" style={{ '--soon-accent': accent } as CSSProperties}>
      <section className="soon-shell">
        <div className="soon-hero">
          <div className="soon-copy">
            <span className="soon-kicker">
              <Sparkles size={16} />
              {label}
            </span>
            <h1>{title}</h1>
            <p>{description}</p>

            <div className="soon-note-card">
              <Bell size={22} />
              <div>
                <strong>Launching very soon</strong>
                <span>We are preparing verified products for this category. Until then, use search to find live products already available on StreamKart.</span>
              </div>
            </div>

            <div className="soon-actions">
              <Link href="/services" className="soon-primary-action">
                Search live products
                <Search size={18} />
              </Link>
              <Link href="/support" className="soon-secondary-action">
                Request this category
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="soon-visual" aria-hidden="true">
            <div className="soon-paper-card">
              <Image src={visualSrc} alt="" width={720} height={480} priority />
            </div>
            <div className="soon-stamp">Soon</div>
          </div>
        </div>

        <div className="soon-lanes" aria-label={`${title} launch status`}>
          {notes.map((note, index) => (
            <div key={note} className="soon-lane">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
