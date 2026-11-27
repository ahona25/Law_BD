export const DEMO_CASES = [
  {
    id: 'DEMO-101',
    title: 'Illegal Encroachment on Mirpur Commercial Plot',
    category: 'Land & Property',
    status: 'hearing_scheduled',
    court_name: 'Joint District Judge 2nd Court, Dhaka',
    next_hearing_date: '2026-12-10',
    next_hearing_time: '10:30 AM',
    incident_description:
      'Demonstration case showing boundary dispute tracking under Land Crime Prevention & Redress Act 2023.',
    related_laws: ['Land Crime Prevention Act 2023', 'Specific Relief Act Section 9'],
    history: [
      {
        id: 'd-h-1',
        date: '2026-11-05',
        type: 'registration',
        title: 'Case Registered',
        details: 'Client fixed case with Adv. Barrister Tanvir Hasan and filed plaint.',
        actor: 'Rahim Ahmed (Demo Client)'
      },
      {
        id: 'd-h-2',
        date: '2026-11-12',
        type: 'document',
        title: 'Court Order Uploaded',
        details: 'Temporary Injunction Order (Order 39 Rule 1 CPC) added to case file.',
        actor: 'Court Registry'
      },
      {
        id: 'd-h-3',
        date: '2026-11-18',
        type: 'hearing',
        title: 'Hearing Scheduled',
        details: 'Next hearing set for 2026-12-10 at 10:30 AM (Joint District Judge 2nd Court, Dhaka).',
        actor: 'Court Registry'
      }
    ],
    documents: [
      {
        id: 'd-doc-1',
        name: 'Temporary_Injunction_Order.txt',
        category: 'Court Order',
        isCourtOrder: true,
        uploadedBy: 'Court Registry',
        uploadedAt: '2026-11-12T10:00:00.000Z',
        demoContent:
          'COURT ORDER (DEMO)\nCourt: Joint District Judge 2nd Court, Dhaka\nCase: Illegal Encroachment on Mirpur Commercial Plot\nOrder: Status quo maintained until next hearing on 2026-12-10 at 10:30 AM.'
      },
      {
        id: 'd-doc-2',
        name: 'RS_Khatian_991_Verified.txt',
        category: 'Evidence',
        isCourtOrder: false,
        uploadedBy: 'Rahim Ahmed (Demo)',
        uploadedAt: '2026-11-05T09:30:00.000Z',
        demoContent:
          'VERIFIED LAND RECORD (DEMO)\nRS Khatian No: 991\nMouza: Mirpur, Dhaka\nSubmitted as primary title evidence.'
      }
    ]
  },
  {
    id: 'DEMO-102',
    title: 'Recovery of ৳8,50,000 via NI Act Section 138',
    category: 'Cheque Dishonour',
    status: 'under_review',
    court_name: 'Chief Metropolitan Magistrate Court, Dhaka',
    next_hearing_date: '2026-12-18',
    next_hearing_time: '11:15 AM',
    incident_description:
      'Dishonoured bank cheque recovery after serving mandatory 30-day statutory legal notice.',
    related_laws: ['Negotiable Instruments Act Section 138'],
    history: [
      {
        id: 'd-h-4',
        date: '2026-11-08',
        type: 'registration',
        title: 'Case Registered',
        details: 'Complaint registered with cheque return memo and served notice.',
        actor: 'Rahim Ahmed (Demo Client)'
      },
      {
        id: 'd-h-5',
        date: '2026-11-20',
        type: 'status',
        title: 'Status Updated to Under Review',
        details: 'Magistrate chamber reviewing bank memo and statutory notice timeline.',
        actor: 'Adv. Barrister Tanvir Hasan'
      }
    ],
    documents: [
      {
        id: 'd-doc-3',
        name: 'Section_138_Legal_Notice.txt',
        category: 'Legal Notice',
        isCourtOrder: false,
        uploadedBy: 'Adv. Tanvir Hasan',
        uploadedAt: '2026-11-08T14:00:00.000Z',
        demoContent:
          'STATUTORY LEGAL NOTICE (DEMO)\nUnder Section 138 of the Negotiable Instruments Act 1881.\nDemand Amount: BDT 8,50,000.'
      }
    ]
  }
];

export const DEMO_NOTIFICATIONS = [
  {
    id: 'd-notif-1',
    case_id: 'DEMO-101',
    case_title: 'Illegal Encroachment on Mirpur Commercial Plot',
    type: 'hearing_change',
    title: 'Hearing Date Scheduled',
    message: 'Hearing scheduled for 2026-12-10 at 10:30 AM · Joint District Judge 2nd Court, Dhaka.',
    read: false,
    created_at: '2026-11-26T10:30:00.000Z'
  },
  {
    id: 'd-notif-2',
    case_id: 'DEMO-101',
    case_title: 'Illegal Encroachment on Mirpur Commercial Plot',
    type: 'court_order',
    title: 'New Court Order Available',
    message: 'Temporary_Injunction_Order.txt (Court Order) added to case file.',
    read: false,
    created_at: '2026-11-25T15:00:00.000Z'
  },
  {
    id: 'd-notif-3',
    case_id: 'DEMO-102',
    case_title: 'Recovery of ৳8,50,000 via NI Act Section 138',
    type: 'status_change',
    title: 'Case Status: Under Review',
    message: 'Magistrate chamber reviewing statutory notice compliance.',
    read: true,
    created_at: '2026-11-20T11:00:00.000Z'
  }
];
