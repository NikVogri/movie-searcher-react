import React from 'react';
import classes from './similar-content.module.css';
import MissingPoster from '../../../../img/noPoster.jpeg';
import { Link } from 'react-router-dom';
const SimilarContent = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div className={classes.SimilarContent}>
        <img className={classes.SimilarImage} src={props.poster_path ? `https://image.tmdb.org/t/p/w500${props.poster_path}` : MissingPoster} alt="movie" />
        <p className={classes.MovieName}>{props.original_title}</p>
      </div>
    </Link>
  );
}

export default SimilarContent;
