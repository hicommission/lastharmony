// Redemption Frequency — small touches.
// Scroll-reveal via IntersectionObserver, footer year stamp.

(() => {
  // Footer year
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

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
