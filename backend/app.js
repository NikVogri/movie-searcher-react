const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user/userRoutes");
const watchedRoutes = require("./routes/user/watchedRoutes");
const httpError = require("./util/httpError");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());

// enable CORS
app.use(cors());

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
