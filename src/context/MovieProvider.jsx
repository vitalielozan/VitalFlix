import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { MovieContext } from "./context.js";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
  searchMovies,
} from "../services/api.js";

function MovieProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      setFavoritesLoading(true);

      try {
        const userFavorites = await getUserFavorites(user.id);
        setFavorites(userFavorites.map((row) => row.movie_data));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setFavoritesLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isLoaded]);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setSearchLoading(false);
        return;
      }
      setSearchLoading(true);
      setSearchError(null);
      try {
        const result = await searchMovies(searchQuery);
        setSearchResults(result.results || []);
      } catch (err) {
        setSearchError(err);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const toggleFavorite = async (movie) => {
    if (!user) return;

    const exists = favorites.some((fav) => fav.id === movie.id);

    if (exists) {
      try {
        await removeFavorite(user.id, movie.id);
        setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
      return;
    }

    try {
      await addFavorite({
        user_id: user.id,
        movie_id: movie.id,
        movie_data: movie,
      });
      setFavorites((prev) => [...prev, movie]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <MovieContext.Provider
      value={{
        user,
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesLoading,
        searchQuery,
        setSearchQuery,
        searchResults,
        searchLoading,
        searchError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
