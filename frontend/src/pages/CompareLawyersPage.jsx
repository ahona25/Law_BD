import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Video,
  Phone,
  ArrowRight,
  ArrowLeft,
  X,
  User
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function CompareLawyersPage() {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const [comparedLawyers, setComparedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const idsParam = searchParams.get('ids') || '1,2,3';

  useEffect(() => {
    const ids = idsParam.split(',').map(id => Number(id)).filter(Boolean);
    if (ids.length > 0) {
      setLoading(true);
      api.compareLawyers(ids).then(res => {
        if (res.success) setComparedLawyers(res.lawyers);
      }).catch(err => {
        console.error('Failed to compare lawyers:', err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [idsParam]);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/lawyers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bdGreen-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Advocates Directory</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Advocate Evaluation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Compare Advocates Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Directly compare consultation fees, credentials, courtroom admissions, and experience before booking your appointment.
          </p>
        </div>

        {loading ? (
          <div className="h-96 bg-white rounded-3xl border border-slate-200 animate-pulse"></div>
        ) : comparedLawyers.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-5 font-bold text-slate-400 uppercase text-[11px] w-1/4">Criteria</th>
                    {comparedLawyers.map((l) => (
                      <th key={l.id} className="p-5 w-1/4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-bdGreen-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                            {l.initials}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1">
                              {l.name}
                              {l.verified && <ShieldCheck className="w-4 h-4 text-bdGreen-600 inline" />}
                            </h3>
                            <span className="text-[10px] text-slate-400 font-mono">Roll: {l.barCouncilNo}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Court Level</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 font-semibold text-slate-800">{l.courtLevel}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Experience</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 font-bold text-slate-900">{l.experienceYears} Years Practice</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Client Rating</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 text-emerald-700 font-bold">★ {l.rating} ({l.reviewsCount} reviews)</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Video Consultation</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 font-serif font-bold text-base text-bdGreen-900">৳{l.feeVideo || 1800}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">In-Person Chamber Fee</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 font-serif font-bold text-base text-slate-900">৳{l.feeInPerson || 2500}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Specialties</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 text-slate-600">{l.specialties?.join(', ')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Chamber Location</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4 text-slate-600 text-[11px] leading-relaxed">{l.chamberAddress}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Action</td>
                    {comparedLawyers.map((l) => (
                      <td key={l.id} className="p-4">
                        <Link
                          to={`/booking/${l.id}`}
                          className="w-full py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>Book Slot</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <User className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Advocates Selected to Compare</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Select advocates from the directory by clicking "Compare" on their cards.
            </p>
            <Link to="/lawyers" className="px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-bold inline-block">
              Browse Directory
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
