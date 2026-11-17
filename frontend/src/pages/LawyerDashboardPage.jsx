import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Video,
  DollarSign,
  ShieldCheck,
  User,
  AlertCircle,
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AppointmentPassModal from '../components/AppointmentPassModal';

export default function LawyerDashboardPage() {
  const { user, lawyerProfile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState(null);

  // Fee management state
  const [feeVideo, setFeeVideo] = useState(1800);
  const [feeInPerson, setFeeInPerson] = useState(2500);
  const [feePhone, setFeePhone] = useState(1200);
  const [feeSaved, setFeeSaved] = useState(false);

  const [newSlot, setNewSlot] = useState('');
  const [slots, setSlots] = useState([
    'Tomorrow 10:30 AM',
    'Tomorrow 3:00 PM',
    'Thu 11:00 AM',
    'Thu 4:30 PM'
  ]);

  useEffect(() => {
    loadLawyerData();
  }, []);

  const loadLawyerData = async () => {
    setLoading(true);
    try {
      const res = await api.getMyBookings();
      if (res.success) setAppointments(res.appointments);
    } catch (err) {
      console.error('Error loading lawyer appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateAppointmentStatus(id, { status });
      loadLawyerData();
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.trim()) return;
    setSlots([...slots, newSlot.trim()]);
    setNewSlot('');
  };

  const handleRemoveSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const totalEarnings = appointments
    .filter(a => a.payment_status === 'paid' && a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.fee_amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Lawyer Profile Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-bdGreen-800 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'AD'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  {user?.name || 'Adv. Barrister Tanvir Hasan'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-bdGreen-800 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enrolled Advocate</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Bar Council Roll: <strong>{lawyerProfile?.barCouncilNo || 'BC/DH-10492/2012'}</strong> · Supreme Court Bar Association
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultations:</span>
              <span className="font-bold text-xl text-slate-900">{appointments.length}</span>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Gross Fees:</span>
              <span className="font-serif font-bold text-xl text-bdGreen-900">৳{totalEarnings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Appointments & Client Requests (2 cols) */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Consultation Bookings & Queue</h2>
                  <p className="text-xs text-slate-500">Manage client appointment passes and consultation states.</p>
                </div>
                <span className="text-xs font-bold text-bdGreen-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {appointments.length} Total
                </span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-28 bg-slate-100 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-100 text-bdGreen-900 rounded">
                            {appt.token || appt.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                            {appt.status}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">· {appt.mode}</span>
                        </div>
                        <span className="font-serif font-bold text-sm text-bdGreen-900">
                          ৳{appt.fee_amount} ({appt.payment_status?.toUpperCase()})
                        </span>
                      </div>

                      <div className="text-xs text-slate-700">
                        <p className="font-bold text-slate-900">{appt.client_name} ({appt.client_phone || '01711223344'})</p>
                        <p className="text-slate-500 italic mt-0.5">"{appt.problem_description}"</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 text-xs">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span>Date: <strong>{appt.date}</strong></span>
                          <span>Slot: <strong>{appt.time_slot}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedPass(appt)}
                            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold text-[11px]"
                          >
                            View Pass
                          </button>
                          {appt.status !== 'completed' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'completed')}
                              className="px-3 py-1.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-lg font-semibold text-[11px]"
                            >
                              Mark Completed
                            </button>
                          )}
                          {appt.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'cancelled')}
                              className="px-2.5 py-1.5 text-bdRed-600 hover:bg-rose-50 rounded-lg font-semibold text-[11px]"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <Calendar className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                  <p className="text-sm font-semibold">No appointments in queue</p>
                  <p className="text-xs">New client bookings will appear here instantly.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Availability & Fee Configurator (1 col) */}
          <div className="space-y-6">

            {/* Slot Configurator */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">Available Chamber Slots</h3>
              <p className="text-xs text-slate-500 mb-4">Clients will choose from these slots when booking appointments.</p>

              <div className="space-y-2 mb-4">
                {slots.map((slot, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <span className="font-medium text-slate-800">{slot}</span>
                    <button
                      onClick={() => handleRemoveSlot(idx)}
                      className="text-slate-400 hover:text-bdRed-600 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddSlot} className="flex gap-2">
                <input
                  type="text"
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  placeholder="E.g. Tomorrow 5:30 PM"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-bdGreen-800"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 bg-bdGreen-800 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Fee Configurator */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-slate-900">Consultation Fee Settings</h3>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Video Consultation (৳):</label>
                <input
                  type="number"
                  value={feeVideo}
                  onChange={(e) => setFeeVideo(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">In-Person Chamber (৳):</label>
                <input
                  type="number"
                  value={feeInPerson}
                  onChange={(e) => setFeeInPerson(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone Consultation (৳):</label>
                <input
                  type="number"
                  value={feePhone}
                  onChange={(e) => setFeePhone(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800 font-mono font-bold"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setFeeSaved(true);
                  setTimeout(() => setFeeSaved(false), 2500);
                }}
                className="w-full py-2.5 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold transition-all"
              >
                {feeSaved ? 'Saved Settings!' : 'Update Fee Schedule'}
              </button>
            </div>

          </div>

        </div>

      </div>

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
