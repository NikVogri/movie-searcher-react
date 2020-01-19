import React from 'react';
import classes from './reviews.module.css';
import Review from './review/review';
const reviews = () => {
  return (
    <div className={classes.Reviews}>
      <div className='container'>
        <div className={classes.UserReview}>
          <h2>Reviews</h2>
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </div>
    </div>
  );
}

export default reviews;
