function changeIcon(enabled) {
  if (enabled) {
    chrome.browserAction.setIcon({
      path: {
        "32": "icons/enable/32.png",
        "48": "icons/enable/48.png",
        "64": "icons/enable/64.png",
        "96": "icons/enable/96.png",
        "128": "icons/enable/128.png"
      }
    });
  } else {
    chrome.browserAction.setIcon({
      path: {
        "32": "icons/disable/32.png",
        "48": "icons/disable/48.png",
        "64": "icons/disable/64.png",
        "96": "icons/disable/96.png",
        "128": "icons/disable/128.png"
      }
    });
  }
}

chrome.tabs.onSelectionChanged.addListener((tabId) => {
  chrome.tabs.sendMessage(tabId, 'added_listener', (res) => {
    changeIcon(res);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    changeIcon(false);
  }
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'toggle', (res) => {
      changeIcon(res);
    });
  });
});
