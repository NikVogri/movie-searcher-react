import React, { useState } from "react";
import classes from "./AuthForm.module.css";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import {
  loginUser,
  createUser,
  clearError
} from "../../redux/actions/actionCreator";

const AuthForm = ({
  loginUser,
  createUser,
  clearError,
  isLoading,
  error,
  createdUserSuccess
}) => {
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: false
    },
    email: {
      value: "",
      isValid: false
    },
    password: {
      value: "",
      isValid: false
    },
    confirmPassword: {
      value: "",
      isValid: false
    }
  });

  const formSubmitHandler = async e => {
    e.preventDefault();

    // check if passwords match
    if (showSignup) {
      if (formData.password.value !== formData.confirmPassword.value) {
        return setErrorMessage("Passwords do not match");
      }
    }

    // check if form is fully valid
    const validatorArray = [];
    for (let input in formData) {
      validatorArray.push(formData[input].isValid);
    }
    // if it all data is valid then send request to back end.
    let formValidity;
    let formBody;

    if (showSignup) {
      formValidity = validatorArray.every(el => el === true);
      formBody = {
        name: formData.name.value,
        password: formData.password.value,
        email: formData.email.value
      };

      if (formValidity) {
        createUser(formBody);
      } else {
        setErrorMessage("Please provide all necessary information.");
      }
    } else {
      formValidity = validatorArray[1] && validatorArray[2];
      formBody = {
        password: formData.password.value,
        email: formData.email.value
      };
      if (formValidity) {
        loginUser(formBody);
      } else {
        setErrorMessage("Please provide all necessary information.");
      }
    }
  };

  const onInputChange = e => {
    setErrorMessage(null);
    setFormData({
      ...formData,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value.length > 3
      }
    });
  };

  const switchHandler = e => {
    e.preventDefault();
    setErrorMessage(null);
    setShowSignup(prevVal => !prevVal);
    clearError();
  };

  return (
    <>
      <h3 className={classes.title}>
        {showSignup ? "Sign up" : "Log in"} to{" "}
        <span style={{ color: "red" }}>Filmetor</span>
      </h3>
      {isLoading && <Spinner />}
      <form onSubmit={formSubmitHandler}>
        {showSignup && (
          <div className={classes.inputGroup}>
            <label>Name</label>
            <input type="text" name="name" onChange={onInputChange} />
          </div>
        )}
        <div className={classes.inputGroup}>
          <label>Email</label>
          <input type="email" name="email" onChange={onInputChange} />
        </div>

        <div className={classes.inputGroup}>
          <label>Password</label>
          <input type="password" name="password" onChange={onInputChange} />
        </div>

        {showSignup && (
          <div className={classes.inputGroup}>
            <label>Repeat Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={onInputChange}
            />
          </div>
        )}
        <button className={classes.formButton}>Submit</button>
      </form>
      {errorMessage || error ? (
        <p className={classes.errorMessage}>{errorMessage || error}</p>
      ) : null}
      {createdUserSuccess ? (
        <p className={classes.successMessage}>
          User created Successfully, please login!
        </p>
      ) : null}
      <button className={classes.switchButton} onClick={switchHandler}>
        Switch to {showSignup ? "LOGIN" : "SIGNUP"}
      </button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.errorMsg,
    isLoading: state.user.isLoading,
    createdUserSuccess: state.user.registrationSuccess
  };
};

const mapDispatchToProps = {
  loginUser,
  createUser,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
