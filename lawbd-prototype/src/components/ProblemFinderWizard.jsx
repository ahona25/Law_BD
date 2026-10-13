import React, { useState } from 'react';

const wizardProblems = [
  {
    id: 'family',
    title: 'Family & Marriage Dispute',
    bangla: 'পারিবারিক ও বৈবাহিক সমস্যা',
    icon: '♡',
    desc: 'Talaq notice, dower (Denmohur) claim, child custody (Hizanat), or maintenance.'
  },
  {
    id: 'land',
    title: 'Land & Property Conflict',
    bangla: 'জমির মালিকানা ও রেকর্ড বিরোধ',
    icon: '⌂',
    desc: 'Land grabbing, forged title deeds, Khatian / Namjari discrepancies, eviction threats.'
  },
  {
    id: 'criminal',
    title: 'Criminal Charge / Need Bail',
    bangla: 'ফৌজদারি মামলা ও জামিন সুরক্ষা',
    icon: '⚖',
    desc: 'Apprehending arrest, false allegations, anticipatory bail, assault or theft charges.'
  },
  {
    id: 'cheque',
    title: 'Bounced Cheque / Money Fraud',
    bangla: 'চেক বাউন্স ও আর্থিক প্রতারণা',
    icon: '৳',
    desc: 'Bank returned cheque for insufficient funds, broken promissory note, Section 138 NI Act.'
  },
  {
    id: 'cyber',
    title: 'Cybercrime & Online Harassment',
    bangla: 'সাইবার ক্রাইম ও অনলাইন ব্ল্যাকমেইল',
    icon: '⌘',
    desc: 'Account hacking, blackmail with private images, fake Facebook profile, online scam.'
  },
  {
    id: 'domestic',
    title: 'Domestic Abuse & Dowry Torture',
    bangla: 'পারিবারিক নির্যাতন ও যৌতুক হয়রানি',
    icon: '🛡',
    desc: 'Physical/mental abuse, eviction from matrimonial home, urgent protection orders.'
  },
  {
    id: 'labour',
    title: 'Workplace Termination & Unpaid Wages',
    bangla: 'বেআইনি চাকরিচ্যুতি ও বকেয়া বেতন',
    icon: '💼',
    desc: 'Termination without notice or gratuity, unpaid monthly wages, Labour Court grievance.'
  }
];

const wizardStages = [
  {
    id: 'urgent',
    title: 'Urgent / Incident occurred recently (Within 48 hours)',
    desc: 'Immediate evidence preservation, emergency rescue, or pre-arrest protection needed.'
  },
  {
    id: 'notice',
    title: 'Received formal notice, court summons or police notice',
    desc: 'A strict response deadline may be ticking right now.'
  },
  {
    id: 'ongoing',
    title: 'Matter is ongoing / Attempting negotiation without result',
    desc: 'Informal discussions have failed; ready to escalate legally.'
  },
  {
    id: 'preventive',
    title: 'Seeking preventive counsel before signing or purchasing',
    desc: 'Vetting documents or understanding legal risks before taking a step.'
  }
];

const wizardOutcomes = [
  {
    id: 'protection',
    title: 'Immediate Protection / Bail / Stay Order',
    desc: 'Secure freedom, restrain eviction, or stop harassment.'
  },
  {
    id: 'recovery',
    title: 'Recover Money, Property or Child Custody',
    desc: 'Reclaim lawful assets, dower sum, or visiting rights.'
  },
  {
    id: 'notice-action',
    title: 'Serve Legal Notice or Formal Police FIR',
    desc: 'Initiate statutory legal process through counsel.'
  },
  {
    id: 'lawyer-hire',
    title: 'Consult and Retain a Specialized Trial Advocate',
    desc: 'Have an expert review files and represent in court.'
  }
];

export default function ProblemFinderWizard({ onSelectLawyer, onSelectLaw, lawyers }) {
  const [step, setStep] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedOutcome, setSelectedOutcome] = useState(null);

  function resetWizard() {
    setStep(1);
    setSelectedProblem(null);
    setSelectedStage(null);
    setSelectedOutcome(null);
  }

  // Triage synthesis based on selection
  function getTriageResult() {
    if (!selectedProblem) return null;

    const triageMap = {
      family: {
        act: 'Muslim Family Laws Ordinance 1961 (Sec 7, 9) & Family Courts Act 2023',
        priority: selectedStage?.id === 'urgent' ? 'High Priority' : 'Standard Priority',
        targetLawId: 'law-divorce-family',
        immediateSteps: [
          'Verify Nikahnama (Kabinnama) registration details at local Kazi office.',
          'Ensure all notices to Union Parishad / City Corporation are sent via Registered Post with A/D.',
          'Do not sign any blank stamps or informal compromise papers without legal vetting.'
        ],
        documents: ['Original Nikahnama', 'Postal A/D receipts of Talaq notice', 'NID card', 'Children birth certificates'],
        specialty: 'Family & Divorce'
      },
      land: {
        act: 'Land Crime Prevention & Redress Act 2023 & Specific Relief Act (Sec 8, 9, 42)',
        priority: selectedStage?.id === 'urgent' ? 'Critical Emergency' : 'High Priority',
        targetLawId: 'law-land-disputes',
        immediateSteps: [
          'Verify continuous chain deeds (বায়া দলিল) and latest Mutation Khatian at AC Land Office.',
          'If facing violent dispossession, petition Executive Magistrate Court under Section 144/145 CrPC.',
          'File complaint under the Land Crime Act 2023 for forged documents or land grabbing.'
        ],
        documents: ['Registered Sale Deed (মূল কবলা)', 'Mutation Khatian & DCR', 'Up-to-date Dakhila', 'CS/SA/RS/BS Porchas'],
        specialty: 'Land & Property'
      },
      criminal: {
        act: 'Code of Criminal Procedure 1898 (Sections 496, 497, 498) & The Penal Code 1860',
        priority: 'Critical Emergency',
        targetLawId: 'law-bail-procedure',
        immediateSteps: [
          'Obtain certified copy of FIR / Complaint Petition immediately to evaluate grounds of accusation.',
          'If apprehending arrest, move High Court Division directly for Anticipatory Bail (আগাম জামিন).',
          'Keep 2 local solvent sureties (bailors) with updated NID and municipal/land tax receipts ready.'
        ],
        documents: ['Certified FIR copy', 'Medical injury reports (if any)', 'Bailors’ NIDs & Land tax slips'],
        specialty: 'Criminal Law'
      },
      cheque: {
        act: 'Negotiable Instruments Act, 1881 (Section 138 & 140)',
        priority: 'Strict Statutory Limitation',
        targetLawId: 'law-cheque-dishonour',
        immediateSteps: [
          'Check date on Bank Return Memo; ensure Legal Notice is sent within 30 days.',
          'Engage an Advocate to dispatch legal notice through Registered Post with Acknowledgment Due (A/D).',
          'Calculate 30-day waiting period from receipt; prepare CR case petition immediately thereafter.'
        ],
        documents: ['Original dishonoured cheque', 'Bank Return Memo', 'Office copy of Legal Notice', 'Postal A/D card'],
        specialty: 'Cheque Dishonour'
      },
      cyber: {
        act: 'Cyber Security Act 2023 (Sec 24, 28) & Pornography Control Act 2012',
        priority: 'Critical Emergency',
        targetLawId: 'law-cyber-crime',
        immediateSteps: [
          'Do NOT delete chats; capture full-screen screenshots displaying URLs, timestamps, and usernames.',
          'Call Police Cyber Support for Women (01320000888) or CID Cyber Centre (01320010148).',
          'Lodge a formal GD / FIR at the local Thana with evidence stored on a flash drive.'
        ],
        documents: ['Colour screenshots with visible URLs', 'Offender profile link', 'MFS transaction IDs (if extortion paid)'],
        specialty: 'Cybercrime'
      },
      domestic: {
        act: 'Domestic Violence (Prevention & Protection) Act 2010 & Dowry Prohibition Act 2018',
        priority: 'Life Safety Priority',
        targetLawId: 'law-domestic-violence',
        immediateSteps: [
          'Call National Helpline 109 or Police 999 for emergency rescue and safe shelter.',
          'Visit One-Stop Crisis Centre (OCC) at Dhaka Medical College Hospital or nearest government hospital for medical exam.',
          'File petition under Section 11 of 2010 Act before Judicial Magistrate for emergency Protection & Residence Order.'
        ],
        documents: ['OCC / Hospital injury certificates', 'Nikahnama copy', 'Photographs of injury/damage', 'Witness statements'],
        specialty: 'Domestic Violence'
      },
      labour: {
        act: 'The Bangladesh Labour Act, 2006 (Section 33 Grievance Procedure)',
        priority: 'Standard Statutory Window',
        targetLawId: 'law-labour-rights',
        immediateSteps: [
          'Serve formal written grievance to employer via registered post within 30 days of termination/dispute.',
          'Allow 30 days for employer’s inquiry; if unanswered, file complaint before Labour Court within 30 days.',
          'Calculate complete notice pay (120 days for permanent workers) and 30 days wage gratuity per year of service.'
        ],
        documents: ['Appointment letter / ID card', 'Last 6-12 months salary statements', 'Termination letter (if issued)', 'Grievance copy & postal receipt'],
        specialty: 'Labour & Workplace'
      }
    };

    return triageMap[selectedProblem.id] || triageMap.family;
  }

  const triage = getTriageResult();
  const matchingLawyers = triage
    ? lawyers.filter((l) => l.specialties.includes(triage.specialty) || l.specialties.includes('Criminal Law')).slice(0, 2)
    : [];

  return (
    <section className="wizard-section section-wrap" id="wizard" aria-labelledby="wizard-heading">
      <div className="section-header-centered">
        <span className="eyebrow eyebrow-gold">GUIDED LEGAL PROBLEM FINDER</span>
        <h2 id="wizard-heading">Not Sure What Law Applies to You?</h2>
        <p className="section-subtext">
          Answer 3 simple questions to receive an instant legal triage, applicable statutes, immediate step-by-step guidance, and matching verified advocates.
        </p>
      </div>

      <div className="wizard-card-container">
        {/* Step Indicator */}
        <div className="wizard-stepper">
          <div className={`step-item ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
            <span className="step-circle">1</span>
            <span className="step-label">Identify Problem</span>
          </div>
          <div className="stepper-line" />
          <div className={`step-item ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
            <span className="step-circle">2</span>
            <span className="step-label">Current Stage</span>
          </div>
          <div className="stepper-line" />
          <div className={`step-item ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Goal / Outcome</span>
          </div>
          <div className="stepper-line" />
          <div className={`step-item ${step === 4 ? 'active triage-step' : ''}`}>
            <span className="step-circle">✦</span>
            <span className="step-label">Triage &amp; Action</span>
          </div>
        </div>

        {/* STEP 1: Select Problem */}
        {step === 1 && (
          <div className="wizard-step-pane">
            <h3 className="pane-title">Step 1: What legal matter are you facing?</h3>
            <p className="pane-instruction">Select the category that best describes your situation:</p>
            <div className="wizard-options-grid">
              {wizardProblems.map((prob) => (
                <button
                  key={prob.id}
                  type="button"
                  className={`wizard-select-card ${selectedProblem?.id === prob.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProblem(prob)}
                >
                  <span className="wiz-icon">{prob.icon}</span>
                  <div className="wiz-details">
                    <div className="wiz-card-h">{prob.title}</div>
                    <div className="wiz-card-bn">{prob.bangla}</div>
                    <div className="wiz-card-p">{prob.desc}</div>
                  </div>
                  <span className="wiz-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="wizard-footer-actions">
              <span className="footer-hint">No legal jargon required. Pick what closest matches your situation.</span>
              <button
                className="button button-gold"
                disabled={!selectedProblem}
                onClick={() => setStep(2)}
              >
                Continue to Step 2 <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Current Stage */}
        {step === 2 && (
          <div className="wizard-step-pane">
            <h3 className="pane-title">Step 2: What is the current status or urgency?</h3>
            <p className="pane-instruction">Understanding your timeline helps determine whether immediate emergency measures are needed:</p>
            <div className="wizard-options-vertical">
              {wizardStages.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  className={`wizard-stage-card ${selectedStage?.id === stage.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStage(stage)}
                >
                  <div className="stage-radio-circle">
                    {selectedStage?.id === stage.id && <span className="radio-fill" />}
                  </div>
                  <div className="stage-copy">
                    <div className="stage-title">{stage.title}</div>
                    <div className="stage-desc">{stage.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="wizard-footer-actions">
              <button className="button button-outline" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="button button-gold"
                disabled={!selectedStage}
                onClick={() => setStep(3)}
              >
                Continue to Step 3 <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Goal / Outcome */}
        {step === 3 && (
          <div className="wizard-step-pane">
            <h3 className="pane-title">Step 3: What primary outcome do you need?</h3>
            <p className="pane-instruction">Select the primary resolution or assistance you are seeking:</p>
            <div className="wizard-options-vertical">
              {wizardOutcomes.map((outcome) => (
                <button
                  key={outcome.id}
                  type="button"
                  className={`wizard-stage-card ${selectedOutcome?.id === outcome.id ? 'selected' : ''}`}
                  onClick={() => setSelectedOutcome(outcome)}
                >
                  <div className="stage-radio-circle">
                    {selectedOutcome?.id === outcome.id && <span className="radio-fill" />}
                  </div>
                  <div className="stage-copy">
                    <div className="stage-title">{outcome.title}</div>
                    <div className="stage-desc">{outcome.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="wizard-footer-actions">
              <button className="button button-outline" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button
                className="button button-gold"
                disabled={!selectedOutcome}
                onClick={() => setStep(4)}
              >
                Generate Triage Plan <span>✦</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Triage & Action Plan */}
        {step === 4 && triage && (
          <div className="wizard-triage-result">
            <div className="triage-header">
              <div className="triage-status-tag">
                <span className="sparkle">✦</span>
                <span>TAILORED LEGAL TRIAGE REPORT</span>
              </div>
              <span className={`priority-badge ${triage.priority.includes('Critical') || triage.priority.includes('Life') ? 'priority-high' : 'priority-med'}`}>
                {triage.priority}
              </span>
            </div>

            <div className="triage-summary-box">
              <div className="summary-col">
                <span className="summary-lbl">Primary Applicable Bangladesh Law:</span>
                <strong className="summary-act">{triage.act}</strong>
              </div>
              <div className="summary-col-actions">
                <button
                  className="link-btn"
                  onClick={() => onSelectLaw(triage.targetLawId)}
                >
                  Read Plain Summary &amp; Penalties <span>↗</span>
                </button>
              </div>
            </div>

            <div className="triage-grid">
              {/* Immediate 3 Steps */}
              <div className="triage-panel">
                <div className="panel-title">
                  <span className="panel-num">01</span>
                  <h4>Immediate 3 Actions to Take</h4>
                </div>
                <div className="steps-list">
                  {triage.immediateSteps.map((st, i) => (
                    <div key={i} className="action-step-item">
                      <span className="action-index">{i + 1}</span>
                      <p>{st}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents to Gather */}
              <div className="triage-panel">
                <div className="panel-title">
                  <span className="panel-num">02</span>
                  <h4>Documents to Gather Immediately</h4>
                </div>
                <ul className="docs-checklist-preview">
                  {triage.documents.map((doc, i) => (
                    <li key={i}>
                      <span className="check-box-icon">✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Lawyers */}
            <div className="triage-lawyers-box">
              <div className="lawyers-box-head">
                <div>
                  <h4>Recommended Advocates for this Matter</h4>
                  <p>Verified practitioners specializing in {triage.specialty}:</p>
                </div>
                <button className="text-link-gold" onClick={resetWizard}>
                  Start Over ↺
                </button>
              </div>

              <div className="triage-lawyers-row">
                {matchingLawyers.map((lawyer) => (
                  <div key={lawyer.id} className="triage-lawyer-card">
                    <div className="t-card-top">
                      <div className="t-avatar">{lawyer.initials}</div>
                      <div>
                        <strong>{lawyer.name}</strong>
                        <div className="t-exp">{lawyer.experienceYears} yrs experience · {lawyer.location}</div>
                      </div>
                    </div>
                    <div className="t-card-details">
                      <span className="t-rating">★ {lawyer.rating} ({lawyer.reviewsCount} reviews)</span>
                      <span className="t-fee">{lawyer.feeDisplay}</span>
                    </div>
                    <button
                      className="button button-gold button-small full-width"
                      onClick={() => onSelectLawyer(lawyer)}
                    >
                      Book Consultation with {lawyer.initials} <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
