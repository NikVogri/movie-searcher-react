import React, { useState } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
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

  const formSubmitHandler = e => {
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

    if (showSignup) {
      formValidity = validatorArray.every(el => el === true);
    } else {
      formValidity = validatorArray[1] && validatorArray[2];
    }
    console.log(formValidity);

    if (formValidity) {
      // send request
    } else {
      setErrorMessage("Please provide all necessary information.");
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
  };

  return (
    <>
      <h3 className={classes.title}>
        Sign up to <span style={{ color: "red" }}>Filmetor</span>
      </h3>
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
      {errorMessage && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )}
      <button className={classes.switchButton} onClick={switchHandler}>
        Switch to {showSignup ? "LOGIN" : "SIGNUP"}
      </button>
    </>
  );
};

export default AuthForm;
