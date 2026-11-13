import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Scale,
  UserCheck,
  Users,
  DollarSign,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  Clock,
  Shield,
  Activity,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('lawyers');
  const [lawyers, setLawyers] = useState([]);
  const [laws, setLaws] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);


  const [showAddLawModal, setShowAddLawModal] = useState(false);
  const [newLawTitle, setNewLawTitle] = useState('');
  const [newLawBangla, setNewLawBangla] = useState('');
  const [newLawCategory, setNewLawCategory] = useState('property');
  const [newLawSummary, setNewLawSummary] = useState('');
  const [newLawPenalties, setNewLawPenalties] = useState('');
  const [savingLaw, setSavingLaw] = useState(false);

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, lawyersRes, lawsRes, usersRes, logsRes] = await Promise.all([
        api.getAdminStats().catch(() => ({ stats: {} })),
        api.getLawyerApplications().catch(() => ({ lawyers: [] })),
        api.getLaws().catch(() => ({ laws: [] })),
        api.getUsers().catch(() => ({ users: [] })),
        api.getAuditLogs().catch(() => ({ logs: [] }))
      ]);

      if (statsRes.stats) setStats(statsRes.stats);
      if (lawyersRes.lawyers) setLawyers(lawyersRes.lawyers);
      if (lawsRes.laws) setLaws(lawsRes.laws);
      if (usersRes.users) setUsers(usersRes.users);
      if (logsRes.logs) setAuditLogs(logsRes.logs);
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLawyer = async (id, action) => {
    try {
      await api.verifyLawyer(id, action);
      loadAllAdminData();
    } catch (err) {
      alert(err.message || 'Error updating lawyer verification');
    }
  };

  const handleUserStatus = async (id, status) => {
    try {
      await api.updateUserStatus(id, status);
      loadAllAdminData();
    } catch (err) {
      alert(err.message || 'Error updating user status');
    }
  };

  const handleRepealLaw = async (id) => {
    if (!confirm('Are you sure you want to mark this law as repealed?')) return;
    try {
      await api.repealLaw(id);
      loadAllAdminData();
    } catch (err) {
      alert(err.message || 'Error repealing law');
    }
  };

  const handleCreateLawSubmit = async (e) => {
    e.preventDefault();
    if (!newLawTitle.trim() || !newLawSummary.trim()) return;

    setSavingLaw(true);
    try {
      const res = await api.createLaw({
        title: newLawTitle,
        bangla_title: newLawBangla || newLawTitle,
        category: newLawCategory,
        category_label: newLawCategory.toUpperCase(),
        simple_summary: newLawSummary,
        simple_summary_bn: newLawSummary,
        penalties: newLawPenalties || 'Statutory penalties as prescribed by the respective Act.',
        penalties_bn: newLawPenalties
      });

      if (res.success) {
        setShowAddLawModal(false);
        setNewLawTitle('');
        setNewLawBangla('');
        setNewLawSummary('');
        setNewLawPenalties('');
        loadAllAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to create law');
    } finally {
      setSavingLaw(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Admin Header */}
        <div className="bg-bdDark-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-950 shadow-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-bdRed-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
              DG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl">
                  {user?.name || 'Director General Legal Affairs'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-bdRed-500 text-white text-xs font-bold uppercase">
                  Admin Authority
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-1">
                Central Legal Information & Bar Council Oversight Control Panel
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddLawModal(true)}
            className="px-5 py-3 bg-bdGreen-700 hover:bg-bdGreen-600 text-white rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Statute</span>
          </button>
        </div>

        {/* Analytics Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Laws in Library</span>
              <span className="font-serif font-bold text-xl text-slate-900">{stats.totalLaws}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Enrolled Lawyers</span>
              <span className="font-serif font-bold text-xl text-slate-900">{stats.totalLawyers}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-emerald-600 uppercase font-bold block">Verified Badges</span>
              <span className="font-serif font-bold text-xl text-emerald-700">{stats.verifiedLawyers}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Users</span>
              <span className="font-serif font-bold text-xl text-slate-900">{stats.totalUsers}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Legal Cases</span>
              <span className="font-serif font-bold text-xl text-slate-900">{stats.totalCases}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-bdGreen-700 uppercase font-bold block">Platform Fees</span>
              <span className="font-serif font-bold text-xl text-bdGreen-900">৳{stats.totalRevenue?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Control Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('lawyers')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'lawyers'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <UserCheck className="w-4 h-4 text-bdGreen-700" />
            <span>Advocate Verification Desk ({lawyers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('laws')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'laws'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Scale className="w-4 h-4 text-bdGreen-700" />
            <span>Law Library Management ({laws.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'users'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Users className="w-4 h-4 text-bdGreen-700" />
            <span>Citizen & Lawyer Accounts ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 px-6 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'audit'
              ? 'border-bdGreen-800 text-bdGreen-900 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <Activity className="w-4 h-4 text-bdGreen-700" />
            <span>System Audit Logs</span>
          </button>
        </div>

        {/* Tab 1: Advocate Verification Queue */}
        {activeTab === 'lawyers' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900 mb-2">
              Bangladesh Bar Council Verification Desk
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Review advocate roll numbers and court admissions before granting the official verified badge.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">Advocate Name</th>
                    <th className="p-3">Bar Council Roll</th>
                    <th className="p-3">Court Level</th>
                    <th className="p-3">Specialties</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lawyers.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <span>{l.name}</span>
                        {l.verified && <CheckCircle2 className="w-3.5 h-3.5 text-bdGreen-600" />}
                      </td>
                      <td className="p-3 font-mono text-slate-700">{l.barCouncilNo}</td>
                      <td className="p-3 text-slate-600">{l.courtLevel}</td>
                      <td className="p-3 text-slate-600">{l.specialties?.join(', ')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${l.verified ? 'bg-emerald-100 text-bdGreen-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                          {l.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {l.verified ? (
                          <button
                            onClick={() => handleVerifyLawyer(l.id, 'reject')}
                            className="px-3 py-1 bg-rose-50 text-bdRed-600 font-semibold rounded-lg hover:bg-rose-100 text-[11px]"
                          >
                            Revoke
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerifyLawyer(l.id, 'approve')}
                            className="px-3 py-1 bg-bdGreen-800 text-white font-semibold rounded-lg hover:bg-bdGreen-700 text-[11px]"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Law Library Management */}
        {activeTab === 'laws' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-slate-900">Law Library Catalog</h2>
                <p className="text-xs text-slate-500">Add, edit, or repeal statutory provisions in the repository.</p>
              </div>
              <button
                onClick={() => setShowAddLawModal(true)}
                className="px-4 py-2 bg-bdGreen-800 text-white rounded-xl text-xs font-bold"
              >
                + Add Law Provision
              </button>
            </div>





            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="p-3">Title & Bangla Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Act / Citation</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {laws.map((law) => (
                    <tr key={law.id} className="hover:bg-slate-50/50">
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{law.title}</p>
                        <p className="text-[11px] text-slate-500 font-bangla">{law.bangla_title}</p>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{law.category_label || law.category}</td>
                      <td className="p-3 font-mono text-slate-600">{law.act_no_year}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${law.status === 'current' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                          {law.status || 'current'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {law.status !== 'repealed' && (
                          <button
                            onClick={() => handleRepealLaw(law.id)}
                            className="text-bdRed-600 hover:underline font-semibold"
                          >
                            Mark Repealed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}




        {/* Tab 3: Users Directory */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900 mb-2">User Accounts Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Account Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900">{u.name}</td>
                      <td className="p-3 text-slate-600">{u.email}</td>
                      <td className="p-3 uppercase font-bold text-[10px] text-bdGreen-800">{u.role}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {u.status === 'active' ? (
                          <button
                            onClick={() => handleUserStatus(u.id, 'suspended')}
                            className="text-bdRed-600 hover:underline font-semibold"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserStatus(u.id, 'active')}
                            className="text-emerald-700 hover:underline font-semibold"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}





        {/* Tab 4: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900 mb-2">Platform Audit Trail</h2>
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-bdGreen-900">{log.action}</span>
                    <p className="text-slate-600">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>




      {/* Add Law Provision Modal */}
      {showAddLawModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200">
            <h2 className="font-serif font-bold text-xl text-slate-900 mb-4">Add Official Statute to Law Library</h2>
            <form onSubmit={handleCreateLawSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Law Title (English):</label>
                <input
                  type="text"
                  value={newLawTitle}
                  onChange={(e) => setNewLawTitle(e.target.value)}
                  placeholder="E.g. Specific Relief Act, 1877"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Bangla Law Name:</label>
                <input
                  type="text"
                  value={newLawBangla}
                  onChange={(e) => setNewLawBangla(e.target.value)}
                  placeholder="যেমন: সুনির্দিষ্ট প্রতিকার আইন ১৮৭৭"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Legal Category:</label>
                <select
                  value={newLawCategory}
                  onChange={(e) => setNewLawCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                >
                  <option value="property">Land & Property</option>
                  <option value="criminal">Criminal Law & Bail</option>
                  <option value="family">Family & Divorce</option>
                  <option value="cyber">Cybercrime</option>
                  <option value="cheque">Cheque Dishonour</option>
                  <option value="labour">Labour & Workplace</option>
                  <option value="constitutional">Constitutional Law</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Plain Language Summary:</label>
                <textarea
                  rows={3}
                  value={newLawSummary}
                  onChange={(e) => setNewLawSummary(e.target.value)}
                  placeholder="Explain the scope and purpose of the statute in simple words..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Statutory Penalties & Remedies:</label>
                <input
                  type="text"
                  value={newLawPenalties}
                  onChange={(e) => setNewLawPenalties(e.target.value)}
                  placeholder="E.g. Imprisonment up to 7 years and fine..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLawModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLaw}
                  className="px-5 py-2 bg-bdGreen-800 hover:bg-bdGreen-700 text-white rounded-xl font-bold"
                >
                  {savingLaw ? 'Saving...' : 'Publish Statute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
