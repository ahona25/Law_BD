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
  Building2,
  SlidersHorizontal,
  ChevronRight,
  Users,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { ALL_64_DISTRICTS } from '../data/courtsData';
import { api } from '../services/api';

export default function LawyersPage() {
  const { lang, t } = useLanguage();
  const { savedLawyers, toggleLawyerBookmark } = useBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentSpecialty = searchParams.get('specialty') || 'All Specialties';
  const currentDivision = searchParams.get('division') || 'All Locations';
  const currentDistrict = searchParams.get('district') || '';
  const currentCourt = searchParams.get('court') || 'All Court Levels';
  const currentSort = searchParams.get('sortBy') || 'top-rated';
  const currentSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setLoading(true);
    api.getLawyers({
      specialty: currentSpecialty,
      division: currentDivision,
      district: currentDistrict,
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
  }, [currentSpecialty, currentDivision, currentDistrict, currentCourt, currentSort, currentSearch]);

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
    if (!val || val.startsWith('All') || val === 'all') {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    setSearchParams(params);
  };

  const handleClearAreaFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('district');
    params.delete('division');
    params.delete('court');
    setSearchParams(params);
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
    'Dhaka',
    'Chattogram',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Rangpur',
    'Mymensingh'
  ];

  const hasAreaFilter = Boolean(currentDistrict || (currentDivision && currentDivision !== 'All Locations') || (currentCourt && currentCourt !== 'All Court Levels'));

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
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

          <Link
            to="/courts"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-bdGreen-900 border border-emerald-200/80 rounded-xl text-xs font-bold transition-all shrink-0 self-start md:self-auto shadow-2xs"
          >
            <Building2 className="w-4 h-4 text-bdGreen-800" />
            <span>{lang === 'bn' ? 'আদালত ও বিচারিক অধিক্ষেত্র ডিরেক্টরি' : 'Bangladesh Courts Directory'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
                placeholder={lang === 'bn' ? 'আইনজীবীর নাম, চেম্বার, জেলা বা ডিগ্রি দিয়ে খুঁজুন...' : 'Search advocate by name, chamber, district, or qualification...'}
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



          {/* Dropdown Filters (Specialty, Division, 64 Districts, Court Level, Sort) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {lang === 'bn' ? 'বিশেষজ্ঞতা:' : 'Specialization:'}
              </label>
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
              <label className="block text-slate-500 font-semibold mb-1">
                {lang === 'bn' ? 'প্রশাসনিক বিভাগ:' : 'Division / Region:'}
              </label>
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
              <label className="block text-slate-500 font-semibold mb-1">
                {lang === 'bn' ? 'জেলা (৬৪ জেলা):' : 'District (All 64):'}
              </label>
              <select
                value={currentDistrict || 'All Districts'}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-bdGreen-800"
              >
                <option value="All Districts">{lang === 'bn' ? '— সকল জেলা —' : '— All Districts —'}</option>
                {ALL_64_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {lang === 'bn' ? `${d.nameBn} (${d.name})` : d.name}
                  </option>
                ))}
              </select>



            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {lang === 'bn' ? 'আদালতের স্তর:' : 'Court Level:'}
              </label>
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
              <label className="block text-slate-500 font-semibold mb-1">
                {lang === 'bn' ? 'সর্ট করুন:' : 'Sort By:'}
              </label>
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




        {/* ACTIVE SELECTED AREA FILTER BANNER */}
        {hasAreaFilter && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-bdGreen-950">
                  {lang === 'bn' ? 'নির্বাচিত এলাকার আইনজীবীগণ' : 'Advocates in Selected Jurisdiction'}
                </p>
                <p className="text-xs text-slate-600">
                  {lang === 'bn'
                    ? `${currentDistrict ? `${currentDistrict} জেলা` : ''} ${currentDivision && currentDivision !== 'All Locations' ? `(${currentDivision} বিভাগ)` : ''} অধিক্ষেত্রে সনদপ্রাপ্ত বিজ্ঞ আইনজীবীগণ প্রদর্শিত হচ্ছে (মোট ${lawyers.length} জন)`
                    : `Showing verified enrolled advocates for ${currentDistrict ? `${currentDistrict} District` : ''} ${currentDivision && currentDivision !== 'All Locations' ? `(${currentDivision} Division)` : ''} (${lawyers.length} advocates available)`}
                </p>
              </div>
            </div>
            <button
              onClick={handleClearAreaFilters}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all shrink-0 self-start sm:self-auto shadow-2xs"
            >
              {lang === 'bn' ? 'সকল এলাকার আইনজীবী দেখুন' : 'Show All Areas'}
            </button>
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

              return (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
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

                          {/* District & Division badge */}
                          <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-bdGreen-900">
                            <MapPin className="w-3 h-3 text-bdRed-500 shrink-0" />
                            <span>{lawyer.district ? `${lawyer.district} District` : lawyer.division}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500 font-normal line-clamp-1">{lawyer.division}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleLawyerBookmark(lawyer.id)}
                        className={`p-1.5 rounded-lg transition-colors ${isSaved ? 'text-bdRed-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700'
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

                    {/* Court Level */}
                    <p className="text-[11px] text-slate-600 font-medium mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-bdGreen-800 shrink-0" />
                      <span className="line-clamp-1">{lawyer.courtLevel}</span>
                    </p>

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

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-bdGreen-700" />
                        <span>Enrolled Advocate</span>
                      </span>
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
              Try choosing "All Specialties" or "All Districts" to view all enrolled Bar Council advocates.
            </p>
            {hasAreaFilter && (
              <button
                onClick={handleClearAreaFilters}
                className="mt-3 px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-bold"
              >
                Show All Bangladesh Advocates
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
