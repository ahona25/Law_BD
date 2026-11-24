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

// Build friendly system prompt for live LLM
function buildSystemPrompt(groundedLaw, matchingLawyers, isBangla) {
  const actsList = groundedLaw && groundedLaw.acts ? groundedLaw.acts.join(', ') : (groundedLaw && groundedLaw.title ? groundedLaw.title : 'Bangladesh Code');
  const provisions = groundedLaw && groundedLaw.key_provisions ? groundedLaw.key_provisions.join('; ') : 'Statutory provisions of Bangladesh';
  const penalties = (groundedLaw && groundedLaw.penalties) || 'Applicable under statutory code';
  const lang = isBangla ? 'Bengali (\u09AC\u09BE\u0982\u09B2\u09BE)' : 'English';
  const addressWord = isBangla ? '\u0986\u09AA\u09A8\u09BF' : 'you';
  const statuteTitle = (groundedLaw && groundedLaw.title) || 'Bangladesh Legal Code';
  const actYear = (groundedLaw && groundedLaw.act_no_year) || 'Official Gazette';

  return 'You are "Law_BD AI", a trusted legal advisor who helps everyday people in Bangladesh understand their rights in simple, friendly language.\n\n'
    + 'TONE & STYLE (most important):\n'
    + '- Speak like a knowledgeable friend who knows Bangladesh law \u2014 warm, clear, and empathetic.\n'
    + '- Use simple everyday ' + lang + ' \u2014 avoid legal jargon. If you must use a legal term, explain it in plain words right after.\n'
    + '- Address the user directly as "' + addressWord + '" \u2014 make it personal and reassuring.\n'
    + '- Keep the total response under 400 words. Be concise but complete.\n'
    + '- Use emoji section markers (\uD83D\uDCA1 \u2705 \uD83D\uDCCB \u2753 \u26A0\uFE0F) to make responses easy to scan.\n'
    + '- Start by briefly acknowledging their situation in 1-2 sentences.\n'
    + '- Then give clear, numbered actionable steps they can follow today.\n\n'
    + 'STRUCTURE (use this order):\n'
    + '1. \uD83D\uDCA1 Brief acknowledgement (what law applies and why it matters, 1-2 sentences)\n'
    + '2. \u2705 What you can do right now (numbered steps, plain language)\n'
    + '3. \uD83D\uDCCB Documents to keep ready (short bullet list)\n'
    + '4. \u2753 One follow-up question only if you genuinely need more details\n'
    + '5. \u26A0\uFE0F Short disclaimer (1 sentence max)\n\n'
    + 'GROUNDING CONTEXT (cite these when relevant, explained simply):\n'
    + '- Primary statute: "' + statuteTitle + '" (' + actYear + ')\n'
    + '- Acts: ' + actsList + '\n'
    + '- Key provisions: ' + provisions + '\n'
    + '- Penalties: ' + penalties + '\n\n'
    + 'RULES:\n'
    + '- Only cite Bangladesh laws (Penal Code 1860, CrPC, NI Act, Cyber Security Act 2023, Land Crime Act 2023, Muslim Family Laws 1961, Labour Act 2006, etc.)\n'
    + '- Adapt naturally to the specific situation \u2014 do not use a rigid template.\n'
    + '- If the message is too short or vague, ask one specific follow-up question.';
}
// Friendly Grounded Bangladesh Legal Analysis (Fallback Engine)
function generateGroundedLegalAnalysis(userMessage, conversationHistory, groundedLaw, categoryInfo, isBangla) {
  const isInsufficient = userMessage.trim().length < 25;
  const lawTitle = isBangla ? (groundedLaw.bangla_title || groundedLaw.title) : groundedLaw.title;
  const actRef = groundedLaw.acts ? groundedLaw.acts.join(', ') : groundedLaw.title;

  let reply = '';

  if (isBangla) {
    const provisions = groundedLaw.key_provisions
      ? groundedLaw.key_provisions.map(p => '\u2022 ' + p).join('\n')
      : '\u2022 এই বিষয়ে বাংলাদেশ আইনে প্রাসঙ্গিক ধারা রয়েছে।';
    const steps = groundedLaw.procedure_steps
      ? groundedLaw.procedure_steps.map((s, i) => (i + 1) + '. ' + s).join('\n')
      : '1. নিকটস্থ থানায় সাধারণ ডায়েরি (GD) বা এজাহার (FIR) দিন।\n2. থানা না নিলে সরাসরি ম্যাজিস্ট্রেট আদালতে নালিশ করুন।\n3. আইনজীবীর মাধ্যমে ৩০ দিনের আইনি নোটিশ পাঠান।';
    const docs = groundedLaw.required_documents
      ? groundedLaw.required_documents.map(d => '\u2022 ' + d).join('\n')
      : '\u2022 জাতীয় পরিচয়পত্র (NID)\n\u2022 ঘটনার তারিখ ও স্থানের বিবরণ\n\u2022 যেকোনো লিখিত চুক্তি, রশিদ বা প্রমাণ';
    const penaltiesText = groundedLaw.penalties_bn || groundedLaw.penalties || '';
    const followUp = isInsufficient
      ? '\u2753 **আরেকটু জানালে ভালো হয়:**\nঘটনাটা ঠিক কতদিন আগে হয়েছে এবং আপনার কাছে কোনো লিখিত প্রমাণ বা সাক্ষী আছে কি? এটা জানলে আরও নির্দিষ্টভাবে সাহায্য করতে পারব।'
      : '\u2753 **একটা প্রশ্ন:**\nবিপক্ষ পক্ষের পূর্ণ ঠিকানা এবং কোনো প্রত্যক্ষদর্শী আছেন কি? এটা মামলার কৌশলে কাজে লাগবে।';

    reply = [
      '\uD83D\uDCA1 **আপনার পরিস্থিতি সম্পর্কে:**',
      'আপনার বর্ণিত বিষয়টি **' + lawTitle + '** (' + actRef + ')-এর আওতায় পড়ে। এই আইনটি আপনাকে সুরক্ষা দেওয়ার জন্যই তৈরি।',
      '',
      provisions,
      '',
      penaltiesText ? '**' + penaltiesText + '**' : '',
      '',
      '---',
      '',
      '\u2705 **এখনই যা করতে পারেন:**',
      steps,
      '',
      '---',
      '',
      '\uD83D\uDCCB **যে কাগজপত্র গুছিয়ে রাখবেন:**',
      docs,
      '',
      '---',
      followUp,
      '',
      '---',
      '> \u26A0\uFE0F এটি Law_BD ডেটাবেজের আইনি তথ্য \u2014 ব্যক্তিগত মামলার আগে অবশ্যই একজন নিবন্ধিত আইনজীবীর পরামর্শ নিন।'
    ].filter(l => l !== null && l !== undefined).join('\n');
  } else {
    const provisions = groundedLaw.key_provisions
      ? groundedLaw.key_provisions.map(p => '\u2022 ' + p).join('\n')
      : '\u2022 Relevant statutory provisions apply under Bangladesh law.';
    const steps = groundedLaw.procedure_steps
      ? groundedLaw.procedure_steps.map((s, i) => (i + 1) + '. ' + s).join('\n')
      : '1. Go to your local police station and file a General Diary (GD) or FIR report.\n2. If the police refuse, file a complaint directly at the Magistrate Court (CR Case).\n3. Have your lawyer send a formal 30-day legal notice to the other party.';
    const docs = groundedLaw.required_documents
      ? groundedLaw.required_documents.map(d => '\u2022 ' + d).join('\n')
      : '\u2022 Your National ID Card (NID)\n\u2022 Exact dates, times, and location of the incident\n\u2022 Any written agreements, receipts, messages, or photos';
    const penaltiesText = groundedLaw.penalties || '';
    const followUp = isInsufficient
      ? '\u2753 **Quick question:** How long ago did this happen, and do you have any written evidence or witnesses? Knowing this will help me give you more accurate guidance.'
      : '\u2753 **One thing to check:** Do you have the other party\'s full address, and are there any eyewitnesses? This matters a lot for your legal strategy.';

    reply = [
      '\uD83D\uDCA1 **Here\'s what\'s happening legally:**',
      'Your situation falls under the **' + lawTitle + '** (' + actRef + '). This law is designed to protect people in exactly your position.',
      '',
      provisions,
      '',
      penaltiesText ? '**' + penaltiesText + '**' : '',
      '',
      '---',
      '',
      '\u2705 **What you can do right now:**',
      steps,
      '',
      '---',
      '',
      '\uD83D\uDCCB **Documents to keep ready:**',
      docs,
      '',
      '---',
      followUp,
      '',
      '---',
      '> \u26A0\uFE0F This is legal information from the Law_BD database \u2014 always consult a registered Bangladesh Bar Council advocate before taking legal action.'
    ].filter(l => l !== null && l !== undefined).join('\n');
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
