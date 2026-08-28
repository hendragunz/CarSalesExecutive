'use client';

import React from 'react';
import { useDealership } from '@/context/DealershipContext';
import { Star, ShieldCheck, MapPin, Calendar, Users, ArrowRight, Quote } from 'lucide-react';

interface DeliveryTestimonialsProps {
  onViewAll: () => void;
}

export default function DeliveryTestimonials({ onViewAll }: DeliveryTestimonialsProps) {
  const { data } = useDealership();
  const { testimonials, dealerInfo } = data;

  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              SERAH TERIMA UNIT (HANDOVER GALLERY)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Testimoni & Pengiriman Unit Customer Kami
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Bukti kepuasan pelanggan setia yang telah mempercayakan pembelian mobil listrik XPENG bersama {dealerInfo.salesName}.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Lihat Semua Galeri Serah Terima ({testimonials.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 flex flex-col justify-between shadow-sm hover:border-slate-400 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                {/* Handover Photo & Customer Header */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.photoUrl}
                    alt={item.customerName}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{item.customerName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Car Unit Delivered Badge */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-blue-600 flex items-center justify-between">
                  <span className="truncate">{item.carModel}</span>
                  <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.deliveryDate}
                  </span>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 / 5.0</span>
                </div>

                {/* Feedback Quote */}
                <p className="text-xs text-slate-600 leading-relaxed italic relative pl-4 border-l-2 border-blue-500">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Buyer
                </span>
                <span>Sales: {item.salesConsultant || dealerInfo.salesName}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
