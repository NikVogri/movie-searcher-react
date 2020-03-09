import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ children, show, setShow }) => {
  if (show) {
    return (
      <div className={classes.modal}>
        <Backdrop show={show} setShow={setShow} />
        <div
          className={`${classes.modalInner} ${show ? classes.active : null}`}
        >
          <span
            className={classes.closeModal}
            onClick={setShow}
            role="img"
            aria-label="close modal"
          >
            &#10060;
          </span>
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
