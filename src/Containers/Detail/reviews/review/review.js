import React from "react";
import classes from "./review.module.css";
import ShowMoreText from "react-show-more-text";
const Review = ({ author, content }) => {
  return (
    <div className={classes.Review}>
      <p className={classes.Username}>{author}</p>
      <ShowMoreText
        lines={3}
        more="Show more..."
        less="...Show less"
        anchorClass={classes.ContinueReading}
        expanded={false}
      >
        {content}
      </ShowMoreText>
    </div>
  );
};

export default Review;
