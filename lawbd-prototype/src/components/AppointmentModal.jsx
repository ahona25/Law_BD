import React, { useState } from 'react';

export default function AppointmentModal({ lawyer, onClose, onBookingSuccess }) {
  if (!lawyer) return null;

  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('video'); // video, chamber, phone
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [problemCategory, setProblemCategory] = useState(lawyer.specialties[0] || 'General Consultation');
  const [problemDescription, setProblemDescription] = useState('');
  const [hasDocuments, setHasDocuments] = useState(true);

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientDistrict, setClientDistrict] = useState('Dhaka');
  const [agreedPrivilege, setAgreedPrivilege] = useState(true);

  // Confirmed State
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const availableSlots = [
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  function getFee() {
    if (mode === 'video') return lawyer.feeVideo;
    if (mode === 'chamber') return lawyer.feeInPerson;
    return lawyer.feePhone;
  }

  function handleFinalSubmit(e) {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const referenceId = `LBD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: referenceId,
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      lawyerInitials: lawyer.initials,
      lawyerCourt: lawyer.courtLevel,
      chamberAddress: lawyer.chamberAddress,
      mode: mode === 'video' ? 'Video Consultation' : mode === 'chamber' ? 'In-Person Chamber' : 'Phone Call',
      date: selectedDate,
      time: selectedSlot,
      fee: `৳${getFee().toLocaleString()}`,
      problemCategory,
      problemDescription,
      clientName,
      clientPhone,
      clientEmail,
      clientDistrict,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep(5);
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">LAWYER APPOINTMENT BOOKING</span>
            <h3>Consultation with {lawyer.name}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body-scrollable">
          {step < 5 && (
            <div className="booking-stepper-strip">
              <span className={`b-step ${step >= 1 ? 'active' : ''}`}>1. Mode &amp; Fee</span>
              <span className="b-divider">›</span>
              <span className={`b-step ${step >= 2 ? 'active' : ''}`}>2. Schedule</span>
              <span className="b-divider">›</span>
              <span className={`b-step ${step >= 3 ? 'active' : ''}`}>3. Case Brief</span>
              <span className="b-divider">›</span>
              <span className={`b-step ${step >= 4 ? 'active' : ''}`}>4. Contact Info</span>
            </div>
          )}

          {/* STEP 1: Select Mode */}
          {step === 1 && (
            <div className="booking-pane">
              <h4 className="pane-h">Choose Consultation Mode</h4>
              <p className="pane-sub">Select how you prefer to consult with the advocate:</p>

              <div className="modes-selection-grid">
                <button
                  type="button"
                  className={`mode-select-box ${mode === 'video' ? 'selected' : ''}`}
                  onClick={() => setMode('video')}
                >
                  <span className="mode-icon">📹</span>
                  <div className="mode-info">
                    <strong>Online Video Consultation</strong>
                    <p>Encrypted 30-min Google Meet / Video room. Share documents on screen.</p>
                  </div>
                  <div className="mode-fee">
                    <span>Fee:</span>
                    <strong>৳{lawyer.feeVideo.toLocaleString()}</strong>
                  </div>
                </button>

                <button
                  type="button"
                  className={`mode-select-box ${mode === 'chamber' ? 'selected' : ''}`}
                  onClick={() => setMode('chamber')}
                >
                  <span className="mode-icon">🏛</span>
                  <div className="mode-info">
                    <strong>In-Person Chamber Visit</strong>
                    <p>45-min consultation at {lawyer.chamberAddress}. Bring physical deeds &amp; papers.</p>
                  </div>
                  <div className="mode-fee">
                    <span>Fee:</span>
                    <strong>৳{lawyer.feeInPerson.toLocaleString()}</strong>
                  </div>
                </button>

                <button
                  type="button"
                  className={`mode-select-box ${mode === 'phone' ? 'selected' : ''}`}
                  onClick={() => setMode('phone')}
                >
                  <span className="mode-icon">📞</span>
                  <div className="mode-info">
                    <strong>Urgent Phone Advice</strong>
                    <p>Direct 20-min telephone consultation for urgent questions and next-step triage.</p>
                  </div>
                  <div className="mode-fee">
                    <span>Fee:</span>
                    <strong>৳{lawyer.feePhone.toLocaleString()}</strong>
                  </div>
                </button>
              </div>

              <div className="booking-footer-btn-row">
                <div className="selected-fee-callout">
                  <span>Total Consultation Fee:</span>
                  <strong>৳{getFee().toLocaleString()}</strong>
                </div>
                <button className="button button-gold" onClick={() => setStep(2)}>
                  Proceed to Select Slot <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot */}
          {step === 2 && (
            <div className="booking-pane">
              <h4 className="pane-h">Select Consultation Date &amp; Time</h4>
              <p className="pane-sub">Choose a convenient date and an available chamber slot:</p>

              <div className="date-picker-group">
                <label className="field-lbl">Preferred Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-styled-input"
                  required
                />
              </div>

              <div className="slots-picker-group">
                <label className="field-lbl">Available Slots for {selectedDate}</label>
                <div className="time-slots-grid">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot-pill ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-footer-btn-row">
                <button className="button button-outline" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="button button-gold" onClick={() => setStep(3)}>
                  Case Brief &amp; Documents <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Case Brief */}
          {step === 3 && (
            <div className="booking-pane">
              <h4 className="pane-h">Provide Brief Legal Issue Details</h4>
              <p className="pane-sub">Giving context in advance helps the advocate prepare for your session:</p>

              <div className="form-field-group">
                <label className="field-lbl">Legal Practice Area</label>
                <select
                  value={problemCategory}
                  onChange={(e) => setProblemCategory(e.target.value)}
                  className="styled-select"
                >
                  {lawyer.specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="General Consultation">Other / General Consultation</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="field-lbl">Brief Summary of the Situation</label>
                <textarea
                  rows="4"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g., 'Received a notice regarding land boundary dispute in Chattogram', or 'Bank return memo received for 5 lakh cheque, need advice on Section 138 notice...'"
                  className="styled-textarea"
                />
              </div>

              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={hasDocuments}
                  onChange={(e) => setHasDocuments(e.target.checked)}
                />
                <span>I have relevant documents (NID, deeds, receipts, notices) ready to show during consultation</span>
              </label>

              <div className="booking-footer-btn-row">
                <button className="button button-outline" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <button className="button button-gold" onClick={() => setStep(4)}>
                  Contact Information <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info */}
          {step === 4 && (
            <form className="booking-pane" onSubmit={handleFinalSubmit}>
              <h4 className="pane-h">Your Contact &amp; Verification Details</h4>
              <p className="pane-sub">Appointment confirmation, chamber directions, or video links will be sent here:</p>

              <div className="two-col-fields">
                <div className="form-field-group">
                  <label className="field-lbl">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mohammad Rafiqul Islam"
                    className="styled-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-lbl">Mobile Number (BD) *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 01712-345678"
                    className="styled-input"
                  />
                </div>
              </div>

              <div className="two-col-fields">
                <div className="form-field-group">
                  <label className="field-lbl">Email Address</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. rafiq@example.com"
                    className="styled-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-lbl">Your District</label>
                  <select
                    value={clientDistrict}
                    onChange={(e) => setClientDistrict(e.target.value)}
                    className="styled-select"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Cumilla">Cumilla</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                  </select>
                </div>
              </div>

              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={agreedPrivilege}
                  onChange={(e) => setAgreedPrivilege(e.target.checked)}
                  required
                />
                <span>I confirm this consultation is subject to confidentiality and advocate-client legal privilege under the Bangladesh Bar Council Canons of Professional Conduct.</span>
              </label>

              <div className="booking-summary-strip">
                <div>
                  <span className="b-lbl">Consultation:</span>
                  <strong>{mode === 'video' ? 'Video Call' : mode === 'chamber' ? 'Chamber Visit' : 'Phone'} ({selectedSlot})</strong>
                </div>
                <div>
                  <span className="b-lbl">Date:</span>
                  <strong>{selectedDate}</strong>
                </div>
                <div>
                  <span className="b-lbl">Payable:</span>
                  <strong className="text-gold">৳{getFee().toLocaleString()}</strong>
                </div>
              </div>

              <div className="booking-footer-btn-row">
                <button type="button" className="button button-outline" onClick={() => setStep(3)}>
                  ← Back
                </button>
                <button type="submit" className="button button-gold">
                  Confirm &amp; Generate Appointment Pass <span>✓</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Confirmation Pass */}
          {step === 5 && confirmedBooking && (
            <div className="booking-confirmed-card">
              <div className="success-banner">
                <div className="success-check-badge">✓</div>
                <h3>Appointment Confirmed &amp; Scheduled!</h3>
                <p>Your consultation pass has been generated. Confirmation SMS sent to {confirmedBooking.clientPhone}.</p>
              </div>

              <div className="appointment-pass-ticket">
                <div className="ticket-header">
                  <div className="pass-title">
                    <span className="pass-logo">⚖ LawBD Pass</span>
                    <span className="pass-token">{confirmedBooking.id}</span>
                  </div>
                  <span className="pass-status-pill">CONFIRMED</span>
                </div>

                <div className="ticket-body">
                  <div className="ticket-row">
                    <div>
                      <span className="t-lbl">Consulting Advocate</span>
                      <strong className="t-strong">{confirmedBooking.lawyerName}</strong>
                      <small>{confirmedBooking.lawyerCourt}</small>
                    </div>
                    <div>
                      <span className="t-lbl">Consultation Mode</span>
                      <strong className="t-strong">{confirmedBooking.mode}</strong>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div>
                      <span className="t-lbl">Date &amp; Scheduled Slot</span>
                      <strong className="t-strong">{confirmedBooking.date} at {confirmedBooking.time}</strong>
                    </div>
                    <div>
                      <span className="t-lbl">Consultation Fee</span>
                      <strong className="t-strong text-gold">{confirmedBooking.fee}</strong>
                    </div>
                  </div>

                  <div className="ticket-row chamber-row">
                    <span className="t-lbl">Chamber / Meeting Link</span>
                    <p className="t-chamber">{confirmedBooking.chamberAddress}</p>
                  </div>
                </div>

                <div className="ticket-footer">
                  <div className="qr-box-simulated">
                    <span className="qr-pattern">▦ ▧ ▨ ▩</span>
                    <small>Official Verified Pass</small>
                  </div>
                  <div className="pass-instructions">
                    <p>• Please keep relevant case documents / NID ready 10 minutes prior.</p>
                    <p>• For chamber visits, present this reference ID at the advocate’s chamber reception.</p>
                  </div>
                </div>
              </div>

              <div className="confirmed-action-buttons">
                <button className="button button-gold" onClick={onClose}>
                  Done &amp; View My Bookings <span>➔</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
