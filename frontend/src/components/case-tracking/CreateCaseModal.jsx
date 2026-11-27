import React from 'react';
import { X } from 'lucide-react';
import { STATUS_META } from './caseConstants';

export default function CreateCaseModal({
  newCase,
  onChange,
  onSubmit,
  onClose,
  creating,
  isBn
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {isBn ? 'নতুন মামলা নিবন্ধন করুন' : 'Register New Case for Tracking'}
          </h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'মামলার শিরোনাম *' : 'Case Title *'}
            </label>
            <input
              type="text"
              required
              value={newCase.title}
              onChange={(e) => onChange({ ...newCase, title: e.target.value })}
              placeholder="E.g., Mirpur Land Possession Suit"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'বিভাগ' : 'Category'}
              </label>
              <select
                value={newCase.category}
                onChange={(e) => onChange({ ...newCase, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Land & Property">Land & Property</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Cheque Dishonour">Cheque Dishonour</option>
                <option value="Cyber Crime">Cyber Crime</option>
                <option value="Labour & Employment">Labour & Employment</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'প্রাথমিক অবস্থা' : 'Initial Status'}
              </label>
              <select
                value={newCase.status}
                onChange={(e) => onChange({ ...newCase, status: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                {Object.entries(STATUS_META).map(([val, meta]) => (
                  <option key={val} value={val}>
                    {isBn ? meta.bnLabel : meta.enLabel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'আদালতের নাম' : 'Court Name'}
            </label>
            <input
              type="text"
              value={newCase.court_name}
              onChange={(e) => onChange({ ...newCase, court_name: e.target.value })}
              placeholder="E.g., Chief Metropolitan Magistrate Court, Dhaka"
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'শুনানির তারিখ' : 'Next Hearing Date'}
              </label>
              <input
                type="date"
                value={newCase.next_hearing_date}
                onChange={(e) => onChange({ ...newCase, next_hearing_date: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isBn ? 'শুনানির সময়' : 'Hearing Time'}
              </label>
              <input
                type="text"
                value={newCase.next_hearing_time}
                onChange={(e) => onChange({ ...newCase, next_hearing_time: e.target.value })}
                placeholder="10:30 AM"
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isBn ? 'বিবরণ' : 'Case Summary'}
            </label>
            <textarea
              rows={3}
              value={newCase.incident_description}
              onChange={(e) => onChange({ ...newCase, incident_description: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
              placeholder="Brief summary of the legal matter..."
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
              disabled={creating}
              className="px-5 py-2 rounded-xl bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-bold"
            >
              {creating ? 'Saving...' : isBn ? 'নিবন্ধন করুন' : 'Create Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
