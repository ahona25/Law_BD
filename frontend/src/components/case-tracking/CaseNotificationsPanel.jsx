import React from 'react';

export default function CaseNotificationsPanel({
  notifications = [],
  onMarkRead,
  onMarkAllRead,
  isBn
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900">
          {isBn ? 'এই মামলার নোটিফিকেশন' : 'Updates & Alerts for This Case'}
        </h3>
        {notifications.some((n) => !n.read) && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-bold text-bdGreen-800 hover:underline"
          >
            {isBn ? 'সব পঠিত করুন' : 'Mark all read'}
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center">
          {isBn
            ? 'এই মামলার জন্য কোনো নোটিফিকেশন নেই।'
            : 'No notifications recorded for this case yet.'}
        </p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
              n.read ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50/70 border-emerald-300'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {!n.read && <span className="w-2 h-2 rounded-full bg-bdRed-500" />}
                <span className="text-xs font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600">{n.message}</p>
            </div>
            {!n.read && (
              <button
                type="button"
                onClick={() => onMarkRead(n.id)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-bdGreen-900 hover:border-emerald-300 shrink-0"
              >
                {isBn ? 'পঠিত' : 'Mark read'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
