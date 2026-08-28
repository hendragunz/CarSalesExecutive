'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { Testimonial } from '@/types/dealership';
import {
  Users,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  Quote,
  Sparkles,
  Camera,
  MessageCircle,
  Plus,
} from 'lucide-react';

export default function TestimonialsView() {
  const { data, saveTestimonial } = useDealership();
  const { testimonials, dealerInfo } = data;

  const [filterModel, setFilterModel] = useState<string>('ALL');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New Testimonial Form State
  const [newCustName, setNewCustName] = useState('');
  const [newCustLocation, setNewCustLocation] = useState('');
  const [newCarModel, setNewCarModel] = useState('XPENG G6 Long Range');
  const [newQuote, setNewQuote] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80');

  const filtered = testimonials.filter((t) => {
    if (filterModel === 'ALL') return true;
    return t.carModel.toLowerCase().includes(filterModel.toLowerCase());
  });

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newQuote) return;

    const newTesti: Testimonial = {
      id: 'testi-' + Date.now(),
      customerName: newCustName,
      location: newCustLocation || 'Jakarta',
      carModel: newCarModel,
      deliveryDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      rating: 5,
      quote: newQuote,
      photoUrl: newPhotoUrl,
      verifiedPurchase: true,
      salesConsultant: dealerInfo.salesName,
    };

    saveTestimonial(newTesti);
    setShowSubmitModal(false);
    setNewCustName('');
    setNewQuote('');
    setNewCustLocation('');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            GALERI SERAH TERIMA UNIT RESMI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bukti Pengiriman & Kepuasan Pelanggan XPENG
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Dokumentasi nyata serah terima unit mobil listrik XPENG bersama Sales Consultant {dealerInfo.salesName}. Kepuasan, transparansi, dan keamanan transaksi Anda adalah prioritas utama kami.
          </p>
        </div>

        {/* Filter Toolbar & Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'Semua Serah Terima' },
              { id: 'G6', label: 'XPENG G6' },
              { id: 'X9', label: 'XPENG X9' },
              { id: 'G9', label: 'XPENG G9' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterModel(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterModel === cat.id
                    ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-200 whitespace-nowrap transition-colors"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Tambah Cerita Serah Terima</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 flex flex-col justify-between shadow-sm hover:border-slate-400 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Handover Photo & Details */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-100 shrink-0 shadow-sm">
                    <img
                      src={item.photoUrl}
                      alt={item.customerName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.customerName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Car Unit Delivered Badge */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-blue-600 flex items-center justify-between">
                  <span className="truncate">{item.carModel}</span>
                  <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.deliveryDate}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 / 5.0</span>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-600 leading-relaxed italic relative pl-4 border-l-2 border-blue-500">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Serah Terima
                </span>
                <span>Sales: {item.salesConsultant || dealerInfo.salesName}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal to Add Delivery Testimonial */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Tambah Dokumentasi Serah Terima</h3>
            
            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Customer / Instansi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Gunawan & Ibu Sarah"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Area / Kota</label>
                <input
                  type="text"
                  placeholder="Contoh: Pantai Indah Kapuk, Jakarta Utara"
                  value={newCustLocation}
                  onChange={(e) => setNewCustLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Unit Mobil Delivered</label>
                <input
                  type="text"
                  value={newCarModel}
                  onChange={(e) => setNewCarModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Komentar / Review Pelanggan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan proses pemesanan sampai unit tiba di rumah..."
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL Foto Serah Terima</label>
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                >
                  Simpan Testimoni
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
