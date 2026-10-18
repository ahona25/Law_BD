import express from 'express';
import { db } from '../db/database.js';
import { authenticate, requireRole, optionalAuth } from '../middleware/auth.js';
import { ALL_30_LEGAL_CATEGORIES } from '../config/legalCategories.js';

const router = express.Router();

router.get('/categories', (req, res) => {
  const laws = db.find('laws');
  const categoryCounts = {};
  laws.forEach(law => {
    const cat = law.category || 'other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categories = ALL_30_LEGAL_CATEGORIES.map(cat => ({
    ...cat,
    count: categoryCounts[cat.id] || (laws.filter(l => l.category?.toLowerCase() === cat.id.toLowerCase() || l.category_label?.toLowerCase() === cat.name.toLowerCase()).length) || 1
  }));

  res.json({
    success: true,
    totalCount: categories.length,
    categories
  });
});

router.get('/', (req, res) => {
  const { q, category, status, year, subcategory } = req.query;
  let laws = db.find('laws');

  if (category && category !== 'all' && category !== 'All Legal Areas') {
    laws = laws.filter(l => {
      const matchId = l.category && l.category.toLowerCase() === category.toLowerCase();
      const matchLabel = l.category_label && l.category_label.toLowerCase().includes(category.toLowerCase());
      return matchId || matchLabel;
    });
  }

  if (subcategory && subcategory.trim()) {
    const subQ = subcategory.trim().toLowerCase();
    laws = laws.filter(l => {
      const titleMatch = l.title?.toLowerCase().includes(subQ);
      const bnMatch = l.bangla_title?.toLowerCase().includes(subQ);
      const summMatch = l.simple_summary?.toLowerCase().includes(subQ);
      const provMatch = l.key_provisions?.some(p => p.toLowerCase().includes(subQ));
      const actsMatch = l.acts?.some(a => a.toLowerCase().includes(subQ));
      return titleMatch || bnMatch || summMatch || provMatch || actsMatch;
    });
  }

  if (status && status !== 'all') {
    laws = laws.filter(l => l.status === status);
  }

  if (year) {
    laws = laws.filter(l => (l.act_no_year && l.act_no_year.includes(year)) || (l.enactment_date && l.enactment_date.includes(year)));
  }

  if (q && q.trim()) {
    const query = q.trim().toLowerCase();
    laws = laws.filter(l => {
      const titleMatch = l.title && l.title.toLowerCase().includes(query);
      const banglaTitleMatch = l.bangla_title && l.bangla_title.includes(query);
      const summaryMatch = l.simple_summary && l.simple_summary.toLowerCase().includes(query);
      const summaryBnMatch = l.simple_summary_bn && l.simple_summary_bn.includes(query);
      const tagMatch = l.tag && l.tag.toLowerCase().includes(query);
      const actsMatch = l.acts && l.acts.some(a => a.toLowerCase().includes(query));
      const provisionsMatch = l.key_provisions && l.key_provisions.some(p => p.toLowerCase().includes(query));
      return titleMatch || banglaTitleMatch || summaryMatch || summaryBnMatch || tagMatch || actsMatch || provisionsMatch;
    });
  }

  res.json({
    success: true,
    count: laws.length,
    laws
  });
});

// Get individual law detail
router.get('/:id', optionalAuth, (req, res) => {
  const { id } = req.params;
  const law = db.findById('laws', id);
  if (!law) {
    return res.status(404).json({ success: false, error: 'Law not found' });
  }

  // Check if saved by current user
  let isSaved = false;
  if (req.user) {
    const saved = db.findOne('saved_items', {
      user_id: req.user.id,
      item_type: 'law',
      item_id: id
    });
    isSaved = !!saved;
  }

  res.json({
    success: true,
    law,
    isSaved
  });
});

// Bookmark / Unbookmark a law
router.post('/:id/bookmark', authenticate, (req, res) => {
  const { id } = req.params;
  const existing = db.findOne('saved_items', {
    user_id: req.user.id,
    item_type: 'law',
    item_id: id
  });

  if (existing) {
    db.delete('saved_items', existing.id);
    return res.json({ success: true, saved: false, message: 'Removed from bookmarks' });
  } else {
    db.insert('saved_items', {
      user_id: req.user.id,
      item_type: 'law',
      item_id: id
    });
    return res.json({ success: true, saved: true, message: 'Added to bookmarks' });
  }
});

// Admin: Add new law
router.post('/', authenticate, requireRole('admin'), (req, res) => {
  try {
    const {
      title,
      bangla_title,
      category,
      category_label,
      act_no_year,
      tag,
      acts = [],
      simple_summary,
      simple_summary_bn,
      key_provisions = [],
      procedure_steps = [],
      penalties,
      penalties_bn,
      required_documents = [],
      immediate_actions = [],
      specialist_match,
      status = 'current',
      official_source_url,
      official_gazette_ref
    } = req.body;

    if (!title || !category || !simple_summary) {
      return res.status(400).json({ success: false, error: 'Title, category, and summary are required' });
    }

    const id = 'law-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newLaw = db.insert('laws', {
      id,
      title,
      bangla_title: bangla_title || title,
      category,
      category_label: category_label || category,
      act_no_year: act_no_year || 'Act of Parliament',
      tag: tag || title,
      acts: Array.isArray(acts) ? acts : [acts],
      simple_summary,
      simple_summary_bn: simple_summary_bn || simple_summary,
      key_provisions: Array.isArray(key_provisions) ? key_provisions : [],
      procedure_steps: Array.isArray(procedure_steps) ? procedure_steps : [],
      penalties: penalties || 'Statutory penalties as prescribed by the respective Act.',
      penalties_bn: penalties_bn || penalties,
      required_documents: Array.isArray(required_documents) ? required_documents : [],
      immediate_actions: Array.isArray(immediate_actions) ? immediate_actions : [],
      specialist_match: specialist_match || 'General Law',
      status,
      enactment_date: new Date().toISOString().split('T')[0],
      last_amended: new Date().toISOString().split('T')[0],
      official_source_url: official_source_url || 'http://bdlaws.minlaw.gov.bd/',
      official_gazette_ref: official_gazette_ref || 'Official Gazette'
    });

    db.logAudit(req.user.id, 'LAW_CREATED', 'LAWS', newLaw.id, `Created law: ${newLaw.title}`);
    res.status(201).json({ success: true, message: 'Law created successfully', law: newLaw });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create law' });
  }
});

// Admin: Edit law
router.put('/:id', authenticate, requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const existing = db.findById('laws', id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Law not found' });
  }

  const updated = db.update('laws', id, req.body);
  db.logAudit(req.user.id, 'LAW_UPDATED', 'LAWS', id, `Updated law: ${existing.title}`);
  res.json({ success: true, message: 'Law updated successfully', law: updated });
});

// Admin: Mark law as repealed
router.patch('/:id/repeal', authenticate, requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const updated = db.update('laws', id, { status: 'repealed' });
  db.logAudit(req.user.id, 'LAW_REPEALED', 'LAWS', id, 'Marked as repealed');
  res.json({ success: true, message: 'Law marked as repealed', law: updated });
});

export default router;
