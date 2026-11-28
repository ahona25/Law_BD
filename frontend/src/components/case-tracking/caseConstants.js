export const STATUS_META = {
  pending: {
    enLabel: 'Pending',
    bnLabel: 'চলমান (Pending)',
    enDesc: 'The case is still ongoing.',
    bnDesc: 'মামলাটি এখনও চলমান রয়েছে।',
    badgeClass:
      'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-500/40',
    dotClass: 'bg-amber-500 dark:bg-amber-400'
  },
  hearing_scheduled: {
    enLabel: 'Hearing Scheduled',
    bnLabel: 'শুনানি নির্ধারিত',
    enDesc: 'A hearing date has been scheduled.',
    bnDesc: 'শুনানির তারিখ নির্ধারণ করা হয়েছে।',
    badgeClass:
      'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-500/40',
    dotClass: 'bg-sky-500 dark:bg-sky-400'
  },
  under_review: {
    enLabel: 'Under Review',
    bnLabel: 'পর্যালোচনাধীন',
    enDesc: 'The matter is under review.',
    bnDesc: 'বিষয়টি পর্যালোচনাধীন রয়েছে।',
    badgeClass:
      'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-500/40',
    dotClass: 'bg-purple-500 dark:bg-purple-400'
  },
  disposed: {
    enLabel: 'Disposed',
    bnLabel: 'নিষ্পত্তিকৃত',
    enDesc: 'The case has been concluded.',
    bnDesc: 'মামলাটি নিষ্পত্তি হয়েছে।',
    badgeClass:
      'bg-emerald-100 text-bdGreen-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-500/40',
    dotClass: 'bg-emerald-500 dark:bg-emerald-400'
  }
};

export const DOC_CATEGORIES = [
  'Court Order',
  'Petition / Filing',
  'Evidence',
  'Legal Notice',
  'Other'
];

export function getStatusInfo(status) {
  if (status === 'ongoing') return STATUS_META.pending;
  return STATUS_META[status] || STATUS_META.under_review;
}

export function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}
