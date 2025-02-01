const express = require("express");
const router = express.Router();

const { fetchAudits, fetchAudit } = require("../controllers/Audit/fetchAudits");
const { deleteAudit } = require("../controllers/Audit/deleteAudit");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

router.get(
  "/",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  fetchAudits
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  fetchAudit
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  deleteAudit
);

module.exports = router;
