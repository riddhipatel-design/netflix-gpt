import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
        <div className=" bg-black">
    
      {/* Rows pulled into hero */}
      <div className="relative -mt-24 sm:-mt-40 z-20">
         {movies.nowPlayingMovies?.length > 0 && (
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        )}
        {movies.popularMovies?.length > 0 && (
          <MovieList title={"Popular"} movies={movies.popularMovies} />
        )}
        {movies.topRatedMovies?.length > 0 && (
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        )}
        {movies.upcomingMovies?.length > 0 && (
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        )}

        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
