import React from "react";
import classes from "./Header.module.css";
import HeaderImage from "../../img/header.jpg";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

const Header = () => {
  let headerMedia;
  if (isMobile) {
    headerMedia = (
      <img src={HeaderImage} alt="Header" className={classes.Image} />
    );
  } else {
    headerMedia = (
      <div className={classes.videoContainer}>
        <iframe
          title="header video"
          className={classes.desktopVideo}
          src="https://www.youtube.com/embed/zAGVQLHvwOY?autoplay=1&mute=1&loop=1&showinfo=0&controls=0&iv_load_policy=3"
          frameborder="0"
          autoPlay="1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          loop="1"
        ></iframe>
      </div>
    );
  }
  return (
    <>
      <div className={classes.Header}>
        {headerMedia}
        <div className={classes.heroText}>
          <h1>
            <span>
              <img
                src={Logo}
                className={classes.logoSmall}
                alt="Filmetor logo"
              />
            </span>
            ind your favourite films & TV shows!
          </h1>
          <div className={classes.btnContainer}>
            <Link className={classes.Btn} to="/search">
              Search Media
            </Link>
            <Link className={classes.Btn} to="/watched">
              Check watched
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
