export default function getRefs() {
  return {
    header: document.querySelector('header'),
    logo: document.querySelector('.logo'),
    navList: document.querySelector('.site-nav-list'),
    homeLink: document.querySelector('.home-link'),
    myLibraryLink: document.querySelector('.my-library-link'),
    changeableBlock: document.querySelector('.changeable-block'),
    // Modal
    gallery: document.querySelector('.gallery'),
    modal: document.querySelector('.modal-form'),
    modalСard: document.querySelector('.modal-form__card'),
    overlay: document.querySelector('.overlay'),
    backdrop: document.querySelector('.backdrop'),
    clsBtn: document.querySelector('.modal-form__close-btn'),
  };
}
