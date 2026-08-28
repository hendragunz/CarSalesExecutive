'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  MapPin,
  Clock,
  PhoneCall,
  MessageCircle,
  Instagram,
  Send,
  ShieldCheck,
  Compass,
  Car,
  Tag,
  Users,
  ExternalLink,
  CreditCard,
  Headphones,
  Lock,
} from 'lucide-react';

interface FooterProps {
  setActiveTab?: (tab: string) => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ setActiveTab, onOpenAdmin }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useDealership();
  const { dealerInfo } = data;
  const { socials } = dealerInfo;

  const handleFooterNav = (id: string) => {
    if (id === 'models') {
      router.push('/models');
    } else if (id === 'promotions') {
      router.push('/promotions');
    } else if (id === 'testimonials') {
      if (pathname === '/') {
        if (setActiveTab) setActiveTab('testimonials');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/?tab=testimonials');
      }
    } else if (id === 'contact') {
      if (pathname === '/') {
        if (setActiveTab) setActiveTab('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/?tab=contact');
      }
    } else {
      if (pathname === '/') {
        if (setActiveTab) setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    }
  };

  const waUrl = generateWhatsAppUrl(
    socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin info promo dan lokasi showroom XPENG.`
  );

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Dealer Identity, Quick Contact & Socials, Navigation, and Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Sales Consultant & Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl tracking-tighter">XP</span>
              </div>
              <div>
                <span className="text-white font-extrabold text-xl tracking-wider uppercase block">
                  XPENG MOTORS
                </span>
                <span className="text-xs text-slate-400 font-medium">{dealerInfo.dealershipName}</span>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={dealerInfo.salesAvatarUrl}
                  alt={dealerInfo.salesName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
                />
                <div>
                  <h4 className="text-white font-bold text-base flex items-center gap-1.5">
                    {dealerInfo.salesName}
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-blue-400 font-medium">{dealerInfo.salesTitle}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {dealerInfo.salesBio}
              </p>
            </div>

            {/* Emergency Hotline */}
            <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-800/50 px-3.5 py-2.5 rounded-xl border border-slate-700/60">
              <Headphones className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <span className="font-semibold text-white block">Emergency 24/7 Roadside Assistance</span>
                <span className="text-slate-400">{dealerInfo.emergencyHotline}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Channels & Social Networks (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Kontak & Media Sosial
            </h3>
            <p className="text-xs text-slate-400">
              Hubungi langsung untuk konsultasi, promo mingguan, dan info serah terima:
            </p>

            <div className="space-y-2.5">
              {/* WhatsApp */}
              <a
                id="footer-social-wa"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-800/50 text-emerald-300 transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">WhatsApp Resmi</span>
                    <span className="text-[11px] text-emerald-400">{socials.whatsappDisplay}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Instagram */}
              <a
                id="footer-social-instagram"
                href={socials.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-lg text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Instagram</span>
                    <span className="text-[11px] text-pink-400">{socials.instagram}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400" />
              </a>

              {/* TikTok */}
              <a
                id="footer-social-tiktok"
                href={socials.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-700 rounded-lg text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.33z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">TikTok Video</span>
                    <span className="text-[11px] text-slate-300">{socials.tiktok}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </a>

              {/* Telegram */}
              <a
                id="footer-social-telegram"
                href={socials.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-sky-500 rounded-lg text-white">
                    <Send className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Telegram Chat</span>
                    <span className="text-[11px] text-sky-400">{socials.telegram}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
              </a>
            </div>
          </div>

          {/* Column 3: Dealer Location & Interactive Map (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              Lokasi Dealer & Showroom
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{dealerInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{dealerInfo.operatingHours}</span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 relative aspect-[16/9] shadow-inner">
              <iframe
                title="XPENG Dealer Location Map"
                src={dealerInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-2 right-2">
                <a
                  href={dealerInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-blue-600 text-white text-[11px] font-bold border border-slate-700 flex items-center gap-1.5 backdrop-blur-sm transition-all"
                >
                  <MapPin className="w-3 h-3 text-blue-400" />
                  Petunjuk Arah Google Maps
                </a>
              </div>
            </div>

            {/* Official Booking Account Security Warning */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300 flex items-start gap-2">
              <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block">Jaminan Keamanan Transaksi / SPK</span>
                <span>
                  Rekening Resmi Dealer: <strong>{dealerInfo.bookingFeeAccount.bankName} - {dealerInfo.bookingFeeAccount.accountNumber}</strong> a/n <strong>{dealerInfo.bookingFeeAccount.accountHolder}</strong>.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {dealerInfo.brandName} - {dealerInfo.dealershipName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleFooterNav('models')}
              className="hover:text-white transition-colors"
            >
              Daftar Mobil
            </button>
            <button
              onClick={() => handleFooterNav('promotions')}
              className="hover:text-white transition-colors"
            >
              Promo Terbaru
            </button>
            <button
              onClick={() => handleFooterNav('testimonials')}
              className="hover:text-white transition-colors"
            >
              Testimoni Unit
            </button>
            <Link
              href="/cms-manage"
              className="text-slate-500 hover:text-amber-400 font-semibold transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Login Pengelola CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
