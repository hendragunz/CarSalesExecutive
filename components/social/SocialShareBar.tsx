'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  QrCode,
  Sparkles,
  ExternalLink,
  X,
} from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  description: string;
  url?: string;
  category?: string;
  price?: string;
  image?: string;
  type: 'model' | 'promotion';
}

export default function SocialShareBar({
  title,
  description,
  url,
  category,
  price,
  image,
  type,
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showHelperModal, setShowHelperModal] = useState<string | null>(null);
  const [helperCopied, setHelperCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Derive current URL safely for both SSR and Client
  const currentUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');

  // Formatted share texts
  const shareTextWhatsApp =
    type === 'model'
      ? `🚗 *${title}* ${price ? `(${price})` : ''}\n${description}\n\nJelajahi spesifikasi lengkap & promo di:\n${currentUrl}`
      : `⚡ *PROMO XPENG:* ${title}\n${description}\n\nKlaim promo & cek syarat ketentuan di:\n${currentUrl}`;

  const instagramCaption =
    type === 'model'
      ? `🚗 ${title} ${price ? `\n💰 Mulai Dari ${price}` : ''}\n\n${description}\n\n⚡ 800V Supercharging & Jarak Tempuh Ekstra Jauh\n🛡️ Garansi Baterai 8 Tahun / 160.000 KM Resmi\n📍 Info Pemesanan & Test Drive: Klik link di bio!\n\n#XPENG #XPENGIndonesia #MobilListrik #${title.replace(/\s+/g, '')} #ElectricVehicle #EVIndonesia #HendraXPENG #PromoXPENG`
      : `🔥 PROMO SPESIAL XPENG: ${title}\n\n${description}\n\n🎁 Free Wallbox Charger 7kW + Bunga 0% s/d 2 Tahun + Subsidi Trade-in\n📍 Info & Syarat Ketentuan: Klik link di bio!\n\n#PromoXPENG #XPENGIndonesia #MobilListrik #KreditMobilListrik #EVJakarta #HendraXPENG`;

  const tikTokCaption =
    type === 'model'
      ? `${title} - Mobil Listrik Pintar Masa Depan! ${price ? `Mulai ${price}.` : ''} Test drive gratis ke rumah. Cek link di bio! #XPENG #MobilListrik #EV #Otomotif`
      : `Jangan sampai kelewatan! ${title}. Cek promo dan simulasi kreditnya di bio ya! #PromoXPENG #MobilListrik #EV #HendraXPENG`;

  // Action handlers
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyHelperText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHelperCopied(true);
      setTimeout(() => setHelperCopied(false), 2500);
    } catch {
      setHelperCopied(true);
      setTimeout(() => setHelperCopied(false), 2500);
    }
  };

  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTextWhatsApp)}`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div id="social-share-container" className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
              Bagikan {type === 'model' ? 'Mobil' : 'Promo'} Ini ke Media Sosial
            </h4>
            <p className="text-[11px] text-slate-500">
              Share penawaran ini ke WhatsApp, Instagram, TikTok, dan kerabat Anda
            </p>
          </div>
        </div>

        {/* Copy Link & Native Web Share Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            id="btn-copy-share-url"
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Tautan</span>
              </>
            )}
          </button>

          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              id="btn-native-share-mobile"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share App</span>
            </button>
          )}
        </div>
      </div>

      {/* Social Icons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 pt-2 border-t border-slate-200">
        {/* WhatsApp */}
        <a
          href={waShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="share-btn-whatsapp"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all"
          title="Bagikan ke WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Instagram Helper */}
        <button
          onClick={() => setShowHelperModal('instagram')}
          id="share-btn-instagram"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 hover:from-purple-100 hover:to-pink-100 text-pink-700 border border-pink-200 text-xs font-bold transition-all"
          title="Format Caption & Link Instagram"
        >
          <span className="w-4 h-4 rounded bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-black">
            IG
          </span>
          <span className="truncate">Instagram</span>
        </button>

        {/* TikTok Helper */}
        <button
          onClick={() => setShowHelperModal('tiktok')}
          id="share-btn-tiktok"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-bold transition-all"
          title="Format Caption TikTok"
        >
          <span className="w-4 h-4 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
            TT
          </span>
          <span className="truncate">TikTok</span>
        </button>

        {/* Telegram */}
        <a
          href={telegramShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="share-btn-telegram"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all"
          title="Bagikan ke Telegram"
        >
          <Send className="w-3.5 h-3.5 text-sky-600" />
          <span className="truncate">Telegram</span>
        </a>

        {/* Facebook */}
        <a
          href={fbShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="share-btn-facebook"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all"
          title="Bagikan ke Facebook"
        >
          <Facebook className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
          <span className="truncate">Facebook</span>
        </a>

        {/* X / Twitter */}
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="share-btn-twitter"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-all"
          title="Bagikan ke Twitter / X"
        >
          <Twitter className="w-3.5 h-3.5 fill-slate-800 text-slate-800" />
          <span className="truncate">Twitter / X</span>
        </a>

        {/* QR Code */}
        <button
          onClick={() => setShowQrModal(true)}
          id="share-btn-qr"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all"
          title="Tampilkan QR Code"
        >
          <QrCode className="w-3.5 h-3.5 text-slate-600" />
          <span className="truncate">QR Code</span>
        </button>
      </div>

      {/* Instagram & TikTok Helper Modal */}
      {showHelperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowHelperModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg font-extrabold text-slate-900">
                {showHelperModal === 'instagram'
                  ? 'Bagikan ke Instagram (Feed / Stories / Bio)'
                  : 'Bagikan ke TikTok (Caption & Bio Link)'}
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Salin caption yang telah dioptimasi dengan hashtag viral otomotif & tautan resmi untuk diposting ke{' '}
              {showHelperModal === 'instagram' ? 'Instagram' : 'TikTok'}:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-line max-h-48 overflow-y-auto leading-relaxed">
              {showHelperModal === 'instagram' ? instagramCaption : tikTokCaption}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() =>
                  handleCopyHelperText(
                    showHelperModal === 'instagram' ? instagramCaption : tikTokCaption
                  )
                }
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {helperCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Caption Tersalin! Buka Aplikasi & Paste</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Caption & Link Otomatis</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowHelperModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 text-center relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900">Scan QR Code Halaman Ini</h3>
            <p className="text-xs text-slate-500">
              Arahkan kamera smartphone Anda untuk langsung membuka halaman {type === 'model' ? title : 'promo ini'}
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block shadow-inner mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  currentUrl
                )}`}
                alt="QR Code"
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <div className="text-[11px] text-slate-500 truncate px-2 font-mono">{currentUrl}</div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200"
            >
              Tutup QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
