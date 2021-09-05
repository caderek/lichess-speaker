const $toggle = document.getElementById("toggle");
const $volume = document.getElementById("volume");
const $countdown = document.getElementById("countdown");
const $moments = document.getElementById("moments");

const turnOn = () => {
  $toggle.classList.add("toggle--active");
  $toggle.innerText = "ACTIVE";
  $toggle.dataset.status = "on";
};

chrome.storage.sync.get(
  ["active", "volume", "sayMoments", "countdownWhen"],
  (config) => {
    if (config.active) {
      turnOn();
    }

    $volume.value = config.volume;
    $countdown.value = config.countdownWhen;
    $moments.value = config.sayMoments.join("\n");
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
