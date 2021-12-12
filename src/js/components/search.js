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

async function onSearch(event) { 
    const inputData = refs.searchBox.value.trim();

    if (!inputData) {
        runSpinner();
        stopSpinner();
        refs.gallery.innerHTML = '';
        renderTrandingFilms();
        return;
    } 

    try {
        const movies = await getMoviesSearchQuery(inputData, 1);
        // console.log(movies);

        if (movies.totalResults === 0) {
            stopSpinner();
            onFetchError();
            refs.gallery.innerHTML = '';
            refs.pagination.classList.add('is-hidden');
            return;
        }

        onFetchSuccess(movies.totalResults);
        runSpinner(); 
        renderMovies(movies.normalizedMovies);
        stopSpinner();
        
        if (movies.normalizedMovies.length <= 20) {
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
    Notify.failure("Oops, there is no movie with that name");
}