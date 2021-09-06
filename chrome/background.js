const defaultConfig = {
  active: true,
  volume: 25,
  sayMoments: ["00:45", "00:30", "00:15"],
  countdownWhen: 5,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultConfig);
});
