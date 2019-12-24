import React, { useState, useEffect } from 'react';
import classes from './Movies.module.css';
import Movie from './Movie/Movie';
import Axios from 'axios';
import Spinner from '../Spinner/Spinner';

const Movies = (props) => {
  const [movieList, setmovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    movieListHandler();
  }, [props.renderData]);

  const movieListHandler = () => {
    setLoading(true);
    Axios.get(`http://www.omdbapi.com/?s=${props.renderData}&apikey=95024015`)
      .then(res => { setmovieList(res.data.Search); setLoading(false); })
      .catch(err => { setLoading(false) });
  }
  let render = null;
  if (loading) {
    render = <Spinner />
  }
  else {
    if (movieList !== undefined) {
      render = movieList.map(movie => (
        <Movie key={movie.imdbID} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} poster={movie.Poster} />
      ));
    }
  }

  return (
    <div className={classes.Movies}>
      {render}
    </div>
  );
}

export default Movies;
