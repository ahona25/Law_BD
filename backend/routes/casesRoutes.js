import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';
import {
  STATUS_LABELS,
  normalizeStatus,
  getClientFixedLawyers,
  hasClientFixedCaseWithLawyer,
  getUserCases,
  canAccessCase,
  normalizeDocuments,
  normalizeHistory,
  serializeCase,
  addCaseNotification,
  ensureInitialNotifications
} from '../utils/caseHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CASE_UPLOADS_DIR = path.join(__dirname, '../uploads/cases');

if (!fs.existsSync(CASE_UPLOADS_DIR)) {
  fs.mkdirSync(CASE_UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, CASE_UPLOADS_DIR),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `case-${req.params.id}-${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const router = express.Router();

function requireEligibleClient(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Please sign in as a client to access Case Tracking.' });
  }
  if (req.user.role !== 'client') {
    return res.status(403).json({
      success: false,
      reason: 'not_client',
      error: 'Only clients can use Case Tracking.'
    });
  }
  if (!hasClientFixedCaseWithLawyer(req.user)) {
    return res.status(403).json({
      success: false,
      reason: 'no_lawyer_case',
      error: 'You must first fix a case or consultation with a lawyer before using Case Tracking.'
    });
  }
  next();
}

// Check whether the authenticated user is an eligible client with a fixed lawyer case
router.get('/eligibility', authenticate, (req, res) => {
  if (req.user.role !== 'client') {
    return res.json({
      success: true,
      eligible: false,
      role: req.user.role,
      reason: 'not_client',
      fixedLawyers: []
    });
  }
  const fixedLawyers = getClientFixedLawyers(req.user);
  return res.json({
    success: true,
    eligible: fixedLawyers.length > 0,
    role: req.user.role,
    reason: fixedLawyers.length > 0 ? null : 'no_lawyer_case',
    fixedLawyers
  });
});

// List cases for eligible client
router.get('/', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const rawCases = getUserCases(activeUser);
  ensureInitialNotifications(rawCases);
  const cases = rawCases.map(serializeCase);

  const caseIds = new Set(cases.map((c) => Number(c.id)));
  const notifications = db
    .find('case_notifications', (n) => caseIds.has(Number(n.case_id)))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const unreadCount = notifications.filter(
    (n) => !(n.read_by || []).includes(Number(activeUser.id))
  ).length;

  res.json({
    success: true,
    count: cases.length,
    unreadNotificationsCount: unreadCount,
    cases
  });
});

// Get notifications for eligible client's cases
router.get('/notifications', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const cases = getUserCases(activeUser);
  ensureInitialNotifications(cases);
  const caseIds = new Set(cases.map((c) => Number(c.id)));

  const notifications = db
    .find('case_notifications', (n) => caseIds.has(Number(n.case_id)))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((n) => ({
      ...n,
      read: (n.read_by || []).includes(Number(activeUser.id))
    }));

  res.json({
    success: true,
    unreadCount: notifications.filter((n) => !n.read).length,
    notifications
  });
});

// Mark all notifications read for eligible client
router.patch('/notifications/read-all', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const cases = getUserCases(activeUser);
  const caseIds = new Set(cases.map((c) => Number(c.id)));
  const userId = Number(activeUser.id);

  const userNotifs = db.find('case_notifications', (n) => caseIds.has(Number(n.case_id)));
  userNotifs.forEach((n) => {
    const readBy = Array.isArray(n.read_by) ? n.read_by : [];
    if (!readBy.includes(userId)) {
      db.update('case_notifications', n.id, { read_by: [...readBy, userId] });
    }
  });

  res.json({ success: true, message: 'All notifications marked as read' });
});

// Mark a single notification as read
router.patch('/notifications/:notifId/read', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const notif = db.findById('case_notifications', req.params.notifId);
  if (!notif) {
    return res.status(404).json({ success: false, error: 'Notification not found' });
  }

  const userId = Number(activeUser.id);
  const readBy = Array.isArray(notif.read_by) ? notif.read_by : [];
  if (!readBy.includes(userId)) {
    db.update('case_notifications', notif.id, { read_by: [...readBy, userId] });
  }

  res.json({ success: true, message: 'Notification marked as read' });
});

// Create new case (only eligible client; links to fixed lawyer)
router.post('/', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  try {
    const {
      title,
      category,
      incident_description,
      related_laws = [],
      lawyer_id,
      court_name,
      next_hearing_date,
      next_hearing_time,
      status,
      documents = []
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Case title and category are required' });
    }

    const fixedLawyers = getClientFixedLawyers(activeUser);
    const resolvedLawyerId = lawyer_id ? Number(lawyer_id) : fixedLawyers[0]?.id;

    const initialStatus = normalizeStatus(status) || (next_hearing_date ? 'hearing_scheduled' : 'under_review');
    const nowIso = new Date().toISOString();
    const today = nowIso.split('T')[0];

    const history = [
      {
        id: `hist-${Date.now()}-1`,
        date: today,
        timestamp: nowIso,
        type: 'registration',
        title: 'Case Registered',
        details: `Case "${title}" filed under ${category}.`,
        actor: activeUser.name
      }
    ];

    if (next_hearing_date) {
      history.push({
        id: `hist-${Date.now()}-2`,
        date: today,
        timestamp: nowIso,
        type: 'hearing',
        title: 'Initial Hearing Scheduled',
        details: `Scheduled for ${next_hearing_date}${next_hearing_time ? ` at ${next_hearing_time}` : ''} (${court_name || 'Pending Jurisdiction'}).`,
        actor: activeUser.name
      });
    }

    const newCase = db.insert('cases', {
      client_id: activeUser.id,
      client_name: activeUser.name,
      lawyer_id: resolvedLawyerId || null,
      title,
      category,
      incident_description: incident_description || '',
      related_laws: Array.isArray(related_laws) ? related_laws : [related_laws],
      status: initialStatus,
      court_name: court_name || 'Pending Jurisdiction',
      next_hearing_date: next_hearing_date || null,
      next_hearing_time: next_hearing_time || null,
      private_notes: [
        { date: today, note: 'Case record initiated on Law_BD platform.' }
      ],
      history,
      documents: Array.isArray(documents) ? documents : [documents]
    });

    addCaseNotification(
      newCase,
      'case_created',
      'New Case Registered',
      `Case "${title}" (${STATUS_LABELS[initialStatus] || initialStatus}) is now active in Case Tracking.`,
      activeUser.name
    );

    db.logAudit(activeUser.id, 'CASE_CREATED', 'CASES', newCase.id, `Created case: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Legal case record created',
      legalCase: serializeCase(newCase)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create case' });
  }
});

// Update case (status, hearing date/time, court name, activity note)
router.put('/:id', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const { id } = req.params;
  const existing = db.findById('cases', id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Case not found' });
  }
  if (!canAccessCase(activeUser, existing)) {
    return res.status(403).json({ success: false, error: 'Access denied for this case' });
  }

  const { title, status, court_name, next_hearing_date, next_hearing_time, note } = req.body;
  const updates = {};
  const nowIso = new Date().toISOString();
  const today = nowIso.split('T')[0];
  const history = normalizeHistory(existing);

  if (title && title !== existing.title) {
    updates.title = title;
  }

  const prevStatus = normalizeStatus(existing.status);
  const nextStatus = status ? normalizeStatus(status) : prevStatus;
  if (status && nextStatus !== prevStatus) {
    updates.status = nextStatus;
    const statusLabel = STATUS_LABELS[nextStatus] || nextStatus;
    history.push({
      id: `hist-${Date.now()}-status`,
      date: today,
      timestamp: nowIso,
      type: 'status',
      title: `Status Updated to ${statusLabel}`,
      details: `Case status changed from ${STATUS_LABELS[prevStatus] || prevStatus} to ${statusLabel}.`,
      actor: activeUser.name
    });
    addCaseNotification(
      existing,
      'status_change',
      `Case Status: ${statusLabel}`,
      `Status for "${existing.title}" changed to ${statusLabel}.`,
      activeUser.name
    );
  }

  const hearingDateChanged =
    next_hearing_date !== undefined && next_hearing_date !== existing.next_hearing_date;
  const hearingTimeChanged =
    next_hearing_time !== undefined && next_hearing_time !== existing.next_hearing_time;
  const courtChanged = court_name && court_name !== existing.court_name;

  if (court_name !== undefined) updates.court_name = court_name;
  if (next_hearing_date !== undefined) updates.next_hearing_date = next_hearing_date || null;
  if (next_hearing_time !== undefined) updates.next_hearing_time = next_hearing_time || null;

  if (hearingDateChanged || hearingTimeChanged || courtChanged) {
    const targetCourt = court_name || existing.court_name;
    const targetDate = next_hearing_date !== undefined ? next_hearing_date : existing.next_hearing_date;
    const targetTime = next_hearing_time !== undefined ? next_hearing_time : existing.next_hearing_time;
    const detail = targetDate
      ? `Hearing updated: ${targetDate}${targetTime ? ` at ${targetTime}` : ''} · ${targetCourt}.`
      : `Court updated to ${targetCourt}.`;

    history.push({
      id: `hist-${Date.now()}-hearing`,
      date: today,
      timestamp: nowIso,
      type: 'hearing',
      title: 'Hearing Schedule Updated',
      details: detail,
      actor: activeUser.name
    });

    addCaseNotification(
      existing,
      'hearing_change',
      'Hearing Date / Court Updated',
      detail,
      activeUser.name
    );
  }

  if (note && note.trim()) {
    const currentNotes = existing.private_notes || [];
    updates.private_notes = [...currentNotes, { date: today, note: note.trim() }];
    history.push({
      id: `hist-${Date.now()}-note`,
      date: today,
      timestamp: nowIso,
      type: 'update',
      title: 'Case Update Added',
      details: note.trim(),
      actor: activeUser.name
    });
    addCaseNotification(
      existing,
      'case_update',
      'New Case Information Added',
      note.trim(),
      activeUser.name
    );
  }

  updates.history = history;
  const updated = db.update('cases', id, updates);

  res.json({
    success: true,
    message: 'Case updated successfully',
    legalCase: serializeCase(updated)
  });
});

// Upload document or court order to a case
router.post('/:id/documents', authenticate, requireEligibleClient, upload.single('file'), (req, res) => {
  const activeUser = req.user;
  const { id } = req.params;
  const existing = db.findById('cases', id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Case not found' });
  }
  if (!canAccessCase(activeUser, existing)) {
    return res.status(403).json({ success: false, error: 'Access denied for this case' });
  }

  const { title, category = 'Case Filing', isCourtOrder } = req.body;
  if (!req.file && !title) {
    return res.status(400).json({ success: false, error: 'Please select a file or provide a document title' });
  }

  const nowIso = new Date().toISOString();
  const today = nowIso.split('T')[0];
  const docName = (title && title.trim()) || req.file?.originalname || 'Legal_Document.txt';
  const courtOrderFlag =
    isCourtOrder === true ||
    isCourtOrder === 'true' ||
    category.toLowerCase().includes('order');

  const newDoc = {
    id: `doc-${Date.now()}`,
    name: docName,
    originalName: req.file?.originalname || docName,
    category,
    isCourtOrder: courtOrderFlag,
    fileUrl: req.file ? `/uploads/cases/${req.file.filename}` : null,
    storedFilename: req.file?.filename || null,
    size: req.file?.size || null,
    mimeType: req.file?.mimetype || 'text/plain',
    uploadedBy: activeUser.name,
    uploadedAt: nowIso
  };

  const currentDocs = normalizeDocuments(existing.documents, existing.id, existing.created_at);
  const history = normalizeHistory(existing);

  history.push({
    id: `hist-${Date.now()}-doc`,
    date: today,
    timestamp: nowIso,
    type: courtOrderFlag ? 'court_order' : 'document',
    title: courtOrderFlag ? 'Court Order Uploaded' : 'Document Uploaded',
    details: `${docName} (${category}) added to case file.`,
    actor: activeUser.name
  });

  const updated = db.update('cases', id, {
    documents: [...currentDocs, newDoc],
    history
  });

  addCaseNotification(
    existing,
    courtOrderFlag ? 'court_order' : 'document_added',
    courtOrderFlag ? 'New Court Order Available' : 'New Case Document Uploaded',
    `${docName} (${category}) was added to "${existing.title}".`,
    activeUser.name
  );

  res.status(201).json({
    success: true,
    message: 'Document uploaded successfully',
    document: newDoc,
    legalCase: serializeCase(updated)
  });
});

// Download or view a case document (supports uploaded files and seeded sample documents)
router.get('/:id/documents/:docId/download', authenticate, requireEligibleClient, (req, res) => {
  const activeUser = req.user;
  const { id, docId } = req.params;
  const existing = db.findById('cases', id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Case not found' });
  }
  if (!canAccessCase(activeUser, existing)) {
    return res.status(403).json({ success: false, error: 'Access denied for this case' });
  }

  const docs = normalizeDocuments(existing.documents, existing.id, existing.created_at);
  const doc = docs.find((d) => String(d.id) === String(docId));
  if (!doc) {
    return res.status(404).json({ success: false, error: 'Document not found' });
  }

  if (doc.storedFilename) {
    const filePath = path.join(CASE_UPLOADS_DIR, doc.storedFilename);
    if (fs.existsSync(filePath)) {
      if (req.query.inline === '1') {
        return res.sendFile(filePath);
      }
      return res.download(filePath, doc.originalName || doc.name);
    }
  }

  const content = [
    'LAW_BD — OFFICIAL CASE DOCUMENT RECORD',
    '======================================',
    `Document: ${doc.name}`,
    `Category: ${doc.category}`,
    `Case Title: ${existing.title}`,
    `Court: ${existing.court_name}`,
    `Case Status: ${STATUS_LABELS[normalizeStatus(existing.status)] || existing.status}`,
    `Next Hearing: ${existing.next_hearing_date || 'Not scheduled'}`,
    `Uploaded By: ${doc.uploadedBy || 'Registry'}`,
    '',
    'Description / Summary:',
    existing.incident_description || 'Verified case filing on Law_BD.'
  ].join('\n');

  const safeDownloadName = `${doc.name.replace(/\.[^.]+$/, '')}.txt`;
  if (req.query.inline === '1') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(content);
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${safeDownloadName}"`);
  return res.send(content);
});

export default router;
