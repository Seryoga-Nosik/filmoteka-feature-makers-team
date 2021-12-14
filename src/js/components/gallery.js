import cardTemplate from '../../template/film-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getTrendingMovies } from '../apiService';
import { runSpinner, stopSpinner } from './spinner';
import getRefs from '../refs';
import { pagination } from './pagination.js';
const refs = getRefs();

// runSpinner();
// stopSpinner();
const page = pagination.getCurrentPage();

function resetMarkup() {
  refs.gallery.innerHTML = '';
}

export function renderTrandingFilms(page) {
  resetMarkup();
  getTrendingMovies(page).then(data => {
    console.log(refs.pagination);
    if (data.normalizedMovies.length === 0) {
      Notify.failure('Sorry, no movies found. Please reload page.');
      refs.pagination.classList.add('is-hidden');
      resetMarkup();
      return;
    }

    const markup = cardTemplate(data.normalizedMovies);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}

renderTrandingFilms(page);

pagination.on('afterMove', event => {
  const page = event.page;
  renderTrandingFilms(page);
});
