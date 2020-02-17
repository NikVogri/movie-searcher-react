import React from "react";
import classes from "./reviews.module.css";
import Review from "./review/review";
import useFetch from "../../Hooks/useFetch";

const Reviews = ({ type, contentId }) => {
  const aboutData = useFetch(
    `/${type}/${contentId}/reviews?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`
  );

  let render;
  // checks if all data is loaded, if none or if there's an error it returns a message.
  if (aboutData.data && aboutData.data.results.length !== 0) {
    render = aboutData.data.results.map(review => (
      <Review key={review.id} {...review} />
    ));
  } else {
    render = <p className="error-message">No reviews found</p>;
  }
  if (aboutData.error)
    render = (
      <p className="error-message">
        Error loading data, please refresh the page!
      </p>
    );
  return (
    <div className={classes.Reviews}>
      <div className="container">
        <div className={classes.UserReview}>
          <h2>Reviews</h2>
          {render}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
