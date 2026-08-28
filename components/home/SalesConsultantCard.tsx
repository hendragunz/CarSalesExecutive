'use client';

import React from 'react';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  ShieldCheck,
  Award,
  MessageCircle,
  Phone,
  Instagram,
  Send,
  Sparkles,
  Car,
  Clock,
  ThumbsUp,
} from 'lucide-react';

interface SalesConsultantCardProps {
  onOpenTestDrive: () => void;
}

export default function SalesConsultantCard({ onOpenTestDrive }: SalesConsultantCardProps) {
  const { data } = useDealership();
  const { dealerInfo } = data;
  const { socials } = dealerInfo;

  const waUrl = generateWhatsAppUrl(
    socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin konsultasi pembelian XPENG dan promo bulan ini.`
  );

  return (
    <section id="consultant-section" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Consultant Avatar & Badges (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col gap-6 text-center sm:text-left lg:text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-md relative group">
                  <img
                    src={dealerInfo.salesAvatarUrl}
                    alt={dealerInfo.salesName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Official Badge Overlay */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  VERIFIED SALES
                </div>
              </div>

              <div className="space-y-1 mt-2">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start lg:justify-center gap-2">
                  {dealerInfo.salesName}
                </h3>
                <p className="text-xs text-blue-600 font-bold tracking-wide">
                  {dealerInfo.salesTitle}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] text-slate-700 font-medium mt-1 border border-slate-200">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>ID: {dealerInfo.salesIdNumber}</span>
                </div>
              </div>
            </div>

            {/* Middle: Bio, Value Proposition & Service Commitment (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5" />
                {dealerInfo.salesBadge}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Konsultasi Mudah & Transparan Bersama Spesialis XPENG
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dealerInfo.salesBio}
              </p>

              {/* Service Highlights */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <Car className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">Test Drive ke Rumah</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Respon Cepat 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold">Data Kredit Dibantu</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold">Bonus Wallbox 7kW</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Cards & Channels (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Hubungi Sekarang:
                </span>

                {/* WhatsApp Direct */}
                <a
                  id="btn-consultant-wa"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Chat WhatsApp
                </a>

                {/* Direct Phone Call */}
                <a
                  id="btn-consultant-call"
                  href={`tel:${socials.phone}`}
                  className="w-full py-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-slate-300 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  Telepon {socials.phoneDisplay}
                </a>

                {/* Test Drive Button */}
                <button
                  id="btn-consultant-testdrive"
                  onClick={onOpenTestDrive}
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Atur Jadwal Test Drive
                </button>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <a
                  href={socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-pink-600 border border-slate-200 transition-colors shadow-sm"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={socials.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm"
                  title="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.33z" />
                  </svg>
                </a>
                <a
                  href={socials.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 border border-slate-200 transition-colors shadow-sm"
                  title="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
