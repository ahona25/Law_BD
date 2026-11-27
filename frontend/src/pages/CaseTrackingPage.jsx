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

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-bdGreen-900 text-xs font-bold">
              <Scale className="w-3.5 h-3.5 text-bdGreen-700" />
              <span>{isBn ? 'রিয়েল-টাইম মামলা পর্যবেক্ষণ' : 'Live Legal Case Tracking'}</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              {isBn ? 'মামলা ট্র্যাকিং ও শুনানি ব্যবস্থাপনা' : 'Case Tracking & Hearing Manager'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              {isBn
                ? 'আপনার মামলার বর্তমান অবস্থা, পরবর্তী শুনানির তারিখ ও সময়, কালানুক্রমিক ইতিহাস, আদালতের আদেশ ও নথি এবং তাৎক্ষণিক নোটিফিকেশন এক জায়গায় দেখুন।'
                : 'Monitor live case status, upcoming hearing dates & times, chronological case history, court orders & documents, and instant case notifications.'}
            </p>
          </div>

          {isAuthenticated && (
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setNotifDrawerOpen((prev) => !prev)}
                className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all shadow-2xs"
              >
                {unreadCount > 0 ? (
                  <BellRing className="w-4 h-4 text-bdRed-500" />
                ) : (
                  <Bell className="w-4 h-4 text-bdGreen-800" />
                )}
                <span>{isBn ? 'নোটিফিকেশন' : 'Notifications'}</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-bdRed-500 text-white rounded-full leading-none">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{isBn ? 'নতুন মামলা যোগ করুন' : 'Register New Case'}</span>
              </button>
            </div>
          )}
        </div>

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

        {isAuthenticated && notifDrawerOpen && (
          <GlobalNotificationsDrawer
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onClose={() => setNotifDrawerOpen(false)}
            isBn={isBn}
          />
        )}

        {!isAuthenticated ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs text-center max-w-2xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-bdGreen-800 flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                {isBn ? 'আপনার মামলা ট্র্যাক করতে সাইন ইন করুন' : 'Sign In to Track Your Legal Cases'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                {isBn
                  ? 'নিরাপদভাবে মামলার অবস্থা, শুনানির তারিখ, মামলার ইতিহাস, আদালতের আদেশ ও নথি দেখতে লগইন করুন অথবা নিচের ডেমো অ্যাকাউন্ট দিয়ে পরীক্ষা করুন।'
                  : 'Sign in to view live case statuses, hearing dates, chronological history, court orders & documents, or try immediately with a demo account.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-bdGreen-800 hover:bg-bdGreen-700 text-white text-xs font-bold shadow-sm transition-colors"
              >
                {isBn ? 'সাইন ইন করুন' : 'Sign In'}
              </Link>
              <button
                type="button"
                onClick={() => demoLogin('client')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? 'ডেমো ক্লায়েন্ট (রহিম)' : 'Demo Client (Rahim)'}</span>
              </button>
              <button
                type="button"
                onClick={() => demoLogin('lawyer')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-colors"
              >
                <User className="w-3.5 h-3.5 text-bdGreen-800" />
                <span>{isBn ? 'ডেমো আইনজীবী (তানভীর)' : 'Demo Advocate (Tanvir)'}</span>
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="bg-white rounded-3xl p-16 border border-slate-200 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-bdGreen-800 mx-auto" />
            <p className="text-xs font-semibold text-slate-500">
              {isBn ? 'মামলার তথ্য লোড হচ্ছে...' : 'Loading case tracking records...'}
            </p>
          </div>
        ) : (
          <>
            <CaseStatusCards
              statusCounts={statusCounts}
              statusFilter={statusFilter}
              onToggleFilter={setStatusFilter}
              isBn={isBn}
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-bdGreen-800"
                />
              </div>

              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-bdGreen-800 text-white border-bdGreen-800'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {isBn ? `সবগুলো (${cases.length})` : `All Cases (${cases.length})`}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <CaseListSidebar
                  cases={filteredCases}
                  selectedCase={selectedCase}
                  onSelectCase={setSelectedCaseId}
                  isBn={isBn}
                />
              </div>

              <div className="lg:col-span-8">
                {selectedCase ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
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
                        <h2 className="font-serif font-bold text-xl text-slate-900">
                          {selectedCase.title}
                        </h2>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {selectedCase.incident_description ||
                            getStatusInfo(selectedCase.status).enDesc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openEditModal(selectedCase)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-bdGreen-900 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all"
                      >
                        <Gavel className="w-3.5 h-3.5" />
                        <span>{isBn ? 'অবস্থা / শুনানি আপডেট' : 'Update Status / Hearing'}</span>
                      </button>
                    </div>

                    <div className="flex border-b border-slate-200 px-4 sm:px-6 overflow-x-auto gap-1 text-xs font-bold">
                      {[
                        {
                          id: 'overview',
                          icon: Calendar,
                          label: isBn ? 'অবস্থা ও শুনানি' : 'Status & Hearing'
                        },
                        {
                          id: 'history',
                          icon: History,
                          label: `${isBn ? 'মামলার ইতিহাস' : 'Case History'} (${
                            selectedCase.history?.length || 0
                          })`
                        },
                        {
                          id: 'documents',
                          icon: FolderOpen,
                          label: `${isBn ? 'নথি ও আদেশ' : 'Documents'} (${
                            selectedCase.documents?.length || 0
                          })`
                        },
                        {
                          id: 'notifications',
                          icon: Bell,
                          label: `${isBn ? 'নোটিফিকেশন' : 'Notifications'} (${
                            selectedCaseNotifications.length
                          })`
                        }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3.5 px-3 sm:px-4 border-b-2 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                              active
                                ? 'border-bdGreen-800 text-bdGreen-900'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-6">
                      {activeTab === 'overview' && (
                        <CaseHearingPanel
                          selectedCase={selectedCase}
                          hearingNotifications={hearingNotifications}
                          isBn={isBn}
                        />
                      )}

                      {activeTab === 'history' && (
                        <CaseHistoryTimeline
                          history={selectedCase.history || []}
                          onOpenAddNote={() => openEditModal(selectedCase)}
                          isBn={isBn}
                        />
                      )}

                      {activeTab === 'documents' && (
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

                      {activeTab === 'notifications' && (
                        <CaseNotificationsPanel
                          notifications={selectedCaseNotifications}
                          onMarkRead={handleMarkRead}
                          onMarkAllRead={handleMarkAllRead}
                          isBn={isBn}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                    <Scale className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-xs font-semibold text-slate-500">
                      {isBn
                        ? 'বিস্তারিত দেখতে বাম দিক থেকে একটি মামলা নির্বাচন করুন।'
                        : 'Select a case on the left or register a new case to start tracking.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
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
