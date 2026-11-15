import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, User, Briefcase, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [roleTab, setRoleTab] = useState('client'); // 'client' | 'lawyer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.user.role === 'lawyer') navigate('/dashboard/lawyer');
        else navigate('/dashboard/client');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (targetRole) => {
    setLoading(true);
    setError('');
    try {
      const res = await demoLogin(targetRole);
      if (res.success) {
        if (targetRole === 'lawyer') navigate('/dashboard/lawyer');
        else navigate('/dashboard/client');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-bdGreen-800 text-white flex items-center justify-center mx-auto shadow-md relative">
            <div className="absolute w-6 h-6 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
            <Scale className="relative z-10 w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-slate-900">
            {lang === 'bn' ? 'লগইন করুন — Law_BD' : 'Sign In to Law_BD'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'আপনার আইনি ফাইল, অ্যাপয়েন্টমেন্ট এবং আইনজীবীদের সাথে যোগাযোগের পোর্টাল।'
              : 'Access your legal case vault, consultation passes, and direct advocate communications.'}
          </p>
        </div>

        {/* Role Toggle: Citizen vs Lawyer */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setRoleTab('client');
              setEmail('client@lawbd.com');
              setPassword('password123');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              roleTab === 'client'
                ? 'bg-white text-bdGreen-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span>Citizen / Client</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRoleTab('lawyer');
              setEmail('tanvir@lawbd.com');
              setPassword('password123');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              roleTab === 'lawyer'
                ? 'bg-bdGreen-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-300" />
            <span>Advocate / Lawyer</span>
          </button>
        </div>

        {/* 1-Click Fast Test Switcher (NO Admin!) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-bdGreen-900 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              1-Click Fast Login (Instant Test):
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">Client / Lawyer</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemo('client')}
              className="py-2 px-2.5 text-center bg-white hover:bg-emerald-100 rounded-xl border border-emerald-300 text-[11px] font-bold text-slate-800 transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rahim (Citizen)</span>
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemo('lawyer')}
              className="py-2 px-2.5 text-center bg-bdGreen-800 hover:bg-bdGreen-700 rounded-xl text-[11px] font-bold text-white transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-300" />
              <span>Adv. Tanvir (Lawyer)</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-bdRed-600 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Standard Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {roleTab === 'lawyer' ? 'Advocate Email:' : 'Client Email Address:'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={roleTab === 'lawyer' ? 'tanvir@lawbd.com' : 'client@lawbd.com'}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-700 font-semibold">Password:</label>
              <span className="text-[10px] text-slate-400">Demo password: password123</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-bdGreen-800 hover:bg-bdGreen-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>
              {loading
                ? 'Authenticating...'
                : (roleTab === 'lawyer' ? 'Sign In to Advocate Chamber' : 'Sign In as Citizen')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/register" className="text-bdGreen-800 font-bold hover:underline">
            Register Here (Citizen or Lawyer)
          </Link>
        </div>

      </div>
    </div>
  );
}
