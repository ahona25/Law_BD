import React from 'react';

export default function EmergencyBanner({ onOpenHotlines }) {
  return (
    <aside className="emergency-banner" aria-label="National Emergency Helplines">
      <div className="section-wrap banner-inner">
        <div className="banner-left">
          <span className="banner-badge">GOVERNMENT LEGAL HELPLINES</span>
          <span className="banner-text">
            Need immediate free legal aid or police intervention? 
          </span>
        </div>
        <div className="banner-hotlines">
          <a href="tel:16430" className="hotline-pill highlight" title="National Legal Aid Services Organization">
            <span className="hotline-icon">⚖</span>
            <span>Legal Aid: <strong>16430</strong> (Toll-Free)</span>
          </a>
          <a href="tel:999" className="hotline-pill" title="National Emergency Service">
            <span className="hotline-icon">🚨</span>
            <span>Emergency Police: <strong>999</strong></span>
          </a>
          <a href="tel:109" className="hotline-pill" title="Violence Against Women & Children Helpline">
            <span className="hotline-icon">🛡</span>
            <span>Women & Child Helpline: <strong>109</strong></span>
          </a>
          <a href="tel:01320010148" className="hotline-pill cyber" title="CID Cyber Police Centre">
            <span className="hotline-icon">⌘</span>
            <span>Cyber Help: <strong>01320-010148</strong></span>
          </a>
        </div>
      </div>
    </aside>
  );
}
