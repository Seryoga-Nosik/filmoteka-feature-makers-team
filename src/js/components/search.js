import cardTemplate from '../../template/film-card.hbs';
import { getMoviesSearchQuery } from '../apiService';
import { runSpinner, stopSpinner } from './spinner';
import { renderTrandingFilms } from './gallery';
import getRefs from '../refs';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min';

const refs = getRefs();
const DEBOUNCE_DELAY = 500;

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
refs.formSearch.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  window.addEventListener('keydown', (e) => {
    if(e.code === 'Enter') {
        e.preventDefault();
    }
  });
 
  const inputData = refs.searchBox.value.trim();

  if (!inputData) {
    onEmptyInput();
    refs.gallery.innerHTML = '';
    renderTrandingFilms(1);
    refs.noResultsBlock.classList.add('is-hidden');
    return;
  }

  try {
    const movies = await getMoviesSearchQuery(inputData, 1);
    refs.noResultsBlock.classList.add('is-hidden');

    if (movies.totalResults === 0) {
      stopSpinner();
      onFetchError();
      refs.gallery.innerHTML = '';
      refs.noResultsBlock.classList.remove('is-hidden');
      refs.pagination.classList.add('is-hidden');
      return;
    }

    onFetchSuccess(movies.totalResults);
    runSpinner();
    renderMovies(movies.normalizedMovies);
    stopSpinner();

    if (movies.totalResults <= 20) {
      refs.pagination.classList.add('is-hidden');
    }
  } catch (error) {
    stopSpinner();
    onFetchError();
  }
}

function renderMovies(data) {
  refs.gallery.innerHTML = '';
  const markup = cardTemplate(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onFetchSuccess(total) {
  Notify.success(`Hooray! We found ${total} movies.`);
}

function onFetchError(error) {
  Notify.failure('Oops, there is no movie with that name.');
}

function onEmptyInput(error) {
  Notify.warning('Change your search query and try again.');
}