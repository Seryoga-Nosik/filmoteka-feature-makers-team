import cardTemplate from '../../template/film-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getTrendingMovies, MAX_GENRE_LENGTH } from '../apiService';
import { runSpinner, stopSpinner } from './spinner';
import getRefs from '../refs';
import { pagination } from './pagination.js';
const refs = getRefs();

// runSpinner();
// stopSpinner();
const page = pagination.getCurrentPage();

function resetMarkup() {
  refs.gallery.innerHTML = '';
  refs.pagination.classList.remove('is-hidden');
}

export function renderTrandingFilms(page) {
  resetMarkup();
  getTrendingMovies(page).then(data => {
    if (data.normalizedMovies.length === 0) {
      Notify.failure('Sorry, no movies found. Please reload page.');
      refs.pagination.classList.add('is-hidden');
      resetMarkup();
      return;
    }

    const { normalizedMovies = [] } = data;
    const markup = cardTemplate(normalizedMovies);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    // якщо перша сторінка і фільмів < 20
    if(page === 1 && normalizedMovies.length < MAX_GENRE_LENGTH){
      refs.pagination.classList.add('is-hidden');
    }
  });
}

renderTrandingFilms(page);

pagination.on('afterMove', (event) => {
  const page = event.page;
  renderTrandingFilms(page); 
});
