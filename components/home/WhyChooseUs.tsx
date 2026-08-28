'use client';

import React from 'react';
import { useDealership } from '@/context/DealershipContext';
import {
  ShieldCheck,
  Zap,
  Car,
  Percent,
  RefreshCw,
  Sparkles,
  Award,
  CheckCircle,
} from 'lucide-react';

export default function WhyChooseUs() {
  const { data } = useDealership();
  const { usps, dealerInfo } = data;

  const iconMap: Record<string, any> = {
    ShieldCheck,
    Zap,
    Car,
    Percent,
    RefreshCw,
    Sparkles,
  };

  return (
    <section id="why-choose-us-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            KEUNGGULAN DEALER RESMI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengapa Memilih Membeli XPENG di Sini?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Komitmen pelayanan terbaik dari awal konsultasi hingga unit terparkir di garasi rumah Anda.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp) => {
            const Icon = iconMap[usp.icon] || Sparkles;
            return (
              <div
                key={usp.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 hover:border-blue-400 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {usp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-extrabold text-white">
              Siap Beralih ke Masa Depan Mobilitas Listrik?
            </h4>
            <p className="text-xs text-slate-300">
              Jadwalkan test drive gratis ke rumah Anda hari ini bersama {dealerInfo.salesName}.
            </p>
          </div>
          <a
            href={`https://wa.me/${dealerInfo.socials.whatsapp}?text=Halo%20Pak%20${dealerInfo.salesName},%20saya%20ingin%20info%20promo%20terbaru%20XPENG`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-sm"
          >
            Konsultasi WhatsApp Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
