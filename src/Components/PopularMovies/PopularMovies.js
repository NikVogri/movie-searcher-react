import React from 'react';
import classes from './PopularMovies.module.css';
import PopularItem from './PopularItem/PopularItem';

const PopularMovies = (props) => {

  const renderTopMovies = props.movieTopList.map(
    movie => <PopularItem key={movie.id} title={movie.title} image={movie.poster_path} />
  );

  return (
    <div className={classes.TopContainer}>
      {renderTopMovies}
    </div>
  );
}

export default PopularMovies;
