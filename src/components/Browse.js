import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
useNowPlayingMovies();
usePopularMovies ();
useTopRatedMovies ();
useUpcomingMovies ();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
      MainContainer
       - BackgroundVideo
       - VideoTitle
      SecondaryContainer
       - MovieList * n (n means lots of)
        - cards * n
      */}
    </div>
  );
};

export default Browse;
