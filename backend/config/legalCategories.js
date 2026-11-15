export const ALL_30_LEGAL_CATEGORIES = [
  {
    id: 'constitutional',
    seq: 1,
    name: 'Constitutional',
    bangla: 'সাংবিধানিক আইন ও মৌলিক অধিকার',
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
    primaryAct: 'Constitution of the People’s Republic of Bangladesh (Articles 26-47A, 102)',
    description: 'Supreme constitutional safeguards, enforcement of fundamental rights via High Court writ jurisdiction, freedom of thought and expression.'
  },
  {
    id: 'criminal',
    seq: 2,
    name: 'Criminal',
    bangla: 'ফৌজদারি আইন ও অপরাধ দমন',
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
    primaryAct: 'The Penal Code, 1860 & Code of Criminal Procedure, 1898',
    description: 'Offences against human body, property crimes, extortion, forgery, cheating, and criminal proceedings under the Penal Code.'
  },
  {
    id: 'civil',
    seq: 3,
    name: 'Civil',
    bangla: 'দেওয়ানি মামলা ও ক্ষতিপূরণ',
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
    primaryAct: 'The Code of Civil Procedure, 1908 & The Specific Relief Act, 1877',
    description: 'Civil remedies, declaration of title, temporary and perpetual injunctions, damages, and civil suits for money recovery.'
  },
  {
    id: 'family',
    seq: 4,
    name: 'Family',
    bangla: 'পারিবারিক বিরোধ ও সুরক্ষা',
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
    primaryAct: 'Family Courts Act, 2023 & Domestic Violence Act, 2010',
    description: 'Resolution of family discord, protection orders against domestic abuse, monthly maintenance, and legal guardianship.'
  },
  {
    id: 'marriage-divorce',
    seq: 5,
    name: 'Marriage & Divorce',
    bangla: 'বিবাহ, তালাক ও দেনমোহর',
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
    primaryAct: 'Muslim Family Laws Ordinance, 1961 & Guardian and Wards Act, 1890',
    description: 'Mandatory Section 7 Talaq notice, recovery of prompt and deferred dower, marriage registration verification, and child custody.'
  },
  {
    id: 'inheritance',
    seq: 6,
    name: 'Inheritance',
    bangla: 'উত্তরাধিকার, উইল ও সম্পত্তি বণ্টন',
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
    primaryAct: 'The Succession Act, 1925 & Muslim Personal Law (Shariat)',
    description: 'Statutory division of ancestral estates, succession certificates, validation of wills/wasiyat, probate, and registered Hiba gifts.'
  },
  {
    id: 'property-land',
    seq: 7,
    name: 'Property & Land',
    bangla: 'ভূমি ও স্থাবর সম্পত্তি আইন',
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
    primaryAct: 'Land Crime Prevention and Redress Act, 2023 & State Acquisition Act, 1950',
    description: 'Strict non-bailable prosecution for land grabbing, fake deeds, summary eviction by Executive Magistrate, mutation, and Khatian verification.'
  },
  {
    id: 'human-rights',
    seq: 8,
    name: 'Human Rights',
    bangla: 'মানবাধিকার সুরক্ষা ও আইন',
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
    primaryAct: 'Torture and Custodial Death (Prevention) Act, 2013 & Human Rights Commission Act',
    description: 'Protection against custodial torture, unlawful detention, enforcement of human dignity, and anti-trafficking remedies.'
  },
  {
    id: 'women-child',
    seq: 9,
    name: 'Women & Child',
    bangla: 'নারী ও শিশু সুরক্ষা আইন',
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
    primaryAct: 'Nari O Shishu Nirjatan Daman Ain, 2000 & Dowry Prohibition Act, 2018',
    description: 'Special Tribunal trials for dowry harassment, sexual violence, child marriage prevention, and emergency One-Stop Crisis Centre (OCC) interventions.'
  },
  {
    id: 'cybercrime-it',
    seq: 10,
    name: 'Cybercrime & IT',
    bangla: 'সাইবার অপরাধ ও ডিজিটাল নিরাপত্তা',
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
    primaryAct: 'Cyber Security Act, 2023 & Pornography Control Act, 2012',
    description: 'Investigation of account hacking, mobile financial extortion, digital blackmail, identity spoofing, and Cyber Tribunal litigation.'
  },
  {
    id: 'labour',
    seq: 11,
    name: 'Labour',
    bangla: 'শ্রম আইন ও কর্মক্ষেত্র অধিকার',
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
    primaryAct: 'The Bangladesh Labour Act, 2006 (Amended 2018)',
    description: 'Section 33 grievance procedure, unpaid gratuity/provident fund recovery, maternity leave benefits, and Labour Court complaints.'
  },
  {
    id: 'business-corporate',
    seq: 12,
    name: 'Business & Corporate',
    bangla: 'কোম্পানি ও কর্পোরেট আইন',
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
    primaryAct: 'The Companies Act, 1994 & Partnership Act, 1932',
    description: 'RJSC incorporation, director disputes, corporate governance compliance, mergers, shareholder agreements, and winding-up.'
  },
  {
    id: 'contract',
    seq: 13,
    name: 'Contract',
    bangla: 'চুক্তি আইন ও চুক্তিভঙ্গ প্রতিকার',
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
    primaryAct: 'The Contract Act, 1872 & Specific Relief Act, 1877',
    description: 'Specific performance of agreements, damages for breach of contract, commercial MOUs, non-disclosure agreements, and contract enforcement.'
  },
  {
    id: 'banking-finance',
    seq: 14,
    name: 'Banking & Finance',
    bangla: 'ব্যাংক, অর্থ ঋণ ও চেক ডিজঅনার',
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
    primaryAct: 'Negotiable Instruments Act, 1881 & Artha Rin Adalat Ain, 2003',
    description: 'Section 138 NI Act bounced cheque prosecution, Artha Rin Adalat auction defense, loan recovery, and mortgage title enforcement.'
  },
  {
    id: 'tax-vat',
    seq: 15,
    name: 'Tax & VAT',
    bangla: 'আয়কর, ভ্যাট ও শুল্ক আইন',
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
    primaryAct: 'Income Tax Act, 2023 & Value Added Tax and Supplementary Duty Act, 2012',
    description: 'Tax assessment revisions, VAT audit objections, Customs bond dispute resolution, and Income Tax Appellate Tribunal appeals.'
  },
  {
    id: 'consumer',
    seq: 16,
    name: 'Consumer',
    bangla: 'ভোক্তা অধিকার সংরক্ষণ আইন',
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
    primaryAct: 'The Consumer Rights Protection Act, 2009',
    description: 'Complaints to DNCRP against adulteration, MRP overcharging, defective services, and complainant entitlement to 25% collected fine.'
  },
  {
    id: 'education',
    seq: 17,
    name: 'Education',
    bangla: 'শিক্ষা সংক্রান্ত আইন ও অধিকার',
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
    primaryAct: 'Intermediate and Secondary Education Acts & University Acts',
    description: 'Student disciplinary hearing challenges, board certificate correction, private university regulatory compliance, and quota rights.'
  },
  {
    id: 'medical-healthcare',
    seq: 18,
    name: 'Medical & Healthcare',
    bangla: 'চিকিৎসা অবহেলা ও রোগী অধিকার',
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
    primaryAct: 'Bangladesh Medical and Dental Council Act, 2010 & Penal Code Section 304A',
    description: 'Civil and criminal liability for medical negligence, BMDC disciplinary complaint filing, and damages claims against hospitals.'
  },
  {
    id: 'environmental',
    seq: 19,
    name: 'Environmental',
    bangla: 'পরিবেশ সংরক্ষণ ও বন আইন',
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
    primaryAct: 'Bangladesh Environment Conservation Act, 1995 & Environment Court Act, 2010',
    description: 'Environment Court litigation, stopping industrial effluents, unauthorized wetland landfilling, and Department of Environment fines.'
  },
  {
    id: 'intellectual-property',
    seq: 20,
    name: 'Intellectual Property',
    bangla: 'মেধাসম্পদ, কপিরাইট ও ট্রেডমার্ক',
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
    primaryAct: 'The Copyright Act, 2023 & Trade Marks Act, 2009',
    description: 'Trademark infringement injunctions, counterfeit product seizures, digital copyright piracy enforcement, and DPDT registrations.'
  },
  {
    id: 'immigration',
    seq: 21,
    name: 'Immigration',
    bangla: 'অভিবাসন, পাসপোর্ট ও ভিসা আইন',
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
    primaryAct: 'Overseas Employment and Migrants Act, 2013 & Passport Act, 1920',
    description: 'Prosecuting illegal recruiting agencies (manpower fraud), foreign national visa extensions, passport impoundment defense, and citizenship.'
  },
  {
    id: 'administrative',
    seq: 22,
    name: 'Administrative',
    bangla: 'প্রশাসনিক আইন ও সরকারি চাকরি',
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
    primaryAct: 'Administrative Tribunals Act, 1980 & Public Service Act, 2018',
    description: 'Challenging adverse ACRs, wrongful dismissal from government service, pension withholding, and Administrative Appellate Tribunal appeals.'
  },
  {
    id: 'election-political',
    seq: 23,
    name: 'Election & Political',
    bangla: 'নির্বাচনী আইন ও রাজনৈতিক অধিকার',
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
    primaryAct: 'Representation of the People Order (RPO), 1972 & Local Govt Election Acts',
    description: 'Election dispute petitions before Election Tribunal, nomination cancellation appeals to Election Commission, and code violation defense.'
  },
  {
    id: 'traffic-transport',
    seq: 24,
    name: 'Traffic & Transport',
    bangla: 'সড়ক পরিবহন ও দুর্ঘটনা আইন',
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
    primaryAct: 'Road Transport Act, 2018',
    description: 'Motor accident claim tribunal petitions, compensation under Section 105 RTA 2018, BRTA vehicle registration disputes, and reckless driving.'
  },
  {
    id: 'agriculture',
    seq: 25,
    name: 'Agriculture',
    bangla: 'কৃষি জমি, ফসল ও কৃষকের অধিকার',
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
    primaryAct: 'Land Reforms Act, 2023 & Agricultural Labour Wage Rules',
    description: 'Protection of ceiling on agricultural land holdings, barga (sharecropping) rights, fake pesticide claims, and rural irrigation disputes.'
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
    primaryAct: 'Extradition Act, 1974 & International Crimes (Tribunals) Act, 1973',
    description: 'Bilateral extradition treaty proceedings, sovereign immunity, cross-border commercial arbitration (UNCITRAL), and international protocols.'
  },
  {
    id: 'anti-corruption',
    seq: 27,
    name: 'Anti-Corruption',
    bangla: 'দুর্নীতি দমন ও মানিলন্ডারিং প্রতিরোধ',
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
    primaryAct: 'Anti-Corruption Commission Act, 2004 & Money Laundering Prevention Act, 2012',
    description: 'ACC notice response, property freezing defense, non-declaration of asset charges, Special Senior Special Judge Court bail and trials.'
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
    primaryAct: 'Narcotics Control Act, 2018 (Amended 2020)',
    description: 'Special Narcotics Court trials, commercial quantity versus personal possession bail, chemical lab report scrutiny, and rehabilitation orders.'
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
    primaryAct: 'Anti-Terrorism Act, 2009 & Explosive Substances Act, 1908',
    description: 'Special Anti-Terrorism Tribunal trials, unlawful assembly, arms license compliance, explosive substance possession prosecution, and public order.'
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
    primaryAct: 'The Code of Criminal Procedure, 1898 & The Evidence Act, 1872',
    description: 'Procedural master law covering arrests, Section 498 anticipatory bail, witness deposition, forensic cross-examination, and appellate motions.'
  }
];
