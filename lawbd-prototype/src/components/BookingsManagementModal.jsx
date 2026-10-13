import React, { useState } from 'react';

export default function BookingsManagementModal({
  bookings,
  onClose,
  onCancelBooking,
  onRescheduleBooking,
  onExploreLawyers
}) {
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [activePass, setActivePass] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'upcoming') return b.status === 'Confirmed' || b.status === 'In Review';
    if (filter === 'past') return b.status === 'Completed' || b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container bookings-manage-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">APPOINTMENT MANAGEMENT</span>
            <h2>My Consultations &amp; Bookings ({bookings.length})</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body-scrollable">
          {/* Filter Tabs */}
          <div className="bookings-tabs-row">
            <button
              className={`b-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Appointments ({bookings.length})
            </button>
            <button
              className={`b-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Review').length})
            </button>
            <button
              className={`b-tab ${filter === 'past' ? 'active' : ''}`}
              onClick={() => setFilter('past')}
            >
              Cancelled / Past ({bookings.filter((b) => b.status === 'Cancelled' || b.status === 'Completed').length})
            </button>
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="bookings-cards-stack">
              {filteredBookings.map((b) => (
                <div key={b.id} className="booking-item-card">
                  <div className="b-card-top">
                    <div className="b-lawyer-identity">
                      <div className="b-mini-avatar">{b.lawyerInitials || 'AD'}</div>
                      <div>
                        <strong>{b.lawyerName}</strong>
                        <div className="b-court-level">{b.lawyerCourt}</div>
                      </div>
                    </div>
                    <div className="b-status-area">
                      <span className={`status-pill ${b.status === 'Confirmed' ? 'confirmed' : b.status === 'Cancelled' ? 'cancelled' : 'in-review'}`}>
                        {b.status}
                      </span>
                      <span className="token-ref">{b.id}</span>
                    </div>
                  </div>

                  <div className="b-card-details-grid">
                    <div className="b-detail">
                      <span className="b-lbl">Date &amp; Time</span>
                      <strong className="b-val">{b.date} at {b.time}</strong>
                    </div>
                    <div className="b-detail">
                      <span className="b-lbl">Consultation Mode</span>
                      <strong className="b-val">{b.mode}</strong>
                    </div>
                    <div className="b-detail">
                      <span className="b-lbl">Consultation Fee</span>
                      <strong className="b-val text-gold">{b.fee}</strong>
                    </div>
                    <div className="b-detail">
                      <span className="b-lbl">Client</span>
                      <strong className="b-val">{b.clientName} ({b.clientPhone})</strong>
                    </div>
                  </div>

                  <div className="b-chamber-info">
                    <span className="pin">📍</span>
                    <span>{b.chamberAddress}</span>
                  </div>

                  <div className="b-card-actions">
                    <button
                      className="button button-outline-gold button-small"
                      onClick={() => setActivePass(b)}
                    >
                      View Appointment Pass 🎫
                    </button>
                    {b.status === 'Confirmed' && (
                      <>
                        <button
                          className="button button-subtle button-small"
                          onClick={() => {
                            const newDate = window.prompt('Enter new preferred date (YYYY-MM-DD):', b.date);
                            if (newDate) onRescheduleBooking(b.id, newDate);
                          }}
                        >
                          Reschedule Date
                        </button>
                        <button
                          className="button button-danger button-small"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this appointment?')) {
                              onCancelBooking(b.id);
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-bookings-box">
              <span className="calendar-icon">📅</span>
              <h3>No Bookings Found in this Category</h3>
              <p>You have not booked any consultations yet. Explore verified advocates and schedule a session easily.</p>
              <button
                className="button button-gold"
                onClick={() => {
                  onClose();
                  onExploreLawyers();
                }}
              >
                Browse Lawyers Directory <span>→</span>
              </button>
            </div>
          )}

          {/* Active Pass Modal Preview if clicked */}
          {activePass && (
            <div className="inner-pass-overlay" onClick={() => setActivePass(null)}>
              <div className="inner-pass-card" onClick={(e) => e.stopPropagation()}>
                <div className="pass-close" onClick={() => setActivePass(null)}>✕</div>
                <div className="pass-stamp">LAWBD VERIFIED CONSULTATION PASS</div>
                <h3>{activePass.id}</h3>
                <div className="pass-details">
                  <p><strong>Advocate:</strong> {activePass.lawyerName}</p>
                  <p><strong>Mode:</strong> {activePass.mode}</p>
                  <p><strong>Scheduled:</strong> {activePass.date} at {activePass.time}</p>
                  <p><strong>Client:</strong> {activePass.clientName} ({activePass.clientPhone})</p>
                  <p><strong>Chamber / Video Room:</strong> {activePass.chamberAddress}</p>
                  <p><strong>Fee:</strong> {activePass.fee}</p>
                </div>
                <div className="pass-print-btn-row">
                  <button className="button button-dark button-small" onClick={() => window.print()}>
                    Print Pass 🖨
                  </button>
                  <button className="button button-gold button-small" onClick={() => setActivePass(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
