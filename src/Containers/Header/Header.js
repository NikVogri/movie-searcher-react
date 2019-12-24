import React, { useState } from 'react';
import classes from './Header.module.css'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onInputHandler = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className={classes.Header}>
      <input className={classes.Input} placeholder="Find your favourite movies..." onChange={(e) => onInputHandler(e)} value={searchQuery} />
    </div>
  );
}

export default Header;
