(function () {
  console.log("Heart Landing V10 for Embee loaded 💙");

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var heartLanding = document.getElementById("heartLanding");
    var decryptScreen = document.getElementById("decryptScreen");
    var heartScene = document.getElementById("heartScene");
    var heartCanvas = document.getElementById("heartCanvas");
    var birthdayWorld = document.getElementById("birthdayWorld");
    var bgMusic = document.getElementById("bgMusic");
    var floatingMusic = document.getElementById("floatingMusic");
    var musicIcon = document.getElementById("musicIcon");
    var fxLayer = document.getElementById("fxLayer");

    var canvasContext = heartCanvas ? heartCanvas.getContext("2d") : null;

    var siteOpened = false;
    var decryptStarted = false;
    var heartAnimationDone = false;

    var loveScore = 100;
    var wheelRotation = 0;
    var wheelSpinning = false;

    var quests = {
      matcha: false,
      choco: false,
      pet: false,
      noodle: false,
      cake: false,
      crocs: false
    };

    var heartParticles = [];
    var heartStartTime = 0;
    var heartAnimationId = null;

    var quickLoveNotes = [
      "Embee là người khiến cả màn hình này sáng lên.",
      "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
      "Tuổi mới của Embee phải có nhiều matcha, nhiều chocolate, nhiều món ngon và thật nhiều bình yên.",
      "Hôm nay Embee là nhân vật chính, nên em chỉ cần vui, xinh và nhận thật nhiều yêu thương thôi.",
      "Nếu được chọn một điều đẹp nhất hôm nay, anh vẫn chọn nụ cười của Embee."
    ];

    var questMessages = {
      matcha:
        "🍵 Matcha đã mở khóa. Mong tuổi mới của Embee luôn dịu, xanh, bình yên và ngọt vừa đủ như ly matcha em thích.",
      choco:
        "🍫 Chocolate đã mở khóa. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.",
      pet:
        "🐶🐱 Cún mèo đã mở khóa. Độ đáng yêu của Embee chính thức được nhân đôi rồi đó.",
      noodle:
        "🍜 Tô mì đã mở khóa. Mong tuổi mới của em có thật nhiều bữa ngon, nhiều ngày vui và nhiều lần được dỗ dành.",
      cake:
        "🎂 Bánh sinh nhật đã mở khóa. Hôm nay Embee là điều đáng được ước nguyện nhất.",
      crocs:
        "🩴 Crocs cute đã mở khóa. Mong Embee bước qua tuổi mới thật nhẹ nhàng, tự tin và bình yên."
    };

    var wishes = [
      "🕯️ Điều ước đã bay lên rồi: mong Embee tuổi mới luôn xinh, vui, bình yên và được yêu thật dịu dàng.",
      "💙 Anh ước Embee sẽ luôn được dỗ dành đúng lúc, được lắng nghe đúng lúc và được thương thật lòng.",
      "🎂 Mong tuổi mới của Embee có nhiều tiếng cười, nhiều món ngon và nhiều khoảnh khắc đáng nhớ.",
      "✨ Mong những điều làm em buồn sẽ nhẹ đi, còn những điều làm em cười sẽ nhiều hơn.",
      "🩵 Mong Embee luôn có cảm giác an toàn khi ở bên người thương em thật lòng."
    ];

    var compliments = [
      "Embee đáng yêu kiểu rất riêng, không cần cố cũng làm người ta muốn thương.",
      "Embee có vibe xanh xanh mềm mềm, nhìn thôi cũng thấy dịu lại.",
      "Nụ cười của Embee đúng kiểu làm birthday world sáng lên luôn á.",
      "Embee nhõng nhẽo một chút cũng đáng yêu, vì đó là Embee mà anh thương.",
      "Embee là kiểu người nhỏ xinh nhưng chiếm rất nhiều trong tim anh.",
      "Hôm nay Embee là nhân vật chính, nên phải được khen thật nhiều."
    ];

    var wheelNotes = [
      "💙 Phần thưởng: một cái ôm tinh thần thật lâu cho Embee.",
      "🍵 Phần thưởng: một ly matcha latte tưởng tượng, ít đắng nhiều thương.",
      "🎂 Phần thưởng: một điều ước sinh nhật được anh giữ thật cẩn thận.",
      "🐾 Phần thưởng: cún mèo chạy qua gửi 1000 điểm đáng yêu cho Embee.",
      "🍫 Phần thưởng: một miếng chocolate ngọt như cách anh thương em.",
      "🎈 Phần thưởng: một ngày nhẹ nhàng, không buồn, không mệt, chỉ có vui."
    ];

    function $(selector) {
      return document.querySelector(selector);
    }

    function $all(selector) {
      return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function randomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    /* =========================
       MUSIC
    ========================= */

    function playMusic() {
      if (!bgMusic) return;

      bgMusic.volume = 0.58;

      var promise = bgMusic.play();

      if (promise && typeof promise.then === "function") {
        promise
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

    function toggleMusic() {
      if (!bgMusic) return;

      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    }

    function setMusicUi(isPlaying) {
      if (musicIcon) {
        musicIcon.textContent = isPlaying ? "❚❚" : "▶";
      }

      if (floatingMusic) {
        floatingMusic.classList.toggle("playing", isPlaying);
      }
    }

    /* =========================
       HEART CANVAS
    ========================= */

    function resizeHeartCanvas() {
      if (!heartCanvas || !canvasContext) return;

      var ratio = window.devicePixelRatio || 1;

      heartCanvas.width = Math.floor(window.innerWidth * ratio);
      heartCanvas.height = Math.floor(window.innerHeight * ratio);

      heartCanvas.style.width = window.innerWidth + "px";
      heartCanvas.style.height = window.innerHeight + "px";

      canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function makeHeartPoint(t, scale, centerX, centerY) {
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

    function createHeartParticles() {
      heartParticles = [];

      var width = window.innerWidth;
      var height = window.innerHeight;

      var centerX = width / 2;
      var centerY = height / 2 + 8;
      var scale = Math.min(width, height) / 34;

      var amount = width < 480 ? 230 : 430;

      for (var i = 0; i < amount; i++) {
        var t = Math.random() * Math.PI * 2;
        var heart = makeHeartPoint(t, scale, centerX, centerY);

        var inner = Math.pow(Math.random(), 0.55);
        var targetX = centerX + (heart.x - centerX) * inner;
        var targetY = centerY + (heart.y - centerY) * inner;

        var startX = targetX + (Math.random() - 0.5) * width * 1.2;
        var startY = height + 80 + Math.random() * height * 0.9;

        heartParticles.push({
          text: Math.random() > 0.18 ? "i love you" : "love you",
          x: startX,
          y: startY,
          startX: startX,
          startY: startY,
          targetX: targetX,
          targetY: targetY,
          vx: 0,
          vy: 0,
          size: width < 480 ? 11 + Math.random() * 5 : 12 + Math.random() * 7,
          alpha: 0,
          delay: Math.random() * 1400,
          jitter: Math.random() * 1000,
          colorShift: Math.random()
        });
      }
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function drawHeartParticles(time) {
      if (!canvasContext || !heartCanvas) return;

      var width = window.innerWidth;
      var height = window.innerHeight;

      canvasContext.clearRect(0, 0, width, height);

      var elapsed = time - heartStartTime;

      var formingProgress = clamp((elapsed - 300) / 5200, 0, 1);
      var centerProgress = clamp((elapsed - 4200) / 1200, 0, 1);
      var glowProgress = clamp((elapsed - 5400) / 1400, 0, 1);

      var heartSceneElement = document.getElementById("heartScene");

      if (centerProgress > 0.4 && heartSceneElement) {
        heartSceneElement.classList.add("formed");
      }

      canvasContext.save();

      canvasContext.globalCompositeOperation = "lighter";

      for (var i = 0; i < heartParticles.length; i++) {
        var p = heartParticles[i];

        var local = clamp((elapsed - p.delay) / 4300, 0, 1);
        var eased = easeOutCubic(local);

        var wave = Math.sin((elapsed + p.jitter) / 520) * 6;

        p.x = p.startX + (p.targetX - p.startX) * eased;
        p.y = p.startY + (p.targetY - p.startY) * eased + wave * (1 - eased);

        p.alpha = clamp(local * 1.4, 0, 1);

        if (formingProgress > 0.92) {
          p.x += Math.sin((elapsed + p.jitter) / 900) * 1.4;
          p.y += Math.cos((elapsed + p.jitter) / 900) * 1.4;
        }

        var red = p.colorShift > 0.5 ? 255 : 255;
        var green = p.colorShift > 0.5 ? 95 : 52;
        var blue = p.colorShift > 0.5 ? 130 : 105;

        canvasContext.globalAlpha = p.alpha * 0.9;
        canvasContext.fillStyle =
          "rgba(" + red + "," + green + "," + blue + "," + p.alpha + ")";
        canvasContext.font = "700 " + p.size + "px Space Mono, monospace";
        canvasContext.fillText(p.text, p.x, p.y);
      }

      if (glowProgress > 0) {
        var gradient = canvasContext.createRadialGradient(
          width / 2,
          height / 2,
          10,
          width / 2,
          height / 2,
          Math.min(width, height) * 0.42
        );

        gradient.addColorStop(0, "rgba(255, 45, 95," + 0.12 * glowProgress + ")");
        gradient.addColorStop(0.45, "rgba(255, 45, 95," + 0.07 * glowProgress + ")");
        gradient.addColorStop(1, "rgba(255, 45, 95,0)");

        canvasContext.globalAlpha = 1;
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, width, height);
      }

      canvasContext.restore();

      if (elapsed < 8200) {
        heartAnimationId = requestAnimationFrame(drawHeartParticles);
      } else {
        heartAnimationDone = true;

        setTimeout(function () {
          openBirthdayWorld();
        }, 650);
      }
    }

    function startHeartAnimation() {
      if (decryptStarted) return;

      decryptStarted = true;

      playMusic();

      if (decryptScreen) {
        decryptScreen.classList.add("hidden");
      }

      if (heartScene) {
        heartScene.classList.remove("hidden");
      }

      resizeHeartCanvas();
      createHeartParticles();

      heartStartTime = performance.now();

      if (heartAnimationId) {
        cancelAnimationFrame(heartAnimationId);
      }

      heartAnimationId = requestAnimationFrame(drawHeartParticles);
    }

    function openBirthdayWorld() {
      if (siteOpened) return;

      siteOpened = true;

      if (heartAnimationId) {
        cancelAnimationFrame(heartAnimationId);
        heartAnimationId = null;
      }

      if (heartLanding) {
        heartLanding.style.display = "none";
      }

      if (birthdayWorld) {
        birthdayWorld.classList.remove("hidden");
      }

      if (floatingMusic) {
        floatingMusic.classList.remove("hidden");
      }

      playMusic();
      showRevealItems();
      spawnConfetti(90);
      burstCute(30);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    /* =========================
       REVEAL
    ========================= */

    var revealItems = $all(".reveal");

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
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
        observer.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("show");
      });
    }

    function showRevealItems() {
      revealItems.forEach(function (item) {
        var rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.96) {
          item.classList.add("show");
        }
      });
    }

    /* =========================
       QUEST
    ========================= */

    function getQuestCount() {
      var count = 0;

      Object.keys(quests).forEach(function (key) {
        if (quests[key]) count++;
      });

      return count;
    }

    function completeQuest(questName, card) {
      if (!Object.prototype.hasOwnProperty.call(quests, questName)) return;

      var wasLocked = !quests[questName];

      quests[questName] = true;

      if (card) {
        card.classList.add("unlocked");
      }

      var badge = document.getElementById("badge-" + questName);

      if (badge) {
        badge.textContent = "unlocked";
      }

      updateQuestUi();

      if (wasLocked) {
        spawnFalling(["🔓", "💙", "✨"], 14);
        burstCute(8);
      }
    }

    function updateQuestUi() {
      var count = getQuestCount();
      var questCount = document.getElementById("questCount");
      var questBar = document.getElementById("questBar");

      if (questCount) {
        questCount.textContent = count;
      }

      if (questBar) {
        questBar.style.width = (count / 6) * 100 + "%";
      }

      if (count >= 6) {
        unlockFinalCard();
      }
    }

    function unlockFinalCard() {
      var finalCard = document.getElementById("finalCard");
      var finalIcon = document.getElementById("finalIcon");
      var finalTitle = document.getElementById("finalTitle");
      var finalText = document.getElementById("finalText");

      if (finalCard && !finalCard.classList.contains("unlocked")) {
        finalCard.classList.remove("locked");
        finalCard.classList.add("unlocked");

        spawnConfetti(110);
        spawnFalling(["🎁", "💙", "🩵", "✨"], 38);
      }

      if (finalIcon) {
        finalIcon.textContent = "🎁";
      }

      if (finalTitle) {
        finalTitle.textContent = "Món quà cuối đã mở khóa";
      }

      if (finalText) {
        finalText.textContent =
          "Embee đã mở đủ 6 điều yêu thích. Món quà cuối cùng đã sẵn sàng rồi.";
      }
    }

    function handleQuest(card) {
      var questName = card.getAttribute("data-quest");
      var message = document.getElementById("questMessage");

      completeQuest(questName, card);
      increaseLove();

      if (message && questMessages[questName]) {
        message.textContent = questMessages[questName];
        pulseElement(message);
      }

      if (questName === "matcha") {
        spawnMatchaDrops(28);
        return;
      }

      if (questName === "choco") {
        spawnFalling(["🍫", "◆", "●", "▪"], 34);
        return;
      }

      if (questName === "pet") {
        spawnSide(["🐾", "🐶", "🐱"], 20);
        return;
      }

      if (questName === "noodle") {
        spawnFalling(["🍜", "🥢", "✨"], 26);
        return;
      }

      if (questName === "cake") {
        spawnFalling(["🎂", "🍰", "✨", "💙"], 30);
        return;
      }

      if (questName === "crocs") {
        spawnFalling(["🩴", "☁️", "💙"], 24);
      }
    }

    /* =========================
       FUN ACTIONS
    ========================= */

    function increaseLove() {
      loveScore += Math.floor(Math.random() * 8) + 3;

      var loveScoreElement = document.getElementById("loveScore");

      if (loveScoreElement) {
        loveScoreElement.textContent = loveScore + "%";
      }
    }

    function quickLove() {
      var heroNote = document.getElementById("heroNote");

      if (heroNote) {
        heroNote.innerHTML = "<span>private note</span>" + randomItem(quickLoveNotes);
        pulseElement(heroNote);
      }

      increaseLove();
      spawnFalling(["💌", "💙", "🩵", "✨"], 22);
    }

    function doWish() {
      var wishText = document.getElementById("wishText");

      if (wishText) {
        wishText.textContent = randomItem(wishes);
        pulseElement(wishText);
      }

      spawnFalling(["🕯️", "🎂", "💙", "✨"], 30);
      increaseLove();
    }

    function doBalloon() {
      spawnFalling(["🎈", "🎂", "💙", "🩵", "✨"], 42);
      spawnConfetti(45);
      increaseLove();
    }

    function doCompliment() {
      var complimentText = document.getElementById("complimentText");

      if (complimentText) {
        complimentText.textContent = randomItem(compliments);
        pulseElement(complimentText);
      }

      spawnFalling(["💌", "💙", "✨"], 24);
      increaseLove();
    }

    function spinWheel() {
      if (wheelSpinning) return;

      wheelSpinning = true;

      var wheel = document.getElementById("loveWheel");
      var result = document.getElementById("wheelResult");

      wheelRotation += 720 + Math.floor(Math.random() * 900);

      if (wheel) {
        wheel.style.transition = "transform 1.35s cubic-bezier(.18,.88,.24,1)";
        wheel.style.transform = "rotate(" + wheelRotation + "deg)";
      }

      if (result) {
        result.textContent = "Đang quay lời chúc cho Embee...";
      }

      spawnFalling(["🎡", "💙", "✨"], 20);

      setTimeout(function () {
        if (result) {
          result.textContent = randomItem(wheelNotes);
          pulseElement(result);
        }

        spawnConfetti(50);
        increaseLove();
        wheelSpinning = false;
      }, 1380);
    }

    function tryFinalGift() {
      var count = getQuestCount();

      if (count < 6) {
        var finalText = document.getElementById("finalText");

        if (finalText) {
          finalText.textContent =
            "Còn thiếu " + (6 - count) + " điều nữa. Embee mở thêm ở Love Quest nha.";
          pulseElement(finalText);
        }

        spawnFalling(["🔒", "💙", "✨"], 16);

        var questSection = document.getElementById("loveQuest");

        if (questSection) {
          questSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        return;
      }

      openModal("finalModal");
      spawnConfetti(85);
      spawnFalling(["🎁", "💙", "🩵", "✨"], 34);
    }

    /* =========================
       MODALS / NAV
    ========================= */

    function scrollToSection(id) {
      var section = document.getElementById(id);

      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    function openPhoto(button) {
      var modalPhoto = document.getElementById("modalPhoto");
      var modalCaption = document.getElementById("modalCaption");

      var imageUrl = button.getAttribute("data-img");
      var caption = button.getAttribute("data-caption");

      if (modalPhoto && imageUrl) {
        modalPhoto.src = imageUrl;
      }

      if (modalCaption) {
        modalCaption.textContent = caption || "Một khoảnh khắc rất đáng yêu của Embee.";
      }

      openModal("photoModal");
    }

    function openModal(id) {
      var modal = document.getElementById(id);

      if (modal) {
        modal.classList.add("show");
      }
    }

    function closeModal(id) {
      var modal = document.getElementById(id);

      if (modal) {
        modal.classList.remove("show");
      }

      if (id === "photoModal") {
        var modalPhoto = document.getElementById("modalPhoto");

        if (modalPhoto) {
          modalPhoto.src = "";
        }
      }
    }

    /* =========================
       ACTION DELEGATION
    ========================= */

    function handleAction(button, event) {
      var action = button.getAttribute("data-action");

      if (!action) return;

      if (event && siteOpened) {
        createRipple(event.clientX, event.clientY);
      }

      if (action === "decrypt") {
        startHeartAnimation();
        return;
      }

      if (action === "open-world") {
        openBirthdayWorld();
        return;
      }

      if (action === "toggle-music") {
        toggleMusic();
        return;
      }

      if (action === "scroll") {
        scrollToSection(button.getAttribute("data-target"));
        return;
      }

      if (action === "open-letter") {
        openModal("letterModal");
        return;
      }

      if (action === "confetti") {
        spawnConfetti(95);
        spawnFalling(["🎊", "🎂", "🎈", "💙", "✨"], 34);
        increaseLove();
        return;
      }

      if (action === "quick-love") {
        quickLove();
        return;
      }

      if (action === "quest") {
        handleQuest(button);
        return;
      }

      if (action === "wish") {
        doWish();
        return;
      }

      if (action === "balloon") {
        doBalloon();
        return;
      }

      if (action === "compliment") {
        doCompliment();
        return;
      }

      if (action === "spin") {
        spinWheel();
        return;
      }

      if (action === "photo") {
        openPhoto(button);
        return;
      }

      if (action === "final") {
        tryFinalGift();
        return;
      }

      if (action === "close-modal") {
        closeModal(button.getAttribute("data-target"));
      }
    }

    document.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-action]");

      if (actionButton) {
        event.preventDefault();
        handleAction(actionButton, event);
        return;
      }

      if (
        !decryptStarted &&
        decryptScreen &&
        decryptScreen.contains(event.target)
      ) {
        startHeartAnimation();
        return;
      }

      if (event.target.classList && event.target.classList.contains("modal")) {
        closeModal(event.target.id);
        return;
      }

      if (!siteOpened) return;

      createRipple(event.clientX, event.clientY);
      spawnClickLove(event.clientX, event.clientY);
    });

    window.addEventListener("resize", function () {
      if (!heartScene || heartScene.classList.contains("hidden")) return;

      resizeHeartCanvas();
      createHeartParticles();
    });

    $all(".safe-img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.onerror = null;
        img.src = makeFallbackImage("Embee 💙");
      });
    });

    /* =========================
       EFFECTS
    ========================= */

    function appendFx(element, removeAfter) {
      if (!fxLayer) return;

      fxLayer.appendChild(element);

      setTimeout(function () {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, removeAfter || 6000);
    }

    function burstCute(amount) {
      var total = amount || 18;

      for (var i = 0; i < total; i++) {
        createFloatingEmoji(i);
      }
    }

    function createFloatingEmoji(index) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-up";
        item.textContent = randomItem([
          "💙",
          "🩵",
          "❤️",
          "🍵",
          "🍫",
          "🐾",
          "🐶",
          "🐱",
          "🎂",
          "🍜",
          "🎈",
          "✨"
        ]);

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = 16 + Math.random() * 22 + "px";
        item.style.animationDuration = 4.4 + Math.random() * 2.8 + "s";

        appendFx(item, 7600);
      }, index * 45);
    }

    function spawnFalling(items, amount) {
      var total = amount || 20;

      for (var i = 0; i < total; i++) {
        createFallingItem(items, i);
      }
    }

    function createFallingItem(items, index) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-down";
        item.textContent = randomItem(items);

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = 14 + Math.random() * 18 + "px";
        item.style.animationDuration = 2.4 + Math.random() * 2.2 + "s";

        appendFx(item, 5600);
      }, index * 42);
    }

    function spawnConfetti(amount) {
      var total = amount || 60;

      for (var i = 0; i < total; i++) {
        createConfetti(i);
      }
    }

    function createConfetti(index) {
      setTimeout(function () {
        var item = document.createElement("div");
        var colors = ["c-red", "c-blue", "c-pink", "c-yellow", "c-matcha"];

        item.className = "fx fx-down confetti " + randomItem(colors);

        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2.3 + Math.random() * 2.2 + "s";
        item.style.transform = "rotate(" + Math.floor(Math.random() * 180) + "deg)";

        appendFx(item, 5600);
      }, index * 18);
    }

    function spawnMatchaDrops(amount) {
      var total = amount || 18;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-down matcha-drop";
          item.style.left = Math.random() * 100 + "vw";
          item.style.animationDuration = 2.5 + Math.random() * 2.1 + "s";

          appendFx(item, 5600);
        }, i * 48);
      }
    }

    function spawnSide(items, amount) {
      var total = amount || 12;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-side";
          item.textContent = randomItem(items);

          item.style.top = 18 + Math.random() * 68 + "vh";
          item.style.fontSize = 18 + Math.random() * 18 + "px";
          item.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";

          appendFx(item, 3400);
        }, i * 90);
      }
    }

    function spawnClickLove(x, y) {
      var item = document.createElement("div");

      item.className = "fx fx-up";
      item.textContent = randomItem(["love", "💙", "❤️", "✨"]);

      item.style.left = x + "px";
      item.style.bottom = window.innerHeight - y + "px";
      item.style.fontSize = "18px";
      item.style.animationDuration = "3.4s";

      appendFx(item, 4200);
    }

    function createRipple(x, y) {
      var ring = document.createElement("div");

      ring.className = "fx-ring";
      ring.style.left = x + "px";
      ring.style.top = y + "px";

      appendFx(ring, 850);
    }

    function pulseElement(element) {
      if (!element || typeof element.animate !== "function") return;

      element.animate(
        [
          { transform: "scale(0.97)", opacity: 0.72 },
          { transform: "scale(1.025)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 }
        ],
        {
          duration: 520,
          easing: "cubic-bezier(.2,.8,.2,1)"
        }
      );
    }

    setInterval(function () {
      if (siteOpened) {
        burstCute(1);
      }
    }, 1700);

    function makeFallbackImage(label) {
      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100">' +
        '<defs>' +
        '<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">' +
        '<stop offset="0%" stop-color="#ff6b86"/>' +
        '<stop offset="55%" stop-color="#b5ecff"/>' +
        '<stop offset="100%" stop-color="#b8d978"/>' +
        "</linearGradient>" +
        "</defs>" +
        '<rect width="900" height="1100" fill="url(#g)"/>' +
        '<circle cx="690" cy="180" r="130" fill="rgba(255,255,255,0.35)"/>' +
        '<circle cx="210" cy="880" r="180" fill="rgba(255,255,255,0.25)"/>' +
        '<text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="70" font-weight="700" fill="#08131f">💙</text>' +
        '<text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="44" font-weight="700" fill="#08131f">' +
        label +
        "</text>" +
        "</svg>";

      return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
    }
  });
})();
