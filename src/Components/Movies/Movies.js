import React, { useState, useEffect } from "react";
import classes from "./Movies.module.css";
import Movie from "./Movie/Movie";
import Axios from "axios";
import Spinner from "../Spinner/Spinner";

const Movies = ({ renderData }) => {
  const [movieList, setmovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieListHandler();
  }, [renderData]);

  const movieListHandler = () => {
    setLoading(true);
    Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=dce6a3738a810ffe30be7528d9a32bf13&query=${renderData}`
    )
      .then(res => {
        setmovieList(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };
  let render = null;
  if (loading) {
    render = <Spinner />;
  } else {
    if (movieList !== undefined) {
      render = movieList.map(movie => (
        <Movie
          key={movie.id}
          title={movie.original_title}
          year={movie.release_date.slice(0, 4)}
          poster={movie.poster_path}
        />
      ));
    }
  }

  return <div className={classes.Movies}>{render}</div>;
};

export default Movies;
