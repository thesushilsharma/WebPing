import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDismissNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notifications/${id}/dismiss`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to dismiss notification");
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(["notifications"], (old: any[] | undefined) =>
        old ? old.map((n) => (n.id === id ? { ...n, read: true } : n)) : []
      );
      return { previousNotifications };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["notifications"], context?.previousNotifications);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}