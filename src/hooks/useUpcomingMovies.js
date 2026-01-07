import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    if (upcomingMovies) return; // fetch only if not already in store

    const getUpcomingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?page=1",
          API_OPTIONS
        );

        if (!response.ok) {
          console.error("Failed to fetch upcoming movies:", response.status);
          return;
        }

        const json = await response.json();

        if (!json.results || json.results.length === 0) {
          console.warn("No upcoming movies found");
          return;
        }

        dispatch(addUpcomingMovies(json.results));
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    getUpcomingMovies();
  }, [upcomingMovies, dispatch]);
};

export default useUpcomingMovies;
