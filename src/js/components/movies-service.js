import {getTrendingMovies} from '../apiService.js';
import { getGenres } from '../apiService.js';

export default class MoviesService {
    constructor () {

    }        

    trendMovies () {

  return getTrendingMovies ()
    .then(res => {
        
        return res;
    })

   

}

getGenres () {
return getGenres ()
.then(genres => {
    return genres
})
}




}
