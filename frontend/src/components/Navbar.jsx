import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Scale,
  Bookmark,
  Languages,
  User,
  LogOut,
  Menu,
  X,
  Briefcase,
  Layers,
  ChevronDown,
  LogIn,
  UserPlus,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import SequentialSidebar from './SequentialSidebar';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, isAuthenticated, role, logout, demoLogin } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const { savedLaws, savedLawyers, setIsSavedDrawerOpen } = useBookmarks();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin'); // 'signin' | 'register'
  const [authModalRole, setAuthModalRole] = useState('client'); // 'client' | 'lawyer'

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const totalSaved = savedLaws.length + savedLawyers.length;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuth = (tab = 'signin', targetRole = 'client') => {
    setAuthModalTab(tab);
    setAuthModalRole(targetRole);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleRoleSwitch = async (targetRole) => {
    await demoLogin(targetRole);
    setUserDropdownOpen(false);
    if (targetRole === 'lawyer') navigate('/dashboard/lawyer');
    else if (targetRole === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard/client');
  };

  // Logical sequential navigation links ordered by user journey
  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/laws', label: t('navLaws') },
    { to: '/courts', label: t('navCourts') },
    { to: '/lawyers', label: t('navLawyers') },
    { to: '/templates', label: t('navTemplates') },
    { to: '/awareness', label: t('navAwareness') },
    { to: '/ai-assistant', label: t('navAi'), badge: 'AI' }
  ];

  const getDashboardPath = () => {
    if (role === 'lawyer') return '/dashboard/lawyer';
    if (role === 'admin') return '/dashboard/admin';
    return '/dashboard/client';
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* 1. BRAND LOGO ANCHOR (Clean Far-Left Position) */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-bdGreen-800 to-bdGreen-950 text-white shadow-md border border-emerald-700/40 group-hover:scale-105 transition-all shrink-0">
                  {/* Flag Red Accent Emblem */}
                  <div className="absolute w-4 h-4 rounded-full bg-bdRed-500 opacity-90 -mr-0.5"></div>
                  <Scale className="relative z-10 w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-bdGreen-900 transition-colors">
                      Law<span className="text-bdRed-500 font-sans">_</span>BD
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-bdGreen-900 rounded-md">
                      Official
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-tight">
                    {lang === 'bn' ? 'বাংলাদেশ ডিজিটাল লিগ্যাল পোর্টাল' : 'Bangladesh Digital Legal Portal'}
                  </p>
                </div>
              </Link>
            </div>

            {/* 2. SEQUENTIAL DESKTOP NAVIGATION LINKS (Logical User Journey) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'text-bdGreen-900 bg-emerald-50 font-bold border border-emerald-200/60 shadow-2xs'
                        : 'text-slate-600 hover:text-bdGreen-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold bg-bdGreen-800 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* 3. REORGANIZED UTILITIES & AUTHENTICATION SECTION (Strict Sequential Order) */}
            <div className="hidden sm:flex items-center gap-2">
              
              {/* Sequential 30 Jurisdictions Index Button */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all shadow-2xs group shrink-0"
                title="Browse All 30 Jurisdictions Sequentially"
              >
                <Layers className="w-4 h-4 text-bdGreen-800 group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline">{lang === 'bn' ? '৩০টি অধিক্ষেত্র' : '30 Jurisdictions'}</span>
                <span className="px-1.5 py-0.5 text-[9px] bg-bdGreen-800 text-white rounded font-mono font-bold">1–30</span>
              </button>

              {/* 24/7 Helplines Pill */}
              <Link
                to="/emergency"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200/80 bg-rose-50/50 hover:bg-rose-100/80 text-bdRed-600 text-xs font-bold transition-all shadow-2xs"
                title="24/7 National Emergency Helplines"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{t('navEmergency')}</span>
              </Link>

              {/* Saved Laws Drawer Trigger */}
              <button
                onClick={() => setIsSavedDrawerOpen(true)}
                className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-bdGreen-800 hover:bg-slate-50 hover:border-emerald-300 transition-all shadow-2xs"
                title="Saved Laws & Advocates Vault"
              >
                <Bookmark className="w-4 h-4" />
                {totalSaved > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[9px] font-bold bg-bdRed-500 text-white rounded-full flex items-center justify-center shadow-xs">
                    {totalSaved}
                  </span>
                )}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition-colors shadow-2xs"
                title="Toggle English / বাংলা"
              >
                <Languages className="w-3.5 h-3.5 text-bdGreen-700" />
                <span className="font-bangla">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>

              {/* Vertical Visual Divider */}
              <div className="h-6 w-px bg-slate-200 mx-1"></div>

              {/* USER AUTHENTICATION HUB */}
              {isAuthenticated ? (
                /* ================= SIGNED IN STATE ================= */
                <div className="relative" ref={dropdownRef}>
                  
                  {/* Clean Unified User Profile Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all shadow-2xs group"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs ${
                      role === 'lawyer' ? 'bg-amber-600' : role === 'admin' ? 'bg-purple-700' : 'bg-bdGreen-800'
                    }`}>
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 max-w-[100px] truncate">
                          {user?.name ? user.name.split(' ')[0] : 'User'}
                        </span>
                        <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded-md ${
                          role === 'lawyer'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : role === 'admin'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-emerald-100 text-bdGreen-900 border border-emerald-300'
                        }`}>
                          {role === 'lawyer' ? 'Advocate' : role === 'admin' ? 'Admin' : 'Citizen'}
                        </span>
                      </div>
                    </div>

                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expandable User Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                      
                      {/* User Header Details */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-xs ${
                            role === 'lawyer' ? 'bg-amber-600' : role === 'admin' ? 'bg-purple-700' : 'bg-bdGreen-800'
                          }`}>
                            {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                          <span>Account Role:</span>
                          <span className="font-bold text-slate-800 uppercase">
                            {role === 'lawyer' ? 'Enrolled Advocate' : role === 'admin' ? 'Platform Administrator' : 'Citizen / Client'}
                          </span>
                        </div>
                      </div>

                      {/* Primary Navigation Links */}
                      <div className="space-y-1">
                        <Link
                          to={getDashboardPath()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-bdGreen-900 transition-colors"
                        >
                          <User className="w-4 h-4 text-bdGreen-800" />
                          <span>
                            {role === 'lawyer' ? 'Advocate Chamber Dashboard' : role === 'admin' ? 'Admin Control Panel' : 'Client Legal Vault'}
                          </span>
                        </Link>

                        {role === 'lawyer' ? (
                          <Link
                            to="/dashboard/lawyer"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Briefcase className="w-4 h-4 text-slate-400" />
                            <span>Client Bookings & Schedule</span>
                          </Link>
                        ) : (
                          <Link
                            to="/dashboard/client"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-slate-400" />
                            <span>My Consultations & Passes</span>
                          </Link>
                        )}
                      </div>

                      {/* Fast Role Switch for Testing (Client, Lawyer, Admin) */}
                      <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                        <span className="px-3 text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Test Fast Switch:
                        </span>
                        {role !== 'client' && (
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('client')}
                            className="w-full text-left px-3 py-1.5 text-xs text-bdGreen-800 hover:bg-emerald-50 rounded-lg font-semibold flex items-center justify-between"
                          >
                            <span>Switch to Citizen (Rahim)</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {role !== 'lawyer' && (
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('lawyer')}
                            className="w-full text-left px-3 py-1.5 text-xs text-amber-700 hover:bg-amber-50 rounded-lg font-semibold flex items-center justify-between"
                          >
                            <span>Switch to Advocate (Tanvir)</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {role !== 'admin' && (
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('admin')}
                            className="w-full text-left px-3 py-1.5 text-xs text-purple-700 hover:bg-purple-50 rounded-lg font-semibold flex items-center justify-between"
                          >
                            <span>Switch to Admin (DG)</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Clean Sign Out Action in Dropdown */}
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-bdRed-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{lang === 'bn' ? 'সাইন আউট করুন' : 'Sign Out of Account'}</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              ) : (
                /* ================= SIGNED OUT STATE ================= */
                <div className="flex items-center gap-2">
                  {/* Sign In Button */}
                  <button
                    type="button"
                    onClick={() => openAuth('signin', 'client')}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-bdGreen-900 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lang === 'bn' ? 'সাইন ইন' : 'Sign In'}</span>
                  </button>

                  {/* Sign Up / Register Button */}
                  <button
                    type="button"
                    onClick={() => openAuth('register', 'lawyer')}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl shadow-sm transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{lang === 'bn' ? 'নিবন্ধন' : 'Sign Up'}</span>
                  </button>
                </div>
              )}

            </div>

            {/* 4. MOBILE CONTROLS & HAMBURGER */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-xs font-bold border border-slate-200 rounded-xl text-bdGreen-900 bg-slate-50 flex items-center gap-1"
                title="30 Jurisdictions"
              >
                <Layers className="w-4 h-4 text-bdGreen-800" />
                <span className="font-mono text-xs font-bold">1–30</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 text-xs font-bold border border-slate-200 rounded-xl text-slate-700"
              >
                {lang === 'bn' ? 'EN' : 'বাং'}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. SEQUENTIAL MOBILE DRAWER MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
            
            <button
              onClick={() => { setMobileMenuOpen(false); setSidebarOpen(true); }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-bdGreen-950 font-bold text-xs flex items-center justify-between border border-emerald-200"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-bdGreen-800" />
                <span>{lang === 'bn' ? 'সকল ৩০টি আইনি অধিক্ষেত্র (১-৩০)' : 'All 30 Jurisdictions (1–30)'}</span>
              </span>
              <span className="text-[10px] bg-bdGreen-800 text-white px-2 py-0.5 rounded font-mono font-bold">Seq</span>
            </button>

            {/* Sequential Mobile Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                      isActive ? 'bg-emerald-50 text-bdGreen-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-bdGreen-800 text-white rounded">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <Link
                to="/emergency"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-bdRed-600 bg-rose-50/70"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('navEmergency')}</span>
              </Link>
            </div>

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              {isAuthenticated ? (
                <div className="w-full space-y-2">
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 bg-bdGreen-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{role === 'lawyer' ? 'Chamber Dashboard' : 'Client Legal Vault'}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-2 px-4 border border-rose-200 text-bdRed-600 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="w-full grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openAuth('signin', 'client')}
                    className="py-2.5 px-4 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth('register', 'lawyer')}
                    className="py-2.5 px-4 bg-bdGreen-800 text-white text-xs font-bold rounded-xl"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </header>

      {/* Sequential 30 Jurisdictions Drawer */}
      <SequentialSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        defaultRole={authModalRole}
      />
    </>
  );
}
