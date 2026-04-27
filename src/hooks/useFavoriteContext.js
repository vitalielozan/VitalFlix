import { useContext } from "react";
import { MovieContext } from "../context/context.js";

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("MovieContext must be used within a MovieProvider");
  }
  return context;
};
