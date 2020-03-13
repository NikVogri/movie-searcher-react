const Watched = require("../models/userWatched");
const User = require("../models/userModel");
const httpError = require("../util/httpError");
const mongoose = require("mongoose");

exports.addToWatched = async (req, res, next) => {
  const { contentId, contentType, name, imagePath } = req.body;
  const { userId } = req.user;
  // check if all data is present
  if (!contentId || !contentType || !name || !imagePath || !userId) {
    return next(new httpError("Provided information is invalid", 400));
  }
  // create new item
  const createdItem = new Watched({
    contentId,
    contentType,
    name,
    imagePath,
    creator: userId
  });
  let user;
  try {
    user = await User.findById(userId).populate("watched");
    if (!user) {
      throw new Error("User could not be found");
    }

    if (user.watched.some(e => e.contentId === contentId)) {
      throw new Error("Item already in list");
    }

    // create session
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdItem.save({ session: sess });
    user.watched.push(createdItem);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
  res.status(200).json({
    success: true,
    msg: "Successfully added new item to list"
  });
};

exports.getWatched = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { watched } = await User.findById(userId).populate("watched");
    if (watched) {
      res.status(200).json({
        success: true,
        msg: "Successfully fetched watched content",
        items: watched
      });
    } else {
      throw new Error("No content added yet :(");
    }
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
};

exports.checkIfWatched = async (req, res, next) => {
  const { contentId } = req.params;
  const { userId } = req.user;
  // check if its already on list
  try {
    const user = await User.findById(userId).populate("watched");
    if (!user.watched.some(e => e.contentId === contentId)) {
      return res.status(200).json({
        success: true,
        msg: "Item not on list",
        isOnList: false
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Item already on list",
        isOnList: true
      });
    }
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
};
