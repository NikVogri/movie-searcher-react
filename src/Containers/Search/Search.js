import React, { useState, useEffect } from 'react';
import classes from './Search.module.css';
import Item from '../../Components/Item/Item';
import axios from 'axios';
import MissingPoster from '../../img/poster.jpg';
const Search = () => {
  const [results, setResults] = useState([]);
  const [selectValue, setselectValue] = useState('movie');
  const [inputValue, setinputValue] = useState('');
  const [firstMount, setfirstMount] = useState(true)

  useEffect(() => {
    if (!firstMount && inputValue !== '') {
      inputChangeHandler();
    }
    setfirstMount(false);
  }, [inputValue, selectValue])

  const inputChangeHandler = () => {
    axios.get(`https://api.themoviedb.org/3/search/${selectValue}?api_key=dce6a338a810ffe30be7528d9a32bf13&query=${inputValue}&page=1&include_adult=false&vote_count.gte=1`)
      .then(res => setResults(res.data.results))
      .catch(err => console.log(err));
  };

  let render = null;
  // check if state has any results
  if (results) {
    render = results.map(el => {
      // check if the movie has been recently updated and or has any traction at all. this is mostly for fetching sake.
      if (el.popularity >= 1) {
        return <Item key={el.id} title={el.title} image={el.poster_path} voteAverage={el.vote_average} votes={el.vote_count} popularity={el.popularity} description={el.overview} releaseDate={el.release_date}/>
      }
      return null;
    })
  }

  return (
    <div className={classes.Search}>
      <form onSubmit={e => e.preventDefault()}>
        <select onChange={e => setselectValue(e.target.value)}>
          <option value='el'>Movies</option>
          <option value='tv'>TV</option>
        </select>
        <input className={classes.Input} onChange={e => setinputValue(e.target.value)} />
      </form>
      <div className={classes.MovieList}>
        {render}
      </div>
    </div>
  );
}

export default Search;
