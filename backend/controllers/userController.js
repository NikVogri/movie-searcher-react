const User = require("../models/userModel");
const httpError = require("../util/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  // 1) get data from body
  const { name, email, password } = req.body;

  // 2) check if all required data is present
  if (!name || !email || !password) {
    return next(new httpError("Please enter all credentials", 400));
  }
  // 3) check if user already exists
  const checkIfUserExists = await User.find({
    email
  });

  // 4) hash user password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 5) create new user
  try {
    if (checkIfUserExists.length === 0) {
      await User.create({
        name,
        email,
        password: hashedPassword
      });
    } else {
      return next(new httpError("User already exists", 400));
    }
  } catch (err) {
    return next(new httpError("Something went wrong", 500));
  }

  res.status(200).json({
    success: "true",
    msg: "Successfully created new user"
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if user exists with that email
  const user = await User.findOne({
    email
  });
  try {
    if (user) {
      const passwordValidity = await bcrypt.compare(password, user.password);
      // 2) check if passwords match
      if (passwordValidity) {
        // 3) generate JWT
        const token = await jwt.sign(
          {
            userId: user.id
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          status: "Success",
          msg: "Sucessfully logged in",
          token
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("User could not be found");
    }
  } catch (err) {
    return next(new httpError(err.message, 400));
  }
};

exports.updateUser = async (req, res, next) => {
  // 1) get data from body & user from req.
  const { image, bio } = req.body;
  const { userId } = req.user;

  try {
    // 2) check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User cannot be found");
    }
    // 3) update user information
    if (image) {
      user.image = image;
    }
    if (bio) {
      user.bio = bio;
    }
    if (!bio && !image) {
      throw new Error("Invalid input, please provide an image or bio");
    }

    user.save();
  } catch (err) {
    return next(new httpError(err.message, 500));
  }
  res.status(200).json({
    status: "Success",
    msg: "Sucessfully updated user"
  });
};
