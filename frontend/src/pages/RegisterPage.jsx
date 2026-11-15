import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, User, Phone, MapPin, ShieldCheck, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [role, setRole] = useState('client'); // 'client' | 'lawyer'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [barCouncilNo, setBarCouncilNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await register({
        name,
        email,
        password,
        role,
        phone,
        location,
        barCouncilNo: role === 'lawyer' ? barCouncilNo : undefined
      });

      if (res.success) {
        if (role === 'lawyer') navigate('/dashboard/lawyer');
        else navigate('/dashboard/client');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-bdGreen-800 text-white flex items-center justify-center mx-auto shadow-md relative">
            <div className="absolute w-6 h-6 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
            <Scale className="relative z-10 w-7 h-7 text-white" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-slate-900">
            Create Law_BD Account
          </h1>
          <p className="text-xs text-slate-500">
            Join the digital legal platform of Bangladesh as a citizen or verified advocate.
          </p>
        </div>

        {/* Account Role Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'client'
                ? 'bg-white text-bdGreen-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Citizen / Client</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('lawyer')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'lawyer'
                ? 'bg-bdGreen-800 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Advocate / Lawyer</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-bdRed-600 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Legal Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'lawyer' ? 'Adv. Md. Kamrul Islam' : 'Mohammad Rahim'}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Create Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Mobile Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01711XXXXXX"
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">District / Division:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800 bg-white"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Rangpur">Rangpur</option>
              </select>
            </div>
          </div>

          {/* Advocate Specific: Bar Council Roll */}
          {role === 'lawyer' && (
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
              <label className="block text-bdGreen-900 font-bold">
                Bangladesh Bar Council Enrollment Roll No:
              </label>
              <input
                type="text"
                value={barCouncilNo}
                onChange={(e) => setBarCouncilNo(e.target.value)}
                placeholder="E.g. BC/DH-10492/2018"
                className="w-full p-2.5 rounded-xl border border-emerald-300 text-xs font-mono focus:outline-none focus:border-bdGreen-800"
                required={role === 'lawyer'}
              />
              <p className="text-[10px] text-slate-500">
                Subject to administrative verification against official Bangladesh Bar Council records.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-bdGreen-800 hover:bg-bdGreen-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all shadow-md"
          >
            {loading ? 'Registering Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="text-bdGreen-800 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
