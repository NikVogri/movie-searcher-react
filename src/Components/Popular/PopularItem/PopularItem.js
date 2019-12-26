import React from 'react';
import classes from './PopularItem.module.css';

const PopularItem = (props) => {
  return (
    <div className={classes.TopItem}>
      <div className={classes.TopContainer}>
        <img src={`https://image.tmdb.org/t/p/w500${props.image}`} alt="movie poster" className={classes.TopImage} />
        <h3>{props.title}</h3>
      </div>
      <div className={classes.TopInformation}>
        <i className={`${classes.HeartIcon} fa fa-heart`} aria-hidden="true" />
        <div>
          <div className={classes.Rating}>
            <i className={`${classes.StarIcon} fa fa-star`} id="star" aria-hidden="true" />
            <p className={classes.TopRating}>{props.voteAverage}</p>
          </div>
          <p className={classes.TopVotes}>{props.votes} Votes</p>
          <p className={classes.TopViews}>{props.popularity} Views</p>
        </div>
        <div className={classes.TopDescription}>
          <p>{props.description.slice(0, 215)}</p>
        </div>
        <p className={classes.TopDate}>{props.releaseDate}</p>
      </div>
    </div>
  );
}

export default PopularItem;
