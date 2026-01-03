import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const VideoTitle = ({ title, movieOverview }) => {
  return (
    <div
      className="
        absolute
        top-1/3
        left-0
        px-6 sm:px-10 lg:px-16
        max-w-xl sm:max-w-2xl lg:max-w-3xl
        text-white
        z-10
      "
    >
      {/* TITLE */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
        {title}
      </h1>

      {/* OVERVIEW */}
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed">
        {movieOverview?.length > 220
          ? movieOverview.slice(0, 220) + "..."
          : movieOverview}
      </p>

      {/* BUTTONS */}
      <div className="mt-6 flex gap-3">
        <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-300 transition">
          <FaPlay />Play
        </button>

        <button className="flex items-center gap-2 bg-gray-500/70 text-white font-semibold px-6 py-3 rounded hover:bg-gray-500 transition">
         <FiInfo className="text-lg" /> More Info
        </button>
      </div>
    </div>
  );
};


export default VideoTitle;
