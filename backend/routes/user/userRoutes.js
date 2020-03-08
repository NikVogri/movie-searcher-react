const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const userAuth = require("../../middleware/userAuth");
////////////
// type: POST
// desc: create new user
router.post("/register", userController.createUser);

////////////
// type: POST
// desc: login user
router.post("/login", userController.loginUser);

////////////
// type: PATCH
// desc: update user info
router.patch("/update", userAuth, userController.updateUser);

module.exports = router;
