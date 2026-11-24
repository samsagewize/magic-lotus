(function () {
  const KEY = "magic-lotus-opened";
  const root = document.documentElement;
  const cover = document.getElementById("cover");
  const site = document.getElementById("site");

  function revealPage() {
    const reveal = document.querySelectorAll(".reveal");
    const showAll = function () {
      reveal.forEach(function (el) {
        el.classList.add("is-in");
      });
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );
      reveal.forEach(function (el) {
        io.observe(el);
      });
      setTimeout(showAll, 1600);
    } else {
      showAll();
    }
    return showAll;
  }

  const showAll = revealPage();

  if (!cover) return;

  const openBtn = document.getElementById("cover-open");
  const skipBtn = document.getElementById("cover-skip");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function remember() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}
  }

  function setSiteHidden(hidden) {
    if (!site) return;
    if (hidden) {
      site.setAttribute("aria-hidden", "true");
      site.inert = true;
    } else {
      site.removeAttribute("aria-hidden");
      site.inert = false;
    }
  }

  function finish() {
    remember();
    root.classList.remove("show-cover", "is-opening", "is-skip");
    cover.setAttribute("aria-hidden", "true");
    setSiteHidden(false);
    showAll();
    const home = document.getElementById("contents-title");
    if (home && typeof home.focus === "function") {
      home.focus({ preventScroll: true });
    }
  }

  function openBook(skip) {
    if (!root.classList.contains("show-cover") || root.classList.contains("is-opening")) {
      return;
    }
    remember();
    if (skip) root.classList.add("is-skip");
    root.classList.add("is-opening");
    const ms = skip ? (reduced ? 700 : 320) : reduced ? 1800 : 1000;
    setTimeout(finish, ms);
  }

  if (root.classList.contains("show-cover")) {
    cover.setAttribute("aria-hidden", "false");
    setSiteHidden(true);
    if (openBtn) openBtn.focus();
  } else {
    showAll();
  }

  if (openBtn) openBtn.addEventListener("click", function () { openBook(false); });
  if (skipBtn) skipBtn.addEventListener("click", function () { openBook(true); });

  document.addEventListener("keydown", function (event) {
    if (!root.classList.contains("show-cover")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      openBook(true);
    }
  });

  let x0 = null;
  let y0 = null;
  cover.addEventListener(
    "touchstart",
    function (event) {
      const touch = event.changedTouches[0];
      x0 = touch.clientX;
      y0 = touch.clientY;
    },
    { passive: true }
  );
  cover.addEventListener(
    "touchend",
    function (event) {
      if (x0 == null) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - x0;
      const dy = touch.clientY - y0;
      x0 = null;
      y0 = null;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.1) {
        openBook(false);
      }
    },
    { passive: true }
  );
})();
