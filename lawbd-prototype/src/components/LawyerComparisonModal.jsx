import React from 'react';

export default function LawyerComparisonModal({ lawyers, onClose, onOpenBooking, onRemoveLawyer }) {
  if (!lawyers || lawyers.length === 0) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container compare-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">SIDE-BY-SIDE LAWYER EVALUATION</span>
            <h2>Compare Advocate Profiles ({lawyers.length})</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close comparison">
            ✕
          </button>
        </div>

        <div className="modal-body-scrollable">
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature / Metric</th>
                  {lawyers.map((l) => (
                    <th key={l.id} className="lawyer-col">
                      <div className="col-top-row">
                        <button
                          type="button"
                          className="remove-col-btn"
                          onClick={() => onRemoveLawyer(l.id)}
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="c-avatar">{l.initials}</div>
                      <div className="c-name">{l.name}</div>
                      <div className="c-court">{l.courtLevel}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-label">Rating &amp; Reviews</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <strong className="text-gold">★ {l.rating}</strong> ({l.reviewsCount} reviews)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Experience</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <strong>{l.experienceYears} Years</strong>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Bar Council Reg</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <code>{l.barCouncilNo}</code>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Qualifications</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <small>{l.qualification}</small>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Video Consult Fee</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <span className="fee-badge">৳{l.feeVideo.toLocaleString()}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">In-Person Chamber Fee</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <span className="fee-badge fee-dark">৳{l.feeInPerson.toLocaleString()}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Primary Specialties</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      {l.specialties.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Response Time</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      {l.responseTime}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Chambers Location</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value">
                      <small>{l.chamberAddress}</small>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="row-label">Consultation Action</td>
                  {lawyers.map((l) => (
                    <td key={l.id} className="row-value action-cell">
                      <button
                        className="button button-gold button-small full-width"
                        onClick={() => {
                          onClose();
                          onOpenBooking(l);
                        }}
                      >
                        Book {l.initials} <span>→</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
