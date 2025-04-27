const allowedHosts = ["https://www.njuskalo.hr/prodaja-stanova", "https://www.njuskalo.hr/nekretnine", "https://www.njuskalo.hr/prodaja-kuca"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const isAllowed = allowedHosts.some((host) => tab.url.startsWith(host));

    if (isAllowed) {
      chrome.scripting
        .executeScript({
          target: { tabId },
          files: ["./foreground.js"],
        })
        .catch((error) => {
          console.error("Error injecting foreground script:", error);
        });
    }
  }
});
