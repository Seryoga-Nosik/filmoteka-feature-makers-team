import getRefs from '../refs';
const refs = getRefs();

document.addEventListener('DOMContentLoaded', () => {
  window.onscroll = function () {
    if (window.pageYOffset > 500) {
      refs.toTopBtn.classList.add('upview');
    } else {
      refs.toTopBtn.classList.remove('upview');
    }
  };

  // плавный скролл наверх
  refs.toTopBtn.addEventListener('click', function () {
    window.scrollBy({
      top: -document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
});
