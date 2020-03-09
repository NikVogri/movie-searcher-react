import React, { useState } from "react";
import classes from "./details.module.css";
import MissingPoster from "../../img/noPoster.jpeg";
import Spinner from "../Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";
import saveToLocalStorage from "../../Util/saveToLocalStorage";
import SeriesOverlay from "../SeriesOverlay/SeriesOverlay";
const ContentDetails = ({ type, contentId }) => {
  const [showModal, setShowModal] = useState(false);

  // get arbitrary data from API
  const aboutData = useFetch(
    `/${type}/${contentId}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`
  );
  // get external links data from API
  const externalIdData = useFetch(
    `/${type}/${contentId}/external_ids?api_key=dce6a338a810ffe30be7528d9a32bf13`
  );

  let render;
  if (aboutData.loading || externalIdData.loading) {
    // waits until all data is fetched else it shows a spinner
    render = <Spinner style={{ height: "100vh" }} />;
  } else if (aboutData.error || externalIdData.error) {
    render = (
      <p className="error-message ">
        Error fetching data, please refresh the website!
      </p>
    );
  } else {
    let details;
    if (type === "movie") {
      // if data is for a movie renders this
      details = (
        <>
          <p className="margin-top">
            Budget:{" "}
            {aboutData.data.budget
              ? `$${aboutData.data.budget.toLocaleString()}`
              : " /"}
          </p>
          <p>
            Revenue:{" "}
            {aboutData.data.revenue
              ? `$${aboutData.data.revenue.toLocaleString()}`
              : " /"}
          </p>
          {aboutData.data.homepage ? (
            <a href={aboutData.data.homepage} className={classes.Homepage}>
              Homepage
            </a>
          ) : null}{" "}
        </>
      );
    } else if (type === "tv") {
      // if data is for a tv show render this
      details = (
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
            numberOfSeasons={aboutData.data.number_of_seasons}
          />
          <p className="margin-top">
            Episodes: {aboutData.data.number_of_episodes}
          </p>
          <p>Seasons: {aboutData.data.number_of_seasons}</p>
          {aboutData.data.homepage ? (
            <a href={aboutData.data.homepage} className={classes.Homepage}>
              Homepage
            </a>
          ) : null}
        </>
      );
    }

    render = (
      <div className="container">
        <div className={classes.TopDetails}>
          <div className={classes.TopDetailLeft}>
            <img
              title={aboutData.data.title || aboutData.data.name}
              src={
                aboutData.data.poster_path
                  ? `https://image.tmdb.org/t/p/w500${aboutData.data.poster_path}`
                  : MissingPoster
              }
              className={classes.TopDetailImage}
              alt="movie poster"
            />
            <div className={classes.Watched}>
              <i
                className="fa fa-eye"
                aria-hidden="true"
                title="Add to watched"
                onClick={() => console.log("add to watched here")}
              />
            </div>
            <p className={classes.Date}>
              {aboutData.data.release_date
                ? aboutData.data.release_date
                    .split("-")
                    .reverse()
                    .join("/")
                : null || aboutData.data.last_air_date
                ? aboutData.data.last_air_date
                    .split("-")
                    .reverse()
                    .join("/")
                : null}
            </p>
            <div className={classes.Genre}>
              {aboutData.data.genres
                ? aboutData.data.genres
                    .slice(0, 3)
                    .map(el => <p key={el.id}>{el.name}</p>)
                : null}
            </div>
            <div className={classes.IconContainer}>
              <a
                href={`https://www.imdb.com/title/${externalIdData.data.imdb_id}/`}
                aria-label="imdb"
              >
                <span className="hideme">hideme</span>
                <i
                  className="fab fa-imdb margin-top"
                  aria-hidden="true"
                  alt="imdb logo"
                ></i>
              </a>
              <a
                href={`https://www.facebook.com/${externalIdData.data.facebook_id}/`}
                aria-label="facebook"
              >
                <span className="hideme">hideme</span>
                <i className="fab fa-facebook" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.twitter.com/${externalIdData.data.twitter_id}/`}
                aria-label="twitter"
              >
                <span className="hideme">hideme</span>
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.instagram.com/${externalIdData.data.instagram_id}/`}
                aria-label="instagram"
              >
                <span className="hideme">hideme</span>
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className={classes.TopDetailRight}>
            <h2 className={classes.Title}>
              {aboutData.data.title || aboutData.data.name}
            </h2>
            <p className={classes.Description}>{aboutData.data.overview}</p>
            <p className="margin-top">
              Popularity:{" "}
              {aboutData.data.popularity ? aboutData.data.popularity : "/"}
            </p>
            <p>Average Rating: {aboutData.data.vote_average}</p>
            <p>Votes: {aboutData.data.vote_count}</p>
            {details}
          </div>
        </div>
      </div>
    );
  }

  return <div className={classes.Detail}>{render}</div>;
};

export default ContentDetails;
