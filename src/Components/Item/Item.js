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
              image && image !== "/noImage"
                ? `https://image.tmdb.org/t/p/w500${image}`
                : MissingPoster
            }
            alt="movie poster"
            className={classes.TopImage}
          />
          <h3 className={classes.contentTitle}>
            {title.length > 30 ? title.slice(0, 30).concat("...") : title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Item;
