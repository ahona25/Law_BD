export const dictionaryCategories = [
  'All Terms',
  'Criminal Law',
  'Civil & Property',
  'Family Law',
  'Court Procedures'
];

export const legalTerms = [
  {
    id: 1,
    term: 'FIR (First Information Report)',
    bangla: 'এজাহার / প্রথম তথ্য বিবরণী',
    category: 'Criminal Law',
    pronunciation: 'First Information Report (Section 154 CrPC)',
    definition:
      'The initial written information recorded by the police officer-in-charge when a cognizable crime (such as murder, theft, rape, or grievous assault) has been committed. It triggers formal police investigation and empowers police to arrest the suspect without court warrant.'
  },
  {
    id: 2,
    term: 'General Diary (GD)',
    bangla: 'সাধারণ ডায়েরি (জিডি)',
    category: 'Criminal Law',
    pronunciation: 'Section 44 Police Act 1861',
    definition:
      'A daily police register record kept at every Thana. Citizens file a GD for preventive safety, lost documents (e.g., NID, passport, bank check, certificates), threats of future harm, or non-cognizable incidents where police cannot investigate without Magistrate permission.'
  },
  {
    id: 3,
    term: 'Bail (Jamin)',
    bangla: 'জামিন (Bail)',
    category: 'Criminal Law',
    pronunciation: 'Sections 496, 497 CrPC',
    definition:
      'The temporary conditional release of an accused person awaiting trial upon providing security or sureties ensuring they will appear in court whenever required. Bailable offences allow bail as an absolute right; non-bailable offences leave it to judicial discretion.'
  },
  {
    id: 4,
    term: 'Anticipatory Bail (Agam Jamin)',
    bangla: 'আগাম জামিন',
    category: 'Criminal Law',
    pronunciation: 'Section 498 CrPC',
    definition:
      'A pre-arrest bail granted exclusively by the High Court Division of Bangladesh when a citizen reasonably apprehends unlawful or politically motivated arrest in a non-bailable accusation before being physically taken into custody.'
  },
  {
    id: 5,
    term: 'Cognizable Offence',
    bangla: 'আমলযোগ্য অপরাধ',
    category: 'Criminal Law',
    pronunciation: 'Section 4(1)(f) CrPC',
    definition:
      'A category of serious crimes where a police officer may, in accordance with the First Schedule of CrPC or any other law, arrest the accused without an arrest warrant from a Magistrate and immediately commence investigation.'
  },
  {
    id: 6,
    term: 'Injunction (Nishedhagna)',
    bangla: 'নিষেধাজ্ঞা / অন্তর্বর্তীকালীন স্থগিতাদেশ',
    category: 'Civil & Property',
    pronunciation: 'Order 39 Code of Civil Procedure & Specific Relief Act',
    definition:
      'A judicial order prohibiting a party from doing a specific act (temporary or permanent injunction), commonly used in land disputes to prevent demolition, construction, or unauthorized transfer until the final ownership decree is reached.'
  },
  {
    id: 7,
    term: 'Khatian / Porcha',
    bangla: 'খতিয়ান / পরচা',
    category: 'Civil & Property',
    pronunciation: 'Record of Rights (RoR)',
    definition:
      'The official land record prepared during governmental land surveys (CS, SA, RS, BS/City Survey) reflecting the owner’s name, share, plot number (দাগ নম্বর), area, classification of land, and rent details.'
  },
  {
    id: 8,
    term: 'Mutation (Namjari / Jomakharij)',
    bangla: 'নামজারি ও জমাখারিজ',
    category: 'Civil & Property',
    pronunciation: 'State Acquisition and Tenancy Act',
    definition:
      'The legal administrative process of recording the new owner’s name in the government revenue register (AC Land office) following a purchase, inheritance, or gift, separating their rent liability into an independent Khatian.'
  },
  {
    id: 9,
    term: 'DCR (Duplicate Carbon Receipt)',
    bangla: 'ডিসিআর (Duplicate Carbon Receipt)',
    category: 'Civil & Property',
    pronunciation: 'Mutation fee receipt',
    definition:
      'The official government treasury receipt issued by the Assistant Commissioner (Land) office acknowledging payment of the government mutation fee upon completion of the Namjari process.'
  },
  {
    id: 10,
    term: 'Kabinnama / Nikahnama',
    bangla: 'নিকাহনামা / কাবিননামা',
    category: 'Family Law',
    pronunciation: 'Muslim Marriages Registration Act 1974',
    definition:
      'The legal marriage contract under Muslim law, registered by a licensed Kazi. It documents essential covenants including the dower (দেনমোহর), prompt vs deferred portion, and whether the wife has the delegated right to divorce (Talaq-e-Tawfeez, Clause 18).'
  },
  {
    id: 11,
    term: 'Denmohur (Dower)',
    bangla: 'দেনমোহর',
    category: 'Family Law',
    pronunciation: 'Family Courts Act',
    definition:
      'A mandatory sum of money or property that the husband must legally pay or promise to pay to the wife in consideration of marriage. It is the wife’s exclusive asset, cannot be forgiven under duress, and remains a recoverable debt.'
  },
  {
    id: 12,
    term: 'Khorposh (Maintenance)',
    bangla: 'খোরপোশ / ভরণপোষণ',
    category: 'Family Law',
    pronunciation: 'Section 9 MFLO 1961',
    definition:
      'The legal obligation of a husband or father to provide necessary food, clothing, housing, medical care, and education to his wife during marriage, during the 90-day Iddat period after divorce, and to his minor children until adulthood.'
  },
  {
    id: 13,
    term: 'Habeas Corpus Writ',
    bangla: 'হেবিয়াস কর্পাস (বন্দী প্রদর্শন রিট)',
    category: 'Court Procedures',
    pronunciation: 'Article 102(2)(b)(i) Constitution of Bangladesh',
    definition:
      'A constitutional writ petition filed before the High Court Division directing the state, police, or private individual to produce an illegally detained or abducted person before the court to determine whether the detention has lawful authority.'
  },
  {
    id: 14,
    term: 'Charge Sheet (Abhijogpotro)',
    bangla: 'চার্জশিট / অভিযোগপত্র',
    category: 'Criminal Law',
    pronunciation: 'Section 173 CrPC',
    definition:
      'The final formal report submitted by the police investigating officer to the Magistrate or court, concluding that sufficient evidence exists to prove the accused committed the alleged crime and requesting trial.'
  },
  {
    id: 15,
    term: 'Power of Attorney (Ammoktarnama)',
    bangla: 'আমমোক্তারনামা',
    category: 'Civil & Property',
    pronunciation: 'Power of Attorney Act 2012',
    definition:
      'A legally registered instrument authorizing a chosen agent or representative to execute legal, financial, or property transactions on behalf of the principal, frequently utilized by non-resident Bangladeshis (NRBs).'
  },
  {
    id: 16,
    term: 'Caveat (Khabiet)',
    bangla: 'ক্যাভিয়েট (সতর্কতামূলক আবেদন)',
    category: 'Court Procedures',
    pronunciation: 'Section 148A CPC',
    definition:
      'A formal precautionary notice filed in court by an interested party requesting that no adverse or ex-parte interim order or injunction be passed against them without prior notice and hearing.'
  }
];
