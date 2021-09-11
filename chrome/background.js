const defaultConfig = {
  active: true,
  lang: navigator.language,
  voice: null,
  volume: 25,
  rate: 0,
  sayMomentsBullet: ["move 00:05", "every 00:30", "00:45", "00:15"],
  sayMomentsBlitz: ["move 00:10", "every 01:00", "00:45", "00:30", "00:15"],
  sayMomentsRapid: [
    "move 00:20",
    "every 02:00",
    "01:00",
    "00:45",
    "00:30",
    "00:15",
  ],
  sayMomentsClassical: [
    "move 01:00",
    "every 05:00",
    "01:00",
    "00:45",
    "00:30",
    "00:15",
  ],
  countdownWhen: 5,
  readPlayer1: false,
  readPlayer2: false,
  readTime: true,
  tab: "Bullet",
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultConfig);
});
