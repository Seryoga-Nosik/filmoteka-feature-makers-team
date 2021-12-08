import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchMovies() {
  const movies = await axios.get(`/3/movie/500?api_key=${API_KEY}`);
  console.log('movies', movies);
  return movies;
}
