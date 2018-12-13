let added_listener = false;

let alert_for_close = () => {
  return 'Are you sure?';
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request == 'added_listener') {
    sendResponse(added_listener);
  } else if (request == 'toggle') {
    if (added_listener) {
      window.onbeforeunload = null;
    } else {
      window.onbeforeunload = alert_for_close;
    }
    added_listener = !added_listener;
    sendResponse(added_listener);
  }
});