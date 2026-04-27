import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaHeart } from "react-icons/fa";
import { useMovieContext } from "../hooks/useFavoriteContext.js";

const POSTER_BASE = "https://image.tmdb.org/t/p/w300";

function MovieThumbnail({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieContext();
  const fav = isFavorite(movie.id);

  return (
    <div
      className="group relative w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-transform duration-300 hover:z-10 hover:scale-105"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {movie.poster_path ? (
        <img
          src={`${POSTER_BASE}${movie.poster_path}`}
          alt={movie.title}
          className="h-60 w-full object-cover"
        />
      ) : (
        <div className="flex h-60 w-full items-center justify-center bg-base-300 text-xs text-gray-400">
          No Image
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-2 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
        <p className="line-clamp-2 text-xs font-semibold text-white">
          {movie.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <button
            className="rounded-full bg-white p-1 text-black hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
          >
            <FaPlay size={8} />
          </button>
          <button
            className={`rounded-full p-1 transition-colors ${fav ? "text-red-500" : "text-white hover:text-red-400"}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie);
            }}
          >
            <FaHeart size={10} />
          </button>
          <span className="ml-auto text-xs text-yellow-400">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieThumbnail;
