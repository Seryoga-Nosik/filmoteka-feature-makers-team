import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
    const trendinMoviesData = await response.data;
    const trendinMovies = await trendinMoviesData.results;
    return trendinMovies;
  } catch (error) {
    console.error(error);
  }
}
fetchTrendingMovies().then(data => console.log(data));

export async function getGenres() {
  try {
    const genres = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return genres;
  } catch (error) {
    console.error(error);
  }
}
getGenres().then(data => console.log(data));

export async function getMovieInfo(movie_id) {
  try {
    const movie = await axios.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
    return movie;
  } catch (error) {
    console.error(error);
  }
}
getMovieInfo(512195).then(data => console.log(data));
