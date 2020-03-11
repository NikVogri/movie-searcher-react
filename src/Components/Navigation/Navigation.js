import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { NavLink, Redirect } from "react-router-dom";
import Logo from "../../img/logo.png";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";
import { connect } from "react-redux";
import { clearError, logout } from "../../redux/actions/actionCreator";

const Navigation = ({ clearError, token, logout }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(true);
  };

  if (token && showModal) {
    setShowModal(false);
  }

  const hideModalHandler = () => {
    setShowModal(false);
    clearError();
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
          {token && (
            <>
              <li>
                <NavLink to="/chat">Chat</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <Redirect to="/" />
            </>
          )}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {!token && (
            <li>
              <span onClick={showModalHandler}>Login / Signup</span>
              <Modal show={showModal} setShow={hideModalHandler}>
                <AuthForm />
              </Modal>
            </li>
          )}
          {token && (
            <li>
              <span onClick={logout}>Logout</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = {
  clearError,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
