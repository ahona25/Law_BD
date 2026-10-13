import React from 'react';

export default function LawDetailsModal({ law, onClose, onFindSpecialist, isSaved, onToggleSave }) {
  if (!law) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container law-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-meta">
            <span className="modal-kicker">BANGLADESH STATUTORY GUIDE</span>
            <span className="law-tag-badge">{law.tag}</span>
          </div>
          <div className="modal-header-actions">
            <button
              className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleSave(law.id)}
            >
              {isSaved ? '★ Saved to Bookmarks' : '☆ Save Topic'}
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        <div className="modal-body-scrollable">
          <h2 className="modal-law-title">{law.title}</h2>
          <div className="modal-law-bangla">{law.banglaTitle}</div>

          {/* Governing Statutes */}
          <div className="governing-acts-box">
            <span className="box-label">Governing Statutes &amp; Acts:</span>
            <ul className="acts-list">
              {law.acts.map((act, i) => (
                <li key={i}>📜 {act}</li>
              ))}
            </ul>
          </div>

          {/* Plain Language Summary */}
          <section className="detail-section">
            <h3 className="section-sub-h">Plain Language Explanation</h3>
            <p className="detail-paragraph">{law.simpleSummary}</p>
          </section>

          {/* Key Legal Provisions */}
          <section className="detail-section">
            <h3 className="section-sub-h">Key Statutory Rights &amp; Rules</h3>
            <ul className="provisions-bullet-list">
              {law.keyProvisions.map((prov, i) => (
                <li key={i}>
                  <span className="bullet-check">✓</span>
                  <span>{prov}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Step-by-Step Legal Procedure */}
          <section className="detail-section procedure-block">
            <h3 className="section-sub-h">Step-by-Step Legal Procedure</h3>
            <p className="procedure-intro">Standard procedural roadmap followed in Bangladeshi courts and police stations:</p>
            <div className="procedure-timeline">
              {law.procedureSteps.map((step) => (
                <div key={step.step} className="proc-step-node">
                  <div className="step-badge">Step {step.step}</div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Penalties & Punishments Box */}
          <div className="penalties-alert-card">
            <div className="alert-badge">
              <span className="alert-icon">⚠️</span>
              <span>STATUTORY PUNISHMENTS &amp; PENALTIES</span>
            </div>
            <p className="penalties-text">{law.penalties}</p>
          </div>

          {/* Required Documents */}
          <section className="detail-section">
            <h3 className="section-sub-h">Documents You Will Need</h3>
            <div className="docs-tag-cloud">
              {law.requiredDocuments.map((doc, i) => (
                <span key={i} className="doc-pill">
                  📎 {doc}
                </span>
              ))}
            </div>
          </section>

          {/* Immediate Actions */}
          <section className="detail-section">
            <h3 className="section-sub-h">Immediate Do's &amp; Don'ts</h3>
            <ul className="actions-check-list">
              {law.immediateActions.map((action, i) => (
                <li key={i}>
                  <span className="action-bullet">➔</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="modal-footer-toolbar">
          <div className="footer-specialist-info">
            <span>Need advice on this topic?</span>
            <strong>Consult with specialized {law.specialistMatch} advocates.</strong>
          </div>
          <button
            className="button button-gold"
            onClick={() => {
              onClose();
              onFindSpecialist(law.specialistMatch);
            }}
          >
            Find {law.specialistMatch} Advocates <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
