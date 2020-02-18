import React from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/logo.png";
const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.InnerNav}>
        <NavLink to="/">
          <h3>
            <span>
              <img src={Logo} alt="filmetor logo" className={classes.Logo} />
            </span>
            Film<span style={{ color: "red" }}>etor</span>
          </h3>
        </NavLink>
        <ul className={classes.NavList}>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/watched">Watched</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
