import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scale,
  Search,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  X,
  ArrowRight,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ALL_30_LEGAL_CATEGORIES } from '../data/categoriesData';
import { useLanguage } from '../context/LanguageContext';

export default function SequentialSidebar({ isOpen, onClose, embedded = false, activeCategoryId = null, onSelectCategory = null }) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState('');
  const [expandedCat, setExpandedCat] = useState(activeCategoryId || 'constitutional');

  const filteredCategories = ALL_30_LEGAL_CATEGORIES.filter(cat => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    const nameMatch = cat.name.toLowerCase().includes(q);
    const bnMatch = cat.bangla.includes(q);
    const subMatch = cat.subcategories.some(s => s.toLowerCase().includes(q));
    const bnSubMatch = cat.banglaSubcategories?.some(s => s.includes(q));
    return nameMatch || bnMatch || subMatch || bnSubMatch;
  });

  const handleSubcategoryClick = (cat, sub) => {
    if (onSelectCategory) {
      onSelectCategory(cat.id, sub);
    } else {
      navigate(`/laws?category=${cat.id}&subcategory=${encodeURIComponent(sub)}`);
    }
    if (onClose) onClose();
  };

  const content = (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 bg-bdDark-900 text-white border-b border-emerald-950 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-emerald-700/50">
            <Layers className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif font-bold text-base text-white">
                {lang === 'bn' ? '৩০টি আইনি অধিক্ষেত্র' : '30 Legal Domains'}
              </h2>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-bdRed-500 text-white rounded">
                1-30 Seq
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'bn' ? 'ধারাবাহিক আইনি বিষয় ও ঘটনা তালিকা' : 'Sequential Categorization & Incidents'}
            </p>
          </div>
        </div>

        {!embedded && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Search inside Sidebar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder={lang === 'bn' ? 'বিষয় বা ঘটনা খুঁজুন (যেমন: theft, জামিন, যৌতুক)...' : 'Filter by incident (e.g. cheque, assault, mutation)...'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-bdGreen-800"
          />
        </div>
        {filterText && (
          <div className="text-[11px] text-slate-500 mt-1.5 px-1 font-medium flex justify-between">
            <span>Matching {filteredCategories.length} of 30 domains</span>
            <button onClick={() => setFilterText('')} className="text-bdRed-600 font-bold hover:underline">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Sequential Categories List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredCategories.map((cat) => {
          const isExpanded = expandedCat === cat.id;
          const isSelected = activeCategoryId === cat.id;

          return (
            <div
              key={cat.id}
              className={`rounded-2xl border transition-all ${
                isSelected
                  ? 'border-bdGreen-800 bg-emerald-50/50 shadow-xs'
                  : 'border-slate-200/90 hover:border-slate-300 bg-white'
              }`}
            >
              {/* Category Header Row */}
              <button
                type="button"
                onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                className="w-full p-3 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-bdGreen-800 group-hover:text-white transition-colors shrink-0">
                    {String(cat.seq).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                      {lang === 'bn' ? cat.bangla : cat.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-mono">
                      {cat.subcategories.length} Incidents / Sub-areas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-bdGreen-800' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {/* Subcategories / Incidents Pill Area */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-2.5 animate-fadeIn">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'bn' ? 'উপ-বিভাগ ও সংশ্লিষ্ট ঘটনা সমূহ:' : 'Subcategories & Specific Incidents:'}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub, sIdx) => {
                      const bnSub = cat.banglaSubcategories ? cat.banglaSubcategories[sIdx] : null;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleSubcategoryClick(cat, sub)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-bdGreen-800 hover:text-white text-[11px] text-slate-700 font-medium transition-colors text-left flex items-center gap-1 group/pill shadow-2xs"
                        >
                          <span>{lang === 'bn' && bnSub ? bnSub : sub}</span>
                          <ChevronRight className="w-3 h-3 opacity-40 group-hover/pill:opacity-100" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Primary Law Citation Pill */}
                  <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-medium line-clamp-1 pr-2">
                      Statute: {cat.primaryAct}
                    </span>
                    <Link
                      to={`/laws?category=${cat.id}`}
                      onClick={() => { if (onClose) onClose(); }}
                      className="text-bdGreen-800 hover:text-bdGreen-900 font-bold whitespace-nowrap flex items-center gap-0.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs shrink-0">
        <Link
          to="/victim-support"
          onClick={() => { if (onClose) onClose(); }}
          className="w-full py-2 bg-bdRed-500 hover:bg-bdRed-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Incident Triage</span>
        </Link>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <aside className="w-full h-full rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        {content}
      </aside>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {content}
        </div>
      </div>
    </div>
  );
}
