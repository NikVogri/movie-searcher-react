const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/userRoutes");
const watchedRoutes = require("./routes/user/watchedRoutes");
const socket = require("socket.io");
const httpError = require("./util/httpError");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());

// enable CORS
app.use(cors({ credentials: true, origin: process.env.FRONT_LINK }));

// default routes
app.use("/api/user", userRoutes);
app.use("/api/content", watchedRoutes);

// if route is incorrect
app.use((req, res, next) => {
  const error = new httpError("Could not find this route.!!!", 404);
  throw error;
});

// error handler
app.use((error, req, res, next) => {
  // in case headers have somehow been already sent
  if (res.headerSent) {
    return next(error);
  }
  // send this instead
  res.json({
    statusCode: error.code,
    success: false,
    msg: error.message || "An unknown error occurred!"
  });
});

// sockets
const server = http.createServer(app);
const io = socket(server);
io.listen(8001);

let onlineUsers = [];

io.on("connect", socket => {
  socket.on("addUser", data => {
    if (!onlineUsers.includes(data)) {
      onlineUsers.push({ data, id: socket.id });
    }
    socket.emit("getUsers", onlineUsers);
  });

  socket.on("getInfo", () => {
    socket.broadcast.emit("getUsers", onlineUsers);
  });

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
    setTimeout(() => {
      socket.broadcast.emit("typing", "");
    }, 3000);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.id !== socket.id);

    socket.broadcast.emit("getUsers", onlineUsers);
  });
});

// connect to datbase & start server
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-cmnml.mongodb.net/filmetor?retryWrites=true&w=majority`,
    { seUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database...");
  })
  .then(() => {
    // start server if mongo connection was successful.
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
