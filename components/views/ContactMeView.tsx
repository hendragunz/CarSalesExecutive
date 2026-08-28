'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  PhoneCall,
  MessageCircle,
  Instagram,
  Send,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  CreditCard,
  CheckCircle2,
  Headphones,
  Calendar,
  User,
  Phone,
  Car,
  ExternalLink,
} from 'lucide-react';

export default function ContactMeView() {
  const { data, submitLead } = useDealership();
  const { dealerInfo, models } = data;
  const { socials } = dealerInfo;

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formModel, setFormModel] = useState(models[0]?.name || 'XPENG G6');
  const [formInquiryType, setFormInquiryType] = useState<any>('Test Drive');
  const [formNotes, setFormNotes] = useState('');
  const [isSent, setIsSent] = useState(false);

  const waContactUrl = generateWhatsAppUrl(
    socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin konsultasi langsung mengenai mobil XPENG & promo terkini.`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    submitLead({
      customerName: formName,
      phone: formPhone,
      city: 'Hubungi via Contact Page',
      selectedModel: formModel,
      inquiryType: formInquiryType,
      notes: `${formNotes} (Email: ${formEmail || '-'})`,
    });

    setIsSent(true);
  };

  const dispatchWaLead = () => {
    const text = `*PESAN KONSULTASI DEALERSHIP XPENG*
---------------------------------------
Nama: ${formName}
No. HP: ${formPhone}
Email: ${formEmail || '-'}
Unit Mobil: ${formModel}
Jenis Kebutuhan: ${formInquiryType}
Pesan / Catatan: ${formNotes || '-'}
---------------------------------------
Halo Pak ${dealerInfo.salesName}, saya ingin meminta info lebih lanjut. Terima kasih!`;
    window.open(generateWhatsAppUrl(socials.whatsapp, text), '_blank');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            HUBUNGI SALES CONSULTANT RESMI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hubungi {dealerInfo.salesName} & Lokasi Dealer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Dapatkan pelayanan prima, konsultasi unit, test drive gratis ke rumah, simulasi kredit termurah, dan jaminan keamanan transaksi resmi XPENG Motors.
          </p>
        </div>

        {/* Top Split: Consultant Profile & Direct Channels (Left) vs Fast Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Consultant Profile & Direct Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md shrink-0">
                  <img
                    src={dealerInfo.salesAvatarUrl}
                    alt={dealerInfo.salesName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                    Official Product Specialist
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">{dealerInfo.salesName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{dealerInfo.salesTitle}</p>
                  <p className="text-[11px] text-amber-600 font-semibold flex items-center justify-center sm:justify-start gap-1">
                    <Award className="w-3.5 h-3.5" />
                    ID: {dealerInfo.salesIdNumber}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {dealerInfo.salesBio}
              </p>

              {/* Direct Channels List */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Saluran Kontak Langsung:
                </span>

                {/* WhatsApp */}
                <a
                  id="contact-page-wa"
                  href={waContactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-sm hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <div>
                      <span className="block text-white font-extrabold">Chat WhatsApp Resmi</span>
                      <span className="text-[11px] text-emerald-100 font-normal">{socials.whatsappDisplay}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Phone Call */}
                <a
                  id="contact-page-phone"
                  href={`tel:${socials.phone}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs transition-all hover:border-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="block text-slate-900">Telepon Langsung</span>
                      <span className="text-[11px] text-slate-500 font-normal">{socials.phoneDisplay}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">Tekan Panggil</span>
                </a>

                {/* Instagram */}
                <a
                  id="contact-page-ig"
                  href={socials.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs transition-all hover:border-pink-300"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <div>
                      <span className="block text-slate-900">Instagram Sales</span>
                      <span className="text-[11px] text-pink-600 font-normal">{socials.instagram}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                {/* TikTok */}
                <a
                  id="contact-page-tiktok"
                  href={socials.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs transition-all hover:border-slate-400"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 fill-slate-900" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.33z" />
                    </svg>
                    <div>
                      <span className="block text-slate-900">TikTok Official</span>
                      <span className="text-[11px] text-slate-500 font-normal">{socials.tiktok}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                {/* Telegram */}
                <a
                  id="contact-page-telegram"
                  href={socials.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs transition-all hover:border-blue-300"
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5 text-sky-500" />
                    <div>
                      <span className="block text-slate-900">Telegram Chat</span>
                      <span className="text-[11px] text-sky-600 font-normal">{socials.telegram}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Fast Inquiry / Consultation Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  RESPON CEPAT 10 MENIT
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Kirim Pesan / Pengajuan Test Drive & Promo
                </h2>
                <p className="text-xs text-slate-500">
                  Silakan isi form di bawah ini. Tim kami akan segera menghubungi Anda dengan penawaran terbaik.
                </p>
              </div>

              {isSent ? (
                <div className="p-8 text-center space-y-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">Pesan Anda Berhasil Terkirim!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Pak <strong>{dealerInfo.salesName}</strong> akan segera memproses pengajuan Anda.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={dispatchWaLead}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Lanjutkan ke WhatsApp Pak Hendra
                    </button>
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 border border-slate-200"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0812-xxxx-xxxx"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-indigo-600" />
                        Model XPENG Yang Diminati
                      </label>
                      <select
                        value={formModel}
                        onChange={(e) => setFormModel(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        {models.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} ({m.formattedPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Jenis Kebutuhan</label>
                      <select
                        value={formInquiryType}
                        onChange={(e) => setFormInquiryType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Test Drive">Booking Test Drive ke Rumah</option>
                        <option value="Price Quote">Minta Rincian Diskon & Harga OTR</option>
                        <option value="Credit Simulation">Simulasi Kredit DP & Cicilan</option>
                        <option value="Brochure">Katalog & Brosur PDF</option>
                        <option value="Consultation">Tukar Tambah (Trade-In)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Pesan atau Pertanyaan Khusus
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Tolong kirimkan tabel angsuran DP 20% dan ketersediaan warna Silver..."
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-contact-form"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Kirim Permintaan Sekarang
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Showroom Location, Interactive Map & Official Security */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Map (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                Peta Lokasi Showroom XPENG
              </h3>
              <a
                href={dealerInfo.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                Buka Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100">
              <iframe
                title="XPENG Dealer Map Embed"
                src={dealerInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Operational Hours & Safe SPK (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Jam Operasional Showroom
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Senin - Jumat:</span>
                  <span className="font-bold text-slate-900">08:30 - 20:00 WIB</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Sabtu - Minggu:</span>
                  <span className="font-bold text-slate-900">08:30 - 20:00 WIB (Buka)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Layanan Test Drive:</span>
                  <span className="font-bold text-blue-600">Setiap Hari (Sesuai Reservasi)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1 border border-slate-200">
                <span className="text-slate-900 font-bold block">Alamat Dealer:</span>
                <p>{dealerInfo.address}</p>
              </div>
            </div>

            {/* Bank Security */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2.5 shadow-sm text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Rekening Resmi Booking Fee (SPK)</span>
              </div>
              <p className="text-[11px] text-amber-800/80">
                {dealerInfo.bookingFeeAccount.note}
              </p>
              <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1 text-xs text-slate-800">
                <div>Bank: <strong>{dealerInfo.bookingFeeAccount.bankName}</strong></div>
                <div>No. Rek: <strong className="text-blue-700 font-mono text-sm">{dealerInfo.bookingFeeAccount.accountNumber}</strong></div>
                <div>A/N: <strong>{dealerInfo.bookingFeeAccount.accountHolder}</strong></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
