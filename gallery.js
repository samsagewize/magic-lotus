(function () {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const closeBtn = document.getElementById("lightbox-close");
  const works = document.querySelectorAll(".work");

  function openWork(button) {
    const src = button.getAttribute("data-full");
    const name =
      button.getAttribute("aria-label") ||
      (button.querySelector(".title") || {}).textContent ||
      "Untitled";
    image.src = src;
    image.alt = name;
    title.textContent = name;
    dialog.classList.remove("is-out");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    requestAnimationFrame(() => dialog.classList.add("is-open"));
  }

  function closeLightbox() {
    dialog.classList.remove("is-open");
    dialog.classList.add("is-out");
    const finish = () => {
      if (dialog.open) dialog.close();
      dialog.classList.remove("is-out");
      image.removeAttribute("src");
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(finish, reduced ? 500 : 280);
  }

  works.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.remove("wobble");
      void button.offsetWidth;
      button.classList.add("wobble");
      openWork(button);
    });
    button.addEventListener("animationend", (event) => {
      if (event.animationName === "wobble") button.classList.remove("wobble");
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  const reveal = document.querySelectorAll(".reveal");
  const showAll = () => reveal.forEach((el) => el.classList.add("is-in"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveal.forEach((el) => io.observe(el));
    setTimeout(showAll, 1600);
  } else {
    showAll();
  }
})();
