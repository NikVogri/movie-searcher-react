import React from 'react';
import classes from './PopularItem.module.css';

const PopularItem = (props) => {
  return (
    <div>
      <a href="/">
        <div className={classes.TopItem}>
          <img src={`https://image.tmdb.org/t/p/w500${props.image}`} alt="movie poster" className={classes.TopImage} />
          <h3>{props.title}</h3>
        </div>
      </a>
    </div>
  );
}

export default PopularItem;
