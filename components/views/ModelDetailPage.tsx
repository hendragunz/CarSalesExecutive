'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VehicleModel } from '@/types/dealership';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import SocialShareBar from '@/components/social/SocialShareBar';
import {
  Car,
  Battery,
  Gauge,
  Zap,
  ShieldCheck,
  CheckCircle,
  FileText,
  MessageCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Calculator,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface ModelDetailPageProps {
  model: VehicleModel;
  onOpenTestDrive?: (modelName: string) => void;
  onNavigateHome?: () => void;
  onNavigateModels?: () => void;
}

export default function ModelDetailPage({
  model,
  onOpenTestDrive,
  onNavigateHome,
  onNavigateModels,
}: ModelDetailPageProps) {
  const router = useRouter();
  const { data, setActiveTestDriveModal } = useDealership();
  const { dealerInfo, models } = data;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'variants' | 'specs' | 'gallery'>('overview');
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(model.heroImage);

  // Loan calculator quick state
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorYears, setTenorYears] = useState<number>(3);

  const activeColor = model.colors[selectedColorIdx] || model.colors[0];

  const handleTestDrive = () => {
    if (onOpenTestDrive) {
      onOpenTestDrive(model.name);
    } else {
      setActiveTestDriveModal({ isOpen: true, defaultModel: model.name });
    }
  };

  const handleBrochureDownload = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob(
        [
          `BROSUR RESMI XPENG - ${model.name}\n\n` +
            `Model: ${model.name}\n` +
            `Tagline: ${model.tagline}\n` +
            `Kategori: ${model.category} Electric Vehicle\n` +
            `Harga OTR Mulai Dari: ${model.formattedPrice}\n` +
            `Jarak Tempuh: ${model.rangeKm}\n` +
            `Akselerasi 0-100: ${model.acceleration0to100}\n` +
            `Baterai: ${model.batteryCapacity}\n` +
            `Fast Charging: ${model.fastChargeTime}\n\n` +
            `Varian Tersedia:\n` +
            model.variants.map((v) => `- ${v.name}: ${v.formattedPrice} (Jarak: ${v.range})`).join('\n') +
            `\n\nSales Consultant Resmi:\n${dealerInfo.salesName} (${dealerInfo.salesTitle})\n` +
            `WhatsApp: ${dealerInfo.socials.whatsappDisplay}\n` +
            `Dealer: ${dealerInfo.dealershipName}, ${dealerInfo.city}`,
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `Brosur_XPENG_${model.name.replace(/\s+/g, '_')}_Resmi.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingBrochure(false);
    }, 800);
  };

  // Loan computation
  const basePrice = model.startingPrice;
  const dpAmount = (basePrice * dpPercent) / 100;
  const loanPrincipal = basePrice - dpAmount;
  const interestRate = tenorYears <= 2 ? 0.0 : tenorYears === 3 ? 0.0299 : tenorYears === 4 ? 0.035 : 0.042;
  const totalInterest = loanPrincipal * interestRate * tenorYears;
  const totalLoan = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoan / (tenorYears * 12));

  const waInquiryUrl = generateWhatsAppUrl(
    dealerInfo.socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya membaca informasi tentang *${model.name}* (${model.formattedPrice}) di website. Boleh minta rincian promo, ketersediaan unit warna ${activeColor?.name}, dan jadwal test drive?`
  );

  const otherModels = models.filter((m) => m.id !== model.id);

  // Structured Data Schema for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: model.name,
    description: model.description,
    image: model.heroImage,
    brand: {
      '@type': 'Brand',
      name: 'XPENG',
    },
    vehicleConfiguration: model.category,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      engineType: 'Electric Motor',
      fuelType: 'Electricity',
    },
    offers: {
      '@type': 'Offer',
      price: model.startingPrice,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: dealerInfo.dealershipName,
        telephone: dealerInfo.socials.phone,
        address: dealerInfo.address,
      },
    },
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
            {onNavigateModels ? (
              <button onClick={onNavigateModels} className="hover:text-blue-600 transition-colors">
                All Models
              </button>
            ) : (
              <Link href="/models" className="hover:text-blue-600 transition-colors">
                All Models
              </Link>
            )}
            <span>/</span>
            <span className="text-slate-900 font-bold">{model.name}</span>
          </nav>

          <button
            onClick={() => {
              if (onNavigateModels) {
                onNavigateModels();
              } else {
                router.back();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Model</span>
          </button>
        </div>

        {/* Hero Title & Price Showcase */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {model.category} EV (Pure Electric)
                </span>
                {model.isHot && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                    BEST SELLER
                  </span>
                )}
                {model.isNew && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    NEW RELEASE
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                  Ready Stock Jakarta
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {model.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600">{model.tagline}</p>
            </div>

            {/* Price & Action Header Block */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 bg-slate-50 lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-none border-slate-200">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold block lg:text-right">
                  Harga Resmi OTR Jakarta Mulai
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                  {model.formattedPrice}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleTestDrive}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Booking Test Drive</span>
                </button>
                <a
                  href={waInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Tanya Sales</span>
                </a>
              </div>
            </div>
          </div>

          {/* Car Image Stage with Color Switcher */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
              <img
                src={selectedImage || model.heroImage}
                alt={`${model.name} ${activeColor?.name || ''}`}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs flex items-center gap-2.5 text-slate-800 shadow-sm">
                <span
                  className="w-4 h-4 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: activeColor?.hex }}
                />
                <span className="font-bold">Warna: {activeColor?.name}</span>
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-blue-300">
                ⚡ 800V SEPA Architecture
              </div>
            </div>

            {/* Color Swatches and Gallery Thumbnails */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-600 font-bold mr-1">Pilihan Warna:</span>
                {model.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColorIdx(idx);
                      setSelectedImage(model.heroImage);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedColorIdx === idx
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-2 ring-blue-200'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBrochureDownload}
                disabled={downloadingBrochure}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-2 transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4 text-amber-600" />
                {downloadingBrochure ? 'Menyiapkan Dokumen...' : `Unduh Brosur ${model.name}`}
              </button>
            </div>
          </div>
        </div>

        {/* Social Share Toolbar (Top) */}
        <SocialShareBar
          title={`XPENG ${model.name} - Mobil Listrik Pintar 800V`}
          description={`Jelajahi spesifikasi, harga resmi OTR ${model.formattedPrice}, jarak tempuh ${model.rangeKm}, dan promo bunga 0% untuk XPENG ${model.name}.`}
          category={model.category}
          price={model.formattedPrice}
          image={model.heroImage}
          type="model"
        />

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Battery className="w-4 h-4 text-emerald-600" />
              Jarak Tempuh Maksimal
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{model.rangeKm}</div>
            <div className="text-xs text-slate-500">Kapasitas {model.batteryCapacity}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Gauge className="w-4 h-4 text-blue-600" />
              Akselerasi 0-100 km/h
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{model.acceleration0to100}</div>
            <div className="text-xs text-slate-500">{model.maxPower}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Zap className="w-4 h-4 text-amber-500" />
              Supercharging 800V
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">15 Menit</div>
            <div className="text-xs text-slate-500">{model.fastChargeTime}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Garansi Resmi Pabrik
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">8 Tahun</div>
            <div className="text-xs text-slate-500">/ 160.000 KM Baterai & Motor</div>
          </div>
        </div>

        {/* Detailed Tabs Navigation */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 border-b border-slate-200 flex gap-6 text-sm font-bold bg-white overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Ringkasan & Fitur Cerdas' },
              { id: 'variants', label: `Daftar Varian & Harga (${model.variants?.length || 0})` },
              { id: 'specs', label: 'Spesifikasi Teknis Lengkap' },
              { id: 'gallery', label: 'Galeri Foto Lengkap' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in">
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Tentang {model.name}</h3>
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-3">
                    <p>{model.description}</p>
                    <p className="text-xs text-slate-500">
                      Sebagai dealer resmi XPENG Indonesia, kami menyediakan garansi purna jual resmi, ketersediaan suku cadang terjamin, teknisi tersertifikasi EV internasional, serta instalasi Wallbox Charger 7kW gratis langsung di hunian Anda.
                    </p>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Teknologi & Keunggulan Utama
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {model.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interior & Cockpit Feature Callout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={model.interiorImage || model.gallery[1] || model.heroImage}
                      alt="Interior Cockpit"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 bg-white space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900">Kemewahan Cockpit Cerdas</h4>
                      <p className="text-xs text-slate-500">
                        Xmart OS dengan Snapdragon 8155, jok ergonomis ventilated seats, dan audio surround cinema.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img
                      src={model.sideImage || model.gallery[2] || model.heroImage}
                      alt="Exterior Aerodynamics"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 bg-white space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900">Desain Aerodinamis Modern</h4>
                      <p className="text-xs text-slate-500">
                        Koefisien drag ultra rendah untuk efisiensi konsumsi daya dan jarak tempuh maksimal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. VARIANTS TAB */}
            {activeTab === 'variants' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Daftar Varian & Harga OTR {model.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih tipe penggerak dan kapasitas baterai yang sesuai dengan preferensi mobilitas Anda:
                  </p>
                </div>

                <div className="space-y-4">
                  {model.variants.map((v, idx) => {
                    const waVariantUrl = generateWhatsAppUrl(
                      dealerInfo.socials.whatsapp,
                      `Halo Pak ${dealerInfo.salesName}, saya ingin minta rincian penawaran promo & simulasi kredit untuk varian *${model.name} ${v.name}* (${v.formattedPrice}).`
                    );

                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-extrabold text-slate-900">{v.name}</h4>
                            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                              {v.drivetrain}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                            <span>
                              Jarak Tempuh: <strong className="text-slate-900">{v.range}</strong>
                            </span>
                            <span>&bull;</span>
                            <span>
                              0-100 km/h: <strong className="text-slate-900">{v.acceleration}</strong>
                            </span>
                            <span>&bull;</span>
                            <span>
                              Baterai: <strong className="text-slate-900">{v.battery}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-200">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase font-semibold">
                              Harga Resmi (OTR)
                            </span>
                            <span className="text-2xl font-extrabold text-blue-600">
                              {v.formattedPrice}
                            </span>
                          </div>

                          <a
                            href={waVariantUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <MessageCircle className="w-4 h-4 fill-white" />
                            <span>Tanya Varian Ini</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. SPECS TAB */}
            {activeTab === 'specs' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Spesifikasi Teknis {model.name}
                </h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 divide-y divide-slate-200 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Kategori Kendaraan</span>
                    <span className="text-slate-900 font-medium">{model.category} EV (Pure Battery Electric Vehicle)</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Platform & Arsitektur</span>
                    <span className="text-slate-900 font-medium">800V High-Voltage Silicon Carbide (SiC) SEPA 2.0</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Kapasitas Baterai</span>
                    <span className="text-slate-900 font-medium">{model.batteryCapacity}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Jarak Tempuh Maksimal</span>
                    <span className="text-slate-900 font-medium">{model.rangeKm}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Waktu Supercharging (10-80%)</span>
                    <span className="text-slate-900 font-medium">{model.fastChargeTime}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Akselerasi 0 - 100 km/h</span>
                    <span className="text-slate-900 font-medium">{model.acceleration0to100}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Tenaga & Torsi Maksimal</span>
                    <span className="text-slate-900 font-medium">{model.maxPower}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Sistem Penggerak</span>
                    <span className="text-slate-900 font-medium">{model.driveType}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Sistem ADAS / Otonom</span>
                    <span className="text-slate-900 font-medium">XNGP Intelligent Driving with Dual Orin-X Chip</span>
                  </div>
                  <div className="grid grid-cols-2 p-4">
                    <span className="text-slate-500 font-semibold">Garansi Baterai & Motor</span>
                    <span className="text-slate-900 font-medium">8 Tahun / 160.000 KM Resmi APM Indonesia</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-in fade-in">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Galeri Foto {model.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[model.heroImage, model.sideImage, model.interiorImage, model.rearImage, ...(model.gallery || [])]
                    .filter(Boolean)
                    .map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img!)}
                        className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group hover:border-blue-400 transition-all"
                      >
                        <img
                          src={img}
                          alt={`${model.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Loan Simulation Block */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                <Calculator className="w-3.5 h-3.5" />
                SIMULASI KREDIT FLEKSIBEL
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Hitung Cicilan {model.name}
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              *Estimasi perhitungan DP & cicilan bulanan leasing resmi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* DP Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Uang Muka (DP): {dpPercent}%</span>
                  <span className="text-blue-600">Rp {dpAmount.toLocaleString('id-ID')}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10% (DP Ringan)</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>50% (DP Besar)</span>
                </div>
              </div>

              {/* Tenor Select */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih Jangka Waktu (Tenor):
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((year) => (
                    <button
                      key={year}
                      onClick={() => setTenorYears(year)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        tenorYears === year
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {year} Tahun {year <= 2 && <span className="block text-[9px] text-amber-300 font-extrabold">0%</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Result Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-md">
              <span className="text-xs font-medium text-slate-400 block">
                Estimasi Angsuran Bulanan
              </span>
              <div className="text-3xl font-extrabold text-blue-400">
                Rp {monthlyInstallment.toLocaleString('id-ID')}
                <span className="text-xs font-normal text-slate-300"> / bulan</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga OTR:</span>
                  <span>{model.formattedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total DP ({dpPercent}%):</span>
                  <span>Rp {dpAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenor:</span>
                  <span>{tenorYears} Tahun ({tenorYears * 12}x Cicilan)</span>
                </div>
              </div>

              <a
                href={generateWhatsAppUrl(
                  dealerInfo.socials.whatsapp,
                  `Halo Pak ${dealerInfo.salesName}, saya mencoba simulasi kredit untuk *${model.name}* dengan DP ${dpPercent}% (Rp ${dpAmount.toLocaleString('id-ID')}) tenor ${tenorYears} tahun. Boleh minta hitungan resmi dari leasing Maybank/BCA/MTF?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Ajukan Hitungan Resmi ke WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Social Share Toolbar (Bottom) */}
        <SocialShareBar
          title={`XPENG ${model.name} - Mobil Listrik Pintar 800V`}
          description={`Jelajahi spesifikasi, harga resmi OTR ${model.formattedPrice}, jarak tempuh ${model.rangeKm}, dan promo bunga 0% untuk XPENG ${model.name}.`}
          category={model.category}
          price={model.formattedPrice}
          image={model.heroImage}
          type="model"
        />

        {/* Related / Other Models Exploration */}
        {otherModels.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Model Mobil XPENG Lainnya
                </h3>
                <p className="text-xs text-slate-500">
                  Bandingkan dengan lini kendaraan listrik pintar lainnya dari XPENG
                </p>
              </div>
              {onNavigateModels ? (
                <button
                  onClick={onNavigateModels}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/models"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherModels.slice(0, 3).map((other) => (
                <div
                  key={other.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                      <img
                        src={other.heroImage}
                        alt={other.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white">
                        {other.category}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {other.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{other.tagline}</p>
                      <div className="text-sm font-extrabold text-blue-600">{other.formattedPrice}</div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/models/${other.slug}`}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <span>Lihat Detail {other.name}</span>
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
