(function () {
  console.log("Embee Birthday World V6 loaded 💙");

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var intro = document.getElementById("intro");
    var page = document.getElementById("page");
    var bgMusic = document.getElementById("bgMusic");
    var effectLayer = document.getElementById("effectLayer");

    var siteOpened = false;
    var loveScore = 100;

    var loveNotes = [
      "Embee là kiểu người chỉ cần xuất hiện thôi cũng khiến một ngày bình thường trở nên dịu hơn.",
      "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
      "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
      "Anh mong Embee luôn được yêu thương bằng sự kiên nhẫn, dịu dàng và thật lòng.",
      "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương."
    ];

    var gachaNotes = [
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

    function $(selector) {
      return document.querySelector(selector);
    }

    function $all(selector) {
      return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function on(element, eventName, callback) {
      if (!element) return;
      element.addEventListener(eventName, callback);
    }

    function randomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function openSite() {
      siteOpened = true;

      if (page) {
        page.classList.remove("hidden");
      }

      if (intro) {
        intro.classList.add("hide");

        setTimeout(function () {
          intro.style.display = "none";
        }, 850);
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      playMusic();
      showRevealItems();
      burstCute(28);
    }

    window.openEmbeeSite = openSite;

    on(document.getElementById("openButton"), "click", openSite);
    on(document.getElementById("giftButton"), "click", openSite);

    function playMusic() {
      if (!bgMusic) return;

      bgMusic.volume = 0.58;

      var playPromise = bgMusic.play();

      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(function () {
            setMusicUi(true);
          })
          .catch(function () {
            setMusicUi(false);
          });
      } else {
        setMusicUi(true);
      }
    }

    function pauseMusic() {
      if (!bgMusic) return;

      bgMusic.pause();
      setMusicUi(false);
    }

    function setMusicUi(isPlaying) {
      var musicButton = document.getElementById("musicButton");
      var audioDisc = document.getElementById("audioDisc");
      var waveBars = document.getElementById("waveBars");

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

    on(document.getElementById("musicButton"), "click", function () {
      if (!bgMusic) return;

      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });

    var revealItems = $all(".reveal");

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        },
        {
          threshold: 0.12
        }
      );

      revealItems.forEach(function (item) {
        revealObserver.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("show");
      });
    }

    function showRevealItems() {
      revealItems.forEach(function (item) {
        var rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.95) {
          item.classList.add("show");
        }
      });
    }

    on(document.getElementById("goToPlayground"), "click", function () {
      var playground = document.getElementById("playground");

      if (playground) {
        playground.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

    on(document.getElementById("quickLoveButton"), "click", function () {
      var heroNote = document.getElementById("heroNote");

      if (heroNote) {
        heroNote.innerHTML =
          "<span>private note</span>" + randomItem(loveNotes);
      }

      increaseLove();
      burstCute(20);
    });

    function increaseLove() {
      loveScore += Math.floor(Math.random() * 8) + 3;

      var loveScoreElement = document.getElementById("loveScore");

      if (loveScoreElement) {
        loveScoreElement.textContent = loveScore + "%";
      }
    }

    function setPlayMessage(message) {
      var playMessage = document.getElementById("playMessage");

      if (!playMessage) return;

      playMessage.textContent = message;

      if (typeof playMessage.animate === "function") {
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

    function activateCard(card) {
      if (!card) return;

      card.classList.add("active");

      setTimeout(function () {
        card.classList.remove("active");
      }, 1400);
    }

    function handleToy(toyName, card) {
      if (toyName === "matcha") {
        activateCard(card);
        setPlayMessage("🍵 Matcha của Embee đang được khuấy lên rồi nè. Mong tuổi mới của em luôn dịu, xanh và ngọt vừa đủ như ly matcha em thích.");
        spawnMatchaDrops(26);
        burstCute(8);
        increaseLove();
        return;
      }

      if (toyName === "choco") {
        activateCard(card);
        setPlayMessage("🍫 Chocolate topping rơi xuống rồi đó. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.");
        spawnFalling(["🍫", "▪", "◆", "●"], 34);
        increaseLove();
        return;
      }

      if (toyName === "pet") {
        activateCard(card);
        setPlayMessage("🐶🐱 Cún mèo chạy qua chào Embee nè. Dễ thương gặp dễ thương là trang web cũng chịu không nổi luôn á.");
        spawnPaws(18);
        burstCute(8);
        increaseLove();
        return;
      }

      if (toyName === "noodle") {
        activateCard(card);
        setPlayMessage("🍜 Tô mì nhảy lên vì sinh nhật Embee đó. Mong tuổi mới của em có thật nhiều món ngon, nhiều ngày vui, nhiều lần được dỗ dành.");
        spawnFalling(["🍜", "🥢", "✨"], 24);
        increaseLove();
        return;
      }

      if (toyName === "cake") {
        activateCard(card);
        setPlayMessage("🧁 Nến sáng rồi. Hôm nay Embee là điều đáng được ước nguyện nhất, nên anh mong mọi điều tốt đẹp sẽ tìm đến em.");
        spawnFalling(["🧁", "🍰", "✨", "💙"], 28);
        burstCute(8);
        increaseLove();
        return;
      }

      if (toyName === "crocs") {
        activateCard(card);
        setPlayMessage("🩴 Crocs cute đã bắt đầu đi dạo. Mong Embee bước qua tuổi mới thật thoải mái, tự tin, bình yên và vẫn đáng yêu như vậy.");
        spawnSteps(14);
        increaseLove();
      }
    }

    var playground = document.getElementById("playground");

    on(playground, "click", function (event) {
      var card = event.target.closest("[data-toy]");

      if (!card) return;

      var toyName = card.getAttribute("data-toy");

      handleToy(toyName, card);
    });

    on(document.getElementById("gachaButton"), "click", function () {
      var machine = document.getElementById("gachaMachine");
      var result = document.getElementById("gachaResult");

      if (machine) {
        machine.classList.add("shake");
      }

      if (result) {
        result.textContent = "Đang rút lời thương cho Embee...";
      }

      setTimeout(function () {
        if (result) {
          result.textContent = randomItem(gachaNotes);
        }

        if (machine) {
          machine.classList.remove("shake");
        }

        increaseLove();
        burstCute(18);
      }, 650);
    });

    $all(".gallery-img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.onerror = null;
        img.src = makeFallbackImage("Embee 💙");
      });
    });

    $all(".gallery-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var image = card.querySelector("img");
        var lightbox = document.getElementById("lightbox");
        var lightboxImage = document.getElementById("lightboxImage");

        if (!image || !lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;
        lightbox.classList.add("show");
      });
    });

    on(document.getElementById("lightbox"), "click", function () {
      var lightbox = document.getElementById("lightbox");
      var lightboxImage = document.getElementById("lightboxImage");

      if (lightbox) {
        lightbox.classList.remove("show");
      }

      if (lightboxImage) {
        lightboxImage.src = "";
      }
    });

    function appendEffect(element, removeAfter) {
      if (!effectLayer) return;

      effectLayer.appendChild(element);

      setTimeout(function () {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, removeAfter || 6000);
    }

    function burstCute(amount) {
      var total = amount || 18;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

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

    function spawnFalling(items, amount) {
      var total = amount || 20;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-down";
          item.textContent = randomItem(items);

          item.style.left = Math.random() * 100 + "vw";
          item.style.fontSize = 14 + Math.random() * 18 + "px";
          item.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";

          appendEffect(item, 5600);
        }, i * 42);
      }
    }

    function spawnMatchaDrops(amount) {
      var total = amount || 18;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-down matcha-drop";
          item.style.left = Math.random() * 100 + "vw";
          item.style.animationDuration = 2.5 + Math.random() * 2.1 + "s";

          appendEffect(item, 5600);
        }, i * 48);
      }
    }

    function spawnPaws(amount) {
      var total = amount || 12;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-paw";
          item.textContent = randomItem(["🐾", "🐶", "🐱"]);

          item.style.top = 18 + Math.random() * 68 + "vh";
          item.style.fontSize = 18 + Math.random() * 18 + "px";
          item.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";

          appendEffect(item, 3400);
        }, i * 90);
      }
    }

    function spawnSteps(amount) {
      var total = amount || 10;
      var startX = 12 + Math.random() * 15;
      var startY = 76 + Math.random() * 8;

      for (var i = 0; i < total; i++) {
        createStep(i, startX, startY);
      }
    }

    function createStep(index, startX, startY) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-step";
        item.textContent = index % 2 === 0 ? "🩴" : "☁️";

        item.style.left = startX + index * 6 + "vw";
        item.style.top = startY - index * 3 + "vh";
        item.style.fontSize = "1.7rem";
        item.style.animationDuration = "1.8s";

        appendEffect(item, 2300);
      }, index * 120);
    }

    document.addEventListener("click", function (event) {
      if (!siteOpened) return;

      var interactive = event.target.closest(
        "button, .gallery-card, .toy-card, .lightbox, a"
      );

      if (interactive) return;

      var item = document.createElement("div");

      item.className = "fx fx-up";
      item.textContent = randomItem(["💙", "🩵", "☁️", "✨"]);

      item.style.left = event.clientX + "px";
      item.style.bottom = window.innerHeight - event.clientY + "px";
      item.style.fontSize = "20px";
      item.style.animationDuration = "3.5s";

      appendEffect(item, 4200);
    });

    setInterval(function () {
      if (siteOpened) {
        burstCute(1);
      }
    }, 1500);

    function makeFallbackImage(label) {
      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">' +
        '<defs>' +
        '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
        '<stop offset="0%" stop-color="#9fe2ff"/>' +
        '<stop offset="55%" stop-color="#d9f4ff"/>' +
        '<stop offset="100%" stop-color="#b7d77a"/>' +
        "</linearGradient>" +
        "</defs>" +
        '<rect width="900" height="1100" fill="url(#g)"/>' +
        '<circle cx="690" cy="180" r="130" fill="rgba(255,255,255,0.35)"/>' +
        '<circle cx="210" cy="880" r="180" fill="rgba(255,255,255,0.25)"/>' +
        '<text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="70" font-weight="700" fill="#08213b">💙</text>' +
        '<text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="44" font-weight="700" fill="#08213b">' +
        label +
        "</text>" +
        "</svg>";

      return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
    }
  });
})();
