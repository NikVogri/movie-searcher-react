import React from 'react';
import classes from './actor.module.css';
import Actor from '../../../../img/actor.jpg';
const actor = () => {
  return (
    <div className={classes.Actor}>
      <img src={Actor} alt="cast member" className={classes.ActorImage} />
      <p className={classes.CharacterName}>Arthur Fleck / Joker</p>
      <p className={classes.Name}>Joaquin Phoenix</p>
    </div>
  );
}

export default actor;
