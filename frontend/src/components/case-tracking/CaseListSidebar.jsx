import React from 'react';
import { Briefcase, Building2, Calendar } from 'lucide-react';
import { getStatusInfo, getDaysUntil } from './caseConstants';

export default function CaseListSidebar({ cases, selectedCase, onSelectCase, isBn }) {
  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
        <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-xs font-semibold text-slate-500">
          {isBn ? 'কোনো মামলা পাওয়া যায়নি।' : 'No matching cases found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cases.map((c) => {
        const meta = getStatusInfo(c.status);
        const active = selectedCase?.id === c.id;
        const daysLeft = getDaysUntil(c.next_hearing_date);

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectCase(c.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2.5 ${
              active
                ? 'bg-white border-bdGreen-800 ring-2 ring-bdGreen-800/15 shadow-md'
                : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {c.category}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${meta.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                {isBn ? meta.bnLabel : meta.enLabel}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-900 leading-snug">{c.title}</h3>

            <div className="text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-bdGreen-700 shrink-0" />
                <span className="truncate">{c.court_name}</span>
              </div>
              {c.next_hearing_date && (
                <div className="flex items-center justify-between gap-2 text-bdGreen-900 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bdRed-500 shrink-0" />
                    <span>
                      {c.next_hearing_date}
                      {c.next_hearing_time ? ` · ${c.next_hearing_time}` : ''}
                    </span>
                  </span>
                  {daysLeft !== null && daysLeft >= 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-bdRed-600 font-bold">
                      {daysLeft === 0 ? 'Today' : `${daysLeft}d`}
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
