const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userWatched = new Schema(
  {
    contentId: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imagePath: {
      type: String,
      required: true
    },
    creator: { type: mongoose.Types.ObjectId, require: true, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watched", userWatched);
