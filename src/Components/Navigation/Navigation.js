import React from 'react';
import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.InnerNav}>
        <h3>Film<span style={{ color: 'red' }}>etor</span></h3>
        <ul className={classes.NavList}>
          <li><a href="/">Find</a></li>
          <li><a href="/">Discover</a></li>
          <li><a href="/">Favourites</a></li>
          <li><a href="/">About</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
