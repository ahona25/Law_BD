import React, { useState } from 'react';

export default function DirectMessageModal({ lawyer, onClose, onMessageSent }) {
  if (!lawyer) return null;

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const templates = [
    'Need urgent advice on Anticipatory Bail from High Court.',
    'Need document vetting for a land purchase in Bangladesh.',
    'Require assistance serving Section 138 NI Act cheque dishonour notice.',
    'Seeking consultation on child custody and maintenance rights.'
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!senderName || !senderPhone || !messageText) return;

    setSentSuccess(true);
    onMessageSent({
      lawyerName: lawyer.name,
      senderName,
      message: messageText
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container message-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">CONFIDENTIAL INQUIRY</span>
            <h3>Send Message to {lawyer.name}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body-scrollable">
          {!sentSuccess ? (
            <form onSubmit={handleSubmit} className="message-form">
              <div className="lawyer-inquiry-target">
                <div className="m-avatar">{lawyer.initials}</div>
                <div>
                  <strong>{lawyer.name}</strong>
                  <span>{lawyer.courtLevel} · {lawyer.responseTime}</span>
                </div>
              </div>

              <div className="templates-selector">
                <span className="temp-label">Quick Question Templates:</span>
                <div className="temp-buttons">
                  {templates.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="tmpl-pill"
                      onClick={() => setMessageText(tmpl)}
                    >
                      {tmpl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-lbl">Your Name *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Shakil Ahmed"
                  className="styled-input"
                />
              </div>

              <div className="form-field-group">
                <label className="field-lbl">Mobile Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="e.g. 01819-XXXXXX"
                  className="styled-input"
                />
              </div>

              <div className="form-field-group">
                <label className="field-lbl">Your Inquiry or Situation Details *</label>
                <textarea
                  rows="4"
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Describe your legal issue, timeline, and whether you possess supporting documents..."
                  className="styled-textarea"
                />
              </div>

              <div className="message-security-notice">
                <span className="lock-icon">🔒</span>
                <span>Your query is encrypted and routed directly to Advocate {lawyer.initials}’s chamber desk.</span>
              </div>

              <div className="modal-footer-toolbar">
                <button type="button" className="button button-outline" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="button button-gold">
                  Send Direct Inquiry <span>✉</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="message-success-card">
              <div className="success-check-badge">✓</div>
              <h3>Inquiry Dispatched to Chamber!</h3>
              <p>
                Your message has been delivered to <strong>{lawyer.name}</strong>. The chamber typically responds within <strong>{lawyer.responseTime}</strong> via phone or WhatsApp.
              </p>
              <button className="button button-gold" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
