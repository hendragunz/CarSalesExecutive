'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { Promotion } from '@/types/dealership';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  Tag,
  Calendar,
  Gift,
  ArrowRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface PromotionsViewProps {
  onSelectPromo: (promo: Promotion) => void;
}

export default function PromotionsView({ onSelectPromo }: PromotionsViewProps) {
  const { data } = useDealership();
  const { promotions, dealerInfo } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Semua Promo' },
    { id: 'Special Promo', label: 'Promo Spesial Bulan Ini' },
    { id: 'Low DP & Interest', label: 'DP Ringan & Bunga 0%' },
  ];

  const filtered = promotions.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            PROMOSI MINGGUAN & BULANAN RESMI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Promo Mobil Listrik XPENG Terbaru
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Dapatkan penawaran terbaik mulai dari bunga 0% s/d 2 tahun, free Wallbox Charger 7kW + instalasi, gratis asuransi, dan subsidi trade-in puluhan juta.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((promo) => {
            const waPromoUrl = generateWhatsAppUrl(
              dealerInfo.socials.whatsapp,
              `Halo Pak ${dealerInfo.salesName}, saya ingin klaim promo *${promo.title}*. Mohon info ketersediaan unit dan simulasi kreditnya.`
            );

            return (
              <div
                key={promo.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Banner Image */}
                  <div
                    className="relative aspect-[16/9] bg-slate-100 overflow-hidden cursor-pointer"
                    onClick={() => onSelectPromo(promo)}
                  >
                    <img
                      src={promo.bannerImage}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {promo.badge}
                      </span>
                    </div>

                    {/* Valid Until */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Berlaku s/d: {promo.validUntil}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <h2
                      onClick={() => onSelectPromo(promo)}
                      className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                    >
                      {promo.title}
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {promo.excerpt}
                    </p>

                    {/* Key terms checklist */}
                    {promo.terms && promo.terms.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        {promo.terms.map((t, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onSelectPromo(promo)}
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <span>Detail & Syarat Ketentuan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </button>

                  <a
                    href={waPromoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    Klaim Promo Ini ke WhatsApp
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
