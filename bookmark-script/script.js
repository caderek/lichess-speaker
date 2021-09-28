(() => {
  const isTV = document.location.pathname.split("/").includes("tv");

  const prepareMoments = (rawMoments) => {
    const moments = { move: [], "move-every": [], every: [], unique: [] };
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

  let config = {
    active: true,
    lang: "en-US",
    voice: null,
    volume: 25,
    rate: 0,
    sayMomentsBullet: prepareMoments([
      "move 00:05",
      "every 00:30",
      "00:45",
      "00:15",
    ]),
    sayMomentsBlitz: prepareMoments([
      "move 00:10",
      "every 01:00",
      "00:45",
      "00:30",
      "00:15",
    ]),
    sayMomentsRapid: prepareMoments([
      "move 00:20",
      "every 02:00",
      "01:00",
      "00:45",
      "00:30",
      "00:15",
    ]),
    sayMomentsClassical: prepareMoments([
      "move 01:00",
      "every 05:00",
      "01:00",
      "00:45",
      "00:30",
      "00:15",
    ]),
    saySeconds: true,
    countdownWhen: 5,
    readPlayer1: true,
    readPlayer2: true,
    readTime: true,
    tab: "Bullet",
  };
  let mute = false;
  let fullBlindfold = false;
  let timeControl = "Bullet";
  let moveTime = 0;
  let playersTurn = false;

  const intl = {
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
          min > 0 ? `${min} ${getIntl(config.lang).min(min)},` : "";
        let secText = "";
        if (sec > 0) {
          secText = `${sec}`;
          if (config.saySeconds) {
            secText += ` ${getIntl(config.lang).sec(sec)}`;
          }
        }
        const text = `${minText} ${secText}`;
        say(text, voices);
      }

      if (playersTurn && !isTV) {
        moveTime++;

        if (
          sayMoments.move.includes(moveTime) ||
          sayMoments["move-every"].some((interval) => moveTime % interval === 0)
        ) {
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
    console.log("Starting Lichess Speaker...");

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

  main();
})();
