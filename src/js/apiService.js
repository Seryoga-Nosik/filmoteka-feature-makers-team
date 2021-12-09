import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';
import noposter from '../images/no-poster.png';

axios.defaults.baseURL = BASE_URL;

export async function fetchMovies() {
  try {
    const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
    const trendinMoviesData = await response.data;
    // console.log('trendinMoviesData', trendinMoviesData);
    const trendinMovies = await trendinMoviesData.results;
    // console.log('trendinMovies', trendinMovies);
    return trendinMovies;
    // return response;
  } catch (error) {
    console.error(error);
  }
}
// fetchMovies().then(data => console.log(data));

export async function getGenres() {
  try {
    const genres = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return genres;
  } catch (error) {
    console.error(error);
  }
}
// getGenres().then(data => console.log(data));

export async function getMovieInfo(movie_id) {
  try {
    const movie = await axios.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
    console.log('movie', movie);
    return genres;
  } catch (error) {
    console.error(error);
  }
}
getMovieInfo().then(data => console.log(data));
