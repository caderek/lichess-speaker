const main = () => {
  let tab = "Bullet";

  const $toggle = document.getElementById("toggle");
  const $volume = document.getElementById("volume");
  const $countdown = document.getElementById("countdown");
  const $countdownItems = $countdown.querySelectorAll("button");
  const $moments = document.getElementById("moments");
  const $voice = document.getElementById("voice");
  const $rate = document.getElementById("rate");
  const $readPlayer1 = document.getElementById("read-player-1");
  const $readPlayer2 = document.getElementById("read-player-2");
  const $readTime = document.getElementById("read-time");
  const $tabsBox = document.getElementById("tabs");
  const $tabs = document.querySelectorAll("#tabs button");

  const voices = speechSynthesis.getVoices();
  const defaultVoice = voices.find((item) => (item.lang = "en-US"));

  const voiceOptions = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name
          .replace(/Google/gi, "")
          .trim()}</option>`
    )
    .join("\n");

  $voice.innerHTML = voiceOptions;

  const turnOn = () => {
    $toggle.classList.add("toggle--active");
    $toggle.innerText = "ACTIVE";
    $toggle.dataset.status = "on";
  };

  chrome.storage.sync.get(
    [
      "active",
      "volume",
      "rate",
      "sayMomentsBullet",
      "sayMomentsBlitz",
      "sayMomentsRapid",
      "sayMomentsClassical",
      "countdownWhen",
      "voice",
      "lang",
      "readPlayer1",
      "readPlayer2",
      "readTime",
      "tab",
    ],
    (config) => {
      tab = config.tab;

      if (config.active) {
        turnOn();
      }

      $volume.value = config.volume;
      $rate.value = config.rate;
      $moments.value = config[`sayMoments${config.tab}`].join("\n");
      $readPlayer1.checked = config.readPlayer1;
      $readPlayer2.checked = config.readPlayer2;
      $readTime.checked = config.readTime;

      if (config.readTime) {
        $readTime.classList.add("read__toggle--active");
      }

      if (config.readPlayer1) {
        $readPlayer1.classList.add("read__toggle--active");
      }

      if (config.readPlayer2) {
        $readPlayer2.classList.add("read__toggle--active");
      }

      $countdown
        .querySelector(`[data-val="${config.countdownWhen}"]`)
        .classList.add("countdown__val--active");

      $tabsBox
        .querySelector(`[data-type="${config.tab}"]`)
        .classList.add("tab--active");

      const selectedVoice = voices.find((item) => {
        return config.voice
          ? item.name === config.voice
          : item.lang === config.lang;
      });

      const lang = selectedVoice ? selectedVoice.lang : defaultVoice.lang;
      const voice = selectedVoice ? selectedVoice.name : defaultVoice.name;
      chrome.storage.sync.set({ lang, voice });

      $voice.querySelector(`option[value="${voice}"]`).selected = true;
    }
  );

  $toggle.addEventListener("click", () => {
    if ($toggle.dataset.status === "on") {
      $toggle.classList.remove("toggle--active");
      $toggle.innerText = "INACTIVE";
      $toggle.dataset.status = "off";
      chrome.storage.sync.set({ active: false });
    } else {
      turnOn();
      chrome.storage.sync.set({ active: true });
    }
  });

  $volume.addEventListener("change", () => {
    chrome.storage.sync.set({ volume: Number($volume.value) });
  });

  $rate.addEventListener("change", () => {
    chrome.storage.sync.set({ rate: Number($rate.value) });
  });

  $countdown.addEventListener("click", ({ target }) => {
    if (target.classList.contains("countdown__val")) {
      $countdownItems.forEach((item) =>
        item.classList.remove("countdown__val--active")
      );
      target.classList.add("countdown__val--active");
      const val = Number(target.dataset.val);
      chrome.storage.sync.set({ countdownWhen: val });
    }
  });

  const updateMoments = () => {
    const raw = $moments.value;
    const items = (
      raw.toLowerCase().match(/((every|move) +){0,1}\d+\:\d\d/g) || []
    )
      .map((item) => {
        const segments = item.replace(/\s{2,}/g, " ").split(" ");
        return segments.length > 1
          ? `${segments[0]} ${segments[1].padStart(5, "0")}`
          : segments[0].padStart(5, "0");
      })
      .sort((a, b) => (a === b ? 0 : a > b ? -1 : 1));

    chrome.storage.sync.set({ [`sayMoments${tab}`]: items });

    return items.join("\n");
  };

  $moments.addEventListener("change", () => {
    const val = updateMoments();
    $moments.value = val;
  });

  $moments.addEventListener("input", updateMoments);

  $voice.addEventListener("change", ({ target }) => {
    const voice = voices.find((item) => item.name === target.value);
    chrome.storage.sync.set({ voice: voice.name, lang: voice.lang });
  });

  $readTime.addEventListener("click", () => {
    const isActive = $readTime.classList.contains("read__toggle--active");
    $readTime.classList[isActive ? "remove" : "add"]("read__toggle--active");
    chrome.storage.sync.set({ readTime: !isActive });
  });

  $readPlayer1.addEventListener("click", () => {
    const isActive = $readPlayer1.classList.contains("read__toggle--active");
    $readPlayer1.classList[isActive ? "remove" : "add"]("read__toggle--active");
    chrome.storage.sync.set({ readPlayer1: !isActive });
  });

  $readPlayer2.addEventListener("click", () => {
    const isActive = $readPlayer2.classList.contains("read__toggle--active");
    $readPlayer2.classList[isActive ? "remove" : "add"]("read__toggle--active");
    chrome.storage.sync.set({ readPlayer2: !isActive });
  });

  $tabsBox.addEventListener("click", ({ target }) => {
    if (
      target.classList.contains("tab") &&
      !target.classList.contains("tab--active")
    ) {
      tab = target.dataset.type;

      $tabs.forEach(($tab) => {
        $tab.classList.remove("tab--active");
      });

      target.classList.add("tab--active");
      chrome.storage.sync.set({ tab });

      const momentsName = `sayMoments${tab}`;

      chrome.storage.sync.get([momentsName], (config) => {
        $moments.value = config[momentsName].join("\n");
      });
    }
  });
};

window.speechSynthesis.onvoiceschanged = main;
