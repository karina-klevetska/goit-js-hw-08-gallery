import galleryItems from './app.js'

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightboxImage: document.querySelector('.lightbox__image'),
    buttonClose: document.querySelector('[data-action="close-lightbox"]')
}

refs.galleryList.addEventListener('click', onOpenModal);
refs.buttonClose.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onCloseModal);

function makeGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }, index) => {
    const galleryItem = document.createElement('li');
    const galleryLink = document.createElement('a');
    const galleryImage = document.createElement('img');

    galleryItem.classList.add('gallery__item');

    galleryLink.classList.add('gallery__link');
    galleryLink.href = original;

    galleryImage.classList.add('gallery__image');
    galleryImage.src = preview;
    galleryImage.dataset.source = original;
    galleryImage.alt = description;
    galleryImage.dataset.index = index;

    galleryLink.append(galleryImage);
    galleryItem.append(galleryLink);
    refs.galleryList.append(galleryItem);
  });
};

makeGallery(galleryItems);


function onOpenModal(event) {
    window.addEventListener('keydown', onKeyPressEscCloseModal);
    window.addEventListener('keydown', onKeyPressLeafThroughImages);
    
    event.preventDefault();
    
    if (event.target.nodeName !== 'IMG') {
    return
    }
    refs.lightbox.classList.add('is-open');
    addLightboxImage(event);
};

function addLightboxImage(event) {
    refs.lightboxImage.src = event.target.dataset.source;
    refs.lightboxImage.alt = event.target.alt;
    refs.lightboxImage.dataset.index = event.target.dataset.index;
};

function onCloseModal() {
    window.removeEventListener('keydown', onKeyPressEscCloseModal);
    window.removeEventListener('keydown', onKeyPressLeafThroughImages);

    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.removeAttribute('src');
};

function onKeyPressEscCloseModal(event) {
  if (event.key !== 'Escape') {
    return;
  };

  onCloseModal();
};

function getIndex(index, i = 0) {
    refs.lightboxImage.dataset.index = `${index + i}`;
    refs.lightboxImage.src = galleryItems[index + i].original;
};
  
function onKeyPressLeafThroughImages(event) {
  if (event.code === 'ArrowLeft') {
    onArrowLeft();
  };

  if (event.code === 'ArrowRight') {
    onArrowRight();
    };
};

function onArrowLeft() {
  let index = Number(refs.lightboxImage.dataset.index);
  if (index === 0) {
    getIndex(galleryItems.length - 1);
    return;
  }
  getIndex(index, -1);
};

function onArrowRight() {
  let index = Number(refs.lightboxImage.dataset.index);
  if (index === galleryItems.length - 1) {
    getIndex(0);
    return;
  }
  getIndex(index, 1);
};