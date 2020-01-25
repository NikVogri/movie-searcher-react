import React from "react";
import classes from "./actor.module.css";
import MissingPoster from "../../../img/noPoster.jpeg";
const actor = ({ profile_path, name, character }) => {
  return (
    <div className={classes.Actor}>
      <img
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : MissingPoster
        }
        alt="cast member"
        className={classes.ActorImage}
      />
      <p className={classes.CharacterName}>{character}</p>
      <p className={classes.Name}>{name}</p>
    </div>
  );
};

export default actor;
