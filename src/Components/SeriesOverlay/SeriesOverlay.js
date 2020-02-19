import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import classes from "./SeriesOverlay.module.css";
import Spinner from "../Spinner/Spinner";
import SeriesOverlayBackdrop from "./SeriesOverlayBackdrop/SeriesOverlayBackdrop";
import Episode from "./Episode/Episode";
const SeriesOverlay = ({ showId, show, setShowModal, numberOfSeasons }) => {
  const [seasonNumber, setSeasonNumber] = useState(1);
  const seasonData = useFetch(
    `/tv/${showId}/season/${seasonNumber}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`
  );
  let render;
  if (seasonData.loading) {
    render = <Spinner />;
  } else if (seasonData.data) {
    render = (
      <div className={classes.episodeContainer}>
        {/* episodes go here */}
        {seasonData.data.episodes.map((episode, index) => (
          <Episode
            key={index}
            episodeTitle={episode.name}
            seasonNumber={episode.season_number}
            episodeNumber={episode.episode_number}
            image={episode.still_path}
            description={episode.overview}
          />
        ))}
      </div>
    );
  }

  if (show) {
    return (
      <>
        <div className={classes.modal}>
          <SeriesOverlayBackdrop show={show} setShow={setShowModal} />
          <div
            className={`${classes.modalInner} ${show ? classes.active : null}`}
          >
            <span
              className={classes.closeModal}
              onClick={setShowModal}
              role="img"
              aria-label="close modal"
            >
              &#10060;
            </span>
            <select
              className={classes.seasonSelector}
              onChange={e => setSeasonNumber(e.target.value)}
            >
              {[...Array(numberOfSeasons)].map((_, index) => (
                <option key={index} value={`${index + 1}`}>
                  Season {index + 1}
                </option>
              ))}
            </select>
            {render}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default SeriesOverlay;
