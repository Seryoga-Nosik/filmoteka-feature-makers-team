export default function getRefs() {
    return {
      header: document.querySelector('header'),  
      logo: document.querySelector('.logo'),
      navList: document.querySelector('.site-nav-list'),
      homeLink: document.querySelector('.home-link'),
      myLibraryLink: document.querySelector('.my-library-link'),
      changeableBlock: document.querySelector('.changeable-block'),
    };
  }