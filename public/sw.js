self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "PushPulse \uD83D\uDE80", body: event.data.text() };
  }

  const title = data.title || "PushPulse \uD83D\uDE80";
  const options = {
    body: data.body || "",
    icon: data.icon || "/notify.svg",
    badge: data.badge || "/notify.svg",
    vibrate: data.vibrate || [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
      url: data.url || "/",
      ...(data.data || {}),
    },
    ...(data.options || {}),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = new URL(event.notification.data?.url || "/", self.location.origin).href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          // If so, just focus it.
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // If not, then open the target URL in a new window/tab.
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
