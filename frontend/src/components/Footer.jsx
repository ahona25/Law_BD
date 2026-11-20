import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, HeartHandshake, PhoneCall, ShieldCheck, ExternalLink, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-bdDark-900 text-slate-300 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-bdGreen-800 text-white shadow-md border border-emerald-700/50">
                <div className="absolute w-4 h-4 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
                <Scale className="relative z-10 w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                Law<span className="text-bdRed-500 font-sans">_</span>BD
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              {t('footerDesc')}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bdGreen-500 shrink-0" />
                <span>Dhaka Court & Supreme Court Area, Ramna, Dhaka-1000, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bdGreen-500 shrink-0" />
                <span>support@lawbd.gov.bd · helpline@lawbd.org</span>
              </div>
            </div>
          </div>



          {/* Quick Legal Areas */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {lang === 'bn' ? 'প্রধান আইনি বিষয়' : 'Key Legal Domains'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/laws?category=property" className="hover:text-emerald-300 transition-colors">Land & Property Disputes</Link></li>
              <li><Link to="/laws?category=criminal" className="hover:text-emerald-300 transition-colors">Criminal Defense & Bail (CrPC)</Link></li>
              <li><Link to="/laws?category=cheque" className="hover:text-emerald-300 transition-colors">Section 138 NI Act Cheque Bounce</Link></li>
              <li><Link to="/laws?category=family" className="hover:text-emerald-300 transition-colors">Divorce & Dower (Denmohur)</Link></li>
              <li><Link to="/laws?category=cyber" className="hover:text-emerald-300 transition-colors">Cybercrime & Online Blackmail</Link></li>
              <li><Link to="/laws?category=labour" className="hover:text-emerald-300 transition-colors">Labour Law & Wrongful Retrenchment</Link></li>
            </ul>
          </div>

          {/* Platform Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {lang === 'bn' ? 'সেবাসমূহ' : 'Platform Tools'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/courts" className="hover:text-emerald-300 transition-colors">{lang === 'bn' ? 'বাংলাদেশ আদালত ডিরেক্টরি' : 'Bangladesh Courts Directory'}</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-emerald-300 transition-colors">Grounded AI Legal Assistant</Link></li>
              <li><Link to="/lawyers" className="hover:text-emerald-300 transition-colors">Find Verified Bar Advocates</Link></li>
              <li><Link to="/templates" className="hover:text-emerald-300 transition-colors">Legal Notices & GD Drafts</Link></li>
              <li><Link to="/awareness" className="hover:text-emerald-300 transition-colors">Bilingual Legal Dictionary</Link></li>
              <li><Link to="/emergency" className="hover:text-emerald-300 transition-colors">Emergency Legal Aid & Hotlines</Link></li>
            </ul>
          </div>



          {/* Official Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              {lang === 'bn' ? 'সরকারি রেফারেন্স' : 'Official Sources'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="http://bdlaws.minlaw.gov.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                  <span>Bangladesh Code (Laws)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://supremecourt.gov.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                  <span>Supreme Court of Bangladesh</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="http://www.barcouncil.gov.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                  <span>Bangladesh Bar Council</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://land.gov.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                  <span>Ministry of Land (e-Namjari)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://police.gov.bd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                  <span>Bangladesh Police Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>




        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-bdDark-950 border border-emerald-950/80 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-bdRed-400 mb-1">
            {lang === 'bn' ? 'আইনি সতর্কবার্তা (Statutory Disclaimer):' : 'Mandatory Statutory Disclaimer:'}
          </p>
          <p>
            {t('disclaimer')}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} <strong>Law_BD</strong>. {t('rightsReserved')}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/emergency" className="hover:text-white">Emergency Help</Link>
            <Link to="/laws" className="hover:text-white">Bangladesh Code</Link>
            <Link to="/templates" className="hover:text-white">Legal Checklists</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
