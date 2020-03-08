const User = require("../models/userModel");
const httpError = require("../util/httpError");

exports.addToWatched = async (req, res, next) => {
  // 1) get userId and id from req
  const { userId } = req.user;
  const { id } = req.body;
  // 2) check if data is provided
  if (!userId || !id) {
    return next(new httpError("Something went wrong", 500));
  }
  try {
    // 3) get user
    const user = await User.findById(userId);
    console.log(user);
    const { watched } = user;
    // 4) check if watched id is already stored
    const alreadyOnWatched = watched.filter(item => item === id);
    console.log(alreadyOnWatched);
    if (alreadyOnWatched.length > 0) {
      return next(new httpError("Already on watched list", 400));
    }
    // 5) add watched item to watched list
    const newWatched = [...watched, id];
    user.watched = newWatched;
    user.save();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
  res.status(200).json({
    success: "true"
  });
};
