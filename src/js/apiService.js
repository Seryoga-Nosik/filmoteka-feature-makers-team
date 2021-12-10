import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';

axios.defaults.baseURL = BASE_URL;

export const genres = {};
export let totalPages = 1;

export async function getTrendingMovies() {
  try {
    const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
    const trendinMoviesData = await response.data;
    const trendinMovies = await trendinMoviesData.results;
    return trendinMovies;
  } catch (error) {
    console.error(error);
  }
}
// getTrendingMovies().then(data => console.log(data));

export async function getGenres() {
  try {
    const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    response.data.genres.forEach(({ id, name }) => {
      genres[id] = name;
    });
    return genres;
  } catch (error) {
    console.error(error);
  }
}
// getGenres().then(data => console.log(data));

export async function getMoviesSearchQuery(searchQuery, page) {
  try {
    const response = await axios.get(
      `/search/movie?api_key=${API_KEY}&page=${page}&language=en&query=${searchQuery}`,
    );
    const popularMoviesData = await response.data;
    const popularMovies = await popularMoviesData.results;
    totalPages = popularMoviesData.total_pages;
    return popularMovies;
  } catch (error) {
    console.error(error);
  }
}
// getMoviesSearchQuery().then(data => console.log(data));

export async function getMovieInfo(movie_id) {
  try {
    const response = await axios.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
    const movieInfo = await response.data;
    return movieInfo;
  } catch (error) {
    console.error(error);
  }
}
// getMovieInfo(512195).then(data => console.log(data));
