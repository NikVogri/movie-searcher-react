import React, { useState, useEffect } from 'react';
import classes from './Search.module.css';
import Item from '../../Components/Item/Item';
import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

const Search = () => {
  const [results, setResults] = useState([]);
  const [selectValue, setselectValue] = useState('movie');
  const [inputValue, setinputValue] = useState('');
  const [firstMount, setfirstMount] = useState(true)
  const [loading, setLoading] = useState(false);
  const [noResults, setnoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (!firstMount && inputValue !== '') {
      inputChangeHandler();
    }
    setfirstMount(false);
  }, [inputValue, selectValue])

  const inputChangeHandler = () => {
    setLoading(true);
    axios.get(`https://api.themoviedb.org/3/search/${selectValue}?api_key=dce6a338a810ffe30be7528d9a32bf13&query=${inputValue}&page=1&include_adult=false`)
      .then(res => {
        setResults(res.data.results);
        setLoading(false);
        setnoResults(false);
        if (res.data.total_results === 0) {
          setnoResults(true);
        }
      })
      .catch(err => { console.log(err); setLoading(false); });
  };

  let render = null;
  // check if state has any results
  if (results) {
    render = results.map(el => {
      // check if the movie has been recently updated and or has any traction at all. This is mostly for fetching sake.
      if (el.popularity >= 1) {
        return <Item key={el.id} id={el.id} title={el.title} image={el.poster_path} voteAverage={el.vote_average} votes={el.vote_count} popularity={el.popularity} description={el.overview} releaseDate={el.release_date} />
      }
      return null;
    })
  }

  if (loading) {
    render = <Spinner />
  }

  if (noResults) {
    render = <h3 style={{ fontSize: '22px', color: '#fff' }}>No results found!</h3>
  }

  return (
    <div className={classes.Search}>
      <form onSubmit={e => e.preventDefault()}>
        <select onChange={e => setselectValue(e.target.value)}>
          <option value='movie'>Movies</option>
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
