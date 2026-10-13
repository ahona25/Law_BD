export const documentChecklists = [
  {
    id: 'land-dispute',
    title: 'Land Ownership Dispute & Title Verification',
    banglaTitle: 'জমির মালিকানা সংক্রান্ত বিরোধ ও দলিল যাচাই তালিকা',
    description: 'Essential documents required to verify ownership, defend against land grabbing, or file a title suit in civil court.',
    items: [
      {
        id: 'ld-1',
        name: 'Original Registered Title Deed (মূল কবলা দলিল)',
        purpose: 'Primary evidence of valid conveyance of title to the current owner.',
        issuingAuthority: 'Sub-Registry Office (উপ-রেজিস্ট্রি অফিস)',
        recommendedCopies: 'Original + 3 Certified Copies',
        mandatory: true
      },
      {
        id: 'ld-2',
        name: 'Historical Chain Deeds (বায়া দলিল / পিঠ দলিল)',
        purpose: 'Traces the chain of successive ownership transfers over the past 25-30 years.',
        issuingAuthority: 'District Record Room (জেলা রেকর্ড রুম)',
        recommendedCopies: '2 Certified Photocopies',
        mandatory: true
      },
      {
        id: 'ld-3',
        name: 'Mutation Khatian & DCR Receipt (নামজারি ও ডিসিআর)',
        purpose: 'Demonstrates that the government revenue record has recognized ownership.',
        issuingAuthority: 'AC Land Office (সহকারী কমিশনার ভূমি অফিস)',
        recommendedCopies: 'Original Khatian + DCR',
        mandatory: true
      },
      {
        id: 'ld-4',
        name: 'Recent Land Development Tax Receipt (হাল খাজনা দাখিলা)',
        purpose: 'Shows payment of annual land revenue and proves lack of tax default.',
        issuingAuthority: 'Union Land Office / Online (land.gov.bd)',
        recommendedCopies: 'Latest Year Online Dakhila',
        mandatory: true
      },
      {
        id: 'ld-5',
        name: 'CS, SA, RS and City Survey Porchas (সার্ভে খতিয়ান)',
        purpose: 'Matches the government cadastral survey plot numbers and boundary shares.',
        issuingAuthority: 'Deputy Commissioner Record Room (ডিসি অফিস)',
        recommendedCopies: 'Certified copies of each survey',
        mandatory: false
      },
      {
        id: 'ld-6',
        name: 'Non-Encumbrance Certificate (১২ ধারা তল্লাশি / NEC)',
        purpose: 'Proves the property is free from bank mortgage or clandestine resale.',
        issuingAuthority: 'Sub-Registry Office Search',
        recommendedCopies: 'Official Search Certificate',
        mandatory: false
      }
    ]
  },
  {
    id: 'family-court',
    title: 'Family Court, Dower (Denmohur) & Child Custody',
    banglaTitle: 'পারিবারিক আদালত, দেনমোহর আদায় ও সন্তানের হেফাজত',
    description: 'Paperwork checklist for filing claims regarding dower, maintenance, custody, or divorce in the Family Court.',
    items: [
      {
        id: 'fc-1',
        name: 'Certified Copy of Nikahnama / Kabinnama (নিকাহনামা)',
        purpose: 'Proves valid marriage and contains the exact stipulated dower amount and conditions.',
        issuingAuthority: 'Licensed Muslim Marriage Registrar (Kazi Office)',
        recommendedCopies: '1 Certified Copy + 2 Photocopies',
        mandatory: true
      },
      {
        id: 'fc-2',
        name: 'National ID (NID) Cards & Photographs',
        purpose: 'Establishes identity of the petitioner and respondent.',
        issuingAuthority: 'Election Commission of Bangladesh',
        recommendedCopies: 'Passport-size photos (4 copies) + NID',
        mandatory: true
      },
      {
        id: 'fc-3',
        name: 'Talaq Notice & Postal Receipts (A/D Card)',
        purpose: 'Proof that mandatory statutory notice was served to the Chairman/Mayor and spouse.',
        issuingAuthority: 'Bangladesh Post Office (Registered Post with A/D)',
        recommendedCopies: 'Original postal slip + acknowledgment card',
        mandatory: true
      },
      {
        id: 'fc-4',
        name: 'Birth Registration Certificates of Children (জন্ম নিবন্ধন)',
        purpose: 'Verifies ages and names of minor children for custody and child support suits.',
        issuingAuthority: 'City Corporation / Union Parishad',
        recommendedCopies: 'Certified online birth certificate',
        mandatory: true
      },
      {
        id: 'fc-5',
        name: 'Proof of Husband’s Income / Assets (আয়ের প্রমাণপত্র)',
        purpose: 'Aids the judge in fixing realistic monthly maintenance (Khorposh) quantum.',
        issuingAuthority: 'Bank statements, salary certificates, tax returns, or trade license',
        recommendedCopies: 'Available financial records',
        mandatory: false
      }
    ]
  },
  {
    id: 'criminal-bail',
    title: 'Criminal Defense & Bail Application (জামিন আবেদন)',
    banglaTitle: 'ফৌজদারি মামলা প্রতিরক্ষা ও জামিন আবেদন তালিকা',
    description: 'Crucial documents your defense advocate requires to present an effective bail petition before Magistrate or Sessions Judge.',
    items: [
      {
        id: 'cb-1',
        name: 'Certified Copy of FIR / Ejahar or Complaint Petition',
        purpose: 'Enables counsel to scrutinize allegations, check if accused is named, and assess overt acts.',
        issuingAuthority: 'Court Copying Section / Police Station',
        recommendedCopies: 'Certified Court Copy',
        mandatory: true
      },
      {
        id: 'cb-2',
        name: 'Seizure List Copy (জব্দতালিকা)',
        purpose: 'Shows what items were recovered and whether local independent witnesses signed.',
        issuingAuthority: 'Investigating Officer / Court Record',
        recommendedCopies: '1 Court Certified Copy',
        mandatory: true
      },
      {
        id: 'cb-3',
        name: 'Surety / Bailor Documents (জামিনদারের কাগজপত্র)',
        purpose: 'Local solvent individuals who sign the bail bond guaranteeing the accused’s presence.',
        issuingAuthority: 'Bailor’s NID, Land Tax Receipt / Municipal Holding Tax receipt',
        recommendedCopies: '2 local sureties with NID copies',
        mandatory: true
      },
      {
        id: 'cb-4',
        name: 'Medical Certificates / Hospital Records (চিকিৎসা সনদ)',
        purpose: 'Essential if applying for bail on grounds of sickness, infirmity, or pregnancy under Sec 497 CrPC.',
        issuingAuthority: 'Government Medical College Hospital / Civil Surgeon',
        recommendedCopies: 'Certified medical reports',
        mandatory: false
      },
      {
        id: 'cb-5',
        name: 'Lower Court Rejection Order (খারিজ আদেশ)',
        purpose: 'Required when moving Sessions Court or High Court Division for subsequent bail motion.',
        issuingAuthority: 'Magistrate Court Chief Bench Reader',
        recommendedCopies: 'Certified order sheet',
        mandatory: false
      }
    ]
  },
  {
    id: 'cheque-dishonour',
    title: 'Cheque Dishonour Case (NI Act Section 138)',
    banglaTitle: 'চেক বাউন্স ও ১৩৮ ধারার মামলা দায়েরের চেকলিস্ট',
    description: 'Strict evidentiary chain required to prosecute a dishonoured bank cheque before the Criminal Court.',
    items: [
      {
        id: 'cd-1',
        name: 'Original Dishonoured Bank Cheque (মূল চেক)',
        purpose: 'Primary piece of negotiable instrument evidence; must bear valid drawer signature.',
        issuingAuthority: 'Complainant’s custody',
        recommendedCopies: 'Original Cheque + 3 high-res colour copies',
        mandatory: true
      },
      {
        id: 'cd-2',
        name: 'Bank Cheque Return Memo (ব্যাংক মেমো)',
        purpose: 'Official bank document stating the specific reason for dishonour (e.g., Insufficient Funds).',
        issuingAuthority: 'Drawee Bank Branch Manager',
        recommendedCopies: 'Original stamped return memo',
        mandatory: true
      },
      {
        id: 'cd-3',
        name: 'Statutory Legal Notice Served by Advocate (আইনি নোটিশ)',
        purpose: 'Mandatory statutory demand letter giving 30 days time to clear the cheque amount.',
        issuingAuthority: 'Advocate’s Chamber Letterhead',
        recommendedCopies: 'Original office copy with advocate signature',
        mandatory: true
      },
      {
        id: 'cd-4',
        name: 'Registered Postal Receipt & A/D Card (ডাক রশিদ ও প্রাপ্তিস্বীকার)',
        purpose: 'Strict proof of serving notice within the non-extendable 30-day statutory window.',
        issuingAuthority: 'Bangladesh Post Office / Courier Service',
        recommendedCopies: 'Original Postal Slip + A/D card',
        mandatory: true
      },
      {
        id: 'cd-5',
        name: 'Proof of Underlying Debt / Transaction (লেনদেনের চুক্তিপত্র)',
        purpose: 'Corroborates that the cheque was issued against lawful debt or commercial liability.',
        issuingAuthority: 'Contract deed, invoice, bank transfer, or receipt',
        recommendedCopies: 'Photocopies of contract',
        mandatory: false
      }
    ]
  },
  {
    id: 'cybercrime-complaint',
    title: 'Cybercrime, Hacking & Online Harassment Complaint',
    banglaTitle: 'সাইবার ক্রাইম ও ডিজিটাল নিরাপত্তা অভিযোগের চেকলিস্ট',
    description: 'Digital evidence and procedural documents required by CID Cyber Police, PCSW, and Thana officers.',
    items: [
      {
        id: 'cc-1',
        name: 'Full-Screen Screenshots with Visible URLs & Timestamps',
        purpose: 'Captures defamatory posts, fraudulent messages, or blackmail demands before deletion.',
        issuingAuthority: 'Digital screen capture (Computer / Mobile)',
        recommendedCopies: 'Printed colour copies + digital files on USB',
        mandatory: true
      },
      {
        id: 'cc-2',
        name: 'URL Link of Offender Profile / Page / Group',
        purpose: 'Allows Cyber Investigation Division to trace IP logs and request platform metadata.',
        issuingAuthority: 'Browser address bar link',
        recommendedCopies: 'Written exact URL on complaint petition',
        mandatory: true
      },
      {
        id: 'cc-3',
        name: 'Mobile Financial Service (MFS) Transaction Statements',
        purpose: 'For financial scams: Transaction ID (TrxID), recipient number, and bKash/Nagad statement.',
        issuingAuthority: 'bKash / Nagad / Bank Statement',
        recommendedCopies: 'Official MFS e-statement',
        mandatory: true
      },
      {
        id: 'cc-4',
        name: 'Audio Recordings / Call Logs (if extortion calls made)',
        purpose: 'Serves as digital audio evidence of verbal intimidation or ransom demands.',
        issuingAuthority: 'Phone voice recorder',
        recommendedCopies: 'Saved on CD/USB drive',
        mandatory: false
      }
    ]
  },
  {
    id: 'labour-court',
    title: 'Labour Court Grievance & Unpaid Wage Claim',
    banglaTitle: 'শ্রম আদালত ও বকেয়া বেতন আদায়ের চেকলিস্ট',
    description: 'Documentation needed for aggrieved workers to file a grievance under Section 33 of the Bangladesh Labour Act.',
    items: [
      {
        id: 'lc-1',
        name: 'Appointment Letter / ID Card / Service Book',
        purpose: 'Proves employer-employee relationship and wage rate stipulated under Labour Act.',
        issuingAuthority: 'Employer / Factory HR Department',
        recommendedCopies: 'Photocopy of appointment letter & ID card',
        mandatory: true
      },
      {
        id: 'lc-2',
        name: 'Salary Slips or Bank Salary Credit Statements',
        purpose: 'Shows regular remuneration and pinpoints unpaid months or withheld severance.',
        issuingAuthority: 'Bank or company pay slip',
        recommendedCopies: 'Last 6-12 months bank statement',
        mandatory: true
      },
      {
        id: 'lc-3',
        name: 'Termination / Dismissal Letter (if issued)',
        purpose: 'Proves date and manner of termination to compute mandatory notice pay and gratuity.',
        issuingAuthority: 'Employer HR',
        recommendedCopies: 'Original or copy of termination letter',
        mandatory: false
      },
      {
        id: 'lc-4',
        name: 'Copy of Section 33 Grievance Petition & Postal Slip',
        purpose: 'Strict statutory requirement: worker must prove written grievance was sent to employer within 30 days.',
        issuingAuthority: 'Bangladesh Post Office (Registered Post A/D)',
        recommendedCopies: 'Original postal receipt + grievance copy',
        mandatory: true
      }
    ]
  }
];
