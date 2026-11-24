import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  FileText,
  Bookmark,
  Printer,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function AwarenessPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('dictionary'); // 'dictionary' | 'checklists' | 'articles'
  const [dictionaryTerms, setDictionaryTerms] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Terms');

  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    api.getDictionary().then(res => {
      if (res.success) setDictionaryTerms(res.terms);
    }).catch(() => { });

    api.getChecklists().then(res => {
      if (res.success) setChecklists(res.checklists);
    }).catch(() => { });

    api.getArticles().then(res => {
      if (res.success) setArticles(res.articles);
    }).catch(() => { });
  }, []);

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };


  const filteredTerms = dictionaryTerms.filter(term => {
    const matchCat = activeCategory === 'All Terms' || term.category === activeCategory;
    const matchQuery = !searchTerm.trim() ||
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.bangla && term.bangla.includes(searchTerm)) ||
      (term.definition && term.definition.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchQuery;
  });

  const categories = ['All Terms', 'Criminal Law', 'Land & Property', 'Family Law', 'Civil Law'];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নাগরিক আইনি সচেতনতা ও পরিভাষা' : 'Citizen Legal Education & Dictionary'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {lang === 'bn' ? 'আইনি সচেতনতা ও শিক্ষা কেন্দ্র' : 'Legal Awareness & Educational Hub'}
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Understand fundamental rights, statutory checklists, educational articles, and searchable bilingual legal terminology.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'dictionary'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Scale className="w-4 h-4 text-bdGreen-700" />
            <span>Bilingual Legal Dictionary ({dictionaryTerms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'articles'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <BookOpen className="w-4 h-4 text-bdGreen-700" />
            <span>Citizen Rights Articles ({articles.length})</span>
          </button>
        </div>

        {/* Tab 1: Bilingual Legal Dictionary */}
        {activeTab === 'dictionary' && (
          <div className="space-y-6">

            {/* Dictionary Search & Category Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search legal terms in English or Bengali (e.g. FIR, GD, জামিন, দেনমোহর, নামজারি, Habeas Corpus)..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${activeCategory === cat
                      ? 'bg-bdGreen-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{t.term}</h3>
                      <p className="text-sm font-bold text-bdGreen-800 font-bangla">{t.bangla}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-bdGreen-800 border border-emerald-200">
                      {t.category}
                    </span>
                  </div>

                  {t.citation && (
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Ref: {t.citation}
                    </span>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {t.definition}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 2: Citizen Rights Articles */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-bdGreen-800 font-bold uppercase text-[10px]">
                      {art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 mb-2 leading-tight">
                    {art.title}
                  </h3>
                  <h4 className="text-sm font-bold text-bdGreen-800 font-bangla mb-4">
                    {art.bangla_title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{art.author}</span>
                  <button
                    onClick={() => alert(`Full Guide:\n\n${art.fullText}`)}
                    className="text-bdGreen-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
