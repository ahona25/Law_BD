import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Video,
  Phone,
  Bookmark,
  Share2,
  Star,
  Award,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import { api } from '../services/api';

export default function LawyerProfilePage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { savedLawyers, toggleLawyerBookmark } = useBookmarks();

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getLawyerById(id).then(res => {
      if (res.success) setLawyer(res.lawyer);
    }).catch(err => {
      console.error('Failed to load lawyer profile:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await api.addLawyerReview(id, {
        rating: reviewRating,
        comment: reviewComment
      });
      if (res.success) {
        setReviewSuccess(true);
        setReviewComment('');


        const updated = await api.getLawyerById(id);
        if (updated.success) setLawyer(updated.lawyer);
      }
    } catch (err) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-bdGreen-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold">Advocate Profile Not Found</h2>
          <Link to="/lawyers" className="mt-4 inline-block px-4 py-2 bg-bdGreen-800 text-white rounded-lg text-xs font-semibold">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedLawyers.includes(Number(lawyer.id));

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/lawyers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bdGreen-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Advocates Directory</span>
          </Link>
        </div>



        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-3xl bg-bdGreen-800 text-white font-serif font-bold text-3xl flex items-center justify-center shrink-0 shadow-md">
                {lawyer.initials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                    {lawyer.name}
                  </h1>
                  {lawyer.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-bdGreen-800 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Bar Council Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500">{lawyer.courtLevel}</p>
                <p className="text-xs text-slate-600 font-mono mt-1">
                  Roll No: <strong>{lawyer.barCouncilNo}</strong> · Association: <strong>{lawyer.association}</strong>
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <span className="font-bold text-emerald-700">★ {lawyer.rating} ({lawyer.reviewsCount} verified reviews)</span>
                  <span className="text-slate-300">|</span>
                  <span className="font-semibold text-slate-700">{lawyer.experienceYears} Years Experience</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-bdGreen-800 font-semibold">{lawyer.successRate || 'High Court Enrolled'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleLawyerBookmark(lawyer.id)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-colors ${isSaved ? 'bg-rose-50 border-rose-200 text-bdRed-600' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}



              >
                <Bookmark className="w-5 h-5" />
              </button>
              <Link
                to={`/booking/${lawyer.id}`}
                className="px-6 py-3.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Consultation Fee Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-bdGreen-700" />
                  <span>Video Consultation</span>
                </span>
                <p className="font-bold text-xl text-bdGreen-900 mt-1">৳{lawyer.feeVideo || 1500}</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-bdGreen-700 bg-white px-2 py-1 rounded">30 Mins</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-bdRed-500" />
                  <span>In-Person Chamber</span>
                </span>
                <p className="font-bold text-xl text-slate-900 mt-1">৳{lawyer.feeInPerson || 2000}</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-600 bg-white px-2 py-1 rounded">Chamber Visit</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Phone Advice</span>
                </span>
                <p className="font-bold text-xl text-slate-900 mt-1">৳{lawyer.feePhone || 1000}</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-600 bg-white px-2 py-1 rounded">20 Mins</span>
            </div>
          </div>

          {/* Bio & Academic Qualifications */}
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Professional Biography</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{lawyer.bio}</p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Academic Qualifications & Bar Admissions</h3>
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-medium">
                {lawyer.qualification}
              </p>
            </div>

            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Chamber & Practice Location</h3>
              <p className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bdRed-500 shrink-0 mt-0.5" />
                <span>{lawyer.chamberAddress}</span>
              </p>
            </div>
          </div>
        </div>




        {/* Client Reviews Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Verified Client Reviews & Testimonials
            </h3>
            <span className="text-xs font-bold text-emerald-700">
              ★ {lawyer.rating} Average Score
            </span>
          </div>

          {/* Existing reviews */}
          <div className="space-y-4 mb-8">
            {lawyer.clientReviews && lawyer.clientReviews.length > 0 ? (
              lawyer.clientReviews.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">{r.client_name}</span>
                    <span className="text-amber-500 font-bold">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">{new Date(r.created_at).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No public reviews written yet for this advocate.</p>
            )}
          </div>

          {/* Submit a review form */}
          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="font-bold text-sm text-slate-800">Leave a Verified Consultation Review:</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Your Rating:</span>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="p-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                  <option value={4}>★★★★☆ (4 Stars - Good)</option>
                  <option value={3}>★★★☆☆ (3 Stars - Satisfactory)</option>
                </select>
              </div>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience regarding legal clarity, professionalism, and responsiveness..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
              />
              <button
                type="submit"
                disabled={submittingReview || !reviewComment.trim()}
                className="px-5 py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Post Client Review'}
              </button>
              {reviewSuccess && (
                <span className="text-xs text-emerald-700 font-semibold ml-3">Review submitted successfully!</span>
              )}
            </form>
          ) : (
            <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 text-center">
              Please <Link to="/login" className="text-bdGreen-800 font-bold underline">Sign In</Link> to post a verified client review.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
