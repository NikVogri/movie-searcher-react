import React from 'react';
import classes from './actor.module.css';
import MissingPoster from '../../../../img/noPoster.jpeg';
const actor = (props) => {
  return (
    <div className={classes.Actor}>
      <img src={props.profile_path ? `https://image.tmdb.org/t/p/w500${props.profile_path}` : MissingPoster} alt="cast member" className={classes.ActorImage} />
      <p className={classes.CharacterName}>{props.character}</p>
      <p className={classes.Name}>{props.name}</p>
    </div>
  );
}

export default actor;
