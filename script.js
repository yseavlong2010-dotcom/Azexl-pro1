console.log("Embee Birthday World V5 loaded 💙");

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const intro = $("#intro");
  const page = $("#page");
  const bgMusic = $("#bgMusic");
  const effectLayer = $("#effectLayer");

  let loveScore = 100;
  let siteOpened = false;

  const loveNotes = [
    "Embee là kiểu người chỉ cần xuất hiện thôi cũng khiến một ngày bình thường trở nên dịu hơn.",
    "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
    "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
    "Anh mong Embee luôn được yêu thương bằng sự kiên nhẫn, dịu dàng và thật lòng.",
    "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương."
  ];

  const gachaNotes = [
    "Anh mong Embee luôn được đối xử thật dịu dàng, nhất là vào những ngày em thấy mình hơi mệt.",
    "Nếu thế giới ngoài kia làm Embee buồn, anh mong em nhớ rằng vẫn có một người rất muốn đứng về phía em.",
    "Anh thích cách Embee là chính Embee: đáng yêu, hơi nhõng nhẽo, mềm mại và rất riêng trong lòng anh.",
    "Chúc Embee tuổi mới có nhiều matcha latte ngon, nhiều chocolate ngọt, nhiều món ăn em thích và nhiều bình yên.",
    "Anh không hứa sẽ hoàn hảo, nhưng anh muốn học cách yêu Embee tử tế hơn từng ngày.",
    "Embee xứng đáng với những điều được chuẩn bị bằng sự để tâm, không phải bằng những lời nói qua loa.",
    "Mong Embee luôn có cảm giác an toàn khi ở bên anh, vì em không cần phải mạnh mẽ một mình mãi đâu.",
    "Happy Birthday Embee. Anh thương em bằng những điều nhỏ, nhưng thật lòng.",
    "Nếu được chọn một điều đẹp nhất hôm nay, anh vẫn chọn nụ cười của Embee."
  ];

  function on(element, eventName, callback) {
    if (!element) return;
    element.addEventListener(eventName, callback);
  }

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function openSite() {
    if (siteOpened) return;
    siteOpened = true;

    if (page) {
      page.classList.remove("hidden");
    }

    if (intro) {
      intro.classList.add("hide");

      setTimeout(() => {
        intro.style.display = "none";
      }, 850);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    playMusic();
    revealVisible();
    burstCute(32);
  }

  on($("#openButton"), "click", openSite);
  on($("#giftButton"), "click", openSite);

  async function playMusic() {
    if (!bgMusic) return;

    try {
      bgMusic.volume = 0.58;
      await bgMusic.play();
      setMusicUI(true);
    } catch (error) {
      setMusicUI(false);
      console.log("Music play blocked until user interaction.");
    }
  }

  function pauseMusic() {
    if (!bgMusic) return;

    bgMusic.pause();
    setMusicUI(false);
  }

  function setMusicUI(isPlaying) {
    const musicButton = $("#musicButton");
    const audioDisc = $("#audioDisc");
    const waveBars = $("#waveBars");

    if (musicButton) {
      musicButton.textContent = isPlaying ? "❚❚" : "▶";
    }

    if (audioDisc) {
      audioDisc.classList.toggle("playing", isPlaying);
    }

    if (waveBars) {
      waveBars.classList.toggle("playing", isPlaying);
    }
  }

  on($("#musicButton"), "click", () => {
    if (!bgMusic) return;

    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("show"));
  }

  function revealVisible() {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.95) {
        item.classList.add("show");
      }
    });
  }

  on($("#goToPlayground"), "click", () => {
    const playground = $("#playground");

    if (playground) {
      playground.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  on($("#quickLoveButton"), "click", () => {
    const heroNote = $("#heroNote");

    if (heroNote) {
      heroNote.innerHTML = `
        <span>private note</span>
        ${randomItem(loveNotes)}
      `;
    }

    increaseLove();
    burstCute(22);
  });

  function increaseLove() {
    loveScore += Math.floor(Math.random() * 8) + 3;

    const loveScoreElement = $("#loveScore");

    if (loveScoreElement) {
      loveScoreElement.textContent = loveScore + "%";
    }
  }

  function activateCard(cardId) {
    const card = $("#" + cardId);

    if (!card) return;

    card.classList.add("active");

    setTimeout(() => {
      card.classList.remove("active");
    }, 1400);
  }

  function setPlayMessage(message) {
    const playMessage = $("#playMessage");

    if (!playMessage) return;

    playMessage.textContent = message;

    if (playMessage.animate) {
      playMessage.animate(
        [
          { transform: "scale(0.98)", opacity: 0.75 },
          { transform: "scale(1.02)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 }
        ],
        {
          duration: 520,
          easing: "cubic-bezier(.2,.8,.2,1)"
        }
      );
    }
  }

  function setupToy(cardId, message, effectFunction) {
    const card = $("#" + cardId);

    if (!card) return;

    card.addEventListener("click", () => {
      activateCard(cardId);
      setPlayMessage(message);
      effectFunction();
      increaseLove();
    });
  }

  setupToy(
    "matchaCard",
    "🍵 Matcha của Embee đang được khuấy lên rồi nè. Mong tuổi mới của em luôn dịu, xanh và ngọt vừa đủ như ly matcha em thích.",
    () => {
      spawnMatchaDrops(26);
      burstCute(8);
    }
  );

  setupToy(
    "chocoCard",
    "🍫 Chocolate topping rơi xuống rồi đó. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.",
    () => {
      spawnFalling(["🍫", "▪", "◆", "●"], 34);
    }
  );

  setupToy(
    "petCard",
    "🐶🐱 Cún mèo chạy qua chào Embee nè. Dễ thương gặp dễ thương là trang web cũng chịu không nổi luôn á.",
    () => {
      spawnPaws(18);
      burstCute(8);
    }
  );

  setupToy(
    "noodleCard",
    "🍜 Tô mì nhảy lên vì sinh nhật Embee đó. Mong tuổi mới của em có thật nhiều món ngon, nhiều ngày vui, nhiều lần được dỗ dành.",
    () => {
      spawnFalling(["🍜", "🥢", "✨"], 24);
    }
  );

  setupToy(
    "cakeCard",
    "🧁 Nến sáng rồi. Hôm nay Embee là điều đáng được ước nguyện nhất, nên anh mong mọi điều tốt đẹp sẽ tìm đến em.",
    () => {
      spawnFalling(["🧁", "🍰", "✨", "💙"], 28);
      burstCute(8);
    }
  );

  setupToy(
    "crocsCard",
    "🩴 Crocs cute đã bắt đầu đi dạo. Mong Embee bước qua tuổi mới thật thoải mái, tự tin, bình yên và vẫn đáng yêu như vậy.",
    () => {
      spawnSteps(14);
    }
  );

  on($("#gachaButton"), "click", () => {
    const gachaMachine = $("#gachaMachine");
    const gachaResult = $("#gachaResult");

    if (gachaMachine) {
      gachaMachine.classList.add("shake");
    }

    if (gachaResult) {
      gachaResult.textContent = "Đang rút lời thương cho Embee...";
    }

    setTimeout(() => {
      if (gachaResult) {
        gachaResult.textContent = randomItem(gachaNotes);
      }

      if (gachaMachine) {
        gachaMachine.classList.remove("shake");
      }

      increaseLove();
      burstCute(18);
    }, 650);
  });

  $$(".gallery-img").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = makeFallbackImage("Embee 💙");
    });
  });

  $$(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.querySelector("img");
      const lightbox = $("#lightbox");
      const lightboxImage = $("#lightboxImage");

      if (!image || !lightbox || !lightboxImage) return;

      lightboxImage.src = image.src;
      lightbox.classList.add("show");
    });
  });

  on($("#lightbox"), "click", () => {
    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightboxImage");

    if (lightbox) {
      lightbox.classList.remove("show");
    }

    if (lightboxImage) {
      lightboxImage.src = "";
    }
  });

  function appendEffect(element, removeAfter = 6000) {
    if (!effectLayer) return;

    effectLayer.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, removeAfter);
  }

  function burstCute(amount = 18) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const item = document.createElement("div");

        item.className = "fx fx-up";
        item.textContent = randomItem([
          "💙",
          "🩵",
          "☁️",
          "🍵",
          "🍫",
          "🐾",
          "🐶",
          "🐱",
          "🧁",
          "🍜",
          "✨"
        ]);

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = 16 + Math.random() * 22 + "px";
        item.style.animationDuration = 4.4 + Math.random() * 2.8 + "s";

        appendEffect(item, 7600);
      }, i * 45);
    }
  }

  function spawnFalling(items, amount = 20) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const item = document.createElement("div");

        item.className = "fx fx-down";
        item.textContent = randomItem(items);

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = 14 + Math.random() * 18 + "px";
        item.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";

        appendEffect(item, 5600);
      }, i * 42);
    }
  }

  function spawnMatchaDrops(amount = 18) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const item = document.createElement("div");

        item.className = "fx fx-down matcha-drop";
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2.5 + Math.random() * 2.1 + "s";

        appendEffect(item, 5600);
      }, i * 48);
    }
  }

  function spawnPaws(amount = 12) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const item = document.createElement("div");

        item.className = "fx fx-paw";
        item.textContent = randomItem(["🐾", "🐶", "🐱"]);

        item.style.top = 18 + Math.random() * 68 + "vh";
        item.style.fontSize = 18 + Math.random() * 18 + "px";
        item.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";

        appendEffect(item, 3400);
      }, i * 90);
    }
  }

  function spawnSteps(amount = 10) {
    const startX = 12 + Math.random() * 15;
    const startY = 76 + Math.random() * 8;

    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const item = document.createElement("div");

        item.className = "fx fx-step";
        item.textContent = i % 2 === 0 ? "🩴" : "☁️";

        item.style.left = startX + i * 6 + "vw";
        item.style.top = startY - i * 3 + "vh";
        item.style.fontSize = "1.7rem";
        item.style.animationDuration = "1.8s";

        appendEffect(item, 2300);
      }, i * 120);
    }
  }

  document.addEventListener("click", (event) => {
    if (!siteOpened) return;

    const clickedInteractive = event.target.closest(
      "button, .gallery-card, .toy-card, .lightbox"
    );

    if (clickedInteractive) return;

    const item = document.createElement("div");

    item.className = "fx fx-up";
    item.textContent = randomItem(["💙", "🩵", "☁️", "✨"]);

    item.style.left = event.clientX + "px";
    item.style.bottom = window.innerHeight - event.clientY + "px";
    item.style.fontSize = "20px";
    item.style.animationDuration = "3.5s";

    appendEffect(item, 4200);
  });

  setInterval(() => {
    if (siteOpened) {
      burstCute(1);
    }
  }, 1500);

  function makeFallbackImage(label) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#9fe2ff"/>
            <stop offset="55%" stop-color="#d9f4ff"/>
            <stop offset="100%" stop-color="#b7d77a"/>
          </linearGradient>
        </defs>
        <rect width="900" height="1100" fill="url(#g)"/>
        <circle cx="690" cy="180" r="130" fill="rgba(255,255,255,0.35)"/>
        <circle cx="210" cy="880" r="180" fill="rgba(255,255,255,0.25)"/>
        <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial" font-size="70" font-weight="700" fill="#08213b">💙</text>
        <text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial" font-size="44" font-weight="700" fill="#08213b">${label}</text>
      </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }
});
