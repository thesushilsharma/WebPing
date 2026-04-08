"use client";

import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div>
      <h2>Notifications</h2>

      {notifications.map((n: any) => (
        <div key={n.id}>
          <h4>{n.title}</h4>
          <p>{n.body}</p>

          {!n.read && (
            <button onClick={() => dismissNotification(n.id)}>
              Dismiss
            </button>
          )}
        </div>
      ))}
    </div>
  );
}