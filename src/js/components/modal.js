import getRefs from '../refs';
import modalTpl from '../../template/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieInfo } from '../apiService';

const refs = getRefs();

refs.gallery.addEventListener('click', onClickHandler);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const movieId = e.target.id;
  getMovieInfo(movieId)
    .then(movie => {
      const markup = modalTpl(movie);
      const lightbox = basicLightbox.create(markup);
      lightbox.show();

      window.addEventListener('keydown', closeModal);

      function closeModal(e) {
        if (e.code === 'Escape') {
          lightbox.close();
          window.removeEventListener('keydown', closeModal);
        }
      }

      getRefs().clsBtn.addEventListener('click', closeModalByBtn);
      function closeModalByBtn() {
        lightbox.close();
        window.removeEventListener('keydown', closeModalByBtn);
      }
    })

    .catch(error => {
      console.log(error);
    });
}
