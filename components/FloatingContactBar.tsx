'use client';

import React, { useState } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import { MessageCircle, Phone, Sparkles, ChevronUp, X } from 'lucide-react';

interface FloatingContactBarProps {
  onOpenTestDrive: () => void;
  onOpenAdmin?: () => void;
}

export default function FloatingContactBar({ onOpenTestDrive, onOpenAdmin }: FloatingContactBarProps) {
  const { data } = useDealership();
  const { dealerInfo } = data;
  const [isExpanded, setIsExpanded] = useState(false);

  const waUrl = generateWhatsAppUrl(
    dealerInfo.socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin konsultasi promo dan simulasi kredit XPENG.`
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="floating-contact-container" className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      <button
        id="btn-scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-10 h-10 rounded-full bg-white/95 text-slate-700 hover:text-slate-950 border border-slate-200 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-105"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Floating Speed Dial Actions */}
      <div className="flex flex-col items-end gap-2">
        {/* Test Drive Button */}
        <button
          id="btn-floating-testdrive"
          onClick={onOpenTestDrive}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105 border border-blue-500"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Book Free Test Drive</span>
          <span className="sm:hidden">Test Drive</span>
        </button>

        {/* Floating WhatsApp Action with Online Pulse Badge */}
        <a
          id="btn-floating-wa"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 group relative border border-emerald-500"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-700 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-700"></span>
          </div>
          <div className="text-left leading-tight pr-1">
            <div className="text-[10px] text-emerald-100 uppercase tracking-widest font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Online Fast Response
            </div>
            <div className="text-sm font-extrabold text-white">Chat {dealerInfo.salesName}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
