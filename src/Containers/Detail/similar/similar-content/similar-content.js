import React from 'react';
import classes from './similar-content.module.css';
import Image from '../../../../img/joker.png';
const SimilarContent = () => {
  return (
    <div className={classes.SimilarContent}>
      <img className={classes.SimilarImage} src={Image} alt="movie" />
      <p className={classes.MovieName}>Joker</p>
    </div>
  );
}

export default SimilarContent;
