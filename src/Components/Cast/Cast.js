import React, { useState } from "react";
import classes from "./Cast.module.css";
import Actor from "./actor/actor";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../Spinner/Spinner";

const ContentCast = ({ type, contentId }) => {
  const [viewCastNumber, setViewCastNumber] = useState(10);

  // on button click shows 20 or 10 cast members.
  const viewMoreCast = () => {
    if (viewCastNumber === 10) {
      setViewCastNumber(20);
      return;
    }
    setViewCastNumber(10);
  };

  let render;
  const fetchedData = useFetch(
    `/${type}/${contentId}/credits?api_key=dce6a338a810ffe30be7528d9a32bf13`,
    null
  );

  // checks if there is data - this is to avoid unecessary errors
  if (fetchedData.data && fetchedData.data.cast.length !== 0) {
    const cast = fetchedData.data.cast.slice(0, viewCastNumber);
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
  // displays spinner while fetching data
  if (fetchedData.loading) render = <Spinner />;

  return (
    <div className={classes.ContentCast}>
      <div className="container">
        <div className={classes.TopCast}>
          <h2>Cast</h2>
          <div className={classes.CastContainer}>{render}</div>
          {fetchedData.data ? (
            fetchedData.data.cast.length > 10 ? (
              <p onClick={viewMoreCast} className={classes.Expand}>
                {viewCastNumber === 10 ? `Show more` : `Show less`}
              </p>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContentCast;
