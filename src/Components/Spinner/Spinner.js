import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.backgroundSpinner}>
      <div className={classes.Loader}></div>
    </div>
  );
};

export default Spinner;
