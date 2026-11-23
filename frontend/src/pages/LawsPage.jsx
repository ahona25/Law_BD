import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Scale,
  Search,
  Filter,
  Bookmark,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  FileText,
  ChevronRight,
  Layers,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { ALL_30_LEGAL_CATEGORIES } from '../data/categoriesData';
import { api } from '../services/api';
import SequentialSidebar from '../components/SequentialSidebar';

export default function LawsPage() {
  const { lang } = useLanguage();
  const { savedLaws, toggleLawBookmark } = useBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();

  const [laws, setLaws] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSubcategory = searchParams.get('subcategory') || '';
  const currentSearch = searchParams.get('q') || '';
  const currentStatus = searchParams.get('status') || 'all';

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {

    api.getCategories().then(res => {
      if (res.success) setCategories(res.categories);
    }).catch(() => { });
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getLaws({
      q: currentSearch,
      category: currentCategory,
      subcategory: currentSubcategory,
      status: currentStatus
    }).then(res => {
      if (res.success) setLaws(res.laws);
    }).catch(err => {
      console.error('Failed to load laws:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [currentCategory, currentSubcategory, currentSearch, currentStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('q', searchInput.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const handleCategorySelect = (catId, subcategory = null) => {
    const params = new URLSearchParams();
    if (catId && catId !== 'all') {
      params.set('category', catId);
    }
    if (subcategory) {
      params.set('subcategory', subcategory);
    }
    setSearchParams(params);
  };




  const handleStatusChange = (status) => {
    const params = new URLSearchParams(searchParams);
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  // Find active category details
  const matchedCategoryObj = ALL_30_LEGAL_CATEGORIES.find(c => c.id === currentCategory);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Top Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-1.5">
              <Scale className="w-4 h-4" />
              <span>{lang === 'bn' ? 'বাংলাদেশ কোড আইন সংগ্রহশালা' : 'Official Bangladesh Law Library'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'bn' ? 'বাংলাদেশের আইন ও বিধিমালার পূর্ণাঙ্গ লাইব্রেরি' : 'Comprehensive Bangladesh Legal Repository'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Explore official acts, ordinances, constitutional provisions, penalties, and procedural timelines organized sequentially across 30 jurisdictions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle Sequential Sidebar Button */}
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 text-xs font-bold transition-all shadow-2xs"
            >
              {sidebarExpanded ? <PanelLeftClose className="w-4 h-4 text-bdGreen-800" /> : <PanelLeftOpen className="w-4 h-4 text-bdGreen-800" />}
              <span>{sidebarExpanded ? 'Hide 30 Sidebar' : 'Show 30 Sidebar'}</span>
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bdGreen-800 text-white text-xs font-bold"
            >
              <Layers className="w-4 h-4" />
              <span>30 Domains (1-30)</span>
            </button>
          </div>
        </div>

        {/* Master Layout: Sequential Sidebar + Laws Catalog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Embedded Sequential Categories Sidebar (When Expanded) */}
          {sidebarExpanded && (
            <div className="hidden lg:block lg:col-span-4 sticky top-28 h-[calc(100vh-140px)]">
              <SequentialSidebar
                embedded={true}
                activeCategoryId={currentCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          )}

          {/* Right Column: Search Controls, Active Filters & Laws Grid */}
          <div className={`${sidebarExpanded ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>

            {/* Search & Status Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={lang === 'bn' ? 'আইনের নাম, ধারা বা ঘটনা দিয়ে খুঁজুন (যেমন: জমি, চেক, bail, 302)...' : 'Search by title, section, or incident keyword (e.g. land, cheque, bail, 302)...'}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 text-xs sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
                >
                  {lang === 'bn' ? 'অনুসন্ধান' : 'Search'}
                </button>
              </form>

              {/* Status & Active Filter Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 font-semibold">Active Filter:</span>
                  {currentCategory !== 'all' && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-bdGreen-900 font-bold flex items-center gap-1">
                      <span>Category: {matchedCategoryObj ? matchedCategoryObj.name : currentCategory}</span>
                      <button onClick={() => handleCategorySelect('all')} className="hover:text-bdRed-600 ml-1">×</button>
                    </span>
                  )}
                  {currentSubcategory && (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-bdRed-700 font-bold flex items-center gap-1 border border-rose-200">
                      <span>Incident: {currentSubcategory}</span>
                      <button onClick={() => handleCategorySelect(currentCategory, null)} className="hover:text-bdRed-900 ml-1">×</button>
                    </span>
                  )}
                  {currentCategory === 'all' && !currentSubcategory && !currentSearch && (
                    <span className="text-slate-500 italic">Showing all statutes across all 30 jurisdictions</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold">Status:</span>
                  <select
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:border-bdGreen-800"
                  >
                    <option value="all">All Legal Status</option>
                    <option value="current">Current / Enacted Law</option>
                    <option value="amended">Amended</option>
                    <option value="repealed">Repealed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Matched Domain Banner (If filtering by category) */}
            {matchedCategoryObj && (
              <div className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-bdGreen-800 text-white">
                      Jurisdiction #{String(matchedCategoryObj.seq).padStart(2, '0')}
                    </span>
                    <h2 className="font-bold text-base text-slate-900">
                      {matchedCategoryObj.name} ({matchedCategoryObj.bangla})
                    </h2>
                  </div>
                  <button onClick={clearAllFilters} className="text-xs text-bdRed-600 font-bold hover:underline">
                    Reset to All
                  </button>
                </div>

                <p className="text-xs text-slate-600">
                  <strong>Primary Statute:</strong> {matchedCategoryObj.primaryAct}
                </p>

                {/* Subcategories pills inside domain */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchedCategoryObj.subcategories.map((sub, sIdx) => {
                    const isSubSelected = currentSubcategory === sub;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => handleCategorySelect(matchedCategoryObj.id, isSubSelected ? null : sub)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${isSubSelected
                          ? 'bg-bdRed-500 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
                          }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Laws Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-slate-200/60 animate-pulse rounded-3xl"></div>
                ))}
              </div>
            ) : laws.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {laws.map((law) => {
                  const isSaved = savedLaws.includes(law.id);
                  return (
                    <div
                      key={law.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-bdGreen-800 border border-emerald-200">
                              {law.category_label || law.category}
                            </span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${law.status === 'current'
                              ? 'bg-emerald-100 text-emerald-800'
                              : law.status === 'repealed'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                              }`}>
                              {law.status || 'current'}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {law.act_no_year}
                          </span>
                        </div>

                        {/* Law Title */}
                        <h2 className="font-bold text-lg text-slate-900 mb-2">
                          <Link to={`/laws/${law.id}`} className="hover:text-bdGreen-800 transition-colors">
                            {lang === 'bn' ? law.bangla_title || law.title : law.title}
                          </Link>
                        </h2>

                        {/* Associated Acts List */}
                        {law.acts && law.acts.length > 0 && (
                          <div className="mb-3 text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
                            <strong>Statutes:</strong> {law.acts.join('; ')}
                          </div>
                        )}

                        {/* Plain Language Summary */}
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                          {lang === 'bn' ? law.simple_summary_bn || law.simple_summary : law.simple_summary}
                        </p>

                        {/* Penalties Box */}
                        <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-slate-700 mb-4">
                          <strong className="text-bdRed-600 font-semibold block mb-0.5 flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'আইনি দণ্ড ও শাস্তি:' : 'Statutory Penalties & Remedies:'}</span>
                          </strong>
                          <span className="line-clamp-2">
                            {lang === 'bn' ? law.penalties_bn || law.penalties : law.penalties}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => toggleLawBookmark(law.id)}
                          className={`font-semibold transition-colors ${isSaved ? 'text-bdRed-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                          {isSaved ? '★ Bookmarked' : '☆ Save to Bookmarks'}
                        </button>
                        <Link
                          to={`/laws/${law.id}`}
                          className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>{lang === 'bn' ? 'পূর্ণাঙ্গ ধারা ও কার্যপ্রণালী' : 'View Sections & Steps'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <Scale className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
                <h3 className="text-base font-bold text-slate-800">No laws found for selected criteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing the category or incident filter, or select one of the 30 domains from the sidebar.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-3 px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Drawer Version of Sequential Sidebar */}
      <SequentialSidebar
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeCategoryId={currentCategory}
        onSelectCategory={handleCategorySelect}
      />
    </div>
  );
}
