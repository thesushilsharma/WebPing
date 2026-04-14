"use client";

import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { useSubscribeMutation } from "@/hooks/useSubscribeMutation";
import { useTestNotificationMutation } from "@/hooks/useTestNotificationMutation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const AVAILABLE_TOPICS = ["News", "Updates", "Promotions", "Alerts"];

export default function NotificationsPage() {
  const { notifications, dismissNotification } = useNotifications();
  const { mutateAsync: subscribeMutation } = useSubscribeMutation();
  const { mutateAsync: testNotificationMutation } =
    useTestNotificationMutation();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
    
  const [selectedTopics, setSelectedTopics] = useState<string[]>(AVAILABLE_TOPICS);
  const [broadcastTopic, setBroadcastTopic] = useState<string>("All");

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

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

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

      await subscribeMutation({ sub: sub as any, topics: selectedTopics });
      setIsSubscribed(true);
      alert("Successfully subscribed to topics!");
    } catch (err) {
      console.error("Failed to subscribe the user: ", err);
      alert(`Failed to subscribe: ${err}`);
    }
  };

  const sendTestNotification = async () => {
    try {
      await testNotificationMutation(broadcastTopic);
      alert(`Sent notification to: ${broadcastTopic}`);
    } catch (err) {
      console.error("Failed to send test notification", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Push Notifications</h2>

      <div className="flex flex-col gap-6 mb-8 p-6 bg-white dark:bg-gray-900 border rounded-xl shadow-sm">
        
        {/* Subscription section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">1. Subscribe to Topics</h3>
          <div className="flex flex-wrap gap-4 py-2">
            {AVAILABLE_TOPICS.map(topic => (
              <div key={topic} className="flex items-center space-x-2">
                <Checkbox 
                  id={`topic-${topic}`}
                  checked={selectedTopics.includes(topic)}
                  onCheckedChange={() => handleTopicToggle(topic)}
                />
                <Label htmlFor={`topic-${topic}`}>{topic}</Label>
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={subscribeButtonOnClick}
            className="bg-blue-600 px-4 py-2 mt-2 w-fit text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSubscribed ? "Update Subscription" : "Enable Web Push"}
          </button>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full"></div>

        {/* Broadcast section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">2. Broadcast Test</h3>
          <div className="flex items-end gap-4">
            <div className="flex flex-col gap-2 w-48">
              <Label>Target Topic</Label>
              <Select value={broadcastTopic} onValueChange={setBroadcastTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Topics</SelectItem>
                  {AVAILABLE_TOPICS.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <button
              type="button"
              onClick={sendTestNotification}
              className="bg-green-600 px-4 py-2 h-10 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Send Notification
            </button>
          </div>
        </div>

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
                className="mt-3 text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
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
