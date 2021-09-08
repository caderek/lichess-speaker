{
  let config = {
    active: true,
    lang: "en-US",
    voice: null,
    volume: 0,
    rate: 1,
    sayMoments: [],
    countdownWhen: 0,
    readPlayer1: false,
    readPlayer2: false,
  };

  const intl = {
    "de-DE": {
      min: (num) => (num === 1 ? "Minute" : "Minuten"),
      sec: (num) => (num === 1 ? "Sekunde" : "Sekunden"),
      moves: {
        x: " schlägt ",
        "+": " Schach",
        "#": " Schachmatt",
        "=": " verwandelt ",
        P: "Bauer ",
        R: "Turm ",
        B: "Läufer ",
        N: "Springer ",
        Q: "Dame ",
        K: "König ",
        "O-O": "kurze Rochade",
        "O-O-O": "lange Rochade",
      },
    },
    "en-US": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "second" : "seconds"),
      moves: {
        x: " takes ",
        "+": " check",
        "#": " mate",
        "=": " promotes ",
        P: "pawn ",
        R: "rook ",
        B: "bishop ",
        N: "knight ",
        Q: "queen ",
        K: "king ",
        "O-O": "short castle",
        "O-O-O": "long castle",
      },
    },
    "en-GB": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "second" : "seconds"),
      moves: {
        x: " takes ",
        "+": " check",
        "#": " mate",
        "=": " promotes ",
        P: "pawn ",
        R: "rook ",
        B: "bishop ",
        N: "knight ",
        Q: "queen ",
        K: "king ",
        "O-O": "short castle",
        "O-O-O": "long castle",
      },
    },
    "pl-PL": {
      min: (num) =>
        num === 1 ? "minuta" : num > 1 && num < 5 ? "minuty" : "minut",
      sec: (num) =>
        num === 1 ? "sekunda" : num > 1 && num < 5 ? "sekundy" : "sekund",
      moves: {
        x: " bije ",
        "+": " szach",
        "#": " mat",
        "=": " promocja ",
        P: "pion ",
        R: "wieża ",
        B: "goniec ",
        N: "skoczek ",
        Q: "hetman ",
        K: "król ",
        "O-O": "krótka roszada",
        "O-O-O": "długa roszada",
      },
    },
    "es-ES": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
      moves: {
        x: " captura ",
        "+": " jaque",
        "#": " mate",
        "=": " corona ",
        P: "peón ",
        R: "torre ",
        B: "alfil ",
        N: "caballo ",
        Q: "reina ",
        K: "rey ",
        "O-O": "enroque corto",
        "O-O-O": "enroque largo",
      },
    },
    "es-US": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
      moves: {
        x: " captura ",
        "+": " jaque",
        "#": " mate",
        "=": " corona ",
        P: "peón ",
        R: "torre ",
        B: "alfil ",
        N: "caballo ",
        Q: "reina ",
        K: "rey ",
        "O-O": "enroque corto",
        "O-O-O": "enroque largo",
      },
    },
    "fr-FR": {
      min: (num) => (num === 1 ? "minute" : "minutes"),
      sec: (num) => (num === 1 ? "seconde" : "secondes"),
      moves: {
        x: " prends ",
        "+": " échec",
        "#": " échec et mat",
        "=": " promeut ",
        P: "pion ",
        R: "tour ",
        B: "fou ",
        N: "cavalier ",
        Q: "dame ",
        K: "roi ",
        "O-O": "petit roque",
        "O-O-O": "grand roque",
      },
    },
    "hi-IN": {
      min: (num) => "मिनट",
      sec: (num) => "सेकेंड",
      moves: {
        x: " मार दिया ",
        "+": " /शाह",
        "#": " /शाह और मात",
        "=": " /उन्नति ",
        P: "/प्यादा ",
        R: "/हाथी ",
        B: "/ऊँट ",
        N: "/घोड़ा ",
        Q: "-वज़ीर ",
        K: "-बादशाह ",
        "O-O": "/लघु कैसल",
        "O-O-O": "/दीर्घ कैसल",
      },
    },
    "id-ID": {
      min: (num) => "menit",
      sec: (num) => "detik",
    },
    "it-IT": {
      min: (num) => (num === 1 ? "minuto" : "minuti"),
      sec: (num) => (num === 1 ? "secondo" : "secondi"),
      moves: {
        x: " cattura ",
        "+": " scacco",
        "#": " matto",
        "=": " promuove ",
        P: "pedone ",
        R: "torre ",
        B: "alfiere ",
        N: "cavallo ",
        Q: "donna ",
        K: "re ",
        "O-O": "arrocco corto",
        "O-O-O": "arrocco lungo",
      },
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
      moves: {
        x: " slaat ",
        "+": " schaak",
        "#": " mat",
        "=": " promoveert ",
        P: "pion ",
        R: "toren ",
        B: "loper ",
        N: "paard ",
        Q: "dame ",
        K: "koning ",
        "O-O": "korte rokade",
        "O-O-O": "lange rokade",
      },
    },
    "pt-BR": {
      min: (num) => (num === 1 ? "minuto" : "minutos"),
      sec: (num) => (num === 1 ? "segundo" : "segundos"),
      moves: {
        x: " captura ",
        "+": " xeque",
        "#": " xeque-mate",
        "=": " promove ",
        P: "peão ",
        R: "torre ",
        B: "bispo ",
        N: "cavalo ",
        Q: "dama ",
        K: "rei ",
        "O-O": "roque curto",
        "O-O-O": "roque grande",
      },
    },
    "ru-RU": {
      min: (num) =>
        num === 1 ? "минута" : num > 1 && num < 5 ? "минуты" : "минут",
      sec: (num) =>
        num === 1 ? "секунда" : num > 1 && num < 5 ? "секунды" : "секунд",
      moves: {
        x: " берёт ",
        "+": " шах",
        "#": " мат",
        "=": " превращается ",
        P: "пешка ",
        R: "ладья ",
        B: "слон ",
        N: "конь ",
        Q: "ферзь ",
        K: "король ",
        "O-O": "короткая рокировка",
        "O-O-O": "длинная рокировка",
      },
    },
    "zh-CN": {
      min: (num) => "分钟",
      sec: (num) => "秒",
      moves: {
        x: " 杀 ",
        "+": " 将军",
        "#": " 将死",
        "=": " 升变 ",
        P: "兵 ",
        R: "车 ",
        B: "象 ",
        N: "马 ",
        Q: "后 ",
        K: "王 ",
        "O-O": "短易位",
        "O-O-O": "长易位",
      },
    },
    "zh-HK": {
      min: (num) => "分钟",
      sec: (num) => "秒",
      moves: {
        x: " 杀 ",
        "+": " 将军",
        "#": " 将死",
        "=": " 升变 ",
        P: "兵 ",
        R: "车 ",
        B: "象 ",
        N: "马 ",
        Q: "后 ",
        K: "王 ",
        "O-O": "短易位",
        "O-O-O": "长易位",
      },
    },
    "zh-TW": {
      min: (num) => "分钟",
      sec: (num) => "秒",
      moves: {
        x: " 杀 ",
        "+": " 将军",
        "#": " 将死",
        "=": " 升变 ",
        P: "兵 ",
        R: "车 ",
        B: "象 ",
        N: "马 ",
        Q: "后 ",
        K: "王 ",
        "O-O": "短易位",
        "O-O-O": "长易位",
      },
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

  const sayMoves = (targetNode, voices) => {
    let movesLength = 0;
    const p1 = document.querySelector(".orientation-black") ? "black" : "white";
    const p2 = p1 === "black" ? "white" : "black";

    const handler = () => {
      const words = getIntl(config.lang).moves || getIntl("en-US").moves;

      const $moves = targetNode.querySelectorAll("u8t");
      const moveColor = $moves.length % 2 === 0 ? "black" : "white";

      if (
        (moveColor === p1 && !config.readPlayer1) ||
        (moveColor === p2 && !config.readPlayer2)
      ) {
        return;
      }

      if ($moves.length > movesLength) {
        let move = $moves[$moves.length - 1].innerText;

        if (move === "O-O" || move === "O-O-O") {
          move = words[move];
        } else {
          const special = move.match(/[a-h1-8][a-h][1-8]/);

          if (special) {
            move = move.replace(
              special[0],
              `${special[0][0]} ${special[0][1]}${special[0][2]}`
            );
          }

          move = move
            .split("")
            .map((x) => words[x] || x)
            .join("")
            .replace(/\s{2,}/g, " ");
        }

        console.log(move);

        const info = new SpeechSynthesisUtterance(move);
        info.volume = config.volume / 100;
        info.lang = config.lang;
        info.voice = voices.find((voice) => voice.name === config.voice);
        info.rate = 1 + config.rate / 10;
        speechSynthesis.speak(info);
        movesLength++;
      }
    };

    const observer = new MutationObserver(handler);

    observer.observe(targetNode, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  };

  const main = () => {
    let last = null;
    const site = checkSite();
    const targetNode = getTargetNode(site);
    const movesNode = document.querySelector("rm6");
    const voices = speechSynthesis.getVoices();

    if (movesNode) {
      sayMoves(movesNode, voices);
    }

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
        info.rate = 1 + config.rate / 10;

        speechSynthesis.speak(info);
      } else if (min === 0 && sec <= config.countdownWhen && sec !== last) {
        const info = new SpeechSynthesisUtterance(sec);
        info.volume = config.volume / 100;
        info.lang = config.lang;
        info.voice = voices.find((voice) => voice.name === config.voice);
        info.rate = 1 + config.rate / 10;
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
