import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchMovie } from "../hooks/useFetchMovie.js";
import MotionDiv from "../components/MotionDiv.jsx";
import MovieCard from "../components/MovieCard.jsx";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { movie, error, loading } = useFetchMovie("query", query);
  const searchMovies = movie.results || [];

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product.
      </div>
    );

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="flex flex-col">
        <h2 className="mb-4 text-center text-xl font-semibold text-white">
          Results for: <span className="text-primary">"{query}"</span>
        </h2>

        <MotionDiv>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {searchMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}

export default SearchPage;
