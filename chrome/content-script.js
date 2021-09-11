{
  const isTV = document.location.pathname.split("/").includes("tv");
  let config = null;
  let mute = false;
  let fullBlindfold = false;
  let timeControl = "Bullet";
  let moveTime = 0;
  let playersTurn = false;

  const intl = {
    "de-DE": {
      min: (num) => (num === 1 ? "Minute" : "Minuten"),
      sec: (num) => (num === 1 ? "Sekunde" : "Sekunden"),
      moves: {
        x: " schlägt ",
        "+": " Schach",
        "#": " Schachmatt",
        "=": " umgewandelt ",
        P: "Bauer ",
        R: "Turm ",
        B: "Läufer ",
        N: "Springer ",
        Q: "Dame ",
        K: "König ",
        "O-O": "kurze Rochade",
        "O-O-O": "lange Rochade",
      },
      alerts: {
        move: "Bewegung!",
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
      alerts: {
        move: "Move!",
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
      alerts: {
        move: "Move!",
      },
    },
    "pl-PL": {
      min: (num) => {
        if (num === 1) {
          return "minuta";
        }

        const str = String(num);
        const last = Number(str[str.length - 1]);

        if (last > 1 && last < 5) {
          return "minuty";
        }

        return "minut";
      },
      sec: (num) => {
        if (num === 1) {
          return "sekunda";
        }

        const str = String(num);
        const last = Number(str[str.length - 1]);

        if (last > 1 && last < 5) {
          return "sekundy";
        }

        return "sekund";
      },
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
      alerts: {
        move: "Wykonaj ruch!",
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
      alerts: {
        move: "¡Moverse!",
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
      alerts: {
        move: "¡Moverse!",
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
      alerts: {
        move: "Se déplacer!",
      },
    },
    "hi-IN": {
      min: () => "मिनट",
      sec: () => "सेकेंड",
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
      alerts: {
        move: "कदम!",
      },
    },
    "id-ID": {
      min: () => "menit",
      sec: () => "detik",
      moves: {
        x: " tangkap ",
        "+": " Sekak",
        "#": " Sekakmat",
        "=": " promosi ",
        P: "pion ",
        R: "benteng ",
        B: "gajah ",
        N: "kuda ",
        Q: "menteri ",
        K: "raja ",
        "O-O": "rokade pendek",
        "O-O-O": "rokade jauh",
      },
      alerts: {
        move: "Melangkah!",
      },
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
      alerts: {
        move: "Spostare!",
      },
    },
    "ja-JP": {
      min: () => "分",
      sec: () => "秒",
      moves: {
        x: " とる ",
        "+": " チェック",
        "#": " チェックメイト",
        "=": " プロモーション ",
        P: "ポーン  ",
        R: "ルーク ",
        B: "ビショップ ",
        N: "ナイト ",
        Q: "クイーン ",
        K: "キング ",
        "O-O": "キャスリングショート",
        "O-O-O": "キャスリングロング",
      },
      alerts: {
        move: "動く！",
      },
    },
    "ko-KR": {
      min: () => "분",
      sec: () => "초",
      moves: {
        x: " 캡처 ",
        "+": " 체크",
        "#": " 체크메이트",
        "=": " 촉진 ",
        P: "폰  ",
        R: "룩 ",
        B: "비숍 ",
        N: "나이트 ",
        Q: "퀸 ",
        K: "킹 ",
        "O-O": "캐슬링 쇼트",
        "O-O-O": "캐슬링 롱",
      },
      alerts: {
        move: "이동하다!",
      },
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
      alerts: {
        move: "Beweging!",
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
      alerts: {
        move: "Mover!",
      },
    },
    "ru-RU": {
      min: (num) => {
        if (num === 1) {
          return "минута";
        }

        const str = String(num);
        const last = Number(str[str.length - 1]);

        if (last > 1 && last < 5) {
          return "минуты";
        }

        return "минут";
      },
      sec: (num) => {
        if (num === 1) {
          return "секунда";
        }

        const str = String(num);
        const last = Number(str[str.length - 1]);

        if (last > 1 && last < 5) {
          return "секунды";
        }

        return "секунд";
      },
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
      alerts: {
        move: "двигайся!",
      },
    },
    "zh-CN": {
      min: () => "分钟",
      sec: () => "秒",
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
      alerts: {
        move: "移动！",
      },
    },
    "zh-HK": {
      min: () => "分钟",
      sec: () => "秒",
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
      alerts: {
        move: "移动！",
      },
    },
    "zh-TW": {
      min: () => "分钟",
      sec: () => "秒",
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
      alerts: {
        move: "移动！",
      },
    },
  };

  /**
   * Handles changes to the HTML node
   */
  const observe = ($node, handler) => {
    const observer = new MutationObserver(handler);

    observer.observe($node, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  };

  /**
   * Returns internationalization object
   * */
  const getIntl = (lang) => intl[lang] || intl["en-US"];

  /**
   * Returns moment in format "mm:ss"
   */
  const getMoment = (min, sec) =>
    [String(min).padStart(2, "0"), String(sec).padStart(2, "0")].join(":");

  /**
   * Returns the time on the player's clock
   */
  const getTime = ($node) => {
    const min = Number($node.childNodes[0].data);
    const sec = Number($node.childNodes[2].data);
    const moment = getMoment(min, sec);

    return [min, sec, moment];
  };

  /**
   * Uses speach synthesis to say the provided phrase
   */
  const say = (text, voices) => {
    if (mute) {
      return;
    }

    const info = new SpeechSynthesisUtterance(text);
    info.volume = config.volume / 100;
    info.lang = config.lang;
    info.voice = voices.find((voice) => voice.name === config.voice);
    info.rate = 1 + config.rate / 10;
    speechSynthesis.speak(info);
  };

  /**
   * Reads moves on the chessboard
   */
  const readMoves = ($node, voices) => {
    let movesLength = 0;
    const p1 = document.querySelector(".orientation-black") ? "black" : "white";
    const p2 = p1 === "black" ? "white" : "black";

    const handler = () => {
      const words = getIntl(config.lang).moves || getIntl("en-US").moves;

      const $moves = $node.querySelectorAll("u8t");
      const turn = $moves.length % 2 === 0 ? "black" : "white";

      if ($moves.length > movesLength) {
        moveTime = 0;
        playersTurn = turn === p2;
      }

      if (
        (turn === p1 && !config.readPlayer1) ||
        (turn === p2 && !config.readPlayer2) ||
        !config.active
      ) {
        return;
      }

      if ($moves.length > movesLength) {
        let move = $moves[$moves.length - 1].innerText;

        if (move === "O-O" || move === "O-O-O") {
          move = words[move];
        } else {
          // Handles special cases like R2a6 ore Nbd2
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

        say(move, voices);
        movesLength = $moves.length;
      }
    };

    observe($node, handler);
  };

  /**
   * Reads player's clock status
   */
  const readClock = ($node, voices) => {
    let last = null;

    const handler = () => {
      const [min, sec, moment] = getTime($node);
      const allSeconds = min * 60 + sec;

      if (sec === last || !config.active || !config.readTime) {
        last = sec;
        return;
      }

      if (
        min === 0 &&
        sec <= config.countdownWhen &&
        config.countdownWhen > 0
      ) {
        say(sec, voices);
        last = sec;
        return;
      }

      const sayMoments = config[`sayMoments${timeControl}`];

      if (
        sayMoments.unique.includes(moment) ||
        sayMoments.every.some((interval) => allSeconds % interval === 0)
      ) {
        const minText =
          min > 0 ? `${min} ${getIntl(config.lang).min(min)}` : "";
        const secText =
          sec > 0 ? `${sec} ${getIntl(config.lang).sec(sec)}` : "";
        const text = `${minText} ${secText}`;

        say(text, voices);
      }

      if (playersTurn && !isTV) {
        moveTime++;

        if (sayMoments.move.some((maxMoveTime) => maxMoveTime === moveTime)) {
          say(getIntl(config.lang).alerts.move, voices);
        }
      }

      last = sec;
    };

    observe($node, handler);
  };

  /**
   * Initializes reading fuctions
   */
  const main = () => {
    const $clock = document.querySelectorAll(".time")[1];
    const $moves = document.querySelector("rm6");
    const $setup = document.querySelector(".setup");

    const voices = speechSynthesis.getVoices();

    if ($setup) {
      const match = $setup.innerText.match(/Bullet|Blitz|Rapid|Classical/i);
      timeControl = match ? match[0] : timeControl;
    }

    if ($moves) {
      readMoves($moves, voices);
    }

    if ($clock) {
      readClock($clock, voices);
    }
  };

  /**
   * Sorts different types of moments into separate categories
   */
  const prepareMoments = (rawMoments) => {
    const moments = { move: [], every: [], unique: [] };
    rawMoments.forEach((raw) => {
      if (raw.length === 5) {
        moments.unique.push(raw);
      } else {
        const [kind, moment] = raw.split(" ");
        const [min, sec] = moment.split(":").map(Number);
        const allSeconds = min * 60 + sec;
        moments[kind].push(allSeconds);
      }
    });

    return moments;
  };

  /**
   * Initializes user's config and starts the script
   */
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
    ],
    (data) => {
      config = data;
      config.sayMomentsBullet = prepareMoments(data.sayMomentsBullet);
      config.sayMomentsBlitz = prepareMoments(data.sayMomentsBlitz);
      config.sayMomentsRapid = prepareMoments(data.sayMomentsRapid);
      config.sayMomentsClassical = prepareMoments(data.sayMomentsClassical);
      window.speechSynthesis.onvoiceschanged = main;
    }
  );

  /**
   * Handles updates to the user's config
   */
  chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
      config[key] = key.includes("sayMoments")
        ? prepareMoments(newValue)
        : newValue;
    }
  });

  /**
   * Keyboard shortcuts handler
   */
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "m":
        mute = !mute;
        break;
      case "t":
        document.querySelector(".main-board").classList.toggle("blindfold");
        break;
      case "T":
        const $board = document.querySelector(".main-board");
        const $moves = document.querySelector("rm6");

        fullBlindfold = !fullBlindfold;

        if (fullBlindfold) {
          $board.style.opacity = 0;
          $moves.style.opacity = 0;
        } else {
          $board.style.opacity = 1;
          $moves.style.opacity = 1;
        }
        break;
    }
  });
}
