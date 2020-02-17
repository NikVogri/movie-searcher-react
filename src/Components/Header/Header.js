import React from "react";
import classes from "./Header.module.css";
// import HeaderImage from "../../img/header.jpg";
const Header = () => {
  return (
    <>
      <div className={classes.Header}>
        <h1>Find your favourite films & TV shows!</h1>
        {/* <img src={HeaderImage} alt="Header" className={classes.Image} /> */}
        <iframe
          title="header video"
          className={classes.Image}
          src="https://www.youtube.com/embed/zAGVQLHvwOY?autoplay=1&mute=1"
          frameborder="0"
          autoplay="1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className={classes.ScrollDown}></div>
      </div>
    </>
  );
};

export default Header;
