import { useQuery } from "@tanstack/react-query";

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  read: boolean | null;
  createdAt: string | null;
}

export function useFetchNotifications() {
  const {
    data: notifications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<NotificationData[]> => {
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    refetchInterval: 5000,
  });

  return { notifications, refetch, isLoading };
}
