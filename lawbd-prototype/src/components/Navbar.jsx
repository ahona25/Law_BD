import React, { useState } from 'react';

export default function Navbar({
  savedCount,
  bookingsCount,
  unreadNotifications,
  onOpenSaved,
  onOpenBookings,
  onToggleNotifications,
  onNavigate
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(sectionId) {
    onNavigate(sectionId);
    setMobileOpen(false);
  }

  return (
    <header className="site-header" role="banner">
      <div className="section-wrap header-inner">
        <a 
          href="#home" 
          className="brand" 
          onClick={(e) => { e.preventDefault(); handleNav('home'); }}
          aria-label="LawBD Homepage"
        >
          <div className="brand-emblem">
            <span className="scales-icon">⚖</span>
          </div>
          <div className="brand-text">
            <div className="brand-title">Law<span>BD</span></div>
            <div className="brand-motto">BANGLADESH LEGAL CLARITY &amp; APPOINTMENTS</div>
          </div>
        </a>

        <button 
          className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${mobileOpen ? 'mobile-visible' : ''}`} aria-label="Main Navigation">
          <button className="nav-item" onClick={() => handleNav('laws')}>
            Explore Laws
          </button>
          <button className="nav-item" onClick={() => handleNav('lawyers')}>
            Find Lawyers
          </button>
          <button className="nav-item wizard-nav" onClick={() => handleNav('wizard')}>
            <span className="spark-icon">✦</span> Problem Finder
            <span className="nav-pill-badge">Guided</span>
          </button>
          <button className="nav-item" onClick={() => handleNav('checklists')}>
            Doc Checklists
          </button>
          <button className="nav-item" onClick={() => handleNav('faqs')}>
            Legal FAQs
          </button>
          <button className="nav-item" onClick={() => handleNav('dictionary')}>
            Dictionary
          </button>
        </nav>

        <div className="header-utilities">
          <button 
            className="util-btn saved-btn" 
            onClick={onOpenSaved}
            aria-label="View Saved Items"
            title="Saved Laws & Lawyers"
          >
            <span className="util-icon">🔖</span>
            <span className="util-label">Saved</span>
            {savedCount > 0 && <span className="counter-badge">{savedCount}</span>}
          </button>

          <button 
            className="util-btn bookings-btn" 
            onClick={onOpenBookings}
            aria-label="My Appointments"
            title="Manage Appointments"
          >
            <span className="util-icon">📅</span>
            <span className="util-label">My Bookings</span>
            {bookingsCount > 0 && <span className="counter-badge count-gold">{bookingsCount}</span>}
          </button>

          <button 
            className="util-btn notif-btn" 
            onClick={onToggleNotifications}
            aria-label="Notifications"
            title="Appointment & Legal Notifications"
          >
            <span className="util-icon">🔔</span>
            {unreadNotifications > 0 && <span className="notif-dot" />}
          </button>
        </div>
      </div>
    </header>
  );
}
