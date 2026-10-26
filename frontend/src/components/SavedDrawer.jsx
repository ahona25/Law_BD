import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Bookmark, Trash2, ArrowRight, Scale, User, ShieldCheck } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function SavedDrawer() {
  const { savedLaws, savedLawyers, isSavedDrawerOpen, setIsSavedDrawerOpen, toggleLawBookmark, toggleLawyerBookmark } = useBookmarks();
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('laws');
  const [lawsData, setLawsData] = useState([]);
  const [lawyersData, setLawyersData] = useState([]);

  useEffect(() => {
    if (isSavedDrawerOpen) {
      // Load laws and lawyers to match IDs
      api.getLaws().then(res => {
        if (res.success) setLawsData(res.laws);
      }).catch(() => { });

      api.getLawyers().then(res => {
        if (res.success) setLawyersData(res.lawyers);
      }).catch(() => { });
    }
  }, [isSavedDrawerOpen]);

  if (!isSavedDrawerOpen) return null;

  const matchedLaws = lawsData.filter(l => savedLaws.includes(l.id));
  const matchedLawyers = lawyersData.filter(l => savedLawyers.includes(Number(l.id)));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSavedDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-6 bg-bdGreen-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-lg">
                <Bookmark className="w-5 h-5 text-bdRed-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">
                  {lang === 'bn' ? 'সংরক্ষিত আইনি বিষয় ও আইনজীবী' : 'Saved Laws & Advocates'}
                </h3>
                <p className="text-xs text-emerald-100">
                  {savedLaws.length} {lang === 'bn' ? 'টি আইন' : 'Laws'} · {savedLawyers.length} {lang === 'bn' ? 'জন আইনজীবী' : 'Advocates'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSavedDrawerOpen(false)}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveTab('laws')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${activeTab === 'laws'
                ? 'border-bdGreen-800 text-bdGreen-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <Scale className="w-4 h-4 text-bdGreen-700" />
              <span>{lang === 'bn' ? 'সংরক্ষিত আইন' : 'Saved Laws'} ({savedLaws.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('lawyers')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${activeTab === 'lawyers'
                ? 'border-bdGreen-800 text-bdGreen-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <User className="w-4 h-4 text-bdGreen-700" />
              <span>{lang === 'bn' ? 'সংরক্ষিত আইনজীবী' : 'Bookmarked Advocates'} ({savedLawyers.length})</span>
            </button>
          </div>



          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === 'laws' ? (
              matchedLaws.length > 0 ? (
                matchedLaws.map((law) => (
                  <div
                    key={law.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-bdGreen-800">
                          {law.category_label || law.category}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mt-1">
                          {lang === 'bn' ? law.bangla_title || law.title : law.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {lang === 'bn' ? law.simple_summary_bn || law.simple_summary : law.simple_summary}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleLawBookmark(law.id)}
                        className="text-slate-400 hover:text-bdRed-600 p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">{law.act_no_year}</span>
                      <Link
                        to={`/laws/${law.id}`}
                        onClick={() => setIsSavedDrawerOpen(false)}
                        className="text-bdGreen-800 font-semibold hover:text-bdGreen-900 flex items-center gap-1"
                      >
                        <span>{lang === 'bn' ? 'বিস্তারিত' : 'View Law'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <Bookmark className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                  <p className="text-sm font-medium">No saved laws yet</p>
                  <p className="text-xs">Click the bookmark icon on any law to save it here for quick reference.</p>
                </div>
              )



            ) : (
              matchedLawyers.length > 0 ? (
                matchedLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-emerald-50/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-bdGreen-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {lawyer.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-sm text-slate-900">{lawyer.name}</h4>
                            {lawyer.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-bdGreen-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">{lawyer.courtLevel}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleLawyerBookmark(lawyer.id)}
                        className="text-slate-400 hover:text-bdRed-600 p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-bdGreen-800">{lawyer.feeDisplay}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/booking/${lawyer.id}`}
                          onClick={() => setIsSavedDrawerOpen(false)}
                          className="px-2.5 py-1 bg-bdGreen-800 text-white text-[11px] font-semibold rounded-md hover:bg-bdGreen-700"
                        >
                          Book Now
                        </Link>
                        <Link
                          to={`/lawyers/${lawyer.id}`}
                          onClick={() => setIsSavedDrawerOpen(false)}
                          className="text-slate-600 hover:text-bdGreen-800 font-semibold"
                        >
                          Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <User className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                  <p className="text-sm font-medium">No bookmarked advocates</p>
                  <p className="text-xs">Bookmark top-ranked advocates to compare or consult anytime.</p>
                </div>
              )
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={() => setIsSavedDrawerOpen(false)}
              className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
