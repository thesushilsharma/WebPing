export function useDismissNotification() {
  return async (id: string) => {
    await fetch(`/api/notifications/${id}/dismiss`, {
      method: "POST",
    });
  };
}