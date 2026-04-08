import { useFetchNotifications } from "./useFetchNotifications";
import { useDismissNotification } from "./useDismissNotification";

export function useNotifications() {
  const { notifications, setNotifications } = useFetchNotifications();
  const dismiss = useDismissNotification();

  const dismissNotification = async (id: string) => {
    await dismiss(id);

    setNotifications((prev: any[]) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return {
    notifications,
    dismissNotification,
  };
}