import React from "react";
import classes from "./IconContainer.module.css";

const IconContainer = ({ data }) => {
  return (
    <div className={classes.IconContainer}>
      <a href={`https://www.imdb.com/title/${data.imdb_id}/`} aria-label="imdb">
        <span className="hideme">hideme</span>
        <i
          className="fab fa-imdb margin-top"
          aria-hidden="true"
          alt="imdb logo"
        ></i>
      </a>
      <a
        href={`https://www.facebook.com/${data.facebook_id}/`}
        aria-label="facebook"
      >
        <span className="hideme">hideme</span>
        <i className="fab fa-facebook" aria-hidden="true"></i>
      </a>
      <a
        href={`https://www.twitter.com/${data.twitter_id}/`}
        aria-label="twitter"
      >
        <span className="hideme">hideme</span>
        <i className="fab fa-twitter" aria-hidden="true"></i>
      </a>
      <a
        href={`https://www.instagram.com/${data.instagram_id}/`}
        aria-label="instagram"
      >
        <span className="hideme">hideme</span>
        <i className="fab fa-instagram" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default IconContainer;
