import React from 'react';
import { Upload, FileText, Eye, Download, Loader2 } from 'lucide-react';
import { DOC_CATEGORIES } from './caseConstants';

export default function CaseDocumentsPanel({
  documents = [],
  docFilter,
  onFilterChange,
  docTitle,
  onDocTitleChange,
  docCategory,
  onDocCategoryChange,
  docFile,
  onDocFileChange,
  uploadingDoc,
  previewLoading,
  onUpload,
  onView,
  onDownload,
  isBn
}) {
  const visibleDocs = documents.filter(
    (d) => docFilter === 'all' || d.isCourtOrder || d.category === 'Court Order'
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={onUpload}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-50/60 to-slate-50 border border-cyan-200/80 space-y-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Upload className="w-4 h-4 text-cyan-700" />
          <span>
            {isBn
              ? 'মামলার নথি বা আদালতের আদেশ আপলোড করুন'
              : 'Upload Case Document or Court Order'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={docTitle}
            onChange={(e) => onDocTitleChange(e.target.value)}
            placeholder={isBn ? 'নথির নাম (ঐচ্ছিক)' : 'Document Title (e.g., Stay Order)'}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-cyan-600"
          />
          <select
            value={docCategory}
            onChange={(e) => onDocCategoryChange(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-cyan-600"
          >
            {DOC_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => onDocFileChange(e.target.files?.[0] || null)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-cyan-50 file:text-cyan-900 file:font-bold"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploadingDoc || (!docFile && !docTitle.trim())}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 disabled:opacity-50 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {uploadingDoc ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{isBn ? 'নথি সংরক্ষণ করুন' : 'Upload to Case'}</span>
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-bold text-sm text-slate-900">
          {isBn ? 'সংগঠিত মামলার নথি' : 'Documents for This Case'}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-lg font-bold border cursor-pointer transition-colors ${
              docFilter === 'all'
                ? 'bg-cyan-50 border-cyan-500 text-cyan-900'
                : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
            }`}
          >
            {isBn ? 'সব নথি' : 'All Documents'}
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('orders')}
            className={`px-3 py-1 rounded-lg font-bold border cursor-pointer transition-colors ${
              docFilter === 'orders'
                ? 'bg-cyan-50 border-cyan-500 text-cyan-900'
                : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
            }`}
          >
            {isBn ? 'আদালতের আদেশ' : 'Court Orders'}
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {visibleDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-white border border-cyan-200 text-cyan-700 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-slate-900 truncate">{doc.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doc.isCourtOrder || doc.category === 'Court Order'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-cyan-100 text-cyan-900'
                    }`}
                  >
                    {doc.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {doc.uploadedBy || 'Registry'} ·{' '}
                  {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={previewLoading}
                onClick={() => onView(doc)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-xs font-bold text-cyan-900 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isBn ? 'দেখুন' : 'View'}</span>
              </button>
              <button
                type="button"
                onClick={() => onDownload(doc)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
