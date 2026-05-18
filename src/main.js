import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = form.elements['search-text'].value.trim();
  if (text.length === 0) {
    iziToast.error({
      message: 'The search query must be filled in!',
    });
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(text)
    .then(value => {
      if (value.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(value);
    })
    .catch(error => console.log(error))
    .finally(() => hideLoader());
});
