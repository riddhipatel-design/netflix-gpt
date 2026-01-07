import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (popularMovies) return; // Guard: fetch only if data not present

    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );

      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    };

    getPopularMovies();
  }, [popularMovies, dispatch]); // dependencies: Redux state & dispatch
};

export default usePopularMovies;
