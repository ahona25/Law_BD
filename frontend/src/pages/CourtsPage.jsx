import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  MapPin,
  Phone,
  Clock,
  Search,
  Building2,
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Compass,
  ArrowRight,
  Filter,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ALL_BANGLADESH_COURTS, BANGLADESH_DIVISIONS, ALL_64_DISTRICTS } from '../data/courtsData';

export default function CourtsPage() {
  const { lang } = useLanguage();
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Available districts based on division selection
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'all' || selectedDivision === 'specialized' || selectedDivision === 'apex') {
      return ALL_64_DISTRICTS;
    }
    return ALL_64_DISTRICTS.filter((d) => d.divisionId === selectedDivision);
  }, [selectedDivision]);

  // Handle Division Click
  const handleDivisionSelect = (divId) => {
    setSelectedDivision(divId);
    // If current district doesn't belong to this division, reset district
    if (divId !== 'all' && divId !== 'specialized' && divId !== 'apex') {
      const distBelongs = ALL_64_DISTRICTS.some(
        (d) => d.divisionId === divId && d.name.toLowerCase() === selectedDistrict.toLowerCase()
      );
      if (!distBelongs) {
        setSelectedDistrict('all');
      }
    }
  };

  // Filter courts based on division, district, and search query
  const filteredCourts = useMemo(() => {
    return ALL_BANGLADESH_COURTS.filter((court) => {
      const matchesDivision =
        selectedDivision === 'all' || court.divisionId === selectedDivision;

      const matchesDistrict =
        selectedDistrict === 'all' ||
        court.district.toLowerCase() === selectedDistrict.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesDivision && matchesDistrict;

      const matchesSearch =
        court.name.toLowerCase().includes(q) ||
        court.nameBn.toLowerCase().includes(q) ||
        court.district.toLowerCase().includes(q) ||
        court.division.toLowerCase().includes(q) ||
        court.address.toLowerCase().includes(q) ||
        court.caseTypes.some((ct) => ct.toLowerCase().includes(q));

      return matchesDivision && matchesDistrict && matchesSearch;
    });
  }, [selectedDivision, selectedDistrict, searchQuery]);

  const handleCopyAddress = (court) => {
    const textToCopy = `${court.name} - ${court.address} (Phone: ${court.phone})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(court.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Target area name for advocates link
  const currentAreaTarget = useMemo(() => {
    if (selectedDistrict !== 'all') return selectedDistrict;
    if (selectedDivision !== 'all') {
      const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === selectedDivision);
      return divObj ? divObj.name : '';
    }
    return '';
  }, [selectedDistrict, selectedDivision]);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HEADER & BANGLADESH JUDICIAL DIRECTORY INTRODUCTION
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-bdGreen-800" />
            <span>{lang === 'bn' ? 'বাংলাদেশ বিচার বিভাগ ও ৬৪ জেলা আদালত ডিরেক্টরি' : 'All 64 Districts Courts & Judicial Hierarchy'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {lang === 'bn' ? 'বাংলাদেশের সকল আদালত ও অধিক্ষেত্র' : 'Bangladesh All Courts Directory'}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'সুপ্রিম কোর্ট (আপিল ও হাইকোর্ট বিভাগ), ৮টি প্রশাসনিক বিভাগের সকল ৬৪টি জেলা ও দায়রা জজ আদালত এবং বিশেষায়িত ট্রাইব্যুনালের বিস্তারিত তথ্য।'
              : 'Complete directory of the Supreme Court of Bangladesh, District & Sessions Courts across all 64 districts in 8 administrative divisions, and specialized tribunals.'}
          </p>
        </div>

        {/* =========================================================================
            SIMPLE 3-TIER HIERARCHY OVERVIEW (Clean & Uncluttered)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-2xs">
              01
            </div>
            <h2 className="font-bold text-slate-900 text-sm">
              {lang === 'bn' ? 'সর্বোচ্চ আদালত (সুপ্রিম কোর্ট)' : 'Apex Supreme Court'}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {lang === 'bn'
                ? 'আপিল বিভাগ ও হাইকোর্ট বিভাগ। সংবিধানের ১০২ অনুচ্ছেদে মৌলিক অধিকার ও রিট অধিক্ষেত্র।'
                : 'Appellate Division & High Court Division with constitutional writ jurisdiction under Article 102.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-2xs">
              02
            </div>
            <h2 className="font-bold text-slate-900 text-sm">
              {lang === 'bn' ? 'অধীনস্থ ৬৪ জেলা ও দায়রা আদালত' : 'All 64 District Courts'}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {lang === 'bn'
                ? '৮টি বিভাগের ৬৪টি জেলা ও দায়রা জজ আদালত, মহানগর দায়রা আদালত, সিএমএম ও সিজেএম আদালত।'
                : 'District & Sessions Judge Courts, Metropolitan Sessions, CMM, and CJM Magistracy across all 64 districts.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-bdRed-500 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-2xs">
              03
            </div>
            <h2 className="font-bold text-slate-900 text-sm">
              {lang === 'bn' ? 'বিশেষ সংবিধিবদ্ধ ট্রাইব্যুনাল' : 'Specialized Statutory Tribunals'}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {lang === 'bn'
                ? 'সাইবার ট্রাইব্যুনাল, নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনাল, অর্থ ঋণ আদালত এবং শ্রম আদালত।'
                : 'Cyber Tribunals, Nari O Shishu Tribunals, Artha Rin Adalats, and Labour Courts nationwide.'}
            </p>
          </div>
        </div>

        {/* =========================================================================
            SEARCH BAR, DIVISION PILLS & 64-DISTRICT SELECTOR
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-2xs mb-8 space-y-5">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'আদালতের নাম, জেলা, এলাকা বা মামলার ধরণ দিয়ে খুঁজুন (যেমন: ঢাকা, বগুড়া, কুমিল্লা, সাইবার, হাইকোর্ট)...'
                  : 'Search by court name, district, division, or case type (e.g. Dhaka, Bogura, Cumilla, Cyber)...'
              }
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-bdGreen-800 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Division Filter Pills */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'bn' ? 'বিভাগ নির্বাচন করুন:' : 'Filter by Division:'}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BANGLADESH_DIVISIONS.map((div) => {
                const isSelected = selectedDivision === div.id;
                return (
                  <button
                    key={div.id}
                    onClick={() => handleDivisionSelect(div.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isSelected
                        ? 'bg-bdGreen-800 text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {lang === 'bn' ? div.bangla : div.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 64 Districts Dropdown Selector & Direct Find Advocates Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 shrink-0">
                <MapPin className="w-4 h-4 text-bdGreen-800" />
                <span>{lang === 'bn' ? 'জেলা নির্বাচন (৬৪ জেলা):' : 'Select District (All 64):'}</span>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-bdGreen-800 min-w-[200px]"
              >
                <option value="all">
                  {lang === 'bn' ? '— সকল জেলা (All Districts) —' : '— All Districts —'}
                </option>
                {availableDistricts.map((dist) => (
                  <option key={dist.id} value={dist.name}>
                    {lang === 'bn' ? `${dist.nameBn} (${dist.name})` : dist.name}
                  </option>
                ))}
              </select>

              {selectedDistrict !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('all')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline self-start sm:self-auto"
                >
                  {lang === 'bn' ? 'রিসেট' : 'Reset'}
                </button>
              )}
            </div>

            {/* Direct Link to Find Advocates in this Selected Area */}
            <Link
              to={`/lawyers?division=${selectedDivision !== 'all' ? selectedDivision : ''}&district=${selectedDistrict !== 'all' ? selectedDistrict : ''}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-bdGreen-800 text-bdGreen-900 hover:text-white border border-emerald-300 hover:border-bdGreen-800 rounded-xl text-xs font-bold transition-all shadow-2xs shrink-0 group"
            >
              <Users className="w-4 h-4 text-bdGreen-800 group-hover:text-white transition-colors" />
              <span>
                {currentAreaTarget
                  ? (lang === 'bn' ? `${currentAreaTarget}-এর সকল আইনজীবী দেখুন` : `Show All Advocates in ${currentAreaTarget}`)
                  : (lang === 'bn' ? 'নির্বাচিত এলাকার আইনজীবী দেখুন' : 'Find Advocates in Selected Area')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* =========================================================================
            RESULTS COUNT & ACTIVE FILTER INDICATION
            ========================================================================= */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'bn' ? (
              <span>
                মোট <strong className="text-slate-900 font-bold">{filteredCourts.length}</strong>টি আদালত প্রদর্শিত হচ্ছে
                {selectedDistrict !== 'all' && <span> ({selectedDistrict} জেলা)</span>}
              </span>
            ) : (
              <span>
                Showing <strong className="text-slate-900 font-bold">{filteredCourts.length}</strong> courts & tribunals
                {selectedDistrict !== 'all' && <span> for <strong>{selectedDistrict} District</strong></span>}
              </span>
            )}
          </div>
          {(selectedDivision !== 'all' || selectedDistrict !== 'all') && (
            <button
              onClick={() => {
                setSelectedDivision('all');
                setSelectedDistrict('all');
                setSearchQuery('');
              }}
              className="text-xs text-bdGreen-800 hover:underline font-semibold"
            >
              {lang === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Show All Areas'}
            </button>
          )}
        </div>

        {/* =========================================================================
            CLEAN, BALANCED COURTS GRID (No Clutter, High Readability)
            ========================================================================= */}
        {filteredCourts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {lang === 'bn' ? 'কোনো আদালত পাওয়া যায়নি' : 'No matching court found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {lang === 'bn'
                ? 'অনুসন্ধানের বানান পরীক্ষা করুন অথবা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                : 'Try adjusting your search terms or clearing the division and district filter.'}
            </p>
            <button
              onClick={() => {
                setSelectedDivision('all');
                setSelectedDistrict('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-bdGreen-800 text-white text-xs font-bold rounded-xl"
            >
              {lang === 'bn' ? 'রিসেট করুন' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourts.map((court) => {
              const isApex = court.divisionId === 'apex';
              const isSpecial = court.divisionId === 'specialized';

              return (
                <div
                  key={court.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between ${
                    isApex
                      ? 'border-emerald-300/80 shadow-md hover:shadow-lg ring-1 ring-emerald-100'
                      : isSpecial
                      ? 'border-amber-200/80 shadow-2xs hover:shadow-md'
                      : 'border-slate-200/90 shadow-2xs hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Division Badge & Level */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isApex
                              ? 'bg-emerald-100 text-bdGreen-900'
                              : isSpecial
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lang === 'bn' ? court.divisionBn : court.division}
                        </span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {lang === 'bn' ? court.districtBn : court.district}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-bdGreen-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/40">
                        {lang === 'bn' ? court.levelBn : court.level}
                      </span>
                    </div>

                    {/* Court Name (EN & BN) */}
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {court.name}
                      </h3>
                      <p className="text-sm text-bdGreen-900 font-semibold mt-0.5">
                        {court.nameBn}
                      </p>
                    </div>

                    {/* Presided By */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Scale className="w-4 h-4 text-bdGreen-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">
                          {lang === 'bn' ? 'বিচারিক পদমর্যাদা: ' : 'Bench / Presiding Authority: '}
                        </span>
                        <span>{lang === 'bn' ? court.presidedByBn : court.presidedBy}</span>
                      </div>
                    </div>

                    {/* Jurisdiction Description */}
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {lang === 'bn' ? court.jurisdictionBn : court.jurisdiction}
                      </p>
                    </div>

                    {/* Key Case Types Handled */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {lang === 'bn' ? 'প্রধান মামলা ও অধিক্ষেত্র:' : 'Key Case Jurisdictions:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {court.caseTypes.map((type, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-lg"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Address & Contact Info */}
                    <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-bdRed-500 shrink-0 mt-0.5" />
                        <span>{lang === 'bn' ? court.addressBn : court.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-bdGreen-700 shrink-0" />
                          <span>{court.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-[11px]">{court.workingHours}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(court)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-bdGreen-900 transition-colors"
                    >
                      {copiedId === court.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">{lang === 'bn' ? 'ঠিকানা কপি হয়েছে' : 'Copied Address'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lang === 'bn' ? 'ঠিকানা কপি করুন' : 'Copy Court Address'}</span>
                        </>
                      )}
                    </button>

                    {/* Find Advocates in THIS Selected Court / District Area */}
                    <Link
                      to={`/lawyers?division=${encodeURIComponent(court.division)}&district=${encodeURIComponent(court.district)}&court=${encodeURIComponent(court.name)}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-bdGreen-800 text-bdGreen-900 hover:text-white border border-emerald-300 hover:border-bdGreen-800 text-xs font-bold rounded-xl transition-all shadow-2xs group"
                    >
                      <Users className="w-3.5 h-3.5 text-bdGreen-800 group-hover:text-white transition-colors" />
                      <span>
                        {lang === 'bn'
                          ? `${court.districtBn}-এর আইনজীবী দেখুন`
                          : `Find Advocates in ${court.district}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION (Finding Legal Representation)
            ========================================================================= */}
        <div className="mt-14 bg-gradient-to-r from-bdGreen-900 to-bdGreen-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">
              {lang === 'bn'
                ? 'আপনার জেলার আদালতে সরাসরি সনদপ্রাপ্ত আইনজীবী খুঁজছেন?'
                : 'Need Verified Bar Council Advocates in Your District?'}
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              {lang === 'bn'
                ? 'বাংলাদেশের সকল ৬৪ জেলা আদালত ও সুপ্রিম কোর্টের সনদপ্রাপ্ত বিজ্ঞ আইনজীবীদের চেম্বার ও ভিডিও পরামর্শ বুক করুন।'
                : 'Connect directly with verified Bar Council enrolled advocates across all 64 District Bar Associations and the Supreme Court of Bangladesh.'}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/lawyers"
              className="px-5 py-3 bg-white text-bdGreen-900 hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-md"
            >
              {lang === 'bn' ? 'সকল আইনজীবী দেখুন' : 'Browse All Advocates'}
            </Link>
            <Link
              to="/ai-assistant"
              className="px-5 py-3 bg-bdGreen-800/80 hover:bg-bdGreen-800 text-white text-xs sm:text-sm font-bold rounded-xl border border-emerald-600/50 transition-colors"
            >
              {lang === 'bn' ? 'এআই আইনি সহায়তা' : 'Ask AI Assistant'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
