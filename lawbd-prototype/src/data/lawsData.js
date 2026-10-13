export const lawCategories = [
  { id: 'all', name: 'All Legal Topics', icon: '⚖', count: '12 Areas' },
  { id: 'family', name: 'Family & Divorce', icon: '♡', count: 'Custody & Dower' },
  { id: 'criminal', name: 'Criminal Law & Bail', icon: '⚔', count: 'Penal Code & CrPC' },
  { id: 'property', name: 'Land & Property', icon: '⌂', count: 'Records & Disputes' },
  { id: 'cyber', name: 'Cybercrime & Harassment', icon: '⌘', count: 'Digital Security' },
  { id: 'domestic', name: 'Domestic Violence', icon: '🛡', count: "Women & Child Rights" },
  { id: 'cheque', name: 'Cheque Dishonour & Fraud', icon: '৳', count: 'NI Act 138' },
  { id: 'labour', name: 'Labour & Workplace', icon: '💼', count: 'Wages & Rights' },
  { id: 'consumer', name: 'Consumer & Contracts', icon: '📜', count: 'Breach & Claims' }
];

export const lawsList = [
  {
    id: 'law-divorce-family',
    title: 'Divorce, Dower (Denmohur) & Maintenance',
    banglaTitle: 'তালাক, দেনমোহর এবং ভরণপোষণ সংক্রান্ত আইন',
    category: 'family',
    categoryLabel: 'Family & Divorce',
    tag: 'Family Court Ordinance 1985',
    acts: [
      'Muslim Family Laws Ordinance, 1961 (Section 7 & 9)',
      'Family Courts Act, 2023 / Family Court Ordinance, 1985',
      'Dissolution of Muslim Marriages Act, 1939'
    ],
    simpleSummary:
      'Under Bangladeshi law, both husband and wife have defined rights regarding marriage dissolution. When a husband pronounces Talaq, he must send written notice to the local Union Parishad Chairman / City Mayor and a copy to the wife. A 90-day reconciliation period is mandatory before divorce becomes effective. The wife is legally entitled to her full remaining Dower (Denmohur) and maintenance (Khorposh) during the Iddat period. Denmohur cannot be waived forcibly under any circumstance.',
    keyProvisions: [
      'Written notice to Union Parishad / City Corporation Arbitration Council is compulsory under Section 7.',
      'Arbitration council tries reconciliation within 30 days of receiving notice.',
      'If not reconciled, Talaq becomes legally effective after 90 days from notice date.',
      'Prompt Dower must be paid on demand; Deferred Dower is mandatory upon dissolution of marriage.',
      'Failure to send official notice carries punishment of imprisonment up to 1 year or a fine up to ৳10,000.'
    ],
    procedureSteps: [
      { step: 1, title: 'Send Written Notice', desc: 'Send registered post notice to local Chairman/Mayor and a copy to the spouse via registered post with A/D.' },
      { step: 2, title: 'Arbitration Council Notice', desc: 'Arbitration Council issues notice to both parties to attend reconciliation meetings.' },
      { step: 3, title: '90-Day Waiting Period', desc: 'Divorce takes legal effect after 90 days from date Chairman received the notice.' },
      { step: 4, title: 'File Suit for Dower/Maintenance', desc: 'If Denmohur or maintenance is withheld, file a suit in the Family Court (court fee is minimal: ৳25-50).' },
      { step: 5, title: 'Decree & Execution', desc: 'Family Court issues decree for payment; non-compliance may lead to civil detention of the defaulter.' }
    ],
    penalties: 'Non-compliance with Section 7 notice: Imprisonment up to 1 year or fine up to ৳10,000. Willful default on Family Court maintenance decree results in civil jail until compliance.',
    requiredDocuments: [
      'Original Nikahnama (Kabinnama) / Marriage Registration Certificate',
      'National ID (NID) copy of applicant',
      'Postal receipts of Talaq notices sent via registered post',
      'Bank statements or proof of income of husband for maintenance calculation',
      'Birth certificates of children (if custody/maintenance involved)'
    ],
    immediateActions: [
      'Collect certified copy of Nikahnama from the Kazi office where registered.',
      'Always send notices via registered post with Acknowledgment Due (A/D) to maintain proof of delivery.',
      'Do not sign any blank stamps or compromise deed without lawyer verification.'
    ],
    specialistMatch: 'Family & Divorce'
  },
  {
    id: 'law-child-custody',
    title: 'Child Custody & Guardianship (Hizanat)',
    banglaTitle: 'সন্তানের হেফাজত এবং অভিভাবকত্ব আইন',
    category: 'family',
    categoryLabel: 'Family & Divorce',
    tag: 'Guardian and Wards Act 1890',
    acts: [
      'The Guardian and Wards Act, 1890 (Section 17 & 25)',
      'Family Courts Act, 2023',
      'Principles of Muslim Law (Hizanat)'
    ],
    simpleSummary:
      'Under Bangladeshi law, the legal guardian of the child is the father, but the mother has the right to physical custody (Hizanat) during tender years (for sons up to age 7, and for daughters up to puberty under Hanafi law). However, the Supreme Court of Bangladesh has repeatedly ruled that the paramount consideration in deciding custody is ALWAYS the "Welfare of the Child", overriding rigid age limits if necessary.',
    keyProvisions: [
      'Father remains legally responsible for all financial maintenance of the children regardless of custody.',
      'Custody is determined strictly based on child’s health, education, emotional well-being, and moral environment.',
      'The parent without custody has an absolute right to visitation (visiting rights).',
      'Mother does not automatically lose custody upon remarriage if the court finds it serves the child’s best interest.'
    ],
    procedureSteps: [
      { step: 1, title: 'File Guardianship Petition', desc: 'File application under Section 25 of the Guardian and Wards Act in the Family Court.' },
      { step: 2, title: 'Interim Custody Hearing', desc: 'Court can pass immediate interim orders for custody and weekend visitation.' },
      { step: 3, title: 'In-Chamber Child Interview', desc: 'Judge may interview the child in confidential chamber to gauge preferences.' },
      { step: 4, title: 'Final Judgment & Visitation Schedule', desc: 'Court determines long-term custody, maintenance quantum, and detailed holiday visitation schedules.' }
    ],
    penalties: 'Abducting or concealing a child in violation of court custody order is punishable under contempt of court and Section 363 of the Penal Code.',
    requiredDocuments: [
      'Child’s birth registration certificate / school records',
      'Parents’ Nikahnama / divorce notice records',
      'Proof of child expenses (school fees, medical, living expenses)',
      'Evidence showing safe living conditions and caregiving ability'
    ],
    immediateActions: [
      'Never use physical force to snatch a child; always approach the Family Court or High Court (Habeas Corpus).',
      'Keep comprehensive records of all education, medical, and routine expenditures incurred for the child.'
    ],
    specialistMatch: 'Family & Divorce'
  },
  {
    id: 'law-theft-robbery',
    title: 'Theft, Snatching, Robbery & Stolen Property',
    banglaTitle: 'চুরি, ছিনতাই, ডাকাতি এবং চোরাই মাল সংক্রান্ত আইন',
    category: 'criminal',
    categoryLabel: 'Criminal Law & Bail',
    tag: 'Penal Code 1860, Sec 378-414',
    acts: [
      'The Penal Code, 1860 (Sections 378, 379, 380, 392, 411)',
      'The Code of Criminal Procedure, 1898 (CrPC)'
    ],
    simpleSummary:
      'Theft occurs when someone dishonestly takes movable property out of the possession of any person without consent. If theft happens inside a dwelling house or building, it carries harsher penalties. Snatching and robbery involve violence or fear of instant hurt. Buying or possessing stolen goods knowingly is also a criminal offence.',
    keyProvisions: [
      'Simple theft (Section 379): Dishonestly taking property out of possession.',
      'Theft in dwelling house / office (Section 380): Non-bailable and severe punishment.',
      'Robbery / Extortion (Section 392): Theft committed by causing or threatening instant death or hurt.',
      'Dishonestly receiving stolen property (Section 411): Offender faces same rigor as thief.'
    ],
    procedureSteps: [
      { step: 1, title: 'Lodge FIR / GD at Police Station', desc: 'Immediately visit the local Thana having jurisdiction where the incident occurred. Submit written complaint.' },
      { step: 2, title: 'Investigation & Seizure List', desc: 'Police inspect crime scene, prepare seizure list (জব্দতালিকা), and register formal FIR.' },
      { step: 3, title: 'Arrest & Remand', desc: 'Police arrest suspect. If further recovery needed, police may pray for remand before Magistrate.' },
      { step: 4, title: 'Charge Sheet / Final Report', desc: 'Investigating Officer submits Section 173 CrPC Charge Sheet or Final Report.' },
      { step: 5, title: 'Trial & Jimmy Petition', desc: 'Owner files Jimmy (জিম্মা) application under Section 516A/517 CrPC to recover seized belongings.' }
    ],
    penalties: 'Section 379: Imprisonment up to 3 years, or fine, or both. Section 380 (dwelling house): Imprisonment up to 7 years and fine. Section 392 (robbery): Rigorous imprisonment up to 10 years (14 years if on highway between sunset and sunrise).',
    requiredDocuments: [
      'Purchase receipts / invoices / IMEI numbers (for electronics, mobiles, vehicles)',
      'CCTV footage / photo evidence / eyewitness names',
      'Written statement with date, exact time, and location of the incident',
      'Ownership documents or deed of title'
    ],
    immediateActions: [
      'For lost mobile/gadgets: File online GD immediately via Bangladesh Police Citizen Portal or visit Thana.',
      'Block SIM cards, freeze linked mobile financial services (bKash/Nagad), and change online credentials.',
      'Collect official GD / FIR number for police tracking.'
    ],
    specialistMatch: 'Criminal Law'
  },
  {
    id: 'law-bail-procedure',
    title: 'Bail Laws & Criminal Defense (Anticipatory & Regular Bail)',
    banglaTitle: 'জামিন আইন ও ফৌজদারি প্রতিরক্ষা (আগাম ও নিয়মিত জামিন)',
    category: 'criminal',
    categoryLabel: 'Criminal Law & Bail',
    tag: 'CrPC 1898, Sec 496, 497, 498',
    acts: [
      'The Code of Criminal Procedure, 1898 (Sections 496, 497, 498, 498A)',
      'The High Court Rules (Anticipatory Bail Guidelines)'
    ],
    simpleSummary:
      'In Bangladesh, offences are divided into Bailable and Non-Bailable. In bailable offences (Sec 496), bail is a matter of right. In non-bailable offences (Sec 497), granting bail is the court’s discretion, considering health, age, nature of accusation, and risk of absconding. Anticipatory Bail (আগাম জামিন under Sec 498) is sought before arrest directly from the High Court Division to prevent unlawful harassment.',
    keyProvisions: [
      'Bailable offence: Police or Magistrate is legally bound to grant bail upon furnishing bail bond.',
      'Non-bailable offence: Bail can be granted by Magistrate or Sessions Court if grounds are satisfied.',
      'Anticipatory bail: Only High Court Division can grant anticipatory bail for a limited period (typically 4-8 weeks) directing surrender to Sessions Court.',
      'Sick, infirm, minor, or female accused persons enjoy special leniency under proviso to Section 497(1).'
    ],
    procedureSteps: [
      { step: 1, title: 'Ascertain Case Number & FIR', desc: 'Obtain certified copy of FIR / GD / CR case petition and seizure list from court.' },
      { step: 2, title: 'Draft Bail Application', desc: 'Lawyer prepares grounds of bail highlighting innocence, lack of overt act, and roots in society.' },
      { step: 3, title: 'Hearing before Magistrate / Sessions Judge', desc: 'Advocate argues the bail petition. If rejected, move criminal miscellaneous petition to Sessions Court.' },
      { step: 4, title: 'High Court Appeal / Motion', desc: 'If Sessions Court denies bail, file criminal miscellaneous petition under Section 498 CrPC in High Court Division.' },
      { step: 5, title: 'Furnish Bail Bond & Release', desc: 'Submit bail bond with local sureties. Court issues release order (খালাস পরোয়ানা) to Central Jail.' }
    ],
    penalties: 'Violating bail conditions or absconding results in bail cancellation, forfeiture of surety bond, and issuance of Non-Bailable Arrest Warrant (WA).',
    requiredDocuments: [
      'Certified copy of FIR / Complaint petition',
      'Certified copy of rejection order of lower court (if moving higher court)',
      'Medical certificates (if applying on medical grounds)',
      'National ID cards and land documents of local bailors (sureties)'
    ],
    immediateActions: [
      'Do not evade police without legal counsel; contact an Advocate immediately to prepare anticipatory bail if apprehending arrest.',
      'Ensure reliable local sureties (bailors) with valid NID and tax/utility documents are ready.'
    ],
    specialistMatch: 'Criminal Law'
  },
  {
    id: 'law-land-disputes',
    title: 'Land Ownership, Khatian Records & Illegal Possession',
    banglaTitle: 'জমির মালিকানা, খতিয়ান রেকর্ড ও অবৈধ দখল উচ্ছেদ',
    category: 'property',
    categoryLabel: 'Land & Property',
    tag: 'Land Crime Prevention Act 2023',
    acts: [
      'Land Crime Prevention and Redress Act, 2023',
      'The Transfer of Property Act, 1882',
      'The Specific Relief Act, 1877 (Sections 8, 9, 42, 54)',
      'Code of Criminal Procedure, 1898 (Section 145 & 144)'
    ],
    simpleSummary:
      'Land disputes in Bangladesh are among the most common civil disputes. Under the newly enacted Land Crime Prevention and Redress Act 2023, forging land documents, illegal land grabbing, and creating duplicate title deeds are recognized as serious non-bailable criminal offences punishable by rigorous imprisonment. Legitimate ownership requires a chain of valid deeds, up-to-date Khatian (CS, SA, RS, BS), mutation (নামজারি), and land development tax (খাজনা) receipts.',
    keyProvisions: [
      'Land Crime Prevention Act 2023: Land grabbing and forging deeds punishable up to 7 years imprisonment.',
      'Section 145 CrPC: Executive Magistrate can intervene in disputes concerning land likely to cause breach of peace.',
      'Section 9 Specific Relief Act: Summary suit for restoration of possession if dispossessed without consent within 6 months.',
      'Section 42 Specific Relief Act: Declaration of title suit in Civil Court (Joint District Judge).'
    ],
    procedureSteps: [
      { step: 1, title: 'Verify Records at AC Land Office', desc: 'Check Mutation Khatian, DCR, and verify RS/BS record matches ground possession.' },
      { step: 2, title: 'File Sec 144/145 CrPC if Threatened', desc: 'If rival party threatens violent dispossession, move Executive Magistrate Court for restraining order.' },
      { step: 3, title: 'Lodge Case under Land Crime Act 2023', desc: 'File criminal complaint with police or Magistrate Court for forged documents or land grabbing.' },
      { step: 4, title: 'File Title Suit / Injunction in Civil Court', desc: 'File civil suit for declaration of title and permanent injunction against encroachment.' },
      { step: 5, title: 'Execution of Possession Decree', desc: 'Execute decree with court bailiff and police assistance if necessary.' }
    ],
    penalties: 'Under Land Crime Act 2023: Up to 7 years rigorous imprisonment and heavy financial penalties for land grabbing, false deed creation, and concealment of co-sharer rights.',
    requiredDocuments: [
      'Original registered Sale Deed (মূল কবলা দলিল) and previous chain deeds (বায়া দলিল)',
      'Latest Mutation Khatian (নামজারি খতিয়ান) and DCR receipt',
      'Up-to-date Land Development Tax (দাখিলা / খাজনার রশিদ)',
      'CS, SA, RS, BS Khatian copies from District Record Room',
      'Field survey map / Mouza map and demarcation sketch'
    ],
    immediateActions: [
      'Never leave vacant land unfenced; construct boundary wall and install name board with deed details.',
      'Pay land tax online annually through the Bangladesh Land Ministry portal (land.gov.bd).',
      'Obtain non-encumbrance certificate (NEC) from Sub-Registry office before purchasing any land.'
    ],
    specialistMatch: 'Land & Property'
  },
  {
    id: 'law-cyber-crime',
    title: 'Cyber Harassment, Online Fraud & Digital Safety',
    banglaTitle: 'অনলাইন প্রতারণা, সাইবার হেনস্তা ও ডিজিটাল নিরাপত্তা আইন',
    category: 'cyber',
    categoryLabel: 'Cybercrime & Harassment',
    tag: 'Cyber Security Act 2023',
    acts: [
      'Cyber Security Act, 2023 (Sections 21, 24, 25, 28)',
      'The Penal Code, 1860 (Cheating Section 415/420)',
      'The Information and Communication Technology Act, 2006'
    ],
    simpleSummary:
      'Cybercrime includes hacking accounts, identity theft, spreading manipulated intimate photos/blackmail, phishing scams, and financial fraud through mobile banking apps. Bangladesh law strictly prohibits publishing indecent or defaming materials electronically and committing fraud via computer devices. Victims can seek immediate intervention through Thana, Cyber Crime Investigation Division (CID), and National Cyber Security Agency.',
    keyProvisions: [
      'Identity theft and impersonation: Operating fake profile to defraud is a punishable offence.',
      'Blackmail with intimate pictures: Offence under CSA and Pornography Control Act 2012 carries severe imprisonment.',
      'Financial fraud (bKash/Nagad scams): Investigated jointly under Cyber Security Act and Penal Code 420.',
      'Cyber Police Centre hotline (01320010148) provides 24/7 technical and emergency assistance.'
    ],
    procedureSteps: [
      { step: 1, title: 'Preserve Digital Evidence', desc: 'Capture unedited full-screen screenshots showing profile URLs, timestamps, message headers, and transaction IDs.' },
      { step: 2, title: 'Report to Cyber Crime Helpdesk', desc: 'Contact Police Cyber Support for Women (PCSW) or CID Cyber Centre via hotline/Facebook page.' },
      { step: 3, title: 'File GD / FIR at Thana', desc: 'Lodge formal GD or FIR at nearest police station with printed screenshots and digital media on pen drive.' },
      { step: 4, title: 'BTRC URL Blocking Request', desc: 'Investigating officer or victim petitions Bangladesh Telecommunication Regulatory Commission (BTRC) to take down offensive links.' },
      { step: 5, title: 'Cyber Tribunal Trial', desc: 'Case tried before the designated Cyber Tribunal in Dhaka / Divisional headquarters.' }
    ],
    penalties: 'Rigorous imprisonment up to 5 years and fine up to ৳25 Lakh for identity theft, hacking, and online extortion. Under Pornography Control Act: Up to 10 years rigorous imprisonment.',
    requiredDocuments: [
      'High-resolution screenshots with visible URLs, phone numbers, and timestamps',
      'Transaction IDs / MFS statements (bKash/Nagad/Rocket) for financial scams',
      'Audio call recordings or screen recordings of extortion calls',
      'Link of fake profile / group / channel'
    ],
    immediateActions: [
      'Do not delete chats or block offender before taking screenshots with complete URL links.',
      'Never send ransom money via bKash; report immediately to Police Cyber Support.',
      'Immediately activate Two-Factor Authentication (2FA) on all email and social accounts.'
    ],
    specialistMatch: 'Cybercrime'
  },
  {
    id: 'law-domestic-violence',
    title: 'Domestic Violence, Protection Orders & Dowry Prohibition',
    banglaTitle: 'পারিবারিক সহিংসতা প্রতিরোধ, সুরক্ষা আদেশ ও যৌতুক নিরোধ আইন',
    category: 'domestic',
    categoryLabel: 'Domestic Violence',
    tag: 'Domestic Violence Act 2010',
    acts: [
      'Domestic Violence (Prevention and Protection) Act, 2010',
      'Dowry Prohibition Act, 2018',
      'Nari O Shishu Nirjatan Daman Ain, 2000 (Amended 2020)'
    ],
    simpleSummary:
      'The law protects women and children from physical, psychological, sexual, and economic abuse within domestic relationships. Victims can obtain emergency "Protection Orders", "Residence Orders" (right to stay in shared household without expulsion), and monetary compensation from the Judicial Magistrate Court. Demanding dowry in connection with marriage is also a severe criminal offence.',
    keyProvisions: [
      'Definition of domestic violence includes mental torture, verbal abuse, economic deprivation, and physical hurt.',
      'Protection Orders: Magistrate can restrain the perpetrator from entering victim’s workplace or residence.',
      'Residence Order: Prohibits the respondent from evicting the victim from the shared household.',
      'Dowry Prohibition Act 2018: Demanding or giving dowry is punishable with up to 5 years imprisonment.',
      'Emergency helpline 109 (National Helpline for Violence Against Women and Children) provides immediate shelter and legal aid.'
    ],
    procedureSteps: [
      { step: 1, title: 'Medical Examination & Treatment', desc: 'If physically injured, immediately visit One-Stop Crisis Centre (OCC) at Dhaka Medical College or government hospital for certified medical report.' },
      { step: 2, title: 'Application to Magistrate Court', desc: 'File application under Section 11 of the 2010 Act directly or through Protection Officer/NGO for interim protection order.' },
      { step: 3, title: 'Passage of Interim Protection Order', desc: 'Court passes emergency order within 24-48 hours prohibiting perpetrator from approaching victim.' },
      { step: 4, title: 'Filing Police Case / OCC Report', desc: 'For heinous offences, lodge case under Nari O Shishu Nirjatan Daman Ain at Thana.' },
      { step: 5, title: 'Monetary Compensation & Residence', desc: 'Court awards monthly maintenance, medical reimbursement, and safe residence in final order.' }
    ],
    penalties: 'Breach of Protection Order: Imprisonment up to 6 months or fine up to ৳10,000 for first offence; up to 2 years imprisonment for repeated breach. Demanding Dowry: Imprisonment up to 5 years and fine.',
    requiredDocuments: [
      'Medical injury certificate (OCC / Government Hospital discharge summary)',
      'Marriage certificate (Nikahnama) and NID copy',
      'Photographs of physical injuries / damaged property',
      'Witness statements / audio recordings / abusive text messages'
    ],
    immediateActions: [
      'Call emergency hotline 109 or 999 for instant police dispatch and rescue.',
      'Go to the nearest government hospital One-Stop Crisis Centre (OCC) for medical evidence preservation.',
      'National Legal Aid (16430) provides free lawyers and financial litigation support.'
    ],
    specialistMatch: 'Domestic Violence'
  },
  {
    id: 'law-cheque-dishonour',
    title: 'Cheque Dishonour, Bounced Cheques & Financial Recovery',
    banglaTitle: 'চেক ডিজঅনার, চেক বাউন্স ও টাকা আদায়ের মামলা',
    category: 'cheque',
    categoryLabel: 'Cheque Dishonour & Fraud',
    tag: 'Negotiable Instruments Act, Sec 138',
    acts: [
      'The Negotiable Instruments Act, 1881 (Section 138, 140, 141)',
      'The Code of Criminal Procedure, 1898',
      'The Penal Code, 1860 (Section 420)'
    ],
    simpleSummary:
      'When a bank cheque bounces due to insufficient funds or account closure, the holder can file a criminal case under Section 138 of the NI Act. This law has extremely strict, non-extendable statutory limitation deadlines: you must present the cheque within 6 months, obtain bank memo, serve legal notice within 30 days, give 30 days time to pay, and file case in court within 30 days thereafter.',
    keyProvisions: [
      'Strict statutory timelines: Missing the 30-day legal notice period extinguishes criminal remedy under Sec 138.',
      'Cheque must be presented within 6 months of issue date or validity period.',
      'Drawer must be given 30 days from receipt of legal notice to make payment.',
      'If not paid, complaint must be filed before Chief Judicial Magistrate / CMM within 30 days after the expiry of notice period.'
    ],
    procedureSteps: [
      { step: 1, title: 'Bank Return Memo', desc: 'Present cheque to bank and obtain official "Cheque Return Memo" stating dishonour reason (e.g. Insufficient Funds).' },
      { step: 2, title: 'Serve Statutory Legal Notice', desc: 'Through an Advocate, send written legal notice within 30 days of receiving return memo via registered post with A/D.' },
      { step: 3, title: 'Wait 30 Days for Payment', desc: 'Allow 30 clear days for the drawer to pay the cheque amount from date of notice delivery.' },
      { step: 4, title: 'File C.R. Case in Court', desc: 'If drawer fails to pay, file complaint (CR Case) before CMM / CJM Court within the next 30 days.' },
      { step: 5, title: 'Trial & Judgment', desc: 'Case transferred to Sessions Court. Court can award double the cheque amount and imprisonment up to 1 year.' }
    ],
    penalties: 'Under Section 138 NI Act: Imprisonment for a term which may extend to 1 year, or with fine which may extend to twice the amount of the cheque, or with both.',
    requiredDocuments: [
      'Original dishonoured cheque and bank deposit slip',
      'Original Bank Cheque Return Memo with seal and signature',
      'Copy of Legal Notice served by Advocate',
      'Postal receipt and Acknowledgment Due (A/D) card or courier delivery confirmation'
    ],
    immediateActions: [
      'Track dates meticulously; calculate deadlines in a calendar immediately upon receiving bank return memo.',
      'Always send notice to both present and permanent addresses of the cheque drawer.',
      'Retain clear photocopies of the front and back of the original cheque.'
    ],
    specialistMatch: 'Cheque Dishonour'
  },
  {
    id: 'law-murder-offences',
    title: 'Homicide, Murder, Assault & Grevious Hurt',
    banglaTitle: 'হত্যা, মারাত্মক আঘাত ও দৈহিক অপরাধ সংক্রান্ত আইন',
    category: 'criminal',
    categoryLabel: 'Criminal Law & Bail',
    tag: 'Penal Code 1860, Sec 300, 302, 323-326',
    acts: [
      'The Penal Code, 1860 (Sections 299, 300, 302, 304, 323, 324, 325, 326)',
      'The Code of Criminal Procedure, 1898'
    ],
    simpleSummary:
      'Culpable homicide and murder are the most severe offences against human body under Bangladesh law. Causing intentional death without legal excuse constitutes murder under Section 302 of the Penal Code. Causing grievous hurt using dangerous weapons is prosecuted under Section 326. Immediate reporting, preservation of medical certificates (injury report/post-mortem), and forensic evidence are vital for prosecution and defense.',
    keyProvisions: [
      'Murder (Section 302): Punishable with death penalty or life imprisonment and fine.',
      'Culpable homicide not amounting to murder (Section 304): Imprisonment for life or up to 10 years.',
      'Voluntarily causing hurt / grievous hurt with dangerous weapons (Section 324/326): Up to life imprisonment or 10 years.',
      'Attempt to murder (Section 307): Imprisonment up to 10 years or life imprisonment.'
    ],
    procedureSteps: [
      { step: 1, title: 'Inquest & Post-Mortem Report', desc: 'Police prepare Surat-e-Hal (ইনকুয়েস্ট রিপোর্ট) and doctor conducts autopsy in government morgue.' },
      { step: 2, title: 'Lodge FIR with Names & Roles', desc: 'Informant files FIR mentioning specific overt acts and witnesses.' },
      { step: 3, title: 'Police Investigation & Forensic Analysis', desc: 'CID forensics inspect scene; weapons and biological samples sent for lab tests.' },
      { step: 4, title: 'Framing of Charge in Sessions Court', desc: 'Public Prosecutor (PP) frames charge; defence lawyer moves discharge application if evidence lacking.' },
      { step: 5, title: 'Deposition & Cross-Examination', desc: 'Eyewitnesses, investigating officer, and autopsy doctor testify in open court.' }
    ],
    penalties: 'Section 302: Death penalty or life imprisonment and fine. Section 326: Life imprisonment or imprisonment up to 10 years and fine.',
    requiredDocuments: [
      'Post-mortem report / certified Injury Certificate from Government Medical College',
      'Inquest Report (Surat-e-Hal) copy',
      'FIR / Seizure list copy',
      'Chemical analysis / ballistics report (if firearm used)'
    ],
    immediateActions: [
      'Ensure accurate recording of injuries in the emergency room register at the hospital.',
      'Engage experienced criminal trial advocate before giving Section 164 CrPC statements before Magistrate.'
    ],
    specialistMatch: 'Criminal Law'
  },
  {
    id: 'law-labour-rights',
    title: 'Labour Law, Wrongful Termination & Wage Dues',
    banglaTitle: 'শ্রম আইন, বেআইনি বরখাস্ত ও বকেয়া বেতন-ভাতা আদায়',
    category: 'labour',
    categoryLabel: 'Labour & Workplace',
    tag: 'Bangladesh Labour Act 2006',
    acts: [
      'The Bangladesh Labour Act, 2006 (Amended 2013, 2018)',
      'The Bangladesh Labour Rules, 2015'
    ],
    simpleSummary:
      'The Bangladesh Labour Act protects workers and employees across factories, commercial establishments, and shops. It governs appointment letters, probation, regular payment of wages, maternity benefits, overtime rates (double normal wage), gratuity, provident fund, and strict procedures for termination or retrenchment. Termination without statutory notice or compensation can be challenged directly in the Labour Court.',
    keyProvisions: [
      'Mandatory written appointment letter and service book for all employees.',
      'Wages must be paid within 7 working days following the wage period.',
      'Termination by employer requires 120 days notice or pay in lieu for monthly rated permanent workers, plus compensation of 30 days wages for every completed year of service.',
      'Maternity leave of 16 weeks with full wages is mandatory for female employees.',
      'Grievance procedure under Section 33: Worker must submit written grievance to employer within 30 days.'
    ],
    procedureSteps: [
      { step: 1, title: 'Submit Grievance to Employer', desc: 'Submit written grievance to employer within 30 days of the occurrence via registered post.' },
      { step: 2, title: 'Wait for Employer Response', desc: 'Employer has 30 days to hold enquiry and communicate decision.' },
      { step: 3, title: 'File Complaint in Labour Court', desc: 'If employer fails to respond or worker is dissatisfied, file complaint before the Chairman, Labour Court within next 30 days.' },
      { step: 4, title: 'Conciliation & Summary Trial', desc: 'Labour Court conducts trial; worker does not need to pay heavy court fees.' },
      { step: 5, title: 'Appeal to Labour Appellate Tribunal', desc: 'Any party aggrieved by Labour Court order can appeal within 60 days to Labour Appellate Tribunal.' }
    ],
    penalties: 'Employers violating labour provisions face criminal prosecution, fines up to ৳25,000, and recovery of worker dues as public demand with interest.',
    requiredDocuments: [
      'Appointment letter, ID card, and salary slips',
      'Bank statement showing salary credits or attendance card',
      'Termination/dismissal letter or email',
      'Copy of written grievance sent to employer and postal receipt'
    ],
    immediateActions: [
      'Never leave employment without collecting written experience certificate and clearance document.',
      'Submit written grievance within exactly 30 days to preserve right to sue in Labour Court.'
    ],
    specialistMatch: 'Labour & Workplace'
  },
  {
    id: 'law-consumer-rights',
    title: 'Consumer Rights, Fake Goods & Service Deficiencies',
    banglaTitle: 'ভোক্তা অধিকার সংরক্ষণ ও ভেজাল পণ্য-সেবা বিরোধী আইন',
    category: 'consumer',
    categoryLabel: 'Consumer & Contracts',
    tag: 'Consumer Rights Protection Act 2009',
    acts: [
      'The Consumer Rights Protection Act, 2009',
      'The Contract Act, 1872'
    ],
    simpleSummary:
      'Consumers in Bangladesh have legal protection against adulterated food, overcharging above MRP, expired goods, misleading advertisements, and defective products or services. Any consumer can submit a complaint to the Directorate of National Consumer Rights Protection (DNCRP). If a fine is imposed on the merchant, the complainant legally receives 25% of the penalty amount as a cash reward.',
    keyProvisions: [
      'Selling at price higher than marked MRP is an anti-consumer practice.',
      'Selling expired, adulterated, or hazardous products carries immediate administrative fine and criminal trial.',
      'Complainant reward: 25% of any administrative fine collected is paid to the consumer who filed the complaint.',
      'Complaint must be filed within 30 days of purchasing the defective goods or service.'
    ],
    procedureSteps: [
      { step: 1, title: 'Preserve Receipt & Product Photo', desc: 'Save original cash memo, product packaging with barcode, and clear photos.' },
      { step: 2, title: 'File Online / Written Complaint to DNCRP', desc: 'Submit complaint via email to ncrp@dncrp.gov.bd or via website/mobile app within 30 days.' },
      { step: 3, title: 'Hearing at Magistrate / Assistant Director', desc: 'DNCRP summons consumer and merchant for summary hearing.' },
      { step: 4, title: 'Imposition of Fine & Refund', desc: 'Merchant is fined and directed to refund the customer.' },
      { step: 5, title: 'Receive 25% Incentive', desc: 'Complainant receives 25% of the penalty amount on the spot.' }
    ],
    penalties: 'Administrative fines up to ৳2,00,000 and imprisonment up to 3 years for severe adulteration or fraudulent commercial practices.',
    requiredDocuments: [
      'Cash memo / purchase invoice / digital order confirmation',
      'Photographs of the product, batch number, and expiration date',
      'Complainant’s NID card and phone number'
    ],
    immediateActions: [
      'Always insist on written cash memo when purchasing electronics or medicine.',
      'File the complaint within 30 days; late complaints are barred under the Act.'
    ],
    specialistMatch: 'Consumer & Contracts'
  },
  {
    id: 'law-cheating-fraud',
    title: 'Financial Fraud, Breach of Trust & Online Scams',
    banglaTitle: 'প্রতারণা, অর্থ আত্মসাৎ ও বিশ্বাসভঙ্গের মামলা',
    category: 'criminal',
    categoryLabel: 'Criminal Law & Bail',
    tag: 'Penal Code 1860, Sec 406 & 420',
    acts: [
      'The Penal Code, 1860 (Section 406 - Criminal Breach of Trust & Section 420 - Cheating)',
      'The Code of Criminal Procedure, 1898'
    ],
    simpleSummary:
      'Sections 406 and 420 of the Penal Code are the most commonly applied provisions for fraudulent business partnerships, money embezzlements, fake job recruitment rackets, and visa scams. Section 406 deals with dishonest misappropriation of property entrusted to someone, while Section 420 punishes dishonestly inducing another person to deliver money or valuable security through deceit.',
    keyProvisions: [
      'Criminal Breach of Trust (Section 406): Entrusting money or property which is subsequently misappropriated.',
      'Cheating and dishonestly inducing delivery of property (Section 420): False promises made with fraudulent intention from the beginning.',
      'Both offences can be prosecuted through a Police Case (FIR) or Direct Court Complaint (CR Case).',
      'Court can issue arrest warrant or summon accused to face trial.'
    ],
    procedureSteps: [
      { step: 1, title: 'Gather Monetary Proof & Agreements', desc: 'Collect bank statements, signed money receipts, WhatsApp chats, and contractual promises.' },
      { step: 2, title: 'Serve Advocate Notice', desc: 'Send demand notice demanding restitution of defrauded money within 15 days.' },
      { step: 3, title: 'File Complaint (CR Case) before CMM/CJM', desc: 'Complainant gives initial statement on oath before Magistrate under Section 200 CrPC.' },
      { step: 4, title: 'Judicial Inquiry or PBI Investigation', desc: 'Magistrate directs Police Bureau of Investigation (PBI) or CID to conduct formal inquiry.' },
      { step: 5, title: 'Warrant of Arrest & Trial', desc: 'Upon submission of inquiry report finding prima facie truth, court issues arrest warrant.' }
    ],
    penalties: 'Section 420: Imprisonment up to 7 years and fine. Section 406: Imprisonment up to 3 years, or fine, or both.',
    requiredDocuments: [
      'Bank transaction slips / bKash / Nagad statement',
      'Signed agreement on non-judicial stamp / promissory note (হ্যান্ডনোট)',
      'WhatsApp / email communications showing promise and deceit',
      'Eyewitness affidavits'
    ],
    immediateActions: [
      'Do not settle for verbal assurances; demand written acknowledgment of debt.',
      'File CR case promptly before the culprit flees abroad or disposes of assets.'
    ],
    specialistMatch: 'Criminal Law'
  }
];
