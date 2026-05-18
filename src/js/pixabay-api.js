import axios from 'axios';

const key = '55633359-e6facadba1b7542d91fe672ce';
export function getImagesByQuery(query) {
  return axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => response.data.hits)
    .catch(error => {
      console.log('Помилка запиту:', error);
      throw error;
    });
}
