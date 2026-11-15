import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  PhoneCall,
  HeartHandshake,
  Laptop,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ALL_30_LEGAL_CATEGORIES } from '../data/categoriesData';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function VictimSupportPage() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [incidentText, setIncidentText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('property-land');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [urgencyStage, setUrgencyStage] = useState('Recent / Emergency');
  const [desiredOutcome, setDesiredOutcome] = useState('Protection & Legal Action');
  const [loading, setLoading] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  useEffect(() => {
    if (location.state?.prefilledIncident) {
      setIncidentText(location.state.prefilledIncident);
      handleTriage(location.state.prefilledIncident);
    }
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.state, location.search]);

  const activeCategoryObj = ALL_30_LEGAL_CATEGORIES.find(c => c.id === selectedCategory) || ALL_30_LEGAL_CATEGORIES[0];

  const handleTriage = async (customText) => {
    const textToAnalyze = customText || incidentText || (selectedSubcategory ? `${activeCategoryObj.name}: ${selectedSubcategory}` : '');
    if (!textToAnalyze.trim()) return;

    setLoading(true);
    try {
      const res = await api.triageIncident({
        incidentText: textToAnalyze,
        issueType: `${activeCategoryObj.name} - ${selectedSubcategory}`,
        urgencyStage,
        desiredOutcome
      });
      if (res.success) {
        setTriageResult(res);
      }
    } catch (err) {
      console.error('Triage error:', err);
    } finally {
      setLoading(false);
    }
  };

  const sampleIncidents = [
    { label: 'জমি দখল ও জাল দলিল', text: 'আমার পৈত্রিক জমি একদল প্রভাবশালী লোক জোর করে দখল করে নিয়েছে এবং জাল বায়া দলিল তৈরি করেছে।' },
    { label: 'Cyber Blackmail / ছবি ভাইরাল', text: 'ফেসবুকে আমার ব্যক্তিগত ছবি দিয়ে এক ব্যক্তি ব্ল্যাকমেইল করছে এবং বিকাশে ৫০,০০০ টাকা মুক্তিপণ দাবি করছে।' },
    { label: 'চেক বাউন্স (Section 138)', text: 'ব্যবসায়িক দেনা বাবদ ৫ লাখ টাকার ব্যাংক চেক দিয়েছিলো, ব্যাংক থেকে অপর্যাপ্ত তহবিলের কারণে চেক বাউন্স হয়েছে।' },
    { label: 'চিকিৎসা অবহেলা (Medical Malpractice)', text: 'ভুল চিকিৎসার কারণে রোগীর মারাত্মক অঙ্গহানি হয়েছে। ডাক্তারের চরম অবহেলার বিরুদ্ধে ক্ষতিপূরণ দাবি করতে চাই।' },
    { label: 'যৌতুক ও পারিবারিক নির্যাতন', text: 'আমার স্বামী ও শ্বশুরবাড়ির লোকজন যৌতুকের জন্য শারীরিক ও মানসিক নির্যাতন করে বাড়ি থেকে বের করে দিয়েছে।' },
    { label: 'বেআইনি চাকরি বরখাস্ত ও বেতন বকেয়া', text: 'মালিকপক্ষ কোনো নোটিশ ছাড়াই হঠাৎ চাকরি থেকে বরখাস্ত করেছে এবং গত ৩ মাসের বেতন ও গ্র্যাচুইটি আটকে রেখেছে।' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-bdRed-600 text-xs font-bold uppercase mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>{lang === 'bn' ? 'স্মার্ট ভুক্তভোগী আইনি সহায়তা ও অনুসন্ধান' : 'Victim Rights & Legal Incident Triage'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {lang === 'bn' ? 'ঘটনা খুলে বলুন, আইন আমরা খুঁজে দিচ্ছি' : 'Describe What Happened in Your Own Words'}
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {lang === 'bn'
              ? 'আইনের ধারা বা কোর্টের নাম জানা জরুরি নয়। বাংলায় বা ইংরেজিতে যা ঘটেছে তা লিখুন। আমাদের ইঞ্জিন ৩০টি বিশেষায়িত অধিক্ষেত্র থেকে তাৎক্ষণিক প্রযোজ্য আইন, জরুরি হেল্পলাইন এবং বিশেষজ্ঞ আইনজীবী চিহ্নিত করবে।'
              : 'You do not need legal training to seek justice. Describe any incident or harassment in ordinary language to receive statutory provisions, immediate steps, and advocate recommendations across all 30 legal domains.'}
          </p>
        </div>

        {/* Input Box Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10 space-y-6">
          
          {/* Main 30 Categories & Subcategories Selector */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-bdGreen-800" />
                <span>Select Legal Jurisdiction (1 of 30) & Incident Type:</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-bdGreen-800">
                #{String(activeCategoryObj.seq).padStart(2, '0')} of 30
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Main Category (30 Jurisdictions):</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-bdGreen-800"
                >
                  {ALL_30_LEGAL_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {String(cat.seq).padStart(2, '0')}. {cat.name} ({cat.bangla})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Specific Subcategory / Incident:</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => {
                    setSelectedSubcategory(e.target.value);
                    if (!incidentText) setIncidentText(`Incident concerning ${e.target.value} under ${activeCategoryObj.name}.`);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-bdGreen-800"
                >
                  <option value="">Choose specific incident / issue...</option>
                  {activeCategoryObj.subcategories.map((sub, sIdx) => {
                    const bnSub = activeCategoryObj.banglaSubcategories ? activeCategoryObj.banglaSubcategories[sIdx] : '';
                    return (
                      <option key={sIdx} value={sub}>
                        {sub} {bnSub ? `(${bnSub})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Quick incident pills for current category */}
            <div className="pt-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Common issues in this area:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeCategoryObj.subcategories.map((sub, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      setSelectedSubcategory(sub);
                      setIncidentText(prev => prev ? `${prev} Issue: ${sub}.` : `Seeking legal assistance regarding ${sub} under ${activeCategoryObj.name}.`);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      selectedSubcategory === sub
                        ? 'bg-bdGreen-800 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              {t('triageIncidentLabel')}
            </label>
            <textarea
              rows={4}
              value={incidentText}
              onChange={(e) => setIncidentText(e.target.value)}
              placeholder={t('triagePlaceholder')}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 text-sm sm:text-base leading-relaxed"
            />
          </div>

          {/* Quick Click Samples */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">
              {lang === 'bn' ? 'সাধারণ অভিযোগের নমুনা (ক্লিক করুন):' : 'Click a common incident example:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleIncidents.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIncidentText(s.text);
                    handleTriage(s.text);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-bdGreen-800 text-xs text-slate-700 font-medium transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filter Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Incident Urgency / Stage:</label>
              <select
                value={urgencyStage}
                onChange={(e) => setUrgencyStage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:border-bdGreen-800"
              >
                <option value="Recent / Emergency">Recent / Emergency / Physical Threat</option>
                <option value="Received Legal Notice">Received Legal Notice / Warrant</option>
                <option value="Ongoing Longstanding Dispute">Ongoing Dispute</option>
                <option value="Preventive Advice">Preventive / Seeking Legal Advice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Desired Legal Outcome:</label>
              <select
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:outline-none focus:border-bdGreen-800"
              >
                <option value="Protection & Legal Action">Immediate Protection & File Case</option>
                <option value="Bail / Prevent Arrest">Bail / Prevent Unlawful Arrest</option>
                <option value="Recover Money or Property">Recover Money / Evict Trespasser</option>
                <option value="Legal Notice Service">Serve Advocate Legal Notice</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleTriage()}
            disabled={loading || (!incidentText.trim() && !selectedSubcategory)}
            className="w-full py-4 bg-bdGreen-800 hover:bg-bdGreen-700 disabled:opacity-50 text-white rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Cross-referencing 30 Bangladesh Statutory Domains...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{t('triageAnalyzeBtn')}</span>
              </>
            )}
          </button>
        </div>

        {/* Triage Results Display */}
        {triageResult && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Primary Severity Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-bdDark-900 text-white border border-emerald-950 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-bdRed-500 text-white text-xs font-bold uppercase rounded-full">
                    {triageResult.analysis.urgency}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-emerald-300 text-xs font-bold uppercase rounded-full">
                    Category: {triageResult.analysis.category}
                  </span>
                </div>
                <span className="text-xs text-slate-400">Database Grounded Evaluation</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                {triageResult.analysis.primaryStatute}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {triageResult.analysis.severityAlert}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-emerald-200">
                  Applicable Law: <strong>{triageResult.analysis.lawTitle}</strong>
                </p>
                <Link
                  to={`/laws/${triageResult.analysis.lawId}`}
                  className="px-4 py-2 bg-bdGreen-700 hover:bg-bdGreen-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Law & Sections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Plain Explanations: English & Bangla */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-bold text-sm text-bdGreen-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-bdGreen-700" />
                  <span>Plain English Analysis</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {triageResult.analysis.simpleSummary}
                </p>
              </div>

              <div className="bg-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs">
                <h3 className="font-bold text-sm text-bdGreen-900 mb-2 flex items-center gap-2 font-bangla">
                  <FileText className="w-4 h-4 text-bdGreen-700" />
                  <span>সহজ বাংলায় আইনি অধিকার</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bangla">
                  {triageResult.analysis.simpleSummaryBn || triageResult.analysis.simpleSummary}
                </p>
              </div>
            </div>

            {/* Statutory Penalties */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/70 border border-rose-200 text-slate-800">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-bdRed-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-bold text-base text-bdRed-700">
                    {lang === 'bn' ? 'প্রযোজ্য সর্বোচ্চ শাস্তি ও প্রতিকার:' : 'Statutory Punishment & Remedies:'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                    {lang === 'bn' ? triageResult.analysis.penaltiesBn || triageResult.analysis.penalties : triageResult.analysis.penalties}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            {triageResult.analysis.procedureSteps && triageResult.analysis.procedureSteps.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-bdGreen-800" />
                  <span>Recommended Step-by-Step Procedural Timeline</span>
                </h3>
                <div className="space-y-4">
                  {triageResult.analysis.procedureSteps.map((st, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="w-8 h-8 rounded-xl bg-bdGreen-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {st.step || i + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{st.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Do's and Don'ts & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-serif font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-bdRed-500" />
                  <span>Immediate Do's and Don'ts</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {triageResult.analysis.immediateActions?.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bdRed-500 font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-serif font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-bdGreen-700" />
                  <span>Required Documents to Assemble</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {triageResult.analysis.requiredDocuments?.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bdGreen-700 font-bold">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Advocates */}
            {triageResult.recommendedLawyers && triageResult.recommendedLawyers.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-bdGreen-800" />
                  <span>Recommended Verified Bar Council Advocates</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {triageResult.recommendedLawyers.map((lawyer) => (
                    <div
                      key={lawyer.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-bdGreen-800 text-white font-bold flex items-center justify-center shrink-0">
                          {lawyer.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{lawyer.name}</h4>
                          <p className="text-[11px] text-slate-500">{lawyer.courtLevel}</p>
                          <span className="text-xs font-bold text-bdGreen-900 mt-1 inline-block">{lawyer.feeDisplay}</span>
                        </div>
                      </div>
                      <Link
                        to={`/booking/${lawyer.id}`}
                        className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0"
                      >
                        Book Slot
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Helplines Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-bdRed-400">Need Immediate Police or Medical Rescue?</h4>
                <p className="text-xs text-slate-400">Call Toll-free National Emergency 999 or Government Legal Aid 16430</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:999"
                  className="px-4 py-2 bg-bdRed-600 hover:bg-bdRed-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Call Police 999
                </a>
                <a
                  href="tel:16430"
                  className="px-4 py-2 bg-bdGreen-700 hover:bg-bdGreen-600 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Legal Aid 16430
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
