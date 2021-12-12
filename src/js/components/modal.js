import getRefs from '../refs';
import modalTpl from '../../template/modal.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = getRefs();

refs.gallery.addEventListener('click', onClickHandler);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const markup = modalTpl();
  const openModal = basicLightbox.create(markup);
  openModal.show();

  refs.clsBtn.addEventListener('click', closeModalBtn);
  function closeModalBtn() {
    openModal.close();
    window.removeEventListener('keydown', closeModalBtn);
  }

  window.addEventListener('keydown', closeModal);
  function closeModal(e) {
    if (e.code === 'Escape') {
      openModal.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}
