const jwt = require("jsonwebtoken");
const httpError = require("../util/httpError");

module.exports = (req, res, next) => {
  try {
    // 1) get token from body
    const gotToken = req.headers.authorization.split(" ")[1];
    // 2) check if token
    if (!gotToken) {
      throw new Error();
    }
    // 3) check if token is valid
    const tokenValidity = jwt.verify(gotToken, process.env.JWT_SECRET);
    req.user = { userId: tokenValidity.userId };
    next();
  } catch (err) {
    return next(new httpError("Authentication failed, please try again", 401));
  }
};
