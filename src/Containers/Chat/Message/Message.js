import React from "react";
import classes from "./Message.module.css";

const Messages = ({ username, message }) => {
  return (
    <div className={classes.message}>
      <span>{username}</span>
      <p>{message}</p>
    </div>
  );
};

export default Messages;
