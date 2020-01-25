import React from "react";
import classes from "./Header.module.css";
import HeaderImage from "../../img/header.jpg";
const Header = () => {
  return (
    <>
      <div className={classes.Header}>
        <h1>Find your favourite films & TV shows!</h1>
        <img src={HeaderImage} alt="Header" className={classes.Image} />
        <div className={classes.ScrollDown}></div>
      </div>
    </>
  );
};

export default Header;
