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
  if (soundBtn && heroVideo) {
    soundBtn.addEventListener("click", () => {
      if (heroVideo.muted) {
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
