import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

export function swrCache(options = {}) {
  const defaultMatchCallback = ({ request }) => {
    console.log("lpf", request);
    const result = request.url.includes("/docs/");
    if (result) {
      console.log("lpf", `swr cache ${request.url}`);
    }
    return result;
  };

  const cacheName = options.cacheName || "swr-cache";
  const matchCallback = options.matchCallback || defaultMatchCallback;
  const plugins = options.plugins || [];
  plugins.push(
    new CacheableResponsePlugin({
      statuses: [0, 200],
    })
  );
  const strategy = new StaleWhileRevalidate({
    cacheName,
    plugins,
  });
  registerRoute(matchCallback, strategy);
}
