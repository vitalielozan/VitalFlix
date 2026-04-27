import React, { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api.js";

export const useFetchMovie = (type = "all", param = "", delay = 1000) => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (type === "query" && !param) {
      setMovie([]);
      setLoading(false);
      return;
    }
    const fetchMovie = async () => {
      setLoading(true);

      try {
        const result =
          type === "all" ? await getPopularMovies() : await searchMovies(param);

        setMovie(result);
      } catch (err) {
        setError(err);
      } finally {
        timeoutId = setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };
    fetchMovie();
    return () => clearTimeout(timeoutId);
  }, [type, param, delay]);

  return { movie, error, loading };
};
