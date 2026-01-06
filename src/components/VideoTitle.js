import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const VideoTitle = ({ title, movieOverview }) => {
   return (
    <div
      className="
        absolute
        top-[30%] sm:top-1/3
        left-0
        px-6 sm:px-10 lg:px-16
        max-w-sm sm:max-w-xl lg:max-w-3xl
        text-white
        z-10
      "
    >
      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
        {title}
      </h1>

      {/* OVERVIEW */}
      <p className="mt-3 sm:mt-4 text-xs sm:text-md lg:text-lg text-gray-200 leading-relaxed">
        {movieOverview?.length > 220
          ? movieOverview.slice(0, 220) + "..."
          : movieOverview}
      </p>

      {/* BUTTONS */}
      <div className="mt-5 sm:mt-6 flex gap-3">
        <button
          className="
            flex items-center gap-2
            bg-white text-black font-semibold
            px-4 sm:px-6 py-2 sm:py-3
            rounded
            hover:bg-gray-300
            transition
          "
        >
          <FaPlay className="text-sm sm:text-base" />
          <span className="text-sm sm:text-base">Play</span>
        </button>

        <button
          className="
            flex items-center gap-2
            bg-gray-500/70 text-white font-semibold
            px-4 sm:px-6 py-2 sm:py-3
            rounded
            hover:bg-gray-500
            transition
          "
        >
          <FiInfo className="text-sm sm:text-lg" />
          <span className="text-sm sm:text-base">More Info</span>
        </button>
      </div>
    </div>
  );
};


export default VideoTitle;
