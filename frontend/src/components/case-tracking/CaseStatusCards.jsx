import React from 'react';
import { STATUS_META } from './caseConstants';

export default function CaseStatusCards({ statusCounts, statusFilter, onToggleFilter, isBn }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Object.entries(STATUS_META).map(([key, meta]) => {
        const isSelected = statusFilter === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggleFilter(isSelected ? 'all' : key)}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-2xs cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-br from-indigo-50 to-blue-50/70 border-indigo-500 ring-2 ring-indigo-500/20 -translate-y-0.5'
                : 'bg-white border-slate-200 hover:border-indigo-300 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${meta.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                {isBn ? meta.bnLabel : meta.enLabel}
              </span>
              <span className="font-serif font-bold text-xl text-slate-900">
                {statusCounts[key]}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              {isBn ? meta.bnDesc : meta.enDesc}
            </p>
          </button>
        );
      })}
    </div>
  );
}
