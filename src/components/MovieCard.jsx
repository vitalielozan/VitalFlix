import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../hooks/useFavoriteContext.js";
import { FiHeart } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { user, isFavorite, toggleFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/sign-in");
      return;
    }
    toggleFavorite(movie);
  };

  return (
    <div
      className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-base-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="group relative h-80">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <FaPlay className="text-3xl text-white drop-shadow" />
        </div>
        <button
          title="Favorites"
          onClick={handleToggle}
          className={`btn btn-outline btn-primary absolute right-2 top-2 z-10 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform hover:scale-110 ${
            favorite ? "btn-error text-error" : "text-primary"
          }`}
        >
          <FiHeart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col space-y-2 p-4">
        <h2 className="card-title line-clamp-2 text-lg font-semibold text-gray-100">
          {movie.title}
        </h2>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
