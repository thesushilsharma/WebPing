import NotificationsPage from "@/components/notify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | WebPing",
  description: "Manage your push notifications and alerts.",
};

export default function NotificationsRoute() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <NotificationsPage />
      </div>
    </main>
  );
}
