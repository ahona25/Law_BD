import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Scale,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'signin',
  initialRole = 'client'
}) {
  const { login, register, demoLogin } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(initialTab); // 'signin' | 'register'
  const [selectedRole, setSelectedRole] = useState(initialRole); // 'client' | 'lawyer'

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register State
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [barCouncilNo, setBarCouncilNo] = useState('');
  const [courtLevel, setCourtLevel] = useState('Supreme Court of Bangladesh');
  const [association, setAssociation] = useState('Supreme Court Bar Association');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickDemo = async (roleName) => {
    setError('');
    setLoading(true);
    try {
      const res = await demoLogin(roleName);
      if (res.success) {
        onClose();
        if (roleName === 'lawyer') {
          navigate('/dashboard/lawyer');
        } else if (roleName === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/client');
        }
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(signInEmail, signInPassword);
      if (res.success) {
        onClose();
        if (res.user.role === 'lawyer') {
          navigate('/dashboard/lawyer');
        } else if (res.user.role === 'admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/client');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        name,
        email: regEmail,
        password: regPassword,
        role: selectedRole,
        phone,
        location,
        barCouncilNo: selectedRole === 'lawyer' ? barCouncilNo : undefined,
        courtLevel: selectedRole === 'lawyer' ? courtLevel : undefined,
        association: selectedRole === 'lawyer' ? association : undefined
      };

      const res = await register(payload);
      if (res.success) {
        onClose();
        if (selectedRole === 'lawyer') {
          navigate('/dashboard/lawyer');
        } else {
          navigate('/dashboard/client');
        }
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-modal-backdrop">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-modal-pop">

        {/* Top Decorative Header with Bangladesh National Flag Palette */}
        <div className="bg-gradient-to-r from-[#03120E] via-[#063226] to-[#064E3B] text-white p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bdRed-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-200 transform hover:rotate-90 hover:scale-105 active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Emblem & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-bdGreen-800 border border-emerald-400/30 flex items-center justify-center shadow-lg relative shrink-0">
              <div className="absolute w-5 h-5 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
              <Scale className="relative z-10 w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-white">
                  {activeTab === 'signin'
                    ? (lang === 'bn' ? 'লগইন করুন — Law_BD' : 'Sign In to Law_BD')
                    : (lang === 'bn' ? 'একাউন্ট খুলুন — Law_BD' : 'Create Law_BD Account')}
                </h3>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
                {lang === 'bn'
                  ? 'নাগরিক ও বিজ্ঞ আইনজীবীদের জাতীয় আইনি পোর্টাল'
                  : 'National Legal Platform for Citizens & Enrolled Advocates'}
              </p>
            </div>
          </div>

          {/* Tab Switcher: Sign In vs Create Account with Smooth Sliding Pill */}
          <div className="relative mt-5 p-1 bg-black/30 rounded-2xl border border-white/15 text-xs font-bold overflow-hidden select-none">
            {/* Sliding Pill Indicator */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeTab === 'signin' ? 'left-1' : 'left-[calc(50%+2px)]'
              }`}
            />
            <div className="relative grid grid-cols-2 gap-1 z-10">
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setError(''); }}
                className={`py-2.5 rounded-xl transition-colors duration-200 text-center font-bold ${
                  activeTab === 'signin'
                    ? 'text-slate-900 font-extrabold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                {lang === 'bn' ? 'সাইন ইন (Sign In)' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`py-2.5 rounded-xl transition-colors duration-200 text-center font-bold ${
                  activeTab === 'register'
                    ? 'text-slate-900 font-extrabold'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                {lang === 'bn' ? 'নতুন একাউন্ট (Register)' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">

          {/* Role Selection Tabs: Citizen/Client vs Advocate/Lawyer */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'আপনার ভূমিকা নির্বাচন করুন:' : 'Select Your Account Type:'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRole('client')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 transform active:scale-[0.98] flex items-start gap-3 ${
                  selectedRole === 'client'
                    ? 'border-bdGreen-700 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white text-slate-600'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 transition-transform duration-200 ${
                  selectedRole === 'client' ? 'bg-bdGreen-800 text-white scale-105' : 'bg-slate-100 text-slate-500'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">
                    {lang === 'bn' ? 'নাগরিক / মক্কেল' : 'Citizen / Client'}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight block">
                    {lang === 'bn' ? 'আইনি সেবা ও পরামর্শ গ্রহীতা' : 'Legal help & consultations'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('lawyer')}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 transform active:scale-[0.98] flex items-start gap-3 ${
                  selectedRole === 'lawyer'
                    ? 'border-bdGreen-700 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white text-slate-600'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 transition-transform duration-200 ${
                  selectedRole === 'lawyer' ? 'bg-bdGreen-800 text-white scale-105' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">
                    {lang === 'bn' ? 'আইনজীবী / এডভোকেট' : 'Advocate / Lawyer'}
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight block">
                    {lang === 'bn' ? 'বার কাউন্সিল সনদপ্রাপ্ত' : 'Bar Council Enrolled'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message Alert with Smooth Shake Animation */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-bdRed-600 text-xs font-semibold animate-shake flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bdRed-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Fast Fill for Effortless Testing */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                {lang === 'bn' ? 'দ্রুত পরীক্ষামূলক লগইন (১-ক্লিক):' : '1-Click Fast Login (Instant Test):'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">Ready</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickDemo('client')}
                className={`group py-2 px-2.5 rounded-xl text-left border transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-[0.98] flex items-center justify-between text-xs font-bold ${
                  selectedRole === 'client'
                    ? 'bg-white border-emerald-500 text-bdGreen-900 shadow-xs ring-1 ring-emerald-500/20'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Rahim</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-bdGreen-700 transition-all shrink-0" />
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickDemo('lawyer')}
                className={`group py-2 px-2.5 rounded-xl text-left border transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-[0.98] flex items-center justify-between text-xs font-bold ${
                  selectedRole === 'lawyer'
                    ? 'bg-bdGreen-800 border-bdGreen-900 text-white shadow-xs'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Briefcase className="w-3.5 h-3.5 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Tanvir</span>
                </div>
                <ArrowRight className="w-3 h-3 text-amber-200 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleQuickDemo('admin')}
                className="group py-2 px-2.5 rounded-xl text-left border border-purple-200 bg-purple-50/70 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-[0.98] flex items-center justify-between text-xs font-bold text-purple-900"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Admin DG</span>
                </div>
                <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>
          </div>

          {/* SIGN IN FORM (Animated Slide-Fade Left) */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 animate-tab-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === 'lawyer' ? 'Advocate Email / Bar Registry ID' : 'Client Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder={selectedRole === 'lawyer' ? 'tanvir@lawbd.com' : 'client@lawbd.com'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400">Default: password123</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.99] shadow-md flex items-center justify-center gap-2"
              >
                <span>
                  {loading
                    ? 'Signing In...'
                    : (selectedRole === 'lawyer' ? 'Sign In to Advocate Portal' : 'Sign In as Citizen')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* REGISTER FORM (Animated Slide-Fade Right) */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5 animate-tab-right">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedRole === 'lawyer' ? 'Full Name with Title (e.g., Adv. Shahinur Rahman)' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={selectedRole === 'lawyer' ? 'Adv. Shahinur Rahman' : 'Rahim Ahmed'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Lawyer Specific Inputs (Smooth Expand-Down) */}
              {selectedRole === 'lawyer' && (
                <div className="space-y-3 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/70 animate-expand-down overflow-hidden">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Bangladesh Bar Council Credentials</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Bar Council Sanad / Enrollment No.
                    </label>
                    <input
                      type="text"
                      required
                      value={barCouncilNo}
                      onChange={(e) => setBarCouncilNo(e.target.value)}
                      placeholder="e.g., BC/DH-2018/7421"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Bar Association
                      </label>
                      <select
                        value={association}
                        onChange={(e) => setAssociation(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-900 focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                      >
                        <option value="Supreme Court Bar Association">Supreme Court Bar</option>
                        <option value="Dhaka Bar Association">Dhaka Bar Association</option>
                        <option value="Chittagong Bar Association">Chittagong Bar Association</option>
                        <option value="Rajshahi Bar Association">Rajshahi Bar Association</option>
                        <option value="Sylhet Bar Association">Sylhet Bar Association</option>
                        <option value="Khulna Bar Association">Khulna Bar Association</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Court Practice Level
                      </label>
                      <select
                        value={courtLevel}
                        onChange={(e) => setCourtLevel(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-900 focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                      >
                        <option value="Supreme Court of Bangladesh">Supreme Court (Appellate / High Court)</option>
                        <option value="District & Sessions Judge Court">District & Sessions Judge Court</option>
                        <option value="Specialized Tribunal">Specialized Tribunal</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700 000000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-bdGreen-700 focus:ring-4 focus:ring-emerald-500/15 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>
                  {loading
                    ? 'Creating Account...'
                    : (selectedRole === 'lawyer' ? 'Register Advocate Account' : 'Register Citizen Account')}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </button>
            </form>
          )}

          {/* Privacy & Legal disclaimer */}
          <div className="pt-2 text-center text-[10px] text-slate-400">
            Protected by Bangladesh Digital Security & Advocate Confidentiality Standards.
          </div>

        </div>

      </div>
    </div>
  );
}
