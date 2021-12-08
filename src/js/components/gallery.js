<<<<<<< HEAD
// import '../../sass/main.scss'
import cardTemplate from '../../template/film-card.hbs'
import  {cards}  from './gallery-items';
=======
import cardTemplate from '../../template/film-card.hbs';
import { cards } from './gallery-items';
>>>>>>> dev

const gallery = document.querySelector('.gallery');
console.log('gallery', gallery);
// console.log(gallery);
const markup = cardTemplate(cards);
console.log('markup', markup);
// console.log(cardTemplate(cards))
<<<<<<< HEAD
gallery.insertAdjacentHTML('beforeend', markup)  ;




// const fetchMovie  = () => { 
//     const movies = axios.get('https://api.themoviedb.org/3/movie/500?api_key=e63db2291c5b84e5166b5dd810de73f5')
//     return movies; 
// }

// fetchMovie().then(data => console.log(data.data))


=======
gallery.insertAdjacentHTML('beforeend', markup);
>>>>>>> dev
