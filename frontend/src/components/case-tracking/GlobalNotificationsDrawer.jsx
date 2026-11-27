import React from 'react';
import { BellRing, Check, X } from 'lucide-react';

export default function GlobalNotificationsDrawer({
  notifications = [],
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  onClose,
  isBn
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BellRing className="w-4 h-4 text-bdGreen-800" />
          <h2 className="font-bold text-sm text-slate-900">
            {isBn ? 'সকল মামলার নোটিফিকেশন' : 'Case Notifications Center'} ({notifications.length})
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-bdGreen-900 text-xs font-bold transition-colors"
            >
              {isBn ? 'সব পঠিত করুন' : 'Mark all read'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="text-xs text-slate-500 py-4 text-center">
          {isBn ? 'এখনো কোনো নোটিফিকেশন নেই।' : 'No notifications yet.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                n.read
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-emerald-50/80 border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {!n.read && <span className="w-2 h-2 rounded-full bg-bdRed-500 shrink-0" />}
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                <p className="text-[11px] font-semibold text-bdGreen-800 truncate">{n.case_title}</p>
              </div>
              {!n.read && (
                <button
                  type="button"
                  onClick={() => onMarkRead(n.id)}
                  className="shrink-0 p-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 text-bdGreen-800"
                  title={isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark as read'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
