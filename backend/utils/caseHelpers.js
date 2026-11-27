import { db } from '../db/database.js';

export const STATUS_LABELS = {
  pending: 'Pending',
  ongoing: 'Pending',
  hearing_scheduled: 'Hearing Scheduled',
  under_review: 'Under Review',
  disposed: 'Disposed'
};

export function normalizeStatus(status) {
  if (!status) return 'under_review';
  if (status === 'ongoing') return 'pending';
  return status;
}

export function getUserCases(user) {
  let cases = [];
  if (user.role === 'client') {
    cases = db.find('cases', (c) => Number(c.client_id) === Number(user.id));
  } else if (user.role === 'lawyer') {
    const lawyerProfile = db.findOne('lawyers', { user_id: user.id });
    if (lawyerProfile) {
      cases = db.find('cases', (c) => Number(c.lawyer_id) === Number(lawyerProfile.id));
    }
  } else if (user.role === 'admin') {
    cases = db.find('cases');
  }
  return cases.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function canAccessCase(user, legalCase) {
  if (!legalCase) return false;
  if (user.role === 'admin') return true;
  if (Number(legalCase.client_id) === Number(user.id)) return true;
  if (user.role === 'lawyer') {
    const lawyerProfile = db.findOne('lawyers', { user_id: user.id });
    return !!(lawyerProfile && Number(legalCase.lawyer_id) === Number(lawyerProfile.id));
  }
  return false;
}

export function normalizeDocuments(docs = [], caseId, createdAt) {
  return (Array.isArray(docs) ? docs : [docs]).filter(Boolean).map((doc, idx) => {
    if (typeof doc === 'string') {
      const lower = doc.toLowerCase();
      const isOrder = lower.includes('order') || lower.includes('notice');
      return {
        id: `sample-${caseId}-${idx + 1}`,
        name: doc,
        originalName: doc,
        category: isOrder ? 'Court Order' : 'Case Filing',
        isCourtOrder: lower.includes('order'),
        fileUrl: null,
        mimeType: 'text/plain',
        uploadedBy: 'Case Registry',
        uploadedAt: createdAt || new Date().toISOString(),
        isSample: true
      };
    }
    return doc;
  });
}

export function normalizeHistory(legalCase) {
  if (Array.isArray(legalCase.history) && legalCase.history.length > 0) {
    return [...legalCase.history].sort(
      (a, b) => new Date(a.timestamp || a.date) - new Date(b.timestamp || b.date)
    );
  }

  const createdDate = (legalCase.created_at || new Date().toISOString()).split('T')[0];
  const entries = [
    {
      id: `hist-init-${legalCase.id}`,
      date: createdDate,
      timestamp: legalCase.created_at || new Date().toISOString(),
      type: 'registration',
      title: 'Case Registered',
      details: `Case "${legalCase.title}" registered under ${legalCase.category}.`,
      actor: legalCase.client_name || 'Citizen / Client'
    }
  ];

  (legalCase.private_notes || []).forEach((n, idx) => {
    entries.push({
      id: `hist-note-${legalCase.id}-${idx + 1}`,
      date: n.date || createdDate,
      timestamp: n.timestamp || (n.date ? `${n.date}T10:00:00.000Z` : new Date().toISOString()),
      type: 'update',
      title: 'Case Activity Recorded',
      details: n.note,
      actor: 'Advocate / Registry'
    });
  });

  if (legalCase.next_hearing_date) {
    entries.push({
      id: `hist-hearing-${legalCase.id}`,
      date: createdDate,
      timestamp: legalCase.updated_at || legalCase.created_at || new Date().toISOString(),
      type: 'hearing',
      title: 'Hearing Scheduled',
      details: `Next hearing set for ${legalCase.next_hearing_date}${
        legalCase.next_hearing_time ? ` at ${legalCase.next_hearing_time}` : ' at 10:30 AM'
      } (${legalCase.court_name}).`,
      actor: 'Court Registry'
    });
  }

  return entries.sort((a, b) => new Date(a.timestamp || a.date) - new Date(b.timestamp || b.date));
}

export function serializeCase(legalCase) {
  return {
    ...legalCase,
    status: normalizeStatus(legalCase.status),
    next_hearing_time: legalCase.next_hearing_time || (legalCase.next_hearing_date ? '10:30 AM' : null),
    documents: normalizeDocuments(legalCase.documents, legalCase.id, legalCase.created_at),
    history: normalizeHistory(legalCase)
  };
}

export function addCaseNotification(legalCase, type, title, message, actorName) {
  return db.insert('case_notifications', {
    case_id: Number(legalCase.id),
    case_title: legalCase.title,
    client_id: Number(legalCase.client_id),
    lawyer_id: legalCase.lawyer_id ? Number(legalCase.lawyer_id) : null,
    type,
    title,
    message,
    actor: actorName || 'Case Registry',
    read_by: []
  });
}

export function ensureInitialNotifications(cases) {
  const existingAll = db.find('case_notifications');
  cases.forEach((c) => {
    const hasForCase = existingAll.some((n) => Number(n.case_id) === Number(c.id));
    if (!hasForCase) {
      if (c.next_hearing_date) {
        addCaseNotification(
          c,
          'hearing_change',
          'Hearing Date Scheduled',
          `Hearing scheduled for ${c.next_hearing_date} (${c.next_hearing_time || '10:30 AM'}) at ${c.court_name}.`,
          'Court Registry'
        );
      }
      addCaseNotification(
        c,
        'status_change',
        `Case Status: ${STATUS_LABELS[normalizeStatus(c.status)] || 'Active'}`,
        `"${c.title}" is currently marked as ${STATUS_LABELS[normalizeStatus(c.status)] || c.status}.`,
        'Law_BD Case Tracker'
      );
    }
  });
}
