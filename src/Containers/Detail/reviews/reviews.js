import React, { useEffect, useState } from 'react';
import classes from './reviews.module.css';
import Review from './review/review';
import axios from 'axios';

const Reviews = (props) => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}/reviews?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`)
        .then(res => setAboutData(res.data.results.slice(0, 5)));
    }
    getData();
  }, [props.contentId]);
  let render;
  if (aboutData && aboutData.length !== 0) {
    render = aboutData.map(review => <Review key={review.id}{...review} />)
  } else {
    render = <p>No reviews found</p>;
  }

  return (
    <div className={classes.Reviews}>
      <div className='container'>
        <div className={classes.UserReview}>
          <h2>Reviews</h2>
          {render}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
