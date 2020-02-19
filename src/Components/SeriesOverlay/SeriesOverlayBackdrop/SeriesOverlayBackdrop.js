import React from "react";
import classes from "./SeriesOverlayBackdrop.module.css";

const SeriesOverlayBackdrop = ({ show, setShow }) => {
  if (show) {
    return <div className={classes.modalBackground} onClick={setShow}></div>;
  } else {
    return null;
  }
};

export default SeriesOverlayBackdrop;
