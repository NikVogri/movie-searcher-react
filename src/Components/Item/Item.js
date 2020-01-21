import React from 'react';
import classes from './Item.module.css';
import MissingPoster from '../../img/noPoster.jpeg';
import { Link } from 'react-router-dom';
const Item = (props) => {
  return (
    <div className={classes.TopItem}>
      <Link to={`/${props.type}/${props.id}`}>
        <div className={classes.TopContainer}>
          <img src={props.image ? `https://image.tmdb.org/t/p/w500${props.image}` : MissingPoster} alt="movie poster" className={classes.TopImage} />
          <h3>{props.title}</h3>
        </div>
        <div className={classes.TopInformation}>
          <div className={classes.MainRating}>
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
          <p className={classes.TopDate}>{props.releaseDate ? props.releaseDate.split('-').reverse().join('/') : null}</p>
        </div>
      </Link>
    </div>
  );
}

export default Item;
