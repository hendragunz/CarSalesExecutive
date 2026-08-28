'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { DealershipData, VehicleModel, Promotion, Testimonial, DealerInfo, HeroSlide, LeadSubmission } from '@/types/dealership';
import { initialDealershipData } from '@/lib/initialData';

const STORAGE_KEY = 'xpeng_dealership_data_v1';

interface DealershipContextType {
  data: DealershipData;
  isLoading: boolean;
  activeModelModal: VehicleModel | null;
  setActiveModelModal: (model: VehicleModel | null) => void;
  activeTestDriveModal: { isOpen: boolean; defaultModel?: string } | null;
  setActiveTestDriveModal: (val: { isOpen: boolean; defaultModel?: string } | null) => void;
  // Admin Operations
  updateDealerInfo: (info: Partial<DealerInfo>) => void;
  updateSocials: (socials: Partial<DealerInfo['socials']>) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  // Models CRUD
  saveModel: (model: VehicleModel) => void;
  deleteModel: (id: string) => void;
  // Promotions CRUD
  savePromotion: (promo: Promotion) => void;
  deletePromotion: (id: string) => void;
  // Testimonials CRUD
  saveTestimonial: (testi: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  // Leads
  submitLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  deleteLead: (id: string) => void;
  // Reset & Backup
  resetToDefault: () => void;
  importData: (imported: DealershipData | string) => boolean;
  exportData: () => string;
}

const DealershipContext = createContext<DealershipContextType | undefined>(undefined);

export function DealershipProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DealershipData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.models && parsed.dealerInfo) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Failed to parse stored dealership data, using defaults', e);
      }
    }
    return initialDealershipData;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeModelModal, setActiveModelModal] = useState<VehicleModel | null>(null);
  const [activeTestDriveModal, setActiveTestDriveModal] = useState<{ isOpen: boolean; defaultModel?: string } | null>(null);
  const [, startTransition] = useTransition();

  // Helper to persist data to localStorage
  const persist = (newData: DealershipData) => {
    newData.lastUpdated = new Date().toISOString();
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to persist dealership data to localStorage', e);
    }
  };

  const updateDealerInfo = (info: Partial<DealerInfo>) => {
    startTransition(() => {
      persist({
        ...data,
        dealerInfo: {
          ...data.dealerInfo,
          ...info,
        },
      });
    });
  };

  const updateSocials = (socials: Partial<DealerInfo['socials']>) => {
    startTransition(() => {
      persist({
        ...data,
        dealerInfo: {
          ...data.dealerInfo,
          socials: {
            ...data.dealerInfo.socials,
            ...socials,
          },
        },
      });
    });
  };

  const updateHeroSlides = (slides: HeroSlide[]) => {
    startTransition(() => {
      persist({
        ...data,
        heroSlides: slides,
      });
    });
  };

  const saveModel = (model: VehicleModel) => {
    startTransition(() => {
      const existingIdx = data.models.findIndex((m) => m.id === model.id);
      let newModels = [...data.models];
      if (existingIdx >= 0) {
        newModels[existingIdx] = model;
      } else {
        newModels.unshift(model);
      }
      persist({
        ...data,
        models: newModels,
      });
    });
  };

  const deleteModel = (id: string) => {
    startTransition(() => {
      persist({
        ...data,
        models: data.models.filter((m) => m.id !== id),
      });
    });
  };

  const savePromotion = (promo: Promotion) => {
    startTransition(() => {
      const existingIdx = data.promotions.findIndex((p) => p.id === promo.id);
      let newPromos = [...data.promotions];
      if (existingIdx >= 0) {
        newPromos[existingIdx] = promo;
      } else {
        newPromos.unshift(promo);
      }
      persist({
        ...data,
        promotions: newPromos,
      });
    });
  };

  const deletePromotion = (id: string) => {
    startTransition(() => {
      persist({
        ...data,
        promotions: data.promotions.filter((p) => p.id !== id),
      });
    });
  };

  const saveTestimonial = (testi: Testimonial) => {
    startTransition(() => {
      const existingIdx = data.testimonials.findIndex((t) => t.id === testi.id);
      let newTestis = [...data.testimonials];
      if (existingIdx >= 0) {
        newTestis[existingIdx] = testi;
      } else {
        newTestis.unshift(testi);
      }
      persist({
        ...data,
        testimonials: newTestis,
      });
    });
  };

  const deleteTestimonial = (id: string) => {
    startTransition(() => {
      persist({
        ...data,
        testimonials: data.testimonials.filter((t) => t.id !== id),
      });
    });
  };

  const submitLead = (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadSubmission = {
      ...lead,
      id: 'lead-' + Date.now(),
      status: 'New',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    persist({
      ...data,
      leads: [newLead, ...(data.leads || [])],
    });
  };

  const updateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    persist({
      ...data,
      leads: data.leads.map((l) => (l.id === id ? { ...l, status } : l)),
    });
  };

  const deleteLead = (id: string) => {
    persist({
      ...data,
      leads: data.leads.filter((l) => l.id !== id),
    });
  };

  const resetToDefault = () => {
    persist(initialDealershipData);
  };

  const importData = (imported: DealershipData | string): boolean => {
    try {
      const parsed: DealershipData = typeof imported === 'string' ? JSON.parse(imported) : imported;
      if (parsed && parsed.models && parsed.dealerInfo) {
        persist(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const exportData = () => {
    return JSON.stringify(data, null, 2);
  };

  return (
    <DealershipContext.Provider
      value={{
        data,
        isLoading,
        activeModelModal,
        setActiveModelModal,
        activeTestDriveModal,
        setActiveTestDriveModal,
        updateDealerInfo,
        updateSocials,
        updateHeroSlides,
        saveModel,
        deleteModel,
        savePromotion,
        deletePromotion,
        saveTestimonial,
        deleteTestimonial,
        submitLead,
        updateLeadStatus,
        deleteLead,
        resetToDefault,
        importData,
        exportData,
      }}
    >
      {children}
    </DealershipContext.Provider>
  );
}

export function useDealership() {
  const context = useContext(DealershipContext);
  if (!context) {
    throw new Error('useDealership must be used within a DealershipProvider');
  }
  return context;
}
