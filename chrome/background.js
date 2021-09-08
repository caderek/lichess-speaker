const defaultConfig = {
  active: true,
  lang: navigator.language,
  voice: null,
  volume: 25,
  rate: 0,
  sayMoments: ["00:45", "00:30", "00:15"],
  countdownWhen: 5,
  readPlayer1: false,
  readPlayer2: false,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultConfig);
});
