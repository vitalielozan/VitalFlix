import React from "react";
import MotionDiv from "../components/MotionDiv.jsx";
import { useMovieContext } from "../hooks/useFavoriteContext.js";
import MovieCard from "../components/MovieCard.jsx";

function FavoritesPage() {
  const { favorites } = useMovieContext();

  return (
    <>
      {favorites.length > 0 ? (
        <div className="px-4 py-8 md:px-8">
          <h2 className="mb-4 text-center text-xl font-semibold text-white">
            Your Favorites
          </h2>
          <MotionDiv>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </MotionDiv>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around gap-3 py-3">
          <h2 className="text-center text-2xl font-semibold italic">
            No Favorite Movies Yet
          </h2>
          <img alt="Shopping Bag" src="images/video-shooting.png" width={300} />
          <p className="mb-5 text-justify text-lg font-medium italic">
            Start adding movies to you favorites and they will appear here!
          </p>
        </div>
      )}
    </>
  );
}

export default FavoritesPage;
