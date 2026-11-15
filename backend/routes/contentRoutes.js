import express from 'express';
import { db } from '../db/database.js';

const router = express.Router();

// Get dictionary terms
router.get('/dictionary', (req, res) => {
  const { q, category } = req.query;
  let terms = db.find('dictionary');

  if (category && category !== 'All Terms') {
    terms = terms.filter(t => t.category === category);
  }

  if (q && q.trim()) {
    const query = q.trim().toLowerCase();
    terms = terms.filter(t => {
      return (
        t.term.toLowerCase().includes(query) ||
        (t.bangla && t.bangla.includes(query)) ||
        (t.definition && t.definition.toLowerCase().includes(query))
      );
    });
  }

  res.json({
    success: true,
    count: terms.length,
    terms
  });
});

// Get emergency resources
router.get('/emergency', (req, res) => {
  const resources = db.find('emergency_resources');
  res.json({
    success: true,
    resources
  });
});

// Get legal templates / checklists
router.get('/checklists', (req, res) => {
  const checklists = db.find('checklists');
  res.json({
    success: true,
    checklists
  });
});

// Get legal awareness articles
router.get('/articles', (req, res) => {
  const articles = [
    {
      id: 1,
      title: 'Land Crime Prevention & Redress Act 2023: What to do if someone grabs your property',
      bangla_title: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩: জমি দখল হলে তাৎক্ষণিক করণীয়',
      category: 'Land & Property',
      readTime: '6 min read',
      date: 'Nov 2026',
      author: 'Law_BD Editorial Board',
      excerpt: 'Under the landmark 2023 statute, violent land grabbing and forged deed creation are now non-bailable criminal offences. Learn the step-by-step procedure to petition the Executive Magistrate.',
      fullText: 'The Land Crime Prevention and Redress Act 2023 represents the most comprehensive reform in Bangladesh property jurisprudence. Previously, victims of land disputes had to endure decades of civil litigation. Under Section 7 of the 2023 Act, unauthorized entry and forceful occupation is recognized as a cognizable criminal offense punishable with up to 7 years imprisonment. Executive Magistrates are empowered to conduct summary proceedings and restore possession directly.'
    },
    {
      id: 2,
      title: 'Cheque Bounce under Section 138 NI Act: The critical 30-day notice rule',
      bangla_title: 'চেক ডিজঅনার মামলা: ৩০ দিনের নোটিশের বিধান কেন এত গুরুত্বপূর্ণ?',
      category: 'Cheque Dishonour',
      readTime: '5 min read',
      date: 'Oct 2026',
      author: 'Commercial Law Review',
      excerpt: 'Missing the 30-day statutory notice period completely bars you from filing a criminal complaint. Here is how to calculate deadlines accurately.',
      fullText: 'Section 138 of the Negotiable Instruments Act 1881 is an unforgiving law with non-extendable statutory limitation periods. You have exactly 30 days from receiving the bank dishonour return memo to serve the registered legal notice. Once received by the drawer, you must wait 30 clear days for payment. If unpaid, you have another strict 30 days to file the formal complaint (CR Case) before the Magistrate.'
    },
    {
      id: 3,
      title: 'Rights of Women regarding Denmohur and Talaq under Muslim Family Law',
      bangla_title: 'মুসলিম পারিবারিক আইনে দেনমোহর ও তালাক সংক্রান্ত নারীর অধিকার',
      category: 'Family Law',
      readTime: '7 min read',
      date: 'Oct 2026',
      author: 'Family Rights Advocacy',
      excerpt: 'Can a husband refuse Denmohur? Does Section 7 notice apply to both parties? Learn your statutory rights and how to recover dues through Family Court.',
      fullText: 'Denmohur is an unconditional debt owed by the husband to the wife under Islamic law and Bangladeshi statutes. Under the Muslim Family Laws Ordinance 1961, Denmohur cannot be waived forcibly. The wife has an absolute legal claim to prompt dower upon demand, and deferred dower upon dissolution of marriage. Family Court court fees for dower suits are minimal (৳25-50), and willful default leads to civil imprisonment.'
    },
    {
      id: 4,
      title: 'Digital Harassment and Intimate Photo Blackmail: How CID Cyber Centre protects victims',
      bangla_title: 'সাইবার হেনস্তা ও গোপন ছবি দিয়ে ব্ল্যাকমেইল: ভুক্তভোগীদের সুরক্ষায় সিআইডি ও আইনি সহায়তা',
      category: 'Cybercrime',
      readTime: '4 min read',
      date: 'Sept 2026',
      author: 'Cyber Safety Cell',
      excerpt: 'Immediate evidence preservation techniques and official hotlines for women and students facing online threats.',
      fullText: 'Cyber extortion and blackmail with personal photographs are prosecuted under both the Cyber Security Act 2023 and Section 8 of the Pornography Control Act 2012. Victims should never delete the chat thread or send extortion money. Take unedited full-screen screenshots showing user URLs and timestamps, and contact Police Cyber Support for Women (PCSW) hotline 01320-000888 or CID Cyber Centre 01320-010148.'
    }
  ];

  res.json({
    success: true,
    count: articles.length,
    articles
  });
});

export default router;
