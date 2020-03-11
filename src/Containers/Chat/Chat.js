import React from "react";
import classes from "./Chat.module.css";
import { withChatkit } from "@pusher/chatkit-client-react";

const Chat = props => {
  return (
    <div>
      {props.chatkit.isLoading
        ? "Connecting to Chatkit..."
        : `Hello ${props.chatkit.currentUser.name}!`}
    </div>
  );
};

export default withChatkit(Chat);
