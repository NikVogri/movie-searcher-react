import React from "react";
import classes from "./Movie.module.css";
const Movie = ({ title, year, poster }) => {
  return (
    <div className={classes.Movie}>
      <h2 className={classes.Sm}>{title.slice(0, 45)}</h2>
      <h4 className={classes.Sm}>{year}</h4>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster}`}
        alt={"Movie poster"}
        className={classes.Image}
      />
      <div className={classes.Icons}>
        <i
          className="fas fa-heart Icon ActiveFavourite"
          title="Add to favourites"
        />
        <i className="fas fa-eye Icon ActiveWatched" title="Mark watched" />
      </div>
    </div>
  );
};

export default Movie;
