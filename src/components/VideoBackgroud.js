import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackgroud = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
 
   // ✅ Hook to fetch trailer
  useMovieTrailer(movieId);

  // ✅ Safe: if trailer not ready, render null
  if (!trailerVideo?.key) return null;


  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
       className="absolute top-1/2 left-1/2
        w-[130%] h-[130%]
        sm:w-[110%] sm:h-[110%]
        lg:w-[110%] lg:h-[110%]
        -translate-x-1/2 -translate-y-1/2
       scale-125"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
         allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  );
};

export default VideoBackgroud;
