import React, { useState, useEffect, useRef, useContext } from "react";
import { MovieContext } from "../context/context.js";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useContext(MovieContext);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, setSearchQuery]);

  return (
    <>
      <div className="mb-10 flex w-full max-w-xs gap-3 px-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movie..."
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
    </>
  );
}

export default SearchBar;
