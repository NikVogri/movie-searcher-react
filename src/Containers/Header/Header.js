import React, { useState } from 'react';
import classes from './Header.module.css'

const Header = (props) => {
  const [query, setQuery] = useState('');

  return (
    <div className={classes.Header}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input className={classes.Input} placeholder="Find your favourite movies..." onChange={(e) => setQuery(e.target.value)} />
        <button className={classes.SearchButton} type="submit"><i className="fas fa-search SearchIcon" onClick={() => props.getQuery(query)} /></button>
      </form>
    </div >
  );
}

export default Header;
