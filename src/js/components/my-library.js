import getRefs from '../refs';

const refs = getRefs();
//import frow watched and queue
import { fetchQueueFilms } from '../components/firebase/fetchFromFirebase';
import { fetchWatchedFilms } from '../components/firebase/fetchFromFirebase';
import { getMovieInfo } from '../apiService';
import watched from '../../template/listFilms.hbs';

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
}

function onHomeLinkClick(event) {
    event.preventDefault();
    refs.header.classList.remove('my-lib-header');
    refs.header.classList.add('home-header');
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
         refs.gallery.innerHTML = '';
        fetchWatchedFilms()
    }
};

function onQueueBtnClick(e) {
    if (e.target == getRefs().btnQueue) {
         refs.gallery.innerHTML = '';
        fetchQueueFilms()
    }
};

export function render(films, path) {
    if (path === 'watched') {
    for (const film of films) {
        getMovieInfo(film).then(data => {
            const markup = watched(data);
            refs.gallery.insertAdjacentHTML('beforeend', markup);
        });
    }
    }else  {
    for (const film of films) {
        getMovieInfo(film).then(data => {
        const markup = watched(data);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        })
    }
    }
};
