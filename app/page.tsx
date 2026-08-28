'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import { VehicleModel, Promotion } from '@/types/dealership';

// Layout & Navigation Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactBar from '@/components/FloatingContactBar';

// Home Section Components
import HeroSlider from '@/components/home/HeroSlider';
import SalesConsultantCard from '@/components/home/SalesConsultantCard';
import FeaturedModels from '@/components/home/FeaturedModels';
import LoanCalculator from '@/components/home/LoanCalculator';
import PromotionSection from '@/components/home/PromotionSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import DeliveryTestimonials from '@/components/home/DeliveryTestimonials';

// Dedicated Views
import AllModelsView from '@/components/views/AllModelsView';
import PromotionsView from '@/components/views/PromotionsView';
import TestimonialsView from '@/components/views/TestimonialsView';
import ContactMeView from '@/components/views/ContactMeView';

// Interactive Action Modals
import TestDriveModal from '@/components/modals/TestDriveModal';

function DealershipPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useDealership();

  // Navigation State: 'home' | 'models' | 'promotions' | 'testimonials' | 'contact'
  const tabFromUrl = searchParams.get('tab') || 'home';
  const [activeTabOverride, setActiveTabOverride] = useState<string | null>(null);
  const activeTab = activeTabOverride ?? tabFromUrl;

  // Modal for Test Drive
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveModelName, setTestDriveModelName] = useState('XPENG G6');

  // Navigation handler helper
  const handleNavChange = (tab: string) => {
    setActiveTabOverride(tab);
    if (tab === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/?tab=${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTestDrive = (modelName?: string) => {
    if (modelName) setTestDriveModelName(modelName);
    setIsTestDriveOpen(true);
  };

  // Redirect to dedicated Model detail page (Clean URL & SEO indexable)
  const handleSelectModel = (model: VehicleModel) => {
    router.push(`/models/${model.slug}`);
  };

  // Redirect to dedicated Promotion detail page (Clean URL & SEO indexable)
  const handleSelectPromo = (promo: Promotion) => {
    router.push(`/promotions/${promo.slug}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavChange}
      />

      {/* Main Content Area Based on Active Page Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 1. Dynamic Hero Carousel Slider */}
            <HeroSlider
              onSelectModel={(slug) => router.push(`/models/${slug}`)}
              onExploreModels={() => handleNavChange('models')}
              onOpenTestDrive={() => handleOpenTestDrive('XPENG G6')}
              onOpenPromos={() => handleNavChange('promotions')}
            />

            {/* 2. Official Sales Consultant Profile Hero Card */}
            <SalesConsultantCard onOpenTestDrive={() => handleOpenTestDrive()} />

            {/* 3. Featured Vehicle Models Showcase */}
            <FeaturedModels
              onSelectModel={handleSelectModel}
              onOpenTestDrive={handleOpenTestDrive}
              onViewAllModels={() => handleNavChange('models')}
            />

            {/* 4. Interactive Flexible Loan Calculator */}
            <LoanCalculator />

            {/* 5. Special Promotions & Credit Packages of the Month */}
            <PromotionSection
              onSelectPromo={handleSelectPromo}
              onViewAllPromotions={() => handleNavChange('promotions')}
            />

            {/* 6. Why Choose Official XPENG Dealership */}
            <WhyChooseUs />

            {/* 7. Handover Testimonials & Customer Delivery Units */}
            <DeliveryTestimonials onViewAll={() => handleNavChange('testimonials')} />
          </div>
        )}

        {/* Dedicated "All Models" View */}
        {activeTab === 'models' && (
          <div className="animate-in fade-in duration-300">
            <AllModelsView
              onSelectModel={handleSelectModel}
              onOpenTestDrive={handleOpenTestDrive}
            />
          </div>
        )}

        {/* Dedicated "Promotions" View */}
        {activeTab === 'promotions' && (
          <div className="animate-in fade-in duration-300">
            <PromotionsView onSelectPromo={handleSelectPromo} />
          </div>
        )}

        {/* Dedicated "Testimonials" (Delivery Units) View */}
        {activeTab === 'testimonials' && (
          <div className="animate-in fade-in duration-300">
            <TestimonialsView />
          </div>
        )}

        {/* Dedicated "Contact Me" View */}
        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <ContactMeView />
          </div>
        )}
      </main>

      {/* Persistent Footer with Map, WhatsApp, Instagram, TikTok, Telegram */}
      {activeTab !== 'contact' && (
        <Footer setActiveTab={handleNavChange} />
      )}

      {/* Floating Action Bar (WhatsApp, Call, Test Drive) */}
      <FloatingContactBar
        onOpenTestDrive={() => handleOpenTestDrive()}
      />

      {/* Interactive Action Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        initialModel={testDriveModelName}
      />
    </div>
  );
}

export default function DealershipPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
          Loading XPENG Official Portal...
        </div>
      }
    >
      <DealershipPageInner />
    </Suspense>
  );
}
