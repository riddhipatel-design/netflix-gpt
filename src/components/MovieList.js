import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-7"> 
        <h1 className="text-white text-2xl font-bold py-4 ">{title}</h1>

    <div className="flex overflow-x-auto scrollbar-hide scroll-smooth">
     
      <div className="flex gap-4 min-w-max">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.original_title || movie.title}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default MovieList;
