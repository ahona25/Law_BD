import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  LayoutGrid,
  FileText,
  Calendar,
  History,
  Bell,
  ArrowDown,
  Plus,
  FolderOpen,
  LogIn,
  CheckCircle2,
  Lock,
  Briefcase,
  Sparkles,
  X,
  ShieldCheck
} from 'lucide-react';
import { getStatusInfo } from './caseConstants';

const CARD_STYLES = {
  status: {
    iconWrap: 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25',
    idle: 'ct-surface bg-gradient-to-br from-white to-indigo-50/45 border-slate-200 hover:border-indigo-300 hover:from-indigo-50/70 hover:to-blue-50/60 dark:hover:border-indigo-400',
    active: 'ct-surface-active bg-gradient-to-br from-indigo-50 to-blue-50/80 border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20 shadow-md',
    metaActive: 'text-indigo-700 dark:text-indigo-300'
  },
  hearings: {
    iconWrap: 'bg-teal-600 text-white shadow-sm shadow-teal-600/25',
    idle: 'ct-surface bg-gradient-to-br from-white to-teal-50/45 border-slate-200 hover:border-teal-300 hover:from-teal-50/70 hover:to-emerald-50/60 dark:hover:border-teal-400',
    active: 'ct-surface-active bg-gradient-to-br from-teal-50 to-emerald-50/80 border-teal-600 dark:border-teal-400 ring-2 ring-teal-500/20 shadow-md',
    metaActive: 'text-teal-700 dark:text-teal-300'
  },
  history: {
    iconWrap: 'bg-amber-600 text-white shadow-sm shadow-amber-600/25',
    idle: 'ct-surface bg-gradient-to-br from-white to-amber-50/45 border-slate-200 hover:border-amber-300 hover:from-amber-50/70 hover:to-orange-50/50 dark:hover:border-amber-400',
    active: 'ct-surface-active bg-gradient-to-br from-amber-50 to-orange-50/70 border-amber-600 dark:border-amber-400 ring-2 ring-amber-500/20 shadow-md',
    metaActive: 'text-amber-700 dark:text-amber-300'
  },
  notifications: {
    iconWrap: 'bg-violet-600 text-white shadow-sm shadow-violet-600/25',
    idle: 'ct-surface bg-gradient-to-br from-white to-violet-50/45 border-slate-200 hover:border-violet-300 hover:from-violet-50/70 hover:to-fuchsia-50/50 dark:hover:border-violet-400',
    active: 'ct-surface-active bg-gradient-to-br from-violet-50 to-fuchsia-50/70 border-violet-600 dark:border-violet-400 ring-2 ring-violet-500/20 shadow-md',
    metaActive: 'text-violet-700 dark:text-violet-300'
  }
};

export default function CaseTrackingFlowHeader({
  isAuthenticated,
  user,
  eligible,
  eligibilityReason,
  demoMode,
  onToggleDemo,
  casesCount,
  selectedCase,
  unreadCount,
  activeSection,
  onSelectSection,
  onOpenCreate,
  isBn
}) {
  const canUse = (isAuthenticated && eligible) || demoMode;
  const statusInfo = canUse && selectedCase ? getStatusInfo(selectedCase.status) : null;

  const cards = [
    {
      id: 'status',
      icon: FileText,
      title: isBn ? 'মামলার অবস্থা' : 'Case Status',
      meta:
        canUse && selectedCase
          ? isBn
            ? statusInfo.bnLabel
            : statusInfo.enLabel
          : isBn
          ? 'চলমান · শুনানি · পর্যালোচনা · নিষ্পত্তি'
          : 'Pending · Hearing · Review · Disposed'
    },
    {
      id: 'hearings',
      icon: Calendar,
      title: isBn ? 'শুনানির তারিখ' : 'Hearing Dates',
      meta:
        canUse && selectedCase?.next_hearing_date
          ? `${selectedCase.next_hearing_date}${
              selectedCase.next_hearing_time ? ` · ${selectedCase.next_hearing_time}` : ''
            }`
          : isBn
          ? 'তারিখ, আদালত ও সময় দেখুন'
          : 'Next date, court & time'
    },
    {
      id: 'history',
      icon: History,
      title: isBn ? 'মামলার ইতিহাস' : 'Case History',
      meta:
        canUse && selectedCase
          ? `${selectedCase.history?.length || 0} ${isBn ? 'টি কার্যক্রম' : 'activities'}`
          : isBn
          ? 'নিবন্ধন থেকে সর্বশেষ আপডেট'
          : 'Registration to latest update'
    },
    {
      id: 'notifications',
      icon: Bell,
      title: isBn ? 'নোটিফিকেশন' : 'Notifications',
      meta: canUse
        ? unreadCount > 0
          ? isBn
            ? `${unreadCount} টি অপঠিত`
            : `${unreadCount} unread alerts`
          : isBn
          ? 'সব পঠিত'
          : 'All caught up'
        : isBn
        ? 'শুনানি ও আপডেট বিজ্ঞপ্তি'
        : 'Hearing & case alerts',
      badge: canUse ? unreadCount : 0
    }
  ];

  const getAccessMessage = () => {
    if (!isAuthenticated) {
      return isBn
        ? 'মামলা ট্র্যাকিং ব্যবহার করতে অনুগ্রহ করে ক্লায়েন্ট হিসেবে সাইন ইন করুন।'
        : 'Sign in as a client and fix a case with a lawyer to unlock Case Tracking.';
    }
    if (eligibilityReason === 'not_client') {
      return isBn
        ? 'শুধুমাত্র ক্লায়েন্টরা আইনজীবীর সাথে মামলা নির্ধারণের পর এই অপশনটি ব্যবহার করতে পারবেন।'
        : 'Only clients can use Case Tracking after fixing a case with a lawyer.';
    }
    if (eligibilityReason === 'no_lawyer_case') {
      return isBn
        ? 'এই অপশনটি ব্যবহার করতে প্রথমে একজন আইনজীবীর সাথে মামলা বা পরামর্শ নির্ধারণ করুন।'
        : 'You have not fixed a case with a lawyer yet. Book a lawyer first to unlock Case Tracking.';
    }
    return '';
  };

  return (
    <div className="ct-shell relative bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_-20px_rgba(6,78,59,0.14)] overflow-hidden transition-colors">
      {/* Signature Top Multi-Tone Judicial Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-bdGreen-800 via-teal-500 via-50% to-indigo-600" />

      <div className="p-4 sm:p-7 space-y-2.5 sm:space-y-3">
        {/* Node 1: Clients */}
        <div className="ct-surface rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-cyan-50/70 border border-emerald-200/80 px-4 sm:px-6 py-4 sm:py-5 text-center space-y-2.5 transition-all">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bdGreen-800 to-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-900/15">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              {isBn ? 'ক্লায়েন্ট' : 'Clients'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {isBn ? 'মামলার তথ্য যাচাই করতে চান' : 'Wants to check case information'}
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
            {demoMode ? (
              <>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/45 font-bold text-amber-900 dark:text-amber-200 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span>
                    {isBn
                      ? `ডেমো প্রদর্শনী (${casesCount} টি মামলা)`
                      : `Demo Showcase (${casesCount} Cases)`}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={onOpenCreate}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-bdGreen-800 to-teal-700 hover:from-bdGreen-700 hover:to-teal-600 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নতুন মামলা যোগ করুন' : 'New Case'}</span>
                </button>
                <button
                  type="button"
                  onClick={onToggleDemo}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-[#142C24] hover:bg-slate-100 dark:hover:bg-[#19352C] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-[#254A3E] font-bold transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ডেমো বন্ধ করুন' : 'Exit Demo'}</span>
                </button>
              </>
            ) : !isAuthenticated ? (
              <>
                <Link
                  to="/login?from=/case-tracking"
                  state={{ from: '/case-tracking' }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-bdGreen-800 to-teal-700 hover:from-bdGreen-700 hover:to-teal-600 text-white font-bold transition-all shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সাইন ইন' : 'Sign In'}</span>
                </Link>
                <button
                  type="button"
                  onClick={onToggleDemo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#142C24] hover:bg-amber-50 dark:hover:bg-amber-950/50 text-slate-800 dark:text-amber-200 border border-amber-300 dark:border-amber-500/45 font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>{isBn ? 'ডেমো দেখুন' : 'Try Demo'}</span>
                </button>
              </>
            ) : canUse ? (
              <>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-[#122921] border border-emerald-200 dark:border-emerald-500/35 font-semibold text-slate-700 dark:text-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    {user?.name} ({casesCount} {isBn ? 'টি মামলা' : 'Cases'})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={onOpenCreate}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-bdGreen-800 to-teal-700 hover:from-bdGreen-700 hover:to-teal-600 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নতুন মামলা যোগ করুন' : 'New Case'}</span>
                </button>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/40 font-semibold text-amber-900 dark:text-amber-200">
                  <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{user?.name}</span>
                </span>
                {eligibilityReason === 'no_lawyer_case' && (
                  <Link
                    to="/lawyers"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-bdGreen-800 to-teal-700 hover:from-bdGreen-700 hover:to-teal-600 text-white font-bold transition-all shadow-sm"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{isBn ? 'আইনজীবী নির্বাচন করুন' : 'Fix Case with a Lawyer'}</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={onToggleDemo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#142C24] hover:bg-amber-50 dark:hover:bg-amber-950/50 text-slate-800 dark:text-amber-200 border border-amber-300 dark:border-amber-500/45 font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>{isBn ? 'ডেমো দেখুন' : 'Try Demo'}</span>
                </button>
              </div>
            )}
          </div>

          {!canUse && (
            <p className="text-[11px] sm:text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50/95 dark:bg-amber-950/45 border border-amber-200 dark:border-amber-500/35 rounded-xl px-3.5 py-2 max-w-xl mx-auto">
              {getAccessMessage()}
            </p>
          )}
        </div>

        {/* Connector Arrow 1 */}
        <div className="flex justify-center">
          <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-[#122921] border border-emerald-200 dark:border-emerald-500/35 flex items-center justify-center text-bdGreen-800 dark:text-emerald-300 shadow-2xs">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Node 2: Case Tracking Dashboard — Executive Midnight Emerald-Navy Hub */}
        <div className="ct-dashboard-hub relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#072E25] via-[#0B3B3A] to-[#142D4C] text-white px-4 sm:px-6 py-4 sm:py-5 text-center space-y-1.5 shadow-md">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-teal-400/15 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-indigo-400/15 blur-2xl"
          />
          <div className="relative z-10 flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 rounded-xl bg-white/12 border border-white/20 backdrop-blur-xs text-amber-300 flex items-center justify-center shadow-inner">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight">
                {isBn ? 'কেস ট্র্যাকিং ড্যাশবোর্ড' : 'Case Tracking Dashboard'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-semibold text-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                {isBn ? 'ভেরিফায়েড পোর্টাল' : 'Verified Portal'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200/90">
              {isBn
                ? 'মামলার বিস্তারিত ও আপডেট প্রদর্শন করে — যেকোনো মডিউলে ক্লিক করুন'
                : 'Displays case details and updates — select any module below to inspect'}
            </p>
          </div>
        </div>

        {/* Connector Arrow 2 */}
        <div className="flex justify-center">
          <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-[#171E36] border border-indigo-200 dark:border-indigo-500/35 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shadow-2xs">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2x2 Color-Coded Module Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            const isActive = canUse && activeSection === card.id;
            const theme = CARD_STYLES[card.id];
            return (
              <button
                key={card.id}
                type="button"
                disabled={!canUse}
                onClick={() => canUse && onSelectSection(card.id)}
                className={`group rounded-2xl border px-4 sm:px-5 py-4 sm:py-5 text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 relative ${
                  !canUse
                    ? 'ct-surface bg-slate-50 border-slate-200 opacity-65 cursor-not-allowed'
                    : isActive
                    ? `${theme.active} -translate-y-0.5 cursor-pointer`
                    : `${theme.idle} hover:-translate-y-0.5 hover:shadow-sm cursor-pointer`
                }`}
              >
                {!canUse && (
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-3 right-3" aria-hidden="true" />
                )}
                {card.badge > 0 && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold bg-bdRed-500 text-white rounded-full shadow-xs">
                    {card.badge}
                  </span>
                )}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                    canUse
                      ? `${theme.iconWrap} group-hover:scale-105`
                      : 'bg-slate-200 dark:bg-[#162C24] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm sm:text-base text-slate-900">{card.title}</span>
                <span
                  className={`text-[11px] sm:text-xs font-semibold ${
                    isActive ? theme.metaActive : 'text-slate-500'
                  }`}
                >
                  {card.meta}
                </span>
              </button>
            );
          })}
        </div>

        {/* Document Management & Court Orders Action Bar */}
        <div className="pt-1 flex justify-center">
          <button
            type="button"
            disabled={!canUse}
            onClick={() => canUse && onSelectSection('documents')}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
              !canUse
                ? 'ct-surface bg-slate-50 border-slate-200 text-slate-400 opacity-65 cursor-not-allowed'
                : activeSection === 'documents'
                ? 'ct-surface-active bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-600 dark:border-cyan-400 text-cyan-900 dark:text-cyan-100 ring-2 ring-cyan-500/20 shadow-sm cursor-pointer'
                : 'ct-surface bg-gradient-to-r from-slate-50 to-cyan-50/40 hover:from-cyan-50 hover:to-sky-50 border-slate-200 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-700 cursor-pointer'
            }`}
          >
            {!canUse ? (
              <Lock className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FolderOpen className="w-3.5 h-3.5" />
              </span>
            )}
            <span>
              {isBn ? 'নথি ও আদালতের আদেশ ব্যবস্থাপনা' : 'Document Management & Court Orders'}
              {canUse && selectedCase ? ` (${selectedCase.documents?.length || 0})` : ''}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
