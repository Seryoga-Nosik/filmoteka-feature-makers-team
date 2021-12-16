import getRefs from '../refs';
import modalTpl from '../../template/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieInfo, getTrailerMovie } from '../apiService';
import { addToWatched, addToQueue } from './firebase/writeToFirebase';
import { comparisonWithFirebase } from './firebase/comparisonWithFirebase';
import { runSpinner, stopSpinner } from './spinner';

const refs = getRefs();

refs.gallery.addEventListener('click', onClickHandler);
function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  runSpinner();

  document.body.classList.add('body-overflow--hidden');
  const movieId = e.target.id;
  getMovieInfo(movieId)
    .then(movie => {
      const markup = modalTpl(movie);
      const lightbox = basicLightbox.create(markup);

      lightbox.show();

      getRefs().lightbox.setAttribute(
        'style',
        `background-image: 
        linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)),
        url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}");
        background-position: center;
        background-size: cover;`,
      );

      stopSpinner();

      //Comparison with firebase
      comparisonWithFirebase();
      //Add to watched or remove from watched
      getRefs().addToWatchedBtn.addEventListener('click', addToWatched);
      //Add to queue or remove from queue
      getRefs().addToQueueBtn.addEventListener('click', addToQueue);

      async function getTrailer(e) {
        runSpinner();

        const key = await getTrailerMovie(movieId);
        const trailer = basicLightbox.create(`
           <iframe width="70%" height="70%" src='https://www.youtube.com/embed/${key}?autoplay=1'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>
          `);
        trailer.show();
        stopSpinner();

        window.addEventListener('keydown', closeTrailerByEsc);
        function closeTrailerByEsc(e) {
          if (e.code === 'Escape') {
            trailer.close();
            window.removeEventListener('keydown', closeTrailerByEsc);
            document.body.classList.remove('body-overflow--hidden');
          }
        }
      }

      getRefs().trailerBtn.addEventListener('click', getTrailer);

      window.addEventListener('keydown', onEscClick);

      function onEscClick(e) {
        if (e.code === 'Escape') {
          lightbox.close();
          window.removeEventListener('keydown', onEscClick);
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
