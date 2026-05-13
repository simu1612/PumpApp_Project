const express = require("express");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const router = express.Router();
const profileController = require("../controllers/profileController");

//route per ottenere le informazioni del profilo
router.get("/profile", tokenMiddleware, profileController.getProfile);

router.put("/profile/update", tokenMiddleware, profileController.updateProfile);

module.exports = router;