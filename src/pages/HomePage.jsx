import React, { useEffect, useState } from "react";
import {
  getPopularMovies,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  getMoviesByGenre,
} from "../services/api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import MovieRow from "../components/MovieRow.jsx";

function HomePage() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pop, top, now, up, act, com, hor] = await Promise.all([
          getPopularMovies(),
          getTopRated(),
          getNowPlaying(),
          getUpcoming(),
          getMoviesByGenre(28),
          getMoviesByGenre(35),
          getMoviesByGenre(27),
        ]);
        setPopular(pop.results || []);
        setTopRated(top.results || []);
        setNowPlaying(now.results || []);
        setUpcoming(up.results || []);
        setAction(act.results || []);
        setComedy(com.results || []);
        setHorror(hor.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-40">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div className="space-y-8 pb-12">
      <HeroBanner movie={popular[0]} />
      <MovieRow title="Popular Now" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Now Playing" movies={nowPlaying} />
      <MovieRow title="Coming Soon" movies={upcoming} />
      <MovieRow title="Action" movies={action} />
      <MovieRow title="Comedy" movies={comedy} />
      <MovieRow title="Horror" movies={horror} />
    </div>
  );
}

export default HomePage;
