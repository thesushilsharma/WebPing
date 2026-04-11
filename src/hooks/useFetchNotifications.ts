import { useQuery } from "@tanstack/react-query";

export function useFetchNotifications() {
  const {
    data: notifications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    refetchInterval: 5000,
  });

  return { notifications, refetch, isLoading };
}