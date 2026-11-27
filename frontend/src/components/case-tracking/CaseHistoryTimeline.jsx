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
          className="text-xs font-bold text-bdGreen-800 hover:underline"
        >
          {isBn ? '+ নতুন আপডেট যোগ করুন' : '+ Add Activity Note'}
        </button>
      </div>

      <ol className="relative border-l-2 border-emerald-200 ml-3 space-y-5 pl-6 py-1">
        {history.map((entry, idx) => (
          <li key={entry.id || idx} className="relative">
            <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-bdGreen-800 ring-4 ring-white border border-emerald-300" />
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-xs text-slate-900">{entry.title}</span>
                <span className="font-mono text-[11px] text-slate-500">{entry.date}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{entry.details}</p>
              {entry.actor && (
                <p className="text-[10px] font-semibold text-bdGreen-800">
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
