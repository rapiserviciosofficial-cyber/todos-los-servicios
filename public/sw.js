/* Service Worker — Todos los Servicios · Las Margaritas, Chiapas
 * Estrategia:
 *  - Navegaciones: red primero, caché como respaldo (funciona sin señal).
 *  - Imágenes, fuentes y estilos: caché primero (abre al instante y ahorra datos).
 */
const CACHE = "tls-v1";
const CORE = ["./", "./manifest.webmanifest", "./icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Navegaciones: red primero, caché como respaldo
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html").then((hit) => hit || caches.match("./"))
        )
    );
    return;
  }

  const url = new URL(request.url);
  const cacheable =
    url.origin === self.location.origin ||
    request.destination === "image" ||
    request.destination === "font" ||
    request.destination === "style";

  if (!cacheable) return;

  // Recursos: caché primero, se rellena desde la red
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response && (response.status === 200 || response.type === "opaque")) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
