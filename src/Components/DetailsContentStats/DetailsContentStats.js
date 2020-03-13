import React, { useState } from "react";
import classes from "./DetailsContentStats.module.css";
import ContentDetails from "../ContentDetails/ContentDetails";

const DetailsContentStats = ({ type, data, contentId }) => {
  const [showModal, setShowModal] = useState(false);

  const modalHandler = show => {
    setShowModal(show);
  };

  return (
    <div className={classes.TopDetailRight}>
      <h2 className={classes.Title}>{data.title || data.name}</h2>
      <p className={classes.Description}>{data.overview}</p>
      <p className="margin-top">
        Popularity: {data.popularity ? data.popularity : "/"}
      </p>
      <p>Average Rating: {data.vote_average}</p>
      <p>Votes: {data.vote_count}</p>
      <ContentDetails
        showModal={showModal}
        type={type}
        contentId={contentId}
        setShowModal={modalHandler}
        data={data}
      />
    </div>
  );
};

export default DetailsContentStats;
