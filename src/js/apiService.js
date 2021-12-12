import axios from 'axios';
import { BASE_URL, API_KEY } from './constants';
import noposter from '../images/no-poster.png';

axios.defaults.baseURL = BASE_URL;

export let totalPages = 1;

export async function getTrendingMovies() {
  try {
    const response = await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
    const trendinMoviesData = await response.data;
    const trendinMovies = await trendinMoviesData.results;
    const normalizedMovies = await normalizer(trendinMovies);
    return normalizedMovies;
  } catch (error) {
    console.error(error);
  }
}
// getTrendingMovies().then(data => console.log(data));

export async function getGenres() {
  try {
    const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = {};
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
    const normalizedMovies = await normalizer(popularMovies);
    return normalizedMovies;
  } catch (error) {
    console.error(error);
  }
}
// getMoviesSearchQuery().then(data => console.log(data));

export async function getMovieInfo(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movieData = await response.data;

    return movieData;
  } catch (error) {
    console.error(error);
  }
}
// getMovieInfo(512195).then(data => console.log(data));

async function normalizer(data) {
  const moviesArr = await data;
  const genresArr = await getGenres();

  const updateMovie = movie => {
    const MAX_GENRE_LENGTH = 20;
    let genresLength = 0;
    const genres = movie.genre_ids
      .map(genreId => genresArr[genreId])
      .filter(genreName => (genresLength += genreName.length) <= MAX_GENRE_LENGTH);
    if (genresLength > MAX_GENRE_LENGTH) genres.push('others...');

    let title = movie.title;
    if (title.length > 40) {
      title = movie.title.slice(0, 37) + '...';
    }

    const release_date = movie.release_date ? movie.release_date.split('-')[0] : 'NA';

    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
      : noposter;
    const movieUpdate = { ...movie, title, genres, release_date, poster_path };
    return movieUpdate;
  };

  const updatedMoviesarr = moviesArr.map(updateMovie);
  return updatedMoviesarr;
}
