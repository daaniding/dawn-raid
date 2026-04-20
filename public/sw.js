// Dawn Raid service worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = { title: "Dawn Raid", body: "" };
  try {
    if (event.data) data = Object.assign(data, event.data.json());
  } catch (_) {}
  const options = {
    body: data.body,
    icon: data.icon || "/favicon.ico",
    badge: data.badge || "/favicon.ico",
    tag: data.tag || "dawnraid-timer",
    renotify: true,
    data: { url: data.url || "/timer" },
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((list) => {
        for (const client of list) {
          if ("focus" in client) return client.focus();
        }
        return self.clients.openWindow(url);
      }),
  );
});
