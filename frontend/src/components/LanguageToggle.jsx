import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


export default function LanguageToggle({ className = '', compact = false }) {
  const { lang, toggleLanguage } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isBn ? 'Switch website language to English' : 'ওয়েবসাইটের ভাষা বাংলায় পরিবর্তন করুন'}
      title={isBn ? 'Convert to English' : 'বাংলায় রূপান্তর করুন'}
      className={`inline-flex items-center gap-1.5 rounded-xl border text-xs 2xl:text-sm font-bold transition-all shadow-2xs shrink-0 whitespace-nowrap bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border-slate-200 hover:border-emerald-300 ${compact ? 'px-2 py-1.5' : 'px-3 py-1.5'
        } ${className}`}
    >
      <Languages className="w-3.5 h-3.5 text-bdGreen-700 shrink-0" />
      <span className={isBn ? 'font-sans font-bold' : 'font-bangla font-semibold'}>
        {isBn ? 'English' : 'বাংলা'}
      </span>
    </button>
  );
}
