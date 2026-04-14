import { useMutation } from "@tanstack/react-query";

export const useTestNotificationMutation = () => {
  return useMutation({
    mutationFn: async (topic?: string) => {
      const response = await fetch("/api/notify", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic || "All" })
      });
      if (!response.ok) {
        throw new Error("Failed to send test notification");
      }
      return response.json();
    },
  });
};
