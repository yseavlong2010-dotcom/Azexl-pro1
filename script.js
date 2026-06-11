(function () {
  console.log("Embee Birthday Cute Party V8 loaded 🎂💙");

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
    var wishMade = false;

    var unlocked = {
      matcha: false,
      choco: false,
      pet: false,
      noodle: false,
      cake: false,
      crocs: false
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
        "🧁 Bánh sinh nhật đã được mở khóa. Hôm nay Embee là điều đáng được ước nguyện nhất.",
      crocs:
        "🩴 Crocs cute đã được mở khóa. Mong Embee bước qua tuổi mới thật nhẹ nhàng, tự tin và bình yên."
    };

    var loveNotes = [
      "Embee là kiểu người chỉ cần xuất hiện thôi cũng khiến một ngày bình thường trở nên dịu hơn.",
      "Anh thương cả những lúc Embee nhõng nhẽo, vì đó là một phần rất đáng yêu của em.",
      "Tuổi mới của Embee phải có thật nhiều matcha, chocolate, món ngon, tiếng cười và cả anh nữa.",
      "Anh mong Embee luôn được yêu thương bằng sự kiên nhẫn, dịu dàng và thật lòng.",
      "Embee không cần lúc nào cũng mạnh mẽ đâu, có những lúc em cứ nhỏ bé một chút, anh sẽ thương.",
      "Hôm nay Embee không cần làm gì nhiều đâu, chỉ cần vui, xinh và nhận thật nhiều yêu thương là được."
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
      "Nụ cười của Embee đúng kiểu làm birthday party sáng lên luôn á.",
      "Embee xứng đáng được yêu bằng sự kiên nhẫn, tử tế và thật lòng.",
      "Embee là kiểu người nhỏ xinh nhưng chiếm rất nhiều trong tim anh.",
      "Hôm nay Embee là nhân vật chính, nên phải được khen thật nhiều.",
      "Embee cute đến mức cái web này cũng phải bắn pháo giấy để chúc mừng."
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

    /* OPEN SITE */

    function openSite() {
      if (siteOpened) return;

      siteOpened = true;

      if (page) {
        page.classList.remove("hidden");
      }

      var floatingMusic = document.getElementById("floatingMusic");

      if (floatingMusic) {
        floatingMusic.classList.remove("hidden");
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
      burstCute(34);
      spawnConfetti(45);
      createRipple(window.innerWidth / 2, window.innerHeight / 2);
    }

    window.openEmbeeSite = openSite;

    on(document.getElementById("openButton"), "click", openSite);
    on(document.getElementById("giftButton"), "click", openSite);

    /* MUSIC */

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
      var musicButton = document.getElementById("musicButton");
      var floatingMusic = document.getElementById("floatingMusic");
      var floatingMusicIcon = document.getElementById("floatingMusicIcon");
      var audioDisc = document.getElementById("audioDisc");
      var waveBars = document.getElementById("waveBars");

      if (musicButton) {
        musicButton.textContent = isPlaying ? "❚❚" : "▶";
      }

      if (floatingMusicIcon) {
        floatingMusicIcon.textContent = isPlaying ? "❚❚" : "▶";
      }

      if (floatingMusic) {
        floatingMusic.classList.toggle("playing", isPlaying);
      }

      if (audioDisc) {
        audioDisc.classList.toggle("playing", isPlaying);
      }

      if (waveBars) {
        waveBars.classList.toggle("playing", isPlaying);
      }
    }

    on(document.getElementById("musicButton"), "click", toggleMusic);
    on(document.getElementById("floatingMusic"), "click", toggleMusic);

    /* REVEAL */

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

    /* HERO BUTTONS */

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
      burstCute(22);
      spawnSparkles(16);
    });

    function increaseLove() {
      loveScore += Math.floor(Math.random() * 8) + 3;

      var loveScoreElement = document.getElementById("loveScore");

      if (loveScoreElement) {
        loveScoreElement.textContent = loveScore + "%";
      }
    }

    /* QUEST / PASSPORT */

    function getUnlockCount() {
      var count = 0;

      Object.keys(unlocked).forEach(function (key) {
        if (unlocked[key]) count++;
      });

      return count;
    }

    function unlockToy(toyName, card) {
      if (!unlocked.hasOwnProperty(toyName)) return;

      var wasLocked = !unlocked[toyName];

      unlocked[toyName] = true;

      if (card) {
        card.classList.add("unlocked");
      }

      var stamp = document.getElementById("stamp-" + toyName);

      if (stamp) {
        stamp.classList.remove("locked");
        stamp.classList.add("unlocked");

        var status = stamp.querySelector("em");

        if (status) {
          status.textContent = "unlocked";
        }
      }

      updateQuestProgress();

      if (wasLocked) {
        spawnFalling(["🔓", "💙", "✨"], 14);
        burstCute(10);
      }
    }

    function updateQuestProgress() {
      var count = getUnlockCount();
      var unlockCount = document.getElementById("unlockCount");
      var questBar = document.getElementById("questBar");

      if (unlockCount) {
        unlockCount.textContent = count;
      }

      if (questBar) {
        questBar.style.width = (count / 6) * 100 + "%";
      }

      if (count >= 6) {
        unlockFinalGift();
      }
    }

    function unlockFinalGift() {
      var finalGiftCard = document.getElementById("finalGiftCard");
      var finalLockIcon = document.getElementById("finalLockIcon");
      var finalGiftTitle = document.getElementById("finalGiftTitle");
      var finalGiftText = document.getElementById("finalGiftText");
      var finalGiftButton = document.getElementById("finalGiftButton");

      if (finalGiftCard && !finalGiftCard.classList.contains("unlocked")) {
        finalGiftCard.classList.remove("locked");
        finalGiftCard.classList.add("unlocked");
        spawnFalling(["🎁", "💙", "🩵", "✨"], 36);
        spawnConfetti(70);
        burstCute(24);
      }

      if (finalLockIcon) {
        finalLockIcon.textContent = "🎁";
      }

      if (finalGiftTitle) {
        finalGiftTitle.textContent = "Món quà cuối đã được mở khóa";
      }

      if (finalGiftText) {
        finalGiftText.textContent =
          "Embee đã mở đủ 6 dấu mộc yêu thương. Bây giờ món quà cuối cùng anh giấu ở đây đã sẵn sàng rồi.";
      }

      if (finalGiftButton) {
        finalGiftButton.disabled = false;
        finalGiftButton.textContent = "Mở món quà cuối của Embee 💙";
      }
    }

    /* TOYS */

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
      activateCard(card);
      unlockToy(toyName, card);
      increaseLove();

      if (toyName === "matcha") {
        setPlayMessage(toyMessages.matcha);
        spawnMatchaDrops(28);
        burstCute(8);
        return;
      }

      if (toyName === "choco") {
        setPlayMessage(toyMessages.choco);
        spawnFalling(["🍫", "▪", "◆", "●"], 36);
        return;
      }

      if (toyName === "pet") {
        setPlayMessage(toyMessages.pet);
        spawnPaws(20);
        burstCute(8);
        return;
      }

      if (toyName === "noodle") {
        setPlayMessage(toyMessages.noodle);
        spawnFalling(["🍜", "🥢", "✨"], 26);
        return;
      }

      if (toyName === "cake") {
        setPlayMessage(toyMessages.cake);
        spawnFalling(["🧁", "🍰", "✨", "💙"], 30);
        burstCute(8);
        return;
      }

      if (toyName === "crocs") {
        setPlayMessage(toyMessages.crocs);
        spawnSteps(16);
      }
    }

    var playground = document.getElementById("playground");

    on(playground, "click", function (event) {
      var card = event.target.closest("[data-toy]");

      if (!card) return;

      var toyName = card.getAttribute("data-toy");

      handleToy(toyName, card);
    });

    /* V8 BIRTHDAY FUN LAB */

    on(document.getElementById("confettiButton"), "click", function () {
      spawnConfetti(90);
      spawnFalling(["🎂", "🎈", "🎊", "💙", "🩵", "✨"], 34);
      burstCute(16);
      increaseLove();
    });

    on(document.getElementById("birthdayWishButton"), "click", function () {
      var wishText = document.getElementById("wishText");
      var wishFlame = document.getElementById("wishFlame");
      var card = document.querySelector(".candle-fun-card");

      wishMade = true;

      if (wishFlame) {
        wishFlame.classList.add("out");
      }

      if (card) {
        card.classList.add("wish-made");
      }

      if (wishText) {
        wishText.textContent = randomItem(wishes);
      }

      spawnFalling(["✨", "💙", "🩵", "🎂"], 32);
      spawnSparkles(24);
      increaseLove();

      setTimeout(function () {
        if (wishFlame && wishMade) {
          wishFlame.classList.remove("out");
        }
      }, 2600);
    });

    on(document.getElementById("balloonButton"), "click", function () {
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

      spawnConfetti(45);
      increaseLove();
    });

    on(document.getElementById("complimentButton"), "click", function () {
      var complimentText = document.getElementById("complimentText");

      if (complimentText) {
        complimentText.textContent = randomItem(compliments);

        if (typeof complimentText.animate === "function") {
          complimentText.animate(
            [
              { transform: "scale(0.96)", opacity: 0.65 },
              { transform: "scale(1.03)", opacity: 1 },
              { transform: "scale(1)", opacity: 1 }
            ],
            {
              duration: 500,
              easing: "cubic-bezier(.2,.8,.2,1)"
            }
          );
        }
      }

      spawnFalling(["💌", "💙", "🩵", "✨"], 22);
      increaseLove();
    });

    /* FINAL GIFT MODAL */

    on(document.getElementById("finalGiftButton"), "click", function () {
      if (getUnlockCount() < 6) return;

      var finalModal = document.getElementById("finalModal");

      if (finalModal) {
        finalModal.classList.add("show");
        spawnFalling(["💙", "🩵", "✨", "🎁"], 30);
        spawnConfetti(60);
      }
    });

    on(document.getElementById("closeFinalModal"), "click", function () {
      var finalModal = document.getElementById("finalModal");

      if (finalModal) {
        finalModal.classList.remove("show");
      }
    });

    on(document.getElementById("finalModal"), "click", function (event) {
      var finalModal = document.getElementById("finalModal");

      if (event.target === finalModal) {
        finalModal.classList.remove("show");
      }
    });

    /* GACHA */

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
        spawnSparkles(14);
      }, 650);
    });

    /* GALLERY / LIGHTBOX */

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
        var lightboxCaption = document.getElementById("lightboxCaption");

        if (!image || !lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;

        if (lightboxCaption) {
          lightboxCaption.textContent =
            card.getAttribute("data-caption") || "Một khoảnh khắc rất đáng yêu của Embee.";
        }

        lightbox.classList.add("show");
      });
    });

    on(document.getElementById("lightbox"), "click", function (event) {
      var lightbox = document.getElementById("lightbox");
      var lightboxImage = document.getElementById("lightboxImage");

      if (event.target === lightbox) {
        lightbox.classList.remove("show");

        if (lightboxImage) {
          lightboxImage.src = "";
        }
      }
    });

    /* EFFECTS */

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
          "🧁",
          "🍜",
          "🎂",
          "🎈",
          "✨"
        ]);

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = 16 + Math.random() * 22 + "px";
        item.style.animationDuration = 4.4 + Math.random() * 2.8 + "s";

        appendEffect(item, 7600);
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

        appendEffect(item, 5600);
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

        appendEffect(item, 5600);
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

        appendEffect(item, 3400);
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

        appendEffect(item, 2300);
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
        var colors = ["confetti-blue", "confetti-matcha", "confetti-pink", "confetti-yellow"];

        item.className = "fx fx-down confetti-piece " + randomItem(colors);

        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2.3 + Math.random() * 2.2 + "s";
        item.style.transform = "rotate(" + Math.floor(Math.random() * 180) + "deg)";

        appendEffect(item, 5600);
      }, index * 18);
    }

    function spawnSparkles(amount) {
      var total = amount || 12;

      for (var i = 0; i < total; i++) {
        setTimeout(function () {
          var item = document.createElement("div");

          item.className = "fx fx-sparkle";
          item.textContent = randomItem(["✨", "💙", "🩵", "☁️"]);

          item.style.left = 15 + Math.random() * 70 + "vw";
          item.style.top = 20 + Math.random() * 55 + "vh";
          item.style.fontSize = 18 + Math.random() * 18 + "px";

          appendEffect(item, 1400);
        }, i * 45);
      }
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

        appendEffect(item, 1100);
      }
    }

    function createRipple(x, y) {
      var ring = document.createElement("div");

      ring.className = "fx-ring";
      ring.style.left = x + "px";
      ring.style.top = y + "px";

      appendEffect(ring, 800);
    }

    document.addEventListener("click", function (event) {
      if (!siteOpened) return;

      createRipple(event.clientX, event.clientY);

      var interactive = event.target.closest(
        "button, .gallery-card, .toy-card, .lightbox, .final-modal, a"
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
    }, 1600);

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
