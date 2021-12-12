import axios from 'axios';
import cardTemplate from '../../template/film-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getTrendingMovies } from '../apiService';
import { runSpinner, stopSpinner } from './spinner';
import getRefs from '../refs';
const refs = getRefs();


// runSpinner();
// stopSpinner();

renderTrandingFilms();
// resetMarkup();

function resetMarkup() {
  refs.gallery.innerHTML = '';
}

function renderTrandingFilms() {
  resetMarkup();
  getTrendingMovies().then(data => {
    if (data.length === 0) {
      Notify.failure('Sorry, no movies found. Please reload page.');
      refs.pagination.classList.add('is-hidden');
      //     resetMarkup();
      return;
    }
    console.log(data);
    // console.log(cardTemplate(data));

    const markup = cardTemplate(data);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  });
}

// =====================================================
// const gallery = document.querySelector('.gallery');

// // const markup = cardTemplate(cards);
// // console.log(cardTemplate(cards))
// // gallery.insertAdjacentHTML('beforeend', markup);
// const BASE_URL = 'https://pixabay.com/api/';
// const pixabayKey = '24437827-e20f686b1c65a4a2859f17630';

// const api = () => {
//   return axios.get(` ${BASE_URL}?key=${pixabayKey}&q=all`).then(response => response.data);
// };
// // console.log(api());

// function fetchNew(data) {
//   api().then(data => console.log(data.hits));
//   const markup = cardTemplate(data);
//   //   console.log('markup', markup);
//   //   console.log(cardTemplate(data));
//   gallery.insertAdjacentHTML('beforeend', markup);
// }
// fetchNew();
