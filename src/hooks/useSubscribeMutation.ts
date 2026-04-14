import { useMutation } from "@tanstack/react-query";

export const useSubscribeMutation = () => {
  return useMutation({
    mutationFn: async ({ sub, topics }: { sub: PushSubscription; topics: string[] }) => {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sub, topics }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }
      return response.json();
    },
  });
};
