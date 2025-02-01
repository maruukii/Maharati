const express = require("express");
const router = express.Router();

const { fetchNewNotifs } = require("../controllers/Notification/fetchNotifs");
const { setViewed } = require("../controllers/Notification/updateNotif");
const authMiddleware = require("../utils/authMiddleware");

router.get("/:userId", authMiddleware.authenticateToken, fetchNewNotifs);
router.put("/viewed/:userId", authMiddleware.authenticateToken, setViewed);

module.exports = router;
