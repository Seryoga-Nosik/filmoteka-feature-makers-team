import cardTemplate from '../../template/film-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getTrendingMovies } from '../apiService';
import { runSpinner, stopSpinner } from './spinner';
import getRefs from '../refs';
const refs = getRefs();

runSpinner();
stopSpinner();

renderTrandingFilms();

function resetMarkup() {
  refs.gallery.innerHTML = '';
}

export function renderTrandingFilms() {
  resetMarkup();
  getTrendingMovies().then(data => {
    if (data.length === 0) {
      Notify.failure('Sorry, no movies found. Please reload page.');
      refs.pagination.classList.add('is-hidden');
      resetMarkup();
      return;
    }

    const markup = cardTemplate(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}
