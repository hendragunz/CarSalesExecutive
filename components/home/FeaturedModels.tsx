'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { VehicleModel } from '@/types/dealership';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  Car,
  Battery,
  Gauge,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

interface FeaturedModelsProps {
  onSelectModel: (model: VehicleModel) => void;
  onOpenTestDrive: (modelName: string) => void;
  onViewAllModels: () => void;
}

export default function FeaturedModels({
  onSelectModel,
  onOpenTestDrive,
  onViewAllModels,
}: FeaturedModelsProps) {
  const { data } = useDealership();
  const { models, dealerInfo } = data;

  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Semua Model' },
    { id: 'SUV', label: 'SUV Listrik' },
    { id: 'MPV', label: 'MPV 7-Seater' },
    { id: 'Sedan', label: 'Sedan Sport' },
  ];

  const filteredModels =
    activeCategory === 'ALL'
      ? models
      : models.filter((m) => m.category.toUpperCase() === activeCategory);

  return (
    <section id="featured-models-section" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              LINEUP KENDARAAN LISTRIK XPENG
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pilihan Model Mobil Listrik Pintar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Dilengkapi teknologi baterai 800V silicon carbide, fitur kecerdasan otonom XNGP, dan garansi baterai seumur hidup / 8 tahun resmi.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => {
            const waModelUrl = generateWhatsAppUrl(
              dealerInfo.socials.whatsapp,
              `Halo Pak ${dealerInfo.salesName}, saya ingin minta rincian diskon promo & simulasi kredit untuk ${model.name}.`
            );

            return (
              <div
                key={model.id}
                id={`car-card-${model.slug}`}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                {/* Card Top / Image Area */}
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectModel(model)}>
                    <img
                      src={model.heroImage}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                        {model.category}
                      </span>
                      {model.isHot && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-sm">
                          HOT DEAL
                        </span>
                      )}
                    </div>

                    {/* Fast spec pill overlay */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800 text-[11px] font-bold text-blue-400">
                      ⚡ 800V Supercharge
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {model.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {model.variants?.length || 1} Varian
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{model.tagline}</p>
                    </div>

                    {/* Price Range */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                          Mulai Dari (OTR)
                        </span>
                        <span className="text-lg font-extrabold text-blue-600">
                          {model.formattedPrice}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          DP Mulai 10%
                        </span>
                        <span className="text-[11px] text-slate-500">Bunga 0% s/d 2 Thn</span>
                      </div>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 py-1 text-center">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <Battery className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-slate-900 block">{model.rangeKm.split(' ')[0]} KM</span>
                        <span className="text-[9px] text-slate-500">Jarak Tempuh</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <Gauge className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-slate-900 block">{model.acceleration0to100}</span>
                        <span className="text-[9px] text-slate-500">0-100 KM/H</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <Zap className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                        <span className="text-xs font-extrabold text-slate-900 block">15 Mnt</span>
                        <span className="text-[9px] text-slate-500">Fast Charge</span>
                      </div>
                    </div>

                    {/* Available Color Swatches */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Warna:</span>
                      <div className="flex items-center gap-1.5">
                        {model.colors.slice(0, 5).map((c) => (
                          <span
                            key={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`btn-detail-${model.slug}`}
                      onClick={() => onSelectModel(model)}
                      className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <span>Spesifikasi</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>

                    <button
                      id={`btn-testdrive-${model.slug}`}
                      onClick={() => onOpenTestDrive(model.name)}
                      className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      Test Drive
                    </button>
                  </div>

                  <a
                    id={`btn-wa-${model.slug}`}
                    href={waModelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    Tanya Diskon & Promo WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center pt-6">
          <button
            id="btn-view-all-models-bottom"
            onClick={onViewAllModels}
            className="px-8 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm border border-slate-300 inline-flex items-center gap-3 transition-all shadow-sm"
          >
            <span>Lihat Semua Model & Brosur Lengkap</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>

      </div>
    </section>
  );
}
