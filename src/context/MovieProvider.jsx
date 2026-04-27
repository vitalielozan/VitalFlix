import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { MovieContext } from "./context.js";
import { supabase } from "../lib/supabase.js";

function MovieProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

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

      if (!error && data) {
        setFavorites(data.map((row) => row.movie_data));
      }
      setFavoritesLoading(false);
    };

    fetchFavorites();
  }, [user, isLoaded]);

  const toggleFavorite = async (movie) => {
    if (!user) return;

    const exists = favorites.some((fav) => fav.id === movie.id);

    if (exists) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movie.id);

      setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
    } else {
      await supabase
        .from("favorites")
        .insert({ user_id: user.id, movie_id: movie.id, movie_data: movie });

      setFavorites((prev) => [...prev, movie]);
    }
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <MovieContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, favoritesLoading }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
