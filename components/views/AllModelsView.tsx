'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { VehicleModel } from '@/types/dealership';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  Car,
  Battery,
  Gauge,
  Zap,
  Sparkles,
  ChevronRight,
  MessageCircle,
  FileText,
} from 'lucide-react';

interface AllModelsViewProps {
  onSelectModel: (model: VehicleModel) => void;
  onOpenTestDrive: (modelName: string) => void;
}

export default function AllModelsView({ onSelectModel, onOpenTestDrive }: AllModelsViewProps) {
  const { data } = useDealership();
  const { models, dealerInfo } = data;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'range'>('default');

  const categories = [
    { id: 'ALL', label: 'Semua Model' },
    { id: 'SUV', label: 'SUV Listrik' },
    { id: 'MPV', label: 'Luxury MPV' },
    { id: 'Sedan', label: 'Sedan Sport' },
  ];

  const filtered = models
    .filter((m) => {
      const matchCat = selectedCategory === 'ALL' || m.category.toUpperCase() === selectedCategory;
      const matchSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      return 0;
    });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            CATALOG RESMI KENDARAAN XPENG
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Semua Model Mobil Listrik XPENG
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Jelajahi seluruh lini produk mobil listrik cerdas XPENG dengan platform 800V silicon carbide, teknologi autonomous driving XNGP, dan garansi resmi.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari model (G6, X9, G9...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Urutkan Model"
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
            >
              <option value="default">Urutkan: Rekomendasi</option>
              <option value="price-asc">Harga: Termurah ke Termahal</option>
              <option value="price-desc">Harga: Termahal ke Termurah</option>
            </select>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((model) => {
            const waModelUrl = generateWhatsAppUrl(
              dealerInfo.socials.whatsapp,
              `Halo Pak ${dealerInfo.salesName}, saya tertarik dengan unit *${model.name}*. Boleh minta penawaran promo dan simulasi cicilannya?`
            );

            return (
              <div
                key={model.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Car Image Stage */}
                  <div
                    className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => onSelectModel(model)}
                  >
                    <img
                      src={model.heroImage}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                        {model.category}
                      </span>
                      {model.isNew && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                          NEW RELEASE
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] font-bold text-blue-300">
                      ⚡ 800V Silicon Carbide
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {model.name}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {model.variants?.length || 1} Varian
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{model.tagline}</p>
                    </div>

                    {/* Price */}
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
                        <span className="text-[10px] text-emerald-700 font-bold block">
                          DP 10% / Bunga 0%
                        </span>
                        <span className="text-[11px] text-slate-500">Ready Stock</span>
                      </div>
                    </div>

                    {/* Specs Pills */}
                    <div className="grid grid-cols-3 gap-2 py-1 text-center">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <Battery className="w-3.5 h-3.5 text-emerald-600 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">
                          {model.rangeKm.split(' ')[0]} KM
                        </span>
                        <span className="text-[9px] text-slate-500">Jarak Tempuh</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <Gauge className="w-3.5 h-3.5 text-blue-600 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">
                          {model.acceleration0to100}
                        </span>
                        <span className="text-[9px] text-slate-500">0-100 KM/H</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <Zap className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                        <span className="text-xs font-bold text-slate-900 block">15 Mnt</span>
                        <span className="text-[9px] text-slate-500">Fast Charge</span>
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Pilihan Warna:</span>
                      <div className="flex items-center gap-1.5">
                        {model.colors.map((c) => (
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

                {/* Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectModel(model)}
                      className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <span>Lihat Detail</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>

                    <button
                      onClick={() => onOpenTestDrive(model.name)}
                      className="py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                    >
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      Test Drive
                    </button>
                  </div>

                  <a
                    href={waModelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    Tanya Promo {model.name} ke WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
