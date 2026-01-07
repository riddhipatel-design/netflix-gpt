import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results || [];
    } catch (error) {
      console.error("TMDB search error:", error);
      return [];
    }
  };

  const handleGPTSearchClick = async () => {
    const query = searchText.current?.value;
    if (!query) return;

    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query " +
        query +
        ". Only give me name of 5 movies, comma separated.";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const content = gptResults?.choices?.[0]?.message?.content;
      if (!content) return console.warn("GPT returned empty result");

      const gptMovies = content
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);

      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error("GPT search error:", error);
    }
  };

  return (
    <div className="flex justify-center pt-32 px-4">
      <form
        className="w-full max-w-3xl flex items-center bg-black/80 backdrop-blur border border-gray-700 rounded-lg overflow-hidden shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-5 py-4 text-sm sm:text-base outline-none"
        />
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-4 text-sm sm:text-base transition"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
