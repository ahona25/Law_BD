import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  Bookmark,
  MessageSquare,
  FileText,
  Clock,
  ShieldCheck,
  Plus,
  Printer,
  ChevronRight,
  User,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import AppointmentPassModal from '../components/AppointmentPassModal';

export default function ClientDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { lang } = useLanguage();

  const [activeTab, setActiveTab] = useState('cases'); // 'cases' | 'appointments' | 'saved' | 'messages'
  const [cases, setCases] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState(null);

  // New Case Modal State
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [caseCategory, setCaseCategory] = useState('Land & Property');
  const [caseDesc, setCaseDesc] = useState('');
  const [submittingCase, setSubmittingCase] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [casesRes, apptsRes] = await Promise.all([
        api.getMyCases().catch(() => ({ cases: [] })),
        api.getMyBookings().catch(() => ({ appointments: [] }))
      ]);

      if (casesRes.cases) setCases(casesRes.cases);
      if (apptsRes.appointments) setAppointments(apptsRes.appointments);
    } catch (err) {
      console.error('Error loading client dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!caseTitle.trim() || !caseCategory.trim()) return;

    setSubmittingCase(true);
    try {
      const res = await api.createCase({
        title: caseTitle,
        category: caseCategory,
        incident_description: caseDesc,
        related_laws: ['Land Crime Prevention Act 2023', 'Specific Relief Act Section 9']
      });

      if (res.success) {
        setShowNewCaseModal(false);
        setCaseTitle('');
        setCaseDesc('');
        loadDashboardData();
      }
    } catch (err) {
      alert(err.message || 'Failed to create case');
    } finally {
      setSubmittingCase(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.updateAppointmentStatus(id, { status: 'cancelled' });
      loadDashboardData();
    } catch (err) {
      alert(err.message || 'Error cancelling appointment');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-bdGreen-800 text-white font-bold text-xl flex items-center justify-center shadow-md">
              {user ? user.name[0] : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  {user ? user.name : 'Citizen Portal'}
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-100 text-bdGreen-800 rounded">
                  Client Dashboard
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Manage your legal proceedings, advocate appointments, and evidence records.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewCaseModal(true)}
            className="px-5 py-3 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Open New Case Record</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('cases')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'cases'
                ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4 text-bdGreen-700" />
            <span>My Legal Cases ({cases.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-bdGreen-700" />
            <span>Appointments & Passes ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-bdGreen-700" />
            <span>Chamber Communications</span>
          </button>
        </div>

        {/* Tab 1: My Legal Cases */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            {cases.length > 0 ? (
              cases.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-bdGreen-800">
                        {c.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.status === 'ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{c.incident_description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>Court: <strong>{c.court_name}</strong></span>
                      {c.next_hearing_date && (
                        <span>Next Hearing: <strong className="text-bdRed-600 font-bold">{c.next_hearing_date}</strong></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to="/victim-support"
                      state={{ prefilledIncident: c.incident_description }}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
                    >
                      Analyze Law
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-slate-800">No Active Case Records Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Create a private legal case record to track court appearances, documents, and assigned advocates.
                </p>
                <button
                  onClick={() => setShowNewCaseModal(true)}
                  className="px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-bold"
                >
                  Create Case Record
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Appointments & Passes */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-100 text-bdGreen-900 rounded border border-emerald-300">
                        {appt.token || appt.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {appt.status}
                      </span>
                      <span className="text-xs text-slate-400">· {appt.mode}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                      Consultation with {appt.lawyer_name}
                      <ShieldCheck className="w-4 h-4 text-bdGreen-600" />
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <span>Date: <strong>{appt.date}</strong></span>
                      <span>Slot: <strong>{appt.time_slot}</strong></span>
                      <span>Fee: <strong className="text-bdGreen-800">৳{appt.fee_amount}</strong> ({appt.payment_method})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedPass(appt)}
                      className="px-4 py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Pass / Ticket</span>
                    </button>
                    {appt.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="px-3 py-2.5 border border-slate-200 hover:bg-rose-50 hover:text-bdRed-600 text-slate-600 text-xs font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-base text-slate-800">No Consultations Scheduled</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Find and book a consultation with a verified Bar Council advocate to receive an official digital appointment pass.
                </p>
                <Link
                  to="/lawyers"
                  className="px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-bold inline-block"
                >
                  Browse Advocates
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Chamber Communications */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-slate-900 mb-4">
              Direct Chamber Inquiries & File Exchanges
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Confidential, end-to-end encrypted messaging between you and your appointed advocate.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-bdGreen-800 text-white font-bold flex items-center justify-center shrink-0">
                  TH
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">Adv. Barrister Tanvir Hasan</span>
                    <span className="text-[10px] text-slate-400">Today 4:30 PM</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "I reviewed your RS Khatian. We have a clear title chain. I will walk you through filing under Section 7 of the Land Crime Act 2023 during our video consultation tomorrow."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* New Case Record Modal */}
      {showNewCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <h2 className="font-serif font-bold text-xl text-slate-900 mb-4">Create Private Legal Case Record</h2>
            <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Case Title:</label>
                <input
                  type="text"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  placeholder="E.g. Dispossession on Mirpur Plot"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Legal Category:</label>
                <select
                  value={caseCategory}
                  onChange={(e) => setCaseCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                >
                  <option value="Land & Property">Land & Property</option>
                  <option value="Criminal Law">Criminal Law & Bail</option>
                  <option value="Cheque Dishonour">Cheque Dishonour (NI Act)</option>
                  <option value="Family & Divorce">Family & Divorce</option>
                  <option value="Cybercrime">Cybercrime</option>
                  <option value="Labour Law">Labour Law</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Incident Summary & Court Notes:</label>
                <textarea
                  rows={4}
                  value={caseDesc}
                  onChange={(e) => setCaseDesc(e.target.value)}
                  placeholder="Provide brief background, disputed amounts, or police GD numbers..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCase}
                  className="px-5 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold"
                >
                  {submittingCase ? 'Saving...' : 'Save Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Pass Modal */}
      {selectedPass && (
        <AppointmentPassModal
          appointment={selectedPass}
          onClose={() => setSelectedPass(null)}
        />
      )}
    </div>
  );
}
