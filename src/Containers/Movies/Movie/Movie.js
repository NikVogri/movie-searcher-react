import React from 'react';
import classes from './Movie.module.css'
// import '../../../index.css';
const Movie = () => {
  return (
    <div className={classes.Movie}>
      <h2 className={classes.Sm}>Avengers EndGame</h2>
      <h4 className={classes.Sm}>2018</h4>
      <img src="https://images-na.ssl-images-amazon.com/images/I/91Lpv1aIkmL._AC_SL1500_.jpg" alt={"Movie poster"} className={classes.Image} />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac lacus maximus,
        malesuada nulla vel, maximus odio. </p>
      <div className={classes.Icons}>
        <i className="fas fa-heart Icon ActiveFavourite" title="Add to favourites" />
        <i className="fab fa-imdb Icon" title="To IMDB page" />
        <i class="fas fa-eye Icon ActiveWatched" title="Mark watched" />
      </div>
    </div>
  );
}

export default Movie;
