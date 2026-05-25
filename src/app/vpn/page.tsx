import type { Metadata } from 'next';
import ComingSoonCategory from '@/components/ComingSoonCategory';

const MINIO = process.env.NEXT_PUBLIC_CDN_URL || 'https://assets.streamkart.store/streamkart-assets';

export const metadata: Metadata = {
  title: 'VPN & Security Coming Soon | StreamKart',
  description: 'VPN and security products are launching soon on StreamKart. Search live products while this category is prepared.',
};

export default function VpnComingSoonPage() {
  return (
    <ComingSoonCategory
      title="VPN and security tools are coming soon"
      label="Privacy Tools"
      description="We are curating trusted VPN and security products with stable access, simple setup, and buyer support before opening this category."
      visualSrc={`${MINIO}/blocks/vpn.png`}
      accent="#2f7f75"
      notes={[
        'Security tools are being reviewed.',
        'Setup guidance is being prepared.',
        'Search live products meanwhile.',
      ]}
    />
  );
}
