(function () {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const edition = document.getElementById("lightbox-edition");
  const medium = document.getElementById("lightbox-medium");
  const closeBtn = document.getElementById("lightbox-close");
  const works = document.querySelectorAll(".work");

  function openWork(button) {
    const src = button.getAttribute("data-full");
    const name =
      ((button.querySelector(".title") || {}).textContent || "").trim() ||
      button.getAttribute("aria-label") ||
      "Untitled";
    image.src = src;
    image.alt = name;
    title.textContent = name;
    if (edition) edition.textContent = "1/1 Original";
    if (medium) medium.textContent = "Hand-drawn color pencil on paper";
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
})();
