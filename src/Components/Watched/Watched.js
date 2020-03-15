import React from "react";
import classes from "./Watched.module.css";

const Watched = ({ alreadyWatched, addToWatched }) => {
  if (alreadyWatched) {
    return (
      <div className={classes.Watched}>
        <i
          className="fa fa-eye"
          aria-hidden="true"
          title="Add to watched"
          onClick={addToWatched}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.Watched}>
        <i
          className="fa fa-eye watched"
          aria-hidden="true"
          title="Already on watched list"
        />
      </div>
    );
  }
};

export default Watched;
