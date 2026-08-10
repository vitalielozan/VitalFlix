import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || "";

const BASE_URL = "https://api.themoviedb.org/3";

const get = (path, extra = {}) =>
  axios
    .get(`${BASE_URL}${path}`, { params: { api_key: API_KEY, ...extra } })
    .then((r) => r.data)
    .catch((e) => {
      console.error(e);
      return {};
    });

export const getPopularMovies = () => get("/movie/popular");
export const searchMovies = (query) => get("/search/movie", { query });
export const getTopRated = () => get("/movie/top_rated");
export const getNowPlaying = () => get("/movie/now_playing");
export const getUpcoming = () => get("/movie/upcoming");
export const getMoviesByGenre = (genreId) =>
  get("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
  });
export const getMovieDetails = (id) => get(`/movie/${id}`);
export const getMovieVideos = (id) => get(`/movie/${id}/videos`);
export const getMovieCredits = (id) => get(`/movie/${id}/credits`);
