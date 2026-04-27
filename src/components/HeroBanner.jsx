import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function HeroBanner({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <img
        src={`${IMAGE_BASE}${movie.backdrop_path}`}
        alt={movie.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 md:px-16 md:justify-center md:pb-0">
        <h1 className="mb-3 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
          {movie.title}
        </h1>
        <p className="mb-6 max-w-md line-clamp-3 text-sm text-gray-200 drop-shadow md:text-base">
          {movie.overview}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn btn-primary gap-2"
          >
            <FaPlay /> Play Trailer
          </button>
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn gap-2 border-white/40 bg-white/20 text-white hover:bg-white/30"
          >
            <FaInfoCircle /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
