import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    navHome: 'Home',
    navLaws: 'Law Library',
    navVictim: 'Victim Support',
    navAi: 'AI Assistant',
    navLawyers: 'Find a Lawyer',
    navAwareness: 'Legal Awareness',
    navTemplates: 'Templates',
    navEmergency: 'Emergency Help',
    navLogin: 'Sign In',
    navRegister: 'Register',
    navDashboard: 'Dashboard',
    navLogout: 'Logout',
    demoClient: 'Demo Client',
    demoLawyer: 'Demo Lawyer',
    demoAdmin: 'Demo Admin',
    
    // Hero
    heroTitle: 'Know Your Rights. Understand the Law. Find Justice.',
    heroSubtitle: 'Bangladesh’s premier digital legal assistance platform. Explore all official statutes, receive instant victim guidance, consult verified Bar Council advocates, and manage legal cases.',
    heroSearchPlaceholder: 'Describe an incident, law name, or section (e.g. "জমি দখল করেছে" or "Section 138 NI Act")...',
    searchButton: 'Search Platform',
    quickSearchTitle: 'Common Incident Searches:',
    
    // Categories
    categoriesTitle: 'Browse by Legal Domain',
    categoriesSubtitle: 'Official Bangladesh statutes, procedures, and maximum statutory penalties across 10 specialized legal jurisdictions.',
    
    // Triage / Victim Support
    triageTitle: 'Smart Victim Incident Triage',
    triageSubtitle: 'Do not know the law? Simply describe what happened in everyday language. We will identify the applicable statutes, emergency hotlines, and verified advocates.',
    triageIncidentLabel: 'Describe your incident or problem in detail:',
    triagePlaceholder: 'E.g., "Someone forged my land deed and is threatening to forcefully occupy my plot in Mirpur..."',
    triageAnalyzeBtn: 'Analyze Legal Rights & Statutes',
    
    // AI Assistant
    aiTitle: 'AI Legal Assistant (Statute Grounded)',
    aiSubtitle: 'Get immediate legal answers grounded strictly in the official laws of Bangladesh with statutory citations and procedural timelines.',
    
    // Lawyer directory
    lawyersTitle: 'Verified Advocates Directory',
    lawyersSubtitle: 'Connect with verified Bangladesh Bar Council enrolled advocates across District Courts, High Court Division, and Special Tribunals.',
    compareLawyers: 'Compare Selected',
    bookConsultation: 'Book Consultation',
    viewProfile: 'View Profile',
    
    // Emergency
    emergencyBanner: '24/7 National Legal Helplines: Legal Aid 16430 · Emergency 999 · Women & Child 109 · Cyber Police 01320-010148',
    callNow: 'Call Now',
    
    // Footer
    footerDesc: 'Law_BD is an all-in-one digital legal information, victim assistance, and lawyer management ecosystem designed for the citizens of Bangladesh.',
    disclaimer: 'Disclaimer: Law_BD provides legal educational information and assistance grounded in official Bangladesh statutes. It does not replace professional legal representation by an enrolled advocate.',
    rightsReserved: 'All Rights Reserved. Republic of Bangladesh Digital Legal Initiative.'
  },
  bn: {
    // Navigation
    navHome: 'হোম',
    navLaws: 'আইন লাইব্রেরি',
    navVictim: 'ভুক্তভোগী সহায়তা',
    navAi: 'এআই লিগ্যাল অ্যাসিস্ট্যান্ট',
    navLawyers: 'আইনজীবী খুঁজুন',
    navAwareness: 'আইনি সচেতনতা',
    navTemplates: 'আইনি ফরম ও ড্রাফট',
    navEmergency: 'জরুরি হেল্পলাইন',
    navLogin: 'লগইন',
    navRegister: 'রেজিস্ট্রেশন',
    navDashboard: 'ড্যাশবোর্ড',
    navLogout: 'লগআউট',
    demoClient: 'ডেমো নাগরিক',
    demoLawyer: 'ডেমো আইনজীবী',
    demoAdmin: 'ডেমো অ্যাডমিন',
    
    // Hero
    heroTitle: 'আপনার অধিকার জানুন। আইন বুঝুন। ন্যায়বিচার পান।',
    heroSubtitle: 'বাংলাদেশের সমন্বিত ডিজিটাল লিগ্যাল প্ল্যাটফর্ম। দেশের সকল আইন সহজে খুঁজুন, সাধারণ ভাষায় ঘটনার বিবরণ দিয়ে প্রতিকার জানুন এবং যাচাইকৃত আইনজীবীদের সহায়তা গ্রহণ করুন।',
    heroSearchPlaceholder: 'ঘটনার বিবরণ, আইনের নাম বা ধারা লিখুন (যেমন: "জমি দখল করেছে" বা "১৩৮ ধারা")...',
    searchButton: 'অনুসন্ধান করুন',
    quickSearchTitle: 'জনপ্রিয় আইনি অনুসন্ধান:',
    
    // Categories
    categoriesTitle: 'আইনি ক্ষেত্রসমূহ অনুসন্ধান করুন',
    categoriesSubtitle: '১০টি বিশেষায়িত অধিক্ষেত্রে বাংলাদেশের সরকারি আইন, দণ্ডবিধির ধারা, বিচার প্রক্রিয়া ও সর্বোচ্চ শাস্তির বিধান।',
    
    // Triage / Victim Support
    triageTitle: 'স্মার্ট ভুক্তভোগী সহায়তা ও প্রতিকার',
    triageSubtitle: 'আইনের নাম জানেন না? সাধারণ ভাষায় ঘটনাটি খুলে বলুন। আমাদের সিস্টেম সংশ্লিষ্ট আইন, করণীয় পদক্ষেপ ও উপযুক্ত আইনজীবী প্রদর্শন করবে।',
    triageIncidentLabel: 'আপনার ঘটনা বা সমস্যার বিস্তারিত বিবরণ লিখুন:',
    triagePlaceholder: 'যেমন: "একজন জাল দলিল তৈরি করে আমার মিরপুরের জমি দখল করার হুমকি দিচ্ছে..."',
    triageAnalyzeBtn: 'আইন ও অধিকার বিশ্লেষণ করুন',
    
    // AI Assistant
    aiTitle: 'এআই লিগ্যাল অ্যাসিস্ট্যান্ট',
    aiSubtitle: 'বাংলাদেশের সরকারি আইনের ভিত্তিতে তাৎক্ষণিক আইনি সমাধান, প্রযোজ্য ধারা ও করণীয় দিকনির্দেশনা জানুন।',
    
    // Lawyer directory
    lawyersTitle: 'যাচাইকৃত আইনজীবী ডিরেক্টরি',
    lawyersSubtitle: 'বাংলাদেশ বার কাউন্সিলের সনদপ্রাপ্ত এবং সুপ্রিম কোর্ট ও জেলা জজ আদালতের অভিজ্ঞ আইনজীবীদের সাথে যোগাযোগ ও চেম্বার বুকিং করুন।',
    compareLawyers: 'আইনজীবী তুলনা করুন',
    bookConsultation: 'পরামর্শ বুক করুন',
    viewProfile: 'প্রোফাইল দেখুন',
    
    // Emergency
    emergencyBanner: 'জরুরি আইনি হেল্পলাইন: সরকারি লিগ্যাল এইড ১৬৪৩০ · জরুরি পুলিশ ৯৯৯ · নারী ও শিশু ১০৯ · সাইবার পুলিশ ০১৩২০-০১MDE৪৮',
    callNow: 'কল করুন',
    
    // Footer
    footerDesc: 'ল_বিডি (Law_BD) বাংলাদেশের সাধারণ নাগরিক ও ভুক্তভোগীদের জন্য একটি পূর্ণাঙ্গ ডিজিটাল আইনি তথ্য ও আইনজীবী সংযোগ প্ল্যাটফর্ম।',
    disclaimer: 'সতর্কবার্তা: ল_বিডিতে প্রকাশিত সকল তথ্য সাধারণ আইনি সচেতনতার উদ্দেশ্যে প্রণীত। এটি কোনো সনদপ্রাপ্ত বিজ্ঞ আইনজীবীর বিকল্প আনুষ্ঠানিক পরামর্শ নয়।',
    rightsReserved: 'সর্বস্বত্ব সংরক্ষিত। গণপ্রজাতন্ত্রী বাংলাদেশ ডিজিটাল লিগ্যাল ইনিশিয়েটিভ।'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lawbd_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lawbd_lang', lang);
    if (lang === 'bn') {
      document.documentElement.classList.add('font-bangla');
    } else {
      document.documentElement.classList.remove('font-bangla');
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
