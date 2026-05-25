import type { Metadata } from 'next';
import ComingSoonCategory from '@/components/ComingSoonCategory';

const MINIO = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export const metadata: Metadata = {
  title: 'Activation Services Coming Soon | StreamKart',
  description: 'Activation services are launching soon on StreamKart. Search live products while we prepare verified activation options.',
};

export default function ActivationComingSoonPage() {
  return (
    <ComingSoonCategory
      title="Activation services are almost ready"
      label="Activation Desk"
      description="We are setting up reliable activation options with clear delivery steps, verified suppliers, and support-ready instructions."
      visualSrc={`${MINIO}/blocks/activation.png`}
      accent="#c98925"
      notes={[
        'Verified workflows are being tested.',
        'Delivery notes are being prepared.',
        'Search live products meanwhile.',
      ]}
    />
  );
}
