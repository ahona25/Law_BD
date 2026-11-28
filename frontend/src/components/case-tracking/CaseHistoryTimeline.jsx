import React from 'react';

export default function CaseHistoryTimeline({ history = [], onOpenAddNote, isBn }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900">
          {isBn
            ? 'মামলার কালানুক্রমিক কার্যক্রম (নিবন্ধন থেকে সর্বশেষ আপডেট)'
            : 'Chronological Case Activity Timeline'}
        </h3>
        <button
          type="button"
          onClick={onOpenAddNote}
          className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
        >
          {isBn ? '+ নতুন আপডেট যোগ করুন' : '+ Add Activity Note'}
        </button>
      </div>

      <ol className="relative border-l-2 border-amber-200 ml-3 space-y-5 pl-6 py-1">
        {history.map((entry, idx) => (
          <li key={entry.id || idx} className="relative">
            <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-600 ring-4 ring-white border border-amber-300" />
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/35 to-slate-50 border border-amber-200/70 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-xs text-slate-900">{entry.title}</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white border border-amber-200/80 text-amber-900">
                  {entry.date}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{entry.details}</p>
              {entry.actor && (
                <p className="text-[10px] font-semibold text-amber-800">
                  {isBn ? 'মাধ্যম:' : 'Recorded by:'} {entry.actor}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
