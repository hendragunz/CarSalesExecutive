'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import { generateWhatsAppUrl } from '@/lib/utils';
import {
  Car,
  Tag,
  Users,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  Settings,
  Sparkles,
  Compass,
  ChevronRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ activeTab = 'home', setActiveTab, onOpenAdmin }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, setActiveTestDriveModal } = useDealership();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { dealerInfo } = data;

  // Determine current active navigation item
  let currentActive = activeTab;
  if (pathname.startsWith('/models')) {
    currentActive = 'models';
  } else if (pathname.startsWith('/promotions')) {
    currentActive = 'promotions';
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'models', label: 'All Models', icon: Car },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'testimonials', label: 'Testimonial', icon: Users },
    { id: 'contact', label: 'Contact Me', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);

    if (id === 'home') {
      if (pathname === '/') {
        if (setActiveTab) setActiveTab('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
    } else if (id === 'models') {
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
    }
  };

  const waUrl = generateWhatsAppUrl(
    dealerInfo.socials.whatsapp,
    `Halo Pak ${dealerInfo.salesName}, saya ingin bertanya tentang mobil XPENG & promo terbaru.`
  );

  return (
    <>
      {/* Top Notification / Ticker */}
      {dealerInfo.announcementTicker && (
        <div id="announcement-bar" className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-slate-300">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PROMO
              </span>
              <span className="text-xs truncate">{dealerInfo.announcementTicker}</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium shrink-0 text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {dealerInfo.dealershipName}
              </span>
              <span className="text-slate-700">|</span>
              <button
                id="btn-admin-portal-header"
                onClick={onOpenAdmin}
                className="hover:text-white flex items-center gap-1 transition-colors text-amber-400 hover:underline"
              >
                <Settings className="w-3.5 h-3.5" />
                Admin CMS Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                id="logo-brand-btn"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-white font-black text-xl tracking-tighter">XP</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-extrabold text-xl tracking-tight uppercase">
                      XPENG
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 rounded">
                      OFFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 tracking-tight font-medium">
                    {dealerInfo.salesName} &bull; {dealerInfo.city}
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentActive === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'text-slate-900 bg-slate-100 shadow-sm border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Test Drive CTA */}
              <button
                id="btn-nav-test-drive"
                onClick={() => setActiveTestDriveModal({ isOpen: true })}
                className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Test Drive
              </button>

              {/* WhatsApp CTA */}
              <a
                id="btn-nav-whatsapp"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Admin / Owner CMS Button */}
              <Link
                id="btn-nav-admin-icon"
                href="/cms-manage"
                title="Akses Pengelola CMS (Username & Password Protected)"
                className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all border border-slate-200/60 hover:border-amber-300 flex items-center gap-1.5 text-xs font-semibold"
              >
                <Lock className="w-4 h-4 text-slate-600" />
                <span className="hidden xl:inline text-[11px] text-slate-600">CMS</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                id="btn-nav-mobile-admin"
                href="/cms-manage"
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-lg"
                title="Akses Pengelola CMS"
              >
                <Lock className="w-4 h-4" />
              </Link>
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
            <div className="grid grid-cols-1 gap-1 py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentActive === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 border border-slate-200'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                id="btn-mobile-drawer-testdrive"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTestDriveModal({ isOpen: true });
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                Booking Test Drive XPENG
              </button>

              <a
                id="btn-mobile-drawer-wa"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Chat WhatsApp ({dealerInfo.salesName})
              </a>

              <Link
                id="btn-mobile-drawer-admin"
                href="/cms-manage"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                Login Pengelola Website (CMS)
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
