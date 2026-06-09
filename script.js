const openBtn = document.getElementById("openBtn");
const intro = document.getElementById("intro");
const page = document.getElementById("page");
const bgMusic = document.getElementById("bgMusic");
const noteText = document.getElementById("noteText");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let clouds = [];
let animationStarted = false;

/* MỞ QUÀ + PHÁT NHẠC */

openBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  page.classList.remove("hidden");
  document.body.classList.add("opened");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  try {
    bgMusic.volume = 0.58;
    await bgMusic.play();
  } catch (error) {
    console.log("Music needs user interaction.");
  }

  burstCuteItems();

  setTimeout(() => {
    intro.style.display = "none";
    showVisibleSections();
  }, 900);
});

/* HIỆU ỨNG HIỆN DẦN KHI CUỘN */

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

/* TRÁI TIM LỜI NHẮN */

const heartButtons = document.querySelectorAll(".heart-note");

heartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    noteText.textContent = button.dataset.note;
    noteText.classList.remove("pop-note");

    void noteText.offsetWidth;

    noteText.classList.add("pop-note");
    burstCuteItems();
  });
});

/* LIGHTBOX ẢNH */

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

/* ICON BAY */

function createCuteItem() {
  const item = document.createElement("div");
  item.className = "float-item";

  const icons = [
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
  ];

  item.textContent = icons[Math.floor(Math.random() * icons.length)];
  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = 16 + Math.random() * 22 + "px";
  item.style.animationDuration = 4.6 + Math.random() * 3.2 + "s";
  item.style.opacity = 0.9;

  document.body.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 8500);
}

function burstCuteItems() {
  for (let i = 0; i < 28; i++) {
    setTimeout(createCuteItem, i * 55);
  }
}

setInterval(() => {
  if (!page.classList.contains("hidden")) {
    createCuteItem();
  }
}, 1300);

/* NỀN MÂY + SAO */

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

/* CHẠM MÀN HÌNH TẠO ICON NHỎ */

document.addEventListener("click", (event) => {
  if (page.classList.contains("hidden")) return;

  const item = document.createElement("div");
  item.className = "float-item";
  item.textContent = ["💙", "🩵", "☁️", "✨"][Math.floor(Math.random() * 4)];

  item.style.left = event.clientX + "px";
  item.style.bottom = window.innerHeight - event.clientY + "px";
  item.style.fontSize = "20px";
  item.style.animationDuration = "3.8s";

  document.body.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 4200);
});
