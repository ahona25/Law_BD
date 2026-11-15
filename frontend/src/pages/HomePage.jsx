import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Search,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Calendar,
  FileCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  HeartHandshake,
  Layers,
  ChevronDown,
  Building2,
  Award,
  Gavel
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { ALL_30_LEGAL_CATEGORIES } from '../data/categoriesData';
import { api } from '../services/api';
import SequentialSidebar from '../components/SequentialSidebar';
import ladyJusticeImg from '../assets/lady-justice.jpg';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const { savedLaws, toggleLawBookmark } = useBookmarks();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [recentLaws, setRecentLaws] = useState([]);
  const [topLawyers, setTopLawyers] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);

  useEffect(() => {
    // Load recent laws
    api.getLaws().then(res => {
      if (res.success) setRecentLaws(res.laws.slice(0, 4));
    }).catch(() => {});

    // Load top lawyers
    api.getLawyers({ sortBy: 'top-rated' }).then(res => {
      if (res.success) setTopLawyers(res.lawyers.slice(0, 3));
    }).catch(() => {});
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const isIncident = searchQuery.split(' ').length > 3 || 
      searchQuery.includes('দখল') || 
      searchQuery.includes('মারধর') || 
      searchQuery.includes('threat') || 
      searchQuery.includes('stole');

    if (isIncident) {
      navigate('/victim-support', { state: { prefilledIncident: searchQuery } });
    } else {
      navigate(`/laws?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const sampleSearches = [
    { label: 'জমি দখল ও উচ্ছেদ (Land)', query: 'জমি জোরপূর্বক দখল করেছে' },
    { label: 'Section 138 NI Act (Cheque)', query: 'cheque bounce 30 days notice' },
    { label: 'তালাক ও দেনমোহর (Divorce & Dower)', query: 'divorce dower denmohur maintenance' },
    { label: 'Cyber Blackmail / হ্যাকিং', query: 'cyber blackmail private photo' },
    { label: 'চিকিৎসা অবহেলা (Medical Negligence)', query: 'medical negligence wrong treatment' },
    { label: 'আগাম জামিন (Anticipatory Bail)', query: 'bail section 498 CrPC High Court' }
  ];

  const faqs = [
    {
      q: 'What is the legal difference between a General Diary (GD) and an FIR in Bangladesh?',
      qBn: 'সাধারণ ডায়েরি (GD) এবং এজাহার (FIR)-এর মধ্যে আইনি পার্থক্য কী?',
      a: 'A GD is a daily police register record maintained under Section 44 of the Police Act for preventive safety, lost documents (e.g., NID, certificates), or threats. An FIR (Section 154 CrPC) is recorded for cognizable offenses (murder, theft, robbery), which immediately triggers formal investigation and arrest powers without a warrant.',
      aBn: 'জিডি হলো থানার দৈনন্দিন রেজিস্টার যা মূলত কোনো কাগজ হারানো বা ভবিষ্যতের সম্ভাব্য হুমকির বিষয়ে প্রতিরোধমূলক ব্যবস্থা হিসেবে করা হয়। আর এজাহার (FIR) হলো আমলযোগ্য অপরাধের (যেমন হত্যা, ডাকাতি, চুরি) ক্ষেত্রে সরাসরি মামলা, যার মাধ্যমে পুলিশ ওয়ারেন্ট ছাড়াই তদন্ত ও আসামি গ্রেফতারের ক্ষমতা পায়।'
    },
    {
      q: 'How long do I have to file a Cheque Dishonour case under Section 138 NI Act?',
      qBn: 'চেক বাউন্স হলে হস্তান্তরিত দলিল আইনের ১৩৮ ধারায় মামলা করার সময়সীমা কতদিন?',
      a: 'You must serve a formal Advocate Legal Notice within 30 days of receiving the Bank Cheque Return Memo. The drawer is given 30 days to pay. If they fail to pay, you have exactly 30 days after that notice period to file the complaint in Court.',
      aBn: 'ব্যাংক থেকে চেক প্রত্যাখ্যাত হওয়ার মেমো পাওয়ার ৩০ দিনের মধ্যে আইনজীবীর মাধ্যমে লিখিত লিগ্যাল নোটিশ পাঠাতে হবে। নোটিশ পাওয়ার পর আসামীকে টাকা পরিশোধের জন্য ৩০ দিন সময় দিতে হবে। এরপর পরবর্তী ৩০ দিনের মধ্যে আদালতে মামলা দায়ের করতে হবে।'
    },
    {
      q: 'What are the consequences of forceful land grabbing under Land Crime Act 2023?',
      qBn: 'ভূমি অপরাধ আইন ২০২৩ অনুযায়ী জোরপূর্বক জমি দখল করলে কী শাস্তি হয়?',
      a: 'Under the Land Crime Prevention and Redress Act 2023, land grabbing and forged deed creation are recognized as non-bailable criminal offenses punishable by up to 7 years rigorous imprisonment. Executive Magistrates are empowered to conduct summary proceedings and order immediate eviction.',
      aBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জমি জবরদখল ও জাল দলিল তৈরি জামিন-অযোগ্য অপরাধ, যার শাস্তি ৭ বছর পর্যন্ত সশ্রম কারাদণ্ড। নির্বাহী ম্যাজিস্ট্রেটরা সংক্ষিপ্ত বিচারিক ক্ষমতার মাধ্যমে দখলদারকে তাৎক্ষণিক উচ্ছেদ করতে পারেন।'
    },
    {
      q: 'Can a victim file a complaint for medical negligence in Bangladesh?',
      qBn: 'চিকিৎসায় মারাত্মক অবহেলা বা ভুল চিকিৎসার ক্ষেত্রে রোগী কীভাবে আইনি প্রতিকার পেতে পারেন?',
      a: 'Yes. Victims can lodge a complaint before the Bangladesh Medical & Dental Council (BMDC) under the BMDC Act 2010 to cancel the physician’s license, file a criminal complaint under Section 304A of the Penal Code for rash or negligent act, and sue in Civil Court for monetary damages and compensation.',
      aBn: 'হ্যাঁ। ভুক্তভোগী রোগী বা পরিবার বিএমডিসি বরাবর অভিযোগ করে চিকিৎসকের লাইসেন্স বাতিল দাবি করতে পারেন, দণ্ডবিধির ৩০৪ক ধারায় ফৌজদারি মামলা করতে পারেন এবং ক্ষতিপূরণ দাবি করে দেওয়ানি আদালতে মামলা দায়ের করতে পারেন।'
    }
  ];

  const activeCategory = ALL_30_LEGAL_CATEGORIES[selectedDomainIndex] || ALL_30_LEGAL_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      
      {/* 1. HERO SECTION & FORMAL IMAGE/SEAL PRESENTATION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bdDark-950 via-bdDark-900 to-bdGreen-950 text-white pt-12 pb-24 border-b border-emerald-950">
        
        {/* Subtle decorative circles mimicking national flag */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-bdRed-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Columns: Hero Titles & Universal Search */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Official Seal Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-bdRed-500 animate-pulse"></span>
                <span>{lang === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ ডিজিটাল আইনি পোর্টাল' : 'People’s Republic of Bangladesh Digital Legal Portal'}</span>
                <span className="text-white/40">|</span>
                <span className="text-amber-300 font-mono text-[11px]">30 Jurisdictions</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {lang === 'bn' ? (
                  <>আপনার অধিকার জানুন। <br /><span className="text-emerald-400">আইন বুঝুন।</span> <span className="text-bdRed-400">ন্যায়বিচার পান।</span></>
                ) : (
                  <>Know Your Rights. <br /><span className="text-emerald-400">Understand the Law.</span> <span className="text-bdRed-400">Find Justice.</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {lang === 'bn'
                  ? 'বাংলাদেশের ৩০টি বিশেষায়িত আইনি অধিক্ষেত্রে সকল বলবৎ আইন, দণ্ডবিধির ধারা, ভুক্তভোগী সহায়তা এবং বাংলাদেশ বার কাউন্সিলের সনদপ্রাপ্ত বিজ্ঞ আইনজীবীদের সাথে সরাসরি সংযোগের পূর্ণাঙ্গ ডিজিটাল প্ল্যাটফর্ম।'
                  : 'All official Bangladesh statutes, criminal and civil procedures, instant victim incident triage, and direct consultation with verified Bangladesh Bar Council enrolled advocates.'}
              </p>

              {/* Universal Legal Search Form */}
              <div className="pt-2">
                <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
                  <div className="flex items-center bg-white rounded-2xl shadow-2xl p-2 border-2 border-emerald-500/40 focus-within:border-bdGreen-500 transition-all">
                    <Search className="w-6 h-6 text-bdGreen-800 ml-3 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('heroSearchPlaceholder')}
                      className="w-full px-4 py-3.5 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 shadow-md"
                    >
                      <span>{t('searchButton')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Quick Sample Search Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">{t('quickSearchTitle')}</span>
                  {sampleSearches.slice(0, 4).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item.query);
                        navigate('/victim-support', { state: { prefilledIncident: item.query } });
                      }}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors text-[11px]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? '৩০টি আইনি বিষয় ক্রমানুসারে দেখুন' : 'Explore All 30 Categories (1-30)'}</span>
                </button>
                <Link
                  to="/victim-support"
                  className="px-5 py-3 bg-bdRed-500 hover:bg-bdRed-600 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'স্মার্ট ভুক্তভোগী সহায়তা' : 'Incident Triage Wizard'}</span>
                </Link>
              </div>

            </div>

            {/* Right 5 Columns: LADY JUSTICE FORMAL HERO PRESENTATION */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/80 bg-bdDark-950">
                {/* Outer Glow Accents */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none z-10"></div>

                {/* Statue Image Container */}
                <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
                  <img
                    src={ladyJusticeImg}
                    alt="Lady Justice - Symbol of Bangladesh Legal System & Constitutional Justice"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top-down and Bottom-up Gradient Vignettes for Maximum Readability and Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bdDark-950 via-bdDark-950/45 to-black/20 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bdDark-950/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-bdRed-500 animate-ping"></span>
                      <span>{lang === 'bn' ? 'আইনের শাসন ও নিরপেক্ষ বিচার' : 'Rule of Law & Impartial Justice'}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bdDark-950/85 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow-lg">
                      <Scale className="w-3.5 h-3.5 text-amber-300" />
                      <span>30 Jurisdictions</span>
                    </div>
                  </div>

                  {/* Floating Middle Constitutional Emblem Tag */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 hidden sm:flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-bdDark-950/80 backdrop-blur-md border border-white/10 shadow-xl z-20">
                    <div className="w-8 h-8 rounded-xl bg-bdGreen-800 border border-emerald-400/50 flex items-center justify-center text-white">
                      <Gavel className="w-4 h-4 text-amber-300" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-slate-300 font-bold [writing-mode:vertical-lr] py-1">
                      SUPREME COURT BD
                    </span>
                  </div>

                  {/* Bottom Information Glass Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-2xl bg-bdDark-950/90 backdrop-blur-md border border-emerald-500/30 text-white shadow-2xl z-20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {lang === 'bn' ? 'সাংবিধানিক মানদণ্ড' : 'Constitutional Standard'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Article 27</span>
                    </div>

                    <p className="font-serif italic text-xs sm:text-[13px] text-emerald-100 leading-snug">
                      {lang === 'bn'
                        ? '“সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।”'
                        : '“All citizens are equal before law and are entitled to equal protection of law.”'}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Bangladesh Legal Code Verified</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="text-amber-300 hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors shrink-0 ml-2"
                      >
                        <span>{lang === 'bn' ? 'সকল ৩০টি বিভাগ' : 'View (1–30)'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SEQUENTIAL 30 MAIN CATEGORIES & INCIDENTS INTERACTIVE EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 text-bdGreen-800" />
              <span>{lang === 'bn' ? '৩০টি আইনি অধিক্ষেত্র ও সংশ্লিষ্ট ঘটনা' : 'All 30 Jurisdictions & Subcategories'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              {lang === 'bn' ? 'প্রধান আইনি ক্যাটাগরি ও উপ-বিভাগসমূহ' : 'Master Legal Categories & Specific Incidents'}
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Browse every statutory area sequentially from 01 to 30. Click any category or subcategory to instantly access applicable laws and victim guidance.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সাইডবারে ক্রমানুসারে দেখুন' : 'Open Sequential Sidebar'}</span>
            </button>
          </div>
        </div>

        {/* 30 Sequential Categories Grid with Subcategories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_30_LEGAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold w-8 h-8 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-bdGreen-700 transition-colors">
                      {String(cat.seq).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-bdGreen-900 leading-tight">
                        {cat.name}
                      </h3>
                      <h4 className="text-xs font-bold text-bdGreen-800 font-bangla">
                        {cat.bangla}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {cat.subcategories.length} Incidents
                  </span>
                </div>

                {/* Primary Statute Citation */}
                <p className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 mb-4 line-clamp-1">
                  <strong>Statute:</strong> {cat.primaryAct}
                </p>

                {/* Subcategories / Incidents Pills (As requested by user) */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Important Subcategories & Incidents:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub, sIdx) => {
                      const bnSub = cat.banglaSubcategories ? cat.banglaSubcategories[sIdx] : null;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => navigate(`/laws?category=${cat.id}&subcategory=${encodeURIComponent(sub)}`)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-bdGreen-800 hover:text-white text-slate-700 text-[11px] rounded-lg font-medium transition-colors text-left flex items-center gap-1 group/btn"
                        >
                          <span>{lang === 'bn' && bnSub ? bnSub : sub}</span>
                          <ChevronRight className="w-3 h-3 opacity-30 group-hover/btn:opacity-100" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  to={`/victim-support?category=${cat.id}`}
                  className="text-bdRed-600 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Report Incident</span>
                </Link>
                <Link
                  to={`/laws?category=${cat.id}`}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-bdGreen-800 hover:text-white text-bdGreen-900 rounded-xl font-bold transition-all flex items-center gap-1"
                >
                  <span>Explore Laws</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. SMART VICTIM ASSISTANCE CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-bdGreen-800 via-bdGreen-900 to-bdDark-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-600/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-bdRed-500 text-white shadow-xs">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                {lang === 'bn' ? 'কোনো আইনি জটিলতা বা অপরাধের মুখোমুখি?' : 'Facing Any Incident or Legal Hardship?'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'আইনের ধারা মুখস্থ রাখার প্রয়োজন নেই। জমি দখল, সাইবার হ্যাকিং, চেক বাউন্স, যৌতুক বা পারিবারিক যেকোনো সমস্যা বাংলায় বর্ণনা করুন। আমাদের এআই ও লিগ্যাল ইঞ্জিন তাৎক্ষণিক দিকনির্দেশনা দেবে।'
                : 'Simply describe any dispute or crime in everyday words. Our engine extracts the applicable section, identifies limitation periods, and connects you to certified advocates.'}
            </p>
          </div>
          <Link
            to="/victim-support"
            className="px-6 py-3.5 bg-bdRed-500 hover:bg-bdRed-600 text-white rounded-2xl font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <span>{lang === 'bn' ? 'ভুক্তভোগী আইনি সহায়তা শুরু করুন' : 'Launch Incident Triage'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. RECENTLY UPDATED LAWS & LANDMARK STATUTES */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-100 text-bdGreen-800 text-xs font-bold uppercase mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সদ্য হালনাগাদকৃত আইন' : 'Recently Updated Statutes'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {lang === 'bn' ? 'গুরুত্বপূর্ণ আইন ও বিধিমালা' : 'Critical Legislation & Landmark Acts'}
              </h2>
            </div>
            <Link
              to="/amendments"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-bdGreen-800 hover:text-bdGreen-900"
            >
              <span>{lang === 'bn' ? 'আইন সংশোধন ট্র্যাকার' : 'View Amendment Tracker'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentLaws.map((law) => {
              const isSaved = savedLaws.includes(law.id);
              return (
                <div
                  key={law.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-bdGreen-800 border border-emerald-200">
                        {law.category_label || law.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {law.act_no_year}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-2">
                      <Link to={`/laws/${law.id}`} className="hover:text-bdGreen-800 transition-colors">
                        {lang === 'bn' ? law.bangla_title || law.title : law.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {lang === 'bn' ? law.simple_summary_bn || law.simple_summary : law.simple_summary}
                    </p>

                    <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-slate-700 mb-4">
                      <strong className="text-bdRed-600 font-semibold block mb-0.5">
                        {lang === 'bn' ? 'দণ্ড ও শাস্তি:' : 'Statutory Penalty:'}
                      </strong>
                      <span className="line-clamp-2">
                        {lang === 'bn' ? law.penalties_bn || law.penalties : law.penalties}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleLawBookmark(law.id)}
                      className={`font-semibold transition-colors ${
                        isSaved ? 'text-bdRed-600' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {isSaved ? '★ Saved' : '☆ Save Law'}
                    </button>
                    <Link
                      to={`/laws/${law.id}`}
                      className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{lang === 'bn' ? 'ধারা ও পূর্ণাঙ্গ আইন' : 'Sections & Full Law'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TOP-RANKED ADVOCATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-bdGreen-800 uppercase tracking-wider">
              {lang === 'bn' ? 'সনদপ্রাপ্ত আইনজীবী' : 'Verified Legal Counsel'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
              {t('lawyersTitle')}
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              {t('lawyersSubtitle')}
            </p>
          </div>
          <Link
            to="/lawyers"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-bdGreen-800 hover:text-bdGreen-900"
          >
            <span>{lang === 'bn' ? 'সকল আইনজীবী দেখুন' : 'Explore All Advocates'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-bdGreen-800 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-sm">
                      {lawyer.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-slate-900">{lawyer.name}</h3>
                        {lawyer.verified && (
                          <span title="Verified Bar Council Registration">
                            <ShieldCheck className="w-4 h-4 text-bdGreen-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{lawyer.courtLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-3 inline-block">
                  Roll: {lawyer.barCouncilNo}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {lawyer.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lawyer.specialties?.slice(0, 3).map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-5">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Experience:</span>
                    <strong className="text-slate-800">{lawyer.experienceYears} Years</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Client Rating:</span>
                    <strong className="text-emerald-700">★ {lawyer.rating} ({lawyer.reviewsCount})</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Fee:</span>
                  <span className="font-bold text-base text-bdGreen-900">{lawyer.feeDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/lawyers/${lawyer.id}`}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/booking/${lawyer.id}`}
                    className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW LAW_BD WORKS */}
      <section className="bg-bdDark-900 text-white py-20 border-y border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            {lang === 'bn' ? 'কার্যপ্রণালী' : 'Simple 4-Step Process'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold mt-2 mb-4">
            {lang === 'bn' ? 'কিভাবে কাজ করে ল_বিডি?' : 'How Law_BD Demystifies Justice'}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-16">
            From the initial incident to the courtroom verdict, we provide ordinary citizens with statutory clarity, evidence checklists, and certified advocates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left relative">
              <span className="w-8 h-8 rounded-xl bg-bdGreen-700 text-white font-bold flex items-center justify-center text-sm mb-4">
                1
              </span>
              <h3 className="font-bold text-base mb-2">Describe Your Incident</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your situation in plain English or Bengali. No formal legal terminology or prior knowledge required.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left relative">
              <span className="w-8 h-8 rounded-xl bg-bdGreen-700 text-white font-bold flex items-center justify-center text-sm mb-4">
                2
              </span>
              <h3 className="font-bold text-base mb-2">Automated Legal Triage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our engine cross-checks official Bangladesh statutes, revealing applicable sections, maximum penalties, and procedural timelines.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left relative">
              <span className="w-8 h-8 rounded-xl bg-bdGreen-700 text-white font-bold flex items-center justify-center text-sm mb-4">
                3
              </span>
              <h3 className="font-bold text-base mb-2">Consult Verified Advocates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare verified Bar Council advocates side-by-side, check consultation fees, and book video or chamber visits instantly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left relative">
              <span className="w-8 h-8 rounded-xl bg-bdRed-500 text-white font-bold flex items-center justify-center text-sm mb-4">
                4
              </span>
              <h3 className="font-bold text-base mb-2">Manage Case & Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive verified appointment passes with digital QR tokens, track case hearings, and download statutory legal notice templates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED LEGAL QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-bdGreen-800 uppercase tracking-wider">
            {lang === 'bn' ? 'সাধারণ প্রশ্ন ও উত্তর' : 'Legal Clarity'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {lang === 'bn' ? 'প্রায়শই জিজ্ঞাসিত আইনি প্রশ্নাবলি' : 'Frequently Asked Practical Legal Questions'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-3xl bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-800 hover:text-bdGreen-800 flex items-center justify-between gap-4"
              >
                <span>{lang === 'bn' ? faq.qBn : faq.q}</span>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-90 text-bdGreen-800' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                  {lang === 'bn' ? faq.aBn : faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sequential Categories Drawer */}
      <SequentialSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

    </div>
  );
}
