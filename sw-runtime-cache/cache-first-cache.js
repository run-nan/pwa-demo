import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

export function cacheFirstCache(options = {}) {
  const defaultMatchCallback = ({ request }) => {
    const result = request.url.includes("/assets/");
    console.log("lpf", request);
    if (result) {
      console.log("lpf", `cache-first cache ${request.url}`);
    }
    return result;
  };

  const cacheName = options.cacheName || "cache-first-cache";
  const matchCallback = options.matchCallback || defaultMatchCallback;
  const maxAgeSeconds = options.maxAgeSeconds || 30 * 24 * 60 * 60;
  const maxEntries = options.maxEntries || 60;
  const plugins = options.plugins || [];
  plugins.push(
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries,
      maxAgeSeconds,
    })
  );

  const strategy = new CacheFirst({
    cacheName,
    plugins,
  });

  registerRoute(matchCallback, strategy);
}
