// Asigna un nombre al caché
const CACHE_NAME = "gestor-eventos-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/public/Admin/crudAdmin.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "./images/logo.png",
    "./images/logo.png"
];

// Instala el Service Worker y almacena los recursos en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Cache abierto");
                return cache.addAll(urlsToCache);
            })
    );
});

// Activa el Service Worker y limpia el caché antiguo si es necesario
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Cache antiguo eliminado:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta las solicitudes de red y responde con el caché si está disponible
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Retorna el recurso desde el caché
                }
                return fetch(event.request); 
            })
    );
});
