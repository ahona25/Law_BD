import React from 'react';
import { PhoneCall, ShieldAlert, HeartHandshake, Laptop, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EmergencyBanner() {
  const { lang } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-bdDark-900 via-bdGreen-900 to-bdDark-900 text-white text-xs border-b border-bdGreen-700/40 py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bdRed-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-bdRed-500"></span>
          </span>
          <span className="font-semibold text-bdRed-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {lang === 'bn' ? 'জাতীয় জরুরি আইনি সহায়তা হেল্পলাইন:' : 'National 24/7 Legal Emergency Hotlines:'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="tel:16430"
            className="flex items-center gap-1.5 hover:text-bdRed-400 transition-colors font-medium text-emerald-200"
            title="Free Legal Aid, Ministry of Law"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-bdRed-500" />
            <span>{lang === 'bn' ? 'আইনি সহায়তা:' : 'Govt Legal Aid:'} <strong>16430</strong> (Toll Free)</span>
          </a>

          <a
            href="tel:999"
            className="flex items-center gap-1.5 hover:text-bdRed-400 transition-colors font-medium text-emerald-200"
            title="National Police Emergency"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-bdRed-500" />
            <span>{lang === 'bn' ? 'জরুরি পুলিশ:' : 'Police:'} <strong>999</strong></span>
          </a>

          <a
            href="tel:109"
            className="flex items-center gap-1.5 hover:text-bdRed-400 transition-colors font-medium text-emerald-200"
            title="Violence Against Women & Children"
          >
            <PhoneCall className="w-3.5 h-3.5 text-bdRed-500" />
            <span>{lang === 'bn' ? 'নারী ও শিশু:' : 'Women & Child:'} <strong>109</strong></span>
          </a>

          <a
            href="tel:01320010148"
            className="hidden md:flex items-center gap-1.5 hover:text-bdRed-400 transition-colors font-medium text-emerald-200"
            title="CID Cyber Police Centre"
          >
            <Laptop className="w-3.5 h-3.5 text-bdRed-500" />
            <span>{lang === 'bn' ? 'সিআইডি সাইবার:' : 'CID Cyber:'} <strong>01320-010148</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
}
