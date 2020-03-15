import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message/Message";
import classes from "./Chat.module.css";
import { v4 as uuidv4 } from "uuid";

const socket = socketIOClient("http://localhost:8001");

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userTyping, setUserTyping] = useState(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("addUser", username);
  }, [username]);

  socket.on("getUsers", data => {
    setOnlineUsers(data);
  });

  socket.on("currentOnline", data => {
    setOnlineUsersCount(data);
  });

  socket.on("chat", data => {
    setMessages([...messages, data]);
  });
  socket.on("typing", data => {
    setUserTyping(data);
  });

  const inputHandler = e => {
    setInput(e.target.value);
    socket.emit("typing", username);
  };

  const sendMessageHandler = e => {
    e.preventDefault();
    setInput("");
    setUserTyping(null);
    if (input !== "") {
      socket.emit("chat", { username, message: input, id: uuidv4() });
    }
  };
  return (
    <div className={classes.chat}>
      <div className={classes.messages}>
        <p>
          Online users:
          {onlineUsers.map(user => (
            <p>{user}</p>
          ))}
        </p>
        {messages.length > 0 ? (
          messages.map(message => (
            <Message
              key={message.id}
              username={message.username}
              message={message.message}
            />
          ))
        ) : (
          <p style={{ color: "#fff" }}>Be the first one to chat!</p>
        )}
      </div>
      {userTyping && (
        <p className={classes.isTyping}>{userTyping} is typing...</p>
      )}
      <div className={classes.input}>
        <input
          placeholder="Enter your message.."
          onChange={inputHandler}
          value={input}
        />
        <button onClick={sendMessageHandler}>Send</button>
      </div>
      <p>Currently online: {onlineUsersCount}</p>
    </div>
  );
};

export default Chat;
