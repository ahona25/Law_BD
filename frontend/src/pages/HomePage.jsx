import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Search,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Calendar,
  FileCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Layers,
  PhoneCall,
  Sparkles,
  FileText,
  Gavel,
  Award,
  Users,
  Shield,
  Briefcase,
  Building2,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { ALL_30_LEGAL_CATEGORIES } from '../data/categoriesData';
import { ALL_BANGLADESH_COURTS, BANGLADESH_DIVISIONS } from '../data/courtsData';
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
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'civil' | 'criminal' | 'family' | 'commercial'
  const [homeCourtDivision, setHomeCourtDivision] = useState('all');

  useEffect(() => {
    api.getLaws().then(res => {
      if (res.success && res.laws) setRecentLaws(res.laws.slice(0, 4));
    }).catch(() => { });

    api.getLawyers({ sortBy: 'top-rated' }).then(res => {
      if (res.success && res.lawyers) setTopLawyers(res.lawyers.slice(0, 3));
    }).catch(() => { });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/laws?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const sampleSearches = [
    { label: lang === 'bn' ? 'জমি দখল ও উচ্ছেদ (Land)' : 'Land Dispute & Encroachment', query: 'জমি দখল' },
    { label: lang === 'bn' ? 'ধারা ১৩৮ এনআই অ্যাক্ট (Cheque)' : 'Section 138 NI Act (Cheque)', query: 'cheque 138' },
    { label: lang === 'bn' ? 'তালাক ও দেনমোহর (Family)' : 'Divorce & Dower (Denmohur)', query: 'denmohur divorce' },
    { label: lang === 'bn' ? 'সাইবার প্রতারণা (Cybercrime)' : 'Cybercrime & Online Extortion', query: 'cyber' },
    { label: lang === 'bn' ? 'আগাম জামিন (Anticipatory Bail)' : 'Anticipatory Bail (CrPC 498)', query: 'anticipatory bail' }
  ];

  const faqs = [
    {
      q: 'What is the legal difference between a General Diary (GD) and an FIR in Bangladesh?',
      qBn: 'সাধারণ ডায়েরি (GD) এবং এজাহার (FIR)-এর মধ্যে আইনি পার্থক্য কী?',
      a: 'A General Diary (GD) is recorded under Section 44 of the Police Act for preventive safety, lost property (NID, documents), or anticipatory security threats. An FIR (First Information Report) under Section 154 of the CrPC is registered exclusively for cognizable criminal offenses (e.g. murder, robbery, violent assault), automatically initiating formal police investigation and statutory arrest powers.',
      aBn: 'জিডি (GD) হলো থানার দৈনন্দিন রেজিস্টার যা কোনো নথিপত্র হারানো বা ভবিষ্যতের আশঙ্কাজনক হুমকির ক্ষেত্রে প্রতিরোধমূলক ব্যবস্থা হিসেবে নথিভুক্ত করা হয়। আর এজাহার (FIR) হলো আমলযোগ্য অপরাধের (যেমন হত্যা, ডাকাতি, গুরুতর জখম) ক্ষেত্রে আনুষ্ঠানিক মামলা, যার ফলে পুলিশ ম্যাজিস্ট্রেটের পরোয়ানা ছাড়াই সরাসরি তদন্ত ও আসামি গ্রেফতারের এখতিয়ার পায়।'
    },
    {
      q: 'What is the strict limitation period for Cheque Dishonour under Section 138 NI Act?',
      qBn: 'চেক বাউন্স হলে হস্তান্তরিত দলিল আইনের ১৩৮ ধারায় মামলা করার সময়সীমা কতদিন?',
      a: 'Under Section 138 of the Negotiable Instruments Act 1881, the statutory timeline is non-extendable: 1) You must serve a registered Advocate Legal Notice within 30 days of receiving the Bank Cheque Return Memo. 2) The drawer is given 30 days to pay the amount. 3) If unpaid, you have exactly 30 days after the expiry of the notice period to file the criminal complaint (CR Case) before the Magistrate Court.',
      aBn: 'হস্তান্তরিত দলিল আইনের ১৩৮ ধারা একটি অত্যন্ত কঠোর ও সময়সীমাবদ্ধ আইন: ১) ব্যাংক থেকে চেক প্রত্যাখ্যাত হওয়ার মেমো পাওয়ার ৩০ দিনের মধ্যে আইনজীবীর মাধ্যমে লিখিত লিগ্যাল নোটিশ পাঠাতে হবে। ২) নোটিশ পাওয়ার পর আসামীকে টাকা পরিশোধের জন্য ৩০ দিন সময় দিতে হবে। ৩) টাকা পরিশোধ না করলে পরবর্তী ৩০ দিনের মধ্যে সংশ্লিষ্ট ম্যাজিস্ট্রেট আদালতে সরাসরি মামলা দায়ের করতে হবে।'
    },
    {
      q: 'What protections exist against forceful land grabbing under Land Crime Act 2023?',
      qBn: 'ভূমি অপরাধ আইন ২০২৩ অনুযায়ী জোরপূর্বক জমি দখল করলে কী আইনি প্রতিকার ও শাস্তি রয়েছে?',
      a: 'Under the Land Crime Prevention and Redress Act 2023, illegal land grabbing, forged deed execution, and violent dispossession are recognized as cognizable and non-bailable criminal offenses punishable by up to 7 years rigorous imprisonment. Executive Magistrates are empowered to conduct summary proceedings and order immediate eviction and restitution of possession.',
      aBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী অন্যের জমি জবরদখল, জাল দলিল তৈরি ও জমিতে অনধিকার প্রবেশ জামিন-অযোগ্য ফৌজদারি অপরাধ, যার সর্বোচ্চ শাস্তি ৭ বছরের সশ্রম কারাদণ্ড। ভুক্তভোগী নির্বাহী ম্যাজিস্ট্রেটের নিকট আবেদন করলে সংক্ষিপ্ত বিচারিক প্রক্রিয়ায় দখলদারকে তাৎক্ষণিক উচ্ছেদ করে প্রকৃত মালিকের দখল পুনর্বহাল করা সম্ভব।'
    },
    {
      q: 'Can a citizen verify an advocate’s credentials before hiring them in Bangladesh?',
      qBn: 'বাংলাদেশে মামলা দেওয়ার পূর্বে আইনজীবীর সনদ ও বার কাউন্সিল নিবন্ধন কীভাবে যাচাই করা যায়?',
      a: 'Yes. Every practicing lawyer in Bangladesh must be enrolled with the Bangladesh Bar Council and hold a unique Bar Council Roll Number with admission to a recognized Bar Association (such as the Supreme Court Bar Association or District Bar). On Law_BD, all listed advocates display verified Bar Council credentials, court admissions, and authentic chamber locations.',
      aBn: 'হ্যাঁ। বাংলাদেশে আইন পেশা পরিচালনার জন্য প্রত্যেক আইনজীবীকে বাংলাদেশ বার কাউন্সিলের সনদপ্রাপ্ত এবং নির্দিষ্ট বার অ্যাসোসিয়েশনের (যেমন সুপ্রিম কোর্ট বার বা ঢাকা বার) নিবন্ধিত সদস্য হতে হয়। ল_বিডি প্ল্যাটফর্মে সকল আইনজীবীর বার কাউন্সিল রোল নম্বর, হাইকোর্ট/জেলা আদালত এনরোলমেন্ট ও চেম্বার তথ্য যাচাইকৃতভাবে প্রদর্শিত হয়।'
    }
  ];

  const getFilteredCategories = () => {
    if (activeCategoryTab === 'civil') {
      return ALL_30_LEGAL_CATEGORIES.filter(c => ['property-land', 'civil', 'tort-negligence', 'consumer', 'environmental', 'admiralty-maritime'].includes(c.id));
    }
    if (activeCategoryTab === 'criminal') {
      return ALL_30_LEGAL_CATEGORIES.filter(c => ['criminal', 'constitutional', 'anti-corruption', 'cybercrime-it', 'human-rights'].includes(c.id));
    }
    if (activeCategoryTab === 'family') {
      return ALL_30_LEGAL_CATEGORIES.filter(c => ['family', 'marriage-divorce', 'women-child', 'education', 'health-medical'].includes(c.id));
    }
    if (activeCategoryTab === 'commercial') {
      return ALL_30_LEGAL_CATEGORIES.filter(c => ['banking-finance', 'company-corporate', 'commercial-contract', 'taxation', 'insurance', 'labour', 'intellectual-property'].includes(c.id));
    }
    return ALL_30_LEGAL_CATEGORIES;
  };

  const displayedCategories = getFilteredCategories();

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800">

      {/* =========================================================================
          STAGE 1: AUTHORITATIVE HERO & DISCOVERY GATEWAY
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bdDark-950 via-bdDark-900 to-bdGreen-950 text-white pt-12 pb-20 border-b border-emerald-950">

        {/* Subtle decorative glow accents mimicking the national flag colors */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-bdRed-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left 7 Columns: Purpose, Universal Search & Sequential Actions */}
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
                  <>Demystifying Bangladesh Laws. <br /><span className="text-emerald-400">Connecting Citizens</span> <span className="text-bdRed-400">With Verified Advocates.</span></>
                )}
              </h1>

              {/* Plain-Language Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {lang === 'bn'
                  ? 'বাংলাদেশের সকল সরকারি আইন ও অধ্যাদেশ সহজ বাংলায় অনুসন্ধান করুন, দণ্ড ও শাস্তির বিধান জানুন, এলাকা অনুযায়ী সকল আদালতের অধিক্ষেত্র দেখুন এবং বার কাউন্সিলের সনদপ্রাপ্ত বিজ্ঞ আইনজীবীদের চেম্বার ও ভিডিও পরামর্শ বুক করুন।'
                  : 'Access comprehensive Bangladesh statutory laws in plain language, inspect mandatory penalties, navigate courts across all 8 divisions, and schedule chamber or video consultations seamlessly.'}
              </p>





              {/* Universal Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border-2 border-emerald-500/40 focus-within:border-emerald-400 transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'bn' ? 'আইনের নাম, ধারা বা বিষয় লিখুন (যেমন: জমি দখল, ১৩৮ ধারা, জামিন)...' : 'Search statutes, sections, or keywords (e.g., Land Crime Act, NI Act 138, Bail)...'}
                    className="w-full px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    <span>{lang === 'bn' ? 'অনুসন্ধান' : 'Search'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular Statutory Search Pills */}
              <div className="space-y-2 pt-1">
                <span className="text-xs text-slate-400 font-semibold tracking-wide block">
                  {lang === 'bn' ? 'জনপ্রিয় অনুসন্ধান বিষয়সমূহ:' : 'Frequent Statutory Lookups:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleSearches.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => navigate(`/laws?q=${encodeURIComponent(item.query)}`)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-200 border border-white/10 transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sequential Action Buttons (Clean & Logical Order) */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  to="/laws"
                  className="px-5 py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border border-emerald-600/40"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'bn' ? 'আইন লাইব্রেরি ব্রাউজ করুন' : 'Browse Law Library'}</span>
                </Link>

                <Link
                  to="/lawyers"
                  className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/20 shadow-sm"
                >
                  <Scale className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'bn' ? 'যাচাইকৃত আইনজীবী খুঁজুন' : 'Find Verified Advocates'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/15 shadow-sm"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? '৩০টি আইনি অধিক্ষেত্র (১-৩০)' : '30 Jurisdictions Index'}</span>
                </button>
              </div>

            </div>

            {/* Right 5 Columns: Dignified Lady Justice Visual Landmark */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-bdDark-950">

                {/* Glow Accents */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none z-10"></div>

                <div className="relative h-[460px] sm:h-[500px] w-full overflow-hidden">
                  <img
                    src={ladyJusticeImg}
                    alt="Lady Justice - Symbol of Bangladesh Legal System & Constitutional Justice"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bdDark-950 via-bdDark-950/40 to-black/20 pointer-events-none"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bdDark-950/85 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-bdRed-500 animate-ping"></span>
                      <span>{lang === 'bn' ? 'আইনের শাসন ও নিরপেক্ষ বিচার' : 'Rule of Law & Justice'}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bdDark-950/85 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow-lg">
                      <Scale className="w-3.5 h-3.5 text-amber-300" />
                      <span>30 Jurisdictions</span>
                    </div>
                  </div>

                  {/* Bottom Constitutional Standard Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-bdDark-950/90 backdrop-blur-md border border-emerald-500/30 text-white shadow-2xl z-20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {lang === 'bn' ? 'সংবিধানের অনুচ্ছেদ ২৭' : 'Article 27 · Constitution of Bangladesh'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Supreme Court BD</span>
                    </div>

                    <p className="font-serif italic text-xs sm:text-[13px] text-emerald-100 leading-snug">
                      {lang === 'bn'
                        ? '“সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।”'
                        : '“All citizens are equal before law and are entitled to equal protection of law.”'}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Bar Council Credential Verified</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="text-amber-300 hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors shrink-0"
                      >
                        <span>View (1–30)</span>
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

      {/* =========================================================================
          STAGE 2: THE SEQUENTIAL 3-STEP LEGAL WORKFLOW (HOW IT WORKS)
          ========================================================================= */}
      <section className="bg-white py-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-900 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-bdGreen-800" />
              <span>{lang === 'bn' ? 'আইনি সহায়তা পরিক্রমা' : 'Clear 3-Step Guided Workflow'}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              {lang === 'bn' ? 'কিভাবে কাজ করে ল_বিডি?' : 'How Law_BD Demystifies Justice'}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {lang === 'bn'
                ? 'আইন বোঝা থেকে শুরু করে বিজ্ঞ আইনজীবীর চেম্বার পরামর্শ পর্যন্ত প্রতিটি পদক্ষেপ স্বচ্ছ ও ক্রমানুসারে সাজানো।'
                : 'A transparent, step-by-step sequential workflow designed to guide citizens from statutory discovery to verified advocate consultation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            {/* Step 1 */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold w-10 h-10 rounded-2xl bg-bdGreen-800 text-white flex items-center justify-center shadow-xs">
                    01
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-bdGreen-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Step 1 · Explore
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {lang === 'bn' ? 'আইন ও ধারার সহজ ব্যাখ্যা জানুন' : 'Discover Statutory Laws'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'দণ্ডবিধি, ফৌজদারি কার্যবিধি ও দেওয়ানি আইনসহ ৩০টি অধিক্ষেত্রে প্রযোজ্য ধারা, সর্বোচ্চ শাস্তির মেয়াদ, জামিনযোগ্যতা ও প্রমাণাদি সহজ ভাষায় পড়ুন।'
                    : 'Search 30 legal jurisdictions. Review plain-language summaries in Bengali and English, statutory prison terms, fines, and procedural timelines.'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/laws"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900"
                >
                  <span>{lang === 'bn' ? 'আইন লাইব্রেরিতে যান' : 'Browse Statutes Library'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold w-10 h-10 rounded-2xl bg-bdGreen-800 text-white flex items-center justify-center shadow-xs">
                    02
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-bdGreen-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Step 2 · Courts
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {lang === 'bn' ? 'আদালত ও বিচারিক এলাকা খুঁজুন' : 'Explore Bangladesh Courts'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'সুপ্রিম কোর্ট (আপিল ও হাইকোর্ট বিভাগ), ৮টি প্রশাসনিক বিভাগের জেলা ও দায়রা জজ আদালত এবং বিশেষ ট্রাইব্যুনালের অবস্থান ও মামলা পরিচালনার তথ্য জানুন।'
                    : 'Locate courts by area: Supreme Court, 64 District Courts, CMM/CJM magistracy, and specialized tribunals (Cyber, Family, Labour, Artha Rin).'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/courts"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900"
                >
                  <span>{lang === 'bn' ? 'আদালত ডিরেক্টরি দেখুন' : 'Explore Courts Directory'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold w-10 h-10 rounded-2xl bg-bdRed-500 text-white flex items-center justify-center shadow-xs">
                    03
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-bdRed-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    Step 3 · Consult
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {lang === 'bn' ? 'পরামর্শ বুকিং ও ডিজিটাল পাস পান' : 'Book Consultation & Pass'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'ভিডিও কনফারেন্সিং বা সরাসরি চেম্বার সাক্ষাতের জন্য সুবিধাজনক স্লট নির্বাচন করুন এবং কিউআর কোডযুক্ত ডিজিটাল অ্যাপয়েন্টমেন্ট পাস সংগ্রহ করুন।'
                    : 'Schedule In-person Chamber Visits or Online Video Consultations. Receive verified digital appointment passes with unique reference tokens.'}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link
                  to="/lawyers"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-bdRed-600 hover:text-bdRed-700"
                >
                  <span>{lang === 'bn' ? 'আইনজীবী তালিকা দেখুন' : 'Explore Advocate Schedule'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 3: SEQUENTIAL 30 JURISDICTIONS EXPLORER (NUMBERED 01 TO 30)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 text-bdGreen-800" />
              <span>{lang === 'bn' ? 'ধারাবাহিক আইনি অধিক্ষেত্র তালিকা (০১-৩০)' : 'Sequential Jurisdictions Explorer (01–30)'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              {lang === 'bn' ? 'বাংলাদেশের ৩০টি আইনি অধিক্ষেত্র' : 'All 30 Legal Jurisdictions of Bangladesh'}
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'সংবিধান থেকে শুরু করে ভূমি, ফৌজদারি, দেওয়ানি ও পারিবারিক আইন পর্যন্ত প্রতিটি অধিক্ষেত্র ক্রমানুসারে সাজানো।'
                : 'Browse every statutory discipline in sequential numerical order. Explore statutory provisions, check limitation periods, and find specialist advocates.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-4 py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Layers className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সাইডবারে ক্রমানুসারে দেখুন' : 'Open Sequential Drawer'}</span>
            </button>
          </div>
        </div>





        {/* Category Group Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          {[
            { id: 'all', label: lang === 'bn' ? 'সকল ৩০টি অধিক্ষেত্র (১-৩০)' : 'All 30 Jurisdictions' },
            { id: 'civil', label: lang === 'bn' ? 'দেওয়ানি ও ভূমি আইন' : 'Civil & Property' },
            { id: 'criminal', label: lang === 'bn' ? 'ফৌজদারি ও সাংবিধানিক' : 'Criminal & Public' },
            { id: 'family', label: lang === 'bn' ? 'পারিবারিক ও বিবাহ' : 'Family & Personal' },
            { id: 'commercial', label: lang === 'bn' ? 'বাণিজ্যিক, ব্যাংক ও শ্রম' : 'Commercial & Finance' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeCategoryTab === tab.id
                ? 'bg-bdGreen-800 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 30 Sequential Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group"
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
                    {cat.subcategories.length} Topics
                  </span>
                </div>



                {/* Primary Statute Citation */}
                <p className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4 line-clamp-1">
                  <strong>Statute:</strong> {cat.primaryAct}
                </p>



                {/* Subcategories & Specific Incident Areas */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    {lang === 'bn' ? 'গুরুত্বপূর্ণ উপ-শাখা ও বিষয়সমূহ:' : 'Key Subcategories & Provisions:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 5).map((sub, sIdx) => {
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




              {/* Card Footer Actions (Pure Law & Lawyer links, No Victim panel) */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  to={`/lawyers?specialty=${encodeURIComponent(cat.name)}`}
                  className="text-slate-600 hover:text-bdGreen-900 font-bold flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 text-bdGreen-700" />
                  <span>{lang === 'bn' ? 'আইনজীবী খুঁজুন' : 'Find Specialists'}</span>
                </Link>
                <Link
                  to={`/laws?category=${cat.id}`}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-bdGreen-800 hover:text-white text-bdGreen-900 rounded-xl font-bold transition-all flex items-center gap-1"
                >
                  <span>{lang === 'bn' ? 'আইন দেখুন' : 'Explore Laws'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>




      {/* =========================================================================
          STAGE 4: CRITICAL STATUTES & RECENTLY UPDATED ACTS
          ========================================================================= */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-100 text-bdGreen-800 text-xs font-bold uppercase mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সদ্য হালনাগাদকৃত আইন' : 'Recently Updated Statutes'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {lang === 'bn' ? 'গুরুত্বপূর্ণ আইন ও বিধিমালার সংকলন' : 'Critical Legislation & Landmark Acts'}
              </h2>
            </div>
            <Link
              to="/amendments"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900"
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
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
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

                    <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-slate-700 mb-4">
                      <strong className="text-bdRed-600 font-semibold block mb-0.5">
                        {lang === 'bn' ? 'দণ্ড ও শাস্তির বিধান:' : 'Statutory Penalties & Remedies:'}
                      </strong>
                      <span className="line-clamp-2">
                        {lang === 'bn' ? law.penalties_bn || law.penalties : law.penalties}
                      </span>
                    </div>
                  </div>



                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleLawBookmark(law.id)}
                      className={`font-semibold transition-colors ${isSaved ? 'text-bdRed-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                      {isSaved ? '★ Saved to Vault' : '☆ Save Law'}
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

      {/* =========================================================================
          STAGE 5: BANGLADESH COURTS DIRECTORY ACCORDING TO AREAS
          ========================================================================= */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-bdGreen-700" />
                <span>{lang === 'bn' ? 'আদালত ও বিচারিক অধিক্ষেত্র' : 'Bangladesh Judicial Directory'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                {lang === 'bn' ? 'এলাকা অনুযায়ী বাংলাদেশের সকল আদালত' : 'Bangladesh Courts Directory by Area'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
                {lang === 'bn'
                  ? 'সুপ্রিম কোর্ট, ৮টি প্রশাসনিক বিভাগের জেলা ও দায়রা জজ আদালত এবং সংবিধিবদ্ধ বিশেষ ট্রাইব্যুনালের বিচারিক এলাকা ও বিস্তারিত।'
                  : 'Browse Supreme Court, 64 District Courts, and specialized tribunals across all 8 administrative divisions.'}
              </p>
            </div>

            <Link
              to="/courts"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs shrink-0 self-start md:self-auto"
            >
              <span>{lang === 'bn' ? 'সকল আদালত ডিরেক্টরি দেখুন' : 'Explore All Courts (Full Directory)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {BANGLADESH_DIVISIONS.map((div) => {
              const isSelected = homeCourtDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setHomeCourtDivision(div.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${isSelected
                    ? 'bg-bdGreen-800 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                >
                  {lang === 'bn' ? div.bangla : div.name}
                </button>
              );
            })}
          </div>

          {/* Clean 4-Card Courts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_BANGLADESH_COURTS.filter((c) =>
              homeCourtDivision === 'all' ? true : c.divisionId === homeCourtDivision
            )
              .slice(0, 4)
              .map((court) => {
                const isApex = court.divisionId === 'apex';
                const isSpecial = court.divisionId === 'specialized';

                return (
                  <div
                    key={court.id}
                    className={`bg-slate-50/80 hover:bg-white rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${isApex
                      ? 'border-emerald-300 shadow-2xs hover:shadow-md'
                      : isSpecial
                        ? 'border-amber-200 shadow-2xs hover:shadow-md'
                        : 'border-slate-200/90 shadow-2xs hover:shadow-md'
                      }`}
                  >
                    <div className="space-y-3">

                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isApex
                              ? 'bg-emerald-100 text-bdGreen-900'
                              : isSpecial
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-white text-slate-700 border border-slate-200/70'
                              }`}
                          >
                            {lang === 'bn' ? court.divisionBn : court.division}
                          </span>
                          <span className="text-slate-400 text-xs">·</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {lang === 'bn' ? court.districtBn : court.district}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-bdGreen-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/40">
                          {lang === 'bn' ? court.levelBn : court.level}
                        </span>
                      </div>

                      {/* Court Name */}
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {court.name}
                        </h3>
                        <p className="text-xs text-bdGreen-900 font-semibold mt-0.5">
                          {court.nameBn}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-1.5 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-bdRed-500 shrink-0 mt-0.5" />
                        <span>{lang === 'bn' ? court.addressBn : court.address}</span>
                      </div>

                      {/* Jurisdiction */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {lang === 'bn' ? court.jurisdictionBn : court.jurisdiction}
                      </p>

                      {/* Case Types */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {court.caseTypes.slice(0, 3).map((type, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {court.phone}
                      </span>
                      <Link
                        to="/courts"
                        className="inline-flex items-center gap-1 text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900"
                      >
                        <span>{lang === 'bn' ? 'বিস্তারিত ও আদালত ডিরেক্টরি' : 'View Court Details'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                );
              })}
          </div>

          {/* Clean Bottom Note */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-bdGreen-800 shrink-0" />
              <p className="text-xs text-slate-700 font-medium">
                {lang === 'bn'
                  ? 'বাংলাদেশের ৬৪টি জেলার সকল জেলা জজ আদালত, চিফ জুডিশিয়াল ও চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতের সম্পূর্ণ তালিকা উপলব্ধ।'
                  : 'Complete directory covering all 64 District Courts, CMM/CJM magistracy, and specialized tribunals across Bangladesh.'}
              </p>
            </div>
            <Link
              to="/courts"
              className="text-xs font-bold text-bdGreen-900 hover:underline shrink-0"
            >
              {lang === 'bn' ? '৬৪টি জেলার সকল আদালত ব্রাউজ করুন →' : 'Browse All 64 Districts →'}
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 6: VERIFIED ADVOCATES DIRECTORY SHOWCASE
          ========================================================================= */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-bdGreen-700" />
                <span>{lang === 'bn' ? 'আদালত ও বিচারিক অধিক্ষেত্র' : 'Bangladesh Judicial Directory'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
                {lang === 'bn' ? 'এলাকা অনুযায়ী বাংলাদেশের সকল আদালত' : 'Bangladesh Courts Directory by Area'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
                {lang === 'bn'
                  ? 'সুপ্রিম কোর্ট, ৮টি প্রশাসনিক বিভাগের জেলা ও দায়রা জজ আদালত এবং সংবিধিবদ্ধ বিশেষ ট্রাইব্যুনালের বিচারিক এলাকা ও বিস্তারিত।'
                  : 'Browse Supreme Court, 64 District Courts, and specialized tribunals across all 8 administrative divisions.'}
              </p>
            </div>

            <Link
              to="/courts"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs shrink-0 self-start md:self-auto"
            >
              <span>{lang === 'bn' ? 'সকল আদালত ডিরেক্টরি দেখুন' : 'Explore All Courts (Full Directory)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {BANGLADESH_DIVISIONS.map((div) => {
              const isSelected = homeCourtDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setHomeCourtDivision(div.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${isSelected
                    ? 'bg-bdGreen-800 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                >
                  {lang === 'bn' ? div.bangla : div.name}
                </button>
              );
            })}
          </div>

          {/* Clean 4-Card Courts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_BANGLADESH_COURTS.filter((c) =>
              homeCourtDivision === 'all' ? true : c.divisionId === homeCourtDivision
            )
              .slice(0, 4)
              .map((court) => {
                const isApex = court.divisionId === 'apex';
                const isSpecial = court.divisionId === 'specialized';

                return (
                  <div
                    key={court.id}
                    className={`bg-slate-50/80 hover:bg-white rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${isApex
                      ? 'border-emerald-300 shadow-2xs hover:shadow-md'
                      : isSpecial
                        ? 'border-amber-200 shadow-2xs hover:shadow-md'
                        : 'border-slate-200/90 shadow-2xs hover:shadow-md'
                      }`}
                  >
                    <div className="space-y-3">

                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${isApex
                              ? 'bg-emerald-100 text-bdGreen-900'
                              : isSpecial
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-white text-slate-700 border border-slate-200/70'
                              }`}
                          >
                            {lang === 'bn' ? court.divisionBn : court.division}
                          </span>
                          <span className="text-slate-400 text-xs">·</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {lang === 'bn' ? court.districtBn : court.district}
                          </span>
                        </div>

                        <span className="text-[11px] font-bold text-bdGreen-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/40">
                          {lang === 'bn' ? court.levelBn : court.level}
                        </span>
                      </div>

                      {/* Court Name */}
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {court.name}
                        </h3>
                        <p className="text-xs text-bdGreen-900 font-semibold mt-0.5">
                          {court.nameBn}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-1.5 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-bdRed-500 shrink-0 mt-0.5" />
                        <span>{lang === 'bn' ? court.addressBn : court.address}</span>
                      </div>

                      {/* Jurisdiction */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {lang === 'bn' ? court.jurisdictionBn : court.jurisdiction}
                      </p>

                      {/* Case Types */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {court.caseTypes.slice(0, 3).map((type, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {court.phone}
                      </span>
                      <Link
                        to="/courts"
                        className="inline-flex items-center gap-1 text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900"
                      >
                        <span>{lang === 'bn' ? 'বিস্তারিত ও আদালত ডিরেক্টরি' : 'View Court Details'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                );
              })}
          </div>

          {/* Clean Bottom Note */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-bdGreen-800 shrink-0" />
              <p className="text-xs text-slate-700 font-medium">
                {lang === 'bn'
                  ? 'বাংলাদেশের ৬৪টি জেলার সকল জেলা জজ আদালত, চিফ জুডিশিয়াল ও চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতের সম্পূর্ণ তালিকা উপলব্ধ।'
                  : 'Complete directory covering all 64 District Courts, CMM/CJM magistracy, and specialized tribunals across Bangladesh.'}
              </p>
            </div>
            <Link
              to="/courts"
              className="text-xs font-bold text-bdGreen-900 hover:underline shrink-0"
            >
              {lang === 'bn' ? '৬৪টি জেলার সকল আদালত ব্রাউজ করুন →' : 'Browse All 64 Districts →'}
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 6: VERIFIED ADVOCATES DIRECTORY SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
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
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Link
              to="/lawyers"
              className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সকল আইনজীবী দেখুন' : 'Explore All Advocates'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between"
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
                          <span title="Verified Bangladesh Bar Council Registration">
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
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Chamber Fee:</span>
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

      {/* =========================================================================
          STAGE 6: ESSENTIAL CITIZEN LEGAL TOOLKIT (SEQUENTIAL SUITE)
          ========================================================================= */}
      <section className="bg-slate-50 py-16 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-900 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-bdGreen-800" />
              <span>{lang === 'bn' ? 'নাগরিক আইনি টুলকিট' : 'Citizen Legal Services'}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'bn' ? 'আইনি সেবা ও নাগরিক সহায়িকা' : 'Essential Legal Services Suite'}
            </h2>
            <p className="text-sm text-slate-500">
              {lang === 'bn'
                ? 'আইনি নোটিশ ড্রাফট, দ্বিভাষিক অভিধান, এআই পরামর্শক এবং সরকারি জরুরি হটলাইন।'
                : 'Standardized statutory drafting templates, bilingual legal dictionary, grounded AI assistance, and 24/7 hotlines.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Toolkit 1: Templates */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-bdGreen-800 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {lang === 'bn' ? 'আইনি নোটিশ ও জিডি ফরম্যাট' : 'Legal Notice Templates'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'হস্তান্তরিত দলিল আইনের ১৩৮ ধারার নোটিশ, থানার জিডি ও শ্রম আদালতের লিখিত অভিযোগের মানসম্মত ফরম্যাট।'
                    : 'Download statutory templates for Section 138 NI Act notices, Thana GD formats, and Section 33 Labour grievances.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link to="/templates" className="text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900 flex items-center gap-1">
                  <span>{lang === 'bn' ? 'ফরম্যাট দেখুন' : 'Explore Templates'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Toolkit 2: Bilingual Dictionary */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {lang === 'bn' ? 'দ্বিভাষিক আইনি পরিভাষা' : 'Bilingual Legal Terms'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'এজাহার, সাধারণ ডায়েরি, দেনমোহর, খতিয়ান, নামজারি ও জামিনসংক্রান্ত জটিল আইনি শব্দের সহজ অর্থ।'
                    : 'Searchable plain-language legal definitions for FIR, GD, Mutation, Khatian, Injunction, and Denmohur.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link to="/awareness" className="text-xs font-bold text-bdGreen-800 hover:text-bdGreen-900 flex items-center gap-1">
                  <span>{lang === 'bn' ? 'অভিধান ব্রাউজ করুন' : 'Browse Dictionary'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Toolkit 3: AI Legal Assistant */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {lang === 'bn' ? 'এআই লিগ্যাল অ্যাসিস্ট্যান্ট' : 'Statute Grounded AI'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'বাংলাদেশের সরকারি আইনের ভিত্তিতে তাৎক্ষণিক আইনি সমাধান, প্রযোজ্য ধারা ও করণীয় দিকনির্দেশনা।'
                    : 'Conversational legal guidance strictly grounded in verified Bangladesh Gazette statutes and procedure rules.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link to="/ai-assistant" className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1">
                  <span>{lang === 'bn' ? 'পরামর্শ শুরু করুন' : 'Start AI Chat'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Toolkit 4: Emergency Helplines */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-bdRed-600 flex items-center justify-center mb-4">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">
                  {lang === 'bn' ? '২৪/৭ জরুরি হেল্পলাইন' : '24/7 National Hotlines'}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'সরকারি লিগ্যাল এইড ১৬৪৩০, জরুরি পুলিশ ৯৯৯, নারী ও শিশু ১০৯ এবং সিআইডি সাইবার পুলিশ হটলাইন।'
                    : 'Instant click-to-call directory for Ministry of Law Legal Aid (16430), Police (999), and Cyber Support.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link to="/emergency" className="text-xs font-bold text-bdRed-600 hover:text-bdRed-700 flex items-center gap-1">
                  <span>{lang === 'bn' ? 'হটলাইন ডায়াল করুন' : 'View All Hotlines'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 7: FREQUENTLY ASKED PRACTICAL LEGAL QUESTIONS
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
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
              className="border border-slate-200 rounded-3xl bg-white overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-800 hover:text-bdGreen-800 flex items-center justify-between gap-4"
              >
                <span>{lang === 'bn' ? faq.qBn : faq.q}</span>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-90 text-bdGreen-800' : ''
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
