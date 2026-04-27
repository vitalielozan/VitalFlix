import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { MovieContext } from "./context.js";
import { supabase } from "../lib/supabase.js";
import { searchMovies } from "../services/api.js";

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
      const { data, error } = await supabase
        .from("favorites")
        .select("movie_data")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
      }

      if (data) {
        setFavorites(data.map((row) => row.movie_data));
      }
      setFavoritesLoading(false);
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
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movie.id);

      if (error) {
        console.error("Error removing favorite:", error);
        return;
      }

      setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, movie_id: movie.id, movie_data: movie });

      if (error) {
        console.error("Error adding favorite:", error);
        return;
      }

      setFavorites((prev) => [...prev, movie]);
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
