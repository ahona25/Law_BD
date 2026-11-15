import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Scale, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AmendmentsPage() {
  const { lang } = useLanguage();

  const amendments = [
    {
      act: 'Land Crime Prevention and Redress Act, 2023 (Act No. 28 of 2023)',
      bangla: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩',
      effectiveDate: 'September 18, 2023',
      previousLaw: 'General Penal Code and protracted civil title suits',
      keyChanges: [
        'Recognized violent land grabbing, forceful dispossession, and forged deed fabrication as non-bailable criminal offenses punishable by up to 7 years rigorous imprisonment.',
        'Empowered Executive Magistrates to conduct summary proceedings and order immediate eviction of unauthorized occupants.',
        'Criminalized creating multiple duplicate registered deeds for the same plot.'
      ],
      link: '/laws/law-land-disputes'
    },
    {
      act: 'Cyber Security Act, 2023 (Act No. 27 of 2023)',
      bangla: 'সাইবার নিরাপত্তা আইন, ২০২৩',
      effectiveDate: 'September 18, 2023',
      previousLaw: 'Digital Security Act, 2018 (Repealed)',
      keyChanges: [
        'Substituted jail terms with fines for defamation claims under Section 29.',
        'Retained non-bailable rigorous imprisonment for critical information infrastructure hacking, identity theft, and online extortion.',
        'Streamlined technical investigation protocols under National Cyber Security Agency.'
      ],
      link: '/laws/law-cyber-crime'
    },
    {
      act: 'Family Courts Act, 2023 (Act No. 7 of 2023)',
      bangla: 'পারিবারিক আদালত আইন, ২০২৩',
      effectiveDate: 'February 2023',
      previousLaw: 'Family Court Ordinance, 1985 (Repealed)',
      keyChanges: [
        'Enhanced monetary jurisdiction of Family Courts to decree maintenance and dower (Denmohur).',
        'Authorized direct civil detention of defaulting spouses refusing to pay awarded dower.',
        'Established dedicated appellate benches to expedite child custody disputes within 6 months.'
      ],
      link: '/laws/law-divorce-family'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-bdGreen-800 text-xs font-bold uppercase mb-3">
            <Clock className="w-4 h-4" />
            <span>Statutory Amendment Tracker</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Bangladesh Law Amendments & Reform Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Detailed breakdown of major statutory changes passed by the National Parliament of Bangladesh (Jatiya Sangsad).
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-8">
          {amendments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-bdGreen-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Enacted: {item.effectiveDate}
                </span>
                <span className="text-xs text-slate-400">Official Bangladesh Gazette</span>
              </div>

              <div>
                <h2 className="font-serif font-bold text-xl text-slate-900">{item.act}</h2>
                <h3 className="font-bold text-base text-bdGreen-800 font-bangla mt-1">{item.bangla}</h3>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                <strong>Replaced / Reformed Framework:</strong> {item.previousLaw}
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">
                  Key Legal Reforms & Statutory Shifts:
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {item.keyChanges.map((change, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-bdGreen-600 shrink-0 mt-0.5" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Link
                  to={item.link}
                  className="px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View Full Statute & Sections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
