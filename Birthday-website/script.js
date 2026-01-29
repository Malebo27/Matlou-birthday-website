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

const images = document.querySelectorAll(".photo img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
lightboxImg.src = img.src;

// heart burst 💕
for (let i = 0; i < 8; i++) {
  setTimeout(createHeart, i * 120);
}
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = (window.innerHeight / 2) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

const giftBtn = document.getElementById("gift-btn");
const giftModal = document.getElementById("gift-modal");
const giftClose = document.getElementById("gift-close");
const giftAudio = document.getElementById("gift-audio");

let fadeInterval;

/* FADE IN */
function fadeInAudio(audio) {
  clearInterval(fadeInterval);
  audio.volume = 0;
  audio.currentTime = 0;
  audio.play();

  fadeInterval = setInterval(() => {
    if (audio.volume < 0.4) {
      audio.volume = Math.min(audio.volume + 0.02, 0.4);
    } else {
      clearInterval(fadeInterval);
    }
  }, 100);
}

/* FADE OUT */
function fadeOutAudio(audio) {
  clearInterval(fadeInterval);

  fadeInterval = setInterval(() => {
    if (audio.volume > 0.02) {
      audio.volume -= 0.02;
    } else {
      audio.pause();
      audio.volume = 0;
      clearInterval(fadeInterval);
    }
  }, 100);
}

/* OPEN GIFT */
giftBtn.addEventListener("click", () => {
  giftModal.style.display = "block";

  fadeInAudio(giftAudio);

  // hearts 💕
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 120);
  }
});

/* CLOSE GIFT */
giftClose.addEventListener("click", closeGift);

giftModal.addEventListener("click", (e) => {
  if (e.target === giftModal) {
    closeGift();
  }
});

function closeGift() {
  giftModal.style.display = "none";
  fadeOutAudio(giftAudio);
}
