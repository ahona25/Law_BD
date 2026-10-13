import React, { useState } from 'react';
import { faqCategories, faqList } from '../data/faqData.js';

export default function FaqSection({ onOpenProblemFinder }) {
  const [activeCategory, setActiveCategory] = useState('All FAQs');
  const [searchFaq, setSearchFaq] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState([1]); // First FAQ open by default

  function toggleFaq(id) {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const filteredFaqs = faqList.filter((faq) => {
    const matchesCat = activeCategory === 'All FAQs' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchFaq.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="faq-section section-wrap" id="faqs" aria-labelledby="faqs-heading">
      <div className="section-header">
        <div>
          <div className="eyebrow eyebrow-muted">FREQUENTLY ASKED QUESTIONS</div>
          <h2 id="faqs-heading">Bangladeshi Legal FAQs Answered</h2>
          <p className="section-subtext">
            Practical answers to common everyday legal questions regarding police reports, court bail, land deed verification, and family law.
          </p>
        </div>
        <div className="faq-ask-prompt">
          <span>Still unsure?</span>
          <button className="button button-outline-gold button-small" onClick={onOpenProblemFinder}>
            Use Problem Finder ✦
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="faq-toolbar">
        <div className="faq-categories-row">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`faq-cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-search-input-box">
          <span className="search-glyph">🔍</span>
          <input
            type="text"
            value={searchFaq}
            onChange={(e) => setSearchFaq(e.target.value)}
            placeholder="Search FAQs (e.g. 'FIR', 'Bail', 'Denmohur', 'Cheque')..."
            aria-label="Filter FAQs"
          />
          {searchFaq && (
            <button
              type="button"
              className="clear-pill"
              onClick={() => setSearchFaq('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="faq-accordion-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            return (
              <div key={faq.id} className={`faq-card-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <div className="question-left">
                    <span className="faq-category-tag">{faq.category}</span>
                    <h3 className="faq-question-text">{faq.question}</h3>
                  </div>
                  <span className="faq-toggle-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <div className="answer-divider" />
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-results-panel">
          <div className="empty-icon">❓</div>
          <h3>No FAQs Found</h3>
          <p>Try clearing your search keyword or browse all questions.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setSearchFaq('');
              setActiveCategory('All FAQs');
            }}
          >
            Reset FAQ Filter
          </button>
        </div>
      )}
    </section>
  );
}
