import React, { useEffect } from "react";
import classes from "./Details.module.css";
import MissingPoster from "../../img/noPoster.jpeg";
import Spinner from "../Spinner/Spinner";
import DetailsContentStats from "../DetailsContentStats/DetailsContentStats";
import IconContainer from "../IconContainer/IconContainer";
import Watched from "../Watched/Watched";

import useFetch from "../../Hooks/useFetch";
import { connect } from "react-redux";
import {
  addToWatched,
  checkIfAlreadyOnWatched
} from "../../redux/actions/actionCreator";
const ContentDetails = ({
  type,
  contentId,
  token,
  addToWatched,
  checkIfAlreadyOnWatched,
  watched,
  message
}) => {
  // get arbitrary data from API
  const aboutData = useFetch(
    `/${type}/${contentId}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`
  );
  // get external links data from API
  const externalIdData = useFetch(
    `/${type}/${contentId}/external_ids?api_key=dce6a338a810ffe30be7528d9a32bf13`
  );
  // add movie to watched
  let watchedRender;
  const addToWatchedHandler = () => {
    addToWatched(
      {
        contentId: contentId,
        contentType: type,
        name: aboutData.data.title || aboutData.data.name,
        imagePath: aboutData.data.poster_path || "/noImage"
      },
      token
    );
    watchedRender = (
      <Watched alreadyWatched={!watched} addToWatched={addToWatchedHandler} />
    );
  };

  useEffect(() => {
    if (token) {
      checkIfAlreadyOnWatched(contentId, token);
    }
  }, [contentId, token, checkIfAlreadyOnWatched, message]);

  if (aboutData.loading || externalIdData.loading) {
    return <Spinner style={{ height: "100vh" }} />;
  }
  return (
    <div className={classes.Detail}>
      {aboutData.error ||
        (externalIdData.error && (
          <p className="error-message ">
            Error fetching data, please refresh the website!
          </p>
        ))}
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
            {token &&
              (watchedRender || (
                <Watched
                  alreadyWatched={!watched}
                  addToWatched={addToWatchedHandler}
                />
              ))}
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
            <IconContainer data={externalIdData.data} />
          </div>
          <DetailsContentStats
            contentId={contentId}
            type={type}
            data={aboutData.data}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.user.token,
  watched: state.watched.alreadyWatched,
  message: state.watched.message
});

const mapDispatchToProps = {
  addToWatched,
  checkIfAlreadyOnWatched
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetails);
