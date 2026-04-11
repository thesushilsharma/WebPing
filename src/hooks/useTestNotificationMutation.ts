import { useMutation } from "@tanstack/react-query";

export const useTestNotificationMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/notify", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to send test notification");
      }
      return response.json();
    },
  });
};
