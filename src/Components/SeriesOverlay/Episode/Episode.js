import React from "react";
import classes from "./Episode.module.css";
const Episode = ({
  episodeTitle,
  seasonNumber,
  episodeNumber,
  image,
  description
}) => {
  return (
    <div className={classes.episode}>
      <div className={classes.information}>
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt="episode 1"
          className={classes.episode}
        />
      </div>
      <div className={classes.episodeText}>
        <h4>
          {episodeTitle} - <span>S{seasonNumber}</span>{" "}
          <span>E{episodeNumber}</span>
        </h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Episode;
