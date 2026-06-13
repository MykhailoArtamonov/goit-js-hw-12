import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;
let currentQuery = '';
const perPage = 15; // Должно совпадать со значением в pixabay-api.js

async function fetchImages() {
  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    // Вычисляем, остались ли еще картинки на бэкенде
    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreBtn();
    }

    // Плавный скролл (работает начиная со 2-й страницы)
    if (page > 1) {
      smoothScroll();
    }
  } catch (error) {
    console.error('Ошибка выполнения:', error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery__item');

  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

// Событие отправки формы
form.addEventListener('submit', event => {
  event.preventDefault();

  const text = form.elements['search-text'].value.trim();

  if (!text) {
    iziToast.error({ message: 'The search query must be filled in!' });
    return;
  }

  currentQuery = text;
  page = 1;

  clearGallery();
  fetchImages();
});

// Событие клика на "Load More"
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    page += 1;
    fetchImages();
  });
}
