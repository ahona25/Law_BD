import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Briefcase,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AuthShell, { AuthRoleTabs, AUTH_INPUT_CLASS } from '../components/AuthShell';

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [roleTab, setRoleTab] = useState('client');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showHelpHint, setShowHelpHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isBn = lang === 'bn';

  const navigateByRole = (userRole) => {
    if (userRole === 'lawyer') navigate('/dashboard/lawyer');
    else if (userRole === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard/client');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email.trim(), password);
      if (res.success) {
        navigateByRole(res.user.role);
      }
    } catch (err) {
      setError(
        err.message ||
        (isBn
          ? 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে সঠিক ইমেইল এবং পাসওয়ার্ড দিন।'
          : 'Invalid credentials. Please verify your email and password.')
      );
    } finally {
      setLoading(false);
    }
  };


  const handleDemo = async (targetRole) => {
    setLoading(true);
    setError('');
    try {
      const res = await demoLogin(targetRole);
      if (res.success) {
        navigateByRole(targetRole);
      }
    } catch (err) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  const features = isBn
    ? [
      'বাংলাদেশ বার কাউন্সিল যাচাইকৃত আইনজীবীদের সাথে সরাসরি পরামর্শ',
      'সুরক্ষিত ও গোপনীয় কেস ভল্ট এবং অ্যাপয়েন্টমেন্ট পাস',
      'দ্বিভাষিক আইনি তথ্য ও জরুরি সহায়তা নির্দেশিকা'
    ]
    : [
      'Direct consultations with Bar Council verified advocates',
      'Encrypted case vault, documents & appointment passes',
      'Bilingual statutory guidance & 24/7 victim support access'
    ];


  return (
    <AuthShell
      badgeText={isBn ? 'নিরাপদ ও যাচাইকৃত প্রবেশাধিকার' : 'Trusted & Verified Access'}
      asideTitle={
        isBn
          ? 'ন্যায়বিচার, স্বচ্ছতা এবং বিশ্বস্ত আইনি সহায়তা'
          : 'Justice, Clarity & Trusted Advocacy'
      }
      asideSubtitle={
        isBn
          ? 'আপনার আইনি নথি, পরামর্শের সময়সূচি এবং আইনজীবীর সাথে নিরাপদ যোগাযোগ এক জায়গায় পরিচালনা করুন।'
          : 'Manage your legal filings, consultation passes, and confidential advocate communications in one unified portal.'
      }
      features={features}
      heading={isBn ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'Sign in to your account'}
      subheading={
        isBn
          ? 'চালিয়ে যেতে আপনার ভূমিকা নির্বাচন করুন এবং তথ্য দিন।'
          : 'Select your portal role and enter your credentials to continue.'
      }
    >
      <AuthRoleTabs
        role={roleTab}
        onChange={(nextRole) => {
          setRoleTab(nextRole);
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            {roleTab === 'lawyer'
              ? isBn
                ? 'আইনজীবীর ইমেইল'
                : 'Advocate Email Address'
              : isBn
                ? 'ইমেইল ঠিকানা'
                : 'Email Address'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={roleTab === 'lawyer' ? 'tanvir@lawbd.com' : 'client@lawbd.com'}
              className={AUTH_INPUT_CLASS}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <button
              type="button"
              onClick={() => setShowHelpHint((prev) => !prev)}
              className="text-xs font-medium text-bdGreen-700 hover:text-bdGreen-800 hover:underline"
            >
              {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${AUTH_INPUT_CLASS} pr-11`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {showHelpHint && (
            <p className="mt-2 text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              {isBn
                ? 'ডেমো অ্যাকাউন্টের পাসওয়ার্ড: password123 অথবা নিচের তাৎক্ষণিক ডেমো প্রবেশ ব্যবহার করুন।'
                : 'For seeded demo accounts, use password "password123" or sign in instantly with Quick Demo Access below.'}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-bdGreen-800 focus:ring-bdGreen-800"
            />
            <span>{isBn ? 'এই ডিভাইসে সাইন ইন রাখুন' : 'Keep me signed in'}</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-bdGreen-800 hover:bg-bdGreen-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-bdGreen-900/15 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Signing in...'}</span>
            </>
          ) : (
            <>
              <span>
                {roleTab === 'lawyer'
                  ? isBn
                    ? 'আইনজীবী চেম্বারে লগইন করুন'
                    : 'Sign In to Advocate Chamber'
                  : isBn
                    ? 'সাইন ইন করুন'
                    : 'Sign In'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-1 space-y-3">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="shrink-0 mx-3 text-[11px] font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {isBn ? 'তাৎক্ষণিক ডেমো প্রবেশ' : 'Quick Demo Access'}
          </span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleDemo('client')}
            className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/70 hover:border-emerald-300 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <User className="w-3.5 h-3.5 text-bdGreen-700" />
            <span>Rahim</span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleDemo('lawyer')}
            className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/70 hover:border-emerald-300 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Briefcase className="w-3.5 h-3.5 text-bdGreen-800" />
            <span>Tanvir</span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleDemo('admin')}
            className="py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      <p className="text-center text-xs sm:text-sm text-slate-500 pt-2 border-t border-slate-100">
        {isBn ? 'নতুন ব্যবহারকারী?' : "Don't have an account?"}{' '}
        <Link to="/register" className="text-bdGreen-800 font-semibold hover:underline">
          {isBn ? 'এখানে নিবন্ধন করুন' : 'Create an account'}
        </Link>
      </p>
    </AuthShell>
  );
}
