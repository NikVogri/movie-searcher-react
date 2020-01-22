import React from 'react';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.InnerNav}>
        <NavLink to="/"><h3>Film<span style={{ color: 'red' }}>etor</span></h3></NavLink>
        <ul className={classes.NavList}>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
          <li><NavLink to="/favourites">My List</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
