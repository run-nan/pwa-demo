import { cacheFirstCache } from "./cache-first-cache";
import { swrCache } from "./swr-cache";

const match =
  (directory) =>
  ({ request }) => {
    const origin = new URL(request.url).origin;
    const isSameOrigin = origin === self.location.origin;
    return isSameOrigin && request.url.includes(`/${directory}/`);
  };

export default (params) => {
  if (!params.offlineMode) {
    console.log("installed onlineMode service worker");
    swrCache({
      matchCallback: match("docs"),
    });
    cacheFirstCache({
      matchCallback: match("assets"),
    });
  }
};
