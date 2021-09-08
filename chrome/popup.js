const main = () => {
  const $toggle = document.getElementById("toggle");
  const $volume = document.getElementById("volume");
  const $countdown = document.getElementById("countdown");
  const $moments = document.getElementById("moments");
  const $voice = document.getElementById("voice");
  const $rate = document.getElementById("rate");
  const $readPlayer1 = document.getElementById("read-player-1");
  const $readPlayer2 = document.getElementById("read-player-2");

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
      "sayMoments",
      "countdownWhen",
      "voice",
      "lang",
      "readPlayer1",
      "readPlayer2",
    ],
    (config) => {
      if (config.active) {
        turnOn();
      }

      $volume.value = config.volume;
      $rate.value = config.rate;
      $countdown.value = config.countdownWhen;
      $moments.value = config.sayMoments.join("\n");
      $readPlayer1.checked = config.readPlayer1;
      $readPlayer2.checked = config.readPlayer2;

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

  const updateCountdown = () => {
    const val = Math.min(Number($countdown.value), 10);
    $countdown.value = val;
    chrome.storage.sync.set({ countdownWhen: val });
  };

  $countdown.addEventListener("change", updateCountdown);
  $countdown.addEventListener("input", updateCountdown);

  const updateMoments = () => {
    const raw = $moments.value;
    const items = (raw.match(/\d+\:\d\d/g) || []).map((moment) =>
      moment.padStart(5, "0")
    );
    chrome.storage.sync.set({ sayMoments: items });

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

  $readPlayer1.addEventListener("change", () => {
    const val = $readPlayer1.checked;
    chrome.storage.sync.set({ readPlayer1: val });
  });

  $readPlayer2.addEventListener("change", () => {
    const val = $readPlayer2.checked;
    chrome.storage.sync.set({ readPlayer2: val });
  });
};

window.speechSynthesis.onvoiceschanged = main;
