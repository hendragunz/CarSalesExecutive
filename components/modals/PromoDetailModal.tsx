'use client';

import React from 'react';
import { Promotion } from '@/types/dealership';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import { X, Tag, Calendar, CheckCircle2, MessageCircle, ShieldCheck, Gift } from 'lucide-react';

interface PromoDetailModalProps {
  promo: Promotion | null;
  isOpen?: boolean;
  onClose: () => void;
}

export default function PromoDetailModal({ promo, isOpen = true, onClose }: PromoDetailModalProps) {
  const { data } = useDealership();
  const { dealerInfo } = data;

  if (!promo || isOpen === false) return null;

  const waText = `Halo Pak ${dealerInfo.salesName}, saya ingin klaim promo *${promo.title}*. Mohon info ketersediaan unit dan cara klaimnya. Terima kasih!`;
  const waUrl = generateWhatsAppUrl(dealerInfo.socials.whatsapp, waText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="promo-detail-modal-card"
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100/90 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner Image */}
        <div className="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden">
          <img
            src={promo.bannerImage}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-md">
              <Gift className="w-3.5 h-3.5" />
              {promo.badge}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Periode: {promo.period}</span>
              <span>&bull;</span>
              <span>Berlaku s/d: <strong className="text-amber-600">{promo.validUntil}</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {promo.title}
            </h2>
          </div>

          {/* Description Content */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-3">
            {promo.content}
          </div>

          {/* Terms & Conditions */}
          {promo.terms && promo.terms.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Syarat & Ketentuan Promo:
              </h4>
              <ul className="space-y-2">
                {promo.terms.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              id="btn-claim-promo-wa"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Klaim Promo Ini via WhatsApp Pak Hendra
            </a>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
