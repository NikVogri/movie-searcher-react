import React, { useState, useEffect } from 'react';
import classes from './Showcase.module.css';
import Popular from '../../Components/Popular/Popular';
import PopularTV from '../../Components/Popular/PopularTV/PopularTV';
import Header from '../Header/Header';
import Axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

const Showcase = () => {
  const [topList, settopList] = useState([]);
  const [TVtopList, setTVtopList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (topList.length === 0) {
        const movieData = await Axios.get('https://api.themoviedb.org/3/discover/movie?api_key=dce6a338a810ffe30be7528d9a32bf13&sort_by=popularity.desc&include_adult=false&&page=1');
        settopList(movieData.data.results.splice(0, 5))
      };
      const tvData = await Axios.get('https://api.themoviedb.org/3/discover/tv?api_key=dce6a338a810ffe30be7528d9a32bf13&sort_by=popularity.desc&include_adult=false&&page=1');
      setTVtopList(tvData.data.results.splice(0, 5))
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  let render = null;
  if (topList.length !== 0 && TVtopList.length !== 0 && loading === false) {
    console.log('fulfilled')
    console.log(topList, TVtopList)
    render = (
      <div className={classes.TopContainer}>
        <h2 style={{ color: 'white' }}>Trending movies now</h2>
        <Popular movieTopList={topList} />
        <h2 style={{ color: 'white' }}>Trending TV now</h2>
        <PopularTV tvTopList={TVtopList} />
      </div>);
  } else {
    render = <Spinner />
  }

  if (error) {
    render = <p style={{ color: 'white', fontSize: '25px' }}>Error getting data, please try refreshing the page!</p>
  }
  return (
    <React.Fragment>
      <Header />
      <div className={classes.Showcase}>
        {render}
      </div>
    </React.Fragment>
  );
}

export default Showcase;
