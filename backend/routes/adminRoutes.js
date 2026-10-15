import express from 'express';
import { db } from '../db/database.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticate, requireRole('admin'));

// Platform summary statistics
router.get('/stats', (req, res) => {
  const totalLaws = db.count('laws');
  const totalLawyers = db.count('lawyers');
  const verifiedLawyers = db.count('lawyers', l => l.verified === true);
  const pendingLawyers = db.count('lawyers', l => l.verified === false);
  const totalUsers = db.count('users');
  const totalAppointments = db.count('appointments');
  const totalCases = db.count('cases');

  const appointments = db.find('appointments');
  const totalRevenue = appointments
    .filter(a => a.payment_status === 'paid')
    .reduce((sum, a) => sum + (a.fee_amount || 0), 0);

  res.json({
    success: true,
    stats: {
      totalLaws,
      totalLawyers,
      verifiedLawyers,
      pendingLawyers,
      totalUsers,
      totalAppointments,
      totalCases,
      totalRevenue
    }
  });
});

// Lawyer verification queue
router.get('/lawyer-applications', (req, res) => {
  const lawyers = db.find('lawyers');
  res.json({
    success: true,
    lawyers
  });
});

// Approve or reject lawyer verification
router.post('/verify-lawyer/:id', (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'approve' | 'reject'

  const lawyer = db.findById('lawyers', id);
  if (!lawyer) {
    return res.status(404).json({ success: false, error: 'Lawyer record not found' });
  }

  const isApproved = action === 'approve';
  const updated = db.update('lawyers', id, { verified: isApproved });

  db.logAudit(req.user.id, `LAWYER_${isApproved ? 'VERIFIED' : 'REJECTED'}`, 'LAWYERS', id, `Admin set verified=${isApproved} for ${lawyer.name}`);

  res.json({
    success: true,
    message: isApproved ? 'Lawyer credentials verified and approved' : 'Lawyer credentials marked unverified',
    lawyer: updated
  });
});

// User management
router.get('/users', (req, res) => {
  const users = db.find('users').map(u => {
    const safe = { ...u };
    delete safe.password_hash;
    return safe;
  });

  res.json({
    success: true,
    count: users.length,
    users
  });
});

// Suspend or reactivate user
router.patch('/users/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'active' | 'suspended'

  if (Number(id) === req.user.id) {
    return res.status(400).json({ success: false, error: 'Cannot change status of currently logged in admin' });
  }

  const updated = db.update('users', id, { status });
  db.logAudit(req.user.id, 'USER_STATUS_CHANGE', 'USERS', id, `Changed status to ${status}`);

  res.json({
    success: true,
    message: `User status changed to ${status}`,
    user: updated
  });
});

// System Audit Logs
router.get('/audit-logs', (req, res) => {
  const logs = db.find('audit_logs');
  logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json({
    success: true,
    count: logs.length,

    logs: logs.slice(0, 50)
  });
});

export default router;
