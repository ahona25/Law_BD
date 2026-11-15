export const ALL_30_LEGAL_CATEGORIES = [
  {
    id: 'constitutional',
    seq: 1,
    name: 'Constitutional',
    bangla: 'সাংবিধানিক আইন',
    subcategories: [
      'Fundamental rights',
      'Freedom of speech',
      'Equality',
      'Citizenship',
      'Constitutional remedies'
    ],
    banglaSubcategories: [
      'মৌলিক অধিকার',
      'বাকস্বাধীনতা',
      'আইনের দৃষ্টিতে সমতা',
      'নাগরিকত্ব',
      'সাংবিধানিক প্রতিকার (রিট)'
    ],
    icon: 'Scroll',
    primaryAct: 'Constitution of Bangladesh (Articles 26-47A, 102)'
  },
  {
    id: 'criminal',
    seq: 2,
    name: 'Criminal',
    bangla: 'ফৌজদারি আইন',
    subcategories: [
      'Murder',
      'Theft',
      'Robbery',
      'Assault',
      'Kidnapping',
      'Fraud',
      'Forgery',
      'Extortion',
      'Threats'
    ],
    banglaSubcategories: [
      'হত্যা / খুন',
      'চুরি',
      'ছিনতাই ও ডাকাতি',
      'শারীরিক আক্রমণ',
      'অপহরণ',
      'প্রতারণা',
      'জালিয়াতি',
      'চাঁদাবাজি',
      'হুমকি প্রদান'
    ],
    icon: 'ShieldAlert',
    primaryAct: 'The Penal Code, 1860'
  },
  {
    id: 'civil',
    seq: 3,
    name: 'Civil',
    bangla: 'দেওয়ানি আইন',
    subcategories: [
      'Compensation',
      'Disputes',
      'Injunctions',
      'Civil claims',
      'Recovery of money'
    ],
    banglaSubcategories: [
      'ক্ষতিপূরণ দাবি',
      'দেওয়ানি বিরোধ',
      'অস্থায়ী ও চিরস্থায়ী নিষেধাজ্ঞা',
      'স্বার্থ ঘোষণা ও দাবি',
      'অর্থ ও পাওনা আদায়'
    ],
    icon: 'Scale',
    primaryAct: 'Code of Civil Procedure, 1908 & Specific Relief Act, 1877'
  },
  {
    id: 'family',
    seq: 4,
    name: 'Family',
    bangla: 'পারিবারিক আইন',
    subcategories: [
      'Domestic violence',
      'Maintenance',
      'Guardianship',
      'Family disputes'
    ],
    banglaSubcategories: [
      'পারিবারিক সহিংসতা',
      'ভরণপোষণ (খোরপোষ)',
      'অভিভাবকত্ব',
      'পারিবারিক বিরোধ নিষ্পত্তি'
    ],
    icon: 'Heart',
    primaryAct: 'Family Courts Act, 2023 & Domestic Violence Act, 2010'
  },
  {
    id: 'marriage-divorce',
    seq: 5,
    name: 'Marriage & Divorce',
    bangla: 'বিবাহ ও বিবাহ বিচ্ছেদ',
    subcategories: [
      'Marriage registration',
      'Divorce',
      'Dower',
      'Child custody',
      'Marital rights'
    ],
    banglaSubcategories: [
      'বিবাহ নিবন্ধন (নিকাহনামা)',
      'তালাক ও নোটিশ',
      'দেনমোহর আদায়',
      'সন্তানের হেফাজত (হিযানত)',
      'দাম্পত্য অধিকার পুনরুদ্ধার'
    ],
    icon: 'Users',
    primaryAct: 'Muslim Family Laws Ordinance, 1961'
  },
  {
    id: 'inheritance',
    seq: 6,
    name: 'Inheritance',
    bangla: 'উত্তরাধিকার ও বণ্টন',
    subcategories: [
      'Property distribution',
      'Wills',
      'Succession',
      'Gifts',
      'Probate'
    ],
    banglaSubcategories: [
      'পৈত্রিক সম্পত্তি বণ্টন',
      'অসিয়ত / উইল',
      'ওয়ারিশান সনদ ও উত্তরাধিকার',
      'হেবা / দানপত্র দলিল',
      'প্রোবেট ও লেটার অফ অ্যাডমিনিস্ট্রেশন'
    ],
    icon: 'Gift',
    primaryAct: 'The Succession Act, 1925'
  },
  {
    id: 'property-land',
    seq: 7,
    name: 'Property & Land',
    bangla: 'ভূমি ও স্থাবর সম্পত্তি',
    subcategories: [
      'Land grabbing',
      'Illegal possession',
      'Land fraud',
      'Boundary disputes',
      'Registration',
      'Mutation'
    ],
    banglaSubcategories: [
      'জমি দখল ও জবরদখল',
      'অবৈধ দখল উচ্ছেদ',
      'জাল দলিল ও প্রতারণা',
      'সীমানা বিরোধ',
      'দলিল রেজিস্ট্রেশন',
      'নামজারি ও জমাভাগ (খারিজ)'
    ],
    icon: 'Home',
    primaryAct: 'Land Crime Prevention and Redress Act, 2023'
  },
  {
    id: 'human-rights',
    seq: 8,
    name: 'Human Rights',
    bangla: 'মানবাধিকার সুরক্ষা',
    subcategories: [
      'Discrimination',
      'Torture',
      'Unlawful detention',
      'Trafficking',
      'Forced labour'
    ],
    banglaSubcategories: [
      'বৈষম্যমূলক আচরণ',
      'নির্যাতন ও নিপীড়ন',
      'বেআইনি আটক ও গুম',
      'মানবপাচার প্রতিরোধ',
      'জোরপূর্বক শ্রম আদায়'
    ],
    icon: 'UserCheck',
    primaryAct: 'Torture and Custodial Death (Prevention) Act, 2013'
  },
  {
    id: 'women-child',
    seq: 9,
    name: 'Women & Child',
    bangla: 'নারী ও শিশু সুরক্ষা',
    subcategories: [
      'Dowry',
      'Child marriage',
      'Child abuse',
      'Sexual violence',
      'Harassment',
      'Protection'
    ],
    banglaSubcategories: [
      'যৌতুক দাবি ও নির্যাতন',
      'বাল্যবিবাহ প্রতিরোধ',
      'শিশু নির্যাতন ও শোষণ',
      'যৌন নিপীড়ন ও ধর্ষণ প্রতিরোধ',
      'ইভটিজিং ও হয়রানি',
      'জরুরি ভিকটিম সুরক্ষা'
    ],
    icon: 'ShieldCheck',
    primaryAct: 'Nari O Shishu Nirjatan Daman Ain, 2000'
  },
  {
    id: 'cybercrime-it',
    seq: 10,
    name: 'Cybercrime & IT',
    bangla: 'সাইবার অপরাধ ও তথ্যপ্রযুক্তি',
    subcategories: [
      'Online fraud',
      'Hacking',
      'Identity theft',
      'Cyberbullying',
      'Blackmail',
      'Digital evidence'
    ],
    banglaSubcategories: [
      'অনলাইন ও মোবাইল ব্যাংকিং প্রতারণা',
      'একাউন্ট হ্যাকিং',
      'পরিচয় চুরি ও ভুয়া প্রোফাইল',
      'সাইবার বুলিং ও কটূক্তি',
      'ছবি বা ভিডিও দিয়ে ব্ল্যাকমেইল',
      'ডিজিটাল ফরেনসিক ও প্রমাণ সংরক্ষণ'
    ],
    icon: 'Laptop',
    primaryAct: 'Cyber Security Act, 2023'
  },
  {
    id: 'labour',
    seq: 11,
    name: 'Labour',
    bangla: 'শ্রম ও কর্মক্ষেত্র আইন',
    subcategories: [
      'Unpaid salary',
      'Wrongful termination',
      'Workplace harassment',
      'Compensation',
      'Workplace safety'
    ],
    banglaSubcategories: [
      'বকেয়া বেতন ও ভাতা',
      'বেআইনি বরখাস্ত ও ছাঁটাই',
      'কর্মক্ষেত্রে হয়রানি',
      'দুর্ঘটনাজনিত ক্ষতিপূরণ',
      'কর্মপরিবেশের নিরাপত্তা'
    ],
    icon: 'Briefcase',
    primaryAct: 'The Bangladesh Labour Act, 2006'
  },
  {
    id: 'business-corporate',
    seq: 12,
    name: 'Business & Corporate',
    bangla: 'ব্যবসা ও কর্পোরেট আইন',
    subcategories: [
      'Company registration',
      'Partnership disputes',
      'Corporate fraud',
      'Insolvency'
    ],
    banglaSubcategories: [
      'কোম্পানি নিবন্ধন (RJSC)',
      'অংশীদারি কারবারের বিরোধ',
      'কর্পোরেট জালিয়াতি ও অর্থ আত্মসাৎ',
      'দেউলিয়া ও কোম্পানি অবসায়ন'
    ],
    icon: 'Building2',
    primaryAct: 'The Companies Act, 1994'
  },
  {
    id: 'contract',
    seq: 13,
    name: 'Contract',
    bangla: 'চুক্তি ও দ্বিপাক্ষিক দলিল',
    subcategories: [
      'Breach of contract',
      'Agreement disputes',
      'Service agreements',
      'Recovery'
    ],
    banglaSubcategories: [
      'চুক্তিভঙ্গ ও ক্ষতিপূরণ',
      'চুক্তিনামা সংক্রান্ত বিরোধ',
      'সার্ভিস ও কর্মচুক্তি',
      'চুক্তির অর্থ আদায়'
    ],
    icon: 'FileText',
    primaryAct: 'The Contract Act, 1872'
  },
  {
    id: 'banking-finance',
    seq: 14,
    name: 'Banking & Finance',
    bangla: 'ব্যাংকিং ও আর্থিক আইন',
    subcategories: [
      'Loan disputes',
      'Cheque dishonour',
      'Financial fraud',
      'Mortgage disputes'
    ],
    banglaSubcategories: [
      'ব্যাংক ঋণ সংক্রান্ত বিরোধ',
      'চেক বাউন্স (ধারা ১৩৮)',
      'আর্থিক জালিয়াতি ও আত্মসাৎ',
      'বন্ধকী সম্পত্তি ও নিলাম বিরোধ'
    ],
    icon: 'Landmark',
    primaryAct: 'Negotiable Instruments Act, 1881 (Section 138)'
  },
  {
    id: 'tax-vat',
    seq: 15,
    name: 'Tax & VAT',
    bangla: 'আয়কর, ভ্যাট ও শুল্ক',
    subcategories: [
      'Income tax',
      'VAT',
      'Tax evasion',
      'Tax disputes',
      'Customs'
    ],
    banglaSubcategories: [
      'আয়কর রিটার্ন ও অ্যাসেসমেন্ট',
      'মূল্য সংযোজন কর (ভ্যাট)',
      'কর ফাঁকির অভিযোগ',
      'ট্যাক্স আপিল ও ট্রাইব্যুনাল',
      'শুল্ক ও কাস্টমস বিরোধ'
    ],
    icon: 'Coins',
    primaryAct: 'Income Tax Act, 2023 & VAT Act, 2012'
  },
  {
    id: 'consumer',
    seq: 16,
    name: 'Consumer',
    bangla: 'ভোক্তা অধিকার সংরক্ষণ',
    subcategories: [
      'Fake products',
      'Defective products',
      'Overcharging',
      'Misleading advertisements'
    ],
    banglaSubcategories: [
      'ভেজাল ও নকল পণ্য',
      'ত্রুটিযুক্ত পণ্য ও সেবা',
      'নির্ধারিত মূল্যের বেশি রাখা',
      'মিথ্যা ও প্রতারণামূলক বিজ্ঞাপন'
    ],
    icon: 'ShoppingBag',
    primaryAct: 'Consumer Rights Protection Act, 2009'
  },
  {
    id: 'education',
    seq: 17,
    name: 'Education',
    bangla: 'শিক্ষা সংক্রান্ত আইন',
    subcategories: [
      'Admission disputes',
      'Certificates',
      'Discrimination',
      'Institutional misconduct'
    ],
    banglaSubcategories: [
      'ভর্তি সংক্রান্ত জটিলতা',
      'সনদপত্র ও নম্বরপত্র সংশোধন',
      'শিক্ষা প্রতিষ্ঠানে বৈষম্য',
      'কর্তৃপক্ষের অনিয়ম ও শাস্তিমূলক ব্যবস্থা'
    ],
    icon: 'GraduationCap',
    primaryAct: 'Intermediate and Secondary Education Acts'
  },
  {
    id: 'medical-healthcare',
    seq: 18,
    name: 'Medical & Healthcare',
    bangla: 'চিকিৎসা ও স্বাস্থ্য অধিকার',
    subcategories: [
      'Medical negligence',
      'Malpractice',
      'Patient rights',
      'Medical compensation'
    ],
    banglaSubcategories: [
      'চিকিৎসায় চরম অবহেলা',
      'ভুল চিকিৎসা ও অপচিকিৎসা',
      'রোগীর অধিকার ও গোপনীয়তা',
      'চিকিৎসা ক্ষতিপূরণ দাবি'
    ],
    icon: 'Stethoscope',
    primaryAct: 'Bangladesh Medical and Dental Council Act, 2010'
  },
  {
    id: 'environmental',
    seq: 19,
    name: 'Environmental',
    bangla: 'পরিবেশ ও বন সংরক্ষণ',
    subcategories: [
      'Pollution',
      'Illegal land filling',
      'Deforestation',
      'Environmental damage'
    ],
    banglaSubcategories: [
      'বায়ু ও নদী দূষণ',
      'অবৈধ জলাশয় ভরাট',
      'অনুমোদনহীন গাছ কাটা ও পাহাড় কাটা',
      'পরিবেশগত বিপর্যয় ও ক্ষয়ক্ষতি'
    ],
    icon: 'Trees',
    primaryAct: 'Bangladesh Environment Conservation Act, 1995'
  },
  {
    id: 'intellectual-property',
    seq: 20,
    name: 'Intellectual Property',
    bangla: 'মেধাসম্পদ ও কপিরাইট',
    subcategories: [
      'Copyright',
      'Trademarks',
      'Patents',
      'Piracy',
      'Plagiarism'
    ],
    banglaSubcategories: [
      'কপিরাইট সুরক্ষা',
      'ট্রেডমার্ক ও ব্র্যান্ড নাম নিবন্ধন',
      'পেটেন্ট ও ডিজাইন স্বত্ব',
      'পাইরেসি ও নকল পণ্য তৈরি',
      'বৌদ্ধিক রচনা চুরি (প্লেজিয়ারিজম)'
    ],
    icon: 'Award',
    primaryAct: 'The Copyright Act, 2023 & Trade Marks Act, 2009'
  },
  {
    id: 'immigration',
    seq: 21,
    name: 'Immigration',
    bangla: 'অভিবাসন ও পাসপোর্ট',
    subcategories: [
      'Visa disputes',
      'Passport',
      'Citizenship',
      'Migration',
      'Deportation'
    ],
    banglaSubcategories: [
      'ভিসা জটিলতা ও প্রতারণা',
      'পাসপোর্ট সংক্রান্ত সমস্যা',
      'দ্বৈত নাগরিকত্ব ও সনদ',
      'বৈদেশিক কর্মসংস্থান ও অভিবাসন',
      'পুশব্যাক ও নির্বাসন প্রতিরোধ'
    ],
    icon: 'Plane',
    primaryAct: 'Overseas Employment and Migrants Act, 2013'
  },
  {
    id: 'administrative',
    seq: 22,
    name: 'Administrative',
    bangla: 'প্রশাসনিক ও সরকারি চাকরি',
    subcategories: [
      'Government service disputes',
      'Public authority decisions',
      'Administrative appeals'
    ],
    banglaSubcategories: [
      'সরকারি চাকরি ও পদোন্নতি বিরোধ',
      'কর্তৃপক্ষের অবৈধ সিদ্ধান্ত চ্যালেঞ্জ',
      'প্রশাসনিক আপিল ও ট্রাইব্যুনাল'
    ],
    icon: 'Building',
    primaryAct: 'Administrative Tribunals Act, 1980'
  },
  {
    id: 'election-political',
    seq: 23,
    name: 'Election & Political',
    bangla: 'নির্বাচনী ও রাজনৈতিক অধিকার',
    subcategories: [
      'Election disputes',
      'Electoral rights',
      'Campaign-related offences'
    ],
    banglaSubcategories: [
      'নির্বাচনী ট্রাইব্যুনালে মামলা',
      'ভোটাধিকার ও প্রার্থিতা চ্যালেঞ্জ',
      'নির্বাচনী আচরণবিধি লঙ্ঘন'
    ],
    icon: 'Vote',
    primaryAct: 'Representation of the People Order (RPO), 1972'
  },
  {
    id: 'traffic-transport',
    seq: 24,
    name: 'Traffic & Transport',
    bangla: 'সড়ক পরিবহন ও দুর্ঘটনা',
    subcategories: [
      'Road accidents',
      'Driving offences',
      'Transport negligence',
      'Vehicle registration'
    ],
    banglaSubcategories: [
      'সড়ক দুর্ঘটনা ও মৃত্যুজনিত ক্ষতিপূরণ',
      'ট্রাফিক আইন লঙ্ঘন ও জরিমানা',
      'পরিবহন চালকের চরম অবহেলা',
      'বিআরটিএ রেজিস্ট্রেশন ও ফিটনেস বিরোধ'
    ],
    icon: 'Car',
    primaryAct: 'Road Transport Act, 2018'
  },
  {
    id: 'agriculture',
    seq: 25,
    name: 'Agriculture',
    bangla: 'কৃষি জমি ও কৃষকের অধিকার',
    subcategories: [
      'Agricultural land',
      'Farmers\' rights',
      'Crop disputes',
      'Agricultural tenancy'
    ],
    banglaSubcategories: [
      'কৃষি জমি সুরক্ষা ও হস্তান্তর',
      'কৃষকের ন্যায্য মূল্য ও অধিকার',
      'ফসল বিনষ্ট ও ক্ষতিপূরণ বিরোধ',
      'বর্গাচাষ ও কৃষি ইজারা চুক্তি'
    ],
    icon: 'Wheat',
    primaryAct: 'Land Reforms Act, 2023'
  },
  {
    id: 'international',
    seq: 26,
    name: 'International',
    bangla: 'আন্তর্জাতিক আইন ও চুক্তি',
    subcategories: [
      'International agreements',
      'Extradition',
      'Cross-border disputes',
      'International human rights'
    ],
    banglaSubcategories: [
      'আন্তর্জাতিক দ্বিপাক্ষিক চুক্তি',
      'প্রত্যর্পণ (এক্সট্রাডিশন)',
      'সীমান্ত বাণিজ্য ও বিরোধ',
      'আন্তর্জাতিক মানবাধিকার কনভেনশন'
    ],
    icon: 'Globe',
    primaryAct: 'Extradition Act, 1974'
  },
  {
    id: 'anti-corruption',
    seq: 27,
    name: 'Anti-Corruption',
    bangla: 'দুর্নীতি দমন ও অর্থপাচার',
    subcategories: [
      'Bribery',
      'Corruption',
      'Money laundering',
      'Illegal wealth',
      'Financial misconduct'
    ],
    banglaSubcategories: [
      'ঘুষ গ্রহণ ও লেনদেন',
      'দুর্নীতি ও ক্ষমতার অপব্যবহার',
      'মানিলন্ডারিং (অর্থ পাচার)',
      'জ্ঞাত আয়বহির্ভূত সম্পদ অর্জন',
      'আর্থিক কেলেঙ্কারি ও দুর্নীতি'
    ],
    icon: 'Siren',
    primaryAct: 'Anti-Corruption Commission Act, 2004'
  },
  {
    id: 'drug-narcotics',
    seq: 28,
    name: 'Drug & Narcotics',
    bangla: 'মাদকদ্রব্য নিয়ন্ত্রণ আইন',
    subcategories: [
      'Drug possession',
      'Trafficking',
      'Illegal distribution',
      'Controlled substances'
    ],
    banglaSubcategories: [
      'মাদক সংরক্ষণ ও বহন',
      'মাদক চোরাচালান ও পাচার',
      'অবৈধ সরবরাহ ও বাণিজ্য',
      'নিষিদ্ধ রাসায়নিক দ্রব্য'
    ],
    icon: 'Pill',
    primaryAct: 'Narcotics Control Act, 2018'
  },
  {
    id: 'public-safety',
    seq: 29,
    name: 'Public Safety',
    bangla: 'জননিরাপত্তা ও সন্ত্রাস দমন',
    subcategories: [
      'Terrorism',
      'Public disorder',
      'Public safety offences',
      'Explosives'
    ],
    banglaSubcategories: [
      'সন্ত্রাসী কর্মকাণ্ড ও নাশকতা',
      'জনশৃঙ্খলা ভঙ্গ ও দাঙ্গা',
      'আইনশৃঙ্খলা বিঘ্নকারী অপরাধ',
      'বিস্ফোরক দ্রব্য ও আগ্নেয়াস্ত্র'
    ],
    icon: 'Flame',
    primaryAct: 'Anti-Terrorism Act, 2009'
  },
  {
    id: 'court-procedure',
    seq: 30,
    name: 'Court & Procedure',
    bangla: 'আদালত, তদন্ত ও বিচার প্রক্রিয়া',
    subcategories: [
      'Arrest',
      'Bail',
      'FIR',
      'Investigation',
      'Evidence',
      'Trial',
      'Appeal',
      'Execution'
    ],
    banglaSubcategories: [
      'গ্রেপ্তার ও আইনি অধিকার',
      'নিয়মিত ও আগাম জামিন',
      'এজাহার ও অভিযোগপত্র',
      'পুলিশ ও সিআইডি তদন্ত',
      'সাক্ষ্য ও জবানবন্দি (ধারা ১৬৪)',
      'বিচার প্রক্রিয়া ও চার্জ গঠন',
      'আপিল ও রিভিশন',
      'রায় ও ডিক্রি জারি'
    ],
    icon: 'Gavel',
    primaryAct: 'Code of Criminal Procedure, 1898 & Evidence Act, 1872'
  }
];
