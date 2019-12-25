import React, { useState, useEffect } from 'react';
import classes from './Showcase.module.css';
import PopularMovies from '../../Components/PopularMovies/PopularMovies';
import Axios from 'axios';

const Showcase = () => {
  const [topList, settopList] = useState([]);

  useEffect(() => {
    Axios.get('https://api.themoviedb.org/3/discover/movie?api_key=dce6a338a810ffe30be7528d9a32bf13&sort_by=popularity.desc&include_adult=false&&page=1')
      .then(res => { settopList(res.data.results.splice(0, 5)); }).catch(err => console.log(err));
  }, []);
  console.log(topList)
  return (
    <div className={classes.Showcase}>
      <div className={classes.TopContainer}>
        <h2>Trending</h2>
        <PopularMovies movieTopList={topList} />
      </div>
    </div>
  );
}

export default Showcase;
