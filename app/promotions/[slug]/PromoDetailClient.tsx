'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import { initialDealershipData } from '@/lib/initialData';
// Layout & Action Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactBar from '@/components/FloatingContactBar';
import PromoDetailPage from '@/components/views/PromoDetailPage';
import TestDriveModal from '@/components/modals/TestDriveModal';
import { Tag, ArrowLeft } from 'lucide-react';

interface PromoDetailClientProps {
  slug: string;
}

export default function PromoDetailClient({ slug }: PromoDetailClientProps) {
  const router = useRouter();
  const { data } = useDealership();
  const { promotions } = data;

  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveModelName, setTestDriveModelName] = useState('XPENG G6');

  // Find promo from context, fallback to initialData
  const currentPromo =
    promotions.find((p) => p.slug === slug || p.id === slug) ||
    initialDealershipData.promotions.find((p) => p.slug === slug || p.id === slug);

  const handleOpenTestDrive = (modelName?: string) => {
    if (modelName) setTestDriveModelName(modelName);
    setIsTestDriveOpen(true);
  };

  if (!currentPromo) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar
          activeTab="promotions"
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Tag className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Promo Tidak Ditemukan
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-sm">
            Artikel promo yang Anda cari mungkin telah berakhir atau diperbarui. Silakan lihat daftar promo aktif kami.
          </p>
          <Link
            href="/promotions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Promo</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab="promotions"
      />

      <main className="flex-1">
        <PromoDetailPage
          promo={currentPromo}
          onOpenTestDrive={handleOpenTestDrive}
          onNavigateHome={() => router.push('/')}
          onNavigatePromos={() => router.push('/promotions')}
        />
      </main>

      <Footer />

      <FloatingContactBar
        onOpenTestDrive={() => handleOpenTestDrive()}
      />

      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        initialModel={testDriveModelName}
      />
    </div>
  );
}
