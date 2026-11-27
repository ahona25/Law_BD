import React from 'react';
import { X } from 'lucide-react';

export default function DocumentPreviewModal({ previewDoc, onClose }) {
  if (!previewDoc) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">{previewDoc.name}</h3>
            <span className="text-[11px] text-bdGreen-800 font-semibold">{previewDoc.category}</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5 bg-slate-50">
          {previewDoc.text ? (
            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-800 bg-white p-4 rounded-2xl border border-slate-200">
              {previewDoc.text}
            </pre>
          ) : previewDoc.mimeType?.startsWith('image/') ? (
            <img src={previewDoc.url} alt={previewDoc.name} className="max-w-full mx-auto rounded-xl" />
          ) : (
            <iframe
              src={previewDoc.url}
              title={previewDoc.name}
              className="w-full h-[65vh] rounded-xl border border-slate-200 bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
