import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
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
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
