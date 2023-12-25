import { pageCache, staticResourceCache, imageCache } from "workbox-recipes";

export default (params) => {
  if (!params.offlineMode) {
    console.log("installed onlineMode service worker");
    pageCache();
    staticResourceCache();
    imageCache();
  }
};
