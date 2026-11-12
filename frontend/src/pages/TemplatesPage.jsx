import React, { useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Printer,
  Check,
  Download,
  AlertCircle,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function TemplatesPage() {
  const { lang } = useLanguage();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getChecklists().then(res => {
      if (res.success && res.checklists.length > 0) {
        setTemplates(res.checklists);
        setSelectedTemplate(res.checklists[0]);
      }
    }).catch(() => { });
  }, []);

  const handleCopy = () => {
    if (!selectedTemplate) return;
    navigator.clipboard.writeText(selectedTemplate.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-bdGreen-800 uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>{lang === 'bn' ? 'আইনি নোটিশ ও আবেদনপত্রের নমুনা' : 'Official Legal Notice & Application Templates'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {lang === 'bn' ? 'আইনি খসড়া ও দলিল ফরম কেন্দ্র' : 'Legal Document & Template Center'}
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Download and customize standard legal notice drafts, General Diary (GD) applications, and court petitions under Bangladeshi law.
          </p>
        </div>

        {/* Template Selector & Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Template List */}
          <div className="no-print space-y-3">
            <h3 className="font-serif font-bold text-sm text-slate-700 uppercase tracking-wider mb-2">
              Available Formats
            </h3>
            {templates.map((tpl) => {
              const isSelected = selectedTemplate?.id === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${isSelected
                      ? 'bg-bdGreen-800 text-white border-bdGreen-800 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400'
                    }`}

                >
                  <span className={`text-[10px] font-bold uppercase block mb-1 ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {tpl.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm leading-snug">{tpl.title}</h4>
                  <p className={`text-xs mt-1 font-bangla ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {tpl.bangla_title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Template Viewer & Actions */}
          {selectedTemplate && (
            <div className="lg:col-span-2 space-y-4">

              {/* Action Bar */}
              <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedTemplate.title}</h3>
                  <span className="text-[11px] text-slate-400">{selectedTemplate.format}</span>
                </div>


                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-bdGreen-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Draft!' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-4 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Format</span>
                  </button>
                </div>
              </div>

              {/* Printable Template Canvas */}
              <div className="printable-area bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap text-slate-800">
                {selectedTemplate.content}
              </div>

              {/* Template Disclaimer Note */}
              <div className="no-print p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> This template provides the statutory legal format recognized by Bangladesh courts. Replace bracketed placeholders [Client Name, Amount, Date] with verified details and have your advocate review before serving.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
