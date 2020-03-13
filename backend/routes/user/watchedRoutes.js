const express = require("express");
const watchedController = require("../../controllers/watchedController");
const userAuth = require("../../middleware/userAuth");
const router = express.Router();

router.use(userAuth);
router.post("/add-to-watched", watchedController.addToWatched);
router.get("/watched/:userId", watchedController.getWatched);
router.get("/watched/check/:contentId", watchedController.checkIfWatched);

module.exports = router;
