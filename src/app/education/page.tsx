import type { Metadata } from 'next';
import ComingSoonCategory from '@/components/ComingSoonCategory';

const MINIO = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export const metadata: Metadata = {
  title: 'Education Products Coming Soon | StreamKart',
  description: 'Education products are launching soon on StreamKart. Search live products while this category is prepared.',
};

export default function EducationComingSoonPage() {
  return (
    <ComingSoonCategory
      title="Education products are launching soon"
      label="Learning Hub"
      description="We are preparing student-friendly tools, creator apps, and learning subscriptions so this category opens with useful verified products."
      visualSrc={`${MINIO}/blocks/ai.png`}
      accent="#6c5ce7"
      notes={[
        'Learning tools are being shortlisted.',
        'Verified products will open here.',
        'Search live products meanwhile.',
      ]}
    />
  );
}
