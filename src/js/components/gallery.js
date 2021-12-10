import axios from 'axios';
import cardTemplate from '../../template/film-card.hbs';
// import { cards } from './gallery-items';

const gallery = document.querySelector('.gallery');
console.log('gallery', gallery);


// const markup = cardTemplate(cards);
// console.log('markup', markup);
// console.log(cardTemplate(cards))
// gallery.insertAdjacentHTML('beforeend', markup);
const BASE_URL = 'https://pixabay.com/api/'; 
const pixabayKey = '24437827-e20f686b1c65a4a2859f17630';

const api = () => {
    return axios.get(` ${BASE_URL}?key=${pixabayKey}&q=all`)
    .then(response => response.data );
    }
// console.log(api());

function fetchNew (data){
    api()
    .then(data => console.log(data.hits))
const markup = cardTemplate(data);
console.log('markup', markup);
console.log(cardTemplate(data))
gallery.insertAdjacentHTML('beforeend', markup);
}
fetchNew();








