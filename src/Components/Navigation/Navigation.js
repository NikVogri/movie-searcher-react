import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../img/logo.png";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

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
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/watched">Watched</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <span onClick={showModalHandler}>User</span>
            <Modal show={showModal} setShow={hideModalHandler}>
              <AuthForm />
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
