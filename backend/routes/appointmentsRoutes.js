import express from 'express';
import { db } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Generate unique Appointment Pass Token e.g. LBD-2026-8914
function generatePassToken() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LBD-${year}-${rand}`;
}

// Create Appointment Booking
router.post('/', authenticate, (req, res) => {
  try {
    const {
      lawyerId,
      mode = 'Video Consultation',
      date,
      timeSlot,
      caseCategory = 'General Legal Consultation',
      problemDescription,
      paymentMethod = 'bKash',
      documents = []
    } = req.body;

    if (!lawyerId || !date || !timeSlot || !problemDescription) {
      return res.status(400).json({ success: false, error: 'Lawyer, date, time slot, and case summary are required' });
    }

    const lawyer = db.findById('lawyers', lawyerId);
    if (!lawyer) {
      return res.status(404).json({ success: false, error: 'Selected advocate not found' });
    }

    // Determine consultation fee based on mode
    let fee = lawyer.feeVideo || 1500;
    if (mode.toLowerCase().includes('in-person') || mode.toLowerCase().includes('chamber')) {
      fee = lawyer.feeInPerson || 2000;
    } else if (mode.toLowerCase().includes('phone')) {
      fee = lawyer.feePhone || 1000;
    }

    const token = generatePassToken();
    const txId = (paymentMethod || 'BKASH').toUpperCase().slice(0, 2) + Math.random().toString(36).substring(2, 8).toUpperCase();

    const appointment = db.insert('appointments', {
      id: token,
      token,
      client_id: req.user.id,
      client_name: req.user.name,
      client_phone: req.user.phone || '01700000000',
      client_email: req.user.email,
      lawyer_id: Number(lawyerId),
      lawyer_name: lawyer.name,
      lawyer_chamber: lawyer.chamberAddress,
      mode,
      date,
      time_slot: timeSlot,
      case_category: caseCategory,
      problem_description: problemDescription,
      fee_amount: fee,
      payment_status: 'paid',
      payment_method: paymentMethod,
      payment_tx_id: txId,
      status: 'confirmed',
      documents: Array.isArray(documents) ? documents : [documents]
    });

    // Create an initial confirmation message in conversation
    db.insert('messages', {
      sender_id: lawyer.user_id || 99,
      receiver_id: req.user.id,
      appointment_id: token,
      message_text: `Assalamu Alaikum ${req.user.name}. Your appointment [${token}] for ${mode} has been confirmed on ${date} at ${timeSlot}. Please ensure your relevant legal documents are ready.`,
      attachments: [],
      is_read: false
    });

    db.logAudit(req.user.id, 'APPOINTMENT_BOOKED', 'APPOINTMENTS', token, `Booked with ${lawyer.name}`);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully. Pass generated!',
      appointment
    });
  } catch (err) {
    console.error('Appointment booking error:', err);
    res.status(500).json({ success: false, error: 'Failed to create appointment' });
  }
});

// Get user appointments (for client or lawyer)
router.get('/my', authenticate, (req, res) => {
  let appointments = [];
  if (req.user.role === 'lawyer') {
    const lawyerProfile = db.findOne('lawyers', { user_id: req.user.id });
    if (lawyerProfile) {
      appointments = db.find('appointments', a => Number(a.lawyer_id) === Number(lawyerProfile.id));
    } else {
      appointments = db.find('appointments', a => a.lawyer_name === req.user.name);
    }
  } else if (req.user.role === 'admin') {
    appointments = db.find('appointments');
  } else {
    // Client
    appointments = db.find('appointments', a => Number(a.client_id) === Number(req.user.id));
  }

  // Sort by date descending
  appointments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json({
    success: true,
    count: appointments.length,
    appointments
  });
});

// Get single appointment pass by token/id
router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const appointment = db.findById('appointments', id);
  if (!appointment) {
    return res.status(404).json({ success: false, error: 'Appointment pass not found' });
  }

  // Authorization check: client, lawyer, or admin
  const isOwner = Number(appointment.client_id) === Number(req.user.id);
  const isAdmin = req.user.role === 'admin';
  const lawyerProfile = db.findOne('lawyers', { user_id: req.user.id });
  const isAssignedLawyer = lawyerProfile && Number(appointment.lawyer_id) === Number(lawyerProfile.id);

  if (!isOwner && !isAdmin && !isAssignedLawyer) {
    return res.status(403).json({ success: false, error: 'Unauthorized to view this appointment pass' });
  }

  const lawyer = db.findById('lawyers', appointment.lawyer_id);

  res.json({
    success: true,
    appointment,
    lawyer
  });
});

// Update appointment status (accept, reject, cancel, reschedule, complete)
router.patch('/:id/status', authenticate, (req, res) => {
  const { id } = req.params;
  const { status, rescheduledDate, rescheduledSlot } = req.body;

  const appointment = db.findById('appointments', id);
  if (!appointment) {
    return res.status(404).json({ success: false, error: 'Appointment not found' });
  }

  const updates = { status };
  if (rescheduledDate) updates.date = rescheduledDate;
  if (rescheduledSlot) updates.time_slot = rescheduledSlot;

  const updated = db.update('appointments', id, updates);
  db.logAudit(req.user.id, 'APPOINTMENT_STATUS_CHANGE', 'APPOINTMENTS', id, `Status changed to ${status}`);

  res.json({
    success: true,
    message: `Appointment updated to ${status}`,
    appointment: updated
  });
});

export default router;
