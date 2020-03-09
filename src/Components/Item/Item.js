import React from "react";
import classes from "./Item.module.css";
import MissingPoster from "../../img/noPoster.jpeg";
import { Link } from "react-router-dom";
const Item = ({ type, id, image, title }) => {
  return (
    <div className={classes.TopItem} title={title}>
      <Link to={`/${type}/${id}`}>
        <div className={classes.TopContainer}>
          <img
            src={
              image ? `https://image.tmdb.org/t/p/w500${image}` : MissingPoster
            }
            alt="movie poster"
            className={classes.TopImage}
          />
          <h3 className={classes.contentTitle}>
            {title.length > 30 ? title.slice(0, 30).concat("...") : title}
          </h3>
        </div>
        {/* <div className={classes.TopInformation}>
          <div className={classes.MainRating}>
            <div className={classes.Rating}>
              <i
                className={`${classes.StarIcon} fa fa-star`}
                id="star"
                aria-hidden="true"
              />
              <p className={classes.TopRating}>{voteAverage}</p>
            </div>
            <p className={classes.TopVotes}>{votes} Votes</p>
            <p className={classes.TopViews}>{popularity} Views</p>
          </div>
          <div className={classes.TopDescription}>
            <p>{description.slice(0, 215)}</p>
          </div>
          <p className={classes.TopDate}>
            {releaseDate
              ? releaseDate
                  .split("-")
                  .reverse()
                  .join("/")
              : null}
          </p>
        </div> */}
      </Link>
    </div>
  );
};

export default Item;
