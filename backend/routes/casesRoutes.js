import express from 'express';
import { db } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// List cases for current user (client or assigned lawyer)
router.get('/', authenticate, (req, res) => {
  let cases = [];
  if (req.user.role === 'client') {
    cases = db.find('cases', c => Number(c.client_id) === Number(req.user.id));
  } else if (req.user.role === 'lawyer') {
    const lawyerProfile = db.findOne('lawyers', { user_id: req.user.id });
    if (lawyerProfile) {
      cases = db.find('cases', c => Number(c.lawyer_id) === Number(lawyerProfile.id));
    }
  } else if (req.user.role === 'admin') {
    cases = db.find('cases');
  }

  cases.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json({
    success: true,
    count: cases.length,
    cases
  });
});

// Create new case
router.post('/', authenticate, (req, res) => {
  try {
    const {
      title,
      category,
      incident_description,
      related_laws = [],
      lawyer_id,
      court_name,
      next_hearing_date,
      documents = []
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Case title and category are required' });
    }

    const newCase = db.insert('cases', {
      client_id: req.user.id,
      client_name: req.user.name,
      lawyer_id: lawyer_id ? Number(lawyer_id) : null,
      title,
      category,
      incident_description: incident_description || '',
      related_laws: Array.isArray(related_laws) ? related_laws : [related_laws],
      status: 'under_review',
      court_name: court_name || 'Pending Jurisdiction',
      next_hearing_date: next_hearing_date || null,
      private_notes: [
        { date: new Date().toISOString().split('T')[0], note: 'Case record initiated on Law_BD platform.' }
      ],
      documents: Array.isArray(documents) ? documents : [documents]
    });

    db.logAudit(req.user.id, 'CASE_CREATED', 'CASES', newCase.id, `Created case: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Legal case record created',
      legalCase: newCase
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create case' });
  }
});

// Update case
router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const existing = db.findById('cases', id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Case not found' });
  }

  const { title, status, court_name, next_hearing_date, note } = req.body;
  const updates = {};
  if (title) updates.title = title;
  if (status) updates.status = status;
  if (court_name) updates.court_name = court_name;
  if (next_hearing_date) updates.next_hearing_date = next_hearing_date;

  if (note) {
    const currentNotes = existing.private_notes || [];
    updates.private_notes = [
      ...currentNotes,
      { date: new Date().toISOString().split('T')[0], note }
    ];
  }

  const updated = db.update('cases', id, updates);
  res.json({ success: true, message: 'Case updated successfully', legalCase: updated });
});

export default router;
