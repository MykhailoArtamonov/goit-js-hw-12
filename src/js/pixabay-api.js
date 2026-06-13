import axios from 'axios';

const API_KEY = '55633359-e6facadba1b7542d91fe672ce';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15, // Pixabay API по умолчанию дает 20, но 15 удобнее для сеток
    },
  };

  const response = await axios.get(BASE_URL, options);
  return response.data;
}
