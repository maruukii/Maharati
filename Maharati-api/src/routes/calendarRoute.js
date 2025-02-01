const express = require("express");

const { createEvent } = require("../controllers/Calendar/createEvent");
const { updateEvent } = require("../controllers/Calendar/updateEvent");
const { deleteEvent } = require("../controllers/Calendar/deleteEvent");
const {
  fetchEvents,
  fetchEventsByOwner,
} = require("../controllers/Calendar/fetchEvents");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

const router = express.Router();

router.post(
  "/new",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  createEvent
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  updateEvent
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  deleteEvent
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  fetchEvents
);
router.get(
  "/:owner",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  fetchEventsByOwner
);
module.exports = router;
