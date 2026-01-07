import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (popularMovies) return; // fetch only if not already in store

    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );

        if (!response.ok) {
          console.error("Failed to fetch popular movies:", response.status);
          return;
        }

        const json = await response.json();

        if (!json.results || json.results.length === 0) {
          console.warn("No popular movies found");
          return;
        }

        dispatch(addPopularMovies(json.results));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    getPopularMovies();
  }, [popularMovies, dispatch]);
};

export default usePopularMovies;
