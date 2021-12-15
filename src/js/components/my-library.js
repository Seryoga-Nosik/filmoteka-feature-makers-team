import getRefs from '../refs';

const refs = getRefs();
//import frow watched and queue
import { fetchQueueFilms } from '../components/firebase/fetchFromFirebase';
import { fetchWatchedFilms } from '../components/firebase/fetchFromFirebase';
import { getMovieId } from '../apiService';
import watched from '../../template/listFilms.hbs';
import { renderTrandingFilms } from './gallery';

refs.navList.addEventListener('click', onNavItemClick);
refs.myLibraryLink.addEventListener('click', onMyLibLinkClick);
refs.homeLink.addEventListener('click', onHomeLinkClick);
refs.logo.addEventListener('click', onLogoClick);

checkCurrentPage();

function onNavItemClick(event) {

    if(event.target.nodeName !== 'A') {
        return;
    }

        let navLinks = document.querySelectorAll('.site-nav-list__link');
        for (let i = 0; i < navLinks.length; i += 1) {
            if (navLinks[i] !== event.target) {
                navLinks[i].classList.remove('is-current');
            }
        }
        event.target.classList.add('is-current');

        checkCurrentPage();

}

function onMyLibLinkClick(event) {
    event.preventDefault();
    refs.header.classList.remove('home-header');
    refs.header.classList.add('my-lib-header');
    refs.pagination.classList.add('is-hidden');
}

function onHomeLinkClick(event) {
    event.preventDefault();
    refs.header.classList.remove('my-lib-header');
    refs.header.classList.add('home-header');
    refs.pagination.classList.remove('is-hidden');
}

function onLogoClick(event) {
    event.preventDefault();

    if(refs.header.classList.contains('my-lib-header')) {
        refs.header.classList.remove('my-lib-header');
    }
    refs.header.classList.add('home-header');
    refs.homeLink.classList.add('is-current');
    refs.myLibraryLink.classList.remove('is-current');

    checkCurrentPage();
    renderTrandingFilms();
}

function checkCurrentPage() {
    refs.changeableBlock.innerHTML = '';

    if (refs.homeLink.classList.contains('is-current')) {
        const searchMarkup = `<form class="form-search" id="form-search">
        <input
          class="form-search__input"
          type="text"
          name="searchQuery"
          autocomplete="off"
          placeholder="Find movies..."
        />
        </form>`
        refs.changeableBlock.insertAdjacentHTML("beforeend", searchMarkup);
    } else {
        const buttonsMarkup = `<div class="buttons-block">
        <button type="button" class="button primary-button">Watched</button>
        <button type="button" class="button secondary-button">Queue</button>
        </div>`
        refs.changeableBlock.insertAdjacentHTML("beforeend", buttonsMarkup);
    }
}

document.addEventListener('click', onMyLibraryLinkClick); 
document.addEventListener('click', onWatchedBtnClick);
document.addEventListener('click', onQueueBtnClick);

function onMyLibraryLinkClick(e) {
    if (e.target == getRefs().myLibraryLink) {
        refs.gallery.innerHTML = '';           
        fetchWatchedFilms();
    }
};

function onWatchedBtnClick(e) {
    if (e.target == getRefs().btnWatched) {
        getRefs().btnWatched.style.backgroundColor = '#ff6b01';
        getRefs().btnWatched.style.border = 'none';
        getRefs().btnQueue.style.backgroundColor = 'rgba(145, 145, 145, 0.25)';
        getRefs().btnQueue.style.border = '1px solid #fff'
        refs.gallery.innerHTML = '';
        fetchWatchedFilms()
    }
};

function onQueueBtnClick(e) {
    if (e.target == getRefs().btnQueue) {
        getRefs().btnQueue.style.backgroundColor = '#ff6b01';
        getRefs().btnQueue.style.border = 'none';
        getRefs().btnWatched.style.backgroundColor = 'rgba(145, 145, 145, 0.25)';
        getRefs().btnWatched.style.border = '1px solid #fff'
         refs.gallery.innerHTML = '';
        fetchQueueFilms()
    }
};

export function render(films, path) {
    refs.gallery.innerHTML = '';
    if (path === 'watched') {
    for (const film of films) {
        getMovieId(film).then(data => {
            const markup = watched(data);
            refs.gallery.insertAdjacentHTML('beforeend', markup);
        });
    }
    }else  {
    for (const film of films) {
        getMovieId(film).then(data => {
        const markup = watched(data);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        })
    }
    }
};
