import React from 'react';
import classes from './reviews.module.css';
import Review from './review/review';
import useFetch from '../../../Hooks/useFetch';
import Spinner from '../../../Components/Spinner/Spinner';

const Reviews = (props) => {
  const aboutData = useFetch(`/movie/${props.contentId}/reviews?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`);

  let render;
  if (aboutData.data && aboutData.data.results !== 0) {
    render = aboutData.data.results.map(review => <Review key={review.id}{...review} />)
  } else {
    render = <p>No reviews found</p>;
  }

  if (aboutData.error) render = <p>Error loading data, please refresh the page!</p>;
  if (aboutData.loading) render = <Spinner />
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
