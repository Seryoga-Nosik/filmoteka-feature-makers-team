import getRefs from '../refs';
import searchInputTpl from '../../template/input-search';
import buttonsBlockTpl from '../../template/buttons-block';

const refs = getRefs();

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
        refs.changeableBlock.insertAdjacentHTML("beforeend", searchInputTpl());
    } else {
        refs.changeableBlock.insertAdjacentHTML("beforeend", buttonsBlockTpl());
    }
}