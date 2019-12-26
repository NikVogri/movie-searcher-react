import React from 'react';
import classes from './Header.module.css'
import Navigation from '../../Components/Navigation/Navigation';
import HeaderImage from '../../img/header.png';
const Header = (props) => {


  return (
    <React.Fragment>
      <Navigation />
      <div className={classes.Header}>
        <h1>Find your favourite films & TV shows!</h1>
        <img src={HeaderImage} alt="Header" className={classes.Image} />
        <div className={classes.ScrollDown}></div>
      </div >
    </React.Fragment>
  );
}

export default Header;
