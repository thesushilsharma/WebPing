import { useFetchNotifications } from "./useFetchNotifications";
import { useDismissNotification } from "./useDismissNotification";

export function useNotifications() {
  const { notifications, isLoading } = useFetchNotifications();
  const { mutateAsync: dismiss } = useDismissNotification();

  const dismissNotification = async (id: string) => {
    await dismiss(id);
  };

  return {
    notifications,
    dismissNotification,
    isLoading,
  };
}