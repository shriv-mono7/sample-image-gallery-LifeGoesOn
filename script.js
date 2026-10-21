const filterButtons = [...document.querySelectorAll(".filter")];
const photoCards = [...document.querySelectorAll(".photo-card")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxNote = document.querySelector("#lightbox-note");
const lightboxCounter = document.querySelector("#lightbox-counter");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let visiblePhotos = [...photoCards];
let activeIndex = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    photoCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.hidden = !shouldShow;
    });

    visiblePhotos = photoCards.filter((card) => !card.hidden);
  });
});

function showPhoto(index) {
  if (!visiblePhotos.length) return;
  activeIndex = (index + visiblePhotos.length) % visiblePhotos.length;
  const card = visiblePhotos[activeIndex];
  lightboxImage.src = card.dataset.src;
  lightboxImage.alt = card.querySelector("img").alt;
  lightboxTitle.textContent = card.dataset.title;
  lightboxNote.textContent = card.dataset.note;
  lightboxCounter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(visiblePhotos.length).padStart(2, "0")}`;
}

photoCards.forEach((card) => {
  card.addEventListener("click", () => {
    visiblePhotos = photoCards.filter((item) => !item.hidden);
    showPhoto(visiblePhotos.indexOf(card));
    lightbox.showModal();
  });
});

previousButton.addEventListener("click", () => showPhoto(activeIndex - 1));
nextButton.addEventListener("click", () => showPhoto(activeIndex + 1));
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
});
