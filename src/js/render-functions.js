import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export function createGallery(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class="gallery__item"><a href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}"></a><div class="gallery__info">
    <div class="gallery__info-item"><span class="gallery__info-title">Likes</span><span class="gallery__info-value">${likes}</span></div>
    <div class="gallery__info-item"><span class="gallery__info-title">Views</span><span class="gallery__info-value">${views}</span></div>
    <div class="gallery__info-item"><span class="gallery__info-title">Comments</span><span class="gallery__info-value"><span>${comments}</span></div>
    <div class="gallery__info-item"><span class="gallery__info-title">Downloads</span><span class="gallery__info-value"><span>${downloads}</span></div>
    </div></li>`
      )
      .join('')
  );
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
