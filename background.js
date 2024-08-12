chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // Check if the tab URL is valid before injecting the content script
            if (tab.url.toLowerCase().includes("job") || tab.url.toLowerCase().includes("career")) {

        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        }).catch(err => {
          console.error('ARI==>Error injecting script:', err);
        });
      }
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateBadge") {
    chrome.action.setBadgeText({ text: request.count.toString() });
  }
});

