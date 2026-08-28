'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { formatCurrencyIDR, calculateMonthlyInstallment, generateWhatsAppUrl } from '@/lib/utils';
import {
  Calculator,
  Percent,
  Calendar,
  DollarSign,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Car,
} from 'lucide-react';

export default function LoanCalculator() {
  const { data } = useDealership();
  const { models, dealerInfo } = data;

  const [selectedModelId, setSelectedModelId] = useState<string>(
    models[0]?.id || ''
  );
  const [customPrice, setCustomPrice] = useState<number>(
    models[0]?.startingPrice || 699000000
  );
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorYears, setTenorYears] = useState<number>(3);
  const [annualInterest, setAnnualInterest] = useState<number>(3.5);

  const selectedModel = models.find((m) => m.id === selectedModelId) || models[0];

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    const m = models.find((item) => item.id === modelId);
    if (m) {
      setCustomPrice(m.startingPrice);
    }
  };

  const { dpNominal, loanPrincipal, monthlyInstallment } = calculateMonthlyInstallment(
    customPrice,
    dpPercent,
    tenorYears,
    annualInterest
  );

  const waSimText = `*SIMULASI KREDIT KENDARAAN XPENG*
---------------------------------------
Model: ${selectedModel?.name || 'XPENG G6'}
Harga OTR: ${formatCurrencyIDR(customPrice)}
Uang Muka (DP ${dpPercent}%): ${formatCurrencyIDR(dpNominal)}
Jangka Waktu (Tenor): ${tenorYears} Tahun (${tenorYears * 12} Bulan)
Estimasi Angsuran / Bulan: ${formatCurrencyIDR(monthlyInstallment)}
---------------------------------------
Halo Pak ${dealerInfo.salesName}, mohon cek simulasi kredit di atas. Apakah ada diskon cashback atau paket bunga 0% yang bisa saya dapatkan? Terima kasih!`;

  const waSimUrl = generateWhatsAppUrl(dealerInfo.socials.whatsapp, waSimText);

  return (
    <section id="loan-calculator-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            SIMULASI KREDIT FLEKSIBEL
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hitung Estimasi Cicilan Bulanan XPENG
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Sesuaikan uang muka (DP) dan jangka waktu tenor dengan rencana keuangan Anda.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Form Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Select Car Model */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-blue-600" />
                  Pilih Model Mobil
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {models.map((m) => {
                    const isSelected = selectedModelId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleModelChange(m.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 text-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <div className="truncate font-extrabold">{m.name}</div>
                        <div className="text-[10px] text-blue-600 font-medium mt-0.5">
                          {m.formattedPrice}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Down Payment % Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-emerald-600" />
                    Uang Muka (DP): {dpPercent}%
                  </label>
                  <span className="text-xs font-extrabold text-emerald-600">
                    {formatCurrencyIDR(dpNominal)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={dpPercent}
                  onChange={(e) => setDpPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
                  <span>10% (DP Ringan)</span>
                  <span>20%</span>
                  <span>30%</span>
                  <span>40%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Tenor Years */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Jangka Waktu (Tenor)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((yr) => {
                    const isSelected = tenorYears === yr;
                    return (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setTenorYears(yr);
                          if (yr <= 2) {
                            setAnnualInterest(0.0); // 0% interest promo option
                          } else {
                            setAnnualInterest(3.5);
                          }
                        }}
                        className={`py-2.5 rounded-lg border text-xs font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-900'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <div>{yr} Thn</div>
                        <div className="text-[9px] font-normal text-slate-400">{yr * 12} bln</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bunga Promo Tag */}
              {tenorYears <= 2 && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    🎉 <strong>Program Bunga 0% Aktif</strong> untuk tenor 1 s/d 2 tahun!
                  </span>
                </div>
              )}
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-md text-white">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Estimasi Cicilan per Bulan
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                  {formatCurrencyIDR(monthlyInstallment)}
                  <span className="text-xs font-normal text-slate-400"> /bulan</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Harga OTR:</span>
                  <span className="font-bold text-white">{formatCurrencyIDR(customPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uang Muka ({dpPercent}%):</span>
                  <span className="font-bold text-emerald-400">{formatCurrencyIDR(dpNominal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pokok Hutang:</span>
                  <span className="font-bold text-slate-200">{formatCurrencyIDR(loanPrincipal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenor:</span>
                  <span className="font-bold text-amber-300">{tenorYears} Tahun ({tenorYears * 12}x)</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  id="btn-send-loan-wa"
                  href={waSimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Kirim Simulasi ke WhatsApp
                </a>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  *Simulasi bersifat indikatif & belum termasuk asuransi / diskon subsidi khusus.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
