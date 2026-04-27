import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import MainLayout from "../layout/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import FavoritesPage from "../pages/FavoritesPage.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import MovieDetailPage from "../pages/MovieDetailPage.jsx";
import SignInPage from "../pages/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <div className="flex justify-center py-40">
        <span className="loading loading-ring loading-lg" />
      </div>
    );

  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
