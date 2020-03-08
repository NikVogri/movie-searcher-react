const express = require("express");
const router = express.Router();
const watchedController = require("../../controllers/watchedController");
const userAuth = require("../../middleware/userAuth");

////////////
// type: POST
// desc: add to user
router.post("/", userAuth, watchedController.addToWatched);

module.exports = router;
