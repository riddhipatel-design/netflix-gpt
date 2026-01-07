import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    if (topRatedMovies) return; // fetch only if not already in store

    const getTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS
        );

        if (!response.ok) {
          console.error("Failed to fetch top rated movies:", response.status);
          return;
        }

        const json = await response.json();

        if (!json.results || json.results.length === 0) {
          console.warn("No top rated movies found");
          return;
        }

        dispatch(addTopRatedMovies(json.results));
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    getTopRatedMovies();
  }, [topRatedMovies, dispatch]);
};

export default useTopRatedMovies;
