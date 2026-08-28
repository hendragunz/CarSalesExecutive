'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Promotion } from '@/types/dealership';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import SocialShareBar from '@/components/social/SocialShareBar';
import {
  Tag,
  Calendar,
  Gift,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Car,
  ChevronRight,
  PhoneCall,
  User,
} from 'lucide-react';

interface PromoDetailPageProps {
  promo: Promotion;
  onOpenTestDrive?: (modelName?: string) => void;
  onNavigateHome?: () => void;
  onNavigatePromos?: () => void;
}

export default function PromoDetailPage({
  promo,
  onOpenTestDrive,
  onNavigateHome,
  onNavigatePromos,
}: PromoDetailPageProps) {
  const router = useRouter();
  const { data, setActiveTestDriveModal } = useDealership();
  const { dealerInfo, promotions } = data;

  const handleTestDrive = () => {
    if (onOpenTestDrive) {
      onOpenTestDrive();
    } else {
      setActiveTestDriveModal({ isOpen: true });
    }
  };

  const waPromoClaimUrl = generateWhatsAppUrl(
    dealerInfo.socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya membaca artikel promo *${promo.title}* di website resmi. Saya ingin klaim promo ini untuk pemesanan unit XPENG. Boleh dibantu simulasi kredit dan ketersediaan unitnya?`
  );

  const otherPromos = promotions.filter((p) => p.id !== promo.id);

  // Structured Data Schema for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    name: promo.title,
    description: promo.excerpt,
    datePosted: promo.publishDate || '2025-01-01',
    expires: promo.validUntil,
    image: promo.bannerImage,
    category: promo.category,
    publisher: {
      '@type': 'AutoDealer',
      name: dealerInfo.dealershipName,
      telephone: dealerInfo.socials.phone,
      address: dealerInfo.address,
    },
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumbs & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            {onNavigateHome ? (
              <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors">
                Home
              </button>
            ) : (
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            )}
            <span>/</span>
            {onNavigatePromos ? (
              <button onClick={onNavigatePromos} className="hover:text-blue-600 transition-colors">
                Promotions
              </button>
            ) : (
              <Link href="/promotions" className="hover:text-blue-600 transition-colors">
                Promotions
              </Link>
            )}
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{promo.title}</span>
          </nav>

          <button
            onClick={() => {
              if (onNavigatePromos) {
                onNavigatePromos();
              } else {
                router.back();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Promo</span>
          </button>
        </div>

        {/* Promo Article Header */}
        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Hero Banner Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden">
            <img
              src={promo.bannerImage}
              alt={promo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {promo.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                {promo.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Masa Berlaku: {promo.validUntil}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{promo.period}</span>
              </div>
            </div>
          </div>

          {/* Article Main Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Title & Author Info */}
            <div className="space-y-4 pb-6 border-b border-slate-200">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {promo.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">
                    XP
                  </div>
                  <span>Dipublikasikan oleh: <strong>{dealerInfo.salesName}</strong> (Official Consultant)</span>
                </div>
                <span>&bull;</span>
                <span>{dealerInfo.dealershipName}</span>
              </div>
            </div>

            {/* Excerpt Highlight Box */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-sm sm:text-base text-amber-950 font-medium leading-relaxed flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
              <div>{promo.excerpt}</div>
            </div>

            {/* Formatted Full Content */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
              {promo.content}
            </div>

            {/* Inclusions Highlights Grid */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Benefit Eksklusif Pemesanan Lewat Sales Resmi:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Free Wallbox Home Charger 7kW + Instalasi</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Garansi Baterai 8 Tahun / 160.000 KM</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                  <Gift className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Free Kaca Film V-Kool / Solar Gard Premium</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Free Jasa Servis & Sparepart 5 Tahun</span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions Box */}
            {promo.terms && promo.terms.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Syarat & Ketentuan Berlaku:
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  {promo.terms.map((term, index) => (
                    <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-snug">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Card Callout */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-4 shadow-md">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">
                  Siap Klaim Promo Ini Sebelum Kuota Habis?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Hubungi <strong>{dealerInfo.salesName}</strong> untuk konsultasi pengajuan SPK, simulasi kredit, atau booking jadwal test drive unit ke rumah/kantor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={waPromoClaimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Klaim Promo Ini ke WhatsApp</span>
                </a>

                <button
                  onClick={handleTestDrive}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Booking Test Drive Gratis</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Social Share Toolbar */}
        <SocialShareBar
          title={promo.title}
          description={promo.excerpt}
          image={promo.bannerImage}
          category={promo.category}
          type="promotion"
        />

        {/* Other Active Promotions Section */}
        {otherPromos.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Promo Menarik Lainnya
                </h3>
                <p className="text-xs text-slate-500">
                  Jelajahi paket diskon, trade-in, dan bunga 0% lainnya
                </p>
              </div>
              {onNavigatePromos ? (
                <button
                  onClick={onNavigatePromos}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Lihat Semua Promo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/promotions"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Lihat Semua Promo</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPromos.slice(0, 2).map((other) => (
                <div
                  key={other.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                      <img
                        src={other.bannerImage}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                        {other.badge}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{other.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/promotions/${other.slug}`}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <span>Lihat Detail Promo</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
