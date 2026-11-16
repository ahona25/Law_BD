import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { db } from '../db/database.js';

/**
 * Law_BD AI Legal Assistant Service
 * Securely communicates with Google Gemini or OpenAI ChatGPT API using backend environment variables.
 * Fallback to grounded Bangladesh statutory knowledge engine when API keys are not set or during quota exhaustion.
 */

// Retrieve grounded statutes from database
function retrieveRelevantLaws(query) {
  const q = (query || '').toLowerCase();
  const laws = db.find('laws') || [];

  const scored = laws.map(law => {
    let score = 0;
    const titleMatch = (law.title && law.title.toLowerCase().includes(q)) ? 6 : 0;
    const bnTitleMatch = (law.bangla_title && law.bangla_title.includes(q)) ? 6 : 0;
    const summaryMatch = (law.simple_summary && law.simple_summary.toLowerCase().includes(q)) ? 4 : 0;
    const actsMatch = (law.acts && law.acts.some(a => a.toLowerCase().includes(q))) ? 5 : 0;

    const words = q.split(/\s+/).filter(w => w.length > 2);
    words.forEach(w => {
      if (law.title && law.title.toLowerCase().includes(w)) score += 1.5;
      if (law.bangla_title && law.bangla_title.includes(w)) score += 2;
      if (law.simple_summary && law.simple_summary.toLowerCase().includes(w)) score += 1;
      if (law.key_provisions && law.key_provisions.some(p => p.toLowerCase().includes(w))) score += 2;
      if (law.category && law.category.toLowerCase().includes(w)) score += 3;
    });

    score += titleMatch + bnTitleMatch + summaryMatch + actsMatch;
    return { law, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].law : laws[0];
}

// Map legal keywords to case categories & specialties
function detectCaseCategory(query) {
  const q = (query || '').toLowerCase();

  if (/জমি|দলিল|খতিয়ান|বেদখল|জমিজমা|খাজনা|নামজারি|land|deed|property|khatian|encroach|mutation|real estate/i.test(q)) {
    return { category: 'property', specialty: 'Land & Property', matchedCategory: 'Land Ownership & Illegal Encroachment' };
  }
  if (/চেক|ডিজঅনার|টাকা পাওনা|bounced|cheque|check|dishonour|ni act|138|promissory|loan/i.test(q)) {
    return { category: 'cheque', specialty: 'Cheque Dishonour', matchedCategory: 'Cheque Dishonour & Financial Recovery' };
  }
  if (/জামিন|গ্রেফতার|রিমান্ড|থানা|পুলিশ|bail|arrest|remand|crpc|police|fir|police station|anticipatory bail/i.test(q)) {
    return { category: 'criminal', specialty: 'Criminal Law', matchedCategory: 'Bail Laws & Criminal Defense' };
  }
  if (/তালাক|ডিভোর্স|দেনমোহর|ভরণপোষণ|সন্তান|কাস্টডি|divorce|dower|denmohur|maintenance|custody|child|family/i.test(q)) {
    return { category: 'family', specialty: 'Family & Divorce', matchedCategory: 'Divorce, Dower & Child Custody' };
  }
  if (/সাইবার|ব্ল্যাকমেইল|হোয়াটসঅ্যাপ|ফেসবুক|ছবি|ভিডিও|হ্যাকিং|cyber|blackmail|facebook|whatsapp|harassment|online fraud|hacked/i.test(q)) {
    return { category: 'cyber', specialty: 'Cybercrime', matchedCategory: 'Cyber Harassment & Digital Safety' };
  }
  if (/যৌতুক|মারধর|গৃহ নির্যাতন|ডোমেস্টিক|dowry|domestic violence|violence|abuse|wife beating|physical abuse/i.test(q)) {
    return { category: 'domestic', specialty: 'Domestic Violence', matchedCategory: 'Domestic Violence & Dowry Prohibition' };
  }
  if (/চাকরি|বরখাস্ত|মজুরি|শ্রমিক|বেতন|কারখানা|labour|termination|dismissal|wages|worker|workplace|factory/i.test(q)) {
    return { category: 'labour', specialty: 'Labour & Workplace', matchedCategory: 'Labour Rights & Wrongful Termination' };
  }
  if (/প্রতারণা|জালিয়াতি|ধোঁকা|টাকা আত্মসাৎ|cheat|fraud|forgery|breach of trust|embezzlement|420|406/i.test(q)) {
    return { category: 'criminal', specialty: 'Criminal Law', matchedCategory: 'Fraud, Cheating & Criminal Breach of Trust' };
  }
  if (/সংবিধান|মৌলিক অধিকার|রিট|রিট পিটিশন|constitution|fundamental rights|writ|high court/i.test(q)) {
    return { category: 'constitutional', specialty: 'Constitutional', matchedCategory: 'Constitutional Law & Fundamental Rights' };
  }

  return { category: 'general', specialty: 'General Practice', matchedCategory: 'Bangladesh General Legal Framework' };
}

// Detect district/division mentioned in query
function detectLocation(query) {
  const q = (query || '').toLowerCase();
  const divisions = ['dhaka', 'chattogram', 'chittagong', 'sylhet', 'rajshahi', 'khulna', 'barishal', 'barisal', 'rangpur', 'mymensingh', 'কুমিল্লা', 'ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];
  for (const div of divisions) {
    if (q.includes(div)) {
      return div === 'chittagong' ? 'Chattogram' : div.charAt(0).toUpperCase() + div.slice(1);
    }
  }
  return '';
}

// Recommend most suitable advocates from database
export function recommendAdvocates(query, caseCategoryInfo) {
  const allLawyers = db.find('lawyers') || [];
  if (allLawyers.length === 0) return [];

  const detectedLoc = detectLocation(query);
  const targetSpecialty = caseCategoryInfo?.specialty?.toLowerCase() || '';

  const scoredLawyers = allLawyers.map(l => {
    let score = 0;

    // Specialty matching
    if (l.specialties && Array.isArray(l.specialties)) {
      l.specialties.forEach(spec => {
        const sLower = spec.toLowerCase();
        if (targetSpecialty && sLower.includes(targetSpecialty)) score += 10;
        if (targetSpecialty.includes('property') && (sLower.includes('land') || sLower.includes('property') || sLower.includes('civil'))) score += 8;
        if (targetSpecialty.includes('criminal') && (sLower.includes('criminal') || sLower.includes('bail'))) score += 8;
        if (targetSpecialty.includes('family') && (sLower.includes('family') || sLower.includes('divorce') || sLower.includes('custody'))) score += 8;
        if (targetSpecialty.includes('cheque') && (sLower.includes('cheque') || sLower.includes('commercial') || sLower.includes('civil'))) score += 8;
        if (targetSpecialty.includes('cyber') && sLower.includes('cyber')) score += 10;
        if (targetSpecialty.includes('labour') && (sLower.includes('labour') || sLower.includes('corporate'))) score += 8;
        if (targetSpecialty.includes('domestic') && (sLower.includes('domestic') || sLower.includes('family') || sLower.includes('human rights'))) score += 8;
      });
    }

    // Location matching
    if (detectedLoc) {
      const locLower = detectedLoc.toLowerCase();
      if (l.district && l.district.toLowerCase().includes(locLower)) score += 6;
      if (l.division && l.division.toLowerCase().includes(locLower)) score += 4;
      if (l.chamberAddress && l.chamberAddress.toLowerCase().includes(locLower)) score += 4;
    }

    // Experience & Rating weighting
    if (l.experienceYears) score += Math.min(l.experienceYears * 0.4, 6);
    if (l.rating) score += (l.rating - 4) * 5;
    if (l.verified) score += 3;
    if (l.courtLevel && l.courtLevel.includes('Supreme Court')) score += 2;

    return { lawyer: l, score };
  });

  scoredLawyers.sort((a, b) => b.score - a.score);
  return scoredLawyers.slice(0, 3).map(s => s.lawyer);
}

// Generate dynamic suggested follow-up queries based on incident topic
function generateSuggestedQueries(category, isBangla) {
  if (isBangla) {
    switch (category) {
      case 'property':
        return [
          'জমি বেদখল হলে থানায় কি ফৌজদারি মামলা করা যাবে নাকি দেওয়ানি আদালতে যেতে হবে?',
          'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী কত দিনের মধ্যে মামলা করতে হবে?',
          'ওয়ারিশি সম্পত্তি অন্য ভাই-বোন লিখে নিলে দলিল বাতিলের নিয়ম কী?'
        ];
      case 'cheque':
        return [
          'চেক ডিজঅনারের ৩০ দিনের আইনি নোটিশের ড্রাফট কিভাবে করতে হয়?',
          'লিগ্যাল নোটিশ পাঠানোর পর টাকা না দিলে ম্যাজিস্ট্রেট আদালতে সিআর কেসের নিয়ম কী?',
          'একাউন্টে টাকা না থাকলে চেক বাউন্স সংক্রান্ত সর্বোচ্চ শাস্তি কত বছর?'
        ];
      case 'criminal':
        return [
          'হাইকোর্ট থেকে আগাম জামিন (CrPC 498) পেতে কি কি কাগজপত্র লাগে?',
          'থানায় এজাহার (FIR) গ্রহণ না করলে আদালতে নালিশি মামলা কিভাবে করতে হয়?',
          'জামিনযোগ্য (Bailable) ও অজামিনযোগ্য (Non-Bailable) ধারার মূল পার্থক্য কী?'
        ];
      case 'family':
        return [
          'স্বামী ডিভোর্স নোটিশ পাঠালে স্ত্রীর দেনমোহর ও ইদ্দতকালীন ভরণপোষণ আদায়ের নিয়ম কী?',
          'পারিবারিক আদালতে সন্তানের কাস্টডি পেতে মায়ের আইনগত অধিকার কী?',
          'দেনমোহর কি এককালীন পরিশোধ করতে হয় নাকি কিস্তিতে দেওয়ার সুযোগ আছে?'
        ];
      case 'cyber':
        return [
          'সোশ্যাল মিডিয়ায় ফেক আইডি বা ছবি বিকৃত করলে সাইবার পুলিশে কিভাবে অভিযোগ দিতে হয়?',
          'সাইবার নিরাপত্তা আইন ২০২৩ এর অধীনে সরাসরি ম্যাজিস্ট্রেট আদালতে মামলা করার নিয়ম কী?',
          'অনলাইন প্রতারণা বা ব্ল্যাকমেইলিংয়ের ক্ষেত্রে কি কি ডিজিটাল প্রমাণ সংরক্ষণ করতে হবে?'
        ];
      case 'domestic':
        return [
          'পারিবারিক সহিংসতা প্রতিরোধ আইনে সুরক্ষা আদেশ (Protection Order) কিভাবে পাওয়া যায়?',
          'যৌতুক নিরোধ আইন ২০১৮ অনুযায়ী মিথ্যা মামলার বিরুদ্ধে কি পদক্ষেপ নেওয়া যায়?',
          'শারীরিক বা মানসিক নির্যাতনের শিকার হলে সরকারি আইনি সহায়তা (১৬৪৩০) পাওয়ার নিয়ম কী?'
        ];
      default:
        return [
          'এই ঘটনায় আমার বিরুদ্ধে কোনো নোটিশ আসলে করণীয় পদক্ষেপ কী হবে?',
          'একজন বিজ্ঞ আইনজীবীর মাধ্যমে আইনি নোটিশ পাঠাতে কত সময় লাগে?',
          'মামলা দায়ের করার জন্য প্রাথমিক কি কি প্রমাণ ও কাগজপত্র গুছিয়ে রাখা উচিত?'
        ];
    }
  } else {
    switch (category) {
      case 'property':
        return [
          'What is the statutory limitation period under the Land Crime Act 2023?',
          'Should I file a criminal FIR at the Police Station or a Title Suit in Civil Court?',
          'How can I obtain a temporary injunction against unauthorized construction?'
        ];
      case 'cheque':
        return [
          'What are the mandatory strict deadlines for Section 138 NI Act legal notice?',
          'Can the court freeze the accused person\'s bank account during cheque proceedings?',
          'What is the maximum penalty and compensation awardable under NI Act 1881?'
        ];
      case 'criminal':
        return [
          'What is the procedure for obtaining Anticipatory Bail under Section 498 CrPC?',
          'What should I do if the local Police Station refuses to record an FIR/Ejahar?',
          'What are the legal rights of an arrested citizen under Article 33 of the Constitution?'
        ];
      case 'family':
        return [
          'How can an estranged wife file a Family Court suit for prompt dower recovery?',
          'What are the legal principles governing maternal custody under Islamic & BD Law?',
          'What is the statutory 90-day conciliation procedure under Muslim Family Laws 1961?'
        ];
      case 'cyber':
        return [
          'How do I file a formal complaint with the Cyber Crime Investigation Division?',
          'What digital evidence (hashes, IP headers, URLs) must be preserved for trial?',
          'What are the penalties for unauthorized identity misuse under Cyber Security Act?'
        ];
      default:
        return [
          'What preliminary documentary evidence should I assemble before filing a case?',
          'How does an advocate serve a formal statutory legal notice?',
          'What are the immediate legal remedies available in magistrate court?'
        ];
    }
  }
}

// Build comprehensive system prompt for live LLM
function buildSystemPrompt(groundedLaw, matchingLawyers, isBangla) {
  return `You are "Law_BD Official AI", a distinguished Bangladesh Supreme Court and Senior District Bar Legal Counsel.
You specialize in the statutory legal system of Bangladesh (Penal Code 1860, CrPC 1898, CPC 1908, Evidence Act 1872, Land Crime Act 2023, Cyber Security Act 2023, NI Act 1881, Muslim Family Laws Ordinance 1961, Domestic Violence Act 2010, Labour Act 2006, etc.).

PRIMARY INSTRUCTIONS:
1. Language: Always respond fluently in ${isBangla ? 'Bengali (বাংলা)' : 'English'}, matching the user query.
2. Structure: Structure every incident analysis clearly with the following sections:
   - ### ⚖️ আইনি বিশ্লেষণ ও মূল আইন (Legal Overview & Applicable Statutes)
   - ### 📜 প্রযোজ্য ধারা ও আইনি বিধান (Specific Bangladesh Acts & Section Numbers)
   - ### ⚖️ নির্ধারিত দণ্ড ও শাস্তির বিধান (Statutory Punishments, Fines & Penalties)
   - ### 📋 মামলা দায়ের ও পরবর্তী করণীয় পদক্ষেপ (Actionable Legal Procedures: GD vs FIR vs CR Case vs Civil Suit)
   - ### 📑 প্রয়োজনীয় প্রমাণপত্র ও ডকুমেন্টস (Essential Documents Checklist)
   - ### ❓ অতিরিক্ত প্রয়োজনীয় তথ্য (Follow-up Clarifying Questions if details are missing: deeds, dates, notices, witness)
   - ### ⚠️ আইনি সতর্কবার্তা (Statutory Legal Disclaimer: Information only, consult an enrolled Bangladesh Bar Council advocate before legal action)

3. Grounding Context:
   - Primary grounded statute in Law_BD repository: "${groundedLaw?.title || 'Bangladesh Legal Code'}" (${groundedLaw?.act_no_year || 'Official Gazette'})
   - Act reference: ${groundedLaw?.acts ? groundedLaw.acts.join(', ') : groundedLaw?.title}
   - Key provisions: ${groundedLaw?.key_provisions ? groundedLaw.key_provisions.join('; ') : 'Statutory provisions of Bangladesh'}
   - Statutory penalties: ${groundedLaw?.penalties || 'Applicable under statutory code'}

4. Tone: Professional, authoritative, empathetic, legally grounded, and objective. Never cite foreign or Indian laws; cite ONLY Bangladesh laws and official Bangladesh Gazette Acts.`;
}

// Comprehensive Grounded Statutory Reasoning Engine (Reliable Fallback)
function generateGroundedLegalAnalysis(userMessage, conversationHistory, groundedLaw, categoryInfo, isBangla) {
  const category = categoryInfo.category;
  const isInsufficient = userMessage.trim().length < 25;

  let reply = '';

  if (isBangla) {
    reply = `### ⚖️ আইনি বিশ্লেষণ ও প্রযোজ্য আইন
আপনার বর্ণিত ঘটনার প্রেক্ষিতে বাংলাদেশের প্রচলিত ও বলবৎ আইন অনুযায়ী আইনি পর্যালোচনা নিম্নরূপ:

**১. মূল আইন ও প্রাতিষ্ঠানিক রেফারেন্স:**
- **${groundedLaw.bangla_title || groundedLaw.title}**
- সংশ্লিষ্ট বাংলাদেশ কোড ও অধ্যাদেশ: **${groundedLaw.acts ? groundedLaw.acts.join(', ') : groundedLaw.title}**
- বর্তমান আইনি অবস্থা: **${groundedLaw.status === 'current' ? 'বলবৎ আইন (Enacted & Enforced Law)' : 'সংশোধিত আইনি বিধান'} (${groundedLaw.act_no_year || 'বাংলাদেশ গেজেট'})**

---

### 📜 প্রযোজ্য ধারা ও আইনি বিধান
${groundedLaw.simple_summary_bn || groundedLaw.simple_summary}

**গুরুত্বপূর্ণ আইনি বিধিমালার ধারা:**
${groundedLaw.key_provisions ? groundedLaw.key_provisions.map(p => `• **${p}**`).join('\n') : '• সংশ্লিষ্ট আইনি ধারাসমূহ বিদ্যমান কোড অনুযায়ী প্রযোজ্য।'}

---

### ⚖️ নির্ধারিত দণ্ড, জরিমানা ও শাস্তির বিধান
${groundedLaw.penalties_bn || groundedLaw.penalties}

---

### 📋 মামলা দায়ের ও পরবর্তী করণীয় আইনি পদক্ষেপ (Actionable Steps)
${groundedLaw.procedure_steps ? groundedLaw.procedure_steps.map((s, i) => `**${i + 1}.** ${s}`).join('\n') : 
`**১. প্রাথমিক ডায়েরি বা অভিযোগ:** নিকটস্থ সংশ্লিষ্ট থানায় ঘটনা সংক্রান্ত বিস্তারিত তথ্য উল্লেখ করে একটি সাধারণ ডায়েরি (GD) বা এজাহার (FIR) দায়ের করুন।
**২. বিজ্ঞ আদালতে নালিশি মামলা (CR Case):** থানা মামলা গ্রহণে অপারগ হলে সরাসরি উপযুক্ত জুডিশিয়াল বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতে নালিশি মামলা রুজু করুন।
**৩. আইনি নোটিশ প্রেরণ:** প্রয়োজনে সনদপ্রাপ্ত বিজ্ঞ আইনজীবীর মাধ্যমে বিপক্ষ পক্ষ বরাবর ৩০ দিনের সংবিধিবদ্ধ লিগ্যাল নোটিশ প্রেরণ করুন।`}

---

### 📑 প্রয়োজনীয় প্রমাণপত্র ও ডকুমেন্টস চেকলিস্ট
${groundedLaw.required_documents ? groundedLaw.required_documents.map(d => `• ${d}`).join('\n') : 
`• ঘটনার তারিখ, সময় ও ঘটনাস্থলের সুনির্দিষ্ট বিবরণ।
• জাতীয় পরিচয়পত্র (NID) ও যোগাযোগের ঠিকানা।
• সংশ্লিষ্ট চুক্তিপত্র, স্ট্যাম্প, খতিয়ান বা আর্থিক প্রমাণাদি (যদি থাকে)।`}

---

### ❓ অতিরিক্ত প্রয়োজনীয় তথ্য (Follow-up Questions)
${isInsufficient ? 
`আপনার বিবরণটি কিছুটা সংক্ষিপ্ত হওয়ায় সঠিক আইনি প্রতিকার নিখুঁতভাবে চিহ্নিত করার জন্য নিচের তথ্যগুলো জানা প্রয়োজন:
১. ঘটনাটি ঠিক কত দিন বা কত মাস আগে সংঘটিত হয়েছে?
২. এ বিষয়ে আপনাদের মধ্যে লিখিত কোনো চুক্তি, স্ট্যাম্প বা অডিও-ভিডিও প্রমাণপত্র আছে কি?
৩. আপনি ইতোমধ্যে থানায় বা আদালতে কোনো অভিযোগ দাখিল করেছেন কিনা?` :
`ঘটনাটি আরও কার্যকরভাবে পরিচালনার জন্য যাচাই করে নিন:
১. আপনার নিকট বিবাদীর স্থায়ী ও বর্তমান পূর্ণাঙ্গ ঠিকানা রয়েছে কি?
২. ঘটনার প্রত্যক্ষদর্শী কোনো নিরপেক্ষ সাক্ষী উপস্থিত ছিলেন কি?`}

---
> ⚠️ **আইনি সতর্কবার্তা (Legal Disclaimer):** এই বিশ্লেষণটি Law_BD ডেটাবেজের বাংলাদেশ কোড ও সংবিধিবদ্ধ আইনের ভিত্তিতে প্রস্তুতকৃত প্রাথমিক আইনি তথ্য। এটি কোনো অবস্থাতেই একজন সনদপ্রাপ্ত বিজ্ঞ আইনজীবীর সাথে ব্যক্তিগত আইনি পরামর্শের বিকল্প নয়। আদালতে কোনো পদক্ষেপ নেওয়ার পূর্বে নথিভুক্ত আইনজীবীর সহায়তা নিন।`;
  } else {
    reply = `### ⚖️ Legal Overview & Primary Statutes
Based on the incident described and verified under the official statutes of the People’s Republic of Bangladesh:

**1. Governing Statutes & Legal Framework:**
- **${groundedLaw.title}** (${groundedLaw.act_no_year || 'Official Gazette Enactment'})
- Associated Reference Acts: **${groundedLaw.acts ? groundedLaw.acts.join('; ') : groundedLaw.title}**
- Official Status: **${groundedLaw.status ? groundedLaw.status.toUpperCase() : 'ENACTED & IN FORCE'}**

---

### 📜 Applicable Sections & Statutory Provisions
${groundedLaw.simple_summary}

**Key Substantive Provisions:**
${groundedLaw.key_provisions ? groundedLaw.key_provisions.map(p => `• **${p}**`).join('\n') : '• Applicable substantive provisions under Bangladesh Legal Code.'}

---

### ⚖️ Prescribed Statutory Penalties & Remedies
${groundedLaw.penalties}

---

### 📋 Litigation Roadmap & Next Actionable Steps
${groundedLaw.procedure_steps ? groundedLaw.procedure_steps.map((s, i) => `**${i + 1}.** ${s}`).join('\n') :
`**1. Lodge Police Report (GD / FIR):** Lodge a General Diary (GD) or First Information Report (FIR) at the local police station having territorial jurisdiction.
**2. Direct Complaint before Magistrate (CR Case):** If the police station refuses or if the offence is non-cognizable, file a direct Complaint Register (CR) case before the Chief Judicial / Metropolitan Magistrate Court.
**3. Statutory Legal Notice:** Serve a formal 30-day legal notice through an enrolled Supreme Court or District Bar Advocate.`}

---

### 📑 Essential Evidentiary Documents to Assemble
${groundedLaw.required_documents ? groundedLaw.required_documents.map(d => `• ${d}`).join('\n') :
`• Exact chronogram of incidents (dates, times, locations).
• National Identity Card (NID) and identity credentials.
• Certified copies of any deeds, receipts, emails, or digital transaction records.`}

---

### ❓ Clarifying Follow-up Inquiries
${isInsufficient ?
`To pinpoint the exact statutory recourse for your case, please clarify:
1. What was the exact date and limitation timeframe of the occurrence?
2. Is there a registered written deed, stamp paper, or bank transaction slip supporting your claim?
3. Has any formal report or legal notice already been served between the parties?` :
`For litigation strategy preparation:
1. Do you possess the permanent and operational address of the opposite party?
2. Are independent eyewitnesses available to testify regarding the incident?`}

---
> ⚠️ **Mandatory Legal Disclaimer:** This information is generated by Law_BD AI grounded strictly in official Bangladesh statutory texts. It is for informational and educational awareness only and does not constitute formal attorney-client legal advice. Consult an enrolled Bar Council advocate before initiating litigation.`;
  }

  return reply;
}

/**
 * Main AI Chat Processor
 * Evaluates configured API keys (GEMINI_API_KEY or OPENAI_API_KEY), invokes LLM,
 * grounds output in Bangladesh legal database, and matches qualified advocates.
 */
export async function processAiChat({ message, conversationHistory = [], language = 'en' }) {
  if (!message || !message.trim()) {
    throw new Error('Message cannot be empty');
  }

  const isBangla = /[\u0980-\u09FF]/.test(message) || language === 'bn';
  const categoryInfo = detectCaseCategory(message);
  const groundedLaw = retrieveRelevantLaws(message);
  const recommendedLawyers = recommendAdvocates(message, categoryInfo);
  const suggestedQueries = generateSuggestedQueries(categoryInfo.category, isBangla);

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const provider = (process.env.AI_PROVIDER || 'auto').toLowerCase();
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const openAiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  let reply = '';
  let providerUsed = 'grounded-engine';

  // 1. Try Google Gemini API if configured
  if (geminiKey && (provider === 'gemini' || provider === 'auto')) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const systemInstruction = buildSystemPrompt(groundedLaw, recommendedLawyers, isBangla);

      const model = genAI.getGenerativeModel({
        model: geminiModel,
        systemInstruction: systemInstruction,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1500
        }
      });

      // Prepare conversation history for Gemini SDK
      // Format: { role: 'user' | 'model', parts: [{ text: ... }] }
      const formattedHistory = [];
      if (Array.isArray(conversationHistory)) {
        conversationHistory.slice(-6).forEach(item => {
          if (item.text && item.text.trim()) {
            formattedHistory.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text }]
            });
          }
        });
      }

      const chat = model.startChat({ history: formattedHistory });
      const promptWithGroundedStatute = `${message}

[GROUNDED BANGLADESH STATUTE CONTEXT FOR CITATION:
Act: ${groundedLaw?.title} (${groundedLaw?.act_no_year || 'Bangladesh Code'})
Bengali Title: ${groundedLaw?.bangla_title}
Key Provisions: ${groundedLaw?.key_provisions?.join('; ')}
Penalties: ${groundedLaw?.penalties}]`;

      const result = await chat.sendMessage(promptWithGroundedStatute);
      const response = await result.response;
      const text = response.text();

      if (text && text.trim().length > 30) {
        reply = text.trim();
        providerUsed = `Gemini (${geminiModel})`;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to grounded legal engine:', err.message);
    }
  }

  // 2. Try OpenAI API if configured and Gemini was not used
  if (!reply && openAiKey && (provider === 'openai' || provider === 'auto')) {
    try {
      const openai = new OpenAI({ apiKey: openAiKey });
      const systemInstruction = buildSystemPrompt(groundedLaw, recommendedLawyers, isBangla);

      const messages = [
        { role: 'system', content: systemInstruction }
      ];

      if (Array.isArray(conversationHistory)) {
        conversationHistory.slice(-6).forEach(item => {
          if (item.text && item.text.trim()) {
            messages.push({
              role: item.role === 'assistant' ? 'assistant' : 'user',
              content: item.text
            });
          }
        });
      }

      messages.push({
        role: 'user',
        content: `${message}

[GROUNDED BANGLADESH STATUTE CONTEXT:
Act: ${groundedLaw?.title} (${groundedLaw?.act_no_year || 'Bangladesh Code'})
Key Provisions: ${groundedLaw?.key_provisions?.join('; ')}
Penalties: ${groundedLaw?.penalties}]`
      });

      const completion = await openai.chat.completions.create({
        model: openAiModel,
        messages: messages,
        temperature: 0.2,
        max_tokens: 1500
      });

      const text = completion.choices?.[0]?.message?.content;
      if (text && text.trim().length > 30) {
        reply = text.trim();
        providerUsed = `OpenAI (${openAiModel})`;
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to grounded legal engine:', err.message);
    }
  }

  // 3. High-grade Grounded Bangladesh Statutory Reasoning Fallback
  if (!reply) {
    reply = generateGroundedLegalAnalysis(message, conversationHistory, groundedLaw, categoryInfo, isBangla);
    providerUsed = 'Law_BD Grounded Statutory Engine';
  }

  return {
    success: true,
    reply,
    provider: providerUsed,
    groundedLaw: {
      id: groundedLaw.id,
      title: groundedLaw.title,
      banglaTitle: groundedLaw.bangla_title,
      actNoYear: groundedLaw.act_no_year,
      status: groundedLaw.status,
      citations: groundedLaw.acts && groundedLaw.acts.length > 0 ? groundedLaw.acts : [groundedLaw.title],
      officialGazetteRef: groundedLaw.official_gazette_ref
    },
    category: categoryInfo.category,
    recommendedLawyers: recommendedLawyers,
    suggestedQueries: suggestedQueries,
    disclaimer: isBangla
      ? 'এটি বাংলাদেশ সরকারের আইন ডেটাবেজ ও বাংলাদেশ কোডের সংবিধিবদ্ধ তথ্যের ভিত্তিতে প্রস্তুতকৃত। এটি সনদপ্রাপ্ত আইনজীবীর বিকল্প পরামর্শ নয়।'
      : 'Grounded strictly in official Bangladesh statutory texts. This does not substitute formal legal representation under Bangladesh Bar Council rules.'
  };
}
