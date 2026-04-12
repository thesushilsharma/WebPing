import { useDismissNotification } from "./useDismissNotification";
import { useFetchNotifications } from "./useFetchNotifications";

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
