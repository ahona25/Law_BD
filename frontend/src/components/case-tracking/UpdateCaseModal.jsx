import React from 'react';
import { X } from 'lucide-react';
import { STATUS_META } from './caseConstants';

export default function UpdateCaseModal({
  editForm,
  onChange,
  onSubmit,
  onClose,
  updating,
  isBn
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {isBn ? 'মামলার অবস্থা ও শুনানি আপডেট' : 'Update Case Status & Hearing'}
          </h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'মামলার অবস্থা' : 'Case Status'}
            </label>
            <select
              value={editForm.status}
              onChange={(e) => onChange({ ...editForm, status: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            >
              {Object.entries(STATUS_META).map(([val, meta]) => (
                <option key={val} value={val}>
                  {isBn ? meta.bnLabel : meta.enLabel} — {isBn ? meta.bnDesc : meta.enDesc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'আদালতের নাম' : 'Court Name'}
            </label>
            <input
              type="text"
              value={editForm.court_name}
              onChange={(e) => onChange({ ...editForm, court_name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'পরবর্তী শুনানির তারিখ' : 'Next Hearing Date'}
              </label>
              <input
                type="date"
                value={editForm.next_hearing_date}
                onChange={(e) => onChange({ ...editForm, next_hearing_date: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'শুনানির সময়' : 'Hearing Time'}
              </label>
              <input
                type="text"
                value={editForm.next_hearing_time}
                onChange={(e) => onChange({ ...editForm, next_hearing_time: e.target.value })}
                placeholder="10:30 AM"
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'মামলার নতুন কার্যক্রম / নোট' : 'New Activity / History Note'}
            </label>
            <textarea
              rows={3}
              value={editForm.note}
              onChange={(e) => onChange({ ...editForm, note: e.target.value })}
              placeholder="E.g., Court issued temporary injunction order and set next date for witness examination."
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={updating}
              className="px-5 py-2 rounded-xl bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-bold"
            >
              {updating ? 'Updating...' : isBn ? 'আপডেট সংরক্ষণ' : 'Save & Notify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
