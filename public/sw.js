self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
// Optional: pass-through fetch; no caching to avoid staleness
self.addEventListener("fetch", () => {});
