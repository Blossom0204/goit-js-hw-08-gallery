import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalBtn = document.querySelector(".lightbox__button");
const modalRef = document.querySelector(".js-lightbox");
const lightboxImg = document.querySelector(".lightbox__image");

galleryRef.addEventListener("click", onClick);

galleryRef.insertAdjacentHTML("beforeend", createGalleryItems(galleryItems));

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
        `;
    })
    .join('');
}
modalBtn.addEventListener("click", closeModal);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  document.addEventListener("keydown", closeModal);

  modalRef.classList.add("is-open");
  lightboxImg.src = evt.target.dataset.source;
  lightboxImg.alt = evt.target.alt;
}

function closeModal(evt) {
  evt.preventDefault();
  document.removeEventListener("keydown", closeModal);
  modalRef.classList.remove("is-open");
  lightboxImg.src = "";
}