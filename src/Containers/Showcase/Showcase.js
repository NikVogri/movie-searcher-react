import React, { useState } from "react";
import classes from "./Showcase.module.css";
import ItemList from "../../Components/ItemList/ItemList";
import Header from "../../Components/Header/Header";
import useFetch from "../../Hooks/useFetch";
import Spinner from "../../Components/Spinner/Spinner";

const Showcase = () => {
  const [showButtonClickedMovie, setShowButtonClickedMovie] = useState(7);
  const [showButtonClickedTV, setShowButtonClickedTV] = useState(7);

  const movieData = useFetch(
    "/trending/movie/week?api_key=dce6a338a810ffe30be7528d9a32bf13"
  );
  const tvData = useFetch(
    "/trending/tv/week?api_key=dce6a338a810ffe30be7528d9a32bf13"
  );
  // const peopleData = useFetch(
  //   "/person/popular?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US"
  // );
  const showNext = type => {
    if (type === "movie") {
      setShowButtonClickedMovie(20);
      if (showButtonClickedMovie === 20) {
        setShowButtonClickedMovie(7);
      }
    } else if (type === "tv") {
      setShowButtonClickedTV(20);
      if (showButtonClickedTV === 20) {
        setShowButtonClickedTV(7);
      }
    }
  };

  let renderTopMovies;
  let renderTopTv;
  // let renderTopPeople;
  // For movies
  if (movieData.data && movieData.data.results.length > 1) {
    renderTopMovies = (
      <div className={classes.topSection}>
        <ItemList
          items={movieData.data.results}
          numberToDisplay={showButtonClickedMovie}
        />
        <p className={classes.NextButton} onClick={() => showNext("movie")}>
          Show {showButtonClickedMovie === 20 ? "Less" : "More"}
        </p>
      </div>
    );
  } else if (movieData.error) {
    renderTopMovies = (
      <p className={classes.ErrorMessage}>
        Failed to load data, please refresh the page!
      </p>
    );
  } else {
    renderTopMovies = <Spinner />;
  }
  // for TV shows
  if (tvData.data && tvData.data.results.length > 1) {
    renderTopTv = (
      <div className={classes.topSection}>
        <ItemList
          items={tvData.data.results}
          numberToDisplay={showButtonClickedTV}
          type="tv"
        />
        <p className={classes.NextButton} onClick={() => showNext("tv")}>
          Show {showButtonClickedTV === 20 ? "Less" : "More"}
        </p>
      </div>
    );
  } else if (tvData.error) {
    renderTopTv = (
      <p className={classes.ErrorMessage}>
        Failed to load data, please refresh the page!
      </p>
    );
  } else {
    renderTopTv = <Spinner />;
  }
  return (
    <React.Fragment>
      <Header />
      <div className={classes.Showcase}>
        <div className={classes.InnerShowcase}>
          <h2 style={{ color: "white" }}>Trending weekly movies</h2>
          {renderTopMovies}
          <h2 style={{ color: "white" }}>Trending weekly TV</h2>
          {renderTopTv}
          {/* <h2 style={{ color: "white" }}>Trending people</h2>
          {renderTopPeople} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Showcase;
