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
import ModelDetailPage from '@/components/views/ModelDetailPage';
import TestDriveModal from '@/components/modals/TestDriveModal';
import { Car, ArrowLeft } from 'lucide-react';

interface ModelDetailClientProps {
  slug: string;
}

export default function ModelDetailClient({ slug }: ModelDetailClientProps) {
  const router = useRouter();
  const { data } = useDealership();
  const { models } = data;

  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveModelName, setTestDriveModelName] = useState('XPENG G6');

  // Find model from dynamic context, fallback to initialData
  const currentModel =
    models.find((m) => m.slug === slug || m.id === slug) ||
    initialDealershipData.models.find((m) => m.slug === slug || m.id === slug);

  const handleOpenTestDrive = (modelName?: string) => {
    if (modelName) setTestDriveModelName(modelName);
    setIsTestDriveOpen(true);
  };

  if (!currentModel) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar
          activeTab="models"
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Car className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Model Kendaraan Tidak Ditemukan
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-sm">
            Model yang Anda cari mungkin telah diperbarui atau dipindahkan. Silakan jelajahi katalog model resmi kami.
          </p>
          <Link
            href="/models"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Model</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab="models"
      />

      <main className="flex-1">
        <ModelDetailPage
          model={currentModel}
          onOpenTestDrive={handleOpenTestDrive}
          onNavigateHome={() => router.push('/')}
          onNavigateModels={() => router.push('/models')}
        />
      </main>

      <Footer />

      <FloatingContactBar
        onOpenTestDrive={() => handleOpenTestDrive(currentModel.name)}
      />

      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        initialModel={testDriveModelName}
      />
    </div>
  );
}
