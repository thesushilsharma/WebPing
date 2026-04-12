"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useSubscribeMutation } from "@/hooks/useSubscribeMutation";
import { useTestNotificationMutation } from "@/hooks/useTestNotificationMutation";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function NotificationsPage() {
  const { notifications, dismissNotification } = useNotifications();
  const { mutateAsync: subscribeMutation } = useSubscribeMutation();
  const { mutateAsync: testNotificationMutation } =
    useTestNotificationMutation();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        setRegistration(reg);
        reg.pushManager.getSubscription().then((sub) => {
          if (sub?.endpoint) {
            setIsSubscribed(true);
          }
        });
      });
    }
  }, []);

  const subscribeButtonOnClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (!registration) {
      console.error("No service worker registration found.");
      return;
    }

    try {
      const permission = await window.Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
        ),
      });

      await subscribeMutation(sub as any);
      setIsSubscribed(true);
    } catch (err) {
      console.error("Failed to subscribe the user: ", err);
      alert(`Failed to subscribe: ${err}`);
    }
  };

  const sendTestNotification = async () => {
    try {
      await testNotificationMutation();
    } catch (err) {
      console.error("Failed to send test notification", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Push Notifications</h2>

      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-50 border rounded-lg shadow-sm">
        <button
          type="button"
          onClick={subscribeButtonOnClick}
          disabled={isSubscribed}
          className="bg-blue-600 px-4 py-2 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubscribed ? "Subscribed ✅" : "Enable Web Push"}
        </button>

        <button
          type="button"
          onClick={sendTestNotification}
          className="bg-green-600 px-4 py-2 text-white font-medium rounded hover:bg-green-700 transition-colors"
        >
          Send Test Notification
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">In-App Notifications</h2>
      <div className="flex flex-col gap-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-lg">{n.title}</h4>
            <p className="text-gray-600 mt-1">{n.body}</p>

            {!n.read && (
              <button
                type="button"
                onClick={() => dismissNotification(n.id)}
                className="mt-3 text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-gray-500 italic p-4 text-center border border-dashed rounded">
            No local notifications available.
          </p>
        )}
      </div>
    </div>
  );
}
