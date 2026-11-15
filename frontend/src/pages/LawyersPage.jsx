import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Search,
  Filter,
  Bookmark,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Video,
  Phone,
  Scale,
  CheckSquare,
  Square,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { api } from '../services/api';

export default function LawyersPage() {
  const { lang, t } = useLanguage();
  const { savedLawyers, toggleLawyerBookmark } = useBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comparedIds, setComparedIds] = useState([]);

  const currentSpecialty = searchParams.get('specialty') || 'All Specialties';
  const currentDivision = searchParams.get('division') || 'All Locations';
  const currentCourt = searchParams.get('court') || 'All Court Levels';
  const currentSort = searchParams.get('sortBy') || 'top-rated';
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setLoading(true);
    api.getLawyers({
      specialty: currentSpecialty,
      division: currentDivision,
      court: currentCourt,
      sortBy: currentSort,
      search: currentSearch
    }).then(res => {
      if (res.success) setLawyers(res.lawyers);
    }).catch(err => {
      console.error('Failed to load lawyers:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [currentSpecialty, currentDivision, currentCourt, currentSort, currentSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleFilterChange = (key, val) => {
    const params = new URLSearchParams(searchParams);
    if (val.startsWith('All')) {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    setSearchParams(params);
  };

  const toggleCompare = (id) => {
    const numId = Number(id);
    if (comparedIds.includes(numId)) {
      setComparedIds(comparedIds.filter(x => x !== numId));
    } else {
      if (comparedIds.length >= 3) {
        alert('You can compare up to 3 advocates simultaneously.');
        return;
      }
      setComparedIds([...comparedIds, numId]);
    }
  };

  const specialtiesList = [
    'All Specialties',
    'Criminal Law',
    'Land & Property',
    'Family & Divorce',
    'Cybercrime',
    'Domestic Violence',
    'Cheque Dishonour',
    'Labour & Workplace',
    'Civil Law'
  ];

  const divisionsList = [
    'All Locations',
    'Dhaka (Supreme Court & Judge Court)',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Cumilla'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-bdGreen-700" />
            <span>{lang === 'bn' ? 'বাংলাদেশ বার কাউন্সিল সনদপ্রাপ্ত আইনজীবী ডিরেক্টরি' : 'Bangladesh Bar Council Verified Directory'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {t('lawyersTitle')}
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            {t('lawyersSubtitle')}
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={lang === 'bn' ? 'আইনজীবীর নাম, চেম্বার বা ডিগ্রি দিয়ে খুঁজুন...' : 'Search advocate by name, chamber, or qualification...'}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-semibold rounded-xl text-sm transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Specialization:</label>
              <select
                value={currentSpecialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-bdGreen-800"
              >
                {specialtiesList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Division / Court Area:</label>
              <select
                value={currentDivision}
                onChange={(e) => handleFilterChange('division', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-bdGreen-800"
              >
                {divisionsList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Court Level:</label>
              <select
                value={currentCourt}
                onChange={(e) => handleFilterChange('court', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-bdGreen-800"
              >
                <option value="All Court Levels">All Court Levels</option>
                <option value="Supreme Court">Supreme Court (High Court Division)</option>
                <option value="District">District & Sessions Judge Court</option>
                <option value="Cyber">Cyber Tribunal</option>
                <option value="Labour">Labour Court</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Sort Advocates By:</label>
              <select
                value={currentSort}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-bdGreen-800"
              >
                <option value="top-rated">Top Rated</option>
                <option value="most-experienced">Most Experienced</option>
                <option value="lowest-fee">Lowest Consultation Fee</option>
                <option value="most-reviews">Most Client Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Floating Action Bar (Sticky if compared items exist) */}
        {comparedIds.length > 0 && (
          <div className="sticky top-24 z-30 mb-8 p-4 rounded-2xl bg-bdDark-900 text-white shadow-xl border border-emerald-900 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-bdRed-500 text-white font-bold flex items-center justify-center text-xs">
                {comparedIds.length}
              </span>
              <div>
                <p className="font-bold text-sm">Advocates Selected for Comparison</p>
                <p className="text-xs text-slate-400">Comparing fees, credentials, and chamber locations</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setComparedIds([])}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
              <Link
                to={`/compare-lawyers?ids=${comparedIds.join(',')}`}
                className="px-4 py-2 bg-bdGreen-700 hover:bg-bdGreen-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span>Compare Side-by-Side</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Directory Listing Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200/60 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : lawyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => {
              const isSaved = savedLawyers.includes(Number(lawyer.id));
              const isCompared = comparedIds.includes(Number(lawyer.id));

              return (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-bdGreen-800 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                          {lawyer.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h2 className="font-bold text-base text-slate-900 leading-tight">
                              <Link to={`/lawyers/${lawyer.id}`} className="hover:text-bdGreen-800">
                                {lawyer.name}
                              </Link>
                            </h2>
                            {lawyer.verified && (
                              <span title="Bar Council Verified">
                                <ShieldCheck className="w-4 h-4 text-bdGreen-600 shrink-0" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{lawyer.courtLevel}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleLawyerBookmark(lawyer.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved ? 'text-bdRed-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title="Bookmark advocate"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bar Registration Badge */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-3">
                      <span>Roll: <strong>{lawyer.barCouncilNo}</strong></span>
                      <span>{lawyer.experienceYears} Years Exp</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {lawyer.bio}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lawyer.specialties?.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Chamber Address */}
                    <p className="text-[11px] text-slate-500 flex items-start gap-1.5 mb-4 line-clamp-2">
                      <MapPin className="w-3.5 h-3.5 text-bdRed-500 shrink-0 mt-0.5" />
                      <span>{lawyer.chamberAddress}</span>
                    </p>

                    {/* Ratings & Success metrics */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 mb-4">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Client Rating:</span>
                        <strong className="text-emerald-700">★ {lawyer.rating} ({lawyer.reviewsCount})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Response Time:</span>
                        <strong className="text-slate-800">{lawyer.responseTime || '< 1 hour'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Fees & Booking */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation:</span>
                        <span className="font-bold text-lg text-bdGreen-900">{lawyer.feeDisplay}</span>
                      </div>

                      {/* Compare Checkbox */}
                      <button
                        onClick={() => toggleCompare(lawyer.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                          isCompared ? 'bg-emerald-100 text-bdGreen-900' : 'text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {isCompared ? (
                          <CheckSquare className="w-4 h-4 text-bdGreen-700" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                        <span>Compare</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/lawyers/${lawyer.id}`}
                        className="py-2.5 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        to={`/booking/${lawyer.id}`}
                        className="py-2.5 text-center bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                      >
                        Book Slot
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <User className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
            <h3 className="text-base font-bold text-slate-800">No advocates matched the selected criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try choosing "All Specialties" or "All Locations" to view all enrolled Bar Council advocates.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
