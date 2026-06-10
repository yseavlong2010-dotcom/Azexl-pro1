const openBtn = document.getElementById("openBtn");
const giftBox = document.getElementById("giftBox");
const intro = document.getElementById("intro");
const page = document.getElementById("page");
const bgMusic = document.getElementById("bgMusic");

const effectLayer = document.getElementById("effectLayer");
const heroNote = document.getElementById("heroNote");
const quickLove = document.getElementById("quickLove");
const scrollToCafe = document.getElementById("scrollToCafe");

const musicToggle = document.getElementById("musicToggle");
const audioDisc = document.getElementById("audioDisc");
const fakeWave = document.querySelector(".fake-wave");

const playMessage = document.getElementById("playMessage");
const capsuleBtn = document.getElementById("capsuleBtn");
const capsuleResult = document.getElementById("capsuleResult");
const capsuleMachine = document.querySelector(".capsule-machine");

const matchaToy = document.getElementById("matchaToy");
const chocoToy = document.getElementById("chocoToy");
const petToy = document.getElementById("petToy");
const noodleToy = document.getElementById("noodleToy");
const cakeToy = document.getElementById("cakeToy");
const crocsToy = document.getElementById("crocsToy");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let clouds = [];
let animationStarted = false;
let lovePower = 100;

/* =========================
   MỞ QUÁN NHỎ CỦA EMBEE
========================= */

function openBirthdayCafe() {
  intro.classList.add("hide");
  page.classList.remove("hidden");
  document.body.classList.add("opened");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  playMusic();
  burstCuteItems(34);

  setTimeout(() => {
    intro.style.display = "none";
    showVisibleSections();
  }, 900);
}

openBtn.addEventListener("click", openBirthdayCafe);
giftBox.addEventListener("click", () => {
  burstCuteItems(18);
});

/* =========================
   NHẠC + AUDIO EMBED
========================= */

async function playMusic() {
  try {
    bgMusic.volume = 0.58;
    await bgMusic.play();
    updateMusicUi(true);
  } catch (error) {
    console.log("Music needs user interaction.");
    updateMusicUi(false);
  }
}

function pauseMusic() {
  bgMusic.pause();
  updateMusicUi(false);
}

function updateMusicUi(isPlaying) {
  if (isPlaying) {
    musicToggle.textContent = "❚❚";
    audioDisc.classList.add("playing");
    fakeWave.classList.add("playing");
  } else {
    musicToggle.textContent = "▶";
    audioDisc.classList.remove("playing");
    fakeWave.classList.remove("playing");
  }
}

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
});

/* =========================
   REVEAL KHI CUỘN
========================= */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

function showVisibleSections() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.9) {
      item.classList.add("show");
    }
  });
}

/* =========================
   HERO BUTTONS
========================= */

scrollToCafe.addEventListener("click", () => {
  document.getElementById("cafePlayground").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

const quickLoveNotes = [
  "Embee là kiểu người chỉ cần xuất hiện thôi cũng khiến một ngày bình thường trở nên dịu hơn.",
  "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
  "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
  "Anh mong Embee luôn được yêu thương bằng sự kiên nhẫn, dịu dàng và thật lòng.",
  "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương."
];

quickLove.addEventListener("click", () => {
  const note = getRandomItem(quickLoveNotes);

  heroNote.innerHTML = `
    <span>private note</span>
    ${note}
  `;

  increaseLove();
  burstCuteItems(22);
});

/* =========================
   ĐỒ CHƠI TƯƠNG TÁC
========================= */

matchaToy.addEventListener("click", () => {
  activateCard(matchaToy);
  setPlayMessage("🍵 Matcha của Embee đang được khuấy lên rồi nè. Mong tuổi mới của em luôn dịu, xanh và ngọt vừa đủ như ly matcha em thích.");
  spawnMatchaDrops(22);
  burstCuteItems(10);
  increaseLove();
});

chocoToy.addEventListener("click", () => {
  activateCard(chocoToy);
  setPlayMessage("🍫 Chocolate topping rơi xuống rồi đó. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.");
  spawnChocolateToppings(34);
  increaseLove();
});

petToy.addEventListener("click", () => {
  activateCard(petToy);
  setPlayMessage("🐶🐱 Cún mèo chạy qua chào Embee nè. Dễ thương gặp dễ thương là trang web cũng chịu không nổi luôn á.");
  spawnPaws(18);
  burstCuteItems(12);
  increaseLove();
});

noodleToy.addEventListener("click", () => {
  activateCard(noodleToy);
  setPlayMessage("🍜 Tô mì nhảy lên vì sinh nhật Embee đó. Mong tuổi mới của em có thật nhiều bữa ngon, nhiều ngày vui, nhiều lần được dỗ dành.");
  spawnEmojiRain(["🍜", "🥢", "✨"], 20);
  increaseLove();
});

cakeToy.addEventListener("click", () => {
  activateCard(cakeToy);
  setPlayMessage("🧁 Nến sáng rồi. Hôm nay Embee là điều đáng được ước nguyện nhất, nên anh mong mọi điều tốt đẹp sẽ tìm đến em.");
  spawnCakeCrumbs(28);
  burstCuteItems(14);
  increaseLove();
});

crocsToy.addEventListener("click", () => {
  activateCard(crocsToy);
  setPlayMessage("🩴 Crocs cute đã bắt đầu đi dạo. Mong Embee bước qua tuổi mới thật thoải mái, tự tin, bình yên và vẫn đáng yêu như vậy.");
  spawnSteps(14);
  increaseLove();
});

function activateCard(toy) {
  const card = toy.closest(".toy-card");

  card.classList.add("active");

  setTimeout(() => {
    card.classList.remove("active");
  }, 1500);
}

function setPlayMessage(message) {
  playMessage.innerHTML = `<p>${message}</p>`;
  playMessage.animate(
    [
      { transform: "scale(0.98)", opacity: 0.75 },
      { transform: "scale(1.02)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 520,
      easing: "cubic-bezier(.2,.8,.2,1)",
    }
  );
}

/* =========================
   GACHA LỜI THƯƠNG
========================= */

const capsuleNotes = [
  "Anh mong Embee luôn được đối xử thật dịu dàng, nhất là vào những ngày em thấy mình hơi mệt.",
  "Nếu thế giới ngoài kia làm Embee buồn, anh mong em nhớ rằng vẫn có một người rất muốn đứng về phía em.",
  "Anh thích cách Embee là chính Embee: đáng yêu, hơi nhõng nhẽo, mềm mại và rất riêng trong lòng anh.",
  "Chúc Embee tuổi mới có nhiều matcha latte ngon, nhiều chocolate ngọt, nhiều món ăn em thích và nhiều bình yên.",
  "Anh không hứa sẽ hoàn hảo, nhưng anh muốn học cách yêu Embee tử tế hơn từng ngày.",
  "Embee xứng đáng với những điều được chuẩn bị bằng sự để tâm, không phải bằng những lời nói qua loa.",
  "Anh thương những điều nhỏ xíu của em, từ sở thích dễ thương đến những lúc em cần được dỗ dành.",
  "Mong Embee luôn có cảm giác an toàn khi ở bên anh, vì em không cần phải mạnh mẽ một mình mãi đâu.",
  "Happy Birthday Embee. Anh thương em bằng những điều nhỏ, nhưng thật lòng.",
  "Nếu được chọn một điều đẹp nhất hôm nay, anh vẫn chọn nụ cười của Embee."
];

capsuleBtn.addEventListener("click", () => {
  const note = getRandomItem(capsuleNotes);

  capsuleMachine.classList.add("shaking");
  capsuleResult.textContent = "Đang rút lời thương cho Embee...";

  setTimeout(() => {
    capsuleResult.textContent = note;
    capsuleMachine.classList.remove("shaking");
    burstCuteItems(18);
    increaseLove();
  }, 650);
});

/* =========================
   LIGHTBOX ẢNH
========================= */

const galleryImages = document.querySelectorAll(".gallery-card img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
  lightboxImg.src = "";
});

/* =========================
   LOVE METER
========================= */

function increaseLove() {
  lovePower += Math.floor(Math.random() * 7) + 3;

  const loveScore = document.getElementById("loveScore");
  const loveBar = document.getElementById("loveBar");

  if (loveScore) {
    loveScore.textContent = lovePower + "%";
  }

  if (loveBar) {
    loveBar.animate(
      [
        { transform: "scaleX(0.88)" },
        { transform: "scaleX(1)" }
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );
  }
}

/* =========================
   HIỆU ỨNG RƠI / BAY
========================= */

function createCuteItem() {
  const item = document.createElement("div");
  item.className = "float-item";

  const icons = ["💙", "🩵", "☁️", "🍵", "🍫", "🐾", "🐶", "🐱", "🧁", "🍜", "✨"];

  item.textContent = getRandomItem(icons);
  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = 16 + Math.random() * 22 + "px";
  item.style.animationDuration = 4.6 + Math.random() * 3.2 + "s";

  effectLayer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 8500);
}

function burstCuteItems(amount = 24) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createCuteItem, i * 45);
  }
}

function spawnChocolateToppings(amount = 28) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const topping = document.createElement("div");
      topping.className = "topping";
      topping.textContent = getRandomItem(["🍫", "▪", "◆", "●"]);

      topping.style.left = Math.random() * 100 + "vw";
      topping.style.fontSize = 14 + Math.random() * 18 + "px";
      topping.style.animationDuration = 2.6 + Math.random() * 2.4 + "s";

      effectLayer.appendChild(topping);

      setTimeout(() => {
        topping.remove();
      }, 5600);
    }, i * 38);
  }
}

function spawnMatchaDrops(amount = 20) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const drop = document.createElement("div");
      drop.className = "matcha-drop";

      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = 2.4 + Math.random() * 2 + "s";
      drop.style.opacity = 0.75 + Math.random() * 0.25;

      effectLayer.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 5400);
    }, i * 55);
  }
}

function spawnPaws(amount = 16) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const paw = document.createElement("div");
      paw.className = "paw-print";
      paw.textContent = getRandomItem(["🐾", "🐶", "🐱"]);

      paw.style.left = "-30px";
      paw.style.top = 18 + Math.random() * 70 + "vh";
      paw.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";
      paw.style.fontSize = 18 + Math.random() * 18 + "px";

      effectLayer.appendChild(paw);

      setTimeout(() => {
        paw.remove();
      }, 3400);
    }, i * 95);
  }
}

function spawnCakeCrumbs(amount = 22) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const crumb = document.createElement("div");
      crumb.className = "cake-crumb";
      crumb.textContent = getRandomItem(["🧁", "✨", "🍰", "💙"]);

      crumb.style.left = Math.random() * 100 + "vw";
      crumb.style.fontSize = 14 + Math.random() * 18 + "px";
      crumb.style.animationDuration = 2.2 + Math.random() * 2.3 + "s";

      effectLayer.appendChild(crumb);

      setTimeout(() => {
        crumb.remove();
      }, 5200);
    }, i * 45);
  }
}

function spawnSteps(amount = 12) {
  const startX = 12 + Math.random() * 20;
  const startY = 72 + Math.random() * 12;

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const step = document.createElement("div");
      step.className = "step-print";
      step.textContent = i % 2 === 0 ? "🩴" : "☁️";

      step.style.left = startX + i * 6 + "vw";
      step.style.top = startY - i * 3 + "vh";
      step.style.animationDuration = "1.9s";
      step.style.transform = `rotate(${i % 2 === 0 ? -12 : 12}deg)`;

      effectLayer.appendChild(step);

      setTimeout(() => {
        step.remove();
      }, 2300);
    }, i * 120);
  }
}

function spawnEmojiRain(icons, amount = 18) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const item = document.createElement("div");
      item.className = "topping";
      item.textContent = getRandomItem(icons);

      item.style.left = Math.random() * 100 + "vw";
      item.style.fontSize = 18 + Math.random() * 16 + "px";
      item.style.animationDuration = 2.4 + Math.random() * 2.3 + "s";

      effectLayer.appendChild(item);

      setTimeout(() => {
        item.remove();
      }, 5400);
    }, i * 48);
  }
}

setInterval(() => {
  if (!page.classList.contains("hidden")) {
    createCuteItem();
  }
}, 1350);

/* =========================
   NỀN MÂY + SAO
========================= */

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createSkyObjects();
}

function createSkyObjects() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  stars = Array.from({ length: 95 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.7 + 0.35,
    speed: Math.random() * 0.25 + 0.08,
    alpha: Math.random() * 0.55 + 0.18,
  }));

  clouds = Array.from({ length: 9 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    w: Math.random() * 80 + 70,
    speed: Math.random() * 0.18 + 0.05,
    alpha: Math.random() * 0.08 + 0.035,
  }));
}

function drawCloud(x, y, w, alpha) {
  const h = w * 0.38;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#d9f4ff";

  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.35, h * 0.55, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.25, y - h * 0.25, w * 0.32, h * 0.65, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.52, y, w * 0.38, h * 0.58, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.22, y + h * 0.18, w * 0.55, h * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function animateSky() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  clouds.forEach((cloud) => {
    drawCloud(cloud.x, cloud.y, cloud.w, cloud.alpha);

    cloud.x += cloud.speed;

    if (cloud.x > width + cloud.w) {
      cloud.x = -cloud.w;
      cloud.y = Math.random() * height;
    }
  });

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(217, 244, 255, ${star.alpha})`;
    ctx.fill();

    star.y += star.speed;

    if (star.y > height) {
      star.y = -10;
      star.x = Math.random() * width;
    }
  });

  requestAnimationFrame(animateSky);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

if (!animationStarted) {
  animationStarted = true;
  animateSky();
}

/* =========================
   TAP MÀN HÌNH TẠO SPARKLE
========================= */

document.addEventListener("click", (event) => {
  if (page.classList.contains("hidden")) return;

  const ignoredTags = ["BUTTON", "IMG"];

  if (ignoredTags.includes(event.target.tagName)) return;

  const sparkle = document.createElement("div");
  sparkle.className = "float-item";
  sparkle.textContent = getRandomItem(["💙", "🩵", "☁️", "✨"]);

  sparkle.style.left = event.clientX + "px";
  sparkle.style.bottom = window.innerHeight - event.clientY + "px";
  sparkle.style.fontSize = "20px";
  sparkle.style.animationDuration = "3.8s";

  effectLayer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 4200);
});

/* =========================
   HELPER
========================= */

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
