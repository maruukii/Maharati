const express = require("express");

const { contactUs } = require("../controllers/Support/contactUs");
const { setRead } = require("../controllers/Support/updateContact.js");
const { deleteContact } = require("../controllers/Support/deleteContact.js");
const { updateContact } = require("../controllers/Support/updateContact.js");
const { fetchContacts } = require("../controllers/Support/fetchContacts");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

const router = express.Router();
router.get(
  "/:status",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  fetchContacts
);
router.post("/contact-us", contactUs);
router.put(
  "/read/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  setRead
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  deleteContact
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  updateContact
);

module.exports = router;
