import getRefs from '../refs';
const refs = getRefs();
import { renderTrandingFilms } from './gallery';
import { runSpinner, stopSpinner } from './spinner';

refs.homeLink.addEventListener('click', onHomeClick);

function onHomeClick(e) {
  runSpinner();
  renderTrandingFilms(1);
  stopSpinner();
}
