import React, { useState, useEffect } from 'react';
import classes from './Showcase.module.css';
import Popular from '../../Components/Popular/Popular';
import PopularTV from '../../Components/Popular/PopularTV/PopularTV';
import Header from '../Header/Header';
import Axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

const Showcase = () => {
  const [fetchedMovie, setFetchedMovie] = useState([]);
  const [fetchedTV, setFetchedTv] = useState([]);
  const [topList, setTopList] = useState([]);
  const [TVtopList, setTVtopList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showButtonClickedMovie, setShowButtonClickedMovie] = useState(false);
  const [showButtonClickedTV, setShowButtonClickedTV] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (topList.length === 0) {
          const movieData = await Axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=dce6a338a810ffe30be7528d9a32bf13');
          console.log(movieData);
          setFetchedMovie(movieData.data.results);
          setTopList(movieData.data.results.slice(0, 5));
        };
        const tvData = await Axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=dce6a338a810ffe30be7528d9a32bf13');
        setTVtopList(tvData.data.results.slice(0, 5));
        setFetchedTv(tvData.data.results);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [topList]);


  const showNext = (type) => {
    if (type === 'movie') {
      setTopList(fetchedMovie.slice(0, 20));
      setShowButtonClickedMovie(true);
      if (showButtonClickedMovie) {
        setTopList(fetchedMovie.slice(0, 5));
        setShowButtonClickedMovie(false);
      }
    }
    if (type === 'tv') {
      setTVtopList(fetchedTV.slice(0, 20));
      setShowButtonClickedTV(true);
      if (showButtonClickedTV) {
        setTVtopList(fetchedTV.slice(0, 5));
        setShowButtonClickedTV(false);
      }
    }
  };

  let render = null;
  // This is for initial render, check if anything loaded & show spinner if it did not.
  if (fetchedMovie.length !== 0 && fetchedTV.length !== 0 && loading === false) {
    render = (
      <div className={classes.TopContainer}>
        <h2 style={{ color: 'white' }}>Trending weekly movies</h2>
        <div className={classes.TopMovieSection}>
          <Popular movieTopList={topList} />
          <p className={classes.NextButton} onClick={() => showNext('movie')}>Show {showButtonClickedMovie ? 'Less' : 'More'}</p>
        </div>
        <h2 style={{ color: 'white' }}>Trending weekly TV</h2>
        <div className={classes.TopTVSection}>
          <PopularTV tvTopList={TVtopList} />
          <p className={classes.NextButton} onClick={() => showNext('tv')}>Show {showButtonClickedTV ? 'Less' : 'More'}</p>
        </div>
      </div>);
  } else {
    render = <Spinner />
  }
  // checks if theres an error.
  if (error) {
    render = <p style={{ color: 'white', fontSize: '25px' }}>Error getting data, please try refreshing the page!</p>
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.Showcase}>
        <div className={classes.InnerShowcase}>
          {render}
        </div>

      </div>
    </React.Fragment>
  );
}

export default Showcase;
