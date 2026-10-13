import React from 'react';

export default function Hero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSelectQuickTag,
  onStartWizard,
  onExploreLaws
}) {
  const quickTags = [
    { label: 'Talaq & Denmohur', term: 'divorce' },
    { label: 'Land Dispute / Khatian', term: 'land' },
    { label: 'Cheque Bounce (Sec 138)', term: 'cheque' },
    { label: 'Anticipatory Bail', term: 'bail' },
    { label: 'Cyber Harassment', term: 'cyber' },
    { label: 'Domestic Violence', term: 'domestic' },
    { label: 'Unpaid Salary / Termination', term: 'labour' }
  ];

  return (
    <section className="hero-section" id="home">
      <div className="section-wrap hero-container">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="kicker-gem">§</span>
            <span>LEGAL INTELLIGENCE &amp; ADVOCATE NETWORK · BANGLADESH</span>
          </div>

          <h1 className="hero-heading">
            Bangladeshi Law, Made Clear.<br />
            <em>The Right Advocate,</em> Within Reach.
          </h1>

          <p className="hero-subtext">
            Don’t stay in the dark when facing a legal challenge. Explore your rights in simple language, understand courtroom procedures and penalties, and book trusted, Bar Council–verified advocates.
          </p>

          <form className="hero-search-box" onSubmit={onSearchSubmit} role="search">
            <div className="search-input-wrapper">
              <span className="search-glyph">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Describe your legal problem (e.g. 'bounced cheque', 'land khatian dispute', 'bail motion')..."
                aria-label="Search laws, procedures and lawyers"
                className="hero-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <button type="submit" className="hero-search-submit">
              <span>Find Solutions</span>
              <span className="arrow-icon">→</span>
            </button>
          </form>

          <div className="quick-tags-row">
            <span className="tags-label">Common Inquiries:</span>
            <div className="tags-list">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  className="tag-pill"
                  onClick={() => onSelectQuickTag(tag.term)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-action-ctas">
            <button className="cta-btn primary-gold" onClick={onStartWizard}>
              <span className="btn-spark">✦</span>
              <span>Launch Guided Problem Finder</span>
              <span className="btn-badge">Interactive Triage</span>
            </button>
            <button className="cta-btn secondary-ghost" onClick={onExploreLaws}>
              <span>Browse Legal Library &amp; Procedures</span>
              <span className="btn-arrow">↓</span>
            </button>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="card-ambient-glow" />
          <div className="preview-case-card">
            <div className="card-top-header">
              <div className="stamp-seal">
                <span>BANGLADESH LAW HUB</span>
              </div>
              <span className="live-status-pill">
                <span className="pulsing-dot" /> Verified Portal
              </span>
            </div>

            <div className="case-card-body">
              <div className="case-title-area">
                <div className="icon-wrapper">⚖</div>
                <div>
                  <div className="case-h">Section 138 / Cheque Dishonour</div>
                  <div className="case-sub">Negotiable Instruments Act, 1881</div>
                </div>
              </div>

              <div className="stat-pills-row">
                <div className="stat-pill">
                  <span className="stat-label">Notice Window</span>
                  <span className="stat-val">30 Days</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Max Penalty</span>
                  <span className="stat-val">2x Cheque Sum</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Remedy</span>
                  <span className="stat-val">Criminal Trial</span>
                </div>
              </div>

              <div className="timeline-mini-preview">
                <div className="timeline-step done">
                  <span className="dot">✓</span>
                  <span>Bank Return Memo</span>
                </div>
                <div className="timeline-step active">
                  <span className="dot">2</span>
                  <span>Advocate Notice (30d)</span>
                </div>
                <div className="timeline-step pending">
                  <span className="dot">3</span>
                  <span>CR Case Filing</span>
                </div>
              </div>

              <div className="card-lawyer-preview">
                <div className="mini-avatar">TH</div>
                <div className="mini-info">
                  <strong>Adv. Barrister Tanvir Hasan</strong>
                  <span>High Court Division · 14 yrs exp</span>
                </div>
                <span className="mini-fee">৳1,800</span>
              </div>
            </div>

            <div className="card-bottom-strip">
              <span>✓ Simple Language Laws</span>
              <span>✓ 8+ Divisions</span>
              <span>✓ Chamber &amp; Video</span>
            </div>
          </div>

          <div className="floating-metric-box metric-one">
            <div className="metric-num">100%</div>
            <div className="metric-text">Bar Council Registered Advocates</div>
          </div>

          <div className="floating-metric-box metric-two">
            <div className="metric-num">16430</div>
            <div className="metric-text">Integrated Toll-Free Gov Legal Aid</div>
          </div>
        </div>
      </div>
    </section>
  );
}
