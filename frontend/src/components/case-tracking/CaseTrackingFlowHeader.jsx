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
  X
} from 'lucide-react';
import { getStatusInfo } from './caseConstants';

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
      meta: canUse && selectedCase
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
      meta: canUse && selectedCase?.next_hearing_date
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
      meta: canUse && selectedCase
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
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-7 space-y-2.5 sm:space-y-3">
      {/* Node 1: Clients */}
      <div className="rounded-2xl bg-[#EBF4FF] border border-[#CFE2FF] px-4 sm:px-6 py-4 sm:py-5 text-center space-y-2 transition-all">
        <div className="w-9 h-9 rounded-xl bg-white/85 border border-[#CFE2FF] text-[#2563EB] flex items-center justify-center mx-auto shadow-2xs">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-base sm:text-lg text-slate-900">
            {isBn ? 'ক্লায়েন্ট' : 'Clients'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {isBn ? 'মামলার তথ্য যাচাই করতে চান' : 'Wants to check case information'}
          </p>
        </div>

        <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
          {demoMode ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 font-bold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{isBn ? `ডেমো প্রদর্শনী (${casesCount} টি মামলা)` : `Demo Showcase (${casesCount} Cases)`}</span>
              </span>
              <button
                type="button"
                onClick={onOpenCreate}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? 'নতুন মামলা যোগ করুন' : 'New Case'}</span>
              </button>
              <button
                type="button"
                onClick={onToggleDemo}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isBn ? 'ডেমো বন্ধ করুন' : 'Exit Demo'}</span>
              </button>
            </>
          ) : !isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isBn ? 'সাইন ইন' : 'Sign In'}</span>
              </Link>
              <button
                type="button"
                onClick={onToggleDemo}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-50 text-slate-800 border border-amber-300 font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? 'ডেমো দেখুন' : 'Try Demo'}</span>
              </button>
            </>
          ) : canUse ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#CFE2FF] font-semibold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {user?.name} ({casesCount} {isBn ? 'টি মামলা' : 'Cases'})
                </span>
              </span>
              <button
                type="button"
                onClick={onOpenCreate}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? 'নতুন মামলা যোগ করুন' : 'New Case'}</span>
              </button>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 font-semibold text-amber-900">
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{user?.name}</span>
              </span>
              {eligibilityReason === 'no_lawyer_case' && (
                <Link
                  to="/lawyers"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors shadow-2xs"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{isBn ? 'আইনজীবী নির্বাচন করুন' : 'Fix Case with a Lawyer'}</span>
                </Link>
              )}
              <button
                type="button"
                onClick={onToggleDemo}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-50 text-slate-800 border border-amber-300 font-bold transition-colors shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? 'ডেমো দেখুন' : 'Try Demo'}</span>
              </button>
            </div>
          )}
        </div>

        {!canUse && (
          <p className="text-[11px] sm:text-xs font-medium text-amber-800 bg-amber-50/90 border border-amber-200 rounded-xl px-3 py-2 max-w-xl mx-auto">
            {getAccessMessage()}
          </p>
        )}
      </div>

      {/* Connector Arrow 1 */}
      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-slate-500" />
      </div>

      {/* Node 2: Case Tracking Dashboard */}
      <div className="rounded-2xl bg-[#EBF4FF] border border-[#CFE2FF] px-4 sm:px-6 py-4 sm:py-5 text-center space-y-1">
        <div className="w-9 h-9 rounded-xl bg-white/85 border border-[#CFE2FF] text-[#2563EB] flex items-center justify-center mx-auto shadow-2xs">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <h2 className="font-bold text-base sm:text-lg text-slate-900">
          {isBn ? 'কেস ট্র্যাকিং ড্যাশবোর্ড' : 'Case Tracking Dashboard'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          {isBn ? 'মামলার বিস্তারিত ও আপডেট প্রদর্শন করে' : 'Displays case details and updates'}
        </p>
      </div>

      {/* Connector Arrow 2 */}
      <div className="flex justify-center">
        <ArrowDown className="w-4 h-4 text-slate-500" />
      </div>

      {/* 2x2 Module Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isActive = canUse && activeSection === card.id;
          return (
            <button
              key={card.id}
              type="button"
              disabled={!canUse}
              onClick={() => canUse && onSelectSection(card.id)}
              className={`rounded-2xl border px-4 sm:px-5 py-4 sm:py-5 text-center transition-all flex flex-col items-center justify-center gap-1.5 relative ${
                !canUse
                  ? 'bg-slate-50/80 border-slate-200 opacity-60 cursor-not-allowed'
                  : isActive
                  ? 'bg-[#F5F9FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm cursor-pointer'
                  : 'bg-white border-slate-200 hover:border-[#93C5FD] hover:bg-slate-50/70 shadow-2xs cursor-pointer'
              }`}
            >
              {!canUse && (
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute top-3 right-3" aria-hidden="true" />
              )}
              {card.badge > 0 && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold bg-bdRed-500 text-white rounded-full">
                  {card.badge}
                </span>
              )}
              <Icon className={`w-5 h-5 ${canUse ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span className="font-bold text-sm sm:text-base text-slate-900">{card.title}</span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-500">{card.meta}</span>
            </button>
          );
        })}
      </div>

      {/* Document Management Quick Button */}
      <div className="pt-1 flex justify-center">
        <button
          type="button"
          disabled={!canUse}
          onClick={() => canUse && onSelectSection('documents')}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
            !canUse
              ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
              : activeSection === 'documents'
              ? 'bg-[#EBF4FF] border-[#2563EB] text-[#1D4ED8] ring-2 ring-[#2563EB]/15 cursor-pointer'
              : 'bg-slate-50 hover:bg-[#EBF4FF] border-slate-200 hover:border-[#93C5FD] text-slate-700 cursor-pointer'
          }`}
        >
          {!canUse ? (
            <Lock className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <FolderOpen className="w-4 h-4 text-[#2563EB] shrink-0" />
          )}
          <span>
            {isBn ? 'নথি ও আদালতের আদেশ ব্যবস্থাপনা' : 'Document Management & Court Orders'}
            {canUse && selectedCase ? ` (${selectedCase.documents?.length || 0})` : ''}
          </span>
        </button>
      </div>
    </div>
  );
}
