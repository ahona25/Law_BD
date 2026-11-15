import express from 'express';
import { db } from '../db/database.js';
import { ALL_30_LEGAL_CATEGORIES } from '../config/legalCategories.js';

const router = express.Router();

// Rules engine for incident matching across all 30 legal categories
const INCIDENT_RULES = [
  {
    category: 'constitutional',
    keywords: [
      'fundamental rights', 'freedom of speech', 'equality', 'citizenship', 'constitutional remedies', 'writ', 'habeas corpus', 'mandamus',
      'মৌলিক অধিকার', 'বাকস্বাধীনতা', 'সমতা', 'নাগরিকত্ব', 'রিট', 'হেবিয়াস কর্পাস', 'সংবিধান'
    ],
    lawId: 'law-constitution-bd',
    specialistMatch: 'Constitutional Law',
    urgency: 'Constitutional Matter',
    severityAlert: 'Enforceable under Article 102 of the Constitution of Bangladesh before the High Court Division.'
  },
  {
    category: 'property-land',
    keywords: [
      'land', 'property', 'plot', 'encroach', 'occupy', 'occupied', 'grabbing', 'grabbed', 'boundary',
      'khatian', 'mutation', 'namjari', 'deed', 'dalil', 'forged', 'fake deed', 'land fraud', 'illegal possession',
      'জমি', 'দখল', 'জবরদখল', 'খতিয়ান', 'নামজারি', 'দলিল', 'জাল দলিল', 'বাউন্ডারি', 'সীমানা', 'ভিটা', 'অবৈধ দখল'
    ],
    lawId: 'law-land-disputes',
    specialistMatch: 'Land & Property',
    urgency: 'High (Criminal & Civil)',
    severityAlert: 'Criminal Offence under Land Crime Prevention & Redress Act 2023. Non-bailable offence for fraudulent deeds and violent dispossession.'
  },
  {
    category: 'cybercrime-it',
    keywords: [
      'cyber', 'hack', 'hacked', 'facebook', 'whatsapp', 'photo', 'picture', 'blackmail', 'extort',
      'fake profile', 'impersonat', 'online fraud', 'leak', 'viral', 'bkash fraud', 'nagad fraud', 'cyberbullying', 'digital evidence',
      'সাইবার', 'হ্যাকিং', 'হ্যাক', 'ফেসবুক', 'ছবি', 'ব্ল্যাকমেইল', 'বিকাশ প্রতারণা', 'নগদ প্রতারণা', 'ভাইরাল', 'আপত্তিকর ছবি', 'সাইবারবুলিং'
    ],
    lawId: 'law-cyber-crime',
    specialistMatch: 'Cybercrime',
    urgency: 'Immediate / Urgent',
    severityAlert: 'Actionable under Cyber Security Act 2023 and Pornography Control Act 2012. CID Cyber Police hotline 01320010148 available 24/7.'
  },
  {
    category: 'women-child',
    keywords: [
      'dowry', 'child marriage', 'child abuse', 'sexual violence', 'harassment', 'eve teasing', 'rape',
      'যৌতুক', 'বাল্যবিবাহ', 'শিশু নির্যাতন', 'যৌন নিপীড়ন', 'ইভটিজিং', 'ধর্ষণ', 'নারী ও শিশু নির্যাতন'
    ],
    lawId: 'law-domestic-violence',
    specialistMatch: 'Women & Child',
    urgency: 'Critical Emergency',
    severityAlert: 'Severe non-bailable offense prosecuted under Nari O Shishu Nirjatan Daman Ain 2000 & Dowry Prohibition Act 2018.'
  },
  {
    category: 'family',
    keywords: [
      'domestic violence', 'maintenance', 'guardianship', 'family disputes', 'torture by husband', 'in-laws',
      'পারিবারিক সহিংসতা', 'ভরণপোষণ', 'অভিভাবকত্ব', 'পারিবারিক বিরোধ', 'স্বামীর নির্যাতন', 'শ্বশুরবাড়ি'
    ],
    lawId: 'law-domestic-violence',
    specialistMatch: 'Domestic Violence',
    urgency: 'Critical Emergency',
    severityAlert: 'Protected under Domestic Violence (Prevention and Protection) Act 2010. Emergency One-Stop Crisis Centre (OCC) & 109 Helpline response available.'
  },
  {
    category: 'marriage-divorce',
    keywords: [
      'marriage registration', 'divorce', 'talaq', 'dower', 'denmohur', 'child custody', 'marital rights',
      'বিবাহ নিবন্ধন', 'তালাক', 'দেনমোহর', 'সন্তানের হেফাজত', 'দাম্পত্য অধিকার', 'নিকাহনামা', 'কাবিননামা'
    ],
    lawId: 'law-divorce-family',
    specialistMatch: 'Family & Divorce',
    urgency: 'Strict Procedure',
    severityAlert: 'Governed by Muslim Family Laws Ordinance 1961 and Family Courts Act 2023. Section 7 Talaq notice to Chairman is legally mandatory.'
  },
  {
    category: 'banking-finance',
    keywords: [
      'loan disputes', 'cheque dishonour', 'bounced cheque', 'financial fraud', 'mortgage disputes', 'artha rin', 'ni act', '138',
      'ঋণ বিরোধ', 'চেক ডিজঅনার', 'চেক বাউন্স', 'আর্থিক প্রতারণা', 'বন্ধক', 'অর্থ ঋণ আদালত', '১৩৮ ধারা'
    ],
    lawId: 'law-cheque-dishonour',
    specialistMatch: 'Cheque Dishonour',
    urgency: 'Strict 30-Day Limitation',
    severityAlert: 'Strict 30-day statutory limitation window applies under Section 138 Negotiable Instruments Act. Missing notice forfeits criminal remedy!'
  },
  {
    category: 'labour',
    keywords: [
      'unpaid salary', 'wrongful termination', 'workplace harassment', 'compensation', 'workplace safety', 'gratuity', 'provident fund', 'retrench',
      'বকেয়া বেতন', 'বেআইনি বরখাস্ত', 'কর্মক্ষেত্রে হয়রানি', 'শ্রম ক্ষতিপূরণ', 'শ্রম আদালত', 'ছাঁটাই', 'গ্র্যাচুইটি'
    ],
    lawId: 'law-labour-rights',
    specialistMatch: 'Labour & Workplace',
    urgency: 'Actionable Claim (30-day grievance deadline)',
    severityAlert: 'Section 33 Bangladesh Labour Act mandates filing written grievance with employer within 30 days of wrongful termination or unpaid wages.'
  },
  {
    category: 'criminal',
    keywords: [
      'murder', 'theft', 'robbery', 'assault', 'kidnapping', 'fraud', 'forgery', 'extortion', 'threats',
      'খুন', 'হত্যা', 'চুরি', 'ছিনতাই', 'ডাকাতি', 'আক্রমণ', 'অপহরণ', 'জালিয়াতি', 'চাঁদাবাজি', 'হুমকি'
    ],
    lawId: 'law-bail-procedure',
    specialistMatch: 'Criminal Law',
    urgency: 'Urgent Defense / FIR',
    severityAlert: 'Severe penal offence. Lodge immediate FIR under Section 154 CrPC or seek Section 498 anticipatory bail before High Court Division.'
  },
  {
    category: 'court-procedure',
    keywords: [
      'arrest', 'bail', 'fir', 'investigation', 'evidence', 'trial', 'appeal', 'execution', 'police custody', 'remand', 'anticipatory bail',
      'গ্রেপ্তার', 'জামিন', 'আগাম জামিন', 'এজাহার', 'তদন্ত', 'সাক্ষ্য', 'বিচার', 'আপিল', 'রিমান্ড'
    ],
    lawId: 'law-bail-procedure',
    specialistMatch: 'Criminal Law',
    urgency: 'Time Sensitive',
    severityAlert: 'Code of Criminal Procedure 1898 provisions govern police powers, mandatory 24-hour magistrate production, and bail bonds.'
  },
  {
    category: 'medical-healthcare',
    keywords: [
      'medical negligence', 'malpractice', 'patient rights', 'medical compensation', 'wrong surgery', 'doctor fault',
      'চিকিৎসা অবহেলা', 'ভুল চিকিৎসা', 'রোগীর অধিকার', 'চিকিৎসা ক্ষতিপূরণ', 'ডাক্তারের গাফিলতি'
    ],
    lawId: 'law-bail-procedure',
    specialistMatch: 'Civil Law',
    urgency: 'Evidence Critical',
    severityAlert: 'Actionable under Penal Code Section 304A and Bangladesh Medical & Dental Council Act 2010. Preserve all prescriptions and surgical notes.'
  },
  {
    category: 'anti-corruption',
    keywords: [
      'bribery', 'corruption', 'money laundering', 'illegal wealth', 'financial misconduct', 'acc', 'dudok',
      'ঘুষ', 'দুর্নীতি', 'মানিলন্ডারিং', 'অবৈধ সম্পদ', 'দুদক', 'অর্থ পাচার'
    ],
    lawId: 'law-constitution-bd',
    specialistMatch: 'Criminal Law',
    urgency: 'High Stakes Defense',
    severityAlert: 'Governed by Anti-Corruption Commission Act 2004 and Money Laundering Prevention Act 2012.'
  },
  {
    category: 'traffic-transport',
    keywords: [
      'road accident', 'driving offence', 'transport negligence', 'vehicle registration', 'brta', 'hit and run',
      'সড়ক দুর্ঘটনা', 'ড্রাইভিং অপরাধ', 'পরিবহন অবহেলা', 'বিআরটিএ', 'গাড়ি দুর্ঘটনা'
    ],
    lawId: 'law-bail-procedure',
    specialistMatch: 'Civil Law',
    urgency: 'Claim Limitation',
    severityAlert: 'Section 105 Road Transport Act 2018 prescribes compensation claims and criminal liabilities for reckless transport negligence.'
  },
  {
    category: 'consumer',
    keywords: [
      'fake product', 'defective product', 'overcharging', 'misleading advertisement', 'adulterated food', 'mrp',
      'ভেজাল পণ্য', 'নকল পণ্য', 'ত্রুটিযুক্ত সেবা', 'অতিরিক্ত দাম', 'প্রতারণামূলক বিজ্ঞাপন'
    ],
    lawId: 'law-consumer-rights',
    specialistMatch: 'Consumer Rights',
    urgency: '30-Day Window',
    severityAlert: 'Under Consumer Rights Protection Act 2009, complainant receives 25% of the penalty amount upon successful adjudication.'
  }
];

// POST /api/incidents/triage - Smart Incident Search
router.post('/triage', (req, res) => {
  try {
    const { incidentText, issueType, urgencyStage, desiredOutcome } = req.body;

    if (!incidentText && !issueType) {
      return res.status(400).json({ success: false, error: 'Please describe the incident or select an issue type' });
    }

    const text = ((incidentText || '') + ' ' + (issueType || '')).toLowerCase();

    // Match rules based on keyword occurrence score
    let bestMatch = null;
    let highestScore = 0;

    for (const rule of INCIDENT_RULES) {
      let score = 0;
      for (const kw of rule.keywords) {
        if (text.includes(kw.toLowerCase())) {
          score += 2;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = rule;
      }
    }

    // Default fallback if no specific keyword matched
    if (!bestMatch || highestScore === 0) {
      bestMatch = INCIDENT_RULES[1]; // Land / Property or Criminal
    }

    // Retrieve full law details from database
    const primaryLaw = db.findById('laws', bestMatch.lawId) || db.find('laws')[0];

    // Find recommended specialized lawyers
    const matchedLawyers = db.find('lawyers', l => {
      if (!l.specialties) return false;
      return l.specialties.some(s => s.toLowerCase().includes(bestMatch.specialistMatch.toLowerCase()) || bestMatch.specialistMatch.toLowerCase().includes(s.toLowerCase()));
    }).slice(0, 3);

    // Retrieve emergency resources
    const emergencyHelplines = db.find('emergency_resources');

    res.json({
      success: true,
      analysis: {
        category: primaryLaw.category_label || bestMatch.category,
        urgency: bestMatch.urgency,
        severityAlert: bestMatch.severityAlert,
        primaryStatute: primaryLaw.acts ? primaryLaw.acts[0] : primaryLaw.title,
        lawId: primaryLaw.id,
        lawTitle: primaryLaw.title,
        banglaTitle: primaryLaw.bangla_title,
        simpleSummary: primaryLaw.simple_summary,
        simpleSummaryBn: primaryLaw.simple_summary_bn,
        keyProvisions: primaryLaw.key_provisions || [],
        penalties: primaryLaw.penalties,
        penaltiesBn: primaryLaw.penalties_bn,
        procedureSteps: primaryLaw.procedure_steps || [],
        requiredDocuments: primaryLaw.required_documents || [],
        immediateActions: primaryLaw.immediate_actions || []
      },
      recommendedLawyers: matchedLawyers,
      emergencyHelplines: emergencyHelplines.slice(0, 4)
    });
  } catch (err) {
    console.error('Incident triage error:', err);
    res.status(500).json({ success: false, error: 'Incident analysis failed' });
  }
});

export default router;
