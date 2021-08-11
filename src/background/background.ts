chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {
      cancel: true,
    };
  },
  {
    urls: ["*://*.googleadservices.com/*", "*://*.tpc.googlesyndication.com/*", "*://*.g.doubleclick.net/*"],
  },
  ["blocking"]
);
