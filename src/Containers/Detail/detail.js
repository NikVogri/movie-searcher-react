import React from 'react';
import classes from './detail.module.css';
import ContentDetails from './content-details/content-details';
import ContentCast from './content-cast/content-cast';
import Reviews from './reviews/reviews';
import Similar from './similar/similar';

const Detail = () => {
  return (
    <div>
      <ContentDetails />
      <ContentCast />
      <Reviews />
      <Similar />
    </div>
  );
}

export default Detail;
