import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieThumbnail from "./MovieThumbnail.jsx";

function MovieRow({ title, movies }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === "left" ? -480 : 480,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-8">
      <h2 className="mb-3 text-lg font-semibold text-white md:text-xl">
        {title}
      </h2>
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white opacity-0 shadow-lg transition hover:bg-black group-hover:opacity-100"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <MovieThumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white opacity-0 shadow-lg transition hover:bg-black group-hover:opacity-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
