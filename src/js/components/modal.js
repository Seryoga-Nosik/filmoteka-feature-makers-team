import modalTpl from '../../template/modal.hbs';

const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.modal-form');
const modalСard = document.querySelector('.modal-form__card');
const overlay = document.querySelector('.overlay');
const backdrop = document.querySelector('.backdrop');
const clsBtn = document.querySelector('.modal-form__close-btn');

<
  title: 'A FISTFUL OF LEAD',
  vote_average: '7.3',
  vote_count: '1260',
  popularity: '100.2',

  genres_type: 'Western',

  overview:
    'Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how?',
};

// function onClickHandler(e) {
//   e.preventDefault();

//   //   if (e.target.nodeName !== 'IMG') {
//   //     return;
//   //   }

//   backdrop.classList.add('is-open');
// }
body.insertAdjacentHTML('beforeend', modalTpl(modalItem));
// gallery.addEventListener('click', onClickHandler);
