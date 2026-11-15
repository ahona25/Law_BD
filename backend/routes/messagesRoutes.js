import express from 'express';
import { db } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get conversation messages for an appointment or lawyer
router.get('/:appointmentId', authenticate, (req, res) => {
  const { appointmentId } = req.params;
  const messages = db.find('messages', { appointment_id: appointmentId });

  // Mark messages sent to this user as read
  messages.forEach(m => {
    if (m.receiver_id === req.user.id && !m.is_read) {
      db.update('messages', m.id, { is_read: true });
    }
  });

  messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  res.json({
    success: true,
    count: messages.length,
    messages
  });
});

// Send new message
router.post('/', authenticate, (req, res) => {
  try {
    const { appointmentId, receiverId, messageText, attachments = [] } = req.body;

    if (!appointmentId || !messageText) {
      return res.status(400).json({ success: false, error: 'Appointment ID and message text are required' });
    }

    // Determine receiver
    let resolvedReceiverId = receiverId;
    if (!resolvedReceiverId) {
      const appt = db.findById('appointments', appointmentId);
      if (appt) {
        if (req.user.id === appt.client_id) {
          const lawyer = db.findById('lawyers', appt.lawyer_id);
          resolvedReceiverId = lawyer ? lawyer.user_id : 2;
        } else {
          resolvedReceiverId = appt.client_id;
        }
      }
    }

    const newMsg = db.insert('messages', {
      sender_id: req.user.id,
      sender_name: req.user.name,
      sender_role: req.user.role,
      receiver_id: Number(resolvedReceiverId || 1),
      appointment_id: appointmentId,
      message_text: messageText,
      attachments: Array.isArray(attachments) ? attachments : [attachments],
      is_read: false
    });

    res.status(201).json({
      success: true,
      message: 'Message sent',
      chatMessage: newMsg
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

export default router;
