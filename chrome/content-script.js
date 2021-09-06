{
  let config = {
    active: true,
    volume: 0,
    sayMoments: [],
    countdownWhen: 0,
  };

  const intl = {
    "de-DE": {
      min: (num) => (num === 1 ? "Minute" : "Minuten"),
      sec: (num) => (num === 1 ? "Sekunde" : "Sekunden"),
    },
    "en-US": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "second" : "seconds"),
    },
    "en-GB": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "second" : "seconds"),
    },
    "pl-PL": {
      min: (num) =>
        num === 1 ? "minuta" : num > 1 && num < 5 ? "minuty" : "minut",
      sec: (num) =>
        num === 1 ? "sekunda" : num > 1 && num < 5 ? "sekundy" : "sekund",
    },
    "es-ES": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
    },
    "es-US": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
    },
    "fr-FR": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "seconde" : "secondes"),
    },
    "hi-IN": {
      min: (num) => "मिनट",
      sec: (num) => "सेकेंड",
    },
    "id-ID": {
      min: (num) => "menit",
      sec: (num) => "detik",
    },
    "it-IT": {
      min: (num) => (num === 1 ? "minuto" : "minuti"),
      sec: (num) => (num === 1 ? "secondo" : "secondi"),
    },
    "ja-JP": {
      min: (num) => "分",
      sec: (num) => "秒",
    },
    "ko-KR": {
      min: (num) => "분",
      sec: (num) => "초",
    },
    "nl-NL": {
      min: (num) => (num === 1 ? "minuut" : "minuten"),
      sec: (num) => (num === 1 ? "seconde" : "seconden"),
    },
    "pt-BR": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
    },
    "ru-RU": {
      min: (num) =>
        num === 1 ? "минута" : num > 1 && num < 5 ? "минуты" : "минут",
      sec: (num) =>
        num === 1 ? "секунда" : num > 1 && num < 5 ? "секунды" : "секунд",
    },
    "zh-CN": {
      min: (num) => "分钟",
      sec: (num) => "秒",
    },
    "zh-HK": {
      min: (num) => "分钟",
      sec: (num) => "秒",
    },
    "zh-TW": {
      min: (num) => "分钟",
      sec: (num) => "秒",
    },
  };

  const getIntl = (lang) => intl[lang] || intl["en-US"];

  const checkSite = () => {
    return "lichess";
  };

  const getTargetNode = (site) => {
    return document.querySelectorAll(".time")[1];
  };

  const getMoment = (min, sec) =>
    [String(min).padStart(2, "0"), String(sec).padStart(2, "0")].join(":");

  const getTime = (targetNode, site) => {
    return {
      lichess() {
        const min = Number(targetNode.childNodes[0].data);
        const sec = Number(targetNode.childNodes[2].data);
        const moment = getMoment(min, sec);

        return [min, sec, moment];
      },
    }[site]();
  };

  const main = () => {
    let last = null;
    const site = checkSite();
    const targetNode = getTargetNode(site);
    const voices = speechSynthesis.getVoices();

    if (targetNode === undefined) return;

    const handler = () => {
      if (!config.active) {
        return;
      }

      const [min, sec, moment] = getTime(targetNode, site);

      if (
        config.sayMoments.includes(moment) &&
        sec !== last &&
        (min !== 0 || sec > config.countdownWhen)
      ) {
        const minText =
          min > 0 ? `${min} ${getIntl(config.lang).min(min)}` : "";
        const secText =
          sec > 0 ? `${sec} ${getIntl(config.lang).sec(sec)}` : "";
        const text = `${minText} ${secText}`;
        const info = new SpeechSynthesisUtterance(text);
        info.volume = config.volume / 100;
        info.lang = config.lang;
        info.voice = voices.find((voice) => voice.name === config.voice);
        speechSynthesis.speak(info);
      } else if (min === 0 && sec <= config.countdownWhen && sec !== last) {
        const info = new SpeechSynthesisUtterance(sec);
        info.volume = config.volume / 100;
        info.lang = config.lang;
        info.voice = voices.find((voice) => voice.name === config.voice);
        speechSynthesis.speak(info);
      }
      last = sec;
    };

    const observer = new MutationObserver(handler);

    observer.observe(targetNode, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  };

  chrome.storage.sync.get(
    ["active", "volume", "sayMoments", "countdownWhen", "voice", "lang"],
    (data) => {
      config = data;
      window.speechSynthesis.onvoiceschanged = main;
    }
  );

  chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
      config[key] = newValue;
    }
  });
}
