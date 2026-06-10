const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const intro = $("#intro");
const page = $("#page");
const bgMusic = $("#bgMusic");
const effectLayer = $("#effectLayer");

let love = 100;

function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/* OPEN SITE */

function openSite() {
  if (intro) {
    intro.classList.add("hide");
    setTimeout(() => {
      intro.style.display = "none";
    }, 850);
  }

  if (page) page.classList.remove("hidden");
  document.body.classList.add("opened");

  playMusic();
  burstCute(28);
  revealVisible();
}

on($("#openBtn"), "click", openSite);

on($("#giftBox"), "click", () => {
  burstCute(14);
});

/* MUSIC */

async function playMusic() {
  if (!bgMusic) return;

  try {
    bgMusic.volume = 0.58;
    await bgMusic.play();
    setMusicUI(true);
  } catch (error) {
    setMusicUI(false);
  }
}

function pauseMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  setMusicUI(false);
}

function setMusicUI(isPlaying) {
  const btn = $("#musicToggle");
  const disc = $("#audioDisc");
  const wave = $("#fakeWave");

  if (btn) btn.textContent = isPlaying ? "❚❚" : "▶";
  if (disc) disc.classList.toggle("playing", isPlaying);
  if (wave) wave.classList.toggle("playing", isPlaying);
}

on($("#musicToggle"), "click", () => {
  if (!bgMusic) return;
  if (bgMusic.paused) playMusic();
  else pauseMusic();
});

/* REVEAL */

const revealItems = $$(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function revealVisible() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) item.classList.add("show");
  });
}

/* HERO BUTTONS */

on($("#toPlayground"), "click", () => {
  const playground = $("#playground");
  if (playground) {
    playground.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

const heroNotes = [
  "Embee là kiểu người chỉ cần xuất hiện thôi cũng khiến một ngày bình thường trở nên dịu hơn.",
  "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
  "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
  "Anh mong Embee luôn được yêu thương bằng sự kiên nhẫn, dịu dàng và thật lòng.",
  "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương."
];

on($("#quickLove"), "click", () => {
  const heroNote = $("#heroNote");

  if (heroNote) {
    heroNote.innerHTML = `<span>private note</span>${randomItem(heroNotes)}`;
  }

  increaseLove();
  burstCute(18);
});

/* TOYS */

const toyMap = {
  matchaToy: {
    card: "matchaCard",
    message:
      "🍵 Matcha của Embee đang được khuấy lên rồi nè. Mong tuổi mới của em luôn dịu, xanh và ngọt vừa đủ như ly matcha em thích.",
    effect: () => spawnMatchaDrops(20)
  },
  chocoToy: {
    card: "chocoCard",
    message:
      "🍫 Chocolate topping rơi xuống rồi đó. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.",
    effect: () => spawnFalling(["🍫", "▪", "◆", "●"], 28)
  },
  petToy: {
    card: "petCard",
    message:
      "🐶🐱 Cún mèo chạy qua chào Embee nè. Dễ thương gặp dễ thương là trang web cũng chịu không nổi luôn á.",
    effect: () => spawnPaws(14)
  },
  noodleToy: {
    card: "noodleCard",
    message:
      "🍜 Tô mì nhảy lên vì sinh nhật Embee đó. Mong tuổi mới của em có thật nhiều món ngon, nhiều ngày vui, nhiều lần được dỗ dành.",
    effect: () => spawnFalling(["🍜", "🥢", "✨"], 18)
  },
  cakeToy: {
    card: "cakeCard",
    message:
      "🧁 Nến sáng rồi. Hôm nay Embee là điều đáng được ước nguyện nhất, nên anh mong mọi điều tốt đẹp sẽ tìm đến em.",
    effect: () => spawnFalling(["🧁", "🍰", "✨", "💙"], 22)
  },
  crocsToy: {
    card: "crocsCard",
    message:
      "🩴 Crocs cute đã bắt đầu đi dạo. Mong Embee bước qua tuổi mới thật thoải mái, tự tin, bình yên và vẫn đáng yêu như vậy.",
    effect: () => spawnSteps(12)
  }
};

Object.keys(toyMap).forEach((toyId) => {
  on($("#" + toyId), "click", () => {
    const item = toyMap[toyId];
    const card = $("#" + item.card);

    if (card) {
      card.classList.add("active");
      setTimeout(() => card.classList.remove("active"), 1400);
    }

    setPlayMessage(item.message);
    item.effect();
    increaseLove();
  });
});

function setPlayMessage(message) {
  const playMessage = $("#playMessage");
  if (!playMessage) return;

  playMessage.textContent = message;
  playMessage.animate(
    [
      { transform: "scale(0.98)", opacity: 0.75 },
      { transform: "scale(1.02)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 }
    ],
    { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" }
  );
}

/* GACHA */

const capsuleNotes = [
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

on($("#capsuleBtn"), "click", () => {
  const machine = $("#capsuleMachine");
  const result = $("#capsuleResult");

  if (machine) machine.classList.add("shake");
  if (result) result.textContent = "Đang rút lời thương cho Embee...";

  setTimeout(() => {
    if (result) result.textContent = randomItem(capsuleNotes);
    if (machine) machine.classList.remove("shake");
    burstCute(16);
    increaseLove();
  }, 650);
});

/* GALLERY + IMAGE FALLBACK */

$$(".safe-img").forEach((img) => {
  img.addEventListener("error", () => {
    const label = img.dataset.label || "Embee";
    img.src = makeFallbackImage(label);
  });
});

$$(".gallery-card").forEach((card) => {
  on(card, "click", () => {
    const img = card.querySelector("img");
    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");

    if (!img || !lightbox || !lightboxImg) return;

    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

on($("#lightbox"), "click", () => {
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");

  if (lightbox) lightbox.classList.remove("show");
  if (lightboxImg) lightboxImg.src = "";
});

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

/* LOVE */

function increaseLove() {
  love += Math.floor(Math.random() * 7) + 3;

  const score = $("#loveScore");
  if (score) score.textContent = love + "%";
}

/* EFFECTS */

function appendEffect(el, removeAfter = 6000) {
  if (!effectLayer) return;
  effectLayer.appendChild(el);
  setTimeout(() => el.remove(), removeAfter);
}

function burstCute(amount = 18) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fx fx-up";
      el.textContent = randomItem(["💙", "🩵", "☁️", "🍵", "🍫", "🐾", "🐶", "🐱", "🧁", "🍜", "✨"]);
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = 16 + Math.random() * 22 + "px";
      el.style.animationDuration = 4.4 + Math.random() * 2.8 + "s";
      appendEffect(el, 7600);
    }, i * 45);
  }
}

function spawnFalling(items, amount = 20) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fx fx-down";
      el.textContent = randomItem(items);
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = 14 + Math.random() * 18 + "px";
      el.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";
      appendEffect(el, 5600);
    }, i * 42);
  }
}

function spawnMatchaDrops(amount = 18) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fx fx-down matcha-drop";
      el.style.left = Math.random() * 100 + "vw";
      el.style.animationDuration = 2.5 + Math.random() * 2.1 + "s";
      appendEffect(el, 5600);
    }, i * 48);
  }
}

function spawnPaws(amount = 12) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fx fx-paw";
      el.textContent = randomItem(["🐾", "🐶", "🐱"]);
      el.style.top = 18 + Math.random() * 68 + "vh";
      el.style.fontSize = 18 + Math.random() * 18 + "px";
      el.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";
      appendEffect(el, 3400);
    }, i * 90);
  }
}

function spawnSteps(amount = 10) {
  const startX = 12 + Math.random() * 15;
  const startY = 76 + Math.random() * 8;

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fx fx-step";
      el.textContent = i % 2 === 0 ? "🩴" : "☁️";
      el.style.left = startX + i * 6 + "vw";
      el.style.top = startY - i * 3 + "vh";
      el.style.fontSize = "1.7rem";
      el.style.animationDuration = "1.8s";
      appendEffect(el, 2300);
    }, i * 120);
  }
}

setInterval(() => {
  if (page && !page.classList.contains("hidden")) {
    burstCute(1);
  }
}, 1450);
