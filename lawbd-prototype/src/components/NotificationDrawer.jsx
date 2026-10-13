import React from 'react';

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onOpenBookings
}) {
  if (!isOpen) return null;

  return (
    <div className="notif-dropdown-overlay" onClick={onClose}>
      <aside className="notif-dropdown-card" onClick={(e) => e.stopPropagation()}>
        <div className="notif-header">
          <div className="notif-title-group">
            <span className="bell-icon">🔔</span>
            <h4>Appointment &amp; Legal Alerts</h4>
          </div>
          <button className="notif-close" onClick={onClose} aria-label="Close notifications">
            ✕
          </button>
        </div>

        <div className="notif-actions-strip">
          <button className="text-action-btn" onClick={onMarkAllRead}>
            Mark all as read
          </button>
          <button className="text-action-btn text-muted" onClick={onClearAll}>
            Clear all
          </button>
        </div>

        <div className="notif-list">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`notif-item ${item.read ? 'read' : 'unread'}`}
                onClick={() => {
                  if (item.type === 'booking') {
                    onClose();
                    onOpenBookings();
                  }
                }}
              >
                <div className="notif-indicator">
                  <span className={`notif-badge-icon ${item.type}`}>
                    {item.type === 'booking' ? '📅' : item.type === 'alert' ? '⚖' : '💬'}
                  </span>
                </div>
                <div className="notif-content">
                  <div className="notif-title-row">
                    <strong>{item.title}</strong>
                    <span className="notif-time">{item.time}</span>
                  </div>
                  <p className="notif-body">{item.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-notif-box">
              <span className="empty-bell">🔕</span>
              <p>No notifications at the moment.</p>
              <small>Your appointment confirmations and updates will appear here.</small>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
