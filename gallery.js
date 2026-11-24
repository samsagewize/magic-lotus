(function () {
  const gallery = document.getElementById("gallery");
  const empty = document.getElementById("empty");
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const meta = document.getElementById("lightbox-meta");
  const kicker = document.getElementById("lightbox-kicker");
  const closeBtn = document.getElementById("lightbox-close");

  function metaLine(work) {
    return [work.year, work.medium].filter(Boolean).join("  ·  ");
  }

  function openWork(work) {
    const src = "/images/" + encodeURIComponent(work.file);
    image.src = src;
    image.alt = work.placeholder
      ? "Placeholder: " + (work.title || "Untitled")
      : work.title || "Untitled";
    title.textContent = work.title || "Untitled";
    const line = metaLine(work);
    meta.textContent = line;
    meta.hidden = !line;
    kicker.hidden = !work.placeholder;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeLightbox() {
    if (dialog.open) dialog.close();
    image.removeAttribute("src");
  }

  function render(data) {
    const works = Array.isArray(data.works) ? data.works : [];
    gallery.replaceChildren();

    if (!works.length) {
      empty.hidden = false;
      return;
    }

    empty.hidden = true;

    works.forEach((work) => {
      if (!work || !work.file) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "work";
      button.setAttribute(
        "aria-label",
        (work.placeholder ? "Placeholder, " : "") +
          (work.title || "Untitled") +
          (work.year ? ", " + work.year : "")
      );

      const frame = document.createElement("div");
      frame.className = "frame";

      const img = document.createElement("img");
      img.src = "/images/" + encodeURIComponent(work.file);
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      frame.appendChild(img);

      const caption = document.createElement("div");
      caption.className = "caption";

      if (work.placeholder) {
        const badge = document.createElement("p");
        badge.className = "kicker";
        badge.textContent = "Placeholder";
        caption.appendChild(badge);
      }

      const heading = document.createElement("h2");
      heading.textContent = work.title || "Untitled";
      caption.appendChild(heading);

      const line = metaLine(work);
      if (line) {
        const details = document.createElement("p");
        details.className = "meta";
        details.textContent = line;
        caption.appendChild(details);
      }

      button.append(frame, caption);
      button.addEventListener("click", () => openWork(work));
      gallery.appendChild(button);
    });
  }

  closeBtn.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) closeLightbox();
  });

  fetch("/gallery.json")
    .then((response) => {
      if (!response.ok) throw new Error("Could not load gallery.json");
      return response.json();
    })
    .then(render)
    .catch((error) => {
      console.error(error);
      empty.textContent = "The gallery could not be loaded.";
      empty.hidden = false;
    });
})();
