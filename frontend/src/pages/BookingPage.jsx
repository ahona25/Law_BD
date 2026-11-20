import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Video,
  MapPin,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import AppointmentPassModal from '../components/AppointmentPassModal';

export default function BookingPage() {
  const { lawyerId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);


  const [step, setStep] = useState(1);
  const [consultationMode, setConsultationMode] = useState('Video Consultation');
  const [selectedDate, setSelectedDate] = useState('2026-11-20');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow 3:00 PM');
  const [caseCategory, setCaseCategory] = useState('Land & Property');
  const [problemDescription, setProblemDescription] = useState('');
  const [documentName, setDocumentName] = useState('Deed_Khatian_Copy.pdf');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getLawyerById(lawyerId).then(res => {
      if (res.success) {
        setLawyer(res.lawyer);
        if (res.lawyer.availableSlots && res.lawyer.availableSlots.length > 0) {
          setSelectedSlot(res.lawyer.availableSlots[0]);
        }
        if (res.lawyer.specialties && res.lawyer.specialties.length > 0) {
          setCaseCategory(res.lawyer.specialties[0]);
        }
      }
    }).catch(err => {
      console.error('Failed to load lawyer:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [lawyerId]);

  const getFee = () => {
    if (!lawyer) return 1500;
    if (consultationMode.includes('In-person') || consultationMode.includes('Chamber')) {
      return lawyer.feeInPerson || 2000;
    }
    if (consultationMode.includes('Phone')) {
      return lawyer.feePhone || 1000;
    }
    return lawyer.feeVideo || 1800;
  };

  const handleBookingSubmit = async () => {
    if (!problemDescription.trim()) {
      alert('Please provide a brief summary of your legal matter.');
      return;
    }

    if (!isAuthenticated) {
      alert('Please sign in or use one of the demo logins in the navbar to confirm your booking.');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createBooking({
        lawyerId: Number(lawyerId),
        mode: consultationMode,
        date: selectedDate,
        timeSlot: selectedSlot,
        caseCategory,
        problemDescription,
        paymentMethod,
        documents: [documentName]
      });

      if (res.success) {
        setConfirmedAppointment(res.appointment);
      }
    } catch (err) {
      alert(err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-bdGreen-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold">Advocate not found</h2>
          <Link to="/lawyers" className="mt-4 inline-block px-4 py-2 bg-bdGreen-800 text-white rounded-lg text-xs font-semibold">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            to={`/lawyers/${lawyer.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-bdGreen-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Advocate Profile</span>
          </Link>
        </div>

        {/* Advocate Mini Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-bdGreen-800 text-white font-bold text-lg flex items-center justify-center shrink-0">
              {lawyer.initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-base text-slate-900">{lawyer.name}</h2>
                <ShieldCheck className="w-4 h-4 text-bdGreen-600" />
              </div>
              <p className="text-xs text-slate-500 font-mono">Roll: {lawyer.barCouncilNo} · {lawyer.courtLevel}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation Fee:</span>
            <span className="font-bold text-xl text-bdGreen-900">৳{getFee()}</span>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">

          {/* Step 1: Consultation Mode */}
          <div>
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bdGreen-800 text-white text-xs font-bold flex items-center justify-center">1</span>
              <span>Select Consultation Format</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { mode: 'Video Consultation', icon: Video, fee: lawyer.feeVideo || 1800, desc: 'High-definition online video call' },
                { mode: 'In-person Chamber', icon: MapPin, fee: lawyer.feeInPerson || 2500, desc: 'Chamber appointment in Supreme Court / Judge Court' },
                { mode: 'Phone Call', icon: Phone, fee: lawyer.feePhone || 1200, desc: 'Direct voice consultation' }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = consultationMode === m.mode;
                return (
                  <button
                    key={m.mode}
                    type="button"
                    onClick={() => setConsultationMode(m.mode)}
                    className={`p-4 rounded-2xl border text-left transition-all ${isSelected
                        ? 'border-bdGreen-800 bg-emerald-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-bdGreen-800' : 'text-slate-400'}`} />
                    <h4 className="font-bold text-xs text-slate-900">{m.mode}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{m.desc}</p>
                    <p className="font-bold text-xs text-bdGreen-900 mt-2">৳{m.fee}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date & Available Slot */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bdGreen-800 text-white text-xs font-bold flex items-center justify-center">2</span>
              <span>Choose Date & Chamber Time Slot</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Available Chamber Slots:</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-bdGreen-800"
                >
                  {lawyer.availableSlots?.map((slot, i) => (
                    <option key={i} value={slot}>{slot}</option>
                  ))}
                  <option value="Morning 10:00 AM">Morning 10:00 AM</option>
                  <option value="Afternoon 4:00 PM">Afternoon 4:00 PM</option>
                  <option value="Evening 6:30 PM">Evening 6:30 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Case Brief & Documents */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bdGreen-800 text-white text-xs font-bold flex items-center justify-center">3</span>
              <span>Case Brief & Relevant Evidence</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Legal Issue Category:</label>
              <input
                type="text"
                value={caseCategory}
                onChange={(e) => setCaseCategory(e.target.value)}
                placeholder="E.g. Land Title Dispute, Cheque Dishonour, Cyber Harassment..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-bdGreen-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Summary of Incident & What You Seek:</label>
              <textarea
                rows={4}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Briefly describe what happened, dates, amounts, whether police case or notices were received..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-bdGreen-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Attach Documents (Khatian, Deed, FIR, Cheque scan):</label>
              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <FileText className="w-4 h-4 text-bdGreen-700" />
                  <span>{documentName}</span>
                </div>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                  Attached (Ready)
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Secure Payment Gateway Selection */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bdGreen-800 text-white text-xs font-bold flex items-center justify-center">4</span>
              <span>Select Payment Method (Bangladesh Gateways)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'bKash', name: 'bKash', color: 'text-pink-600', badge: 'Instant' },
                { id: 'Nagad', name: 'Nagad', color: 'text-orange-600', badge: 'Instant' },
                { id: 'Rocket', name: 'Rocket', color: 'text-purple-600', badge: 'Instant' },
                { id: 'Card', name: 'Debit / Card', color: 'text-blue-600', badge: 'Visa/MC' }
              ].map((p) => {
                const isSelected = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${isSelected
                        ? 'border-bdGreen-800 bg-emerald-50 text-bdGreen-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                  >
                    <span className={`block font-bold text-sm ${p.color}`}>{p.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{p.badge}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Total Consultation Payable:</p>
                <p className="text-[11px] text-slate-500">Includes Bar Council verification and appointment token.</p>
              </div>
              <span className="font-serif font-bold text-2xl text-bdGreen-900">৳{getFee()}</span>
            </div>
          </div>

          {/* Confirmation Submit Button */}
          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={handleBookingSubmit}
              disabled={submitting}
              className="w-full py-4 bg-bdGreen-800 hover:bg-bdGreen-700 disabled:opacity-50 text-white rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Generating Official Appointment Pass...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirm Booking & Generate Pass (৳{getFee()})</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              🔒 100% Confidential. Secured under Attorney-Client Privilege.
            </p>
          </div>

        </div>

      </div>

      {/* Appointment Pass Modal (Shown on successful booking) */}
      {confirmedAppointment && (
        <AppointmentPassModal
          appointment={confirmedAppointment}
          onClose={() => {
            setConfirmedAppointment(null);
            navigate('/dashboard/client');
          }}
        />
      )}
    </div>
  );
}
