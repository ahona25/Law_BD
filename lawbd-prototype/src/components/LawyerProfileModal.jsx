import React from 'react';

export default function LawyerProfileModal({
  lawyer,
  onClose,
  onOpenBooking,
  onOpenDirectMessage,
  isSaved,
  onToggleSave
}) {
  if (!lawyer) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container lawyer-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">ADVOCATE PROFILE · BANGLADESH BAR COUNCIL</span>
            <span className="verified-pill">
              <span className="check-mark">✓</span> Verified Advocate
            </span>
          </div>
          <div className="modal-header-actions">
            <button
              className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleSave(lawyer.id)}
            >
              {isSaved ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body-scrollable">
          {/* Profile Hero Header */}
          <div className="lawyer-hero-card">
            <div className="lawyer-initials-large">{lawyer.initials}</div>
            <div className="lawyer-hero-info">
              <h2 className="profile-lawyer-name">{lawyer.name}</h2>
              <div className="profile-qualifications">{lawyer.qualification}</div>
              <div className="profile-court-level">{lawyer.courtLevel}</div>
              <div className="bar-details-row">
                <span><strong>Bar Council Reg:</strong> {lawyer.barCouncilNo}</span>
                <span>•</span>
                <span><strong>Association:</strong> {lawyer.association}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="profile-stats-bar">
            <div className="p-stat">
              <span className="p-val text-gold">★ {lawyer.rating}</span>
              <span className="p-sub">{lawyer.reviewsCount} Client Reviews</span>
            </div>
            <div className="p-stat">
              <span className="p-val">{lawyer.experienceYears} Years</span>
              <span className="p-sub">Court Practice</span>
            </div>
            <div className="p-stat">
              <span className="p-val">{lawyer.successRate}</span>
              <span className="p-sub">Reported Outcomes</span>
            </div>
            <div className="p-stat">
              <span className="p-val">{lawyer.casesHandled}</span>
              <span className="p-sub">Cases &amp; Briefs</span>
            </div>
          </div>

          {/* About Section */}
          <section className="profile-section">
            <h3 className="section-sub-h">Professional Overview</h3>
            <p className="detail-paragraph">{lawyer.about}</p>
          </section>

          {/* Practice Areas */}
          <section className="profile-section">
            <h3 className="section-sub-h">Specialized Areas of Practice</h3>
            <div className="specialties-pills-row">
              {lawyer.specialties.map((spec) => (
                <span key={spec} className="spec-badge-large">
                  ⚖ {spec}
                </span>
              ))}
            </div>
          </section>

          {/* Fee Schedule */}
          <section className="profile-section">
            <h3 className="section-sub-h">Consultation Fee Schedule (BDT)</h3>
            <div className="fee-schedule-grid">
              <div className="fee-card">
                <div className="fee-title">📹 Video Consultation</div>
                <div className="fee-price">৳{lawyer.feeVideo.toLocaleString()}</div>
                <div className="fee-note">30 mins secure video consultation</div>
              </div>
              <div className="fee-card featured">
                <div className="fee-title">🏛 Chamber Visit</div>
                <div className="fee-price">৳{lawyer.feeInPerson.toLocaleString()}</div>
                <div className="fee-note">45 mins in-person document review</div>
              </div>
              <div className="fee-card">
                <div className="fee-title">📞 Urgent Phone Advice</div>
                <div className="fee-price">৳{lawyer.feePhone.toLocaleString()}</div>
                <div className="fee-note">20 mins phone advisory session</div>
              </div>
            </div>
          </section>

          {/* Chamber & Visiting Hours */}
          <section className="profile-section">
            <h3 className="section-sub-h">Chambers &amp; Office Address</h3>
            <div className="chamber-box">
              <div className="chamber-line">
                <span className="icon">📍</span>
                <div>
                  <strong>Official Chambers:</strong>
                  <p>{lawyer.chamberAddress}</p>
                </div>
              </div>
              <div className="chamber-line">
                <span className="icon">🕒</span>
                <div>
                  <strong>Available Consultation Windows:</strong>
                  <div className="slots-list">
                    {lawyer.availableSlots.map((slot, i) => (
                      <span key={i} className="slot-pill">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="chamber-line">
                <span className="icon">🌐</span>
                <div>
                  <strong>Languages:</strong>
                  <p>{lawyer.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Client Testimonials */}
          <section className="profile-section">
            <h3 className="section-sub-h">Recent Client Testimonials</h3>
            <div className="testimonials-stack">
              {lawyer.testimonials.map((t, i) => (
                <div key={i} className="testimonial-item">
                  <div className="t-head">
                    <span className="t-client">{t.client}</span>
                    <span className="t-rating">★ {t.rating}.0</span>
                  </div>
                  <p className="t-comment">"{t.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-footer-toolbar">
          <button
            type="button"
            className="button button-outline"
            onClick={() => {
              onClose();
              onOpenDirectMessage(lawyer);
            }}
          >
            💬 Send Quick Inquiry
          </button>
          <button
            type="button"
            className="button button-gold"
            onClick={() => {
              onClose();
              onOpenBooking(lawyer);
            }}
          >
            Book Consultation with {lawyer.initials} <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
