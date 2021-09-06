{
  let config = {
    active: true,
    volume: 0,
    sayMoments: [],
    countdownWhen: 0,
  };

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
        const minText = min > 0 ? `${min} minute${min > 1 ? "s" : ""}` : "";
        const secText = sec > 0 ? `${sec} second${sec > 1 ? "s" : ""}` : "";
        const text = `${minText} ${secText}`;
        const info = new SpeechSynthesisUtterance(text);
        info.volume = config.volume / 100;
        speechSynthesis.speak(info);
      } else if (min === 0 && sec <= config.countdownWhen && sec !== last) {
        const info = new SpeechSynthesisUtterance(sec);
        info.volume = config.volume / 100;
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
    ["active", "volume", "sayMoments", "countdownWhen"],
    (data) => {
      config = data;
      setTimeout(main, 0);
    }
  );

  chrome.storage.onChanged.addListener((changes) => {
    for (let [key, { newValue }] of Object.entries(changes)) {
      config[key] = newValue;
    }
  });
}
