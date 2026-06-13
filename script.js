(function () {
  console.log("Floating Love Letter V11 loaded 💙");

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var intro = document.getElementById("intro");
    var loveScene = document.getElementById("loveScene");
    var startButton = document.getElementById("startButton");
    var bgMusic = document.getElementById("bgMusic");
    var musicButton = document.getElementById("musicButton");
    var musicIcon = document.getElementById("musicIcon");
    var letterButton = document.getElementById("letterButton");
    var letterModal = document.getElementById("letterModal");
    var closeLetterButton = document.getElementById("closeLetterButton");
    var floatingTextLayer = document.getElementById("floatingTextLayer");
    var fxLayer = document.getElementById("fxLayer");
    var mainPhoto = document.getElementById("mainPhoto");

    var opened = false;
    var musicPlaying = false;

    var wordTimer = null;
    var wishTimer = null;
    var softFxTimer = null;

    var loveWords = [
      "I love you",
      "Love you",
      "Happy Birthday",
      "My Embee",
      "You are loved",
      "For Embee",
      "My blue sky",
      "I love you so much",
      "Embee 💙",
      "Always with you"
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

    function openLoveScene(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      if (opened) return;

      opened = true;

      if (intro) {
        intro.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        intro.style.opacity = "0";
        intro.style.transform = "scale(1.04)";
        intro.style.pointerEvents = "none";

        setTimeout(function () {
          intro.style.display = "none";
        }, 720);
      }

      if (loveScene) {
        loveScene.classList.remove("hidden");
      }

      playMusic();
      startFloatingLoop();
      spawnOpeningWords();
      spawnConfetti(28);

      setTimeout(function () {
        spawnWish();
      }, 900);
    }

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
      musicPlaying = isPlaying;

      if (musicIcon) {
        musicIcon.textContent = isPlaying ? "❚❚" : "▶";
      }

      if (musicButton) {
        musicButton.classList.toggle("playing", isPlaying);
      }
    }

    function openLetter(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (letterModal) {
        letterModal.classList.add("show");
      }

      spawnSoftHearts(10);
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

    function startFloatingLoop() {
      clearInterval(wordTimer);
      clearInterval(wishTimer);
      clearInterval(softFxTimer);

      wordTimer = setInterval(function () {
        spawnWord();
      }, 520);

      wishTimer = setInterval(function () {
        spawnWish();
      }, 5200);

      softFxTimer = setInterval(function () {
        spawnSoftHearts(1);
      }, 1600);
    }

    function spawnOpeningWords() {
      var count = window.innerWidth < 520 ? 18 : 26;

      for (var i = 0; i < count; i++) {
        setTimeout(function () {
          spawnWord();
        }, i * 120);
      }
    }

    function spawnWord() {
      if (!floatingTextLayer) return;

      if (floatingTextLayer.children.length > 46) return;

      var word = document.createElement("div");
      var type = Math.random();

      word.className = "floating-word";

      if (type > 0.66) {
        word.classList.add("blue");
      } else if (type > 0.38) {
        word.classList.add("soft");
      }

      word.textContent = randomItem(loveWords);

      var xStart = Math.floor(Math.random() * 96) + "vw";
      var drift = Math.floor(Math.random() * 34 - 17) + "vw";
      var rotation = Math.floor(Math.random() * 24 - 12) + "deg";
      var duration = 8 + Math.random() * 5;
      var fontSize = window.innerWidth < 520
        ? 11 + Math.random() * 5
        : 12 + Math.random() * 8;

      word.style.setProperty("--x-start", xStart);
      word.style.setProperty("--x-end", drift);
      word.style.setProperty("--rot", rotation);
      word.style.setProperty("--max-opacity", 0.52 + Math.random() * 0.38);

      word.style.fontSize = fontSize + "px";
      word.style.animationDuration = duration + "s";

      floatingTextLayer.appendChild(word);

      setTimeout(function () {
        removeElement(word);
      }, duration * 1000 + 600);
    }

    function spawnWish() {
      if (!floatingTextLayer) return;

      if (floatingTextLayer.children.length > 50) return;

      var wish = document.createElement("div");

      wish.className = "floating-wish";
      wish.textContent = randomItem(wishLines);

      wish.style.left = 12 + Math.random() * 76 + "%";
      wish.style.animationDuration = 11 + Math.random() * 4 + "s";

      floatingTextLayer.appendChild(wish);

      setTimeout(function () {
        removeElement(wish);
      }, 16000);
    }

    function spawnSoftHearts(amount) {
      if (!fxLayer) return;

      var total = amount || 6;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-up";
          item.textContent = randomItem(["💙", "🩵", "❤️", "✨", "☁️"]);

          item.style.left = Math.random() * 100 + "vw";
          item.style.fontSize = 15 + Math.random() * 14 + "px";
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

      var total = amount || 24;
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

    function fallbackImage() {
      if (!mainPhoto) return;

      mainPhoto.onerror = null;

      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">' +
        '<defs>' +
        '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
        '<stop offset="0%" stop-color="#ff6f9f"/>' +
        '<stop offset="55%" stop-color="#b9eeff"/>' +
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

    /* =========================
       FIX CHỐNG KẸT TƯƠNG TÁC
       - Start button dùng capture + stopImmediatePropagation
       - Chặn fallback chạy đè khi script chính hoạt động
    ========================= */

    if (startButton) {
      startButton.addEventListener("click", openLoveScene, true);
    }

    if (musicButton) {
      musicButton.addEventListener("click", toggleMusic);
    }

    if (letterButton) {
      letterButton.addEventListener("click", openLetter);
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
