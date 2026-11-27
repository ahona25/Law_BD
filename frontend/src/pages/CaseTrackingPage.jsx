import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  Scale,
  Search,
  AlertCircle,
  Loader2,
  X,
  Gavel,
  Calendar,
  History,
  Bell,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { getStatusInfo } from '../components/case-tracking/caseConstants';
import CaseTrackingFlowHeader from '../components/case-tracking/CaseTrackingFlowHeader';
import CaseStatusCards from '../components/case-tracking/CaseStatusCards';
import CaseListSidebar from '../components/case-tracking/CaseListSidebar';
import CaseHearingPanel from '../components/case-tracking/CaseHearingPanel';
import CaseHistoryTimeline from '../components/case-tracking/CaseHistoryTimeline';
import CaseDocumentsPanel from '../components/case-tracking/CaseDocumentsPanel';
import CaseNotificationsPanel from '../components/case-tracking/CaseNotificationsPanel';
import CreateCaseModal from '../components/case-tracking/CreateCaseModal';
import UpdateCaseModal from '../components/case-tracking/UpdateCaseModal';
import DocumentPreviewModal from '../components/case-tracking/DocumentPreviewModal';
import { DEMO_CASES, DEMO_NOTIFICATIONS } from '../components/case-tracking/demoCaseData';

const INITIAL_NEW_CASE = {
  title: '',
  category: 'Land & Property',
  court_name: '',
  next_hearing_date: '',
  next_hearing_time: '10:30 AM',
  status: 'under_review',
  incident_description: ''
};

const PANEL_META = {
  status: { icon: Scale, en: 'Case Status', bn: 'মামলার অবস্থা' },
  hearings: { icon: Calendar, en: 'Hearing Dates', bn: 'শুনানির তারিখ' },
  history: { icon: History, en: 'Case History', bn: 'মামলার ইতিহাস' },
  notifications: { icon: Bell, en: 'Notifications', bn: 'নোটিফিকেশন' },
  documents: { icon: FolderOpen, en: 'Document Management & Court Orders', bn: 'নথি ও আদালতের আদেশ' }
};

export default function CaseTrackingPage() {
  const { isAuthenticated, user, token } = useAuth();
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const workspaceRef = useRef(null);

  const [cases, setCases] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [eligibilityReason, setEligibilityReason] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState(null); // null until user clicks an option
  const [docFilter, setDocFilter] = useState('all');
  const [notifScope, setNotifScope] = useState('all'); // 'all' | 'case'

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCase, setNewCase] = useState(INITIAL_NEW_CASE);
  const [creatingCase, setCreatingCase] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    status: 'pending',
    court_name: '',
    next_hearing_date: '',
    next_hearing_time: '',
    note: ''
  });
  const [updatingCase, setUpdatingCase] = useState(false);

  const [docFile, setDocFile] = useState(null);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Court Order');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    if (demoMode) return;
    if (isAuthenticated && token) {
      loadData();
    } else {
      setEligible(false);
      setEligibilityReason(null);
      setCases([]);
      setNotifications([]);
      setActiveSection(null);
      setError('');
      setLoading(false);
    }
  }, [isAuthenticated, token, user?.id, user?.role, demoMode]);

  const handleToggleDemo = () => {
    if (demoMode) {
      setDemoMode(false);
      setActiveSection(null);
      setFeedback('');
      if (isAuthenticated && token) {
        loadData();
      } else {
        setCases([]);
        setNotifications([]);
      }
      return;
    }

    const clonedCases = JSON.parse(JSON.stringify(DEMO_CASES));
    const clonedNotifs = JSON.parse(JSON.stringify(DEMO_NOTIFICATIONS));
    setDemoMode(true);
    setCases(clonedCases);
    setNotifications(clonedNotifs);
    setSelectedCaseId(clonedCases[0]?.id || null);
    setActiveSection('status');
    setError('');
    setFeedback(
      isBn
        ? 'ডেমো প্রদর্শনী চালু হয়েছে — প্রক্রিয়াটি দেখাতে যেকোনো অপশনে ক্লিক করুন।'
        : 'Demo Showcase active — click any option to test and demonstrate the Case Tracking workflow.'
    );
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const eligRes = await api.getCaseTrackingEligibility();
      setEligible(!!eligRes.eligible);
      setEligibilityReason(eligRes.reason || null);

      if (!eligRes.eligible) {
        setCases([]);
        setNotifications([]);
        setActiveSection(null);
        return;
      }

      const [casesRes, notifsRes] = await Promise.all([
        api.getMyCases(),
        api.getCaseNotifications()
      ]);
      const fetchedCases = casesRes.cases || [];
      setCases(fetchedCases);
      setNotifications(notifsRes.notifications || []);
      if (fetchedCases.length > 0) {
        setSelectedCaseId((prev) =>
          fetchedCases.some((c) => c.id === prev) ? prev : fetchedCases[0].id
        );
      }
    } catch (err) {
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('token') || msg.includes('sign in')) {
        setEligible(false);
        setEligibilityReason(null);
        setCases([]);
        setNotifications([]);
        setError('');
      } else {
        setError(err.message || 'Failed to load case tracking data');
      }
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const statusCounts = useMemo(() => {
    const counts = { pending: 0, hearing_scheduled: 0, under_review: 0, disposed: 0 };
    cases.forEach((c) => {
      const key = c.status === 'ongoing' ? 'pending' : c.status;
      if (counts[key] !== undefined) counts[key] += 1;
    });
    return counts;
  }, [cases]);

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const normalized = c.status === 'ongoing' ? 'pending' : c.status;
      const matchesStatus = statusFilter === 'all' || normalized === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        c.title?.toLowerCase().includes(q) ||
        c.court_name?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [cases, statusFilter, searchQuery]);

  const selectedCase = useMemo(
    () => cases.find((c) => c.id === selectedCaseId) || filteredCases[0] || cases[0] || null,
    [cases, selectedCaseId, filteredCases]
  );

  const selectedCaseNotifications = useMemo(() => {
    if (!selectedCase) return [];
    return notifications.filter((n) => Number(n.case_id) === Number(selectedCase.id));
  }, [notifications, selectedCase]);

  const hearingNotifications = useMemo(
    () => selectedCaseNotifications.filter((n) => n.type === 'hearing_change'),
    [selectedCaseNotifications]
  );

  const handleSelectFlowCard = (sectionId) => {
    setActiveSection((prev) => {
      const next = prev === sectionId ? null : sectionId;
      if (next) {
        setTimeout(() => {
          workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 40);
      }
      return next;
    });
  };

  const openEditModal = (legalCase) => {
    setEditForm({
      status: legalCase.status === 'ongoing' ? 'pending' : legalCase.status,
      court_name: legalCase.court_name || '',
      next_hearing_date: legalCase.next_hearing_date || '',
      next_hearing_time: legalCase.next_hearing_time || '',
      note: ''
    });
    setShowEditModal(true);
  };

  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!newCase.title.trim()) return;
    if (demoMode) {
      const today = new Date().toISOString().split('T')[0];
      const created = {
        id: `DEMO-${Math.floor(200 + Math.random() * 700)}`,
        ...newCase,
        related_laws: ['Bangladesh Statutory Law'],
        history: [
          {
            id: `dh-${Date.now()}`,
            date: today,
            type: 'registration',
            title: 'Case Registered (Demo)',
            details: `Case "${newCase.title}" created in demo showcase.`,
            actor: 'Demo Client'
          }
        ],
        documents: []
      };
      setCases((prev) => [created, ...prev]);
      setNotifications((prev) => [
        {
          id: `dn-${Date.now()}`,
          case_id: created.id,
          case_title: created.title,
          type: 'case_created',
          title: 'New Case Registered',
          message: `Demo case "${created.title}" added to Case Tracking.`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...prev
      ]);
      setSelectedCaseId(created.id);
      setShowCreateModal(false);
      setNewCase(INITIAL_NEW_CASE);
      setActiveSection('status');
      setFeedback(isBn ? 'ডেমো মামলা যোগ করা হয়েছে।' : 'Demo case added to showcase.');
      return;
    }

    setCreatingCase(true);
    try {
      const res = await api.createCase(newCase);
      if (res.success) {
        setShowCreateModal(false);
        setNewCase(INITIAL_NEW_CASE);
        await loadData();
        if (res.legalCase?.id) setSelectedCaseId(res.legalCase.id);
        setActiveSection('status');
        setFeedback(isBn ? 'নতুন মামলা সফলভাবে নিবন্ধিত হয়েছে।' : 'New case registered and tracked.');
      }
    } catch (err) {
      setError(err.message || 'Failed to register case');
    } finally {
      setCreatingCase(false);
    }
  };

  const handleUpdateCase = async (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    if (demoMode) {
      const today = new Date().toISOString().split('T')[0];
      const updated = {
        ...selectedCase,
        status: editForm.status,
        court_name: editForm.court_name,
        next_hearing_date: editForm.next_hearing_date || null,
        next_hearing_time: editForm.next_hearing_time || null,
        history: [
          ...(selectedCase.history || []),
          {
            id: `dh-${Date.now()}`,
            date: today,
            type: 'update',
            title: 'Demo Case Updated',
            details:
              editForm.note.trim() ||
              `Status: ${editForm.status} · Hearing: ${editForm.next_hearing_date || 'N/A'}`,
            actor: 'Demo Client'
          }
        ]
      };
      setCases((prev) => prev.map((c) => (c.id === selectedCase.id ? updated : c)));
      setNotifications((prev) => [
        {
          id: `dn-${Date.now()}`,
          case_id: selectedCase.id,
          case_title: selectedCase.title,
          type: 'hearing_change',
          title: 'Case Updated (Demo)',
          message:
            editForm.note.trim() ||
            `Hearing/status updated for "${selectedCase.title}".`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...prev
      ]);
      setShowEditModal(false);
      setFeedback(isBn ? 'ডেমো মামলা আপডেট হয়েছে।' : 'Demo case updated and alert added.');
      return;
    }

    setUpdatingCase(true);
    try {
      const res = await api.updateCase(selectedCase.id, editForm);
      if (res.success) {
        setShowEditModal(false);
        await loadData();
        setFeedback(
          isBn
            ? 'মামলার তথ্য ও শুনানির তারিখ আপডেট হয়েছে এবং নোটিফিকেশন পাঠানো হয়েছে।'
            : 'Case updated and notification generated.'
        );
      }
    } catch (err) {
      setError(err.message || 'Failed to update case');
    } finally {
      setUpdatingCase(false);
    }
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!selectedCase || (!docFile && !docTitle.trim())) return;

    if (demoMode) {
      const docName = docTitle.trim() || docFile?.name || 'Demo_Document.txt';
      const isOrder = docCategory === 'Court Order';
      const newDoc = {
        id: `d-doc-${Date.now()}`,
        name: docName,
        category: docCategory,
        isCourtOrder: isOrder,
        uploadedBy: 'Demo Client',
        uploadedAt: new Date().toISOString(),
        demoContent: `DEMO DOCUMENT\nTitle: ${docName}\nCategory: ${docCategory}\nCase: ${selectedCase.title}`
      };
      setCases((prev) =>
        prev.map((c) =>
          c.id === selectedCase.id
            ? { ...c, documents: [...(c.documents || []), newDoc] }
            : c
        )
      );
      setDocFile(null);
      setDocTitle('');
      setFeedback(isBn ? 'ডেমো নথি যুক্ত হয়েছে।' : 'Demo document added to case folder.');
      return;
    }

    setUploadingDoc(true);
    try {
      const formData = new FormData();
      if (docFile) formData.append('file', docFile);
      formData.append('title', docTitle.trim() || docFile?.name || 'Legal Document');
      formData.append('category', docCategory);
      formData.append('isCourtOrder', String(docCategory === 'Court Order'));

      const res = await api.uploadCaseDocument(selectedCase.id, formData);
      if (res.success) {
        setDocFile(null);
        setDocTitle('');
        await loadData();
        setFeedback(isBn ? 'নথি সফলভাবে আপলোড হয়েছে।' : 'Document uploaded to case folder.');
      }
    } catch (err) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleViewDocument = async (doc) => {
    if (!selectedCase) return;
    if (demoMode) {
      setPreviewDoc({
        name: doc.name,
        category: doc.category,
        text: doc.demoContent || `Demo preview for ${doc.name}`,
        mimeType: 'text/plain'
      });
      return;
    }
    setPreviewLoading(true);
    try {
      const { blob, contentType } = await api.fetchCaseDocumentBlob(selectedCase.id, doc.id, true);
      if (contentType.startsWith('text/')) {
        const text = await blob.text();
        setPreviewDoc({ name: doc.name, category: doc.category, text, mimeType: contentType });
      } else {
        const url = URL.createObjectURL(blob);
        setPreviewDoc({ name: doc.name, category: doc.category, url, mimeType: contentType });
      }
    } catch (err) {
      setError(err.message || 'Unable to preview document');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleDownloadDocument = async (doc) => {
    if (!selectedCase) return;
    if (demoMode) {
      const blob = new Blob([doc.demoContent || doc.name], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return;
    }
    try {
      const { blob } = await api.fetchCaseDocumentBlob(selectedCase.id, doc.id, false);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.originalName || doc.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Unable to download document');
    }
  };

  const handleMarkRead = async (notifId) => {
    if (demoMode) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
      );
      return;
    }
    try {
      await api.markCaseNotificationRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    if (demoMode) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      return;
    }
    try {
      await api.markAllCaseNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const closePreview = () => {
    if (previewDoc?.url) URL.revokeObjectURL(previewDoc.url);
    setPreviewDoc(null);
  };

  const activeMeta = activeSection ? PANEL_META[activeSection] : null;
  const ActiveIcon = activeMeta?.icon || Scale;

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        {/* Top Visual Flow Diagram */}
        <CaseTrackingFlowHeader
          isAuthenticated={isAuthenticated}
          user={user}
          eligible={eligible}
          eligibilityReason={eligibilityReason}
          demoMode={demoMode}
          onToggleDemo={handleToggleDemo}
          casesCount={cases.length}
          selectedCase={selectedCase}
          unreadCount={unreadCount}
          activeSection={activeSection}
          onSelectSection={handleSelectFlowCard}
          onOpenCreate={() => setShowCreateModal(true)}
          isBn={isBn}
        />

        {feedback && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-bdGreen-900 text-xs font-semibold">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </span>
            <button type="button" onClick={() => setFeedback('')} className="p-1 hover:bg-emerald-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-bdRed-600 text-xs font-semibold">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </span>
            <button type="button" onClick={() => setError('')} className="p-1 hover:bg-rose-100 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Focused Details Panel — ONLY shown when eligible client (or demo mode) clicks an option */}
        {((isAuthenticated && eligible) || demoMode) && activeSection && (
          <div
            ref={workspaceRef}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[#CFE2FF] shadow-sm overflow-hidden scroll-mt-24"
          >
            {/* Panel Header */}
            <div className="bg-[#F5F9FF] px-4 sm:px-6 py-4 border-b border-[#CFE2FF] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#CFE2FF] text-[#2563EB] flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-slate-900">
                    {isBn ? activeMeta.bn : activeMeta.en}
                  </h2>
                  {selectedCase && activeSection !== 'status' && activeSection !== 'notifications' && (
                    <p className="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md">
                      {selectedCase.title}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedCase && (activeSection === 'status' || activeSection === 'hearings') && (
                  <button
                    type="button"
                    onClick={() => openEditModal(selectedCase)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>
                      {activeSection === 'hearings'
                        ? isBn
                          ? 'শুনানি আপডেট'
                          : 'Update Hearing'
                        : isBn
                        ? 'অবস্থা আপডেট'
                        : 'Update Status'}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveSection(null)}
                  aria-label="Close details"
                  className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              {loading ? (
                <div className="py-10 text-center space-y-2">
                  <Loader2 className="w-7 h-7 animate-spin text-[#2563EB] mx-auto" />
                  <p className="text-xs font-semibold text-slate-500">
                    {isBn ? 'তথ্য লোড হচ্ছে...' : 'Loading details...'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Case Selector Pills for Hearings / History / Documents */}
                  {cases.length > 0 &&
                    (activeSection === 'hearings' ||
                      activeSection === 'history' ||
                      activeSection === 'documents') && (
                      <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                          {isBn ? 'মামলা নির্বাচন:' : 'Case:'}
                        </span>
                        {cases.map((c) => {
                          const isCurrent = selectedCase?.id === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setSelectedCaseId(c.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all text-left truncate max-w-[260px] ${
                                isCurrent
                                  ? 'bg-[#EBF4FF] border-[#2563EB] text-[#1D4ED8]'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#93C5FD]'
                              }`}
                            >
                              #{c.id} · {c.title}
                            </button>
                          );
                        })}
                      </div>
                    )}

                  {/* 1. CASE STATUS DETAILS ONLY */}
                  {activeSection === 'status' && (
                    <div className="space-y-5">
                      <CaseStatusCards
                        statusCounts={statusCounts}
                        statusFilter={statusFilter}
                        onToggleFilter={setStatusFilter}
                        isBn={isBn}
                      />

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="relative flex-1 sm:max-w-md">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                              isBn
                                ? 'মামলার শিরোনাম, আদালত বা ধরন দিয়ে খুঁজুন...'
                                : 'Search by case title, court name, or category...'
                            }
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setStatusFilter('all')}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap ${
                            statusFilter === 'all'
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-[#93C5FD]'
                          }`}
                        >
                          {isBn ? `সবগুলো (${cases.length})` : `All Cases (${cases.length})`}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        <div className="lg:col-span-5">
                          <CaseListSidebar
                            cases={filteredCases}
                            selectedCase={selectedCase}
                            onSelectCase={setSelectedCaseId}
                            isBn={isBn}
                          />
                        </div>

                        <div className="lg:col-span-7">
                          {selectedCase && (
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                                  CASE #{selectedCase.id}
                                </span>
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                    getStatusInfo(selectedCase.status).badgeClass
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      getStatusInfo(selectedCase.status).dotClass
                                    }`}
                                  />
                                  {isBn
                                    ? getStatusInfo(selectedCase.status).bnLabel
                                    : getStatusInfo(selectedCase.status).enLabel}
                                </span>
                              </div>

                              <div>
                                <h3 className="font-serif font-bold text-lg text-slate-900">
                                  {selectedCase.title}
                                </h3>
                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                  {selectedCase.incident_description ||
                                    getStatusInfo(selectedCase.status).enDesc}
                                </p>
                              </div>

                              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  {isBn ? 'অবস্থার বিবরণ' : 'Status Meaning'}
                                </span>
                                <p className="text-xs font-semibold text-slate-800">
                                  {isBn
                                    ? getStatusInfo(selectedCase.status).bnDesc
                                    : getStatusInfo(selectedCase.status).enDesc}
                                </p>
                              </div>

                              {(selectedCase.related_laws || []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {selectedCase.related_laws.map((law) => (
                                    <span
                                      key={law}
                                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-bdGreen-900"
                                    >
                                      {law}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. HEARING DATES DETAILS ONLY */}
                  {activeSection === 'hearings' && selectedCase && (
                    <CaseHearingPanel
                      selectedCase={selectedCase}
                      hearingNotifications={hearingNotifications}
                      isBn={isBn}
                    />
                  )}

                  {/* 3. CASE HISTORY DETAILS ONLY */}
                  {activeSection === 'history' && selectedCase && (
                    <CaseHistoryTimeline
                      history={selectedCase.history || []}
                      onOpenAddNote={() => openEditModal(selectedCase)}
                      isBn={isBn}
                    />
                  )}

                  {/* 4. NOTIFICATIONS DETAILS ONLY */}
                  {activeSection === 'notifications' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setNotifScope('all')}
                            className={`px-3 py-1.5 rounded-lg font-bold border ${
                              notifScope === 'all'
                                ? 'bg-[#EBF4FF] border-[#2563EB] text-[#1D4ED8]'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {isBn ? `সকল মামলা (${notifications.length})` : `All Cases (${notifications.length})`}
                          </button>
                          {selectedCase && (
                            <button
                              type="button"
                              onClick={() => setNotifScope('case')}
                              className={`px-3 py-1.5 rounded-lg font-bold border truncate max-w-[220px] ${
                                notifScope === 'case'
                                  ? 'bg-[#EBF4FF] border-[#2563EB] text-[#1D4ED8]'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              #{selectedCase.id} ({selectedCaseNotifications.length})
                            </button>
                          )}
                        </div>
                      </div>

                      <CaseNotificationsPanel
                        notifications={notifScope === 'case' ? selectedCaseNotifications : notifications}
                        onMarkRead={handleMarkRead}
                        onMarkAllRead={handleMarkAllRead}
                        isBn={isBn}
                      />
                    </div>
                  )}

                  {/* 5. DOCUMENT MANAGEMENT DETAILS ONLY */}
                  {activeSection === 'documents' && selectedCase && (
                    <CaseDocumentsPanel
                      documents={selectedCase.documents || []}
                      docFilter={docFilter}
                      onFilterChange={setDocFilter}
                      docTitle={docTitle}
                      onDocTitleChange={setDocTitle}
                      docCategory={docCategory}
                      onDocCategoryChange={setDocCategory}
                      docFile={docFile}
                      onDocFileChange={setDocFile}
                      uploadingDoc={uploadingDoc}
                      previewLoading={previewLoading}
                      onUpload={handleUploadDocument}
                      onView={handleViewDocument}
                      onDownload={handleDownloadDocument}
                      isBn={isBn}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateCaseModal
          newCase={newCase}
          onChange={setNewCase}
          onSubmit={handleCreateCase}
          onClose={() => setShowCreateModal(false)}
          creating={creatingCase}
          isBn={isBn}
        />
      )}

      {showEditModal && selectedCase && (
        <UpdateCaseModal
          editForm={editForm}
          onChange={setEditForm}
          onSubmit={handleUpdateCase}
          onClose={() => setShowEditModal(false)}
          updating={updatingCase}
          isBn={isBn}
        />
      )}

      <DocumentPreviewModal previewDoc={previewDoc} onClose={closePreview} />
    </div>
  );
}
