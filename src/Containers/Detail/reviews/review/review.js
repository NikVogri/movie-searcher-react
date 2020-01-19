import React from 'react';
import classes from './review.module.css';
const review = () => {
  return (
    <div className={classes.Review}>
      <p className={classes.Username}>ikomrad says:</p>
      <p className={classes.Comment}>The Joker is similar to the DC Joker character but is not a criminal genius. The movie was a great depiction of how a person who has been mistreated, lied to, and ignored, totally lacking access to human compassion, can snap. The acting is top notch, and it puts a spotlight on the importance of mental health in modern times.</p>
    </div>
  );
}

export default review;
