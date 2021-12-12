import axios from 'axios';
import MoviesService from './movies-service'
import {getTrendingMovies} from '../apiService.js';
import {getGenres} from '../apiService.js'
import {getMoviesSearchQuery} from '../apiService.js'
import cardTemplate from '../../template/film-card.hbs';

// import { cards } from './gallery-items';

const gallery = document.querySelector('.gallery');
const moviesService = new MoviesService();
// console.log(moviesService);
// const markup = cardTemplate(cards);
// console.log(cardTemplate(cards))
// gallery.insertAdjacentHTML('beforeend', markup);
// const BASE_URL = 'https://pixabay.com/api/'; 
// const pixabayKey = '24437827-e20f686b1c65a4a2859f17630';


// console.log(api());
function getMovies () {
 return  moviesService.trendMovies()
 .then(movieTpl);
};

  function takeGenres () {
   return  moviesService.getGenres()
   .then(movieTpl);
    
  };
 




       
   
        // .then(genre => {
        //  return   moviesService.getGenres().then(
        //         name => {
        //           return name; 

                
                 
        //         }
              
        //    )
          
        // }
        // )

            

getMovies()
 






// getTrendingMovies ()
//     .then(res => {
//         console.log(res)
//    
      
//     })

   
    function movieTpl (data, genre) {
        const markup = cardTemplate(data, genre); 
        //         // console.log(markup);
            return gallery.insertAdjacentHTML('beforeend', markup);
    }
   















