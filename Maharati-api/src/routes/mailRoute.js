const express = require("express");
const router = express.Router();

const { composeMail } = require("../controllers/Mail/sendMail");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

router.post(
  "/",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  composeMail
);

module.exports = router;
