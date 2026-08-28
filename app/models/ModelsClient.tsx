'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import { VehicleModel } from '@/types/dealership';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactBar from '@/components/FloatingContactBar';
import AllModelsView from '@/components/views/AllModelsView';
import TestDriveModal from '@/components/modals/TestDriveModal';

export default function ModelsClient() {
  const router = useRouter();
  const { data } = useDealership();

  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveModelName, setTestDriveModelName] = useState('XPENG G6');

  const handleSelectModel = (model: VehicleModel) => {
    router.push(`/models/${model.slug}`);
  };

  const handleOpenTestDrive = (modelName?: string) => {
    if (modelName) setTestDriveModelName(modelName);
    setIsTestDriveOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab="models"
        setActiveTab={(tab) => {
          if (tab === 'home') router.push('/');
          else if (tab === 'promotions') router.push('/promotions');
          else if (tab === 'models') {}
          else router.push(`/?tab=${tab}`);
        }}
      />

      <main className="flex-1">
        <AllModelsView
          onSelectModel={handleSelectModel}
          onOpenTestDrive={handleOpenTestDrive}
        />
      </main>

      <Footer
        setActiveTab={(tab) => {
          if (tab === 'home') router.push('/');
          else if (tab === 'promotions') router.push('/promotions');
          else router.push(`/?tab=${tab}`);
        }}
      />

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
