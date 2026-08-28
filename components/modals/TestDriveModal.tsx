'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  X,
  Sparkles,
  Calendar,
  User,
  Phone,
  MapPin,
  Car,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Building,
  Home as HomeIcon,
} from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModel?: string;
  initialModel?: string;
}

export default function TestDriveModal({
  isOpen,
  onClose,
  defaultModel,
  initialModel,
}: TestDriveModalProps) {
  const { data, submitLead } = useDealership();
  const { dealerInfo, models } = data;

  const modelPref = initialModel || defaultModel || models[0]?.name || 'XPENG G6';

  const [selectedModel, setSelectedModel] = useState<string>(modelPref);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [locationType, setLocationType] = useState<'Home' | 'Office' | 'Showroom'>('Home');
  const [isTradeIn, setIsTradeIn] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    submitLead({
      customerName,
      phone,
      city: city || 'Jakarta / Sekitarnya',
      selectedModel,
      inquiryType: 'Test Drive',
      preferredDate: preferredDate || 'Fleksibel / Konfirmasi via WA',
      notes: `Lokasi: ${locationType} | Trade-in: ${isTradeIn ? 'Ya' : 'Tidak'} | Catatan: ${notes || '-'}`,
    });

    setIsSubmitted(true);
  };

  const leadWaText = `*FORMULIR PENGAJUAN TEST DRIVE XPENG*
---------------------------------------
Nama: ${customerName}
No. HP / WA: ${phone}
Kota / Domisili: ${city || '-'}
Unit Mobil: ${selectedModel}
Lokasi Test Drive: ${locationType} (Diantar ke Lokasi)
Pilihan Tanggal: ${preferredDate || 'Fleksibel'}
Rencana Trade-In: ${isTradeIn ? 'Ya, ingin tukar tambah' : 'Tidak'}
Catatan: ${notes || '-'}
---------------------------------------
Halo Pak ${dealerInfo.salesName}, mohon konfirmasi ketersediaan jadwal test drive unit ini. Terima kasih!`;

  const waRedirectUrl = generateWhatsAppUrl(dealerInfo.socials.whatsapp, leadWaText);

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setPhone('');
    setCity('');
    setPreferredDate('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="test-drive-modal-card"
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">Permintaan Test Drive Terkirim!</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Terima kasih <strong>{customerName}</strong>. Data Anda telah diterima oleh{' '}
                <strong>{dealerInfo.salesName}</strong>. Unit <strong>{selectedModel}</strong> siap dijadwalkan!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Unit:</span>
                <span className="font-bold text-slate-900">{selectedModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lokasi Antar:</span>
                <span className="font-bold text-blue-600">{locationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kontak Anda:</span>
                <span className="font-bold text-slate-900">{phone}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                id="btn-confirm-wa-lead"
                href={waRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Lanjutkan Konfirmasi ke WhatsApp Pak Hendra
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200"
              >
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                GRATIS &bull; Unit Diantar ke Rumah / Kantor
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Reservasi Test Drive XPENG
              </h3>
              <p className="text-xs text-slate-500">
                Rasakan akselerasi instan & fitur smart driving bersama Sales Consultant resmi.
              </p>
            </div>

            {/* Model Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Pilih Model XPENG
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {models.map((m) => {
                  const isSelected = selectedModel === m.name;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModel(m.name)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between gap-1 ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-slate-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Car className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                      </div>
                      <span className="text-xs font-bold leading-tight">{m.name}</span>
                      <span className="text-[10px] text-slate-500">{m.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hendry Wijaya"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0812-3456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Location & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Domisili / Area
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta Utara / PIK / Serpong"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  Pilihan Hari / Tanggal
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Test Drive Location Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Pilih Tempat Test Drive
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Home', label: 'Di Rumah Saya', icon: HomeIcon },
                  { id: 'Office', label: 'Di Kantor Saya', icon: Building },
                  { id: 'Showroom', label: 'Showroom Dealer', icon: MapPin },
                ].map((loc) => {
                  const Icon = loc.icon;
                  const isSelected = locationType === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocationType(loc.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{loc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trade In Checkbox */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={isTradeIn}
                onChange={(e) => setIsTradeIn(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white"
              />
              <span className="text-xs text-slate-700 font-medium">
                Saya juga ingin trade-in (tukar tambah) mobil lama saya dengan subsidi spesial.
              </span>
            </label>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Catatan Tambahan (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tolong bawa warna Silver, ingin coba suspensi udara..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                id="btn-submit-testdrive-modal"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wider uppercase shadow-sm transition-all"
              >
                Kirim Pengajuan Test Drive
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2.5 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Data Anda aman dan ditangani langsung oleh Sales Consultant resmi XPENG.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
