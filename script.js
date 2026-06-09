const openBtn = document.getElementById("openBtn");
const intro = document.getElementById("intro");
const page = document.getElementById("page");
const bgMusic = document.getElementById("bgMusic");
const noteText = document.getElementById("noteText");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

openBtn.addEventListener("click", async () => {
  intro.classList.add("hide");
  page.classList.remove("hidden");
  document.body.classList.add("opened");

  try {
    bgMusic.volume = 0.55;
    await bgMusic.play();
  } catch (error) {
    console.log("Music autoplay was blocked.");
  }

  createHeartBurst();

  setTimeout(() => {
    intro.style.display = "none";
  }, 1000);
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

reveals.forEach((item) => revealObserver.observe(item));

const heartButtons = document.querySelectorAll(".heart-note");

heartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.dataset.note;
    noteText.textContent = message;
    createHeartBurst();
  });
});

const galleryImages = document.querySelectorAll(".gallery img");

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

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";

  const hearts = ["💗", "💖", "💘", "💕", "✨"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

function createHeartBurst() {
  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 80);
  }
}

setInterval(createFloatingHeart, 1100);

const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.35 + 0.12,
    alpha: Math.random() * 0.7 + 0.25,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 209, 220, ${star.alpha})`;
    ctx.fill();

    star.y += star.speed;

    if (star.y > canvas.height) {
      star.y = -10;
      star.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();
