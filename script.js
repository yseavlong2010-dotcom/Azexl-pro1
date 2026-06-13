(function () {
  console.log("Embee Heart Canvas V12 loaded 💙");

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var intro = document.getElementById("intro");
    var heartScene = document.getElementById("heartScene");
    var decryptButton = document.getElementById("decryptButton");

    var bgMusic = document.getElementById("bgMusic");
    var musicButton = document.getElementById("musicButton");
    var musicIcon = document.getElementById("musicIcon");

    var letterButton = document.getElementById("letterButton");
    var replayButton = document.getElementById("replayButton");
    var letterModal = document.getElementById("letterModal");
    var closeLetterButton = document.getElementById("closeLetterButton");

    var heartCanvas = document.getElementById("heartCanvas");
    var ctx = heartCanvas ? heartCanvas.getContext("2d") : null;

    var wishLayer = document.getElementById("wishLayer");
    var fxLayer = document.getElementById("fxLayer");
    var mainPhoto = document.getElementById("mainPhoto");

    var opened = false;
    var animatingHeart = false;
    var animationId = null;

    var particles = [];
    var startTime = 0;

    var wordTimer = null;
    var bubbleTimer = null;
    var softFxTimer = null;

    var loveWords = [
      "i love you",
      "love you",
      "i love you",
      "for embee",
      "my embee",
      "happy birthday",
      "you are loved",
      "my blue sky",
      "i love you so much",
      "always with you"
    ];

    var wishLines = [
      "Chúc Embee tuổi mới luôn xinh đẹp và bình yên.",
      "Mong em luôn được yêu bằng sự dịu dàng nhất.",
      "Anh thương cả những lúc Embee nhõng nhẽo.",
      "Mong mỗi ngày của em đều có một chút ngọt ngào.",
      "Embee là lý do khiến màn hình này sáng lên.",
      "Happy Birthday, người anh thương nhất hôm nay.",
      "Mong em có thật nhiều matcha, chocolate và tiếng cười.",
      "Anh mong mình là một nơi ấm để Embee quay về.",
      "Chúc Embee luôn được lắng nghe, dỗ dành và thương thật lòng."
    ];

    function randomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function easeInOutCubic(t) {
      if (t < 0.5) {
        return 4 * t * t * t;
      }

      return 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /* MUSIC */

    function playMusic() {
      if (!bgMusic) return;

      bgMusic.volume = 0.55;

      var promise = bgMusic.play();

      if (promise && typeof promise.then === "function") {
        promise
          .then(function () {
            setMusicState(true);
          })
          .catch(function () {
            setMusicState(false);
          });
      } else {
        setMusicState(true);
      }
    }

    function pauseMusic() {
      if (!bgMusic) return;

      bgMusic.pause();
      setMusicState(false);
    }

    function toggleMusic(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (!bgMusic) return;

      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    }

    function setMusicState(isPlaying) {
      if (musicIcon) {
        musicIcon.textContent = isPlaying ? "❚❚" : "▶";
      }

      if (musicButton) {
        musicButton.classList.toggle("playing", isPlaying);
      }
    }

    /* OPEN SCENE */

    function openHeartScene(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      if (opened) return;

      opened = true;

      if (intro) {
        intro.style.transition = "opacity 0.72s ease, transform 0.72s ease";
        intro.style.opacity = "0";
        intro.style.transform = "scale(1.04)";
        intro.style.pointerEvents = "none";

        setTimeout(function () {
          intro.style.display = "none";
        }, 740);
      }

      if (heartScene) {
        heartScene.classList.remove("hidden");
      }

      playMusic();
      startHeart();
      startFloatingLoops();

      setTimeout(function () {
        spawnBubble();
        spawnConfetti(24);
      }, 500);
    }

    /* HEART CANVAS */

    function resizeCanvas() {
      if (!heartCanvas || !ctx) return;

      var ratio = window.devicePixelRatio || 1;
      var width = window.innerWidth;
      var height = window.innerHeight;

      heartCanvas.width = Math.floor(width * ratio);
      heartCanvas.height = Math.floor(height * ratio);
      heartCanvas.style.width = width + "px";
      heartCanvas.style.height = height + "px";

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function heartPoint(t, scale, centerX, centerY) {
      var x = 16 * Math.pow(Math.sin(t), 3);
      var y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      return {
        x: centerX + x * scale,
        y: centerY - y * scale
      };
    }

    function makeParticles() {
      particles = [];

      var width = window.innerWidth;
      var height = window.innerHeight;

      var centerX = width / 2;
      var centerY = height / 2 - 18;

      var scale = Math.min(width, height) / 34;

      var amount = width < 430 ? 145 : width < 760 ? 210 : 310;

      for (var i = 0; i < amount; i++) {
        var t = Math.random() * Math.PI * 2;
        var edge = heartPoint(t, scale, centerX, centerY);

        var fill = Math.pow(Math.random(), 0.48);

        var targetX = centerX + (edge.x - centerX) * fill;
        var targetY = centerY + (edge.y - centerY) * fill;

        var startX = targetX + (Math.random() - 0.5) * width * 1.08;
        var startY = height + 70 + Math.random() * height * 0.82;

        particles.push({
          text: Math.random() > 0.18 ? "i love you" : "love you",
          startX: startX,
          startY: startY,
          targetX: targetX,
          targetY: targetY,
          x: startX,
          y: startY,
          size: width < 430 ? 10 + Math.random() * 4 : 11 + Math.random() * 6,
          alpha: 0,
          delay: Math.random() * 950,
          wave: Math.random() * 900,
          color: Math.random()
        });
      }
    }

    function startHeart() {
      if (!ctx || !heartCanvas) return;

      resizeCanvas();
      makeParticles();

      startTime = performance.now();
      animatingHeart = true;

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(drawHeart);
    }

    function replayHeart(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      startHeart();
      spawnConfetti(22);
      spawnSoftHearts(8);
      spawnBubble();
    }

    function drawHeart(now) {
      if (!ctx || !heartCanvas) return;

      var width = window.innerWidth;
      var height = window.innerHeight;
      var elapsed = now - startTime;

      ctx.clearRect(0, 0, width, height);

      drawSoftBackgroundGlow(width, height, elapsed);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (var i = 0; i < particles.length; i++) {
        drawParticle(particles[i], elapsed);
      }

      ctx.restore();

      if (elapsed < 6200) {
        animationId = requestAnimationFrame(drawHeart);
      } else {
        animatingHeart = false;
        drawFinalHeart();
      }
    }

    function drawSoftBackgroundGlow(width, height, elapsed) {
      var pulse = 0.5 + Math.sin(elapsed / 900) * 0.5;

      var gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.48
      );

      gradient.addColorStop(0, "rgba(255,45,95," + (0.055 + pulse * 0.03) + ")");
      gradient.addColorStop(0.45, "rgba(255,45,95,0.035)");
      gradient.addColorStop(1, "rgba(255,45,95,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticle(p, elapsed) {
      var local = clamp((elapsed - p.delay) / 3900, 0, 1);
      var eased = easeInOutCubic(local);

      var wave = Math.sin((elapsed + p.wave) / 520) * 7 * (1 - eased);

      p.x = p.startX + (p.targetX - p.startX) * eased;
      p.y = p.startY + (p.targetY - p.startY) * eased + wave;
      p.alpha = clamp(local * 1.25, 0, 1);

      if (local > 0.96) {
        p.x += Math.sin((elapsed + p.wave) / 950) * 1.2;
        p.y += Math.cos((elapsed + p.wave) / 950) * 1.2;
      }

      var color;

      if (p.color > 0.64) {
        color = "rgba(255,120,156," + p.alpha * 0.92 + ")";
      } else if (p.color > 0.34) {
        color = "rgba(255,48,100," + p.alpha * 0.86 + ")";
      } else {
        color = "rgba(255,210,224," + p.alpha * 0.75 + ")";
      }

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = color;
      ctx.font = "700 " + p.size + "px Space Mono, monospace";
      ctx.fillText(p.text, p.x, p.y);
    }

    function drawFinalHeart() {
      if (!ctx || !heartCanvas) return;

      var width = window.innerWidth;
      var height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      drawSoftBackgroundGlow(width, height, 6200);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        var color;

        if (p.color > 0.64) {
          color = "rgba(255,120,156,0.82)";
        } else if (p.color > 0.34) {
          color = "rgba(255,48,100,0.78)";
        } else {
          color = "rgba(255,210,224,0.64)";
        }

        ctx.fillStyle = color;
        ctx.font = "700 " + p.size + "px Space Mono, monospace";
        ctx.fillText(p.text, p.targetX, p.targetY);
      }

      ctx.restore();
    }

    /* FLYING WORDS */

    function startFloatingLoops() {
      clearInterval(wordTimer);
      clearInterval(bubbleTimer);
      clearInterval(softFxTimer);

      for (var i = 0; i < 16; i++) {
        setTimeout(function () {
          spawnWord();
        }, i * 130);
      }

      wordTimer = setInterval(spawnWord, 720);
      bubbleTimer = setInterval(spawnBubble, 6200);
      softFxTimer = setInterval(function () {
        spawnSoftHearts(1);
      }, 1900);
    }

    function spawnWord() {
      if (!wishLayer) return;

      if (wishLayer.children.length > 46) return;

      var word = document.createElement("div");
      var type = Math.random();

      word.className = "wish-word";

      if (type > 0.66) {
        word.classList.add("blue");
      } else if (type > 0.38) {
        word.classList.add("soft");
      }

      word.textContent = randomItem(loveWords);

      var xStart = Math.floor(Math.random() * 96) + "vw";
      var drift = Math.floor(Math.random() * 34 - 17) + "vw";
      var rotation = Math.floor(Math.random() * 24 - 12) + "deg";
      var duration = 9 + Math.random() * 4;
      var fontSize = window.innerWidth < 520
        ? 10 + Math.random() * 5
        : 11 + Math.random() * 7;

      word.style.setProperty("--x-start", xStart);
      word.style.setProperty("--x-end", drift);
      word.style.setProperty("--rot", rotation);
      word.style.setProperty("--max-opacity", 0.46 + Math.random() * 0.34);

      word.style.fontSize = fontSize + "px";
      word.style.animationDuration = duration + "s";

      wishLayer.appendChild(word);

      setTimeout(function () {
        removeElement(word);
      }, duration * 1000 + 800);
    }

    function spawnBubble() {
      if (!wishLayer) return;

      if (wishLayer.children.length > 48) return;

      var bubble = document.createElement("div");

      bubble.className = "wish-bubble";
      bubble.textContent = randomItem(wishLines);

      bubble.style.left = 12 + Math.random() * 76 + "%";
      bubble.style.animationDuration = 12 + Math.random() * 4 + "s";

      wishLayer.appendChild(bubble);

      setTimeout(function () {
        removeElement(bubble);
      }, 17000);
    }

    /* LIGHT FX */

    function spawnSoftHearts(amount) {
      if (!fxLayer) return;

      var total = amount || 4;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-up";
          item.textContent = randomItem(["💙", "🩵", "❤️", "✨", "☁️"]);

          item.style.left = Math.random() * 100 + "vw";
          item.style.fontSize = 14 + Math.random() * 13 + "px";
          item.style.animationDuration = 4.2 + Math.random() * 2.2 + "s";

          fxLayer.appendChild(item);

          setTimeout(function () {
            removeElement(item);
          }, 7000);
        }, i * 80);
      }
    }

    function spawnConfetti(amount) {
      if (!fxLayer) return;

      var total = amount || 20;
      var colors = ["c1", "c2", "c3", "c4", "c5"];

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var piece = document.createElement("div");

          piece.className = "fx fx-down confetti " + randomItem(colors);

          piece.style.left = Math.random() * 100 + "vw";
          piece.style.animationDuration = 2.8 + Math.random() * 2.2 + "s";
          piece.style.transform = "rotate(" + Math.floor(Math.random() * 180) + "deg)";

          fxLayer.appendChild(piece);

          setTimeout(function () {
            removeElement(piece);
          }, 6200);
        }, i * 26);
      }
    }

    function removeElement(element) {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }

    /* MODAL */

    function openLetter(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (letterModal) {
        letterModal.classList.add("show");
      }

      spawnSoftHearts(8);
    }

    function closeLetter(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (letterModal) {
        letterModal.classList.remove("show");
      }
    }

    /* FALLBACK IMAGE */

    function fallbackImage() {
      if (!mainPhoto) return;

      mainPhoto.onerror = null;

      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">' +
        '<defs>' +
        '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
        '<stop offset="0%" stop-color="#ff6f91"/>' +
        '<stop offset="55%" stop-color="#bceeff"/>' +
        '<stop offset="100%" stop-color="#b8d978"/>' +
        "</linearGradient>" +
        "</defs>" +
        '<rect width="900" height="1100" fill="url(#g)"/>' +
        '<circle cx="690" cy="180" r="130" fill="rgba(255,255,255,0.35)"/>' +
        '<circle cx="210" cy="880" r="180" fill="rgba(255,255,255,0.25)"/>' +
        '<text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="76" font-weight="700" fill="#08131f">💙</text>' +
        '<text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="46" font-weight="700" fill="#08131f">Embee</text>' +
        "</svg>";

      mainPhoto.src =
        "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
    }

    /* EVENTS */

    if (decryptButton) {
      decryptButton.addEventListener("click", openHeartScene, true);
    }

    if (musicButton) {
      musicButton.addEventListener("click", toggleMusic);
    }

    if (letterButton) {
      letterButton.addEventListener("click", openLetter);
    }

    if (replayButton) {
      replayButton.addEventListener("click", replayHeart);
    }

    if (closeLetterButton) {
      closeLetterButton.addEventListener("click", closeLetter);
    }

    if (letterModal) {
      letterModal.addEventListener("click", function (event) {
        if (event.target === letterModal) {
          closeLetter(event);
        }
      });
    }

    if (mainPhoto) {
      mainPhoto.addEventListener("error", fallbackImage);
    }

    window.addEventListener("resize", function () {
      if (!opened) return;

      clearTimeout(window.__embeeResizeTimer);

      window.__embeeResizeTimer = setTimeout(function () {
        resizeCanvas();
        makeParticles();

        if (!animatingHeart) {
          drawFinalHeart();
        }
      }, 180);
    });

    document.addEventListener("click", function (event) {
      if (!opened) return;

      if (
        event.target.closest("button") ||
        event.target.closest(".modal-card")
      ) {
        return;
      }

      spawnSoftHearts(2);
    });
  });
})();
