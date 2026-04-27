import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaArrowLeft } from "react-icons/fa";
import {
  getMovieDetails,
  getMovieVideos,
  getMovieCredits,
} from "../services/api.js";
import { useMovieContext } from "../hooks/useFavoriteContext.js";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieContext();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [details, videos, credits] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
          getMovieCredits(id),
        ]);
        setMovie(details);
        const yt = videos.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube",
        );
        setTrailer(yt || null);
        setCast(credits.cast?.slice(0, 10) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-40">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (!movie)
    return (
      <div className="py-20 text-center text-gray-400">Movie not found.</div>
    );

  const fav = isFavorite(movie.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Backdrop */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={
            movie.backdrop_path
              ? `${IMAGE_BASE}${movie.backdrop_path}`
              : `${POSTER_BASE}${movie.poster_path}`
          }
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-900 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <FaArrowLeft size={12} /> Back
        </button>
      </div>

      {/* Content */}
      <div className="relative -mt-24 px-4 pb-16 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Poster */}
          <img
            src={`${POSTER_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="hidden w-44 flex-shrink-0 rounded-xl shadow-2xl md:block"
          />

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white drop-shadow md:text-4xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="italic text-gray-400">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span key={g.id} className="badge badge-outline badge-primary">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
              <span>📅 {movie.release_date?.split("-")[0]}</span>
              {movie.runtime > 0 && (
                <span>
                  ⏱ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            <p className="max-w-2xl text-gray-300">{movie.overview}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => trailer && setShowTrailer(true)}
                disabled={!trailer}
                className="btn btn-primary gap-2"
              >
                <FaPlay /> {trailer ? "Play Trailer" : "No Trailer"}
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={`btn gap-2 ${fav ? "btn-error" : "btn-outline"}`}
              >
                <FaHeart />
                {fav ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-white">Cast</h2>
            <div
              className="flex gap-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {cast.map((person) => (
                <div key={person.id} className="w-24 flex-shrink-0 text-center">
                  {person.profile_path ? (
                    <img
                      src={`${PROFILE_BASE}${person.profile_path}`}
                      alt={person.name}
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-base-300 text-3xl text-gray-400">
                      👤
                    </div>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs font-medium text-white">
                    {person.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-gray-400">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative aspect-video w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full rounded-xl"
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-2xl font-bold text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MovieDetailPage;
