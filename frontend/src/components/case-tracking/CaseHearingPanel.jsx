import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { getStatusInfo, getDaysUntil } from './caseConstants';

export default function CaseHearingPanel({ selectedCase, hearingNotifications, isBn }) {
  const statusInfo = getStatusInfo(selectedCase.status);
  const daysLeft = getDaysUntil(selectedCase.next_hearing_date);

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50/80 to-emerald-50/60 border border-teal-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-teal-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-700" />
            <span>{isBn ? 'শুনানির তারিখ ব্যবস্থাপনা' : 'Hearing Date Management'}</span>
          </h3>
          {daysLeft !== null && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-teal-300 text-teal-900 shadow-2xs">
              {daysLeft < 0
                ? isBn
                  ? 'অতীত তারিখ'
                  : 'Past date'
                : daysLeft === 0
                ? isBn
                  ? 'আজ শুনানি'
                  : 'Hearing Today'
                : isBn
                ? `${daysLeft} দিন বাকি`
                : `${daysLeft} days remaining`}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {isBn ? 'পরবর্তী শুনানির তারিখ' : 'Next Hearing Date'}
            </span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">
              {selectedCase.next_hearing_date || (isBn ? 'নির্ধারিত হয়নি' : 'Not scheduled yet')}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {isBn ? 'শুনানির সময়' : 'Hearing Time'}
            </span>
            <span className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-bdGreen-700" />
              <span>
                {selectedCase.next_hearing_time || (isBn ? 'উল্লেখ নেই' : 'To be announced')}
              </span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {isBn ? 'আদালতের নাম' : 'Court Name'}
            </span>
            <span className="text-xs font-bold text-slate-900 mt-1 block leading-snug">
              {selectedCase.court_name || 'Pending Jurisdiction'}
            </span>
          </div>
        </div>

        {hearingNotifications.length > 0 && (
          <div className="pt-2 border-t border-emerald-200/70 space-y-2">
            <span className="text-[11px] font-bold text-bdGreen-900 block">
              {isBn ? 'শুনানির তারিখ পরিবর্তনের বিজ্ঞপ্তি:' : 'Hearing Schedule Change Alerts:'}
            </span>
            {hearingNotifications.slice(0, 2).map((hn) => (
              <div
                key={hn.id}
                className="p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-xs text-slate-700 flex items-center justify-between gap-2"
              >
                <span>{hn.message}</span>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {new Date(hn.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="text-[11px] font-bold uppercase text-slate-400">
            {isBn ? 'বর্তমান অবস্থা' : 'Current Case Status'}
          </span>
          <p className="font-bold text-sm text-slate-900">
            {isBn ? statusInfo.bnLabel : statusInfo.enLabel}
          </p>
          <p className="text-xs text-slate-600">
            {isBn ? statusInfo.bnDesc : statusInfo.enDesc}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <span className="text-[11px] font-bold uppercase text-slate-400">
            {isBn ? 'সংশ্লিষ্ট আইনসমূহ' : 'Applicable Statutes'}
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(selectedCase.related_laws || []).map((law) => (
              <span
                key={law}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-bdGreen-900"
              >
                {law}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
