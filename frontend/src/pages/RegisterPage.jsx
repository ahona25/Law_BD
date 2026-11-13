import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
  BadgeCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AuthShell, { AuthRoleTabs, AUTH_INPUT_CLASS } from '../components/AuthShell';

const BD_DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh'
];

export default function RegisterPage() {
  const { register } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [barCouncilNo, setBarCouncilNo] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isBn = lang === 'bn';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError(
        isBn
          ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'
          : 'Password must be at least 6 characters long.'
      );
      return;
    }


    if (password !== confirmPassword) {
      setError(
        isBn
          ? 'পাসওয়ার্ড দুটি মিলছে না। অনুগ্রহ করে পুনরায় যাচাই করুন।'
          : 'Passwords do not match. Please verify both fields.'
      );
      return;
    }

    if (!acceptedTerms) {
      setError(
        isBn
          ? 'চালিয়ে যেতে অনুগ্রহ করে শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত হন।'
          : 'Please accept the platform terms and privacy policy to continue.'
      );
      return;
    }


    setLoading(true);
    try {
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        phone: phone.trim(),
        location,
        barCouncilNo: role === 'lawyer' ? barCouncilNo.trim() : undefined
      });

      if (res.success) {
        if (role === 'lawyer') navigate('/dashboard/lawyer');
        else navigate('/dashboard/client');
      }
    } catch (err) {
      setError(
        err.message ||
        (isBn ? 'নিবন্ধন সম্পন্ন করা যায়নি।' : 'Registration failed. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const features = isBn
    ? [
      'নাগরিকদের জন্য দ্রুত আইনি পরামর্শ ও কেস ট্র্যাকিং সুবিধা',
      'আইনজীবীদের জন্য বাংলাদেশ বার কাউন্সিল যাচাইকৃত প্রোফাইল',
      'তথ্য গোপনীয়তা এবং নিরাপদ ডিজিটাল ডকুমেন্ট ব্যবস্থাপনা'
    ]
    : [
      'Fast consultation booking & case tracking for citizens',
      'Verified Bar Council chamber profiles for advocates',
      'Confidential document storage & bilingual legal resources'
    ];



  return (
    <AuthShell
      badgeText={isBn ? 'বিনামূল্যে পোর্টাল নিবন্ধন' : 'Free Digital Legal Onboarding'}
      asideTitle={
        isBn
          ? 'বাংলাদেশের ডিজিটাল আইনি নেটওয়ার্কে যুক্ত হন'
          : 'Join Bangladesh’s Digital Legal Network'
      }
      asideSubtitle={
        isBn
          ? 'আইনি সহায়তা খুঁজছেন এমন নাগরিক হিসেবে অথবা যাচাইকৃত আইনজীবী হিসেবে আপনার অ্যাকাউন্ট তৈরি করুন।'
          : 'Create a secure account as a citizen seeking legal clarity or an enrolled advocate offering verified counsel.'
      }
      features={features}
      heading={isBn ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create your account'}
      subheading={
        isBn
          ? 'আপনার ভূমিকা নির্বাচন করুন এবং নিচের তথ্যগুলো পূরণ করুন।'
          : 'Choose your role and complete your profile details to get started.'
      }
    >
      <AuthRoleTabs
        role={role}
        onChange={(nextRole) => {
          setRole(nextRole);
          setError('');
        }}
      />

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 text-bdRed-700 rounded-xl text-xs font-medium"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
            {isBn ? 'পূর্ণ আইনি নাম' : 'Full Legal Name'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'lawyer' ? 'Adv. Md. Kamrul Islam' : 'Mohammad Rahim'}
              className={AUTH_INPUT_CLASS}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={AUTH_INPUT_CLASS}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isBn ? 'মোবাইল নম্বর' : 'Mobile Number'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="reg-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01711-XXXXXX"
                className={AUTH_INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <label htmlFor="reg-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isBn ? 'বিভাগ / জেলা' : 'Division / District'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="reg-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${AUTH_INPUT_CLASS} pr-8 cursor-pointer`}
              >
                {BD_DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <div>
            <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
            </label>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className={`${AUTH_INPUT_CLASS} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-confirm-password"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="reg-confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={AUTH_INPUT_CLASS}
                required
              />
            </div>
          </div>
        </div>

        {role === 'lawyer' && (
          <div className="p-3.5 bg-emerald-50/75 rounded-xl border border-emerald-200/90 space-y-2">
            <label
              htmlFor="reg-bar-council"
              className="flex items-center gap-1.5 text-xs font-bold text-bdGreen-900"
            >
              <BadgeCheck className="w-4 h-4 text-bdGreen-700" />
              <span>
                {isBn
                  ? 'বাংলাদেশ বার কাউন্সিল এনরোলমেন্ট রোল নম্বর'
                  : 'Bangladesh Bar Council Enrollment Roll No.'}
              </span>
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-bdGreen-700/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="reg-bar-council"
                type="text"
                value={barCouncilNo}
                onChange={(e) => setBarCouncilNo(e.target.value)}
                placeholder="BC/DH-10492/2018"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-bdGreen-800 focus:ring-4 focus:ring-bdGreen-800/10"
                required={role === 'lawyer'}
              />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isBn
                ? 'প্রশাসনিক যাচাইকরণের মাধ্যমে বাংলাদেশ বার কাউন্সিলের রেকর্ডের সাথে মিলিয়ে দেখা হবে।'
                : 'Subject to administrative verification against official Bangladesh Bar Council records.'}
            </p>
          </div>
        )}

        <label className="flex items-start gap-2.5 pt-0.5 text-xs text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-bdGreen-800 focus:ring-bdGreen-800"
          />
          <span className="leading-relaxed">
            {isBn
              ? 'আমি Law_BD-এর গোপনীয়তা নীতি ও ডিজিটাল আইনি পোর্টালের শর্তাবলীতে সম্মত।'
              : 'I agree to the Law_BD Privacy Policy and Digital Legal Portal terms of use.'}
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-bdGreen-800 hover:bg-bdGreen-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-bdGreen-900/15 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isBn ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Creating account...'}</span>
            </>
          ) : (
            <>
              <span>
                {role === 'lawyer'
                  ? isBn
                    ? 'আইনজীবী অ্যাকাউন্ট তৈরি করুন'
                    : 'Register as Advocate'
                  : isBn
                    ? 'নাগরিক অ্যাকাউন্ট তৈরি করুন'
                    : 'Create Citizen Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs sm:text-sm text-slate-500 pt-2 border-t border-slate-100">
        {isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
        <Link to="/login" className="text-bdGreen-800 font-semibold hover:underline">
          {isBn ? 'এখানে সাইন ইন করুন' : 'Sign in here'}
        </Link>
      </p>
    </AuthShell>
  );
}
