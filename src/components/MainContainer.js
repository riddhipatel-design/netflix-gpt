import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackgroud from './VideoBackgroud'

const MainContainer = () => {
const movies = useSelector(store => store.movies?.nowPlayingMovies)

if(movies === null) return; /* this is called early return */

const mainMovie = movies[0];
console.log(mainMovie);

const {original_title, overview, id } = mainMovie;

  return (
  <div className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[90vh] overflow-hidden">
    
    <VideoBackgroud movieId={id} />

    {/* Gradient overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-r
        from-black
        via-black/70 sm:via-black/60
        to-transparent
      "
    />

    <VideoTitle title={original_title} movieOverview={overview} />
  </div>
);

}

export default MainContainer