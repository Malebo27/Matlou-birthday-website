const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

let isPlaying = false;

btn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    btn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    btn.textContent = "▶ Play Music";
  }
  isPlaying = !isPlaying;
});

const giftBtn = document.getElementById("gift-btn");
const giftModal = document.getElementById("gift-modal");
const giftClose = document.getElementById("gift-close");

const bgMusic = document.getElementById("bg-music");
const giftAudio = document.getElementById("gift-audio");

let fadeTimer;

/* ---------- CROSSFADE FUNCTIONS ---------- */
function crossfadeToGift() {
  clearInterval(fadeTimer);

  giftAudio.volume = 0;
  giftAudio.currentTime = 0;
  giftAudio.play();

  fadeTimer = setInterval(() => {
    // fade OUT background
    if (bgMusic.volume > 0.02) {
      bgMusic.volume -= 0.02;
    } else {
      bgMusic.pause();
      bgMusic.volume = 0.5; // reset for later
    }

    // fade IN gift music
    if (giftAudio.volume < 0.4) {
      giftAudio.volume += 0.02;
    }

    if (giftAudio.volume >= 0.4 && bgMusic.paused) {
      clearInterval(fadeTimer);
    }
  }, 100);
}

function crossfadeBackToMain() {
  clearInterval(fadeTimer);

  bgMusic.volume = 0;
  bgMusic.play();

  fadeTimer = setInterval(() => {
    // fade OUT gift
    if (giftAudio.volume > 0.02) {
      giftAudio.volume -= 0.02;
    } else {
      giftAudio.pause();
      giftAudio.volume = 0;
    }

    // fade IN background
    if (bgMusic.volume < 0.5) {
      bgMusic.volume += 0.02;
    }

    if (bgMusic.volume >= 0.5 && giftAudio.paused) {
      clearInterval(fadeTimer);
    }
  }, 100);
}

/* ---------- OPEN GIFT ---------- */
giftBtn.addEventListener("click", () => {
  giftModal.style.display = "block";

  crossfadeToGift();

  // hearts 💕
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 120);
  }
});

/* ---------- CLOSE GIFT ---------- */
giftClose.addEventListener("click", closeGift);

giftModal.addEventListener("click", (e) => {
  if (e.target === giftModal) {
    closeGift();
  }
});

function closeGift() {
  giftModal.style.display = "none";
  crossfadeBackToMain();
}

const floatingItems = ["🎈", "🥳", "💖", "🎉"];

function createFloatingItem() {
  const item = document.createElement("div");
  item.classList.add("floating");

  item.innerHTML = floatingItems[Math.floor(Math.random() * floatingItems.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = Math.random() * 20 + 20 + "px";
  item.style.animationDuration = Math.random() * 4 + 6 + "s";

  document.body.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 9000);
}

/* create items every few seconds */
setInterval(createFloatingItem, 800);
