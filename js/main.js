// Redemption Frequency — small touches.
// Scroll-reveal via IntersectionObserver, footer year stamp,
// hero-video sound toggle.

(() => {
  // Footer year
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Hero video sound toggle. Browsers gate autoplay-with-sound behind a
  // user gesture, so the video starts muted+looping (the cinematic
  // moving-image effect) and the user opts in to audio with this
  // button. Clicking unmute also restarts the clip from frame zero so
  // the soundtrack plays from the top, not from a random loop position.
  const soundBtn = document.querySelector(".hero-video__sound");
  const heroVideo = document.querySelector(".hero-video__media");
  // Music-preview pill on the typography hero — 19s loop. Coordinated
  // with the hero video below: starting one stops the other so the
  // two soundtracks don't fight if the user scrolls between them.
  const previewBtn = document.querySelector(".preview-pill");
  const previewAudio = document.getElementById("hero-preview-audio");

  function muteHeroVideo() {
    if (!soundBtn || !heroVideo) return;
    if (!heroVideo.muted) {
      heroVideo.muted = true;
      soundBtn.dataset.sound = "off";
      soundBtn.setAttribute("aria-label", "Turn sound on");
    }
  }
  function pausePreview() {
    if (!previewBtn || !previewAudio) return;
    if (!previewAudio.paused) {
      previewAudio.pause();
      previewBtn.dataset.state = "idle";
      previewBtn.setAttribute("aria-label", "Play music preview");
    }
  }

  if (soundBtn && heroVideo) {
    soundBtn.addEventListener("click", () => {
      if (heroVideo.muted) {
        // Turning the video sound on — stop the music-preview so the
        // user only hears one thing at a time.
        pausePreview();
        heroVideo.muted = false;
        heroVideo.currentTime = 0;
        heroVideo.play().catch(() => { /* autoplay policy fallback */ });
        soundBtn.dataset.sound = "on";
        soundBtn.setAttribute("aria-label", "Turn sound off");
      } else {
        heroVideo.muted = true;
        soundBtn.dataset.sound = "off";
        soundBtn.setAttribute("aria-label", "Turn sound on");
      }
    });
  }

  if (previewBtn && previewAudio) {
    previewBtn.addEventListener("click", () => {
      if (previewAudio.paused) {
        // Starting the preview — mute the hero video above so its
        // soundtrack doesn't bleed in.
        muteHeroVideo();
        previewAudio.play().then(() => {
          previewBtn.dataset.state = "playing";
          previewBtn.setAttribute("aria-label", "Pause music preview");
        }).catch((err) => {
          // Most likely an autoplay-policy edge case — surface in console.
          console.warn("Preview play() rejected:", err);
        });
      } else {
        previewAudio.pause();
        previewBtn.dataset.state = "idle";
        previewBtn.setAttribute("aria-label", "Play music preview");
      }
    });
    // If the audio ends despite the loop attribute (some browsers
    // honour `ended` on each loop tick), keep the button label honest.
    previewAudio.addEventListener("pause", () => {
      previewBtn.dataset.state = "idle";
      previewBtn.setAttribute("aria-label", "Play music preview");
    });
  }

  // Reveal sections as they enter the viewport.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
})();
