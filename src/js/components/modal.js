import getRefs from '../refs';
import modalTpl from '../../template/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getMovieInfo, getTraillerMovie } from '../apiService';

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

      getRefs().trailerBtn.addEventListener('click', getTrailer);

      function getTrailer(e) {
        e.preventDefault();
        if (e.target.nodeName !== 'IMG') {
          return;
        }

        getTraillerMovie(movieId)
          .then(renderTrailer)
          .catch(error => {
            console.log(error);
          });

        function renderTrailer(data) {
          let key = '';
          data.forEach(obj => {
            if (obj.name.includes('Official')) {
              key = obj.key;
            }
          });

          const trailer = basicLightbox.create(`
    <iframe width="320" height="240" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>
  `);

          trailer.show();

          window.addEventListener('keydown', closeTrailerByEsc);
          function closeTrailerByEsc(e) {
            if (e.code === 'Escape') {
              trailer.close();
              window.removeEventListener('keydown', closeTrailerByEsc);
              document.body.classList.remove('body-overflow--hidden');
            }
          }
        }
      }

      //   document
      //     .querySelector('.basicLightbox--iframe')
      //     .addEventListener('click', () => document.body.classList.remove('body-overflow--hidden'));
      // }

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
