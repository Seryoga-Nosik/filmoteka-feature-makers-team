import getRefs from '../refs';
import modalTpl from '../../template/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieInfo } from '../apiService';
import {addToWatched, addToQueue} from './firebase/writeToFirebase';

const refs = getRefs();

refs.gallery.addEventListener('click', onClickHandler);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  document.body.classList.add('body-overflow--hidden');

  const movieId = e.target.id;
  getMovieInfo(movieId)
    .then(movie => {
      const markup = modalTpl(movie);
      const lightbox = basicLightbox.create(markup);
      lightbox.show();

      //Add to watched
      getRefs().addToWatchedBtn.addEventListener('click', addToWatched);
      //Add to queue
      getRefs().addToQueueBtn.addEventListener('click', addToQueue);


      window.addEventListener('keydown', onEscClick);

      function onEscClick(e) {
        if (e.code === 'Escape') {
          lightbox.close();
          window.removeEventListener('keydown', closeModal);
          document.body.classList.remove('body-overflow--hidden');
        }
      }

      getRefs().clsBtn.addEventListener('click', closeModalByBtn);
      function closeModalByBtn() {
        lightbox.close();
        window.removeEventListener('keydown', closeModalByBtn);
        document.body.classList.remove('body-overflow--hidden');
      }

      document
        .querySelector('.basicLightbox')
        .addEventListener('click', () => document.body.classList.remove('body-overflow--hidden'));
    })

    .catch(error => {
      console.log(error);
    });
}
