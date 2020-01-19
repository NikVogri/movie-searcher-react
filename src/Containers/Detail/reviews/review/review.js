import React from 'react';
import classes from './review.module.css';
const review = (props) => {
  return (
    <div className={classes.Review}>
      <p className={classes.Username}>{props.author}</p>
      <p className={classes.Comment}>{props.content}</p>
    </div>
  );
}

export default review;
