import type { Metadata } from 'next';
import CMSManageClient from './CMSManageClient';

export const metadata: Metadata = {
  title: 'CMS Management Portal | XPENG Dealership Backend',
  description: 'Portal administrasi internal dealer resmi XPENG Motors. Kelola katalog mobil, promo, testimoni, data kontak, lead test drive, dan pengaturan sistem.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSManagePage() {
  return <CMSManageClient />;
}
