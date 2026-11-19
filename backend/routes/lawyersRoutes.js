import express from 'express';
import { db } from '../db/database.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// List lawyers with filters
router.get('/', optionalAuth, (req, res) => {
  const {
    specialty,
    division,
    district,
    court,
    search,
    sortBy = 'top-rated',
    minFee,
    maxFee,
    verifiedOnly
  } = req.query;

  let lawyers = db.find('lawyers');

  // Filters
  if (specialty && specialty !== 'All Specialties' && specialty !== 'all') {
    lawyers = lawyers.filter(l => l.specialties && l.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())));
  }

  // District filter
  if (district && district !== 'All Districts' && district !== 'all' && district !== 'undefined') {
    const dLower = district.trim().toLowerCase();
    const districtMatches = lawyers.filter(l => {
      const distMatch = l.district && l.district.toLowerCase().includes(dLower);
      const chamberMatch = l.chamberAddress && l.chamberAddress.toLowerCase().includes(dLower);
      const courtMatch = l.courtLevel && l.courtLevel.toLowerCase().includes(dLower);
      const locMatch = l.location && l.location.toLowerCase().includes(dLower);
      return distMatch || chamberMatch || courtMatch || locMatch;
    });

    if (districtMatches.length > 0) {
      lawyers = districtMatches;
    } else if (division && division !== 'All Locations' && division !== 'all' && division !== 'undefined') {
      const divLower = division.trim().toLowerCase();
      const divMatches = lawyers.filter(l => 
        (l.division && l.division.toLowerCase().includes(divLower)) ||
        (l.chamberAddress && l.chamberAddress.toLowerCase().includes(divLower)) ||
        (l.location && l.location.toLowerCase().includes(divLower))
      );
      if (divMatches.length > 0) {
        lawyers = divMatches;
      }
    }
  } else if (division && division !== 'All Locations' && division !== 'all' && division !== 'undefined') {
    const divLower = division.trim().toLowerCase();
    const divMatches = lawyers.filter(l => 
      (l.division && l.division.toLowerCase().includes(divLower)) ||
      (l.chamberAddress && l.chamberAddress.toLowerCase().includes(divLower)) ||
      (l.location && l.location.toLowerCase().includes(divLower)) ||
      (l.district && l.district.toLowerCase().includes(divLower))
    );
    if (divMatches.length > 0) {
      lawyers = divMatches;
    }
  }

  if (court && court !== 'All Court Levels' && court !== 'all' && court !== 'undefined') {
    const cLower = court.trim().toLowerCase();
    const courtMatches = lawyers.filter(l => 
      (l.courtLevel && l.courtLevel.toLowerCase().includes(cLower)) ||
      (l.chamberAddress && l.chamberAddress.toLowerCase().includes(cLower))
    );
    if (courtMatches.length > 0) {
      lawyers = courtMatches;
    }
  }

  if (verifiedOnly === 'true') {
    lawyers = lawyers.filter(l => l.verified === true);
  }

  if (minFee) {
    lawyers = lawyers.filter(l => (l.feeVideo || l.feeInPerson || 0) >= Number(minFee));
  }

  if (maxFee) {
    lawyers = lawyers.filter(l => (l.feeVideo || l.feeInPerson || 0) <= Number(maxFee));
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    lawyers = lawyers.filter(l => {
      const nameMatch = l.name && l.name.toLowerCase().includes(q);
      const qualMatch = l.qualification && l.qualification.toLowerCase().includes(q);
      const bioMatch = l.bio && l.bio.toLowerCase().includes(q);
      const chamberMatch = l.chamberAddress && l.chamberAddress.toLowerCase().includes(q);
      const barNoMatch = l.barCouncilNo && l.barCouncilNo.toLowerCase().includes(q);
      const specMatch = l.specialties && l.specialties.some(s => s.toLowerCase().includes(q));
      return nameMatch || qualMatch || bioMatch || chamberMatch || barNoMatch || specMatch;
    });
  }

  // Sorting
  if (sortBy === 'top-rated') {
    lawyers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'most-experienced') {
    lawyers.sort((a, b) => (b.experienceYears || 0) - (a.experienceYears || 0));
  } else if (sortBy === 'lowest-fee') {
    lawyers.sort((a, b) => (a.feeVideo || a.feeInPerson || 0) - (b.feeVideo || b.feeInPerson || 0));
  } else if (sortBy === 'most-reviews') {
    lawyers.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  }

  // Check saved lawyers if logged in
  let savedLawyerIds = [];
  if (req.user) {
    const savedItems = db.find('saved_items', { user_id: req.user.id, item_type: 'lawyer' });
    savedLawyerIds = savedItems.map(item => String(item.item_id));
  }

  const enhancedLawyers = lawyers.map(l => ({
    ...l,
    isSaved: savedLawyerIds.includes(String(l.id))
  }));

  res.json({
    success: true,
    count: enhancedLawyers.length,
    lawyers: enhancedLawyers
  });
});

// Compare up to 3 lawyers
router.post('/compare', (req, res) => {
  const { lawyerIds } = req.body;
  if (!Array.isArray(lawyerIds) || lawyerIds.length === 0) {
    return res.status(400).json({ success: false, error: 'Please provide lawyerIds array' });
  }

  const compared = lawyerIds.slice(0, 3).map(id => db.findById('lawyers', id)).filter(Boolean);

  res.json({
    success: true,
    lawyers: compared
  });
});

// Get single lawyer detail
router.get('/:id', optionalAuth, (req, res) => {
  const { id } = req.params;
  const lawyer = db.findById('lawyers', id);
  if (!lawyer) {
    return res.status(404).json({ success: false, error: 'Lawyer not found' });
  }

  let isSaved = false;
  if (req.user) {
    const saved = db.findOne('saved_items', {
      user_id: req.user.id,
      item_type: 'lawyer',
      item_id: id
    });
    isSaved = !!saved;
  }

  // Get lawyer reviews
  const reviews = db.find('reviews', { lawyer_id: Number(id) });

  res.json({
    success: true,
    lawyer: {
      ...lawyer,
      isSaved,
      clientReviews: reviews
    }
  });
});

// Bookmark / Unbookmark lawyer
router.post('/:id/bookmark', authenticate, (req, res) => {
  const { id } = req.params;
  const existing = db.findOne('saved_items', {
    user_id: req.user.id,
    item_type: 'lawyer',
    item_id: String(id)
  });

  if (existing) {
    db.delete('saved_items', existing.id);
    return res.json({ success: true, saved: false, message: 'Removed from saved advocates' });
  } else {
    db.insert('saved_items', {
      user_id: req.user.id,
      item_type: 'lawyer',
      item_id: String(id)
    });
    return res.json({ success: true, saved: true, message: 'Saved advocate successfully' });
  }
});

// Add client review
router.post('/:id/reviews', authenticate, (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ success: false, error: 'Rating and comment are required' });
  }

  const lawyer = db.findById('lawyers', id);
  if (!lawyer) {
    return res.status(404).json({ success: false, error: 'Lawyer not found' });
  }

  const review = db.insert('reviews', {
    lawyer_id: Number(id),
    client_id: req.user.id,
    client_name: req.user.name,
    rating: Number(rating),
    comment,
    created_at: new Date().toISOString()
  });

  // Re-calculate lawyer rating
  const allReviews = db.find('reviews', { lawyer_id: Number(id) });
  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
  db.update('lawyers', id, {
    rating: Number(avgRating),
    reviewsCount: allReviews.length
  });

  res.status(201).json({
    success: true,
    message: 'Review submitted successfully',
    review
  });
});

export default router;
