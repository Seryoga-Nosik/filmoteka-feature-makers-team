import getRefs from '../refs';
const refs = getRefs();
import { renderTrandingFilms } from './gallery';

refs.homeLink.addEventListener('click', onHomeClick)

function onHomeClick(e) {
    renderTrandingFilms(1);
}
