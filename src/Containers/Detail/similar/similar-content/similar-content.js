import React from "react";
import classes from "./similar-content.module.css";
import MissingPoster from "../../../../img/noPoster.jpeg";
import { Link } from "react-router-dom";
const SimilarContent = ({ type, id, poster_path, original_title, name }) => {
  return (
    <Link to={`/${type}/${id}`}>
      <div className={classes.SimilarContent}>
        <img
          className={classes.SimilarImage}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : MissingPoster
          }
          alt="movie"
        />
        <p className={classes.MovieName}>{original_title || name}</p>
      </div>
    </Link>
  );
};

export default SimilarContent;
