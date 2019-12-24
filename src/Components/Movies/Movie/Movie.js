import React from 'react';
import classes from './Movie.module.css'
// import '../../../index.css';
const Movie = (props) => {
  return (
    <div className={classes.Movie}>
      <h2 className={classes.Sm}>{props.title.slice(0, 45)}</h2>
      <h4 className={classes.Sm}>{props.year}</h4>
      <img src={`${props.poster}`} alt={"Movie poster"} className={classes.Image} />
      <div className={classes.Icons}>
        <i className="fas fa-heart Icon ActiveFavourite" title="Add to favourites" />
        <a href={`https://www.imdb.com/title/${props.imdbID}`}><i className="fab fa-imdb Icon" title="To IMDB page" /></a>
        <i className="fas fa-eye Icon ActiveWatched" title="Mark watched" />
      </div>
    </div>
  );
}

export default Movie;
