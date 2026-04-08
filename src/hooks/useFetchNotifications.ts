import { useEffect, useState, useCallback } from "react";
import { useNotificationsStream } from "./useNotificationsStream";

export function useFetchNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const onNotifications = useCallback((newData: any[]) => {
    setNotifications(newData);
  }, []);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  useNotificationsStream(onNotifications);

  return { notifications, setNotifications };
}