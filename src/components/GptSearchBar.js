import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null);
    const dispatch = useDispatch;
     
    const searchMovieTMDB = async (movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTIONS);
      const json = await data.json();
     
      return json.results;
    };


    const handleGPTSearchClick = async () => {
      console.log(searchText.current.value);

      const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Sing is King, Zootopiya, Frozen, Don, Sholay";

      //make an api call to gpt API and get movie results
      const gptResults = await openai.chat.completions.create({
    messages: [
      { role: "user", content: gptQuery }],
    model: "gpt-3.5-turbo", // Specify the model
  });
  if(!gptResults.choices){
    //write error handling
  }
  
   console.log(gptResults.choices?.[0]?.message?.content); //gives you 5 movie list 
   const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

  const tmdbResults = await Promise.all(
  gptMovies.map(movie => searchMovieTMDB(movie.trim()))
);

dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))

    };

   
  return (
    <div className="flex justify-center pt-32 px-4">
      <form
        className="
          w-full max-w-3xl
          flex items-center
          bg-black/80 backdrop-blur
          border border-gray-700
          rounded-lg
          overflow-hidden
          shadow-lg
        "
        onSubmit={(e) => e.preventDefault()}
      >
        {/* INPUT */}
        <input
          ref={searchText}
          type="text"
          placeholder= {lang[langKey].gptSearchPlaceholder}
          className="
            flex-1
            bg-transparent
            text-white
            placeholder-gray-400
            px-5 py-4
            text-sm sm:text-base
            outline-none
          "
        />

        {/* BUTTON */}
        <button
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            font-semibold
            px-6 sm:px-8
            py-4
            text-sm sm:text-base
            transition
          "
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
