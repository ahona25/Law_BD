import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, CheckCircle2, User, Briefcase, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AUTH_INPUT_CLASS =
  'w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:border-bdGreen-800 focus:ring-4 focus:ring-bdGreen-800/10 focus:scale-[1.003]';

export function AuthRoleTabs({ role, onChange }) {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <div
      role="tablist"
      aria-label={isBn ? 'অ্যাকাউন্টের ধরন' : 'Account role'}
      className="relative p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-hidden select-none"
    >
      {/* Smooth sliding pill indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          role === 'client'
            ? 'left-1 bg-white ring-1 ring-slate-200/80'
            : 'left-[calc(50%+2px)] bg-bdGreen-800 text-white'
        }`}
      />
      <div className="relative grid grid-cols-2 gap-1 z-10">
        <button
          type="button"
          role="tab"
          aria-selected={role === 'client'}
          onClick={() => onChange('client')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
            role === 'client'
              ? 'text-bdGreen-900 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className={`w-4 h-4 transition-transform duration-200 ${role === 'client' ? 'text-bdGreen-700 scale-105' : 'text-slate-400'}`} />
          <span>{isBn ? 'নাগরিক / ক্লায়েন্ট' : 'Citizen / Client'}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={role === 'lawyer'}
          onClick={() => onChange('lawyer')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
            role === 'lawyer'
              ? 'text-white font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className={`w-4 h-4 transition-transform duration-200 ${role === 'lawyer' ? 'text-amber-300 scale-105' : 'text-slate-400'}`} />
          <span>{isBn ? 'আইনজীবী / অ্যাডভোকেট' : 'Advocate / Lawyer'}</span>
        </button>
      </div>
    </div>
  );
}

export default function AuthShell({
  badgeText,
  asideTitle,
  asideSubtitle,
  features,
  heading,
  subheading,
  onCancel,
  children
}) {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <div
      className={`relative min-h-[calc(100vh-5rem)] bg-[#0D211B] flex items-center justify-center px-4 py-10 sm:py-14 overflow-hidden ${isBn ? 'font-bangla' : ''
        }`}
    >
      {/* Curated Architectural Emerald-Slate Background Layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 14% 18%, rgba(16, 185, 129, 0.20), transparent 44%)',
            'radial-gradient(circle at 86% 82%, rgba(13, 148, 136, 0.18), transparent 46%)',
            'radial-gradient(circle at 75% 12%, rgba(244, 42, 65, 0.08), transparent 36%)',
            'linear-gradient(160deg, #0D241D 0%, #0A1B16 52%, #071310 100%)'
          ].join(', ')
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.65) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Elevated Split Auth Card with Smooth Entrance Animation */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl border border-white/15 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.55)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-auth-card">
        {/* Left Editorial Brand Column */}
        <aside className="lg:col-span-5 relative bg-gradient-to-br from-[#074435] via-[#062E24] to-[#041D17] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          <img
            src="/lady-justice.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity pointer-events-none select-none"
          />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-bdRed-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center relative shadow-inner group-hover:bg-white/15 transition-colors">
                <span className="absolute w-4 h-4 rounded-full bg-bdRed-500 opacity-90 -mr-1" />
                <Scale className="relative z-10 w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg tracking-wide text-white leading-none">
                  Law_BD
                </div>
                <div className="text-[11px] text-emerald-200/85 tracking-wider uppercase mt-1">
                  {isBn ? 'ডিজিটাল আইনি পোর্টাল' : 'Bangladesh Legal Portal'}
                </div>
              </div>
            </Link>

            <div className="space-y-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {badgeText}
              </span>

              <h2 className="font-serif font-bold text-2xl sm:text-[28px] leading-snug text-white">
                {asideTitle}
              </h2>

              <p className="text-sm text-slate-200/85 leading-relaxed">{asideSubtitle}</p>
            </div>

            <ul className="space-y-3 pt-2">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-100/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300/85">
            <span>{isBn ? 'এনক্রিপ্টেড সেশন সুরক্ষা' : 'End-to-End Protected Portal'}</span>
            <span className="font-mono text-emerald-300">Law_BD v2.0</span>
          </div>
        </aside>

        {/* Right Form Column */}
        <section className="relative lg:col-span-7 bg-white p-6 pt-14 sm:p-10 md:p-12 flex flex-col justify-center">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              aria-label={isBn ? 'বাতিল করুন' : 'Cancel'}
              title={isBn ? 'বাতিল করুন' : 'Cancel'}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="space-y-1.5">
              <h1 className="font-serif font-bold text-2xl sm:text-[26px] text-slate-900 tracking-tight">
                {heading}
              </h1>
              <p className="text-sm text-slate-500">{subheading}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
