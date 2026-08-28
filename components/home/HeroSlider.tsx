'use client';

import React, { useState, useEffect } from 'react';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Zap,
  Gauge,
  Battery,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface HeroSliderProps {
  onSelectModel?: (slug: string) => void;
  onExploreModels?: () => void;
  onOpenTestDrive: (modelName?: string) => void;
  onOpenPromos?: () => void;
}

export default function HeroSlider({
  onSelectModel,
  onExploreModels,
  onOpenTestDrive,
  onOpenPromos,
}: HeroSliderProps) {
  const { data } = useDealership();
  const { heroSlides, dealerInfo } = data;
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides]);

  if (!heroSlides || heroSlides.length === 0) return null;

  const currentSlide = heroSlides[currentSlideIdx];

  const nextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const waUrl = generateWhatsAppUrl(
    dealerInfo.socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin tanya info promo dan booking test drive untuk ${currentSlide.title}.`
  );

  return (
    <section id="hero-slider-section" className="relative w-full overflow-hidden bg-slate-900 min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">
      {/* Background Image with Dynamic Fade */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIdx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105"
            />
            {/* Deep Slate Gradients for Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
          </div>
        ))}
      </div>

      {/* Signature Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-20"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light max-w-xl">
            {currentSlide.subtitle}
          </p>

          {/* Key Spec Pills */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-2 max-w-lg">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 sm:p-4 text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                Jarak Tempuh
              </div>
              <div className="text-base sm:text-xl font-extrabold text-white">{currentSlide.range}</div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 sm:p-4 text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
                <Gauge className="w-3.5 h-3.5 text-blue-400" />
                Akselerasi 0-100
              </div>
              <div className="text-base sm:text-xl font-extrabold text-white">{currentSlide.acceleration}</div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 sm:p-4 text-left">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Harga Mulai
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-blue-400 truncate">
                {currentSlide.priceStart}
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <button
              id="hero-cta-testdrive"
              onClick={() => onOpenTestDrive(currentSlide.title)}
              className="px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              Booking Free Test Drive
            </button>

            <button
              id="hero-cta-details"
              onClick={() => {
                if (onSelectModel) {
                  onSelectModel(currentSlide.modelSlug);
                } else if (onExploreModels) {
                  onExploreModels();
                }
              }}
              className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 backdrop-blur-md transition-all hover:border-slate-500"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>

            <a
              id="hero-cta-wa"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat Promo</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Garansi Baterai 8 Tahun / 160.000 KM
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Free Wallbox Charger 7kW Resmi
            </span>
          </div>
        </div>
      </div>

      {/* Slider Nav Arrows */}
      <div className="absolute right-6 bottom-8 z-20 flex items-center gap-2">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-all shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-all shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIdx(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlideIdx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
