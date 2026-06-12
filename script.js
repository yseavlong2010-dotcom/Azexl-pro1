(function () {
  console.log("Embee Birthday Arcade V9 loaded 💙");

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var intro = document.getElementById("intro");
    var app = document.getElementById("app");
    var topbar = document.getElementById("topbar");
    var bgMusic = document.getElementById("bgMusic");
    var fxLayer = document.getElementById("fxLayer");

    var siteOpened = false;
    var loveScore = 100;
    var finalUnlocked = false;
    var wheelSpinning = false;
    var wheelRotation = 0;

    var quests = {
      matcha: false,
      choco: false,
      pet: false,
      noodle: false,
      cake: false,
      crocs: false,
      party: false
    };

    var toyMessages = {
      matcha:
        "🍵 Matcha đã được mở khóa. Mong tuổi mới của Embee luôn dịu, xanh, bình yên và ngọt vừa đủ như ly matcha em thích.",
      choco:
        "🍫 Chocolate đã được mở khóa. Mong mỗi ngày của Embee đều có một chút ngọt ngào để thấy mình được yêu thương.",
      pet:
        "🐶🐱 Cún mèo đã được mở khóa. Độ đáng yêu của Embee chính thức được nhân đôi rồi đó.",
      noodle:
        "🍜 Tô mì đã được mở khóa. Mong tuổi mới của em có thật nhiều bữa ngon, nhiều ngày vui và nhiều lần được dỗ dành.",
      cake:
        "🎂 Bánh sinh nhật đã được mở khóa. Hôm nay Embee là điều đáng được ước nguyện nhất.",
      crocs:
        "🩴 Crocs cute đã được mở khóa. Mong Embee bước qua tuổi mới thật nhẹ nhàng, tự tin và bình yên."
    };

    var quickNotes = [
      "Embee là nhân vật chính của hôm nay, nên em chỉ cần vui, xinh và nhận thật nhiều yêu thương thôi.",
      "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
      "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
      "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương.",
      "Hôm nay web này hoạt động vì một nhiệm vụ duy nhất: làm Embee thấy mình được thương thật nhiều."
    ];

    var wishes = [
      "🎂 Điều ước đã bay lên rồi: mong Embee tuổi mới luôn xinh, vui, bình yên và được yêu thật dịu dàng.",
      "🩵 Nến tắt rồi nè: mong mọi điều khiến Embee buồn sẽ nhẹ đi, còn những điều làm em cười sẽ nhiều hơn.",
      "✨ Điều ước sinh nhật: mong Embee luôn có matcha ngon, chocolate ngọt, ngày vui và người thương em thật lòng.",
      "💙 Anh ước Embee sẽ luôn được dỗ dành đúng lúc, được ôm bằng sự dịu dàng và được yêu theo cách em xứng đáng.",
      "🎁 Điều ước nhỏ: mong tuổi mới của Embee có thật nhiều may mắn, nhiều tiếng cười và nhiều khoảnh khắc đáng nhớ."
    ];

    var compliments = [
      "Embee đáng yêu kiểu rất riêng, không cần cố cũng làm người ta muốn thương.",
      "Embee có vibe xanh xanh mềm mềm, nhìn thôi cũng thấy dịu lại.",
      "Embee nhõng nhẽo một chút cũng đáng yêu, vì đó là Embee mà anh thương.",
      "Nụ cười của Embee đúng kiểu làm birthday arcade sáng lên luôn á.",
      "Embee xứng đáng được yêu bằng sự kiên nhẫn, tử tế và thật lòng.",
      "Embee là kiểu người nhỏ xinh nhưng chiếm rất nhiều trong tim anh.",
      "Hôm nay Embee là nhân vật chính, nên phải được khen thật nhiều.",
      "Embee cute đến mức cái web này cũng phải bắn pháo giấy để chúc mừng."
    ];

    var wheelNotes = [
      "💙 Phần thưởng: một cái ôm tinh thần thật lâu cho Embee.",
      "🍵 Phần thưởng: một ly matcha latte trong tưởng tượng, ít đắng nhiều thương.",
      "🎂 Phần thưởng: một điều ước sinh nhật được anh giữ thật cẩn thận.",
      "🎈 Phần thưởng: một ngày nhẹ nhàng, không buồn, không mệt, chỉ có vui.",
      "🐾 Phần thưởng: cún mèo chạy qua gửi 1000 điểm đáng yêu cho Embee.",
      "🍫 Phần thưởng: một miếng chocolate ngọt như cách anh thương em."
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

    function openWorld() {
      if (siteOpened) return;

      siteOpened = true;

      if (app) app.classList.remove("hidden");
      if (topbar) topbar.classList.remove("hidden");

      var floatingMusic = document.getElementById("floatingMusic");
      if (floatingMusic) floatingMusic.classList.remove("hidden");

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
      spawnConfetti(80);
      burstCute(32);
      createRipple(window.innerWidth / 2, window.innerHeight / 2);
    }

    window.openEmbeeSite = openWorld;

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

    function toggleMusic() {
      if (!bgMusic) return;

      if (bgMusic.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    }

    function setMusicUi(isPlaying) {
      var musicButtonIcon = document.getElementById("musicButtonIcon");
      var floatingMusicIcon = document.getElementById("floatingMusicIcon");
      var floatingMusic = document.getElementById("floatingMusic");
      var musicDisc = document.getElementById("musicDisc");
      var waveBars = document.getElementById("waveBars");

      if (musicButtonIcon) musicButtonIcon.textContent = isPlaying ? "❚❚" : "▶";
      if (floatingMusicIcon) floatingMusicIcon.textContent = isPlaying ? "❚❚" : "▶";

      if (floatingMusic) floatingMusic.classList.toggle("playing", isPlaying);
      if (musicDisc) musicDisc.classList.toggle("playing", isPlaying);
      if (waveBars) waveBars.classList.toggle("playing", isPlaying);
    }

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

        if (rect.top < window.innerHeight * 0.95) {
          item.classList.add("show");
        }
      });
    }

    function scrollToTarget(targetId) {
      var target = document.getElementById(targetId);

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    function quickNote() {
      var heroNote = document.getElementById("heroNote");

      if (heroNote) {
        heroNote.innerHTML = "<span>private note</span>" + randomItem(quickNotes);
      }

      increaseLove();
      burstCute(18);
      spawnSparkles(14);
    }

    function increaseLove() {
      loveScore += Math.floor(Math.random() * 8) + 3;

      var loveScoreElement = document.getElementById("loveScore");

      if (loveScoreElement) {
        loveScoreElement.textContent = loveScore + "%";
      }
    }

    function getQuestCount() {
      var count = 0;

      Object.keys(quests).forEach(function (key) {
        if (quests[key]) count++;
      });

      return count;
    }

    function completeQuest(questName, sourceElement) {
      if (!Object.prototype.hasOwnProperty.call(quests, questName)) return;

      var wasLocked = !quests[questName];

      quests[questName] = true;

      if (sourceElement) {
        sourceElement.classList.add("unlocked");
      }

      var badge = document.getElementById("badge-" + questName);

      if (badge) {
        badge.classList.remove("locked");
        badge.classList.add("unlocked");

        var status = badge.querySelector("em");
        if (status) {
          status.textContent = "unlocked";
        }
      }

      updateQuestUi();

      if (wasLocked) {
        spawnFalling(["🔓", "💙", "✨"], 16);
        burstCute(10);
      }
    }

    function updateQuestUi() {
      var count = getQuestCount();
      var percent = (count / 7) * 100;

      var questCount = document.getElementById("questCount");
      var questLine = document.getElementById("questLine");
      var topQuestText = document.getElementById("topQuestText");
      var topQuestBar = document.getElementById("topQuestBar");

      if (questCount) questCount.textContent = count;
      if (questLine) questLine.style.width = percent + "%";
      if (topQuestText) topQuestText.textContent = "Quest " + count + "/7";
      if (topQuestBar) topQuestBar.style.width = percent + "%";

      if (count >= 7) {
        unlockFinalGate();
      }
    }

    function unlockFinalGate() {
      if (finalUnlocked) return;

      finalUnlocked = true;

      var finalGate = document.getElementById("finalGate");
      var gateIcon = document.getElementById("gateIcon");
      var finalTitle = document.getElementById("finalTitle");
      var finalText = document.getElementById("finalText");

      if (finalGate) {
        finalGate.classList.remove("locked");
        finalGate.classList.add("unlocked");
      }

      if (gateIcon) gateIcon.textContent = "🎁";
      if (finalTitle) finalTitle.textContent = "Cổng quà cuối đã mở";
      if (finalText) {
        finalText.textContent =
          "Embee đã hoàn thành đủ 7/7 nhiệm vụ. Món quà cuối cùng đã sẵn sàng rồi nè.";
      }

      spawnConfetti(110);
      spawnFalling(["🎁", "💙", "🩵", "✨"], 45);
      burstCute(28);
    }

    function setArcadeMessage(message) {
      var box = document.getElementById("arcadeMessage");

      if (!box) return;

      box.textContent = message;
      pulseElement(box);
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

    function activateCard(card) {
      if (!card) return;

      card.classList.add("active");

      setTimeout(function () {
        card.classList.remove("active");
      }, 1400);
    }

    function handleToy(card) {
      if (!card) return;

      var toyName = card.getAttribute("data-toy");

      activateCard(card);
      completeQuest(toyName, card);
      increaseLove();

      if (toyName === "matcha") {
        setArcadeMessage(toyMessages.matcha);
        spawnMatchaDrops(30);
        burstCute(8);
        return;
      }

      if (toyName === "choco") {
        setArcadeMessage(toyMessages.choco);
        spawnFalling(["🍫", "▪", "◆", "●"], 36);
        return;
      }

      if (toyName === "pet") {
        setArcadeMessage(toyMessages.pet);
        spawnPaws(22);
        burstCute(8);
        return;
      }

      if (toyName === "noodle") {
        setArcadeMessage(toyMessages.noodle);
        spawnFalling(["🍜", "🥢", "✨"], 28);
        return;
      }

      if (toyName === "cake") {
        setArcadeMessage(toyMessages.cake);
        spawnFalling(["🎂", "🍰", "✨", "💙"], 32);
        burstCute(8);
        return;
      }

      if (toyName === "crocs") {
        setArcadeMessage(toyMessages.crocs);
        spawnSteps(18);
      }
    }

    function doConfetti(actionElement) {
      completeQuest("party", actionElement);
      spawnConfetti(95);
      spawnFalling(["🎂", "🎈", "🎊", "💙", "🩵", "✨"], 38);
      burstCute(16);
      increaseLove();
    }

    function doWishCandle(actionElement) {
      completeQuest("party", actionElement);

      var wishText = document.getElementById("wishText");
      var wishFlame = document.getElementById("wishFlame");

      if (wishFlame) {
        wishFlame.classList.add("out");

        setTimeout(function () {
          wishFlame.classList.remove("out");
        }, 2600);
      }

      if (wishText) {
        wishText.textContent = randomItem(wishes);
      }

      spawnFalling(["✨", "💙", "🩵", "🎂"], 34);
      spawnSparkles(22);
      increaseLove();
    }

    function doBalloonPop(actionElement) {
      completeQuest("party", actionElement);

      var balloons = $all(".balloon");

      balloons.forEach(function (balloon, index) {
        setTimeout(function () {
          balloon.classList.add("pop");
          spawnPopAtElement(balloon, ["🎈", "🎂", "💙", "✨", "🩵"]);

          setTimeout(function () {
            balloon.classList.remove("pop");
          }, 700);
        }, index * 130);
      });

      spawnConfetti(48);
      increaseLove();
    }

    function doCompliment(actionElement) {
      completeQuest("party", actionElement);

      var complimentText = document.getElementById("complimentText");

      if (complimentText) {
        complimentText.textContent = randomItem(compliments);
        pulseElement(complimentText);
      }

      spawnFalling(["💌", "💙", "🩵", "✨"], 24);
      increaseLove();
    }

    function spinWheel() {
      if (wheelSpinning) return;

      wheelSpinning = true;

      var wheel = document.getElementById("spinWheel");
      var result = document.getElementById("wheelResult");

      wheelRotation += 720 + Math.floor(Math.random() * 720);

      if (wheel) {
        wheel.style.transition = "transform 1.25s cubic-bezier(.18,.88,.24,1)";
        wheel.style.transform = "rotate(" + wheelRotation + "deg)";
      }

      if (result) {
        result.textContent = "Đang quay lời chúc cho Embee...";
      }

      spawnSparkles(18);

      setTimeout(function () {
        if (result) {
          result.textContent = randomItem(wheelNotes);
          pulseElement(result);
        }

        spawnConfetti(45);
        increaseLove();
        wheelSpinning = false;
      }, 1300);
    }

    function tryFinalGift() {
      var count = getQuestCount();
      var finalText = document.getElementById("finalText");

      if (count < 7) {
        if (finalText) {
          finalText.textContent =
            "Còn thiếu " + (7 - count) + " dấu mộc nữa. Embee chơi thêm để mở quà cuối nha.";
        }

        spawnFalling(["🔒", "💙", "✨"], 16);
        scrollToTarget("arcade");
        return;
      }

      openModal("finalModal");
      spawnConfetti(85);
      spawnFalling(["🎁", "💙", "🩵", "✨"], 34);
    }

    function openPhoto(actionElement) {
      var photo = document.getElementById("modalPhoto");
      var caption = document.getElementById("modalCaption");

      var imgUrl = actionElement.getAttribute("data-img");
      var text = actionElement.getAttribute("data-caption");

      if (photo && imgUrl) {
        photo.src = imgUrl;
      }

      if (caption) {
        caption.textContent = text || "Một khoảnh khắc rất đáng yêu của Embee.";
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
        var photo = document.getElementById("modalPhoto");

        if (photo) {
          photo.src = "";
        }
      }
    }

    function handleAction(actionElement, event) {
      var action = actionElement.getAttribute("data-action");

      if (!action) return;

      if (siteOpened && event) {
        createRipple(event.clientX, event.clientY);
      }

      if (action === "start-world") {
        openWorld();
        return;
      }

      if (action === "toggle-music") {
        toggleMusic();
        return;
      }

      if (action === "scroll-to") {
        scrollToTarget(actionElement.getAttribute("data-target"));
        return;
      }

      if (action === "open-secret-letter") {
        openModal("secretModal");
        return;
      }

      if (action === "quick-note") {
        quickNote();
        return;
      }

      if (action === "confetti") {
        doConfetti(actionElement);
        return;
      }

      if (action === "toy") {
        handleToy(actionElement);
        return;
      }

      if (action === "wish-candle") {
        doWishCandle(actionElement);
        return;
      }

      if (action === "balloon-pop") {
        doBalloonPop(actionElement);
        return;
      }

      if (action === "compliment") {
        doCompliment(actionElement);
        return;
      }

      if (action === "spin-wheel") {
        spinWheel();
        return;
      }

      if (action === "final-gift") {
        tryFinalGift();
        return;
      }

      if (action === "open-photo") {
        openPhoto(actionElement);
        return;
      }

      if (action === "close-modal") {
        closeModal(actionElement.getAttribute("data-target"));
      }
    }

    document.addEventListener("click", function (event) {
      var actionElement = event.target.closest("[data-action]");

      if (actionElement) {
        event.preventDefault();
        handleAction(actionElement, event);
        return;
      }

      if (event.target.classList && event.target.classList.contains("modal")) {
        closeModal(event.target.id);
        return;
      }

      if (!siteOpened) return;

      createRipple(event.clientX, event.clientY);

      var item = document.createElement("div");
      item.className = "fx fx-up";
      item.textContent = randomItem(["💙", "🩵", "☁️", "✨"]);

      item.style.left = event.clientX + "px";
      item.style.bottom = window.innerHeight - event.clientY + "px";
      item.style.fontSize = "20px";
      item.style.animationDuration = "3.5s";

      appendFx(item, 4200);
    });

    $all(".safe-img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.onerror = null;
        img.src = makeFallbackImage("Embee 💙");
      });
    });

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
        createCuteDelayed(i);
      }
    }

    function createCuteDelayed(index) {
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
        createFallingDelayed(items, i);
      }
    }

    function createFallingDelayed(items, index) {
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

    function spawnMatchaDrops(amount) {
      var total = amount || 18;

      for (var i = 0; i < total; i++) {
        createMatchaDelayed(i);
      }
    }

    function createMatchaDelayed(index) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-down matcha-drop";
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2.5 + Math.random() * 2.1 + "s";

        appendFx(item, 5600);
      }, index * 48);
    }

    function spawnPaws(amount) {
      var total = amount || 12;

      for (var i = 0; i < total; i++) {
        createPawDelayed(i);
      }
    }

    function createPawDelayed(index) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-paw";
        item.textContent = randomItem(["🐾", "🐶", "🐱"]);

        item.style.top = 18 + Math.random() * 68 + "vh";
        item.style.fontSize = 18 + Math.random() * 18 + "px";
        item.style.animationDuration = 1.8 + Math.random() * 1.1 + "s";

        appendFx(item, 3400);
      }, index * 90);
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

        appendFx(item, 2300);
      }, index * 120);
    }

    function spawnConfetti(amount) {
      var total = amount || 60;

      for (var i = 0; i < total; i++) {
        createConfettiDelayed(i);
      }
    }

    function createConfettiDelayed(index) {
      setTimeout(function () {
        var item = document.createElement("div");
        var colors = [
          "confetti-blue",
          "confetti-matcha",
          "confetti-pink",
          "confetti-yellow"
        ];

        item.className = "fx fx-down confetti-piece " + randomItem(colors);
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2.3 + Math.random() * 2.2 + "s";
        item.style.transform = "rotate(" + Math.floor(Math.random() * 180) + "deg)";

        appendFx(item, 5600);
      }, index * 18);
    }

    function spawnSparkles(amount) {
      var total = amount || 12;

      for (var i = 0; i < total; i++) {
        createSparkleDelayed(i);
      }
    }

    function createSparkleDelayed(index) {
      setTimeout(function () {
        var item = document.createElement("div");

        item.className = "fx fx-sparkle";
        item.textContent = randomItem(["✨", "💙", "🩵", "☁️"]);

        item.style.left = 15 + Math.random() * 70 + "vw";
        item.style.top = 20 + Math.random() * 55 + "vh";
        item.style.fontSize = 18 + Math.random() * 18 + "px";

        appendFx(item, 1400);
      }, index * 45);
    }

    function spawnPopAtElement(element, items) {
      if (!element) return;

      var rect = element.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;

      for (var i = 0; i < 12; i++) {
        var item = document.createElement("div");

        item.className = "fx fx-pop";
        item.textContent = randomItem(items);

        item.style.left = centerX + (Math.random() * 90 - 45) + "px";
        item.style.top = centerY + (Math.random() * 70 - 35) + "px";
        item.style.fontSize = 16 + Math.random() * 16 + "px";

        appendFx(item, 1100);
      }
    }

    function createRipple(x, y) {
      var ring = document.createElement("div");

      ring.className = "fx-ring";
      ring.style.left = x + "px";
      ring.style.top = y + "px";

      appendFx(ring, 800);
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
