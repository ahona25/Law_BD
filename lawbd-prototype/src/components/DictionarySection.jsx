import React, { useState } from 'react';
import { dictionaryCategories, legalTerms } from '../data/dictionaryData.js';

export default function DictionarySection() {
  const [activeCategory, setActiveCategory] = useState('All Terms');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = legalTerms.filter((item) => {
    const matchesCat = activeCategory === 'All Terms' || item.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesQuery =
      item.term.toLowerCase().includes(q) ||
      item.bangla.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.pronunciation.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <section className="dictionary-section section-wrap" id="dictionary" aria-labelledby="dict-heading">
      <div className="section-header">
        <div>
          <div className="eyebrow eyebrow-muted">LEGAL GLOSSARY &amp; TERMINOLOGY</div>
          <h2 id="dict-heading">Bilingual Legal Dictionary (আইনি পরিভাষা)</h2>
          <p className="section-subtext">
            Demystify complex legal phrases found in court orders, police documents, and land registry records in both English and Bengali.
          </p>
        </div>
        <div className="section-tag-counter">
          <span className="count-number">{legalTerms.length}</span>
          <span className="count-label">Key Terms</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="dict-toolbar">
        <div className="dict-categories-row">
          {dictionaryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`dict-cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="dict-search-field">
          <span className="search-glyph">📖</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search legal term (e.g., 'FIR', 'Khatian', 'Bail', 'খতিয়ান')..."
            aria-label="Filter legal terms"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-pill"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="dict-cards-grid">
          {filteredTerms.map((item) => (
            <div key={item.id} className="dict-term-card">
              <div className="term-card-top">
                <span className="term-cat-badge">{item.category}</span>
                <span className="statute-ref-badge">{item.pronunciation}</span>
              </div>

              <h3 className="term-english">{item.term}</h3>
              <div className="term-bangla">{item.bangla}</div>

              <p className="term-definition">{item.definition}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-panel">
          <div className="empty-icon">📖</div>
          <h3>No Legal Terms Found</h3>
          <p>Try searching with another spelling or choose "All Terms" to explore the complete dictionary.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All Terms');
            }}
          >
            Reset Dictionary Filter
          </button>
        </div>
      )}
    </section>
  );
}
