import React, { useState } from "react";
import classes from "./Cast.module.css";
import Actor from "./actor/actor";
import useFetch from "../../Hooks/useFetch";
const ContentCast = ({ type, contentId }) => {
  let render;
  const fetchedData = useFetch(
    `/${type}/${contentId}/credits?api_key=dce6a338a810ffe30be7528d9a32bf13`,
    null
  );

  // checks if there is data - this is to avoid unecessary errors
  if (fetchedData.data && fetchedData.data.cast.length !== 0) {
    const cast = fetchedData.data.cast.slice(0, 20);
    // map over all cast members
    render = cast.map(castMember => (
      <Actor key={castMember.id} {...castMember} />
    ));
  } else {
    // in case of no items found then display this
    render = <p className="error-message">No actors or actresses found</p>;
  }
  // in case of an error display error message
  if (fetchedData.error)
    render = (
      <p className="error-message">
        Error loading data, please refresh the page!
      </p>
    );
  return (
    <div className={classes.ContentCast}>
      <div className="container">
        <div className={classes.TopCast}>
          <h2>Cast</h2>
          <div className={classes.CastContainer}>{render}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentCast;
