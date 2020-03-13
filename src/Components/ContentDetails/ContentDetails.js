import React from "react";
import classes from "./ContentDetails.module.css";
import SeriesOverlay from "../SeriesOverlay/SeriesOverlay";

const ContentDetails = ({ type, data, setShowModal, showModal, contentId }) => {
  if (type === "movie") {
    return (
      <>
        <p className="margin-top">
          Budget: {data.budget ? `$${data.budget.toLocaleString()}` : " /"}
        </p>
        <p>
          Revenue: {data.revenue ? `$${data.revenue.toLocaleString()}` : " /"}
        </p>
        {data.homepage ? (
          <a href={data.homepage} className={classes.Homepage}>
            Homepage
          </a>
        ) : null}{" "}
      </>
    );
  }

  if (type === "tv") {
    return (
      <>
        <span
          onClick={() => setShowModal(true)}
          className={classes.showEpisodes}
        >
          Show Episodes
        </span>
        <SeriesOverlay
          show={showModal}
          setShowModal={() => setShowModal(false)}
          showId={contentId}
          numberOfSeasons={data.number_of_seasons}
        />
        <p className="margin-top">Episodes: {data.number_of_episodes}</p>
        <p>Seasons: {data.number_of_seasons}</p>
        {data.homepage ? (
          <a href={data.homepage} className={classes.Homepage}>
            Homepage
          </a>
        ) : null}
      </>
    );
  }
  return <div></div>;
};

export default ContentDetails;
