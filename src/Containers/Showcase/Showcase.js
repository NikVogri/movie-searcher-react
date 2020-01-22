import React, { useState } from 'react';
import classes from './Showcase.module.css';
import Popular from '../../Components/Popular/Popular';
import PopularTV from '../../Components/Popular/PopularTV/PopularTV';
import Header from '../../Components/Header/Header';
import useFetch from '../../Hooks/useFetch';
import Spinner from '../../Components/Spinner/Spinner';
const Showcase = () => {
  const [showButtonClickedMovie, setShowButtonClickedMovie] = useState(5);
  const [showButtonClickedTV, setShowButtonClickedTV] = useState(5);

  const movieData = useFetch('/trending/movie/week?api_key=dce6a338a810ffe30be7528d9a32bf13');
  const tvData = useFetch('/trending/tv/week?api_key=dce6a338a810ffe30be7528d9a32bf13');

  const showNext = (type) => {
    if (type === 'movie') {
      setShowButtonClickedMovie(20);
      if (showButtonClickedMovie === 20) {
        setShowButtonClickedMovie(5);
      }
    } else if (type === 'tv') {
      setShowButtonClickedTV(20);
      if (showButtonClickedTV === 20) {
        setShowButtonClickedTV(5);
      }
    };
  };

  let renderTopMovies;
  let renderTopTv;
  if (movieData.data && movieData.data.results.length > 1) {
    renderTopMovies = (
      <div className={classes.TopMovieSection}>
        <Popular movieTopList={movieData.data.results} numberToDisplay={showButtonClickedMovie} />
        <p className={classes.NextButton} onClick={() => showNext('movie')}>Show {showButtonClickedMovie === 20 ? 'Less' : 'More'}</p>
      </div>);
  } else if (movieData.error) {
    renderTopMovies = <p className={classes.ErrorMessage}>Failed to load data, please refresh the page!</p>
  } else {
    renderTopMovies = <Spinner />
  }

  if (tvData.data && tvData.data.results.length > 1) {
    renderTopTv = (
      <div className={classes.TopTVSection}>
        <PopularTV tvTopList={tvData.data.results} numberToDisplay={showButtonClickedTV} />
        <p className={classes.NextButton} onClick={() => showNext('tv')}>Show {showButtonClickedTV === 20 ? 'Less' : 'More'}</p>
      </div>
    );
  } else if (tvData.error) {
    renderTopTv = <p className={classes.ErrorMessage}>Failed to load data, please refresh the page!</p>
  } else {
    renderTopTv = <Spinner />
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.Showcase}>
        <div className={classes.InnerShowcase}>
          <div className={classes.TopContainer}>
            <h2 style={{ color: 'white' }}>Trending weekly movies</h2>
            {renderTopMovies}
            <h2 style={{ color: 'white' }}>Trending weekly TV</h2>
            {renderTopTv}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Showcase;
