const express = require("express");
const watchedController = require("../../controllers/watchedController");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();

router.post("/add-to-watched", userAuth, watchedController.addToWatched);
router.get("/watched/:userId", watchedController.getWatched);

module.exports = router;
