import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Video, QrCode, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppointmentPassModal({ appointment, onClose }) {
  const { lang } = useLanguage();
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">

        {/* Pass Actions Header (Non-printable) */}
        <div className="no-print bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Verified Legal Consultation Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 bg-bdGreen-700 hover:bg-bdGreen-600 text-white rounded text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Pass Body */}
        <div className="printable-area p-8 bg-white text-slate-800">

          {/* Ticket Header */}
          <div className="border-b-2 border-bdGreen-800 pb-5 mb-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center font-bold text-xl relative">
                <div className="absolute w-5 h-5 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
                <span className="relative z-10 text-white text-sm font-serif">⚖</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-bdGreen-900 tracking-tight">
                  Law<span className="text-bdRed-500 font-sans">_</span>BD
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Official Legal Consultation & Advocate Appointment Pass
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-mono font-bold bg-emerald-100 text-bdGreen-900 rounded-md border border-emerald-300">
                {appointment.token || appointment.id}
              </span>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                Status: <span className="text-emerald-700 font-bold">Confirmed</span>
              </p>
            </div>
          </div>

          {/* Advocate & Consultation Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">
                Enrolled Advocate:
              </span>
              <p className="font-bold text-sm text-slate-900 flex items-center gap-1">
                {appointment.lawyer_name}
                <ShieldCheck className="w-4 h-4 text-bdGreen-600 inline" />
              </p>
              <p className="text-[11px] text-slate-600 mt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-bdRed-500 shrink-0 mt-0.5" />
                <span>{appointment.lawyer_chamber || 'Supreme Court Bar Association Annex, Ramna, Dhaka'}</span>
              </p>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">
                Consultation Slot:
              </span>
              <div className="space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-bdGreen-700" />
                  <span>{appointment.date}</span>
                </p>
                <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-bdGreen-700" />
                  <span>{appointment.time_slot}</span>
                </p>
                <p className="text-[11px] font-bold text-bdGreen-800 flex items-center gap-1.5 pt-0.5">
                  <Video className="w-3.5 h-3.5 text-bdGreen-700" />
                  <span>{appointment.mode}</span>
                </p>
              </div>
            </div>
          </div>


          {/* Client & Case Summary */}
          <div className="space-y-3 mb-6 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Client Name:</span>
                <p className="font-semibold text-slate-900">{appointment.client_name}</p>
                <p className="text-slate-500 text-[11px]">{appointment.client_phone || '01711223344'}</p>
              </div>


              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold">Legal Domain:</span>
                <p className="font-semibold text-slate-900">{appointment.case_category}</p>
                <p className="text-emerald-700 text-[11px] font-medium">Payment Verified via {appointment.payment_method} (৳{appointment.fee_amount})</p>
              </div>
            </div>


            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <span className="text-emerald-900 uppercase text-[10px] font-bold block mb-0.5">
                Case Brief / Incident Summary:
              </span>
              <p className="text-slate-700 italic text-[11px] leading-relaxed">
                "{appointment.problem_description}"
              </p>


            </div>
          </div>



          {/* QR & Security Seal Footer */}
          <div className="pt-4 border-t border-dashed border-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-100 rounded-lg p-1.5 border border-slate-300 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-700">Digital QR Verification</p>
                <p className="text-[9px] text-slate-500">Scan at chamber reception or click link in video email.</p>
                <p className="text-[9px] font-mono text-slate-400 mt-0.5">TX: {appointment.payment_tx_id || 'BK9X872391'}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-bdGreen-800 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-bdGreen-600" />
                <span>Verified by Law_BD</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">Supreme Court Bar Affiliated</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
