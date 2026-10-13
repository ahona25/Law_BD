import React, { useState } from 'react';

export default function LawyersSection({
  lawyers,
  specialties,
  divisions,
  activeSpecialty,
  onSpecialtyChange,
  activeDivision,
  onDivisionChange,
  activeCourt,
  onCourtChange,
  sortBy,
  onSortChange,
  searchLawyerQuery,
  onSearchLawyerChange,
  onSelectLawyer,
  onOpenBooking,
  onOpenDirectMessage,
  savedLawyers,
  onToggleSaveLawyer,
  comparedLawyerIds,
  onToggleCompare,
  onOpenComparison
}) {
  const courtLevels = [
    'All Court Levels',
    'High Court Division (Supreme Court)',
    'District & Sessions Judge Court',
    'Specialized Tribunals (Cyber/Labour/Family)'
  ];

  return (
    <section className="lawyers-section section-wrap" id="lawyers" aria-labelledby="lawyers-heading">
      <div className="section-header">
        <div>
          <div className="eyebrow eyebrow-muted">VERIFIED LEGAL PRACTITIONERS</div>
          <h2 id="lawyers-heading">Find &amp; Book Bangladesh Advocates</h2>
          <p className="section-subtext">
            Compare verified lawyers by court enrollment, practice specialty, client ratings, consultation fees, and chamber locations.
          </p>
        </div>
        <div className="section-tag-counter">
          <span className="count-number">{lawyers.length}</span>
          <span className="count-label">Advocates Found</span>
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="lawyer-filters-panel">
        <div className="filter-controls-row">
          {/* Specialty Dropdown */}
          <div className="filter-dropdown-group">
            <label className="dropdown-label">Specialization</label>
            <select
              value={activeSpecialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="styled-select"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Division Dropdown */}
          <div className="filter-dropdown-group">
            <label className="dropdown-label">Location / Division</label>
            <select
              value={activeDivision}
              onChange={(e) => onDivisionChange(e.target.value)}
              className="styled-select"
            >
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          {/* Court Level Filter */}
          <div className="filter-dropdown-group">
            <label className="dropdown-label">Court Level</label>
            <select
              value={activeCourt}
              onChange={(e) => onCourtChange(e.target.value)}
              className="styled-select"
            >
              {courtLevels.map((court) => (
                <option key={court} value={court}>
                  {court}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="filter-dropdown-group">
            <label className="dropdown-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="styled-select"
            >
              <option value="top-rated">Top Rated (Highest Reviews)</option>
              <option value="lowest-fee">Lowest Consultation Fee</option>
              <option value="experience">Most Experienced (Years)</option>
              <option value="most-reviews">Most Client Reviews</option>
            </select>
          </div>

          {/* Search by Name */}
          <div className="filter-dropdown-group search-group">
            <label className="dropdown-label">Search Lawyer or Chamber</label>
            <input
              type="text"
              value={searchLawyerQuery}
              onChange={(e) => onSearchLawyerChange(e.target.value)}
              placeholder="e.g. Tanvir, High Court, Motijheel..."
              className="styled-input"
            />
          </div>
        </div>

        {/* Comparison Floating Sticky Bar if lawyers are selected */}
        {comparedLawyerIds.length > 0 && (
          <div className="compare-bar-sticky">
            <div className="compare-summary">
              <span className="compare-count">{comparedLawyerIds.length} of 3</span>
              <span>Lawyers selected for side-by-side comparison</span>
            </div>
            <div className="compare-btns">
              <button
                className="button button-gold button-small"
                onClick={onOpenComparison}
                disabled={comparedLawyerIds.length < 2}
              >
                {comparedLawyerIds.length < 2
                  ? 'Select 1 more to compare'
                  : 'Compare Selected Advocates (Side-by-Side) ➔'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lawyers Grid */}
      {lawyers.length > 0 ? (
        <div className="lawyers-cards-grid">
          {lawyers.map((lawyer) => {
            const isSaved = savedLawyers.includes(lawyer.id);
            const isCompared = comparedLawyerIds.includes(lawyer.id);

            return (
              <article key={lawyer.id} className="lawyer-card-premium">
                <div className="lawyer-card-header">
                  <div className="avatar-wrapper">
                    <div className="lawyer-initials-avatar">{lawyer.initials}</div>
                    <span className="online-indicator" title="Available for consultations" />
                  </div>

                  <div className="header-text-block">
                    <div className="verified-pill">
                      <span className="check-mark">✓</span>
                      <span>Bar Council Verified</span>
                    </div>
                    <h3 className="lawyer-name">{lawyer.name}</h3>
                    <div className="lawyer-court-info">{lawyer.courtLevel}</div>
                    <div className="bar-council-no">{lawyer.barCouncilNo}</div>
                  </div>

                  <button
                    type="button"
                    className={`card-bookmark-btn ${isSaved ? 'active' : ''}`}
                    onClick={() => onToggleSaveLawyer(lawyer.id)}
                    title={isSaved ? 'Remove from saved' : 'Bookmark lawyer'}
                    aria-label="Bookmark advocate"
                  >
                    {isSaved ? '★' : '☆'}
                  </button>
                </div>

                <div className="lawyer-tags-row">
                  {lawyer.specialties.map((spec) => (
                    <span key={spec} className="spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="lawyer-metrics-grid">
                  <div className="metric-cell">
                    <span className="m-val text-gold">★ {lawyer.rating}</span>
                    <span className="m-lbl">{lawyer.reviewsCount} reviews</span>
                  </div>
                  <div className="metric-cell">
                    <span className="m-val">{lawyer.experienceYears} yrs</span>
                    <span className="m-lbl">Court Experience</span>
                  </div>
                  <div className="metric-cell">
                    <span className="m-val">{lawyer.responseTime}</span>
                    <span className="m-lbl">Response Time</span>
                  </div>
                </div>

                <p className="lawyer-bio-excerpt">{lawyer.about}</p>

                <div className="chamber-location-strip">
                  <span className="loc-icon">📍</span>
                  <span className="loc-text">{lawyer.chamberAddress}</span>
                </div>

                <div className="consultation-modes-strip">
                  <span className="modes-label">Modes:</span>
                  {lawyer.modes.map((mode) => (
                    <span key={mode} className="mode-pill">
                      {mode === 'Video Consultation' && '📹 Video'}
                      {mode === 'In-person Chamber' && '🏛 Chamber'}
                      {mode === 'Phone Call' && '📞 Phone'}
                    </span>
                  ))}
                </div>

                <div className="lawyer-card-pricing-footer">
                  <div className="pricing-info">
                    <span className="from-lbl">Consultation starts at</span>
                    <div className="fee-amount">{lawyer.feeDisplay}</div>
                  </div>

                  <div className="footer-actions">
                    <button
                      type="button"
                      className="button button-outline-subtle button-small"
                      onClick={() => onSelectLawyer(lawyer)}
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      className="button button-gold button-small"
                      onClick={() => onOpenBooking(lawyer)}
                    >
                      Book Consultation <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="card-sub-utilities">
                  <label className="compare-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(lawyer.id)}
                    />
                    <span>Add to Compare</span>
                  </label>
                  <button
                    type="button"
                    className="direct-msg-link"
                    onClick={() => onOpenDirectMessage(lawyer)}
                  >
                    💬 Quick Message
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="no-results-panel">
          <div className="empty-icon">🔍</div>
          <h3>No Lawyers Found Matching Your Filters</h3>
          <p>Try widening your search, choosing another division, or clearing specialty filters.</p>
          <button
            className="button button-outline"
            onClick={() => {
              onSpecialtyChange('All Specialties');
              onDivisionChange('All Locations');
              onCourtChange('All Court Levels');
              onSearchLawyerChange('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
}
