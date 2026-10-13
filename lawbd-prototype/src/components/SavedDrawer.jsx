import React, { useState } from 'react';

export default function SavedDrawer({
  isOpen,
  onClose,
  savedLaws,
  lawsList,
  savedLawyers,
  lawyersList,
  onViewLawDetails,
  onSelectLawyer,
  onOpenBooking,
  onRemoveSavedLaw,
  onRemoveSavedLawyer
}) {
  const [tab, setTab] = useState('laws'); // 'laws' or 'lawyers'

  if (!isOpen) return null;

  const currentSavedLaws = lawsList.filter((l) => savedLaws.includes(l.id));
  const currentSavedLawyers = lawyersList.filter((l) => savedLawyers.includes(l.id));

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <aside className="saved-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-icon">🔖</span>
            <h3>Saved Items</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close saved drawer">
            ✕
          </button>
        </div>

        <div className="drawer-tabs">
          <button
            className={`d-tab ${tab === 'laws' ? 'active' : ''}`}
            onClick={() => setTab('laws')}
          >
            Saved Laws ({currentSavedLaws.length})
          </button>
          <button
            className={`d-tab ${tab === 'lawyers' ? 'active' : ''}`}
            onClick={() => setTab('lawyers')}
          >
            Saved Advocates ({currentSavedLawyers.length})
          </button>
        </div>

        <div className="drawer-body">
          {tab === 'laws' && (
            <div className="saved-list">
              {currentSavedLaws.length > 0 ? (
                currentSavedLaws.map((law) => (
                  <div key={law.id} className="saved-item-card">
                    <div className="s-card-top">
                      <span className="s-tag">{law.tag}</span>
                      <button
                        className="s-remove"
                        onClick={() => onRemoveSavedLaw(law.id)}
                        title="Remove bookmark"
                      >
                        ✕
                      </button>
                    </div>
                    <h4>{law.title}</h4>
                    <p className="s-desc">{law.simpleSummary.slice(0, 100)}...</p>
                    <button
                      className="button button-gold button-small full-width"
                      onClick={() => {
                        onClose();
                        onViewLawDetails(law);
                      }}
                    >
                      Read Full Law &amp; Procedures <span>→</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-drawer-state">
                  <span>☆</span>
                  <p>You haven't saved any legal topics yet.</p>
                  <small>Click "Save" on any law card to keep it here for quick reference.</small>
                </div>
              )}
            </div>
          )}

          {tab === 'lawyers' && (
            <div className="saved-list">
              {currentSavedLawyers.length > 0 ? (
                currentSavedLawyers.map((lawyer) => (
                  <div key={lawyer.id} className="saved-item-card">
                    <div className="s-card-top">
                      <span className="s-tag">{lawyer.courtLevel}</span>
                      <button
                        className="s-remove"
                        onClick={() => onRemoveSavedLawyer(lawyer.id)}
                        title="Remove bookmark"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="s-lawyer-row">
                      <div className="s-avatar">{lawyer.initials}</div>
                      <div>
                        <h4>{lawyer.name}</h4>
                        <div className="s-meta">★ {lawyer.rating} · {lawyer.feeDisplay}</div>
                      </div>
                    </div>
                    <div className="s-actions-row">
                      <button
                        className="button button-outline button-small"
                        onClick={() => {
                          onClose();
                          onSelectLawyer(lawyer);
                        }}
                      >
                        Profile
                      </button>
                      <button
                        className="button button-gold button-small"
                        onClick={() => {
                          onClose();
                          onOpenBooking(lawyer);
                        }}
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-drawer-state">
                  <span>☆</span>
                  <p>No advocates saved yet.</p>
                  <small>Bookmark lawyers to easily compare and schedule consultations later.</small>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
