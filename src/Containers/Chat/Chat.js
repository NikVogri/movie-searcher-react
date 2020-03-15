import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message/Message";
import classes from "./Chat.module.css";
import { v4 as uuidv4 } from "uuid";

const socket = socketIOClient("https://filmetor-backend.herokuapp.com");

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userTyping, setUserTyping] = useState(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(1);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("addUser", username);
    socket.emit("getInfo");
  }, [username]);

  socket.on("getUsers", data => {
    setOnlineUsers(data);
    setOnlineUsersCount(data.length);
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
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      if (input !== "") {
        socket.emit("chat", { username, message: input, id: uuidv4() });
        setInput("");
      }
    }
  };
  return (
    <div className={classes.chat}>
      <div className={classes.messages}>
        <p className={classes.onlineUsers}>
          Online users:
          {onlineUsers.length < 1 && <span>{username}</span>}
          {onlineUsers.map(user => (
            <span key={user.id}>{user.data}</span>
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
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessageHandler}>Send</button>
      </div>
      <p style={{ color: "#fff" }}>Currently online: {onlineUsersCount}</p>
    </div>
  );
};

export default Chat;
