const defaultConfig = {
  active: true,
  volume: 25,
  sayMoments: ["00:45", "00:30", "00:15"],
  countdownWhen: 5,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultConfig);
});

// chrome.storage.sync.set(defaultConfig);

const sendMessage = (msg, data) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { msg, data });
  });
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request) {
    if (request.msg === "GET_CONFIG") {
      sendResponse("ok");

      chrome.storage.sync.get(
        ["active", "volume", "sayMoments", "countdownWhen"],
        (config) => {
          sendMessage("SET_CONFIG", config);
        }
      );
    }
  }
});
