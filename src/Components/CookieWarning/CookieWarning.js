import React from "react";
import classes from "./CookieWarning.module.css";

const CookieWarning = () => {
  let renderModal = null;
  // checks if user already confirmed cookie warning
  if (!localStorage.getItem("cookieConfirm")) {
    renderModal = (
      <div className={classes.CookieWarning}>
        <div className={classes.InnerCookieWarning}>
          <p>
            This site uses cookies. If you consent please click "I Agree" below.
          </p>
          <p onClick={() => agreeHandler()} className={classes.AgreeButton}>
            I Agree
          </p>
        </div>
      </div>
    );
  }
  // saves user cofirmation in local storage.
  const agreeHandler = () => {
    localStorage.setItem("cookieConfirm", "true");
    window.location.reload(false);
  };

  return renderModal;
};

export default CookieWarning;
