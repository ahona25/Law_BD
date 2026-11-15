import bcrypt from 'bcryptjs';
import { db } from './database.js';

export function runSeeds() {
  const existingUsers = db.find('users');
  if (existingUsers.length > 0) {
    console.log('Database already has data. Skipping initial seed.');
    return;
  }

  console.log('Seeding initial Bangladesh Legal Platform data...');
  const salt = bcrypt.genSaltSync(10);
  const defaultPasswordHash = bcrypt.hashSync('password123', salt);
  const adminPasswordHash = bcrypt.hashSync('admin123', salt);

  // 1. Seed Users
  const clientUser = db.insert('users', {
    id: 1,
    name: 'Rahim Ahmed',
    email: 'client@lawbd.com',
    password_hash: defaultPasswordHash,
    role: 'client',
    phone: '01711223344',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    location: 'Dhaka, Bangladesh'
  });

  const lawyerUser1 = db.insert('users', {
    id: 2,
    name: 'Adv. Barrister Tanvir Hasan',
    email: 'tanvir@lawbd.com',
    password_hash: defaultPasswordHash,
    role: 'lawyer',
    phone: '01819887766',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    location: 'Dhaka'
  });

  const lawyerUser2 = db.insert('users', {
    id: 3,
    name: 'Adv. Begum Nusrat Jahan',
    email: 'nusrat@lawbd.com',
    password_hash: defaultPasswordHash,
    role: 'lawyer',
    phone: '01715001122',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    location: 'Dhaka'
  });

  const lawyerUser3 = db.insert('users', {
    id: 4,
    name: 'Adv. Kazi Monirul Islam',
    email: 'monirul@lawbd.com',
    password_hash: defaultPasswordHash,
    role: 'lawyer',
    phone: '01912443322',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    location: 'Chattogram'
  });

  const adminUser = db.insert('users', {
    id: 99,
    name: 'Director General Legal Affairs',
    email: 'admin@lawbd.com',
    password_hash: adminPasswordHash,
    role: 'admin',
    phone: '01911998877',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    location: 'Ministry of Law Secretariat, Dhaka'
  });

  // 2. Seed Lawyers
  const lawyers = [
    {
      id: 1,
      user_id: 2,
      name: 'Adv. Barrister Tanvir Hasan',
      initials: 'TH',
      gender: 'male',
      qualification: 'Barrister-at-Law (Lincoln’s Inn, UK) · LL.M (LSE) · LL.B (Hons, University of London)',
      barCouncilNo: 'BC/DH-10492/2012',
      courtLevel: 'Supreme Court of Bangladesh (High Court Division)',
      association: 'Supreme Court Bar Association (SCBA) & Dhaka Bar Association',
      specialties: ['Criminal Law', 'Land & Property', 'Cybercrime'],
      experienceYears: 14,
      location: 'Dhaka',
      division: 'Dhaka (Supreme Court & Judge Court)',
      chamberAddress: 'Room #412, Supreme Court Bar Association Annex Building, Ramna, Dhaka-1000',
      rating: 4.9,
      reviewsCount: 142,
      feeInPerson: 2500,
      feeVideo: 1800,
      feePhone: 1200,
      feeDisplay: '৳1,800',
      responseTime: '< 1 hour',
      languages: ['Bangla', 'English'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber', 'Phone Call', 'Chat'],
      availableSlots: ['Tomorrow 10:30 AM', 'Tomorrow 3:00 PM', 'Thu 11:00 AM', 'Thu 4:30 PM'],
      bio: 'Barrister Tanvir Hasan has over 14 years of rigorous courtroom experience representing clients in the High Court Division and Metropolitan Sessions Courts. Renowned for strategic anticipatory bail motions, cyber security defence, and complex land title disputes.',
      successRate: '94% Successful Motions',
      casesHandled: '650+ Court Appearances',
      is_featured: true
    },
    {
      id: 2,
      user_id: 3,
      name: 'Adv. Begum Nusrat Jahan',
      initials: 'NJ',
      gender: 'female',
      qualification: 'LL.M (University of Dhaka, 1st Class) · LL.B (Hons, DU)',
      barCouncilNo: 'BC/DH-14389/2016',
      courtLevel: 'High Court Division & Family Courts Dhaka',
      association: 'Dhaka Bar Association & Bangladesh National Women Lawyers Association (BNWLA) Panel',
      specialties: ['Family & Divorce', 'Domestic Violence', 'Child Custody'],
      experienceYears: 10,
      location: 'Dhaka',
      division: 'Dhaka (Supreme Court & Judge Court)',
      chamberAddress: 'Suites 7B, Concord Tower, 113 Kazi Nazrul Islam Ave, Bangla Motor, Dhaka-1205',
      rating: 4.95,
      reviewsCount: 188,
      feeInPerson: 2000,
      feeVideo: 1500,
      feePhone: 1000,
      feeDisplay: '৳1,500',
      responseTime: '< 30 mins',
      languages: ['Bangla', 'English'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber', 'Phone Call', 'Chat'],
      availableSlots: ['Today 5:00 PM', 'Tomorrow 11:30 AM', 'Tomorrow 4:00 PM'],
      bio: 'Leading family law advocate advocating for women and child rights across Dhaka Family Courts and High Court Division. Has resolved over 320 complex divorce, dower recovery, and child guardianship disputes with immense empathy and legal precision.',
      successRate: '98% Custody & Dower Recovery',
      casesHandled: '450+ Family Decrees',
      is_featured: true
    },
    {
      id: 3,
      user_id: 4,
      name: 'Adv. Kazi Monirul Islam',
      initials: 'KM',
      gender: 'male',
      qualification: 'LL.B (Hons, CU) · Diploma in Land Laws & Survey Engineering',
      barCouncilNo: 'BC/CTG-08214/2008',
      courtLevel: 'District & Sessions Judge Court, Chattogram',
      association: 'Chattogram District Bar Association',
      specialties: ['Land & Property', 'Civil Law', 'Cheque Dishonour'],
      experienceYears: 18,
      location: 'Chattogram',
      division: 'Chattogram',
      chamberAddress: 'Chamber 18, A.K. Khan Bhaban, Court Hill (Adalot Pahar), Kotwali, Chattogram',
      rating: 4.85,
      reviewsCount: 119,
      feeInPerson: 1800,
      feeVideo: 1400,
      feePhone: 800,
      feeDisplay: '৳1,400',
      responseTime: '< 2 hours',
      languages: ['Bangla', 'English', 'Chatgaya'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber', 'Phone Call'],
      availableSlots: ['Tomorrow 9:30 AM', 'Thu 12:00 PM', 'Fri 4:00 PM'],
      bio: 'Specialist in complex land title verification, Khatian discrepancies (CS, SA, RS, BS), mutation rectification, and civil litigation under the new Land Crime Prevention Act 2023.',
      successRate: '91% Injunction & Title Decrees',
      casesHandled: '900+ Land Suits',
      is_featured: true
    },
    {
      id: 4,
      user_id: null,
      name: 'Adv. Sabrina Parveen (Cyber Specialist)',
      initials: 'SP',
      gender: 'female',
      qualification: 'LL.M in Cyber Law & Intellectual Property (University of Malaya) · LL.B (DU)',
      barCouncilNo: 'BC/DH-19201/2019',
      courtLevel: 'Cyber Tribunal Dhaka & Metropolitan Sessions Court',
      association: 'Dhaka Bar Association',
      specialties: ['Cybercrime', 'Criminal Law', 'Human Rights'],
      experienceYears: 8,
      location: 'Dhaka',
      division: 'Dhaka (Supreme Court & Judge Court)',
      chamberAddress: 'Level 5, Navana Tower, Gulshan-1, Dhaka-1212',
      rating: 4.9,
      reviewsCount: 96,
      feeInPerson: 2200,
      feeVideo: 1600,
      feePhone: 1000,
      feeDisplay: '৳1,600',
      responseTime: '< 15 mins',
      languages: ['Bangla', 'English'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber', 'Phone Call', 'Chat'],
      availableSlots: ['Today 7:00 PM', 'Tomorrow 2:00 PM', 'Wed 6:00 PM'],
      bio: 'Pioneering cyber litigation advocate specializing in online harassment, private photo blackmail, identity theft, financial mobile banking fraud, and CSA 2023 defence.',
      successRate: '96% Take-down & Prosecution',
      casesHandled: '310+ Digital Crimes Cases',
      is_featured: true
    },
    {
      id: 5,
      user_id: null,
      name: 'Adv. Dewan Farhad Hossain',
      initials: 'DF',
      gender: 'male',
      qualification: 'LL.M (SUST) · LL.B (Hons)',
      barCouncilNo: 'BC/SYL-05931/2011',
      courtLevel: 'District & Sessions Judge Court, Sylhet',
      association: 'Sylhet District Bar Association',
      specialties: ['Cheque Dishonour', 'Corporate Law', 'Civil Law'],
      experienceYears: 15,
      location: 'Sylhet',
      division: 'Sylhet',
      chamberAddress: 'Court Road, Zindabazar, Sylhet-3100',
      rating: 4.8,
      reviewsCount: 84,
      feeInPerson: 1500,
      feeVideo: 1200,
      feePhone: 700,
      feeDisplay: '৳1,200',
      responseTime: '< 3 hours',
      languages: ['Bangla', 'English', 'Sylheti'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber'],
      availableSlots: ['Tomorrow 11:00 AM', 'Thu 3:30 PM'],
      bio: 'Veteran practitioner in commercial disputes, Section 138 Negotiable Instruments Act cheque bouncing recovery, business partnership dissolution, and property conveyance.',
      successRate: '89% Full Monetary Restitution',
      casesHandled: '540+ Commercial Suits',
      is_featured: false
    },
    {
      id: 6,
      user_id: null,
      name: 'Adv. Farhana Yasmin',
      initials: 'FY',
      gender: 'female',
      qualification: 'LL.M (Labour Laws, RU) · LL.B (Hons)',
      barCouncilNo: 'BC/RAJ-11204/2015',
      courtLevel: 'Labour Court Rajshahi & District Judge Court',
      association: 'Rajshahi Bar Association',
      specialties: ['Labour & Workplace', 'Consumer Rights', 'Civil Law'],
      experienceYears: 11,
      location: 'Rajshahi',
      division: 'Rajshahi',
      chamberAddress: 'Judge Court Bhaban, Kazihata, Rajshahi-6000',
      rating: 4.88,
      reviewsCount: 73,
      feeInPerson: 1200,
      feeVideo: 1000,
      feePhone: 600,
      feeDisplay: '৳1,000',
      responseTime: '< 1 hour',
      languages: ['Bangla', 'English'],
      verified: true,
      modes: ['Video Consultation', 'In-person Chamber', 'Phone Call'],
      availableSlots: ['Tomorrow 10:00 AM', 'Wed 4:00 PM'],
      bio: 'Passionate advocate dedicated to workplace justice, wrongful retrenchment claims under Section 33 of Labour Act 2006, unpaid gratuity/provident fund recovery, and consumer fraud.',
      successRate: '93% Wage & Benefit Recovery',
      casesHandled: '280+ Labour Grievances',
      is_featured: false
    }
  ];

  lawyers.forEach(lawyer => db.insert('lawyers', lawyer));

  // 3. Seed Comprehensive Bangladesh Laws Library
  const laws = [
    {
      id: 'law-constitution-bd',
      title: 'Constitution of the People’s Republic of Bangladesh',
      bangla_title: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান (মৌলিক অধিকার ও রিট এক্তিয়ার)',
      category: 'constitutional',
      category_label: 'Constitutional Law',
      act_no_year: 'Enacted 4 November 1972',
      tag: 'Supreme Law of Bangladesh',
      acts: [
        'Constitution of Bangladesh (Articles 26-47A, Article 102)',
        'Supreme Court (High Court Division) Rules'
      ],
      simple_summary: 'The Constitution is the supreme law of Bangladesh. Any law inconsistent with the fundamental rights guaranteed under Part III is void. Article 102 empowers the High Court Division to issue prerogative writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo-Warranto) to enforce fundamental human rights and check administrative overreach.',
      simple_summary_bn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান হলো দেশের সর্বোচ্চ আইন। সংবিধানের তৃতীয় ভাগে বর্ণিত নাগরিকদের মৌলিক অধিকারের সাথে অসামঞ্জস্যপূর্ণ যেকোনো আইন বাতিল হবে। অনুচ্ছেদ ১০২ এর অধীন হাইকোর্ট বিভাগ নাগরিকদের অধিকার রক্ষা ও বেআইনি পদক্ষেপ প্রতিরোধে হেবিয়াস কর্পাস, ম্যানডামাসসহ ৫ ধরণের রিট আদেশ জারি করতে পারে।',
      key_provisions: [
        'Article 27: Equality before law and equal protection of law for all citizens.',
        'Article 31: Absolute right to be treated in accordance with law and only in accordance with law.',
        'Article 32: Protection of right to life and personal liberty; no deprivation save in accordance with law.',
        'Article 35: Protection in respect of trial and punishment; prohibition of torture and cruel punishment.',
        'Article 102: Writ jurisdiction of the High Court Division for direct enforcement of fundamental rights.'
      ],
      procedure_steps: [
        { step: 1, title: 'Notice of Demand for Justice', desc: 'Advocate serves statutory legal notice of demand for justice to government authorities granting 48 hours to 7 days time to rectify unlawful decision.' },
        { step: 2, title: 'Draft Writ Petition under Art 102', desc: 'Counsel drafts comprehensive writ petition detailing statutory violation, lack of jurisdiction, or breach of natural justice.' },
        { step: 3, title: 'Motion Hearing in High Court Bench', desc: 'Argue motion before designated High Court Division Writ Bench for issuance of Rule Nisi and interim stay order.' },
        { step: 4, title: 'Service of Rule Nisi', desc: 'Serve court notice and injunction orders upon government respondents.' },
        { step: 5, title: 'Final Hearing & Judgment', desc: 'Court makes Rule Nisi absolute, quashing illegal administrative orders or ordering release of illegally detained persons.' }
      ],
      penalties: 'Any government official acting in defiance of High Court writ orders faces direct Contempt of Court proceedings, fine, and civil imprisonment.',
      penalties_bn: 'উচ্চ আদালতের রিট আদেশ অমান্যকারী যেকোনো সরকারি কর্মকর্তা সরাসরি আদালত অবমাননার (Contempt of Court) দায়ে জরিমানা ও কারাদণ্ডে দণ্ডিত হতে পারেন।',
      required_documents: [
        'Impugned government order, notification, or memo copy',
        'National ID card (NID) copy of the petitioner',
        'Certified proof of violation of fundamental right or administrative illegality',
        'Proof of service of Demand for Justice notice'
      ],
      immediate_actions: [
        'Engage an enrolled Advocate of the Supreme Court of Bangladesh immediately upon receipt of unlawful government decision.',
        'Ensure certified copy of the challenged circular, notice, or order is procured without delay.'
      ],
      specialist_match: 'Constitutional Law',
      status: 'current',
      enactment_date: '1972-11-04',
      last_amended: '2018 (17th Amendment)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-367.html',
      official_gazette_ref: 'Bangladesh Gazette Extraordinary, Dec 14, 1972'
    },
    {
      id: 'law-land-disputes',
      title: 'Land Ownership, Khatian Records & Illegal Encroachment',
      bangla_title: 'জমির মালিকানা, খতিয়ান রেকর্ড ও অবৈধ দখল উচ্ছেদ আইন',
      category: 'property',
      category_label: 'Land & Property',
      act_no_year: 'Act No. 28 of 2023',
      tag: 'Land Crime Prevention Act 2023',
      acts: [
        'Land Crime Prevention and Redress Act, 2023 (Sections 4, 5, 7, 8)',
        'The Specific Relief Act, 1877 (Sections 8, 9, 42, 54)',
        'The Code of Criminal Procedure, 1898 (Sections 144, 145)',
        'The Transfer of Property Act, 1882'
      ],
      simple_summary: 'Under the Land Crime Prevention and Redress Act 2023, forging title deeds, fabricating duplicate registration deeds, and forceful illegal land grabbing are now severe non-bailable criminal offences punishable by rigorous imprisonment up to 7 years. Genuine ownership requires a chain of deeds (Baya Dalil), updated mutation (Namjari), Khatian (CS, SA, RS, BS), and current land tax (Khajna) receipts.',
      simple_summary_bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জাল দলিল তৈরি, প্রতারণামূলকভাবে একই জমি একাধিক ব্যক্তির কাছে বিক্রি এবং জোরপূর্বক জমি দখল করা জামিন-অযোগ্য ফৌজদারি অপরাধ, যার সর্বোচ্চ শাস্তি ৭ বছরের সশ্রম কারাদণ্ড ও অর্থদণ্ড। বৈধ মালিকানার জন্য মূল দলিল, বায়া দলিল, নামজারি খতিয়ান ও খাজনার দাখিলা থাকা আবশ্যক।',
      key_provisions: [
        'Section 4: Forgery of land ownership deeds punishable with rigorous imprisonment up to 7 years.',
        'Section 7: Forcefully grabbing or dispossessing legal owner is a cognizable and non-bailable criminal offence.',
        'Section 8: Creating duplicate title deeds to defraud co-sharers or buyers carries up to 5 years jail.',
        'Section 9 Specific Relief Act: Summary civil suit within 6 months of wrongful dispossession to regain possession without proving title.',
        'Section 145 CrPC: Executive Magistrate intervention to prevent bloodshed or breach of peace on disputed land.'
      ],
      procedure_steps: [
        { step: 1, title: 'Verify Records at AC Land Office', desc: 'Verify Mutation Khatian, DCR, and verify RS/BS record matches ground physical possession.' },
        { step: 2, title: 'File Sec 144/145 CrPC if Threatened', desc: 'If rival party threatens violent dispossession, move Executive Magistrate Court for restraining order.' },
        { step: 3, title: 'Lodge Case under Land Crime Act 2023', desc: 'File criminal complaint with police or Magistrate Court for forged documents or land grabbing.' },
        { step: 4, title: 'File Title Suit / Injunction in Civil Court', desc: 'File civil suit for declaration of title and permanent injunction against encroachment in Joint District Judge Court.' },
        { step: 5, title: 'Execution of Possession Decree', desc: 'Execute decree with court bailiff and police assistance if necessary.' }
      ],
      penalties: 'Rigorous imprisonment up to 7 years, hefty financial penalties, and immediate summary eviction of illegal occupants by Executive Magistrate.',
      penalties_bn: 'সর্বোচ্চ ৭ বছরের সশ্রম কারাদণ্ড, অর্থদণ্ড এবং নির্বাহী ম্যাজিস্ট্রেট কর্তৃক দখলদারকে উচ্ছেদ করে প্রকৃত মালিকের কাছে দখল হস্তান্তরের বিধান।',
      required_documents: [
        'Original registered Sale Deed (মূল কবলা দলিল) and previous chain deeds (বায়া দলিল)',
        'Latest Mutation Khatian (নামজারি খতিয়ান) and DCR receipt',
        'Up-to-date Land Development Tax receipt (দাখিলা / খাজনার রশিদ)',
        'CS, SA, RS, BS Khatian certified copies from District Record Room (কালেক্টরেট রেকর্ড রুম)',
        'Field survey map / Mouza map and boundary demarcation sketch'
      ],
      immediate_actions: [
        'Never leave vacant land unfenced; construct boundary wall and install name board with deed and mutation numbers.',
        'Pay land development tax online annually through the Bangladesh Land Ministry portal (land.gov.bd).',
        'Obtain Non-Encumbrance Certificate (NEC) from Sub-Registry office before purchasing any land.'
      ],
      specialist_match: 'Land & Property',
      status: 'current',
      enactment_date: '2023-09-18',
      last_amended: '2023-09-18',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-1463.html',
      official_gazette_ref: 'Bangladesh Gazette Extraordinary, Sept 18, 2023'
    },
    {
      id: 'law-cheque-dishonour',
      title: 'Cheque Dishonour, Bounced Cheques & Financial Recovery',
      bangla_title: 'চেক ডিজঅনার, চেক বাউন্স ও টাকা আদায়ের মামলা (১৮৮১ সালের ১৩৮ ধারা)',
      category: 'cheque',
      category_label: 'Cheque Dishonour & Fraud',
      act_no_year: 'Act XXVI of 1881',
      tag: 'Negotiable Instruments Act, Sec 138',
      acts: [
        'The Negotiable Instruments Act, 1881 (Section 138, 140, 141)',
        'The Code of Criminal Procedure, 1898',
        'The Penal Code, 1860 (Section 420)'
      ],
      simple_summary: 'When a bank cheque bounces due to insufficient funds or account closure, the holder can file a criminal case under Section 138 of the NI Act. This law has extremely strict, non-extendable statutory limitation deadlines: you must present the cheque within 6 months, obtain bank memo, serve legal notice within 30 days, give 30 days time to pay, and file case in court within 30 days thereafter.',
      simple_summary_bn: 'ব্যাংক একাউন্টে পর্যাপ্ত টাকা না থাকার কারণে চেক প্রত্যাখ্যাত (বাউন্স) হলে হস্তান্তরযোগ্য দলিল আইনের ১৩৮ ধারায় ফৌজদারি মামলা দায়ের করা যায়। এই আইনের সময়সীমা অত্যন্ত কঠোর: চেক ফেরত পাওয়ার ৩০ দিনের মধ্যে লিগ্যাল নোটিশ পাঠাতে হবে, নোটিশ পাওয়ার পর ৩০ দিন সময় দিতে হবে এবং টাকা না দিলে পরবর্তী ৩০ দিনের মধ্যে আদালতে মামলা দায়ের করতে হবে।',
      key_provisions: [
        'Cheque must be presented within its validity period (6 months from date of issue).',
        'Statutory Advocate Legal Notice must be sent within 30 days from receiving Bank Cheque Return Memo.',
        'Drawer has 30 days from receipt of notice to make full payment.',
        'Complaint (CR Case) must be filed within 30 days after the expiry of the 30-day notice period before Chief Metropolitan / Chief Judicial Magistrate.',
        'Section 138 allows court to award twice the cheque amount to the complainant.'
      ],
      procedure_steps: [
        { step: 1, title: 'Bank Return Memo', desc: 'Present cheque to bank and obtain official "Cheque Return Memo" stating dishonour reason (e.g. Insufficient Funds).' },
        { step: 2, title: 'Serve Statutory Legal Notice', desc: 'Through an Advocate, send written legal notice within 30 days of receiving return memo via registered post with A/D.' },
        { step: 3, title: 'Wait 30 Days for Payment', desc: 'Allow 30 clear days for the drawer to pay the cheque amount from date of notice delivery.' },
        { step: 4, title: 'File C.R. Case in Court', desc: 'If drawer fails to pay, file complaint (CR Case) before CMM / CJM Court within the next 30 days.' },
        { step: 5, title: 'Trial & Judgment', desc: 'Case transferred to Sessions Court. Court can award double the cheque amount and imprisonment up to 1 year.' }
      ],
      penalties: 'Imprisonment up to 1 year, or fine up to twice the amount of the dishonoured cheque, or both. Fine collected is awarded directly to the complainant.',
      penalties_bn: '১ বছর পর্যন্ত কারাদণ্ড অথবা চেকে উল্লেখিত অর্থের দ্বিগুণ পর্যন্ত জরিমানা অথবা উভয় দণ্ড। জরিমানার সমুদয় অর্থ মামলার বাদীকে প্রদানের নির্দেশ দেওয়া হয়।',
      required_documents: [
        'Original dishonoured cheque and bank deposit slip',
        'Original Bank Cheque Return Memo with seal and signature',
        'Copy of Legal Notice served by Advocate',
        'Postal receipt and Acknowledgment Due (A/D) card or courier delivery confirmation'
      ],
      immediate_actions: [
        'Track dates meticulously; calculate deadlines in a calendar immediately upon receiving bank return memo.',
        'Always send notice to both present and permanent addresses of the cheque drawer via registered post with A/D.',
        'Retain clear photocopies of the front and back of the original cheque.'
      ],
      specialist_match: 'Cheque Dishonour',
      status: 'current',
      enactment_date: '1881-12-09',
      last_amended: '2006 (Amended Section 138A)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-43.html',
      official_gazette_ref: 'Gazette of India, Dec 9, 1881'
    },
    {
      id: 'law-divorce-family',
      title: 'Divorce, Dower (Denmohur) & Maintenance',
      bangla_title: 'তালাক, দেনমোহর এবং ভরণপোষণ সংক্রান্ত আইন',
      category: 'family',
      category_label: 'Family & Divorce',
      act_no_year: 'Ordinance VIII of 1961 & Act VII of 2023',
      tag: 'Muslim Family Laws Ordinance 1961',
      acts: [
        'Muslim Family Laws Ordinance, 1961 (Section 7 & 9)',
        'Family Courts Act, 2023 / Family Court Ordinance, 1985',
        'Dissolution of Muslim Marriages Act, 1939'
      ],
      simple_summary: 'Under Bangladeshi law, both husband and wife have defined rights regarding marriage dissolution. When a husband pronounces Talaq, he must send written notice to the local Union Parishad Chairman / City Mayor and a copy to the wife. A 90-day reconciliation period is mandatory before divorce becomes effective. The wife is legally entitled to her full remaining Dower (Denmohur) and maintenance (Khorposh) during the Iddat period. Denmohur cannot be waived forcibly under any circumstance.',
      simple_summary_bn: 'বাংলাদেশে মুসলিম পারিবারিক আইন অনুযায়ী স্বামী বা স্ত্রী উভয়েরই বিবাহ বিচ্ছেদের নির্ধারিত আইনগত অধিকার রয়েছে। স্বামী তালাক দিলে স্থানীয় ইউনিয়ন পরিষদ চেয়ারম্যান বা সিটি মেয়রের কাছে লিখিত নোটিশ পাঠাতে হবে এবং তার অনুলিপি স্ত্রীকে পাঠাতে হবে। নোটিশ প্রেরণের ৯০ দিন পর তালাক কার্যকর হয়। স্ত্রী তার সম্পূর্ণ দেনমোহর এবং ইদ্দতকালীন ভরণপোষণ পাওয়ার পূর্ণ আইনগত অধিকারী।',
      key_provisions: [
        'Written notice to Union Parishad / City Corporation Arbitration Council is compulsory under Section 7.',
        'Arbitration council tries reconciliation within 30 days of receiving notice.',
        'If not reconciled, Talaq becomes legally effective after 90 days from notice date.',
        'Prompt Dower must be paid on demand; Deferred Dower is mandatory upon dissolution of marriage.',
        'Failure to send official notice carries punishment of imprisonment up to 1 year or a fine up to ৳10,000.'
      ],
      procedure_steps: [
        { step: 1, title: 'Send Written Notice', desc: 'Send registered post notice to local Chairman/Mayor and a copy to the spouse via registered post with A/D.' },
        { step: 2, title: 'Arbitration Council Notice', desc: 'Arbitration Council issues notice to both parties to attend reconciliation meetings.' },
        { step: 3, title: '90-Day Waiting Period', desc: 'Divorce takes legal effect after 90 days from date Chairman received the notice.' },
        { step: 4, title: 'File Suit for Dower/Maintenance', desc: 'If Denmohur or maintenance is withheld, file a suit in the Family Court (court fee is minimal: ৳25-50).' },
        { step: 5, title: 'Decree & Execution', desc: 'Family Court issues decree for payment; non-compliance may lead to civil detention of the defaulter.' }
      ],
      penalties: 'Non-compliance with Section 7 notice: Imprisonment up to 1 year or fine up to ৳10,000. Willful default on Family Court maintenance decree results in civil jail until compliance.',
      penalties_bn: 'তালাকের লিখিত নোটিশ না দিলে ১ বছর পর্যন্ত কারাদণ্ড বা ১০,০০০ টাকা পর্যন্ত অর্থদণ্ড। দেনমোহর বা ভরণপোষণ পরিশোধ না করলে পারিবারিক আদালতের নির্দেশে দেওয়ানি জেলে আটক রাখার বিধান।',
      required_documents: [
        'Original Nikahnama (Kabinnama) / Marriage Registration Certificate',
        'National ID (NID) copy of applicant',
        'Postal receipts of Talaq notices sent via registered post',
        'Bank statements or proof of income of husband for maintenance calculation',
        'Birth certificates of children (if custody/maintenance involved)'
      ],
      immediate_actions: [
        'Collect certified copy of Nikahnama from the Kazi office where registered.',
        'Always send notices via registered post with Acknowledgment Due (A/D) to maintain proof of delivery.',
        'Do not sign any blank stamps or compromise deed without lawyer verification.'
      ],
      specialist_match: 'Family & Divorce',
      status: 'current',
      enactment_date: '1961-07-15',
      last_amended: '2023 (Family Courts Act 2023)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-305.html',
      official_gazette_ref: 'Gazette of Pakistan, March 2, 1961'
    },
    {
      id: 'law-cyber-crime',
      title: 'Cyber Harassment, Online Fraud & Digital Safety',
      bangla_title: 'অনলাইন প্রতারণা, সাইবার হেনস্তা ও সাইবার নিরাপত্তা আইন',
      category: 'cyber',
      category_label: 'Cybercrime & Harassment',
      act_no_year: 'Act No. 27 of 2023',
      tag: 'Cyber Security Act 2023',
      acts: [
        'Cyber Security Act, 2023 (Sections 21, 24, 25, 28)',
        'The Penal Code, 1860 (Cheating Section 415/420)',
        'Pornography Control Act, 2012'
      ],
      simple_summary: 'Cybercrime includes hacking accounts, identity theft, spreading manipulated intimate photos/blackmail, phishing scams, and financial fraud through mobile banking apps. Bangladesh law strictly prohibits publishing indecent or defaming materials electronically and committing fraud via computer devices. Victims can seek immediate intervention through Thana, Cyber Crime Investigation Division (CID), and National Cyber Security Agency.',
      simple_summary_bn: 'অনলাইনে একাউন্ট হ্যাকিং, ব্ল্যাকমেইল, আপত্তিকর ছবি ছড়িয়ে দেওয়ার হুমকি, মোবাইল ব্যাংকিং প্রতারণা এবং ভুয়া পরিচয় দিয়ে প্রতারণা সাইবার নিরাপত্তা আইনের অধীনে কঠোর দণ্ডনীয় অপরাধ। ভুক্তভোগীরা নিকটস্থ থানা, সিআইডি সাইবার পুলিশ এবং বিটিআরসির মাধ্যমে দ্রুত প্রতিকার পেতে পারেন।',
      key_provisions: [
        'Identity theft and impersonation: Operating fake profile to defraud is a punishable offence.',
        'Blackmail with intimate pictures: Offence under CSA and Pornography Control Act 2012 carries severe imprisonment.',
        'Financial fraud (bKash/Nagad scams): Investigated jointly under Cyber Security Act and Penal Code 420.',
        'Cyber Police Centre hotline (01320010148) provides 24/7 technical and emergency assistance.'
      ],
      procedure_steps: [
        { step: 1, title: 'Preserve Digital Evidence', desc: 'Capture unedited full-screen screenshots showing profile URLs, timestamps, message headers, and transaction IDs.' },
        { step: 2, title: 'Report to Cyber Crime Helpdesk', desc: 'Contact Police Cyber Support for Women (PCSW) or CID Cyber Centre via hotline/Facebook page.' },
        { step: 3, title: 'File GD / FIR at Thana', desc: 'Lodge formal GD or FIR at nearest police station with printed screenshots and digital media on pen drive.' },
        { step: 4, title: 'BTRC URL Blocking Request', desc: 'Investigating officer or victim petitions Bangladesh Telecommunication Regulatory Commission (BTRC) to take down offensive links.' },
        { step: 5, title: 'Cyber Tribunal Trial', desc: 'Case tried before the designated Cyber Tribunal in Dhaka / Divisional headquarters.' }
      ],
      penalties: 'Rigorous imprisonment up to 5 years and fine up to ৳25 Lakh for identity theft, hacking, and online extortion. Under Pornography Control Act: Up to 10 years rigorous imprisonment.',
      penalties_bn: 'হ্যাকিং ও সাইবার প্রতারণায় ৫ বছর পর্যন্ত কারাদণ্ড ও ২৫ লাখ টাকা পর্যন্ত জরিমানা। পর্নোগ্রাফি নিয়ন্ত্রণ আইনে ১০ বছর পর্যন্ত সশ্রম কারাদণ্ড ও ৫ লাখ টাকা অর্থদণ্ডের বিধান।',
      required_documents: [
        'High-resolution screenshots with visible URLs, phone numbers, and timestamps',
        'Transaction IDs / MFS statements (bKash/Nagad/Rocket) for financial scams',
        'Audio call recordings or screen recordings of extortion calls',
        'Link of fake profile / group / channel'
      ],
      immediate_actions: [
        'Do not delete chats or block offender before taking screenshots with complete URL links.',
        'Never send ransom money via bKash; report immediately to Police Cyber Support.',
        'Immediately activate Two-Factor Authentication (2FA) on all email and social accounts.'
      ],
      specialist_match: 'Cybercrime',
      status: 'current',
      enactment_date: '2023-09-18',
      last_amended: '2023-09-18',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-1462.html',
      official_gazette_ref: 'Bangladesh Gazette Extraordinary, Sept 18, 2023'
    },
    {
      id: 'law-bail-procedure',
      title: 'Bail Laws & Criminal Defense (Anticipatory & Regular Bail)',
      bangla_title: 'জামিন আইন ও ফৌজদারি প্রতিরক্ষা (আগাম ও নিয়মিত জামিন)',
      category: 'criminal',
      category_label: 'Criminal Law & Bail',
      act_no_year: 'Act V of 1898',
      tag: 'CrPC 1898, Sec 496, 497, 498',
      acts: [
        'The Code of Criminal Procedure, 1898 (Sections 496, 497, 498, 498A)',
        'The High Court Rules (Anticipatory Bail Guidelines)'
      ],
      simple_summary: 'In Bangladesh, offences are divided into Bailable and Non-Bailable. In bailable offences (Sec 496), bail is a matter of right. In non-bailable offences (Sec 497), granting bail is the court’s discretion, considering health, age, nature of accusation, and risk of absconding. Anticipatory Bail (আগাম জামিন under Sec 498) is sought before arrest directly from the High Court Division to prevent unlawful harassment.',
      simple_summary_bn: 'ফৌজদারি কার্যবিধি অনুযায়ী জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের অধিকার। জামিন-অযোগ্য অপরাধে জামিন প্রদান আদালতের সুবিবেচনাধীন। তবে কোনো ব্যক্তি যদি কোনো মামলায় অন্যায়ভাবে গ্রেফতার বা হয়রানির আশঙ্কা করেন, তবে গ্রেফতার এড়াতে হাইকোর্ট বিভাগে উপস্থিত হয়ে আগাম জামিন (Anticipatory Bail) প্রার্থনা করতে পারেন।',
      key_provisions: [
        'Bailable offence: Police or Magistrate is legally bound to grant bail upon furnishing bail bond.',
        'Non-bailable offence: Bail can be granted by Magistrate or Sessions Court if grounds are satisfied.',
        'Anticipatory bail: Only High Court Division can grant anticipatory bail for a limited period (typically 4-8 weeks) directing surrender to Sessions Court.',
        'Sick, infirm, minor, or female accused persons enjoy special leniency under proviso to Section 497(1).'
      ],
      procedure_steps: [
        { step: 1, title: 'Ascertain Case Number & FIR', desc: 'Obtain certified copy of FIR / GD / CR case petition and seizure list from court.' },
        { step: 2, title: 'Draft Bail Application', desc: 'Lawyer prepares grounds of bail highlighting innocence, lack of overt act, and roots in society.' },
        { step: 3, title: 'Hearing before Magistrate / Sessions Judge', desc: 'Advocate argues the bail petition. If rejected, move criminal miscellaneous petition to Sessions Court.' },
        { step: 4, title: 'High Court Appeal / Motion', desc: 'If Sessions Court denies bail, file criminal miscellaneous petition under Section 498 CrPC in High Court Division.' },
        { step: 5, title: 'Furnish Bail Bond & Release', desc: 'Submit bail bond with local sureties. Court issues release order (খালাস পরোয়ানা) to Central Jail.' }
      ],
      penalties: 'Violating bail conditions or absconding results in bail cancellation, forfeiture of surety bond, and issuance of Non-Bailable Arrest Warrant (WA).',
      penalties_bn: 'জামিনের শর্ত ভঙ্গ করলে জামিন বাতিল, বন্ডের টাকা বাজেয়াপ্ত এবং গ্রেফতারি পরোয়ানা জারি করা হয়।',
      required_documents: [
        'Certified copy of FIR / Complaint petition',
        'Certified copy of rejection order of lower court (if moving higher court)',
        'Medical certificates (if applying on medical grounds)',
        'National ID cards and land documents of local bailors (sureties)'
      ],
      immediate_actions: [
        'Do not evade police without legal counsel; contact an Advocate immediately to prepare anticipatory bail if apprehending arrest.',
        'Ensure reliable local sureties (bailors) with valid NID and tax/utility documents are ready.'
      ],
      specialist_match: 'Criminal Law',
      status: 'current',
      enactment_date: '1898-03-22',
      last_amended: '2022 (CrPC Amendment)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-75.html',
      official_gazette_ref: 'Gazette of India, March 22, 1898'
    },
    {
      id: 'law-domestic-violence',
      title: 'Domestic Violence, Protection Orders & Dowry Prohibition',
      bangla_title: 'পারিবারিক সহিংসতা প্রতিরোধ, সুরক্ষা আদেশ ও যৌতুক নিরোধ আইন',
      category: 'domestic',
      category_label: 'Domestic Violence',
      act_no_year: 'Act No. 58 of 2010',
      tag: 'Domestic Violence Act 2010',
      acts: [
        'Domestic Violence (Prevention and Protection) Act, 2010',
        'Dowry Prohibition Act, 2018',
        'Nari O Shishu Nirjatan Daman Ain, 2000 (Amended 2020)'
      ],
      simple_summary: 'The law protects women and children from physical, psychological, sexual, and economic abuse within domestic relationships. Victims can obtain emergency "Protection Orders", "Residence Orders" (right to stay in shared household without expulsion), and monetary compensation from the Judicial Magistrate Court. Demanding dowry in connection with marriage is also a severe criminal offence.',
      simple_summary_bn: 'পারিবারিক সম্পর্কের মধ্যে যেকোনো ধরণের শারীরিক, মানসিক, যৌন ও অর্থনৈতিক নির্যাতন থেকে নারী ও শিশুদের সুরক্ষার জন্য আইনটি প্রণীত। ভুক্তভোগী নারী ম্যাজিস্ট্রেট আদালত থেকে জরুরি সুরক্ষা আদেশ এবং যৌথ পরিবারে বসবাসের অধিকার নিশ্চিত করতে পারেন। এছাড়াও যৌতুক দাবি করা জামিন-অযোগ্য অপরাধ।',
      key_provisions: [
        'Definition of domestic violence includes mental torture, verbal abuse, economic deprivation, and physical hurt.',
        'Protection Orders: Magistrate can restrain the perpetrator from entering victim’s workplace or residence.',
        'Residence Order: Prohibits the respondent from evicting the victim from the shared household.',
        'Dowry Prohibition Act 2018: Demanding or giving dowry is punishable with up to 5 years imprisonment.',
        'Emergency helpline 109 (National Helpline for Violence Against Women and Children) provides immediate shelter and legal aid.'
      ],
      procedure_steps: [
        { step: 1, title: 'Medical Examination & Treatment', desc: 'If physically injured, immediately visit One-Stop Crisis Centre (OCC) at Dhaka Medical College or government hospital for certified medical report.' },
        { step: 2, title: 'Application to Magistrate Court', desc: 'File application under Section 11 of the 2010 Act directly or through Protection Officer/NGO for interim protection order.' },
        { step: 3, title: 'Passage of Interim Protection Order', desc: 'Court passes emergency order within 24-48 hours prohibiting perpetrator from approaching victim.' },
        { step: 4, title: 'Filing Police Case / OCC Report', desc: 'For heinous offences, lodge case under Nari O Shishu Nirjatan Daman Ain at Thana.' },
        { step: 5, title: 'Monetary Compensation & Residence', desc: 'Court awards monthly maintenance, medical reimbursement, and safe residence in final order.' }
      ],
      penalties: 'Breach of Protection Order: Imprisonment up to 6 months or fine up to ৳10,000 for first offence; up to 2 years imprisonment for repeated breach. Demanding Dowry: Imprisonment up to 5 years and fine.',
      penalties_bn: 'আদালতের সুরক্ষা আদেশ লঙ্ঘন করলে ৬ মাস থেকে ২ বছর পর্যন্ত কারাদণ্ড। যৌতুক দাবির দায়ে সর্বোচ্চ ৫ বছরের কারাদণ্ড ও অর্থদণ্ড।',
      required_documents: [
        'Medical injury certificate (OCC / Government Hospital discharge summary)',
        'Marriage certificate (Nikahnama) and NID copy',
        'Photographs of physical injuries / damaged property',
        'Witness statements / audio recordings / abusive text messages'
      ],
      immediate_actions: [
        'Call emergency hotline 109 or 999 for instant police dispatch and rescue.',
        'Go to the nearest government hospital One-Stop Crisis Centre (OCC) for medical evidence preservation.',
        'National Legal Aid (16430) provides free lawyers and financial litigation support.'
      ],
      specialist_match: 'Domestic Violence',
      status: 'current',
      enactment_date: '2010-12-30',
      last_amended: '2018 (Dowry Prohibition Act)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-1060.html',
      official_gazette_ref: 'Bangladesh Gazette, Dec 30, 2010'
    },
    {
      id: 'law-labour-rights',
      title: 'Labour Law, Wrongful Termination & Wage Dues',
      bangla_title: 'শ্রম আইন, বেআইনি বরখাস্ত ও বকেয়া বেতন-ভাতা আদায়',
      category: 'labour',
      category_label: 'Labour & Workplace',
      act_no_year: 'Act XLII of 2006',
      tag: 'Bangladesh Labour Act 2006',
      acts: [
        'The Bangladesh Labour Act, 2006 (Amended 2013, 2018)',
        'The Bangladesh Labour Rules, 2015'
      ],
      simple_summary: 'The Bangladesh Labour Act protects workers and employees across factories, commercial establishments, and shops. It governs appointment letters, probation, regular payment of wages, maternity benefits, overtime rates (double normal wage), gratuity, provident fund, and strict procedures for termination or retrenchment. Termination without statutory notice or compensation can be challenged directly in the Labour Court.',
      simple_summary_bn: 'বাংলাদেশ শ্রম আইন অনুযায়ী সকল স্থায়ী শ্রমিকের লিখিত নিয়োগপত্র ও পরিচয়পত্র বাধ্যতামূলক। বেতন পরিশোধ, অতিরিক্ত কাজের দ্বিগুণ মজুরি, ১৬ সপ্তাহের প্রসূতি কল্যাণ সুবিধা এবং বেআইনি বরখাস্তের ক্ষতিপূরণ নিশ্চিত করা হয়েছে। কোনো শ্রমিককে অন্যায়ভাবে ছাঁটাই করলে ৩৩ ধারার অধীন ৩০ দিনের মধ্যে মালিক বরাবর দাবি জানিয়ে শ্রম আদালতে মামলা করা যায়।',
      key_provisions: [
        'Mandatory written appointment letter and service book for all employees.',
        'Wages must be paid within 7 working days following the wage period.',
        'Termination by employer requires 120 days notice or pay in lieu for permanent workers, plus compensation of 30 days wages for every completed year of service.',
        'Maternity leave of 16 weeks with full wages is mandatory for female employees.',
        'Grievance procedure under Section 33: Worker must submit written grievance to employer within 30 days.'
      ],
      procedure_steps: [
        { step: 1, title: 'Submit Grievance to Employer', desc: 'Submit written grievance to employer within 30 days of the occurrence via registered post.' },
        { step: 2, title: 'Wait for Employer Response', desc: 'Employer has 30 days to hold enquiry and communicate decision.' },
        { step: 3, title: 'File Complaint in Labour Court', desc: 'If employer fails to respond or worker is dissatisfied, file complaint before the Chairman, Labour Court within next 30 days.' },
        { step: 4, title: 'Conciliation & Summary Trial', desc: 'Labour Court conducts trial; worker does not need to pay heavy court fees.' },
        { step: 5, title: 'Appeal to Labour Appellate Tribunal', desc: 'Any party aggrieved by Labour Court order can appeal within 60 days to Labour Appellate Tribunal.' }
      ],
      penalties: 'Employers violating labour provisions face criminal prosecution, fines up to ৳25,000, and recovery of worker dues as public demand with interest.',
      penalties_bn: 'শ্রমিকদের আইনানুগ পাওনা পরিশোধ না করলে বা নিয়মবহির্ভূত বরখাস্ত করলে ২৫,০০০ টাকা পর্যন্ত জরিমানা ও শ্রম আদালতের নির্দেশে বকেয়া অর্থ আদায়।',
      required_documents: [
        'Appointment letter, ID card, and salary slips',
        'Bank statement showing salary credits or attendance card',
        'Termination/dismissal letter or email',
        'Copy of written grievance sent to employer and postal receipt'
      ],
      immediate_actions: [
        'Never leave employment without collecting written experience certificate and clearance document.',
        'Submit written grievance within exactly 30 days to preserve right to sue in Labour Court.'
      ],
      specialist_match: 'Labour & Workplace',
      status: 'current',
      enactment_date: '2006-10-11',
      last_amended: '2018 (Labour Amendment Act)',
      official_source_url: 'http://bdlaws.minlaw.gov.bd/act-957.html',
      official_gazette_ref: 'Bangladesh Gazette Extraordinary, Oct 11, 2006'
    }
  ];

  laws.forEach(law => db.insert('laws', law));

  // 4. Seed Appointments
  db.insert('appointments', {
    id: 'LBD-2026-8914',
    client_id: 1,
    lawyer_id: 1,
    lawyer_name: 'Adv. Barrister Tanvir Hasan',
    client_name: 'Rahim Ahmed',
    client_phone: '01711223344',
    client_email: 'client@lawbd.com',
    mode: 'Video Consultation',
    date: '2026-11-20',
    time_slot: 'Tomorrow 3:00 PM',
    case_category: 'Land & Property',
    problem_description: 'Dispute regarding Mirpur plot boundary wall and forged deed produced by local grabbers.',
    fee_amount: 1800,
    payment_status: 'paid',
    payment_method: 'bKash',
    payment_tx_id: 'BK9X872391',
    status: 'confirmed',
    token: 'LBD-2026-8914',
    documents: ['Plot_Khatian_Copy.pdf']
  });

  // 5. Seed Cases
  db.insert('cases', {
    id: 1,
    client_id: 1,
    lawyer_id: 1,
    title: 'Illegal Encroachment on Mirpur Commercial Plot',
    category: 'Land & Property',
    incident_description: 'Local rival group constructed makeshift tin shed on our RS Khatian plot while family was out of town. Land Crime Act 2023 complaint needed.',
    related_laws: ['Land Crime Prevention and Redress Act 2023', 'Specific Relief Act Section 9'],
    status: 'ongoing',
    court_name: 'Joint District Judge Court 2nd Court, Dhaka',
    next_hearing_date: '2026-12-10',
    private_notes: [
      { date: '2026-11-10', note: 'Advocate verified mutation and RS records at AC Land office.' },
      { date: '2026-11-14', note: 'Prepared injunction draft under Order 39 Rule 1 CPC.' }
    ],
    documents: ['Deed_10492_Certified.pdf', 'RS_Khatian_991.pdf']
  });

  db.insert('cases', {
    id: 2,
    client_id: 1,
    lawyer_id: 1,
    title: 'Recovery of ৳8,50,000 via NI Act Cheque Dishonour',
    category: 'Cheque Dishonour',
    incident_description: 'Business partner supplied bounced cheque on Islami Bank. 30-day notice already served.',
    related_laws: ['Negotiable Instruments Act Section 138'],
    status: 'under_review',
    court_name: 'Chief Metropolitan Magistrate Court, Dhaka',
    next_hearing_date: '2026-11-28',
    private_notes: [
      { date: '2026-11-12', note: 'Cheque return memo received with memo date stamped.' }
    ],
    documents: ['Dishonoured_Cheque_Scan.pdf', 'Legal_Notice_Served.pdf']
  });

  // 6. Seed Messages
  db.insert('messages', {
    id: 1,
    sender_id: 1,
    receiver_id: 2,
    appointment_id: 'LBD-2026-8914',
    message_text: 'Assalamu Alaikum Barrister Tanvir. I have uploaded the certified copy of my land deed and the RS Khatian for our upcoming consultation.',
    attachments: ['Plot_Khatian_Copy.pdf'],
    is_read: true,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  });

  db.insert('messages', {
    id: 2,
    sender_id: 2,
    receiver_id: 1,
    appointment_id: 'LBD-2026-8914',
    message_text: 'Walaikum Assalam Rahim Saheb. I reviewed your RS Khatian. We have a clear title chain. I will walk you through filing under Section 7 of the Land Crime Act 2023 during our video consultation tomorrow.',
    attachments: [],
    is_read: false,
    created_at: new Date(Date.now() - 1800000).toISOString()
  });

  // 7. Seed Emergency Resources
  const emergencyResources = [
    {
      id: 1,
      title: 'National Legal Aid Services Helpline',
      bangla_title: 'জাতীয় আইনগত সহায়তা সংস্থা (টোল-ফ্রি)',
      number: '16430',
      timing: '24/7 Toll Free',
      description: 'Free legal aid, counsel appointment, and advice funded by the Ministry of Law, Justice & Parliamentary Affairs.',
      category: 'Legal Aid'
    },
    {
      id: 2,
      title: 'National Emergency Service (Police / Fire / Ambulance)',
      bangla_title: 'জাতীয় জরুরি সেবা (পুলিশ, ফায়ার ও অ্যাম্বুলেন্স)',
      number: '999',
      timing: '24/7 Toll Free',
      description: 'Immediate police intervention, physical safety, rescue, and crime reporting.',
      category: 'Police'
    },
    {
      id: 3,
      title: 'National Helpline for Violence Against Women and Children',
      bangla_title: 'নারী ও শিশু নির্যাতন প্রতিরোধে জাতীয় হেল্পলাইন',
      number: '109',
      timing: '24/7 Toll Free',
      description: 'Crisis response, shelter home support, OCC referral, and domestic abuse rescue.',
      category: 'Women & Child'
    },
    {
      id: 4,
      title: 'Child Helpline Bangladesh',
      bangla_title: 'শিশু হেল্পলাইন',
      number: '1098',
      timing: '24/7 Toll Free',
      description: 'Dedicated protection for vulnerable children, child labor rescue, and emergency shelter.',
      category: 'Child'
    },
    {
      id: 5,
      title: 'CID Cyber Police Centre (CPC)',
      bangla_title: 'সিআইডি সাইবার পুলিশ সেন্টার',
      number: '01320-010148',
      timing: '24 Hours Operational',
      description: 'Investigation of online blackmail, intimate photo extortion, account hacking, and mobile financial fraud.',
      category: 'Cybercrime'
    },
    {
      id: 6,
      title: 'Police Cyber Support for Women (PCSW)',
      bangla_title: 'পুলিশ সাইবার সাপোর্ট ফর উইমেন',
      number: '01320-000888',
      timing: '24 Hours Operational',
      description: 'Confidential digital safety and reporting unit managed exclusively by female police officers.',
      category: 'Cybercrime'
    }
  ];
  emergencyResources.forEach(res => db.insert('emergency_resources', res));

  // 8. Seed Bilingual Legal Dictionary
  const dictionaryTerms = [
    {
      id: 1,
      term: 'FIR (First Information Report)',
      bangla: 'এজাহার / প্রথম তথ্য বিবরণী',
      category: 'Criminal Law',
      citation: 'Section 154 CrPC',
      definition: 'The initial written information recorded by police when a cognizable crime (murder, theft, rape, robbery) has been committed, triggering formal police investigation and arrest power without warrant.'
    },
    {
      id: 2,
      term: 'General Diary (GD)',
      bangla: 'সাধারণ ডায়েরি (জিডি)',
      category: 'Criminal Law',
      citation: 'Section 44 Police Act 1861',
      definition: 'A daily police register kept at every Thana. Citizens file a GD for preventive safety, lost documents (NID, passport, bank check), or threats of future injury.'
    },
    {
      id: 3,
      term: 'Anticipatory Bail (Agam Jamin)',
      bangla: 'আগাম জামিন',
      category: 'Criminal Law',
      citation: 'Section 498 CrPC',
      definition: 'Pre-arrest bail granted exclusively by the High Court Division when a citizen reasonably apprehends unlawful or politically motivated arrest in a non-bailable case before being physically detained.'
    },
    {
      id: 4,
      term: 'Mutation (Namjari)',
      bangla: 'নামজারি / জমাভাগ',
      category: 'Land & Property',
      citation: 'State Acquisition and Tenancy Act 1950',
      definition: 'The legal administrative process of recording a new buyer or heir’s name in the government land revenue records (Khatian) at the Upazila AC Land office, replacing the seller’s name.'
    },
    {
      id: 5,
      term: 'Denmohur (Dower)',
      bangla: 'দেনমোহর',
      category: 'Family Law',
      citation: 'Section 10 Muslim Family Laws Ordinance 1961',
      definition: 'A mandatory sum of money or property pledged by the husband to the wife in the Nikahnama. Prompt dower must be paid upon demand; deferred dower becomes mandatory upon dissolution of marriage.'
    },
    {
      id: 6,
      term: 'Cognizable Offence',
      bangla: 'আমলযোগ্য অপরাধ',
      category: 'Criminal Law',
      citation: 'Section 4(1)(f) CrPC',
      definition: 'A category of severe offences where a police officer may arrest the accused without a court warrant and begin an investigation without an order from the Magistrate.'
    },
    {
      id: 7,
      term: 'Temporary Injunction',
      bangla: 'অস্থায়ী নিষেধাজ্ঞা',
      category: 'Civil Law',
      citation: 'Order 39 Rules 1 & 2 CPC',
      definition: 'A judicial restraining order prohibiting a party from altering, selling, constructing upon, or destroying a disputed property pending the final judgment of the court.'
    },
    {
      id: 8,
      term: 'Habeas Corpus',
      bangla: 'হেবিয়াস কর্পাস (বন্দী প্রদর্শন রিট)',
      category: 'Constitutional Law',
      citation: 'Article 102(2)(b)(i) Constitution of Bangladesh',
      definition: 'A constitutional writ petition to the High Court Division demanding that an illegally detained or abducted person be brought before the court to verify the legality of detention.'
    }
  ];
  dictionaryTerms.forEach(term => db.insert('dictionary', term));

  // 9. Seed Downloadable Legal Templates
  const templates = [
    {
      id: 'template-ni-act-138',
      title: 'Statutory Legal Notice under Section 138 NI Act',
      bangla_title: 'চেক বাউন্সের লিগ্যাল নোটিশের ড্রাফট',
      category: 'Cheque Dishonour',
      format: 'DOCX & PDF Printable',
      description: 'Complete legal notice draft required within 30 days of receiving Cheque Return Memo from the bank.',
      content: `LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

To:
[Drawer Full Name]
Son/Daughter of: [Father Name]
Address: [Present & Permanent Address]

Under instructions and on behalf of my client [Complainant Name], residing at [Address], I hereby serve upon you this Statutory Legal Notice:

1. That in discharge of your legally enforceable debt, you issued a Cheque bearing No: [Cheque Number], dated [Date], for an amount of BDT [Amount in Figures] (Taka [Amount in Words]) drawn on [Bank Name], [Branch Name].
2. That my client presented the said cheque for encashment, but the same was dishonoured and returned unpaid by the bank with the memo dated [Return Memo Date] for the reason: "INSUFFICIENT FUNDS".
3. That by this notice, you are hereby requested to pay the full amount of BDT [Amount] to my client within 30 (thirty) days from the date of receipt of this notice, failing which my client will institute criminal proceedings against you under Section 138 of the Negotiable Instruments Act, 1881 before the competent Court of Law.

Advocate, Supreme Court of Bangladesh / Judge Court`
    },
    {
      id: 'template-gd-application',
      title: 'General Diary (GD) Application for Lost Documents / Threats',
      bangla_title: 'থানায় সাধারণ ডায়েরি (জিডি) করার আবেদন ফরম',
      category: 'Police & Criminal',
      format: 'DOCX & PDF Printable',
      description: 'Official format for filing a GD at the local Thana for lost certificates, passport, NID, or personal safety threats.',
      content: `বরাবর,
অফিসার ইনচার্জ (ওসি)
[থানার নাম], [জেলা]।

বিষয়: সাধারণ ডায়েরি (GD) করার আবেদন।

জনাব,
বিনীত নিবেদন এই যে, আমি নিম্ন স্বাক্ষরকারী [আপনার পূর্ণ নাম], পিতা: [পিতার নাম], মাতা: [মাতার নাম], বর্তমান ঠিকানা: [ঠিকানা], জাতীয় পরিচয়পত্র নং: [NID নম্বর], এই মর্মে জানাচ্ছি যে-

গত [তারিখ] আনুমানিক [সময়] ঘটিকায় [স্থান]-এ আমার নিম্নবর্ণিত প্রয়োজনীয় কাগজপত্র/বস্তু হারিয়ে যায় / অমুক ব্যক্তি আমাকে মোবাইল ফোনে হুমকি প্রদান করে।

হারিয়ে যাওয়া কাগজের বিবরণ:
১. [কাগজের নাম ও নম্বর]

অতএব, বিষয়টি আপনার থানার সাধারণ ডায়েরিতে অন্তর্ভুক্ত করার জন্য বিনীত প্রার্থনা জানাচ্ছি।

বিনীত,
[স্বাক্ষর]
মোবাইল: [নম্বর]`
    },
    {
      id: 'template-labour-grievance',
      title: 'Section 33 Grievance Application to Employer',
      bangla_title: 'শ্রম আইনের ৩৩ ধারায় মালিক বরাবর অভিযোগনামা',
      category: 'Labour Law',
      format: 'DOCX & PDF Printable',
      description: 'Mandatory written notice to the employer within 30 days of wrongful termination or unpaid wages.',
      content: `FORMAL GRIEVANCE NOTICE UNDER SECTION 33 OF THE BANGLADESH LABOUR ACT, 2006

Date: [Date]
To:
The Managing Director / Head of HR
[Company Name]
[Address]

Subject: Grievance under Section 33 of the Bangladesh Labour Act 2006 regarding [Unpaid Wages / Illegal Termination].

Dear Sir,
I, [Employee Name], designated as [Designation], ID No: [Employee ID], joined your establishment on [Joining Date].

1. On [Date], my employment was terminated abruptly without complying with Section 26 or 27 of the Labour Act.
2. My earned salary for [Months] and statutory severance dues totaling BDT [Amount] remain unpaid.

In accordance with Section 33(1) of the Bangladesh Labour Act 2006, I hereby submit this grievance and request you to settle my lawful dues within 30 days, failing which I shall be compelled to seek redress before the learned Chairman, Labour Court.

Sincerely,
[Employee Signature]`
    }
  ];
  templates.forEach(tpl => db.insert('checklists', tpl));

  // 10. Audit log
  db.logAudit(99, 'SYSTEM_INIT', 'DATABASE', 'ALL', 'Initial seeds inserted successfully', '127.0.0.1');

  db.saveSync();
  console.log('Seed completed successfully.');
}
