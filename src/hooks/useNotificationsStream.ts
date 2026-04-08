import { useEffect } from "react";

export function useNotificationsStream(onNotifications: (data: any[]) => void) {
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      onNotifications(data);
    }, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, [onNotifications]);
}