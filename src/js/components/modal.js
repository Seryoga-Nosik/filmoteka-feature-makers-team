import getRefs from '../refs';

const refs = getRefs();

refs.gallery.addEventListener('click', onClickHandler);
refs.clsBtn.addEventListener('click', onCloseModal);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  refs.overlay.classList.add('is-open');
}

function onCloseModal() {
  refs.overlay.classList.remove('is-open');
}
