import React, { useState } from 'react';

export default function LawsSection({
  laws,
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onViewLawDetails,
  onFindSpecialist,
  savedLaws,
  onToggleSaveLaw
}) {
  return (
    <section className="laws-section" id="laws" aria-labelledby="laws-heading">
      <div className="section-wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow eyebrow-muted">BANGLADESHI LAWS SIMPLIFIED</div>
            <h2 id="laws-heading">Explore Laws by Everyday Problems</h2>
            <p className="section-subtext">
              Understand what the law says without getting lost in legal jargon. Learn your rights, penalties, and what exact legal steps you should take.
            </p>
          </div>
          <div className="section-tag-counter">
            <span className="count-number">{laws.length}</span>
            <span className="count-label">Topics Available</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="laws-filter-toolbar">
          <div className="category-scroll-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="laws-search-field">
            <span className="search-symbol">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search laws, offences, or statutes..."
              aria-label="Filter legal topics"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-pill"
                onClick={() => onSearchChange('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Laws Grid */}
        {laws.length > 0 ? (
          <div className="laws-cards-grid">
            {laws.map((law) => {
              const isSaved = savedLaws.includes(law.id);
              return (
                <article key={law.id} className="law-card">
                  <div className="card-top-bar">
                    <span className="law-tag-badge">{law.tag}</span>
                    <button
                      type="button"
                      className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
                      onClick={() => onToggleSaveLaw(law.id)}
                      title={isSaved ? 'Remove from saved' : 'Save this law'}
                      aria-label="Save law topic"
                    >
                      {isSaved ? '★ Saved' : '☆ Save'}
                    </button>
                  </div>

                  <h3 className="law-card-title">{law.title}</h3>
                  <div className="law-card-bangla">{law.banglaTitle}</div>

                  <p className="law-card-summary">{law.simpleSummary}</p>

                  <div className="key-points-preview">
                    <span className="preview-label">Key Legal Rights:</span>
                    <ul className="points-list">
                      {law.keyProvisions.slice(0, 2).map((point, idx) => (
                        <li key={idx}>• {point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-bottom-actions">
                    <button
                      type="button"
                      className="button button-outline-gold button-small"
                      onClick={() => onViewLawDetails(law)}
                    >
                      Read Full Law &amp; Procedures <span>→</span>
                    </button>
                    <button
                      type="button"
                      className="button button-subtle button-small"
                      onClick={() => onFindSpecialist(law.specialistMatch)}
                    >
                      Find {law.specialistMatch} Lawyers <span>↗</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="no-results-panel">
            <div className="empty-icon">⚖</div>
            <h3>No Legal Topics Match Your Query</h3>
            <p>Try searching for different keywords or select "All Legal Topics" to browse our complete collection.</p>
            <button
              className="button button-outline"
              onClick={() => {
                onSearchChange('');
                onCategoryChange('all');
              }}
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}

        <div className="legal-disclaimer-strip">
          <span className="info-icon">ℹ</span>
          <p>
            <strong>Educational Legal Information:</strong> Summaries on LawBD are structured for general public awareness under statutory Bangladeshi laws (e.g. Penal Code 1860, CrPC 1898, Muslim Family Laws 1961). They do not constitute formal attorney-client advice. For specific matters, consult an enrolled Advocate.
          </p>
        </div>
      </div>
    </section>
  );
}
