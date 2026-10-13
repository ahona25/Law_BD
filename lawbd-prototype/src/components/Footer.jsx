import React from 'react';

export default function Footer({ onNavigate }) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="section-wrap footer-inner">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="brand footer-brand">
              <div className="brand-emblem">
                <span className="scales-icon">⚖</span>
              </div>
              <div className="brand-text">
                <div className="brand-title">Law<span>BD</span></div>
                <div className="brand-motto">BANGLADESH LEGAL CLARITY &amp; APPOINTMENTS</div>
              </div>
            </div>
            <p className="footer-about">
              Empowering the people of Bangladesh with accessible, simple-language legal information, procedural transparency, and direct appointment scheduling with verified advocates across all 64 districts.
            </p>
            <div className="gov-affiliation-badge">
              <span>🏛 Built for Bangladeshi Citizens &amp; Legal Practitioners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-h">Platform Features</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => onNavigate('laws')}>Explore Laws &amp; Penalties</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('lawyers')}>Find &amp; Compare Advocates</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('wizard')}>Guided Problem Finder</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('checklists')}>Document Checklists</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('faqs')}>Legal FAQs (GD, FIR, Bail)</button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('dictionary')}>Bilingual Legal Dictionary</button>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="footer-col">
            <h4 className="footer-h">Key Practice Areas</h4>
            <ul className="footer-links-list">
              <li>Family &amp; Muslim Divorce Laws</li>
              <li>Criminal Defense &amp; High Court Bail</li>
              <li>Land Records &amp; Mutation Disputes</li>
              <li>Cheque Dishonour (NI Act Sec 138)</li>
              <li>Cyber Crime &amp; Harassment Defence</li>
              <li>Domestic Violence &amp; Dowry Prohibition</li>
              <li>Labour Court &amp; Wrongful Termination</li>
            </ul>
          </div>

          {/* Emergency Helplines Col */}
          <div className="footer-col">
            <h4 className="footer-h">Emergency &amp; Legal Hotlines</h4>
            <div className="helpline-cards-stack">
              <div className="h-card">
                <span className="h-badge">Toll-Free</span>
                <strong>National Legal Aid: 16430</strong>
                <small>Govt. Free Legal Representation (NLASO)</small>
              </div>
              <div className="h-card">
                <span className="h-badge red">Emergency</span>
                <strong>National Police: 999</strong>
                <small>Police, Fire &amp; Ambulance Services</small>
              </div>
              <div className="h-card">
                <span className="h-badge purple">Cyber Safe</span>
                <strong>CID Cyber Crime: 01320-010148</strong>
                <small>24/7 Digital Extortion &amp; Fraud Desk</small>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-legal-notice-strip">
          <p>
            <strong>Legal Disclaimer:</strong> LawBD provides educational information and lawyer discovery services. The statutory explanations, procedural guides, and sample penalties reflect general principles of the Laws of Bangladesh (The Penal Code 1860, Code of Criminal Procedure 1898, Muslim Family Laws 1961, NI Act 1881, etc.). They do not constitute formal legal advice. For active litigation, consult an advocate enrolled with the Bangladesh Bar Council.
          </p>
        </div>

        <div className="footer-bottom-bar">
          <div className="copyright">
            © {new Date().getFullYear()} LawBD. All rights reserved. Supreme Court of Bangladesh &amp; District Bar Chambers Directory.
          </div>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
