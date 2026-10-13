import React, { useState } from 'react';
import { documentChecklists } from '../data/checklistsData.js';

export default function DocumentChecklistSection({ onFindLawyersForTopic }) {
  const [activeChecklistId, setActiveChecklistId] = useState(documentChecklists[0].id);
  const [checkedItems, setCheckedItems] = useState({});

  const currentChecklist = documentChecklists.find((c) => c.id === activeChecklistId) || documentChecklists[0];

  function toggleItem(itemId) {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }

  const totalItems = currentChecklist.items.length;
  const completedCount = currentChecklist.items.filter((item) => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <section className="checklists-section section-wrap" id="checklists" aria-labelledby="checklists-heading">
      <div className="section-header">
        <div>
          <div className="eyebrow eyebrow-muted">PRACTICAL LEGAL TOOLKIT</div>
          <h2 id="checklists-heading">Legal Document Preparation Checklists</h2>
          <p className="section-subtext">
            Prepare your paperwork before visiting a lawyer, police thana, or court. Track what documents you already have and discover where to obtain missing ones.
          </p>
        </div>
        <div className="checklist-progress-pill">
          <span className="p-text">Prepared: <strong>{completedCount} of {totalItems}</strong> ({progressPercent}%)</span>
        </div>
      </div>

      {/* Checklist Category Selector Tabs */}
      <div className="checklist-category-tabs">
        {documentChecklists.map((cl) => (
          <button
            key={cl.id}
            type="button"
            className={`cl-tab-btn ${activeChecklistId === cl.id ? 'active' : ''}`}
            onClick={() => setActiveChecklistId(cl.id)}
          >
            <span className="cl-tab-title">{cl.title}</span>
            <span className="cl-tab-bn">{cl.banglaTitle}</span>
          </button>
        ))}
      </div>

      {/* Current Checklist Card Container */}
      <div className="checklist-active-container">
        <div className="cl-active-header">
          <div className="cl-title-group">
            <h3>{currentChecklist.title}</h3>
            <div className="cl-bangla-sub">{currentChecklist.banglaTitle}</div>
            <p className="cl-desc">{currentChecklist.description}</p>
          </div>

          <div className="cl-progress-bar-block">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="progress-stats-labels">
              <span>Progress: {progressPercent}% Ready</span>
              <span>{completedCount}/{totalItems} Documents Checked</span>
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="checklist-items-stack">
          {currentChecklist.items.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                className={`checklist-item-card ${isChecked ? 'item-completed' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="item-checkbox-col">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(item.id)}
                    aria-label={`Mark ${item.name}`}
                  />
                </div>

                <div className="item-body-col">
                  <div className="item-title-row">
                    <h4 className="item-name">{item.name}</h4>
                    {item.mandatory && (
                      <span className="mandatory-badge">Mandatory Document</span>
                    )}
                  </div>

                  <p className="item-purpose">{item.purpose}</p>

                  <div className="item-meta-strip">
                    <span className="authority-meta">
                      🏛 <strong>Where to obtain:</strong> {item.issuingAuthority}
                    </span>
                    <span className="copies-meta">
                      📄 <strong>Copies required:</strong> {item.recommendedCopies}
                    </span>
                  </div>
                </div>

                <div className="item-status-icon">
                  {isChecked ? '✓' : '○'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="checklist-footer-bar">
          <button
            type="button"
            className="button button-outline"
            onClick={() => window.print()}
          >
            Print Checklist 🖨
          </button>
          <button
            type="button"
            className="button button-gold"
            onClick={() => onFindLawyersForTopic(currentChecklist.title)}
          >
            Find Lawyers for this Case <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
