const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true,
      default: "My short bio"
    },
    image: {
      type: String,
      required: true,
      default: "/defaultImage"
    },
    date: Date,
    watched: [{ type: mongoose.Types.ObjectId, require: true, ref: "Watched" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
