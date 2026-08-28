'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDealership } from '@/context/DealershipContext';
import {
  VehicleModel,
  Promotion,
  Testimonial,
  HeroSlide,
  DealerInfo,
  LeadSubmission,
} from '@/types/dealership';
import {
  LayoutDashboard,
  Home,
  Car,
  Tag,
  Users,
  PhoneCall,
  Inbox,
  Database,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  ShieldCheck,
  Key,
  LogOut,
  User,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Phone,
  Calendar,
  Check,
  Sliders,
  DollarSign,
  FileText,
  Star,
  MapPin,
  Clock,
  Radio,
} from 'lucide-react';

export default function CMSManageClient() {
  const router = useRouter();
  const {
    data,
    updateDealerInfo,
    updateSocials,
    updateHeroSlides,
    saveModel,
    deleteModel,
    savePromotion,
    deletePromotion,
    saveTestimonial,
    deleteTestimonial,
    updateLeadStatus,
    deleteLead,
    resetToDefault,
    importData,
    exportData,
  } = useDealership();

  // Authentication & Security State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        sessionStorage.getItem('xpeng_cms_authenticated') === 'true' ||
        localStorage.getItem('xpeng_cms_remember_auth') === 'true'
      );
    }
    return false;
  });

  // Login form inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Change Credentials State
  const [activeUsername, setActiveUsername] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('xpeng_cms_admin_username') || 'hendra';
    }
    return 'hendra';
  });
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [credChangeSuccess, setCredChangeSuccess] = useState<string | null>(null);
  const [credChangeError, setCredChangeError] = useState<string | null>(null);

  // CMS active tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'homepage' | 'models' | 'promos' | 'testimonials' | 'contact' | 'leads' | 'security' | 'backup'
  >('dashboard');

  const [notification, setNotification] = useState<string | null>(null);

  // Model edit state
  const [editingModel, setEditingModel] = useState<VehicleModel | null>(null);
  const [isCreatingModel, setIsCreatingModel] = useState(false);

  // Promo edit state
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [isCreatingPromo, setIsCreatingPromo] = useState(false);

  // Testimonial edit state
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);

  // Hero Slide edit state
  const [heroSlidesList, setHeroSlidesList] = useState<HeroSlide[]>(() => data.heroSlides);

  // Dealer info form state
  const [dealerForm, setDealerForm] = useState<DealerInfo>(() => data.dealerInfo);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper functions for static security credentials
  const getMasterUsername = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('xpeng_cms_admin_username');
      if (saved) return saved.trim().toLowerCase();
    }
    return 'hendra';
  };

  const getMasterPassword = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('xpeng_cms_admin_password');
      if (saved) return saved;
    }
    return 'hendra8888';
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const validUsername = getMasterUsername();
    const validPassword = getMasterPassword();

    const inputUser = usernameInput.trim().toLowerCase();
    const inputPass = passwordInput.trim();

    if (inputUser === validUsername && inputPass === validPassword) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('xpeng_cms_authenticated', 'true');
        if (rememberMe) {
          localStorage.setItem('xpeng_cms_remember_auth', 'true');
        } else {
          localStorage.removeItem('xpeng_cms_remember_auth');
        }
      }
      showNotify('Selamat Datang di Portal CMS XPENG Official!');
    } else {
      setAuthError('Username atau Password salah. Silakan periksa kembali kredensial Anda.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('xpeng_cms_authenticated');
      localStorage.removeItem('xpeng_cms_remember_auth');
    }
    setUsernameInput('');
    setPasswordInput('');
    setAuthError(null);
    showNotify('Anda telah keluar dari CMS Panel.');
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredChangeError(null);
    setCredChangeSuccess(null);

    const currentSavedPass = getMasterPassword();

    if (oldPasswordInput !== currentSavedPass) {
      setCredChangeError('Password saat ini salah! Verifikasi gagal.');
      return;
    }

    if (newPasswordInput.length < 4) {
      setCredChangeError('Password baru minimal 4 karakter!');
      return;
    }

    if (newPasswordInput !== confirmNewPasswordInput) {
      setCredChangeError('Konfirmasi Password baru tidak cocok.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('xpeng_cms_admin_password', newPasswordInput);
      if (newUsernameInput.trim().length > 0) {
        localStorage.setItem('xpeng_cms_admin_username', newUsernameInput.trim().toLowerCase());
        setActiveUsername(newUsernameInput.trim().toLowerCase());
      }
    }

    setCredChangeSuccess('Kredensial Login CMS berhasil diperbarui!');
    setOldPasswordInput('');
    setNewPasswordInput('');
    setConfirmNewPasswordInput('');
    setNewUsernameInput('');
    showNotify('Username / Password CMS berhasil diubah!');
  };

  const handleResetCredentials = () => {
    if (confirm('Kembalikan kredensial ke bawaan default (Username: hendra, Password: hendra8888)?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('xpeng_cms_admin_username');
        localStorage.removeItem('xpeng_cms_admin_password');
      }
      setActiveUsername('hendra');
      setCredChangeSuccess('Kredensial direset ke default: Username: hendra | Password: hendra8888');
      setCredChangeError(null);
      showNotify('Kredensial CMS direset ke default');
    }
  };

  const handleSaveDealerInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateDealerInfo(dealerForm);
    updateSocials(dealerForm.socials);
    showNotify('Informasi Dealer & Kontak Berhasil Disimpan!');
  };

  const handleSaveHeroSlides = () => {
    updateHeroSlides(heroSlidesList);
    showNotify('Slide Banner Homepage Berhasil Diperbarui!');
  };

  const handleSaveModelForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModel) return;
    saveModel(editingModel);
    setEditingModel(null);
    setIsCreatingModel(false);
    showNotify(`Data Model ${editingModel.name} Berhasil Disimpan!`);
  };

  const handleSavePromoForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo) return;
    savePromotion(editingPromo);
    setEditingPromo(null);
    setIsCreatingPromo(false);
    showNotify(`Promo "${editingPromo.title}" Berhasil Disimpan!`);
  };

  const handleSaveTestimonialForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    saveTestimonial(editingTestimonial);
    setEditingTestimonial(null);
    setIsCreatingTestimonial(false);
    showNotify(`Testimoni ${editingTestimonial.customerName} Berhasil Disimpan!`);
  };

  const handleExportBackup = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xpeng_dealership_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotify('File Backup JSON berhasil didownload!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importData(content);
        if (success) {
          showNotify('Data Dealership berhasil diimpor!');
        } else {
          alert('Gagal mengimpor file backup. Format JSON tidak sesuai.');
        }
      }
    };
    reader.readAsText(file);
  };

  // =========================================================================
  // VIEW 1: LOGIN WALL / AUTHENTICATION GATE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        {/* Top Mini Header */}
        <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-zinc-950 font-black text-lg shadow-lg shadow-amber-500/20">
              X
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-white">XPENG MOTORS</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  CMS PORTAL
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Official Sales & Dealership Portal CMS</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900 hover:bg-zinc-800 px-3.5 py-2 rounded-xl border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Utama</span>
          </Link>
        </header>

        {/* Login Card */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700/80 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  Autentikasi CMS Admin
                </h1>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Area privat untuk mengelola data katalog mobil, harga OTR, promo cashback, testimoni konsumen, dan leads.
                </p>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>{authError}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 block">
                    Username Sales / Admin:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="e.g. hendra"
                      required
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 block">
                      Kata Sandi / Password:
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                      <Key className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700/80 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                      title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] mt-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Buka Akses Panel CMS</span>
                </button>
              </form>

              {/* Default Credential Hint Box */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Kredensial Bawaan (Default):
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    Bisa Diganti
                  </span>
                </div>
                <div className="font-mono text-[11px] bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between text-zinc-300">
                  <span>User: <strong className="text-amber-400">hendra</strong></span>
                  <span>Pass: <strong className="text-amber-400">hendra8888</strong></span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  Anda dapat mengubah username & password ini kapan saja di menu <strong>Keamanan CMS</strong>.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer info */}
        <footer className="border-t border-zinc-900 px-6 py-4 text-center text-xs text-zinc-400">
          XPENG Motors Indonesia &bull; Dealership Management Platform &bull; Hak Cipta Dilindungi
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL CMS MANAGEMENT WORKBENCH (AUTHENTICATED)
  // =========================================================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-zinc-950 font-black text-xl shadow-lg shadow-amber-500/20">
            X
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-wide text-white">XPENG CMS MANAGER</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Sales Consultant: <strong className="text-zinc-200">{dealerForm.salesName}</strong> &bull; Dealer: {dealerForm.dealershipName}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold transition-colors"
            title="Buka Website Live di Tab Baru"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Lihat Website Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors"
            title="Keluar dari sesi CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout (Sidebar Tabs + Content Area) */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-zinc-900/60 border-b md:border-b-0 md:border-r border-zinc-800 p-3 sm:p-4 space-y-1 shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-2">
            Modul Konten & Katalog
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Dashboard</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'homepage'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Home className="w-4 h-4" />
              <span>Hero Slider & Banner</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
              {data.heroSlides.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'models'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Car className="w-4 h-4" />
              <span>Katalog Model Mobil</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
              {data.models.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'promos'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Tag className="w-4 h-4" />
              <span>Promo & Penawaran</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
              {data.promotions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'testimonials'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Testimoni Serah Terima</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
              {data.testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'contact'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4" />
              <span>Profil Sales & Dealer</span>
            </span>
          </button>

          <div className="pt-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-2">
              Leads & Administrasi
            </div>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'leads'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Kotak Masuk Leads</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                {data.leads?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all mt-1 ${
                activeTab === 'security'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Keamanan Password</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all mt-1 ${
                activeTab === 'backup'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Database className="w-4 h-4" />
                <span>Backup & Reset JSON</span>
              </span>
            </button>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-4 sm:p-8 bg-zinc-950 overflow-y-auto max-w-7xl">
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              {/* Welcome Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                      XPENG OFFICIAL CMS
                    </span>
                    <span className="text-zinc-400 text-xs">Versi 2.4</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    Selamat Datang, {dealerForm.salesName}
                  </h1>
                  <p className="text-zinc-400 text-xs mt-1">
                    Kelola seluruh data showroom, unit mobil XPENG, simulasi cicilan, promo cashback, dan leads pelanggan.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                  >
                    <Inbox className="w-4 h-4" />
                    <span>Lihat Leads ({data.leads?.length || 0})</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Model Tersedia</span>
                    <Car className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{data.models.length} Unit</div>
                  <div className="text-[11px] text-zinc-400">XPENG G6, X9, G9 dll</div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Promo Aktif</span>
                    <Tag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{data.promotions.length} Promo</div>
                  <div className="text-[11px] text-zinc-400">Diskon & Subsidi Berjalan</div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Testimoni Unit</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{data.testimonials.length} Ulasan</div>
                  <div className="text-[11px] text-zinc-400">Dokumentasi Handover</div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Leads Masuk</span>
                    <Inbox className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{data.leads?.length || 0} Calon</div>
                  <div className="text-[11px] text-zinc-400">Booking & Test Drive</div>
                </div>
              </div>

              {/* Profile Card */}
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={dealerForm.salesAvatarUrl}
                      alt={dealerForm.salesName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        Official Sales Consultant Profile
                      </span>
                      <h3 className="text-lg font-bold text-white">{dealerForm.salesName}</h3>
                      <p className="text-xs text-zinc-400">{dealerForm.salesTitle} &bull; {dealerForm.dealershipName}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profil & Kontak Sales</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-800/80 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <div className="text-zinc-400 text-[11px]">WhatsApp Sales</div>
                    <div className="font-mono text-emerald-400 font-bold mt-0.5">+{dealerForm.socials.whatsapp}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <div className="text-zinc-400 text-[11px]">Telepon Showroom</div>
                    <div className="font-mono text-zinc-200 font-bold mt-0.5">{dealerForm.socials.phone}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <div className="text-zinc-400 text-[11px]">Email Resmi</div>
                    <div className="text-zinc-200 font-semibold mt-0.5 truncate">{dealerForm.socials.email}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: HERO SLIDER & BANNER */}
          {/* ============================================================== */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Hero Slider & Banner Utama</h2>
                  <p className="text-zinc-400">Atur banner besar berputar yang tampil di bagian paling atas homepage.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide: HeroSlide = {
                        id: `slide-${Date.now()}`,
                        badge: 'FLAGSHIP EV',
                        title: 'XPENG Smart EV Revolution',
                        subtitle: 'Inovasi Kendaraan Listrik Terdepan dengan platform 800V.',
                        priceStart: 'Rp 699.000.000',
                        range: '570 km',
                        acceleration: '3.9 detik',
                        bgImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=85',
                        ctaText: 'Test Drive Sekarang',
                        ctaLink: '/models/xpeng-g6',
                        modelSlug: 'xpeng-g6',
                      };
                      setHeroSlidesList([...heroSlidesList, newSlide]);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Slide Banner</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveHeroSlides}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {heroSlidesList.map((slide, idx) => (
                  <div key={slide.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-bold text-amber-400 text-xs">Slide Banner #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setHeroSlidesList(heroSlidesList.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Hapus Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Badge Label:</label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].badge = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Judul Headline:</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].title = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Mulai Harga:</label>
                        <input
                          type="text"
                          value={slide.priceStart}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].priceStart = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Range Tempuh:</label>
                        <input
                          type="text"
                          value={slide.range}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].range = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Akselerasi 0-100:</label>
                        <input
                          type="text"
                          value={slide.acceleration}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].acceleration = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Model Slug / Link:</label>
                        <input
                          type="text"
                          value={slide.modelSlug}
                          onChange={(e) => {
                            const updated = [...heroSlidesList];
                            updated[idx].modelSlug = e.target.value;
                            setHeroSlidesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 text-[11px] block font-semibold">Subjudul / Deskripsi Singkat:</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const updated = [...heroSlidesList];
                          updated[idx].subtitle = e.target.value;
                          setHeroSlidesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 text-[11px] block font-semibold">URL Background Image (1920x1080):</label>
                      <input
                        type="text"
                        value={slide.bgImage}
                        onChange={(e) => {
                          const updated = [...heroSlidesList];
                          updated[idx].bgImage = e.target.value;
                          setHeroSlidesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: VEHICLE MODELS CATALOGUE */}
          {/* ============================================================== */}
          {activeTab === 'models' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Katalog Model Kendaraan Listrik</h2>
                  <p className="text-zinc-400">Kelola harga OTR, spesifikasi teknis, varian baterai, galeri, dan pilihan warna.</p>
                </div>
                {!editingModel && !isCreatingModel && (
                  <button
                    onClick={() => {
                      setIsCreatingModel(true);
                      setEditingModel({
                        id: `model-${Date.now()}`,
                        name: 'XPENG G6',
                        slug: 'xpeng-g6-suv',
                        tagline: 'Ultra Smart Coupe SUV - Next-Gen Intelligence',
                        category: 'SUV',
                        startingPrice: 699000000,
                        formattedPrice: 'Rp 699.000.000',
                        rangeKm: '570 KM (WLTP/CLTC)',
                        acceleration0to100: '3.9 Detik',
                        maxPower: '476 HP / 660 Nm',
                        batteryCapacity: '87.5 kWh Liquid-cooled LFP/NMC',
                        fastChargeTime: '10-80% dalam 15 menit (Supercharging 800V)',
                        driveType: 'RWD / Performance AWD',
                        heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
                        sideImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
                        interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
                        gallery: [
                          'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
                          'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
                        ],
                        colors: [
                          { name: 'Silver Frost', hex: '#cfd4dc' },
                          { name: 'Arctic White', hex: '#f8fafc' },
                          { name: 'Midnight Black', hex: '#18181b' },
                        ],
                        variants: [
                          {
                            name: 'Standard Range RWD',
                            price: 699000000,
                            formattedPrice: 'Rp 699.000.000',
                            range: '435 km',
                            acceleration: '6.6 detik',
                            drivetrain: 'RWD 258 HP',
                            battery: '66 kWh LFP',
                          },
                        ],
                        highlights: ['Platform 800V SEPA 2.0', 'XPILOT 2.5 Driver Assist', 'Xmart OS 4.0'],
                        description: 'Kendaraan listrik pintar generasi terbaru dengan arsitektur 800V supercharge.',
                        isFeatured: true,
                        inStock: true,
                      });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Model Baru</span>
                  </button>
                )}
              </div>

              {/* Model Edit Form */}
              {editingModel ? (
                <form onSubmit={handleSaveModelForm} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Edit2 className="w-4 h-4 text-amber-400" />
                      <span>{isCreatingModel ? 'Tambah Model Baru' : `Edit Model: ${editingModel.name}`}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModel(null);
                        setIsCreatingModel(false);
                      }}
                      className="text-zinc-400 hover:text-white font-semibold"
                    >
                      Batal
                    </button>
                  </div>

                  {/* Basic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Nama Model:</label>
                      <input
                        type="text"
                        value={editingModel.name}
                        onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Slug URL (e.g. xpeng-g6):</label>
                      <input
                        type="text"
                        value={editingModel.slug}
                        onChange={(e) => setEditingModel({ ...editingModel, slug: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Kategori / Segmen:</label>
                      <select
                        value={editingModel.category}
                        onChange={(e) => setEditingModel({ ...editingModel, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      >
                        <option value="SUV">SUV</option>
                        <option value="MPV">MPV</option>
                        <option value="Sedan">Sedan</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Harga OTR (Angka Rupiah):</label>
                      <input
                        type="number"
                        value={editingModel.startingPrice}
                        onChange={(e) =>
                          setEditingModel({
                            ...editingModel,
                            startingPrice: Number(e.target.value) || 0,
                            formattedPrice: `Rp ${Number(e.target.value).toLocaleString('id-ID')}`,
                          })
                        }
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Harga Format Teks:</label>
                      <input
                        type="text"
                        value={editingModel.formattedPrice}
                        onChange={(e) => setEditingModel({ ...editingModel, formattedPrice: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">Tagline Model:</label>
                      <input
                        type="text"
                        value={editingModel.tagline}
                        onChange={(e) => setEditingModel({ ...editingModel, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Image URLs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">URL Foto Hero Utama:</label>
                      <input
                        type="text"
                        value={editingModel.heroImage}
                        onChange={(e) => setEditingModel({ ...editingModel, heroImage: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">URL Foto Samping (Side):</label>
                      <input
                        type="text"
                        value={editingModel.sideImage}
                        onChange={(e) => setEditingModel({ ...editingModel, sideImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-400 block font-semibold">URL Foto Interior:</label>
                      <input
                        type="text"
                        value={editingModel.interiorImage}
                        onChange={(e) => setEditingModel({ ...editingModel, interiorImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Specs Matrix */}
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <h4 className="font-bold text-amber-400">Spesifikasi Teknis & Performa</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Jarak Tempuh (Range):</label>
                        <input
                          type="text"
                          value={editingModel.rangeKm}
                          onChange={(e) => setEditingModel({ ...editingModel, rangeKm: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Akselerasi 0-100 km/h:</label>
                        <input
                          type="text"
                          value={editingModel.acceleration0to100}
                          onChange={(e) => setEditingModel({ ...editingModel, acceleration0to100: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">Kapasitas Baterai:</label>
                        <input
                          type="text"
                          value={editingModel.batteryCapacity}
                          onChange={(e) => setEditingModel({ ...editingModel, batteryCapacity: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-400 text-[11px] block font-semibold">DC Fast Charging:</label>
                        <input
                          type="text"
                          value={editingModel.fastChargeTime}
                          onChange={(e) => setEditingModel({ ...editingModel, fastChargeTime: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 block font-semibold">Deskripsi Lengkap Model:</label>
                    <textarea
                      rows={3}
                      value={editingModel.description}
                      onChange={(e) => setEditingModel({ ...editingModel, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Model</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModel(null);
                        setIsCreatingModel(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Models List Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.models.map((model) => (
                    <div key={model.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-950">
                          <img src={model.heroImage} alt={model.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-zinc-950 font-black text-[10px]">
                            {model.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{model.name}</h3>
                          <p className="text-amber-400 font-bold text-xs mt-0.5">{model.formattedPrice}</p>
                          <p className="text-zinc-400 text-[11px] line-clamp-2 mt-1">{model.tagline}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                        <Link
                          href={`/models/${model.slug}`}
                          target="_blank"
                          className="text-zinc-400 hover:text-cyan-400 text-[11px] flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Preview</span>
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingModel({ ...model });
                              setIsCreatingModel(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus ${model.name}?`)) {
                                deleteModel(model.id);
                                showNotify(`Model ${model.name} dihapus.`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Hapus Model"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PROMOTIONS */}
          {/* ============================================================== */}
          {activeTab === 'promos' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Promo & Paket Kredit</h2>
                  <p className="text-zinc-400">Atur diskon cashback, program bunga 0%, free Wallbox, dan subsidi trade-in.</p>
                </div>
                {!editingPromo && !isCreatingPromo && (
                  <button
                    onClick={() => {
                      setIsCreatingPromo(true);
                      setEditingPromo({
                        id: `promo-${Date.now()}`,
                        title: 'Promo Spesial Bulan Ini',
                        slug: 'promo-spesial-bulan-ini',
                        badge: 'LIMITED OFFER',
                        period: 'Bulan Ini',
                        excerpt: 'Dapatkan subsidi Wallbox Charger 7kW gratis dan bunga ringan.',
                        content: 'Dapatkan berbagai keuntungan pembelian khusus bulan ini dengan unit NIK berjalan.',
                        bannerImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
                        validUntil: 'Akhir Bulan Ini',
                        terms: ['Berlaku untuk unit NIK berjalan', 'Syarat & ketentuan berlaku'],
                        isFeatured: true,
                        publishDate: 'Hari ini',
                        category: 'Special Promo',
                      });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Promo Baru</span>
                  </button>
                )}
              </div>

              {editingPromo ? (
                <form onSubmit={handleSavePromoForm} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {isCreatingPromo ? 'Tambah Promo Baru' : `Edit Promo: ${editingPromo.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPromo(null);
                        setIsCreatingPromo(false);
                      }}
                      className="text-zinc-400 hover:text-white font-semibold"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Judul Promo:</label>
                      <input
                        type="text"
                        value={editingPromo.title}
                        onChange={(e) => setEditingPromo({ ...editingPromo, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Slug URL:</label>
                      <input
                        type="text"
                        value={editingPromo.slug}
                        onChange={(e) => setEditingPromo({ ...editingPromo, slug: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Badge Promo:</label>
                      <input
                        type="text"
                        value={editingPromo.badge}
                        onChange={(e) => setEditingPromo({ ...editingPromo, badge: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Masa Berlaku:</label>
                      <input
                        type="text"
                        value={editingPromo.validUntil}
                        onChange={(e) => setEditingPromo({ ...editingPromo, validUntil: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">URL Gambar Banner Promo:</label>
                    <input
                      type="text"
                      value={editingPromo.bannerImage}
                      onChange={(e) => setEditingPromo({ ...editingPromo, bannerImage: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Ringkasan / Excerpt:</label>
                    <input
                      type="text"
                      value={editingPromo.excerpt}
                      onChange={(e) => setEditingPromo({ ...editingPromo, excerpt: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Konten Lengkap Promo:</label>
                    <textarea
                      rows={3}
                      value={editingPromo.content}
                      onChange={(e) => setEditingPromo({ ...editingPromo, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Promo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPromo(null);
                        setIsCreatingPromo(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.promotions.map((promo) => (
                    <div key={promo.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="aspect-video rounded-xl overflow-hidden bg-zinc-950 relative">
                          <img src={promo.bannerImage} alt={promo.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-bold text-[10px]">
                            {promo.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-sm">{promo.title}</h3>
                        <p className="text-zinc-400 text-[11px] line-clamp-2">{promo.excerpt}</p>
                        <p className="text-zinc-400 text-[11px]">Valid: {promo.validUntil}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                        <Link
                          href={`/promotions/${promo.slug}`}
                          target="_blank"
                          className="text-zinc-400 hover:text-cyan-400 text-[11px] flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Detail</span>
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingPromo({ ...promo });
                              setIsCreatingPromo(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus promo "${promo.title}"?`)) {
                                deletePromotion(promo.id);
                                showNotify('Promo dihapus.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Hapus Promo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: TESTIMONIALS */}
          {/* ============================================================== */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Testimoni & Dokumentasi Handover</h2>
                  <p className="text-zinc-400">Kelola foto serah terima unit XPENG bersama konsumen dan ulasan kepuasan mereka.</p>
                </div>
                {!editingTestimonial && !isCreatingTestimonial && (
                  <button
                    onClick={() => {
                      setIsCreatingTestimonial(true);
                      setEditingTestimonial({
                        id: `testi-${Date.now()}`,
                        customerName: 'Bapak / Ibu Konsumen',
                        location: 'Jakarta',
                        carModel: 'XPENG G6 Long Range RWD',
                        deliveryDate: 'Bulan Ini',
                        rating: 5,
                        quote: 'Pelayanan sangat memuaskan, unit diantar tepat waktu, penjelasan fitur sangat jelas.',
                        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
                        verifiedPurchase: true,
                        salesConsultant: dealerForm.salesName,
                      });
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Testimoni</span>
                  </button>
                )}
              </div>

              {editingTestimonial ? (
                <form onSubmit={handleSaveTestimonialForm} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="text-base font-bold text-white">
                      {isCreatingTestimonial ? 'Tambah Testimoni Baru' : `Edit Testimoni: ${editingTestimonial.customerName}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsCreatingTestimonial(false);
                      }}
                      className="text-zinc-400 hover:text-white font-semibold"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Nama Konsumen:</label>
                      <input
                        type="text"
                        value={editingTestimonial.customerName}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, customerName: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Domisili / Kota:</label>
                      <input
                        type="text"
                        value={editingTestimonial.location}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 font-semibold block">Model Unit yang Diserahkan:</label>
                      <input
                        type="text"
                        value={editingTestimonial.carModel}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, carModel: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">URL Foto Serah Terima (Handover Delivery):</label>
                    <input
                      type="text"
                      value={editingTestimonial.photoUrl}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, photoUrl: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Testimonial / Kutipan Konsumen:</label>
                    <textarea
                      rows={3}
                      value={editingTestimonial.quote}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Testimoni</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsCreatingTestimonial(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.testimonials.map((t) => (
                    <div key={t.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="aspect-video rounded-xl overflow-hidden bg-zinc-950">
                          <img src={t.photoUrl} alt={t.customerName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{t.customerName}</h3>
                          <p className="text-amber-400 text-xs font-semibold">{t.carModel} &bull; {t.location}</p>
                          <p className="text-zinc-400 text-[11px] line-clamp-2 mt-1">&quot;{t.quote}&quot;</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                        <button
                          onClick={() => {
                            setEditingTestimonial({ ...t });
                            setIsCreatingTestimonial(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus testimoni ${t.customerName}?`)) {
                              deleteTestimonial(t.id);
                              showNotify('Testimoni dihapus.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Hapus Testimoni"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: CONTACT & DEALER INFO */}
          {/* ============================================================== */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveDealerInfo} className="space-y-6 max-w-4xl text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Profil Sales & Informasi Kontak Dealer</h2>
                  <p className="text-zinc-400">Atur nama sales consultant, WhatsApp, telepon, lokasi showroom, dan tautan sosial media.</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

              {/* Personal Sales Info */}
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  Data Sales Consultant
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Nama Sales Lengkap:</label>
                    <input
                      type="text"
                      value={dealerForm.salesName}
                      onChange={(e) => setDealerForm({ ...dealerForm, salesName: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Jabatan / Gelar Resmi:</label>
                    <input
                      type="text"
                      value={dealerForm.salesTitle}
                      onChange={(e) => setDealerForm({ ...dealerForm, salesTitle: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Nama Dealer / Cabang Resmi:</label>
                    <input
                      type="text"
                      value={dealerForm.dealershipName}
                      onChange={(e) => setDealerForm({ ...dealerForm, dealershipName: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">URL Foto Profil Sales (Avatar):</label>
                    <input
                      type="text"
                      value={dealerForm.salesAvatarUrl}
                      onChange={(e) => setDealerForm({ ...dealerForm, salesAvatarUrl: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold block">Bio / Profil Singkat Sales Consultant:</label>
                  <textarea
                    rows={2}
                    value={dealerForm.salesBio}
                    onChange={(e) => setDealerForm({ ...dealerForm, salesBio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                  />
                </div>
              </div>

              {/* Contact Channels */}
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Saluran Komunikasi Langsung
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Nomor WhatsApp (format: 628xxx):</label>
                    <input
                      type="text"
                      value={dealerForm.socials.whatsapp}
                      onChange={(e) =>
                        setDealerForm({
                          ...dealerForm,
                          socials: { ...dealerForm.socials, whatsapp: e.target.value },
                        })
                      }
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Nomor Telepon Seluler:</label>
                    <input
                      type="text"
                      value={dealerForm.socials.phone}
                      onChange={(e) =>
                        setDealerForm({
                          ...dealerForm,
                          socials: { ...dealerForm.socials, phone: e.target.value },
                        })
                      }
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Alamat Email:</label>
                    <input
                      type="email"
                      value={dealerForm.socials.email}
                      onChange={(e) =>
                        setDealerForm({
                          ...dealerForm,
                          socials: { ...dealerForm.socials, email: e.target.value },
                        })
                      }
                      required
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold block">Alamat Lengkap Showroom & Dealer:</label>
                  <textarea
                    rows={2}
                    value={dealerForm.address}
                    onChange={(e) => setDealerForm({ ...dealerForm, address: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Semua Pengaturan Kontak</span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 7: LEADS & INBOX */}
          {/* ============================================================== */}
          {activeTab === 'leads' && (
            <div className="space-y-6 text-xs animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Kotak Masuk Leads & Booking Test Drive</h2>
                  <p className="text-zinc-400">Daftar calon pembeli yang mengirim formulir booking test drive & simulasi kredit.</p>
                </div>
              </div>

              {(!data.leads || data.leads.length === 0) ? (
                <div className="p-12 text-center rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <Inbox className="w-12 h-12 mx-auto text-zinc-600" />
                  <h3 className="text-sm font-bold text-white">Belum Ada Leads Masuk</h3>
                  <p className="text-zinc-400 max-w-sm mx-auto">
                    Formulir test drive yang diisi oleh pengunjung di website utama akan otomatis tercatat dan tersimpan di sini.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{lead.customerName}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              lead.status === 'New'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                                : lead.status === 'Followed Up'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            }`}
                          >
                            {lead.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-400 text-xs">
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            {lead.phone}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-300">
                            <Car className="w-3.5 h-3.5 text-blue-400" />
                            Unit: <strong className="text-white">{lead.selectedModel}</strong>
                          </span>
                          {lead.preferredDate && (
                            <span className="flex items-center gap-1 text-zinc-400">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              Jadwal: {lead.preferredDate}
                            </span>
                          )}
                          <span className="text-[10px] text-zinc-400">
                            {lead.createdAt}
                          </span>
                        </div>

                        {lead.notes && (
                          <p className="text-[11px] text-zinc-400 bg-zinc-950 p-2 rounded-lg border border-zinc-800/80">
                            Catatan: {lead.notes}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Halo%20Bapak/Ibu%20${encodeURIComponent(lead.customerName)},%20saya%20${encodeURIComponent(dealerForm.salesName)}%20dari%20XPENG%20Motors.%20Terima%20kasih%20telah%20mengajukan%20test%20drive%20${encodeURIComponent(lead.selectedModel)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi via WA</span>
                        </a>

                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs font-semibold"
                        >
                          <option value="New">Status: New</option>
                          <option value="Followed Up">Status: Followed Up</option>
                          <option value="SPK / Deal">Status: SPK / Deal</option>
                          <option value="Closed">Status: Closed</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Hapus data leads ${lead.customerName}?`)) {
                              deleteLead(lead.id);
                              showNotify('Lead dihapus.');
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Hapus Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: SECURITY & PASSWORD SETTINGS */}
          {/* ============================================================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl text-xs animate-in fade-in">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  Keamanan & Kredensial Akses CMS
                </h2>
                <p className="text-zinc-400">
                  Ubah username dan kata sandi statis untuk mengamankan panel pengelolaan data dealer Anda.
                </p>
              </div>

              {credChangeSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{credChangeSuccess}</span>
                </div>
              )}

              {credChangeError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{credChangeError}</span>
                </div>
              )}

              {/* Status Box */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-zinc-400">Username Login Aktif Saat Ini:</div>
                <div className="font-mono text-base font-bold text-amber-400 bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
                  {activeUsername}
                </div>
              </div>

              {/* Form Ganti Password */}
              <form onSubmit={handleChangeCredentials} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h3 className="font-bold text-white text-sm">Ganti Kredensial CMS</h3>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold block">
                    Ganti Username (Opsional, biarkan kosong jika tetap):
                  </label>
                  <input
                    type="text"
                    value={newUsernameInput}
                    onChange={(e) => setNewUsernameInput(e.target.value)}
                    placeholder={`Tetap menggunakan (${activeUsername})`}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold block">
                    Password Saat Ini (Verifikasi Keamanan):
                  </label>
                  <input
                    type="password"
                    value={oldPasswordInput}
                    onChange={(e) => setOldPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Password Baru:</label>
                    <input
                      type="password"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="Minimal 4 karakter"
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-400 font-semibold block">Ulangi Password Baru:</label>
                    <input
                      type="password"
                      value={confirmNewPasswordInput}
                      onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                      placeholder="Konfirmasi password"
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Key className="w-4 h-4" />
                    <span>Simpan Password Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetCredentials}
                    className="text-zinc-400 hover:text-zinc-200 underline text-xs"
                  >
                    Reset ke default (hendra / hendra8888)
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: BACKUP & RESTORE JSON */}
          {/* ============================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl text-xs animate-in fade-in">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-400" />
                  Backup & Pemulihan Data
                </h2>
                <p className="text-zinc-400">
                  Simpan cadangan data situs dalam format file JSON atau pulihkan data dari file cadangan sebelumnya.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Download Cadangan Data (Export JSON)</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Menyimpan seluruh katalog model, promo, banner slider, kontak sales, dan testimoni.
                    </p>
                  </div>
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold flex items-center gap-2 shadow-md shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Pulihkan Data dari File (Import JSON)</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Unggah file cadangan JSON yang telah disimpan sebelumnya.
                    </p>
                  </div>
                  <label className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold flex items-center gap-2 cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Upload JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-rose-400 text-sm">Kembalikan ke Data Pabrik (Factory Reset)</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Hapus semua perubahan dan kembalikan seluruh data ke bawaan default awal.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('PERINGATAN: Seluruh perubahan data yang belum dibackup akan hilang dan kembali ke data bawaan awal. Lanjutkan?')) {
                        resetToDefault();
                        showNotify('Data dikembalikan ke pengaturan awal pabrik.');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold flex items-center gap-2 border border-rose-500/30 shrink-0"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Pabrik</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
