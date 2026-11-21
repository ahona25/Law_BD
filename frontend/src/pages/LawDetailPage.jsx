import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Scale,
  Bookmark,
  Share2,
  Printer,
  ExternalLink,
  ShieldAlert,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowLeft,
  ChevronRight,
  User,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { api } from '../services/api';

export default function LawDetailPage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { savedLaws, toggleLawBookmark } = useBookmarks();

  const [law, setLaw] = useState(null);
  const [matchedLawyers, setMatchedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getLawById(id).then(res => {
      if (res.success) {
        setLaw(res.law);
        if (res.law.specialist_match) {
          api.getLawyers({ specialty: res.law.specialist_match }).then(lawyerRes => {
            if (lawyerRes.success) setMatchedLawyers(lawyerRes.lawyers.slice(0, 2));
          }).catch(() => { });
        }
      }
    }).catch(err => {
      console.error('Failed to load law detail:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-bdGreen-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-600">Loading statutory provisions from repository...</p>
        </div>
      </div>
    );
  }

  if (!law) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Law Provision Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">The statutory provision requested does not exist or has been removed.</p>
          <Link to="/laws" className="px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-semibold">
            Return to Law Library
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedLaws.includes(law.id);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <div className="no-print mb-6">
          <Link
            to="/laws"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bdGreen-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'আইন লাইব্রেরিতে ফিরে যান' : 'Back to Law Library'}</span>
          </Link>
        </div>

        {/* Printable Area Wrapper */}
        <div className="printable-area space-y-8">

          {/* Main Title Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-emerald-100 text-bdGreen-900 border border-emerald-300">
                  {law.category_label || law.category}
                </span>
                <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full ${law.status === 'current'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                  Status: {law.status || 'Current Law'}
                </span>
              </div>

              {/* Action Buttons (Non-printable) */}
              <div className="no-print flex items-center gap-2">
                <button
                  onClick={() => toggleLawBookmark(law.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${isSaved
                    ? 'bg-rose-50 border-rose-200 text-bdRed-600'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaved ? 'Saved' : 'Save Law'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied Link!' : 'Share'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Law</span>
                </button>
              </div>
            </div>

            {/* Official Titles */}
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {law.title}
            </h1>
            {law.bangla_title && (
              <h2 className="text-lg sm:text-2xl font-bold text-bdGreen-800 mt-2 font-bangla">
                {law.bangla_title}
              </h2>
            )}



            {/* Citations metadata */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Act / Enactment:</span>
                <span className="font-semibold text-slate-800">{law.act_no_year || 'Official Gazette'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Verification:</span>
                <span className="font-semibold text-slate-800">{law.last_amended || '2026 Verified'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Official Reference:</span>
                {law.official_source_url ? (
                  <a
                    href={law.official_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-bdGreen-800 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Bangladesh Code (Laws)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-semibold text-slate-800">Ministry of Law Gazette</span>
                )}
              </div>
            </div>
          </div>

          {/* Statutory Penalties Alert Box */}
          <div className="bg-rose-50/70 border-2 border-bdRed-500/20 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-bdRed-500 text-white shrink-0 mt-1 shadow-xs">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-bdRed-700">
                  {lang === 'bn' ? 'আইনগত দণ্ড ও শাস্তির বিধান (Statutory Penalties)' : 'Prescribed Statutory Penalties & Legal Remedies'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-1">
                  {lang === 'bn' ? law.penalties_bn || law.penalties : law.penalties}
                </p>
              </div>
            </div>
          </div>



          {/* Side-by-Side Plain Explanations: English & Bangla */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-bdGreen-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-bdGreen-700" />
                <span>Plain English Legal Explanation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {law.simple_summary}
              </p>
            </div>

            <div className="bg-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-bdGreen-900 font-bold text-sm font-bangla">
                <FileText className="w-4 h-4 text-bdGreen-700" />
                <span>আইনের সহজ বাংলা ব্যাখ্যা</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bangla">
                {law.simple_summary_bn || law.simple_summary}
              </p>
            </div>
          </div>

          {/* Key Provisions & Sections */}
          {law.key_provisions && law.key_provisions.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-bdGreen-800" />
                <span>Key Statutory Provisions & Clauses</span>
              </h3>
              <ul className="space-y-3">
                {law.key_provisions.map((prov, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-bdGreen-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{prov}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Procedural Timeline */}
          {law.procedure_steps && law.procedure_steps.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-bdGreen-800" />
                <span>Step-by-Step Legal Procedure Flow</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                From police reporting to Magistrate hearing, evidence submission, and final court decree.
              </p>

              <div className="space-y-4">
                {law.procedure_steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
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

          {/* Required Documents & Immediate Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-bdGreen-700" />
                <span>Required Documents Checklist</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {law.required_documents?.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-bdGreen-700 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immediate Actions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-bdRed-500" />
                <span>Immediate Do's & Don'ts</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {law.immediate_actions?.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-bdRed-500 font-bold">!</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Matched Verified Advocates for this Law (Non-printable) */}
          {matchedLawyers.length > 0 && (
            <div className="no-print bg-emerald-950 text-white rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Recommended Legal Counsel</span>
                  <h3 className="font-serif text-xl font-bold mt-1">Specialized Advocates for this Law</h3>
                </div>
                <Link
                  to={`/lawyers?specialty=${encodeURIComponent(law.specialist_match || '')}`}
                  className="text-xs font-semibold text-emerald-300 hover:text-white inline-flex items-center gap-1"
                >
                  <span>View All {law.specialist_match} Advocates</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="p-5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-bdGreen-700 text-white font-bold flex items-center justify-center shrink-0">
                        {lawyer.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm flex items-center gap-1">
                          {lawyer.name}
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </h4>
                        <p className="text-[11px] text-slate-300 line-clamp-1">{lawyer.courtLevel}</p>
                        <p className="text-[11px] font-bold text-emerald-300 mt-1">{lawyer.feeDisplay}</p>
                      </div>
                    </div>
                    <Link
                      to={`/booking/${lawyer.id}`}
                      className="px-4 py-2 bg-bdRed-500 hover:bg-bdRed-600 text-white text-xs font-bold rounded-xl shrink-0 shadow-sm transition-colors"
                    >
                      Book Slot
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
