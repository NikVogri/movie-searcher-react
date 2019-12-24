import React, { useState, useEffect } from 'react';
import classes from './Movies.module.css';
import Movie from './Movie/Movie';
const Movies = (props) => {
  return (
    <div className={classes.Movies}>
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />

    </div>
  );
}

export default Movies;
