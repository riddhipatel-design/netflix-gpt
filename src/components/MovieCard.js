import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="relative group w-36 md:w-48 transition-transform duration-300 hover:scale-110 hover:z-20">
      
      {/* IMAGE */}
      <img
        className="rounded-lg shadow-md group-hover:shadow-2xl"
        alt={title}
        src={IMG_CDN_URL + posterPath}
      />

     
    </div>
  );
};

export default MovieCard;
