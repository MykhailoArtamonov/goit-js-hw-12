import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

// Инициализируем один раз вне функции
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery__item">
          <a href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}">
          </a>
          <div class="gallery__info">
            <div class="gallery__info-item">
              <span class="gallery__info-title">Likes</span>
              <span class="gallery__info-value">${likes}</span>
            </div>
            <div class="gallery__info-item">
              <span class="gallery__info-title">Views</span>
              <span class="gallery__info-value">${views}</span>
            </div>
            <div class="gallery__info-item">
              <span class="gallery__info-title">Comments</span>
              <span class="gallery__info-value">${comments}</span>
            </div>
            <div class="gallery__info-item">
              <span class="gallery__info-title">Downloads</span>
              <span class="gallery__info-value">${downloads}</span>
            </div>
          </div>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.removeAttribute('hidden');
}

export function hideLoader() {
  loader.setAttribute('hidden', '');
}

export function showLoadMoreBtn() {
  if (loadMoreBtn) loadMoreBtn.removeAttribute('hidden');
}

export function hideLoadMoreBtn() {
  if (loadMoreBtn) loadMoreBtn.setAttribute('hidden', '');
}
