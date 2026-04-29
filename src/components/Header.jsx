import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaSearch, FaTimes } from "react-icons/fa";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const debounceRef = useRef(null);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!showSearch || trimmedQuery.length < 5) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setShowSearch(false);
      setQuery("");
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, showSearch, navigate]);

  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathnameRef.current === location.pathname) {
      return;
    }

    prevPathnameRef.current = location.pathname;
    setShowSearch(false);
    setQuery("");
  }, [location.pathname]);

  return (
    <div className="navbar sticky top-0 z-40 bg-base-200/90 shadow-lg backdrop-blur-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          VitalFlix
        </Link>
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showSearch ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="input input-sm input-bordered w-36 md:w-56"
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="btn btn-ghost btn-sm p-1"
            >
              <FaTimes size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="btn btn-ghost btn-sm"
          >
            <FaSearch />
          </button>
        )}

        <div className="flex md:hidden">
          <ul className="menu menu-horizontal p-0 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favs</Link>
            </li>
          </ul>
        </div>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm ml-1">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
