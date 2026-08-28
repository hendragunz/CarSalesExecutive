'use client';

import React, { useState } from 'react';
import { VehicleModel } from '@/types/dealership';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl, formatCurrencyIDR } from '@/lib/utils';
import {
  X,
  Zap,
  Gauge,
  Battery,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  FileText,
  CheckCircle,
  ChevronRight,
  Info,
  Car,
  Layers,
} from 'lucide-react';

interface ModelDetailModalProps {
  model: VehicleModel | null;
  isOpen?: boolean;
  onClose: () => void;
  onOpenTestDrive?: (modelName: string) => void;
  onBookTestDrive?: (modelName: string) => void;
}

export default function ModelDetailModal({
  model,
  isOpen = true,
  onClose,
  onOpenTestDrive,
  onBookTestDrive,
}: ModelDetailModalProps) {
  const { data } = useDealership();
  const { dealerInfo } = data;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'variants' | 'specs'>('overview');
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  const handleTestDrive = (name: string) => {
    if (onBookTestDrive) onBookTestDrive(name);
    else if (onOpenTestDrive) onOpenTestDrive(name);
  };

  if (!model || isOpen === false) return null;

  const activeColor = model.colors[selectedColorIdx] || model.colors[0];

  const waText = `Halo Pak ${dealerInfo.salesName}, saya ingin konsultasi unit *${model.name}* (Pilihan warna: ${activeColor?.name || '-'}). Boleh minta hitungan kredit & estimasi pengiriman?`;
  const waUrl = generateWhatsAppUrl(dealerInfo.socials.whatsapp, waText);

  const handleBrochureDownload = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      // Open WhatsApp with brochure request prefilled for high sales conversion
      const brochureWa = generateWhatsAppUrl(
        dealerInfo.socials.whatsapp,
        `Halo Pak ${dealerInfo.salesName}, saya ingin minta file e-Brochure PDF resmi lengkap untuk unit ${model.name}. Terima kasih!`
      );
      window.open(brochureWa, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="model-detail-modal-card"
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100/90 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-20 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Hero Stage with Color Switcher */}
        <div className="relative bg-gradient-to-b from-slate-50 to-white p-6 sm:p-8 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {model.category}
                </span>
                {model.isHot && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                    BEST SELLER
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                {model.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{model.tagline}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-500 font-medium block">Mulai Dari (OTR)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                {model.formattedPrice}
              </span>
            </div>
          </div>

          {/* Main Car Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group shadow-md">
            <img
              src={model.heroImage}
              alt={model.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Color Overlay Indicator */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-xs flex items-center gap-2 text-slate-700 shadow-sm">
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                style={{ backgroundColor: activeColor?.hex }}
              />
              <span className="font-bold">{activeColor?.name}</span>
            </div>
          </div>

          {/* Color Selector Swatches */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-semibold mr-1">Pilihan Warna:</span>
              {model.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                    selectedColorIdx === idx
                      ? 'border-blue-600 scale-110 shadow-md ring-2 ring-blue-200'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColorIdx === idx && (
                    <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white shadow-sm"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick action triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleBrochureDownload}
                disabled={downloadingBrochure}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                {downloadingBrochure ? 'Menyiapkan...' : 'Download e-Brochure'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-slate-200 flex gap-6 text-sm font-bold bg-white">
          {[
            { id: 'overview', label: 'Ringkasan & Fitur' },
            { id: 'variants', label: `Daftar Varian & Harga (${model.variants?.length || 0})` },
            { id: 'specs', label: 'Spesifikasi Teknis' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Battery className="w-4 h-4 text-emerald-600" />
                    Jarak Tempuh
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">{model.rangeKm}</div>
                  <div className="text-[11px] text-slate-500">Kapasitas {model.batteryCapacity}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Gauge className="w-4 h-4 text-blue-600" />
                    Akselerasi 0-100
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">{model.acceleration0to100}</div>
                  <div className="text-[11px] text-slate-500">{model.maxPower}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Ultra Fast Charge
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">15 Menit</div>
                  <div className="text-[11px] text-slate-500">800V SEPA Architecture</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    Garansi Baterai
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">8 Tahun</div>
                  <div className="text-[11px] text-slate-500">/ 160.000 KM Resmi</div>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                {model.description}
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Keunggulan & Teknologi Utama
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {model.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Images Gallery */}
              {model.gallery && model.gallery.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Galeri Foto Eksterior & Interior
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {model.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                      >
                        <img
                          src={img}
                          alt={`${model.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'variants' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-xs text-slate-600">
                Pilih varian {model.name} yang sesuai dengan kebutuhan jarak tempuh dan preferensi performa Anda:
              </p>
              <div className="space-y-3">
                {model.variants?.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900">{v.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                          {v.drivetrain}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span>
                          Jarak: <strong className="text-slate-800">{v.range}</strong>
                        </span>
                        <span>&bull;</span>
                        <span>
                          0-100 km/h: <strong className="text-slate-800">{v.acceleration}</strong>
                        </span>
                        <span>&bull;</span>
                        <span>
                          Baterai: <strong className="text-slate-800">{v.battery}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Harga OTR</span>
                        <span className="text-xl font-extrabold text-blue-600">{v.formattedPrice}</span>
                      </div>
                      <a
                        href={generateWhatsAppUrl(
                          dealerInfo.socials.whatsapp,
                          `Halo Pak ${dealerInfo.salesName}, saya tertarik dengan varian *${v.name}* (${v.formattedPrice}). Boleh minta penawaran diskon promo & simulasi kreditnya?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        Tanya Promo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 divide-y divide-slate-200 text-xs">
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Tipe Kendaraan</span>
                  <span className="text-slate-900 font-medium">{model.category} EV (Pure Electric)</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Platform & Arsitektur</span>
                  <span className="text-slate-900 font-medium">800V High-Voltage Silicon Carbide (SiC)</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Kapasitas Baterai</span>
                  <span className="text-slate-900 font-medium">{model.batteryCapacity}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Jarak Tempuh Maksimal</span>
                  <span className="text-slate-900 font-medium">{model.rangeKm}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Waktu Pengisian Supercharging</span>
                  <span className="text-slate-900 font-medium">{model.fastChargeTime}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Akselerasi 0 - 100 km/h</span>
                  <span className="text-slate-900 font-medium">{model.acceleration0to100}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Tenaga & Torsi Maksimal</span>
                  <span className="text-slate-900 font-medium">{model.maxPower}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-slate-500 font-semibold">Sistem Penggerak Roda</span>
                  <span className="text-slate-900 font-medium">{model.driveType}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Call to Action Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              id="btn-modal-book-testdrive"
              onClick={() => {
                onClose();
                handleTestDrive(model.name);
              }}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Jadwalkan Test Drive {model.name}
            </button>

            <a
              id="btn-modal-wa-sales"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat WhatsApp Pak Hendra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
